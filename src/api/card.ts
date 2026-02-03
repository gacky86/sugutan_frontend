// card.ts
// 役割：HTTPリクエストを定義すること
import client from "./client";
import type { CardParams } from "@/types/index";

// 一覧
export const getCardList = (flashcard_id: number) => {
  return client.get(`/flashcards/${flashcard_id}/cards`);
};

// 詳細
export const getCardDetail = (flashcard_id: number, id: number) => {
  return client.get(`/flashcards/${flashcard_id}/cards/${id}`);
};

// 新規作成
export const createCard = (flashcard_id: number, params: CardParams) => {
  console.log(params);

  return client.post(`/flashcards/${flashcard_id}/cards`, params);
};

// 更新
export const updateCard = (
  flashcard_id: number,
  id: number,
  params: CardParams,
) => {
  return client.patch(`/flashcards/${flashcard_id}/cards/${id}`, params);
};

// 削除
export const deleteCard = (flashcard_id: number, id: number) => {
  return client.delete(`/flashcards/${flashcard_id}/cards/${id}`);
};

// 単語帳学習機能難易度ボタンを押した時の処理
export const updateCardLearningFactor = (
  flashcardId: number,
  id: number,
  difficulty: "Again" | "Hard" | "Good" | "Easy",
  learningMode: "input" | "output",
) => {
  return client.patch(
    `/flashcards/${flashcardId}/cards/${id}/update_learning_factor`,
    { difficulty: difficulty, learning_mode: learningMode },
  );
};
