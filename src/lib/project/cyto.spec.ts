import { getElements } from "./cyto";
import type { GaryProject } from "./project";

describe("Cyto", () => {
  test("getElements", async () => {
    expect(
      await getElements([
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
              devDependencies: { desk: "*", window: "*" },
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
      ]),
    ).toMatchSnapshot();
  });
});

const specimenLarge: GaryProject[] = [
  {
    root: {
      name: "bortosky-com",
      version: "0.0.1",
      type: "module",
      dependencies: {
        tbd: "0.0.0",
      },
      devDependencies: {
        soon: "^17.10.5",
      },
      nx: {},
    },
    projects: [],
  },
  {
    root: {
      name: "district-map",
      version: "0.0.0",
      dependencies: {
        tbd: "0.0.0",
      },
      devDependencies: {
        soon: "^17.10.5",
      },
      workspaces: ["apps/web"],
    },
    projects: [
      {
        name: "reader",
        projectType: "application",
        tags: [],
      },
      {
        name: "reader-e2e",
        implicitDependencies: ["reader"],
      },
      {
        name: "shared",
        projectType: "library",
        tags: [],
      },
      {
        name: "svg",
        projectType: "library",
        tags: [],
      },
      {
        name: "web",
        version: "0.0.1",
        type: "module",
        dependencies: {
          dep: "0",
        },
        devDependencies: {
          devdep: "0",
        },
        nx: {
          implicitDependencies: ["svg", "shared"],
        },
      },
    ],
  },
];
