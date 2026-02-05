import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterEach,
  afterAll,
  beforeEach,
} from "vitest";
import "@testing-library/jest-dom/vitest";

// msw
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";
import { renderFlashcardsPage } from "@/tests/utils/renderPage";

// svgファイルのimportのmock
vi.mock("@/assets/sugutan_logo.svg?react", () => ({
  default: () => <svg data-testid="logo" />,
}));
// motionのモック
vi.mock("react-loader-spinner", () => ({
  DNA: () => <div data-testid="loading-dna" />,
}));
// MSWサーバーのセットアップ
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Flashcards Page", () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    user = userEvent.setup(); // userEventの初期化
    renderFlashcardsPage(); // レンダリング
  });

  describe("初期状態", () => {
    it("ユーザーが持つ単語帳一覧が表示されること", async () => {
      // API経由で取得されたFlashcardの一覧が表示される
      // 取得されるFlashcardはsrc/mocks/handlers.ts内で定義
      // descriptionについては文字数制限(30字以内)を超える場合は省略される
      await waitFor(() => {
        expect(screen.getByText("english phrases")).toBeInTheDocument();
        expect(
          screen.getByText("phrases you can use in daily l..."),
        ).toBeInTheDocument();
        expect(screen.getByText("登録枚数: 100枚")).toBeInTheDocument();
        expect(screen.getByText("最終学習日: 1日前")).toBeInTheDocument();
        expect(screen.getByText("french words")).toBeInTheDocument();
        expect(
          screen.getByText("french words in daily life"),
        ).toBeInTheDocument();
        expect(screen.getByText("登録枚数: 200枚")).toBeInTheDocument();
        expect(screen.getByText("最終学習日: 3日前")).toBeInTheDocument();
      });
    });
  });
  describe("単語帳クリック時動作", () => {
    it("単語帳をクリックすると、単語帳詳細モーダルが表示される", async () => {
      // getByTextは「すでにDOMに描画されているはず」という前提で探す。なければすぐにエラー
      // findByTextはデフォルトで１秒間はリトライしてくれる
      const flashcard = await screen.findByText("english phrases");
      user.click(flashcard);
      await waitFor(() => {
        expect(screen.getAllByText("english phrases").length).toBe(2);
        expect(screen.getByText("Inputモードで学習")).toBeInTheDocument();
        expect(screen.getByText("Outputモードで学習")).toBeInTheDocument();
        expect(screen.getByText("登録カードの管理")).toBeInTheDocument();
        expect(screen.getByText("単語帳設定")).toBeInTheDocument();
      });
    });
  });
  describe("単語帳作成ボタンクリック時動作", () => {
    it("単語帳作成ボタンをクリックすると、単語帳作成モーダルが表示される", async () => {
      const newFlashcard = await screen.findByText("単語帳を新規作成");
      user.click(newFlashcard);
      await waitFor(() => {
        expect(screen.getByText("単語帳新規作成")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
      });
    });
    // 単語帳作成のフォーム入力と提出の際の動作
    // フォーム未入力時のエラーメッセージ確認
    // 文字数制限違反時のエラーメッセージ確認
  });
  // 単語帳詳細モーダル動作
  // 単語帳の編集
  // 単語帳の削除
});
