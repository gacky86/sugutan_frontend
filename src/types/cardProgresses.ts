import type { Card } from "./cards";

export type Difficulty = "again" | "hard" | "normal" | "easy";

export type CardProgress = {
  userId: number;
  cardId: number;
  intervalDays: number;
  nextReviewAt: string;
  reviewCount: number;
  easinessFactor: number;
  lastReviewed_at: string;
  card: Card;
};
