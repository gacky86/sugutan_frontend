// import "@testing-library/jest-dom/vitest";
// import { screen, waitFor, fireEvent } from "@testing-library/react";
// import {
//   describe,
//   it,
//   expect,
//   vi,
//   beforeAll,
//   afterEach,
//   afterAll,
// } from "vitest";
// import Flashcards from "@/components/pages/Flashcards";

// import "@testing-library/jest-dom/vitest";

// // Redux
// import { renderWithProviders } from "@/tests/utils/renderWithProviders";
// import type { User } from "@/types";
// // msw
// import { handlers } from "@/mocks/handlers";
// import { setupServer } from "msw/node";

// // svgファイルのimportのmock
// vi.mock("@/assets/sugutan_logo.svg?react", () => ({
//   default: () => <svg data-testid="logo" />,
// }));

// // MSWサーバーのセットアップ
// const server = setupServer(...handlers);
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// // ログイン済みのUser State
// const authState = {
//   loading: false,
//   isSignedIn: true,
//   currentUser: {
//     id: 1,
//     email: "test@example.com",
//   } as User,
// };

// describe("Flashcards Page", () => {
//   it("E-mailフォームへのユーザー入力が画面に反映されること", async () => {});
//   it("パスワードフォームへのユーザー入力が画面に反映されること", async () => {});
//   it("ログイン成功時には単語帳一覧ページに遷移すること", async () => {});
//   it("ログイン失敗時には、メールアドレスまたはパスワードが異なる旨を表示すること", async () => {});
//   it("新規登録ボタンを押下すると、新規登録ページに遷移すること", async () => {});
// });
