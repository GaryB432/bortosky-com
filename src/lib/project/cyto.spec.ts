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
    ).toMatchInlineSnapshot(`
      {
        "edges": [
          {
            "classes": [
              "dep",
              "run-time",
            ],
            "data": {
              "id": "album_workspace-a",
              "source": "workspace-a",
              "target": "album",
            },
          },
          {
            "classes": [
              "dep",
              "development",
            ],
            "data": {
              "id": "jest_workspace-a",
              "source": "workspace-a",
              "target": "jest",
            },
          },
          {
            "classes": "psub",
            "data": {
              "id": "workspace-a#wsa-a-workspace-a",
              "source": "workspace-a",
              "target": "workspace-a#wsa-a",
            },
          },
          {
            "classes": [
              "dep",
              "run-time",
            ],
            "data": {
              "id": "throttle_workspace-a#wsa-a",
              "source": "workspace-a#wsa-a",
              "target": "throttle",
            },
          },
          {
            "classes": [
              "dep",
              "run-time",
            ],
            "data": {
              "id": "brake_workspace-a#wsa-a",
              "source": "workspace-a#wsa-a",
              "target": "brake",
            },
          },
          {
            "classes": [
              "dep",
              "development",
            ],
            "data": {
              "id": "desk_workspace-a#wsa-a",
              "source": "workspace-a#wsa-a",
              "target": "desk",
            },
          },
          {
            "classes": [
              "dep",
              "development",
            ],
            "data": {
              "id": "window_workspace-a#wsa-a",
              "source": "workspace-a#wsa-a",
              "target": "window",
            },
          },
          {
            "classes": [
              "dep",
              "run-time",
            ],
            "data": {
              "id": "album_workspace-b",
              "source": "workspace-b",
              "target": "album",
            },
          },
          {
            "classes": [
              "dep",
              "development",
            ],
            "data": {
              "id": "jest_workspace-b",
              "source": "workspace-b",
              "target": "jest",
            },
          },
        ],
        "nodes": [
          {
            "classes": [
              "dep",
            ],
            "data": {
              "aversion": "2",
              "id": "album",
            },
          },
          {
            "classes": [
              "dep",
            ],
            "data": {
              "aversion": "1",
              "id": "brake",
            },
          },
          {
            "classes": [
              "dep",
            ],
            "data": {
              "aversion": "*",
              "id": "desk",
            },
          },
          {
            "classes": [
              "dep",
            ],
            "data": {
              "aversion": "5",
              "id": "jest",
            },
          },
          {
            "classes": [
              "dep",
            ],
            "data": {
              "aversion": "4",
              "id": "throttle",
            },
          },
          {
            "classes": [
              "dep",
            ],
            "data": {
              "aversion": "*",
              "id": "window",
            },
          },
          {
            "classes": [
              "gbp",
            ],
            "data": {
              "id": "workspace-a",
            },
          },
          {
            "classes": [
              "psub",
            ],
            "data": {
              "id": "workspace-a#wsa-a",
            },
          },
          {
            "classes": [
              "gbp",
            ],
            "data": {
              "id": "workspace-b",
            },
          },
        ],
      }
    `);
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
