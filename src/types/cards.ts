export interface Card {
  id: number;
  flashcardId: number;
  front: string;
  back: string;
  frontSentence: string;
  backSentence: string;
  explanation: string;
}
export interface CardParams {
  front: string;
  back: string;
  frontSentence: string;
  backSentence: string;
  explanation: string;
}
