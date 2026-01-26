import "@testing-library/jest-dom/vitest";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  it,
  vi,
  expect,
  beforeAll,
  afterEach,
  afterAll,
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

describe("Flashcards Page", () => {
  it("E-mailフォームへのユーザー入力が画面に反映されること", async () => {
    renderSignInPage();
    const emailInput = screen.getByLabelText("E-mail") as HTMLInputElement;
    fireEvent.change(emailInput, {
      target: { value: "sample-user@example.com" },
    });
    expect(emailInput.value).toBe("sample-user@example.com");
  });
  it("パスワードフォームへのユーザー入力が画面に反映されること", async () => {
    renderSignInPage();
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    expect(passwordInput.value).toBe("password");
  });
  it("ログイン成功時には単語帳一覧ページに遷移すること", async () => {
    const user = userEvent.setup();
    renderSignInPage();
    const emailInput = screen.getByLabelText("E-mail") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "Log in" });

    await user.type(emailInput, "sample-user@example.com");
    await user.type(passwordInput, "password");
    await user.click(submitButton);
    const element = await screen.findAllByText(
      "単語帳一覧",
      {},
      { timeout: 2000 },
    );
    expect(element.length).toBe(2);
  });
  it("ログイン失敗時には、メールアドレスまたはパスワードが異なる旨を表示すること", async () => {
    const user = userEvent.setup();
    renderSignInPage();
    const emailInput = screen.getByLabelText("E-mail") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "Log in" });

    await user.type(emailInput, "sample-user@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);
    const element = await screen.findByText(
      "メールアドレスまたはパスワードが違います",
    );
    expect(element).toBeInTheDocument();
  });
  it("新規登録ボタンを押下すると、新規登録ページに遷移すること", async () => {
    const user = userEvent.setup();
    renderSignInPage();
    const signUpButton = screen.getByRole("button", { name: "Sign up" });
    await user.click(signUpButton);
    const element = await screen.findByText("Sign up", {}, { timeout: 2000 });
    expect(element).toBeInTheDocument();
  });
});
