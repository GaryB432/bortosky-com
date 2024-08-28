import { describe, expect, test } from "vitest";
import { formatNumber, shuffle } from "./utils";

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

describe("shuffle", () => {
  test("doesn't eat elements", () => {
    expect(shuffle(["a", "c", "b"]).length).toEqual(3);
  });
});
