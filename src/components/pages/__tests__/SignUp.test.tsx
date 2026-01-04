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
  it("E-mailフォームへのユーザー入力が画面に反映されること", async () => {});
  it("パスワードフォームへのユーザー入力が画面に反映されること", async () => {});
  it("パスワードの文字数が入力中に20字を超えると、パスワードの文字数制限(8~20字)が表示されること", async () => {});
  it("登録ボタン押下時、確認用パスワードとの一致が取れない場合はその旨を表示し、アカウント作成ができないこと", async () => {});
  it("登録ボタン押下時、パスワードの文字数制限に適合しない場合はその旨を表示し、アカウント作成ができないこと", async () => {});
  it("登録ボタン押下時、メールアドレスがメールアドレスの形式に適合しない場合はその旨を表示し、アカウント作成ができないこと", async () => {});
  it("登録ボタン押下時、使用できない文字が入力に含まれている場合はその旨を表示し、アカウント作成ができないこと", async () => {});
  it("アカウント作成が正常に行われる場合、仮登録ページに遷移すること", async () => {});
});
