import client from "@/api/client";
import type { Difficulty } from "@/types";

export const initializeCardProgresses = (
  flashcardId: number,
  mode: "input" | "output"
) => {
  return client.post("/card_progresses/start_learning", { flashcardId, mode });
};

export const getDueCardProgresses = (mode: "input" | "output") => {
  return client.get("/card_progresses/due", { params: { mode } });
};

export const submitProgress = (progressId: number, difficulty: Difficulty) => {
  return client.post(`/card_progresses/${progressId}/review`, {
    difficulty: difficulty,
  });
};
