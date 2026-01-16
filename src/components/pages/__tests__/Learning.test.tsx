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
//   it("単語帳詳細モーダルより、「Inputモードで学習」をクリックすると、カードの英語側の例文が出題される", async () => {});
//   it("単語帳詳細モーダルより、「Outputモードで学習」をクリックすると、カードの日本語側の例文が出題される", async () => {});
//   it("例文が出題された状態で、「Show answer」ボタンをクリックすると、回答とカードの情報が表示される", async () => {});
//   it("回答が出題された状態で、難易度選択ボタンのいずれかをクリックすると、次の問題が表示される", async () => {});
//   it("本日学習対象の問題が全て出題し終わると、本日分の学習が完了した旨が表示される", async () => {});
//   it("学習開始時に本日学習対象の問題がない場合、本日分の学習が完了した旨が表示される", async () => {});
// });
