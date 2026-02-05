import "@testing-library/jest-dom/vitest";
import { screen, within, waitFor } from "@testing-library/react";
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

// Redux
import { renderDictionaryPage } from "@/tests/utils/renderPage";
import type { DictionarySearchResult } from "@/types";
// msw
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

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

describe("Dictionary Page", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup(); // userEventの初期化
    renderDictionaryPage();
  });
  it("認証済みユーザーの場合、表現検索ページが初期状態で表示されること", async () => {
    expect(screen.getAllByText("AI辞書").length).toBe(2);
    expect(screen.getByText("検索")).toBeInTheDocument();
    expect(screen.getByText("検索結果はありません")).toBeInTheDocument();
    expect(screen.getByText("登録先の単語帳")).toBeInTheDocument();
    expect(screen.getByText("単語帳を新規作成")).toBeInTheDocument();
  });
  it("検索フォームへのユーザー入力が表示されること", async () => {
    const dictionaryInput = screen.getByPlaceholderText(
      "単語・フレーズを入力(日本語 / English)",
    ) as HTMLInputElement;
    await user.type(dictionaryInput, "りんご");
    expect(dictionaryInput).toHaveValue("りんご");
  });
  it("検索フォーム入力、検索ボタン押下後、検索結果が表示されること", async () => {
    const searchButton = screen.getByRole("button", { name: "辞書検索" });
    const dictionaryInput = screen.getByPlaceholderText(
      "単語・フレーズを入力(日本語 / English)",
    ) as HTMLInputElement;
    await user.type(dictionaryInput, "りんご");
    await user.click(searchButton);
    const textList = [
      "apple",
      "毎日りんごを食べると医者いらず。",
      "An apple a day keeps the doctor away.",
    ];
    for (const text of textList) {
      const element = await screen.findByText(text, {}, { timeout: 2000 });
      expect(element).toBeInTheDocument();
    }
  });
  it("検索フォーム入力、検索ボタン押下後、検索結果がない場合は検索ワードに対する結果がない旨が表示されること", async () => {
    // 検索結果がない場合の戻り値を定義
    server.use(
      http.post("*/api/v1/gemini/dictionary", () => {
        // 検索結果がない場合の戻り値
        const mockResults: DictionarySearchResult[] = [
          {
            translation: { jp: "", en: "" },
            example: {
              jp: "",
              en: "",
            },
            synonyms: [],
            antonyms: [],
            etymology: "",
            partOfSpeech: "noun",
            pronunciation: "",
            collocations: [],
            success: false,
          },
        ];
        return HttpResponse.json(mockResults);
      }),
    );
    const searchButton = screen.getByRole("button", { name: "辞書検索" });
    const dictionaryInput = screen.getByPlaceholderText(
      "単語・フレーズを入力(日本語 / English)",
    ) as HTMLInputElement;
    await user.type(dictionaryInput, "りんご");

    await user.click(searchButton);
    const element = await screen.findByText(
      "該当する単語・表現が見つかりませんでした。",
      {},
      { timeout: 2000 },
    );
    expect(element).toBeInTheDocument();
  });
  it("検索フォーム入力しない状態で、検索ボタンを押下すると、「検索ワードを入力してください」と表示されること", async () => {
    const searchButton = screen.getByRole("button", { name: "辞書検索" });
    user.click(searchButton);
    const element = await screen.findByText(
      "検索ワードを入力してください",
      {},
      { timeout: 2000 },
    );
    expect(element).toBeInTheDocument();
  });
  it("検索結果の単語帳登録ボタンを押下すると、検索結果のカードが消えること", async () => {
    const searchButton = screen.getByRole("button", { name: "辞書検索" });
    const dictionaryInput = screen.getByPlaceholderText(
      "単語・フレーズを入力(日本語 / English)",
    ) as HTMLInputElement;
    await user.type(dictionaryInput, "りんご");

    await user.click(searchButton);
    const regButton = await screen.findByRole(
      "button",
      { name: "りんご を登録" },
      { timeout: 2000 },
    );
    await user.click(regButton);
    const result = await screen.findByText(
      "検索結果はありません",
      {},
      { timeout: 2000 },
    );
    expect(result).toBeInTheDocument();
    const textList = [
      "[名詞]apple",
      "毎日りんごを食べると医者いらず。",
      "An apple a day keeps the doctor away.",
    ];
    for (const text of textList) {
      const element = screen.queryByText(text);
      expect(element).toBeNull();
    }
  });
  it("登録先単語帳のボックスに、ユーザーの単語帳が選択肢として表示されること", async () => {
    const mockTitles = ["english phrases", "french words"];
    // 1. select要素を取得（Roleならcombobox）
    const select = await screen.findByRole("combobox");

    // 2. その中の option 要素をすべて取得
    const options = within(select).getAllByRole("option");

    // 3. 数と内容を確認
    expect(options).toHaveLength(mockTitles.length);

    mockTitles.forEach((title, index) => {
      expect(options[index]).toHaveTextContent(title);
    });
  });
  it("単語帳が未作成の場合、「単語帳がまだありません」と表示されること", async () => {
    server.use(
      http.get("*/api/v1/flashcards", () => {
        // 検索結果がない場合の戻り値
        return HttpResponse.json([]);
      }),
    );
    expect(screen.getByText("単語帳がまだありません")).toBeInTheDocument();
  });
  it("単語帳新規作成ボタンを押下すると、単語帳作成モーダルが表示されること", async () => {
    const newFlashcardButton = screen.getByRole("button", {
      name: "単語帳新規作成",
    });
    user.click(newFlashcardButton);
    await waitFor(() => {
      expect(screen.getByText("単語帳新規作成")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });
});
