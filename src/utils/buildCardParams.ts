import type {
  CardInputState,
  CardParams,
  DictionarySearchResult,
} from "@/types";
import {
  convertPartOfSpeechJPtoEN,
  type PartOfSpeechJP,
} from "@/utils/partOfSpeechMapper";
// フォームの入力値をAPI payload用に編集する
export const buildCardParams = (fields: CardInputState): CardParams => ({
  front: fields.front.input,
  back: fields.back.input,
  frontSentence: fields.frontSentence.input,
  backSentence: fields.backSentence.input,
  explanationFront: fields.explanationFront.input,
  explanationBack: fields.explanationBack.input,
  cardType: convertPartOfSpeechJPtoEN(fields.cardType.input as PartOfSpeechJP),
});

// Gemini APIからの返答をcard登録ように編集する
export const buildCardParamsDictionary = (
  result: DictionarySearchResult
): CardParams => ({
  front: result.translation.jp,
  back: result.translation.en,
  frontSentence: result.example.jp,
  backSentence: result.example.en,
  explanationFront: result.definition.jp,
  explanationBack: result.definition.en,
  cardType: result.partOfSpeech,
});
