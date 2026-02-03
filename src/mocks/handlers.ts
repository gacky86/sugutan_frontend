import { http, HttpResponse } from "msw";
import type {
  CardParams,
  ExtraNoteParams,
  User,
  RailsErrorResponse,
  SignInParams,
} from "@/types";
import {
  mockFlashcards,
  mockCards,
  mockDictionaryResults,
  mockCardProgresses,
} from "@/mocks/mockData";

export const handlers = [
  // Flashcard一覧取得
  http.get("*/api/v1/flashcards", () => {
    return HttpResponse.json(mockFlashcards);
  }),
  // カード一覧取得 (GET)
  // :flashcard_id の部分はワイルドカードとして機能し、paramsから取得
  http.get("*/api/v1/flashcards/:flashcard_id/cards", ({ params }) => {
    // const { flashcard_id } = params;
    console.log(params);
    return HttpResponse.json(mockCards);
  }),
  // gemini生成
  http.post("*/api/v1/gemini/dictionary", () => {
    return HttpResponse.json(mockDictionaryResults);
  }),
  // card作成
  http.post(
    "*/api/v1/flashcards/:flashcard_id/cards",
    async ({ request, params }) => {
      // 1. パスパラメータを取得
      const { flashcard_id } = params;

      // 2. リクエストボディを取得 (params: CardParams の中身)
      const newCardData = (await request.json()) as CardParams;

      // 3. 成功レスポンスを返す
      return HttpResponse.json(
        {
          id: Math.floor(Math.random() * 1000),
          flashcard_id: Number(flashcard_id),
          ...newCardData,
        },
        { status: 200 },
      );
    },
  ),
  // extraNote作成
  http.post(
    "*/api/v1/cards/:card_id/extra_notes",
    async ({ request, params }) => {
      // 1. パスパラメータを取得
      const { card_id } = params;

      // 2. リクエストボディを取得 (params: CardParams の中身)
      const newExtraNoteData = (await request.json()) as ExtraNoteParams;

      // 3. 成功レスポンスを返す
      return HttpResponse.json(
        {
          id: Math.floor(Math.random() * 1000),
          card_id: Number(card_id),
          ...newExtraNoteData,
        },
        { status: 200 },
      );
    },
  ),
  // sign in関数
  http.post("*/auth/sign_in", async ({ request }) => {
    const body = (await request.json()) as SignInParams;
    const { email, password } = body;

    const isValidUser =
      email === "sample-user@example.com" && password === "password";
    if (isValidUser) {
      const mockUser: User = {
        id: 1,
        uid: "abc-123-def-456",
        provider: "email",
        email: "sample-user@example.com",
        name: "taro",
        allowPasswordChange: true,
        created_at: new Date("2023-10-01T10:00:00Z"),
        updated_at: new Date("2024-01-20T15:30:00Z"),
      };
      return HttpResponse.json({ data: { data: mockUser } });
    } else {
      const errorResponse: RailsErrorResponse = {
        error: "メールアドレスまたはパスワードが違います",
      };

      return HttpResponse.json(errorResponse, { status: 401 });
    }
  }),
  http.post("*/card_progresses/start_learning", async ({ request }) => {
    // Flashcard中のCardに対するCardProgressの初期化(CardにCardProgressがなければ初期化をして準備する)
    // テスト上では何もしない
    const body = (await request.json()) as {
      flashcardId: number;
      mode: string;
    };
    const { flashcardId, mode } = body;
    console.log(
      `initializeCardProgresses was called with flashcardId: ${flashcardId}, mode: ${mode}`,
    );
    return HttpResponse.json(
      { message: "cards in this flashcard were initialized" },
      { status: 200 },
    );
  }),
  http.get("*/card_progresses/due", async () => {
    // 出題するカードの情報を返却する
    return HttpResponse.json(mockCardProgresses);
  }),
];
