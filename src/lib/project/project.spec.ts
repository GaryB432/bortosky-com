import { describe, expect, test } from "vitest";

import { allKeywords } from "./project";

describe("Project", () => {
  test("gets keywords", () => {
    expect(
      allKeywords({
        projects: [
          { keywords: ["b", "d"], name: "A", version: "" },
          { keywords: ["c", "b", "a", "d"], name: "B", version: "" },
          { keywords: undefined, name: "E", version: "" },
          { keywords: ["b", "a", "d"], name: "D", version: "" },
        ],
        root: { keywords: ["b", "a"], name: "C", version: "" },
      }),
    ).toEqual(["a", "b", "c", "d"]);
  });
});
