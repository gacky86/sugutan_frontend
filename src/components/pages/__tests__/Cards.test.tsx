import "@testing-library/jest-dom/vitest";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";
import Cards from "@/components/pages/Cards";

import "@testing-library/jest-dom/vitest";

// Redux
import { renderWithProviders } from "@/tests/utils/renderWithProviders";
import type { User } from "@/types";
// msw
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";
import { Route, Routes } from "react-router-dom";

// svgファイルのimportのmock
vi.mock("@/assets/sugutan_logo.svg?react", () => ({
  default: () => <svg data-testid="logo" />,
}));

// MSWサーバーのセットアップ
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ログイン済みのUser State
const authState = {
  loading: false,
  isSignedIn: true,
  currentUser: {
    id: 1,
    email: "test@example.com",
  } as User,
};

describe("Cards Page", () => {
  it("認証済みユーザーの場合、単語帳に登録済みのカード一覧ページが表示される", async () => {
    renderWithProviders(
      <Routes>
        <Route path="/flashcards/:id/cards" element={<Cards />} />
      </Routes>,
      {
        preloadedState: {
          auth: authState,
        },
        route: "/flashcards/1/cards",
      }
    );
    // await new Promise((r) => setTimeout(r, 1000));
    // screen.debug();
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
  it("カード編集ボタンをクリックすると、単語カード編集モーダルが表示される", async () => {
    renderWithProviders(
      <Routes>
        <Route path="/flashcards/:id/cards" element={<Cards />} />
      </Routes>,
      {
        preloadedState: {
          auth: authState,
        },
        route: "/flashcards/1/cards",
      }
    );

    const editButton = await screen.findByRole(
      "button",
      { name: /カード りんご を編集/i },
      { timeout: 2000 }
    );
    fireEvent.click(editButton);
    await waitFor(() => {
      // モーダルタイトル、サブタイトルの確認
      expect(screen.getByText("単語カード編集")).toBeInTheDocument();
      expect(screen.getByText("Additional Info")).toBeInTheDocument();
      expect(screen.getByText("Extra notes")).toBeInTheDocument();
      expect(screen.getByText("+ Add Extra note")).toBeInTheDocument();

      // フォームラベル、フォーム初期値の確認
      // カード編集の場合は初期値に現在の値が入力ずみであること
      const frontInput = screen.getByLabelText("Japanese") as HTMLInputElement;
      expect(frontInput.value).toBe("りんご");
      const back = screen.getByLabelText("English") as HTMLInputElement;
      expect(back.value).toBe("apple");
      const cardType = screen.getByLabelText("Card type") as HTMLInputElement;
      expect(cardType.value).toBe("名詞");
      const frontSentence = screen.getByLabelText(
        "Japanese sentence"
      ) as HTMLInputElement;
      expect(frontSentence.value).toBe("私はりんごを食べる。");
      const backSentence = screen.getByLabelText(
        "English sentence"
      ) as HTMLInputElement;
      expect(backSentence.value).toBe("I eat an apple.");
      const frontExplanation = screen.getByLabelText(
        "Explanation in Japanese"
      ) as HTMLInputElement;
      expect(frontExplanation.value).toBe("");
      const backExplanation = screen.getByLabelText(
        "Explanation in English"
      ) as HTMLInputElement;
      expect(backExplanation.value).toBe("");
    });
  });
  it("カード作成ボタンをクリックすると、カード作成モーダルが表示される", async () => {
    renderWithProviders(
      <Routes>
        <Route path="/flashcards/:id/cards" element={<Cards />} />
      </Routes>,
      {
        preloadedState: {
          auth: authState,
        },
        route: "/flashcards/1/cards",
      }
    );
    const createButton = await screen.findByRole(
      "button",
      { name: /単語カード新規作成/i },
      { timeout: 2000 }
    );
    fireEvent.click(createButton);
    await waitFor(() => {
      // モーダルタイトル、サブタイトルの確認
      expect(screen.getByText("単語カード作成")).toBeInTheDocument();
      expect(screen.getByText("Additional Info")).toBeInTheDocument();
      expect(screen.getByText("Extra notes")).toBeInTheDocument();
      expect(screen.getByText("+ Add Extra note")).toBeInTheDocument();

      // フォームラベル、フォーム初期値の確認
      const frontInput = screen.getByLabelText("Japanese") as HTMLInputElement;
      expect(frontInput.value).toBe("");
      const back = screen.getByLabelText("English") as HTMLInputElement;
      expect(back.value).toBe("");
      const cardType = screen.getByLabelText("Card type") as HTMLInputElement;
      expect(cardType.value).toBe("名詞");
      const frontSentence = screen.getByLabelText(
        "Japanese sentence"
      ) as HTMLInputElement;
      expect(frontSentence.value).toBe("");
      const backSentence = screen.getByLabelText(
        "English sentence"
      ) as HTMLInputElement;
      expect(backSentence.value).toBe("");
      const frontExplanation = screen.getByLabelText(
        "Explanation in Japanese"
      ) as HTMLInputElement;
      expect(frontExplanation.value).toBe("");
      const backExplanation = screen.getByLabelText(
        "Explanation in English"
      ) as HTMLInputElement;
      expect(backExplanation.value).toBe("");
    });
  });
});
