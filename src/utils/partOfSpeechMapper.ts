export type PartOfSpeechEN =
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

const partOfSpeechENtoJP: Record<PartOfSpeechEN, string> = {
  noun: "名詞",
  verb: "動詞",
  adjective: "形容詞",
  adverb: "副詞",
  phrase: "コロケーション・フレーズ",
  idiom: "イディオム",
  "auxiliary verb": "助動詞",
  conjunction: "接続詞",
  pronoun: "代名詞",
  preposition: "前置詞",
  article: "冠詞",
  other: "その他",
};

// 英語名のpart of speech(品詞)を日本語名の品詞に変換する
export function convertPartOfSpeechENtoJP(PartOfSpeech: PartOfSpeechEN): string {
  return partOfSpeechENtoJP[PartOfSpeech];
}

export type PartOfSpeechJP =
  "名詞"| // noun
  "動詞"| // verb
  "形容詞"| // adjective
  "副詞"| // adverb
  "連語・フレーズ"| // phrase
  "イディオム"| // idiom
  "助動詞"| // auxiliary verb
  "接続詞"| // conjunction
  "代名詞"| // pronoun
  "前置詞"| // preposition
  "冠詞"| // article
  "その他"; // other

const partOfSpeechJPtoEN: Record<PartOfSpeechJP, string> = {
  名詞: "noun",
  動詞: "verb",
  形容詞: "adjective",
  副詞: "adverb",
  連語・フレーズ: "phrase",
  イディオム: "idiom",
  助動詞: "auxiliary verb",
  接続詞: "conjunction",
  代名詞: "pronoun",
  前置詞: "preposition",
  冠詞: "article",
  その他: "other"
};

// 日本語名の品詞を英語名のpart of speech(品詞)に変換する
export function convertPartOfSpeechJPtoEN(PartOfSpeech: PartOfSpeechJP): string {
  return partOfSpeechJPtoEN[PartOfSpeech];
}
