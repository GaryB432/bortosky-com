import { describe, expect, test } from "vitest";

import { makeMermaidGraph } from "./mermaid";

describe("Mermaid", () => {
  test("gets", () => {
    const bathroom = { name: "@bathroom", version: "" };
    const kitchen = { name: "kitchen", version: "" };
    expect(
      makeMermaidGraph(
        new Map([
          ["bathing", [bathroom]],
          ["cooking", [kitchen]],
          ["room", [bathroom, kitchen]],
        ]),
      ),
    ).toEqual([
      "```mermaid",
      "graph TD",
      "AA[room]",
      "AA -.-> &commat;bathroom",
      "AA -.-> kitchen",
      "AB[bathing]",
      "AB -.-> &commat;bathroom",
      "AC[cooking]",
      "AC -.-> kitchen",
      "```",
    ]);
  });
});
