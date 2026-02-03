export type Difficulty = "again" | "hard" | "normal" | "easy";
export interface DueCard {
  id: number;
  flashcardId: number;
  front: string;
  back: string;
  frontSentence: string;
  backSentence: string;
  cardType: string;
  extraNotes: ExtraNote[];
  pronunciation: string;
  explanation: string;
}
interface ExtraNote {
  id: number;
  cardId: number;
  noteType: string;
  content: string;
}

export type CardProgress = {
  userId: number;
  cardId: number;
  id: number;
  intervalDays: number;
  nextReviewAt: string;
  reviewCount: number;
  easinessFactor: number;
  lastReviewedAt: string;
  card: DueCard;
};

export type SubmitedProgresss = {
  userId: number;
  cardId: number;
  id: number;
  intervalDays: number;
  nextReviewAt: string;
  reviewCount: number;
  easinessFactor: number;
  lastReviewedAt: string;
  mode: "input" | "output";
};
