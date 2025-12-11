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
