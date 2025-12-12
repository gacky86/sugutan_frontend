import type { PartOfSpeech } from "@/utils/dictionaryLabelMapper";

export interface DictionarySearchResult {
  translation: { jp: string; en: string };
  definition: { jp: string; en: string };
  example: { jp: string; en: string };
  synonyms: string[] | [];
  antonyms: string[] | [];
  etymology: string;
  partOfSpeech: PartOfSpeech;
  collocations: string[];
}

// idはnanoidによる付加なのでstring
export interface DictionarySearchResultWithId {
  id: string;
  translation: { jp: string; en: string };
  definition: { jp: string; en: string };
  example: { jp: string; en: string };
  synonyms: string[] | [];
  antonyms: string[] | [];
  etymology: string;
  partOfSpeech: PartOfSpeech;
  collocations: string[];
}
