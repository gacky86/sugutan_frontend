export interface DictionarySearchResult {
  translation: string;
  definition: { jp: string; en: string };
  example: { jp: string; en: string };
  synonyms: string[] | [];
  antonyms: string[] | [];
  etymology: string;
  partOfSpeech: string;
  collocations: string[];
}
