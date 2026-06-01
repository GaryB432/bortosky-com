import { describe, expect, test } from "vitest";

import type { GaryProject } from "./project";

import { getDependencyElements, getElements } from "./cyto";

describe("Cyto", () => {
  test("getElements", () => {
    expect(
      getElements([
        {
          projects: [
            {
              dependencies: { brake: "1", throttle: "4" },
              devDependencies: {
                desk: "*",
                "eslint-plugin-gb": "no-longer-skipped",
                window: "*",
              },
              name: "wsa-a",
              type: "module",
            },
          ],
          root: {
            dependencies: { album: "4" },
            devDependencies: { jest: "3" },
            name: "workspace-a",
            version: "0",
          },
        },
        {
          projects: [],
          root: {
            dependencies: { album: "2" },
            devDependencies: { jest: "5" },
            name: "workspace-b",
            version: "0",
          },
        },
      ]),
    ).toMatchSnapshot();
  });

  test("getDepencencyElements", () => {
    expect(
      getDependencyElements(
        [
          {
            projects: [
              {
                dependencies: { brake: "~1.4.6", throttle: "^4.1.2" },
                devDependencies: {
                  desk: "^1.4.9",
                  "eslint-plugin-gb": "skipped",
                  window: "5.4.2",
                },
                name: "wsa-a",
                type: "module",
              },
            ],
            root: {
              dependencies: { album: "4.0.0" },
              devDependencies: { jest: "3.0.0" },
              name: "workspace-a",
              version: "whatever",
            },
          },
          {
            projects: [],
            root: {
              dependencies: { album: "2" },
              devDependencies: { jest: "^4.0.0" },
              name: "workspace-b",
              version: "0",
            },
          },
        ],
        ["workspace-a", "workspace-b"],
      ),
    ).toMatchSnapshot();
  });
});

const specimenLarge: GaryProject[] = [
  {
    projects: [],
    root: {
      dependencies: {
        tbd: "0.0.0",
      },
      devDependencies: {
        soon: "^17.10.5",
      },
      name: "bortosky-com",
      nx: {},
      type: "module",
      version: "0.0.1",
    },
  },
  {
    projects: [
      {
        name: "reader",
        projectType: "application",
        tags: [],
      },
      {
        implicitDependencies: ["reader"],
        name: "reader-e2e",
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
        dependencies: {
          dep: "0",
        },
        devDependencies: {
          devdep: "0",
        },
        name: "web",
        nx: {
          implicitDependencies: ["svg", "shared"],
        },
        type: "module",
        version: "0.0.1",
      },
    ],
    root: {
      dependencies: {
        tbd: "0.0.0",
      },
      devDependencies: {
        soon: "^17.10.5",
      },
      name: "district-map",
      version: "0.0.0",
      workspaces: ["apps/web"],
    },
  },
];
