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
export type FieldState = {
  lengthCheck: boolean;
  input: string;
};
export type CardInputState = {
  front: FieldState;
  back: FieldState;
  frontSentence: FieldState;
  backSentence: FieldState;
  explanation: FieldState;
};
