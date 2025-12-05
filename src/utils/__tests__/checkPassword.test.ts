import { describe, it, expect } from "vitest";
import { checkPassword } from "@/utils/checkPassword";

// React eventを生成する必要はなく、mockでOK
const mockEvent = (value: string): React.ChangeEvent<HTMLInputElement> =>
  ({
    target: { value },
  } as React.ChangeEvent<HTMLInputElement>);

describe("checkPassword", () => {
  it("returns false for short password (< 8 chars)", () => {
    const result = checkPassword(mockEvent("abc"));
    expect(result.lengthCheck).toBe(false);
    expect(result.patternCheck).toBe(true);
    expect(result.input).toBe("");
  });

  it("returns false for long password (> 20 chars)", () => {
    const result = checkPassword(mockEvent("a".repeat(21)));
    expect(result.lengthCheck).toBe(false);
    expect(result.patternCheck).toBe(true);
    expect(result.input).toBe("");
  });

  it("returns false for invalid pattern", () => {
    const result = checkPassword(mockEvent("a!bcdefg"));
    expect(result.lengthCheck).toBe(true);
    expect(result.patternCheck).toBe(false);
    expect(result.input).toBe("");
  });

  it("returns true for valid password", () => {
    const result = checkPassword(mockEvent("abcd_1234"));
    expect(result.lengthCheck).toBe(true);
    expect(result.patternCheck).toBe(true);
    expect(result.input).toBe("abcd_1234");
  });

  it("returns true when empty string", () => {
    const result = checkPassword(mockEvent(""));
    expect(result.lengthCheck).toBe(true);
    expect(result.patternCheck).toBe(true);
    expect(result.input).toBe("");
  });
});
