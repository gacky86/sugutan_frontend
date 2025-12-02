export interface Card {
  id: number;
  flashcardId: number;
  front: string;
  back: string;
  frontSentence: string;
  backSentence: string;
  explanationFront: string;
  explanationBack: string;
  cardType: string;
}
export interface CardParams {
  front: string;
  back: string;
  frontSentence: string;
  backSentence: string;
  explanationFront: string;
  explanationBack: string;
  cardType: string;
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
  explanationFront: FieldState;
  explanationBack: FieldState;
  cardType: FieldState;
};

export const cardTypes: string[] = [
  "名詞",
  "動詞",
  "形容詞",
  "副詞",
  "連語・フレーズ",
  "イディオム",
  "助動詞",
  "接続詞",
  "代名詞",
  "前置詞",
  "冠詞",
  "その他",
];
