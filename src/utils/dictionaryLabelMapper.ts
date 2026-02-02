export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "phrase"
  | "idiom"
  | "auxiliary verb"
  | "conjunction"
  | "pronoun"
  | "preposition"
  | "article"
  | "other";

const partOfSpeechLabels: Record<PartOfSpeech, string> = {
  noun: "名詞",
  verb: "動詞",
  adjective: "形容詞",
  adverb: "副詞",
  phrase: "フレーズ",
  idiom: "イディオム",
  "auxiliary verb": "助動詞",
  conjunction: "接続詞",
  pronoun: "代名詞",
  preposition: "前置詞",
  article: "冠詞",
  other: "その他",
};

// 英語名のpart of speech(品詞)を日本語名の品詞に変換する
export function getPartOfSpeechLabels(PartOfSpeech: PartOfSpeech): string {
  return partOfSpeechLabels[PartOfSpeech];
}

export type WordInfo =
  | "example"
  | "synonyms"
  | "antonyms"
  | "etymology"
  | "collocations";

const wordInfoLabels: Record<WordInfo, string> = {
  example: "例文",
  synonyms: "類義語・類似表現",
  antonyms: "対義語・対義表現",
  etymology: "語源・構成",
  collocations: "コロケーション・イディオム",
};

export function getWordInfoLabels(WordInfo: WordInfo): string {
  return wordInfoLabels[WordInfo];
}
