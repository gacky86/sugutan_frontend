import client from "@/api/client";
import type { Difficulty } from "@/types";

export const initializeCardProgresses = (flashcardId: number) => {
  return client.post("/card_progresses/start_learning", { flashcardId });
};

export const getDueCardProgresses = () => {
  return client.get("/card_progresses/due");
};

export const submitProgress = (progressId: number, difficulty: Difficulty) => {
  return client.post(`/card_progresses/${progressId}/review`, {
    difficulty: difficulty,
  });
};
