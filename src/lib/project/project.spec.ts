import { allKeywords, getDependencies } from "./project";

describe("Project", () => {
  test("getDependencies", () => {
    expect(
      getDependencies(
        [
          {
            root: {
              name: "workspace-a",
              version: "0",
              devDependencies: { jest: "3" },
              dependencies: { album: "4" },
            },
            projects: [
              {
                name: "wsa-a",
                type: "module",
                devDependencies: {
                  desk: "*",
                  window: "*",
                  "eslint-plugin-gb": "skipped",
                },
                dependencies: { throttle: "4", brake: "1" },
              },
            ],
          },
          {
            root: {
              name: "workspace-b",
              version: "0",
              devDependencies: { jest: "5" },
              dependencies: { album: "2" },
            },
            projects: [],
          },
        ],
        ["jest"],
      ),
    ).toMatchInlineSnapshot(`
      [
        {
          "depender": {
            "dependencies": {
              "album": "4",
            },
            "devDependencies": {
              "jest": "3",
            },
            "name": "workspace-a",
            "version": "0",
          },
          "name": "jest",
          "type": "dev",
          "version": "3",
        },
        {
          "depender": {
            "dependencies": {
              "album": "2",
            },
            "devDependencies": {
              "jest": "5",
            },
            "name": "workspace-b",
            "version": "0",
          },
          "name": "jest",
          "type": "dev",
          "version": "5",
        },
      ]
    `);
  });

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
