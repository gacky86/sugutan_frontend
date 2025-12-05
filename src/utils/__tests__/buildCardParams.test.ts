import type { CardInputState } from "@/types";
import { buildCardParams } from "../buildCardParams";
import { describe, expect, it } from "vitest";

const testFields: CardInputState = {
  front: { input: "front", lengthCheck: true },
  back: { input: "back", lengthCheck: true },
  frontSentence: { input: "front sentence", lengthCheck: true },
  backSentence: { input: "back sentence", lengthCheck: true },
  explanationFront: { input: "explanation front", lengthCheck: true },
  explanationBack: { input: "explanation back", lengthCheck: true },
  cardType: { input: "card type", lengthCheck: true },
};

describe("buildCardParams", () => {
  it("should build correct parameter object", () => {
    const params = buildCardParams(testFields);
    expect(params).toEqual({
      front: "front",
      back: "back",
      frontSentence: "front sentence",
      backSentence: "back sentence",
      explanationFront: "explanation front",
      explanationBack: "explanation back",
      cardType: "card type",
    });
  });
});
