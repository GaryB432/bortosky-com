import type { Packument } from "$lib/project/npm";
import type { PackageJson } from "$lib/project/project";
import { beforeEach, describe, expect, test } from "vitest";
import { getElements } from "./cyto";

const someJs: PackageJson[] = [
  {
    name: "house",
    version: "0.0.0",
    description: "the house project",
    dependencies: {
      bathroom: "^0.0.0",
    },
    devDependencies: {
      kitchen: "^0.0.0",
    },
    keywords: ["DO-NOT-USE", "ROOT-HOUSE-PROJECT"],
  },
  {
    name: "kitchen",
    version: "0.0.0",
    description: "the kitchen project",
    keywords: ["room", "cooking"],
  },
  {
    name: "bathroom",
    version: "0.0.0",
    description: "the bathroom project",
    keywords: ["room", "bathing"],
  },
];

const [house, kitchen, bath] = someJs.map((pj) => ({
  ...pj,
  keywords: undefined,
}));

describe("Cyto", () => {
  beforeEach(() => {});
  test("gets elements", async () => {
    expect(house.name).toEqual("house");
    expect(kitchen.name).toEqual("kitchen");
    expect(bath.name).toEqual("bathroom");

    const gels = await getElements(
      new Map<string, PackageJson[]>([
        ["kw-ac", [house, bath]],
        ["kw-ab", [house, kitchen]],
        ["kw-a", [house]],
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
          "label": "kw-ac",
        },
        {
          "description": "the house project",
          "id": "house@0.0.0",
          "label": "house",
        },
        {
          "description": "the bathroom project",
          "id": "bathroom@0.0.0",
          "label": "bathroom",
        },
        {
          "id": "kw-ab",
          "label": "kw-ab",
        },
        {
          "description": "the kitchen project",
          "id": "kitchen@0.0.0",
          "label": "kitchen",
        },
        {
          "id": "kw-a",
          "label": "kw-a",
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
