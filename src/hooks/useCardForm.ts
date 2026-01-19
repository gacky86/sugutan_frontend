import { useState } from "react";
import type { Card, CardInputState, FieldState } from "@/types";
import { cardTypes } from "@/types";
import { convertPartOfSpeechENtoJP } from "@/utils/partOfSpeechMapper";
import type { PartOfSpeech } from "@/utils/dictionaryLabelMapper";

export const useCardForm = (card?: Card) => {
  const initialState: CardInputState = {
    front: { input: card?.front || "", lengthCheck: true },
    back: { input: card?.back || "", lengthCheck: true },
    frontSentence: { input: card?.frontSentence || "", lengthCheck: true },
    backSentence: { input: card?.backSentence || "", lengthCheck: true },
    explanationFront: {
      input: card?.explanationFront || "",
      lengthCheck: true,
    },
    explanationBack: { input: card?.explanationBack || "", lengthCheck: true },
    cardType: {
      input:
        convertPartOfSpeechENtoJP(card?.cardType as PartOfSpeech) ||
        cardTypes[0],
      lengthCheck: true,
    },
  };

  const [fields, setFields] = useState<CardInputState>(initialState);

  const updateField = (name: keyof CardInputState, value: FieldState) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return { fields, updateField };
};
