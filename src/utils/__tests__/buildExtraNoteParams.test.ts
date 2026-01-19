import type { ExtraNoteInputState } from "@/types";
import { buildExtraNoteParams } from "../buildExtraNoteParams";
import { describe, expect, it } from "vitest";

const testFields: ExtraNoteInputState = {
  noteType: { input: "類義語・類似表現", lengthCheck: true },
  content: { input: "content", lengthCheck: true },
};

describe("buildExtraNoteParams", () => {
  it("should build correct parameter object", () => {
    const params = buildExtraNoteParams(testFields);
    expect(params).toEqual({
      noteType: "synonyms",
      content: "content",
    });
  });
});
