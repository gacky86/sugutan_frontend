import { getLanguageName } from "../langNameMapper";
import { describe, it, expect } from "vitest";

describe("langNameMapper", () => {
  it("returns English when it get language code EN", () => {
    const result = getLanguageName("EN");
    expect(result).toBe("English");
  });
  it("returns Deutsch when it get language code DE", () => {
    const result = getLanguageName("DE");
    expect(result).toBe("Deutsch");
  });
  it("returns Français when it get language code FR", () => {
    const result = getLanguageName("FR");
    expect(result).toBe("Français");
  });
  it("returns Italiano when it get language code IT", () => {
    const result = getLanguageName("IT");
    expect(result).toBe("Italiano");
  });
});
