import { describe, expect, test } from "vitest";
import { makeMermaidGraph } from "./mermaid";

describe("Mermaid", () => {
  test("gets", () => {
    const bathroom = { name: "bathroom", version: "" };
    const kitchen = { name: "kitchen", version: "" };
    expect(
      makeMermaidGraph(
        new Map([
          ["room", [bathroom, kitchen]],
          ["bathing", [bathroom]],
          ["cooking", [kitchen]],
        ]),
      ),
    ).toEqual([
      "```mermaid",
      "graph TD",
      "A[room]",
      "A -.-> bathroom",
      "A -.-> kitchen",
      "B[bathing]",
      "B -.-> bathroom",
      "C[cooking]",
      "C -.-> kitchen",
      "```",
    ]);
  });
});
