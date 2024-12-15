import { describe, expect, test } from "vitest";
import { getDependencyElements, getElements } from "./cyto";
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
              devDependencies: {
                desk: "*",
                window: "*",
                "eslint-plugin-gb": "no-longer-skipped",
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
      ]),
    ).toMatchSnapshot();
  });

  test("getDepencencyElements", async () => {
    expect(
      await getDependencyElements([
        {
          root: {
            name: "workspace-a",
            version: "whatever",
            devDependencies: { jest: "3.0.0" },
            dependencies: { album: "4.0.0" },
          },
          projects: [
            {
              name: "wsa-a",
              type: "module",
              devDependencies: {
                desk: "^1.4.9",
                window: "5.4.2",
                "eslint-plugin-gb": "skipped",
              },
              dependencies: { throttle: "^4.1.2", brake: "~1.4.6" },
            },
          ],
        },
        {
          root: {
            name: "workspace-b",
            version: "0",
            devDependencies: { jest: "^4.0.0" },
            dependencies: { album: "2" },
          },
          projects: [],
        },
      ], ["workspace-a", "workspace-b"]),
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
