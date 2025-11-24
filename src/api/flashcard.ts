// flashcard.ts
import type { Flashcard, FlashcardParams } from "@/types/index";

import client from "@/api/client";

// 一覧
export const getMyFlashcardList = () => {
  return client.get<Flashcard[]>("/flashcards", {
    params: { only_mine: "onlyMine" },
  });
};

// 詳細
export const getFlashcardDetail = (id: number) => {
  return client.get<Flashcard>(`/flashcards/${id}`);
};

// 新規作成
export const createFlashcard = (params: FlashcardParams) => {
  return client.post("/flashcards", params);
};

// 更新
export const updateFlashcard = (id: number, params: Flashcard) => {
  return client.patch(`/flashcards/${id}`, params);
};

// 削除
export const deleteFlashcard = (id: number) => {
  return client.delete(`/flashcards/${id}`);
};

// 「学習するべき順番に並び替えたときの優先順位が一番目のカード」を取得
export const getCardToLearn = (
  flashcardId: number,
  learningMode: "input" | "output",
  lastCardId: number
) => {
  return client.get(`/flashcards/${flashcardId}/card_to_learn`, {
    params: { learning_mode: learningMode, last_card_id: lastCardId },
  });
};

export const getCountsTodaysCards = (flashcardId: number) => {
  return client.get(`/flashcards/${flashcardId}/count_todays_cards`);
};

export const getFlashcardProficiency = (flashcardId: number) => {
  return client.get(`/flashcards/${flashcardId}/flashcard_proficiency`);
};
