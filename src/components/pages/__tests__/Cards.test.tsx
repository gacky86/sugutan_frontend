import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
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
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

// msw
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";
import { renderCardsPage } from "@/tests/utils/renderPage";

// svgファイルのimportのmock
vi.mock("@/assets/sugutan_logo.svg?react", () => ({
  default: () => <svg data-testid="logo" />,
}));

// MSWサーバーのセットアップ
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cards Page", () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    user = userEvent.setup(); // userEventの初期化
    renderCardsPage();
  });

  describe("初期状態", () => {
    it("単語帳に登録済みのカード一覧ページが表示される", async () => {
      // 単語帳の言語設定がテーブルのヘッダに反映されること（FR設定ならFrançaisと表示）
      // 取得したカードの一覧を表示すること
      const textList = [
        "Japanese",
        "Français",
        "名詞",
        "りんご",
        "apple",
        "動詞",
        "飲む",
        "take",
      ];
      for (const text of textList) {
        const element = await screen.findByText(text, {}, { timeout: 2000 });
        expect(element).toBeInTheDocument();
      }
    });
  });

  describe("単語カードクリック時動作", () => {
    it("カード編集ボタンをクリックすると、単語カード編集モーダルが表示される", async () => {
      const editButton = await screen.findByRole(
        "button",
        { name: /カード りんご を編集/i },
        { timeout: 2000 },
      );
      user.click(editButton);
      await waitFor(() => {
        // モーダルタイトル、サブタイトルの確認
        expect(screen.getByText("単語カード編集")).toBeInTheDocument();
        expect(screen.getByText("Additional Info")).toBeInTheDocument();
        expect(screen.getByText("Extra notes")).toBeInTheDocument();
        expect(screen.getByText("+ Add Extra note")).toBeInTheDocument();

        // フォームラベル、フォーム初期値の確認
        // カード編集の場合は初期値に現在の値が入力ずみであること
        const frontInput = screen.getByLabelText(
          "Japanese",
        ) as HTMLInputElement;
        expect(frontInput.value).toBe("りんご");
        const back = screen.getByLabelText("English") as HTMLInputElement;
        expect(back.value).toBe("apple");
        const cardType = screen.getByLabelText("Card type") as HTMLInputElement;
        expect(cardType.value).toBe("名詞");
        const frontSentence = screen.getByLabelText(
          "Japanese sentence",
        ) as HTMLInputElement;
        expect(frontSentence.value).toBe("私はりんごを食べる。");
        const backSentence = screen.getByLabelText(
          "English sentence",
        ) as HTMLInputElement;
        expect(backSentence.value).toBe("I eat an apple.");
        const frontExplanation = screen.getByLabelText(
          "Explanation in Japanese",
        ) as HTMLInputElement;
        expect(frontExplanation.value).toBe("");
        const backExplanation = screen.getByLabelText(
          "Explanation in English",
        ) as HTMLInputElement;
        expect(backExplanation.value).toBe("");
      });
    });
    // 単語の編集（正常・異常入力時動作確認）
    // 単語の削除
  });

  describe("単語帳作成ボタンクリック時動作", () => {
    it("カード作成ボタンをクリックすると、カード作成モーダルが表示される", async () => {
      const createButton = await screen.findByRole(
        "button",
        { name: /単語カード新規作成/i },
        { timeout: 2000 },
      );
      user.click(createButton);
      await waitFor(() => {
        // モーダルタイトル、サブタイトルの確認
        expect(screen.getByText("単語カード作成")).toBeInTheDocument();
        expect(screen.getByText("Additional Info")).toBeInTheDocument();
        expect(screen.getByText("Extra notes")).toBeInTheDocument();
        expect(screen.getByText("+ Add Extra note")).toBeInTheDocument();

        // フォームラベル、フォーム初期値の確認
        const frontInput = screen.getByLabelText(
          "Japanese",
        ) as HTMLInputElement;
        expect(frontInput.value).toBe("");
        const back = screen.getByLabelText("English") as HTMLInputElement;
        expect(back.value).toBe("");
        const cardType = screen.getByLabelText("Card type") as HTMLInputElement;
        expect(cardType.value).toBe("名詞");
        const frontSentence = screen.getByLabelText(
          "Japanese sentence",
        ) as HTMLInputElement;
        expect(frontSentence.value).toBe("");
        const backSentence = screen.getByLabelText(
          "English sentence",
        ) as HTMLInputElement;
        expect(backSentence.value).toBe("");
        const frontExplanation = screen.getByLabelText(
          "Explanation in Japanese",
        ) as HTMLInputElement;
        expect(frontExplanation.value).toBe("");
        const backExplanation = screen.getByLabelText(
          "Explanation in English",
        ) as HTMLInputElement;
        expect(backExplanation.value).toBe("");
      });
    });
    // 単語の作成（正常・異常入力時動作確認）
  });
});
