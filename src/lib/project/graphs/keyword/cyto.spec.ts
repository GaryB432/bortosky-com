import type { PackageJson } from "$lib/project/project";

import { beforeEach, describe, expect, test } from "vitest";

import { getElements } from "./cyto";

const someJs: PackageJson[] = [
  {
    dependencies: {
      bathroom: "^0.0.0",
    },
    description: "the house project",
    devDependencies: {
      kitchen: "^0.0.0",
    },
    keywords: ["DO-NOT-USE", "ROOT-HOUSE-PROJECT"],
    name: "house",
    version: "0.0.0",
  },
  {
    description: "the kitchen project",
    keywords: ["room", "cooking"],
    name: "kitchen",
    version: "0.0.0",
  },
  {
    description: "the bathroom project",
    keywords: ["room", "bathing"],
    name: "bathroom",
    version: "0.0.0",
  },
];

const [house, kitchen, bath] = someJs;

describe("Cyto", () => {
  beforeEach(() => {});
  test("gets elements", () => {
    expect(house.name).toEqual("house");
    expect(kitchen.name).toEqual("kitchen");
    expect(bath.name).toEqual("bathroom");

    const gels = getElements(
      new Map<string, PackageJson[]>([
        ["kw-a", [house]],
        ["kw-ab", [house, kitchen]],
        ["kw-ac", [house, bath]],
      ]),
    );
    expect(gels.nodes.length).toEqual(6);
    expect(gels.edges.length).toEqual(5);
    expect(
      gels.nodes.map((l) => {
        return l.data;
      }),
    ).toMatchInlineSnapshot(`
      [
        {
          "id": "kw-ac",
        },
        {
          "description": "the house project",
          "id": "house@0.0.0",
          "keywords": [
            "DO-NOT-USE",
            "ROOT-HOUSE-PROJECT",
          ],
          "name": "house",
          "version": "0.0.0",
        },
        {
          "description": "the bathroom project",
          "id": "bathroom@0.0.0",
          "keywords": [
            "room",
            "bathing",
          ],
          "name": "bathroom",
          "version": "0.0.0",
        },
        {
          "id": "kw-ab",
        },
        {
          "description": "the kitchen project",
          "id": "kitchen@0.0.0",
          "keywords": [
            "room",
            "cooking",
          ],
          "name": "kitchen",
          "version": "0.0.0",
        },
        {
          "id": "kw-a",
        },
      ]
    `);
    expect(gels.edges.map((l) => l.data)).toMatchInlineSnapshot(`
      [
        {
          "source": "kw-ac",
          "target": "house@0.0.0",
        },
        {
          "source": "kw-ac",
          "target": "bathroom@0.0.0",
        },
        {
          "source": "kw-ab",
          "target": "house@0.0.0",
        },
        {
          "source": "kw-ab",
          "target": "kitchen@0.0.0",
        },
        {
          "source": "kw-a",
          "target": "house@0.0.0",
        },
      ]
    `);
  });
});
