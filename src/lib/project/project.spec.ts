import { allKeywords } from "./project";

describe("Project", () => {
  test("gets keywords", () => {
    expect(
      allKeywords({
        root: { name: "C", version: "", keywords: ["b", "a"] },
        projects: [
          { name: "A", version: "", keywords: ["b", "d"] },
          { name: "B", version: "", keywords: ["c", "b", "a", "d"] },
          { name: "E", version: "", keywords: undefined },
          { name: "D", version: "", keywords: ["b", "a", "d"] },
        ],
      }),
    ).toEqual(["a", "b", "c", "d"]);
  });
});
