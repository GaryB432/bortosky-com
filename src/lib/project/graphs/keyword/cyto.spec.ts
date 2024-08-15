import { describe, expect, test } from "vitest";
import { getElements } from "./cyto";

describe("Cyto", () => {
  test("gets elements", async () => {
    expect(await getElements(new Map())).toMatchInlineSnapshot(`
      {
        "edges": [],
        "nodes": [],
      }
    `);
  });
});
