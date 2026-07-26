import { beforeEach, describe, expect, test } from "vitest";
import { Vector } from "./vector";

describe("Vector", () => {
  let vector: Vector;

  beforeEach(() => {
    vector = new Vector(2, 60);
  });
  test("strs", () => {
    expect(vector.svgstr).toEqual("2,60");
  });
});
