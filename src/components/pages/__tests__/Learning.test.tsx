import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
// import { getByRole, screen, waitFor } from "@testing-library/react";
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
import { renderLearningPage } from "@/tests/utils/renderPage";
// msw
import { handlers } from "@/mocks/handlers";
import { setupServer } from "msw/node";

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

describe("Learning Page", () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(async () => {
    user = userEvent.setup(); // userEventの初期化
    renderLearningPage(); // レンダリング
    const flashcard = await screen.findByText("english phrases");
    user.click(flashcard);
    await screen.findByText("単語帳設定");

    // FlashcardDetailModal内でinputボタン押下時にinitializeCardProgressesを実行
    // この時にflashcard.idとモードを指定してBEのAPIを叩いて問題のリストを取得してくる
    // stateにはこのリストを保管しており、優先順に出題していく仕組み
    // テストをする上では、initializeCardProgressesをmockして、出題のリストを2問分返す設定とする
    // mock関数はモードによって返す問題を切り替える
    // このためにレンダリング必要なコンポーネントは、変にmockしたり一部分だけレンダリングするのもアレなので
    // FlashcardsのレンダリングにLearningをプラスして、modalState をあらかじめ開いた状態のものを与えておいて
    // beforeEachでinputボタンを押したことにする
  });

  describe("Inputモード動作", () => {
    beforeEach(() => {
      const inputModeButton = screen.getByRole("button", {
        name: "Inputモードで学習",
      });
      user.click(inputModeButton);
    });
    it("Inputモードで2問分出題時の動作確認", async () => {
      // 「Inputモードで学習」をクリックはBeforeEachで完了
      // 1問目例文（英語）が表示
      const firstQuestion = await screen.findByText("I eat an apple.");
      expect(firstQuestion).toBeInTheDocument();
      // 「Show answer」ボタンをクリック
      let showAnswerButton = screen.getByRole("button", {
        name: "show answer",
      });
      user.click(showAnswerButton);
      // 回答と補足事項表示
      const firstAnswer = await screen.findByText("私はりんごを食べる。");
      // 補足事項表示ボタンの押下
      let showExtraInfoButton = screen.getByRole("button", {
        name: "show extraInfo",
      });
      user.click(showExtraInfoButton);
      let synonymLabel = await screen.findByText(
        "類義語・類似表現",
        {},
        { timeout: 2000 },
      );
      let synonym = await screen.findByText("fruit");
      let antonymLabel = await screen.findByText("対義語・対義表現");
      let antonym = await screen.findByText("meat");
      expect(firstAnswer).toBeInTheDocument();
      expect(synonymLabel).toBeInTheDocument();
      expect(synonym).toBeInTheDocument();
      expect(antonymLabel).toBeInTheDocument();
      expect(antonym).toBeInTheDocument();
      // 「難易度」ボタンクリック
      let difficultyButton = screen.getByRole("button", { name: "normal" });
      user.click(difficultyButton);
      // 2問目例文（英語）が表示
      const secondQuestion = await screen.findByText(
        "Take the medicine everyday.",
      );
      expect(secondQuestion).toBeInTheDocument();
      // 「Show answer」ボタンをクリック
      showAnswerButton = screen.getByRole("button", { name: "show answer" });
      user.click(showAnswerButton);
      // 回答と補足事項表示
      const secondAnswer = await screen.findByText("その薬を毎日飲む。");
      // 補足事項表示ボタンの押下
      showExtraInfoButton = screen.getByRole("button", {
        name: "show extraInfo",
      });
      user.click(showExtraInfoButton);
      synonymLabel = await screen.findByText(
        "類義語・類似表現",
        {},
        { timeout: 2000 },
      );
      synonym = await screen.findByText("fruit");
      antonymLabel = await screen.findByText("対義語・対義表現");
      antonym = await screen.findByText("meat");
      expect(secondAnswer).toBeInTheDocument();
      expect(synonymLabel).toBeInTheDocument();
      expect(synonym).toBeInTheDocument();
      expect(antonymLabel).toBeInTheDocument();
      expect(antonym).toBeInTheDocument();
      // 「難易度」ボタンクリック
      difficultyButton = screen.getByRole("button", { name: "normal" });
      user.click(difficultyButton);
      // 出題終了メッセージ表示
      const endMessage = await screen.findByText(
        "おめでとう！本日分の学習は完了しました。",
      );
      expect(endMessage).toBeInTheDocument();
    });
  });
  // describe("Outputモード動作", () => {
  //   beforeEach(() => {
  //     const inputModeButton = screen.getByRole("button", {
  //       name: "Outputモードで学習",
  //     });
  //     user.click(inputModeButton);
  //   });
  //   it("Outputモードで2問分出題時の動作確認", async () => {
  //     // 「Outputモードで学習」をクリックはBeforeEachで完了
  //     // 1問目例文（日本語）が表示
  //     const firstQuestion = await screen.findByText("私はりんごを食べる。");
  //     expect(firstQuestion).toBeInTheDocument();
  //     // 「Show answer」ボタンをクリック
  //     let showAnswerButton = screen.getByRole("button", {
  //       name: "show answer",
  //     });
  //     user.click(showAnswerButton);
  //     // 回答と補足事項表示
  //     const firstAnswer = await screen.findByText("I eat an apple.");
  //     // 補足事項表示ボタンの押下
  //     let showExtraInfoButton = screen.getByRole("button", {
  //       name: "show extraInfo",
  //     });
  //     user.click(showExtraInfoButton);
  //     let synonymLabel = await screen.findByText("類義語・類似表現");
  //     let synonym = await screen.findByText("fruit");
  //     let antonymLabel = await screen.findByText("対義語・対義表現");
  //     let antonym = await screen.findByText("meat");
  //     expect(firstAnswer).toBeInTheDocument();
  //     expect(synonymLabel).toBeInTheDocument();
  //     expect(synonym).toBeInTheDocument();
  //     expect(antonymLabel).toBeInTheDocument();
  //     expect(antonym).toBeInTheDocument();
  //     // 「難易度」ボタンクリック
  //     let difficultyButton = screen.getByRole("button", { name: "normal" });
  //     user.click(difficultyButton);
  //     // 2問目例文（日本語）が表示
  //     const secondQuestion = await screen.findByText("その薬を毎日飲む。");
  //     expect(secondQuestion).toBeInTheDocument();
  //     // 「Show answer」ボタンをクリック
  //     showAnswerButton = screen.getByRole("button", { name: "show answer" });
  //     user.click(showAnswerButton);
  //     // 回答と補足事項表示
  //     const secondAnswer = await screen.findByText(
  //       "Take the medicine everyday.",
  //     );
  //     // 補足事項表示ボタンの押下
  //     showExtraInfoButton = screen.getByRole("button", {
  //       name: "show extraInfo",
  //     });
  //     user.click(showExtraInfoButton);
  //     synonymLabel = await screen.findByText("類義語・類似表現");
  //     synonym = await screen.findByText("fruit");
  //     antonymLabel = await screen.findByText("対義語・対義表現");
  //     antonym = await screen.findByText("meat");
  //     expect(secondAnswer).toBeInTheDocument();
  //     expect(synonymLabel).toBeInTheDocument();
  //     expect(synonym).toBeInTheDocument();
  //     expect(antonymLabel).toBeInTheDocument();
  //     expect(antonym).toBeInTheDocument();
  //     // 「難易度」ボタンクリック
  //     difficultyButton = screen.getByRole("button", { name: "normal" });
  //     user.click(difficultyButton);
  //     // 出題終了メッセージ表示
  //     const endMessage = await screen.findByText(
  //       "おめでとう！本日分の学習は完了しました。",
  //     );
  //     expect(endMessage).toBeInTheDocument();
  //   });
  // });
});
