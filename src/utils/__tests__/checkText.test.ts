import { describe, expect, it } from "vitest";
import { checkText } from "../checkText";

// React eventを生成する必要はなく、mockでOK
const mockEvent = (value: string): React.ChangeEvent<HTMLInputElement> =>
  ({
    target: { value },
  } as React.ChangeEvent<HTMLInputElement>);

describe("checkText", () => {
  it("returns false and sliced letters when the input string length is longer than the given maxLength", () => {
    const result = checkText(mockEvent("abcdef"), 3);
    expect(result.input).toBe("abc");
    expect(result.lengthCheck).toBe(false);
  });
  it("returns true and original letters when the input string length has same length as the given maxLength", () => {
    const result = checkText(mockEvent("abc"), 3);
    expect(result.input).toBe("abc");
    expect(result.lengthCheck).toBe(true);
  });
  it("returns true and original letters when the input string length is shorter than the given maxLength", () => {
    const result = checkText(mockEvent("abcdef"), 10);
    expect(result.input).toBe("abcdef");
    expect(result.lengthCheck).toBe(true);
  });
});
