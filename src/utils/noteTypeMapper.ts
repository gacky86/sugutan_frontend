export type NoteTypeEN =
  | "synonyms"
  | "antonyms"
  | "etymology"
  | "collocations"
  | "other";
export type NoteTypeJP =
  | "類義語・類似表現"
  | "対義語・対義表現"
  | "語源・構成"
  | "コロケーション・イディオム"
  | "その他";

const NoteTypeENtoJP: Record<NoteTypeEN, NoteTypeJP> = {
  synonyms: "類義語・類似表現",
  antonyms: "対義語・対義表現",
  etymology: "語源・構成",
  collocations: "コロケーション・イディオム",
  other: "その他",
};
export function convertNoteTypeENtoJP(noteType: NoteTypeEN): NoteTypeJP {
  return NoteTypeENtoJP[noteType];
}

const NoteTypeJPtoEN: Record<NoteTypeJP, NoteTypeEN> = {
  類義語・類似表現: "synonyms",
  対義語・対義表現: "antonyms",
  語源・構成: "etymology",
  コロケーション・イディオム: "collocations",
  その他: "other",
};
export function convertNoteTypeJPtoEN(noteType: NoteTypeJP): NoteTypeEN {
  return NoteTypeJPtoEN[noteType];
}
