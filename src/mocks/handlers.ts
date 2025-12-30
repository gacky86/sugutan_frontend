import { http, HttpResponse } from "msw";
import type { Flashcard, Card } from "@/types";

export const handlers = [
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
];
