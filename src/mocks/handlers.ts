import { http, HttpResponse } from "msw";
import type {
  Flashcard,
  Card,
  DictionarySearchResult,
  CardParams,
  ExtraNoteParams,
} from "@/types";

export const handlers = [
  // Flashcard一覧取得
  http.get("*/api/v1/flashcards", () => {
    const mockData: Flashcard[] = [
      {
        id: 0,
        title: "english phrases",
        description: "phrases you can use in daily life",
        language: "EN",
        cardsCount: 100,
        lastReviewedDaysAgo: 1,
      },
      {
        id: 1,
        title: "french words",
        description: "french words in daily life",
        language: "FR",
        cardsCount: 200,
        lastReviewedDaysAgo: 3,
      },
    ];
    return HttpResponse.json(mockData);
  }),
  // カード一覧取得 (GET)
  // :flashcard_id の部分はワイルドカードとして機能し、paramsから取得できます
  http.get("*/api/v1/flashcards/:flashcard_id/cards", ({ params }) => {
    const { flashcard_id } = params;
    const mockCards: Card[] = [
      {
        id: 101,
        flashcardId: Number(flashcard_id),
        front: "りんご",
        back: "apple",
        frontSentence: "私はりんごを食べる。",
        backSentence: "I eat an apple.",
        explanationFront: "",
        explanationBack: "",
        cardType: "noun",
      },
      {
        id: 102,
        flashcardId: Number(flashcard_id),
        front: "飲む",
        back: "take",
        frontSentence: "その薬を毎日飲む。",
        backSentence: "Take the medicine everyday.",
        explanationFront: "",
        explanationBack: "",
        cardType: "verb",
      },
    ];

    return HttpResponse.json(mockCards);
  }),
  // gemini生成
  http.post("*/api/v1/gemini/dictionary", () => {
    const mockResults: DictionarySearchResult[] = [
      {
        translation: { jp: "りんご", en: "apple" },
        definition: {
          jp: "バラ科リンゴ属の落葉高木、およびその果実。世界中で広く栽培され、食用とされる。",
          en: "A common, edible fruit, typically round, with red,…nd crisp, white flesh. It grows on an apple tree.",
        },
        example: {
          jp: "毎日りんごを食べると医者いらず。",
          en: "An apple a day keeps the doctor away.",
        },
        synonyms: [],
        antonyms: [],
        etymology: "From Old English æppel.",
        partOfSpeech: "noun",
        collocations: [
          "red apple",
          "green apple",
          "apple pie",
          "apple juice",
          "apple tree",
        ],
        success: true,
      },
    ];

    return HttpResponse.json(mockResults);
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
        { status: 200 }
      );
    }
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
        { status: 200 }
      );
    }
  ),
];
