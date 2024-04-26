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
      ]),
    ).toMatchInlineSnapshot(`
      {
        "edges": [
          {
            "data": {
              "id": "album>album@2",
              "source": "album",
              "target": "album@2",
            },
          },
          {
            "data": {
              "id": "album>album@4.0.0",
              "source": "album",
              "target": "album@4.0.0",
            },
          },
          {
            "data": {
              "id": "brake>brake@~1.4.6",
              "source": "brake",
              "target": "brake@~1.4.6",
            },
          },
          {
            "data": {
              "id": "desk>desk@^1.4.9",
              "source": "desk",
              "target": "desk@^1.4.9",
            },
          },
          {
            "data": {
              "id": "eslint-plugin-gb>eslint-plugin-gb@skipped",
              "source": "eslint-plugin-gb",
              "target": "eslint-plugin-gb@skipped",
            },
          },
          {
            "data": {
              "id": "jest>jest@^4.0.0",
              "source": "jest",
              "target": "jest@^4.0.0",
            },
          },
          {
            "data": {
              "id": "jest>jest@3.0.0",
              "source": "jest",
              "target": "jest@3.0.0",
            },
          },
          {
            "data": {
              "id": "throttle>throttle@^4.1.2",
              "source": "throttle",
              "target": "throttle@^4.1.2",
            },
          },
          {
            "data": {
              "id": "window>window@5.4.2",
              "source": "window",
              "target": "window@5.4.2",
            },
          },
        ],
        "nodes": [
          {
            "data": {
              "id": "album",
              "label": "album",
            },
          },
          {
            "data": {
              "id": "album@2",
              "label": "2",
              "tbd": "YES",
            },
          },
          {
            "data": {
              "id": "album@4.0.0",
              "label": "4.0.0",
              "tbd": "YES",
            },
          },
          {
            "data": {
              "id": "brake",
              "label": "brake",
            },
          },
          {
            "data": {
              "id": "brake@~1.4.6",
              "label": "~1.4.6",
              "tbd": "YES",
            },
          },
          {
            "data": {
              "id": "desk",
              "label": "desk",
            },
          },
          {
            "data": {
              "id": "desk@^1.4.9",
              "label": "^1.4.9",
              "tbd": "YES",
            },
          },
          {
            "data": {
              "id": "eslint-plugin-gb",
              "label": "eslint-plugin-gb",
            },
          },
          {
            "data": {
              "id": "eslint-plugin-gb@skipped",
              "label": "skipped",
              "tbd": "YES",
            },
          },
          {
            "data": {
              "id": "jest",
              "label": "jest",
            },
          },
          {
            "data": {
              "id": "jest@^4.0.0",
              "label": "^4.0.0",
              "tbd": "YES",
            },
          },
          {
            "data": {
              "id": "jest@3.0.0",
              "label": "3.0.0",
              "tbd": "YES",
            },
          },
          {
            "data": {
              "id": "throttle",
              "label": "throttle",
            },
          },
          {
            "data": {
              "id": "throttle@^4.1.2",
              "label": "^4.1.2",
              "tbd": "YES",
            },
          },
          {
            "data": {
              "id": "window",
              "label": "window",
            },
          },
          {
            "data": {
              "id": "window@5.4.2",
              "label": "5.4.2",
              "tbd": "YES",
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
