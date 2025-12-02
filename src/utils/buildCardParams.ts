import type { CardInputState, CardParams } from "@/types";

export const buildCardParams = (fields: CardInputState): CardParams => ({
  front: fields.front.input,
  back: fields.back.input,
  frontSentence: fields.frontSentence.input,
  backSentence: fields.backSentence.input,
  explanationFront: fields.explanationFront.input,
  explanationBack: fields.explanationBack.input,
  cardType: fields.cardType.input,
});
