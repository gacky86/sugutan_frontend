export interface Flashcard {
  id: number;
  title: string;
  description: string;
  language: string;
  cardsCount: number;
  lastReviewedDaysAgo: number;
}
export interface FlashcardParams {
  title: string;
  description: string;
  language: string;
  iconColor: string;
}
