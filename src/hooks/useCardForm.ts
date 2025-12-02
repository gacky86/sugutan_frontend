import { useState } from "react";
import type { CardInputState, FieldState } from "@/types";
import { cardTypes } from "@/types";

export const useCardForm = () => {
  const initialState: CardInputState = {
    front: { input: "", lengthCheck: true },
    back: { input: "", lengthCheck: true },
    frontSentence: { input: "", lengthCheck: true },
    backSentence: { input: "", lengthCheck: true },
    explanationFront: { input: "", lengthCheck: true },
    explanationBack: { input: "", lengthCheck: true },
    cardType: { input: cardTypes[0], lengthCheck: true },
  };

  const [fields, setFields] = useState<CardInputState>(initialState);

  const updateField = (name: keyof CardInputState, value: FieldState) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return { fields, updateField };
};
