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
  pronunciation: string;
}
export interface CardParams {
  front: string;
  back: string;
  frontSentence: string;
  backSentence: string;
  explanationFront: string;
  explanationBack: string;
  cardType: string;
  pronunciation: string;
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
  pronunciation: FieldState;
};

export const cardTypes: string[] = [
  "名詞", // noun
  "動詞", // verb
  "形容詞", // adjective
  "副詞", // adverb
  "連語・フレーズ", // phrase
  "イディオム", // idiom
  "助動詞", // auxiliary verb
  "接続詞", // conjunction
  "代名詞", // pronoun
  "前置詞", // preposition
  "冠詞", // article
  "その他", // other
];
