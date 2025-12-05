import { limitString } from "../limitString";
import { describe, it, expect } from "vitest";

describe("limitString", () => {
  it("returns abc... when it get string:abcdef and limitLength:3", () => {
    const result = limitString("abcdef", 3);
    expect(result).toBe("abc...");
  });
  it("returns abcef when it get string:abcdef and limitLength:5", () => {
    const result = limitString("abcdef", 6);
    expect(result).toBe("abcdef");
  });
  it("returns abcef when it get string:abcdef and limitLength:10", () => {
    const result = limitString("abcdef", 10);
    expect(result).toBe("abcdef");
  });
});
