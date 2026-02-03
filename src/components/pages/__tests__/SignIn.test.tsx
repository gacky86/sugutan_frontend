import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  it,
  vi,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  beforeEach,
} from "vitest";

import "@testing-library/jest-dom/vitest";

// msw
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";
import { renderSignInPage } from "@/tests/utils/renderPage";

// svgファイルのimportのmock
vi.mock("@/assets/sugutan_logo.svg?react", () => ({
  default: () => <svg data-testid="logo" />,
}));
// ローディング中のロゴのモック
vi.mock("react-loader-spinner", () => ({
  DNA: () => <div data-testid="loading-dna" />,
}));

// MSWサーバーのセットアップ
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// エラーメッセージ
const ERROR_MESSAGES = {
  BACKEND_ERROR: "メールアドレスまたはパスワードが違います",
} as const;

// 正常系ユーザー入力
const USUAL_USER_INPUT = {
  MAIL_ADDRESS: "sample-user@example.com",
  PASSWORD: "password",
} as const;

describe("Login Page", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    user = userEvent.setup(); // userEventの初期化
    renderSignInPage(); // レンダリング
    emailInput = screen.getByLabelText("E-mail");
    passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    submitButton = screen.getByRole("button", { name: "Log in" });
  });

  describe("初期状態", () => {
    it("ログインボタンがenabledであること", async () => {
      expect(submitButton).toBeEnabled();
    });
    it("全てのフォームが空であること", async () => {
      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");
    });
    it("エラーメッセージが表示されていないこと", async () => {
      expect(
        screen.queryByText(ERROR_MESSAGES.BACKEND_ERROR),
      ).not.toBeInTheDocument();
    });
  });
  describe("メールアドレスフォーム動作確認", () => {
    // テスト対象以外のフォームは正常系で埋めておく
    beforeEach(async () => {
      await user.type(passwordInput, USUAL_USER_INPUT.PASSWORD);
    });
    it("E-mailフォームへのユーザー入力が画面に反映されること", async () => {
      await user.type(emailInput, USUAL_USER_INPUT.MAIL_ADDRESS);
      expect(emailInput.value).toBe(USUAL_USER_INPUT.MAIL_ADDRESS);
    });
  });
  describe("パスワードフォーム動作確認", () => {
    // テスト対象以外のフォームは正常系で埋めておく
    beforeEach(async () => {
      await user.type(emailInput, USUAL_USER_INPUT.MAIL_ADDRESS);
    });
    it("パスワードフォームへのユーザー入力が画面に反映されること", async () => {
      await user.type(passwordInput, USUAL_USER_INPUT.PASSWORD);
      expect(passwordInput.value).toBe(USUAL_USER_INPUT.PASSWORD);
    });
  });
  describe("ログインボタン動作", () => {
    it("ログイン成功時には単語帳一覧ページに遷移すること", async () => {
      await user.type(emailInput, USUAL_USER_INPUT.MAIL_ADDRESS);
      await user.type(passwordInput, USUAL_USER_INPUT.PASSWORD);
      await user.click(submitButton);
      const element = await screen.findAllByText(
        "単語帳一覧",
        {},
        { timeout: 2000 },
      );
      expect(element.length).toBe(2);
    });
    it("ログイン失敗時には、メールアドレスまたはパスワードが異なる旨を表示すること", async () => {
      await user.type(emailInput, USUAL_USER_INPUT.MAIL_ADDRESS);
      await user.type(passwordInput, "password123");
      await user.click(submitButton);
      const element = await screen.findByText(ERROR_MESSAGES.BACKEND_ERROR);
      expect(element).toBeInTheDocument();
    });
    it("フォーム未入力でボタン押下時に、メールアドレスまたはパスワードが異なる旨を表示すること", async () => {
      await user.click(submitButton);
      const element = await screen.findByText(ERROR_MESSAGES.BACKEND_ERROR);
      expect(element).toBeInTheDocument();
    });
  });
  describe("アカウント登録ページボタン動作", () => {
    it("新規登録ボタンを押下すると、新規登録ページに遷移すること", async () => {
      const signUpButton = screen.getByRole("button", { name: "Sign up" });
      await user.click(signUpButton);
      const element = await screen.findByText("Sign up", {}, { timeout: 2000 });
      expect(element).toBeInTheDocument();
    });
  });
});
