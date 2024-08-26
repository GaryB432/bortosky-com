import { describe, expect, test } from "vitest";
import { formatNumber } from "./utils";

describe("formatNumber", () => {
  test("should format large numbers with commas", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });

  test("should format numbers with decimals", () => {
    expect(formatNumber(1234567.89)).toBe("1,234,567.89");
  });

  test("should handle small numbers without commas", () => {
    expect(formatNumber(123)).toBe("123");
  });
});
