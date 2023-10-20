import { describe, expect, test } from "vitest";
import { qrs } from "./quick-response";

describe("QuickResponse", () => {
  test("has all 3", () => {
    expect(qrs.length).toEqual(3);
  });
});
