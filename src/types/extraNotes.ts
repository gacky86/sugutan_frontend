export interface ExtraNote {
  id: number;
  cardId: number;
  noteType: string;
  content: string;
}
export interface ExtraNoteParams {
  noteType: string;
  content: string;
}
type FieldState = {
  lengthCheck: boolean;
  input: string;
};
export type ExtraNoteInputState = {
  id?: number;
  noteType: FieldState;
  content: FieldState;
};

export const extraNoteTypes: string[] = [
  "類義語・類似表現",
  "対義語・対義表現",
  "語源・構成",
  "コロケーション・イディオム",
  "その他",
];
