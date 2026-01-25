import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  it,
  vi,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from "vitest";

import "@testing-library/jest-dom/vitest";

// msw
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";
import { renderSignUpPage } from "@/tests/utils/renderPage";

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

// エラーメッセージ
const ERROR_MESSAGES = {
  PASSWORD_LENGTH: "パスワードの入力文字数は8文字以上20文字以下です",
  PASSWORD_MISMATCH: "パスワードと確認用パスワードが一致しません",
  PASSWORD_INVALID_LETTER: `パスワードに使用できない文字が入力されています（半角英数字、"_"
              アンダースコアのみ使用可）`,
  BACKEND_ERROR: "ユーザー登録に失敗しました",
} as const;

// 正常系ユーザー入力
const USUAL_USER_INPUT = {
  MAIL_ADDRESS: "sample-user@example.com",
  PASSWORD: "01234567",
  PASSWORDCONFIRMATION: "01234567",
} as const;

describe.only("SignUp Page", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let passwordConfirmationInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    user = userEvent.setup(); // userEventの初期化
    renderSignUpPage(); // レンダリング
    emailInput = screen.getByLabelText("E-mail");
    passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    passwordConfirmationInput = screen.getByLabelText(
      "Password Confirmation",
    ) as HTMLInputElement;
    submitButton = screen.getByRole("button", { name: "Sign up" });
  });

  describe("初期状態", () => {
    it("アカウント登録ボタンがdisabledであること", async () => {
      expect(submitButton).toBeDisabled();
    });
    it("全てのフォームが空であること", async () => {
      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");
      expect(passwordConfirmationInput.value).toBe("");
    });
    it("エラーメッセージが表示されていないこと", async () => {
      expect(
        screen.queryByText(ERROR_MESSAGES.PASSWORD_LENGTH),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(ERROR_MESSAGES.PASSWORD_MISMATCH),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(ERROR_MESSAGES.PASSWORD_INVALID_LETTER),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(ERROR_MESSAGES.BACKEND_ERROR),
      ).not.toBeInTheDocument();
    });
  });
  describe("メールアドレスフォーム動作確認", () => {
    // テスト対象以外のフォームは正常系で埋めておく
    beforeEach(async () => {
      await user.type(passwordInput, USUAL_USER_INPUT.PASSWORD);
      await user.type(
        passwordConfirmationInput,
        USUAL_USER_INPUT.PASSWORDCONFIRMATION,
      );
    });
    it("E-mailフォームへのユーザー入力が画面に反映されること", async () => {
      await user.type(emailInput, USUAL_USER_INPUT.MAIL_ADDRESS);
      expect(emailInput.value).toBe(USUAL_USER_INPUT.MAIL_ADDRESS);
    });
    // メールアドレスの型に合わない入力で登録ボタン押下
  });
  describe("パスワードフォーム動作確認", () => {
    // テスト対象以外のフォームは正常系で埋めておく
    beforeEach(async () => {
      await user.type(emailInput, USUAL_USER_INPUT.MAIL_ADDRESS);
      await user.type(
        passwordConfirmationInput,
        USUAL_USER_INPUT.PASSWORDCONFIRMATION,
      );
    });
    it("パスワードフォームへのユーザー入力が画面に反映されること", async () => {
      await user.type(passwordInput, USUAL_USER_INPUT.PASSWORD);
      expect(passwordInput.value).toBe(USUAL_USER_INPUT.PASSWORD);
    });
    it("パスワードの文字数が入力中に20字を超えると、パスワードの文字数制限(8~20字)が表示され、登録ボタンがdisabledになること", async () => {
      await user.type(passwordInput, "012345678901234567890");
      const element = screen.getByText(
        "パスワードの入力文字数は8文字以上20文字以下です",
      );
      expect(element).toBeInTheDocument();
    });
    it("パスワードの文字数が入力中に20字を超えたあと、20字以下に修正した場合パスワードの文字数制限(8~20字)が表示されないこと", async () => {
      await user.type(passwordInput, "012345678901234567890");
      await user.keyboard("{Backspace}");
      const element = screen.queryByText(
        "パスワードの入力文字数は8文字以上20文字以下です",
      );
      expect(element).not.toBeInTheDocument();
    });
    it("パスワードの文字数が入力中に8文字以下の場合、パスワードの文字数制限(8~20字)が表示されること", async () => {
      await user.type(passwordInput, "0123456");
      const element = screen.getByText(
        "パスワードの入力文字数は8文字以上20文字以下です",
      );
      expect(element).toBeInTheDocument();
    });
    it("パスワードの文字数が入力中に8文字以下となった後、8文字以上に修正した場合、パスワードの文字数制限(8~20字)が表示されないこと", async () => {
      await user.type(passwordInput, "0123456");
      await user.type(passwordInput, "7");
      const element = screen.queryByText(
        "パスワードの入力文字数は8文字以上20文字以下です",
      );
      expect(element).not.toBeInTheDocument();
    });
  });
  describe("パスワードフォーム(確認用)動作確認", () => {
    // テスト対象以外のフォームは正常系で埋めておく
    beforeEach(async () => {
      await user.type(emailInput, USUAL_USER_INPUT.MAIL_ADDRESS);
      await user.type(passwordInput, USUAL_USER_INPUT.PASSWORD);
    });
    it("パスワード(確認用)フォームへのユーザー入力が画面に反映されること", async () => {
      await user.type(passwordConfirmationInput, "password");
      expect(passwordConfirmationInput.value).toBe("password");
    });
    it("パスワード(確認用)の文字数が入力中に20字を超えると、パスワードの文字数制限(8~20字)が表示されること", async () => {
      await user.type(passwordConfirmationInput, "012345678901234567890");
      const element = screen.getByText(
        "パスワードの入力文字数は8文字以上20文字以下です",
      );
      expect(element).toBeInTheDocument();
    });
    it("パスワード(確認用)の文字数が入力中に20字を超えたあと、20字以下に修正した場合パスワードの文字数制限(8~20字)が表示されないこと", async () => {
      await user.type(passwordConfirmationInput, "012345678901234567890");
      await user.keyboard("{Backspace}");
      const element = screen.queryByText(
        "パスワードの入力文字数は8文字以上20文字以下です",
      );
      expect(element).not.toBeInTheDocument();
    });
    it("パスワード(確認用)の文字数が入力中に8文字以下の場合、パスワードの文字数制限(8~20字)が表示されること", async () => {
      await user.type(passwordConfirmationInput, "0123456");
      const element = screen.getByText(
        "パスワードの入力文字数は8文字以上20文字以下です",
      );
      expect(element).toBeInTheDocument();
    });
    it("パスワード(確認用)の文字数が入力中に8文字以下となった後、8文字以上に修正した場合、パスワードの文字数制限(8~20字)が表示されないこと", async () => {
      await user.type(passwordConfirmationInput, "0123456");
      await user.type(passwordConfirmationInput, "7");
      const element = screen.queryByText(
        "パスワードの入力文字数は8文字以上20文字以下です",
      );
      expect(element).not.toBeInTheDocument();
    });
  });
  describe("登録ボタン動作", () => {
    it("登録ボタン押下時、確認用パスワードとの一致が取れない場合はその旨を表示し、アカウント作成ができないこと", async () => {
      await user.type(emailInput, "sample-user@example.com");
      await user.type(passwordInput, "012345678");
      await user.type(passwordConfirmationInput, "0123456789");
      await user.click(submitButton);
      const element = screen.getByText(
        "パスワードと確認用パスワードが一致しません",
      );
      expect(element).toBeInTheDocument();
    });
    it("正常系入力でenabled=>入力不足でdisabled", async () => {
      await user.type(emailInput, USUAL_USER_INPUT.MAIL_ADDRESS);
      await user.type(passwordInput, USUAL_USER_INPUT.PASSWORD);
      await user.type(
        passwordConfirmationInput,
        USUAL_USER_INPUT.PASSWORDCONFIRMATION,
      );
      expect(submitButton).toBeEnabled();
      await user.clear(passwordInput);
      expect(submitButton).toBeDisabled();
    });
  });
});
