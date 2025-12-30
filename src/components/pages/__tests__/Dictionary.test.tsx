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
import Flashcards from "@/components/pages/Flashcards";

import "@testing-library/jest-dom/vitest";

// Redux
import { renderWithProviders } from "@/tests/utils/renderWithProviders";
import type { User } from "@/types";
// msw
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";

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

describe("Flashcards Page", () => {
  it("認証済みユーザーの場合、Flashcardsページが表示される", async () => {
    renderWithProviders(<Flashcards />, {
      preloadedState: {
        auth: authState,
      },
    });
    // API経由で取得されたFlashcardの一覧が表示される
    // 取得されるFlashcardはsrc/mocks/handlers.ts内で定義
    // descriptionについては文字数制限(30字以内)を超える場合は省略される
    await waitFor(() => {
      expect(screen.getByText("english phrases")).toBeInTheDocument();
      expect(
        screen.getByText("phrases you can use in daily l...")
      ).toBeInTheDocument();
      expect(screen.getByText("登録枚数: 100枚")).toBeInTheDocument();
      expect(screen.getByText("最終学習日: 1日前")).toBeInTheDocument();
      expect(screen.getByText("設定言語: English")).toBeInTheDocument();
      expect(screen.getByText("french words")).toBeInTheDocument();
      expect(
        screen.getByText("french words in daily life")
      ).toBeInTheDocument();
      expect(screen.getByText("登録枚数: 200枚")).toBeInTheDocument();
      expect(screen.getByText("最終学習日: 3日前")).toBeInTheDocument();
      expect(screen.getByText("設定言語: Français")).toBeInTheDocument();
    });
  });
});
