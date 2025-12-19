export type Difficulty = "again" | "hard" | "normal" | "easy";
interface Card {
  id: number;
  flashcardId: number;
  front: string;
  back: string;
  frontSentence: string;
  backSentence: string;
  explanationFront: string;
  explanationBack: string;
  cardType: string;
  extraNotes: ExtraNote[];
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
  card: Card;
};
