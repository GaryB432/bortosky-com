import type { Packument } from "$lib/project/npm";
import type { PackageJson } from "$lib/project/project";
import { describe, expect, test } from "vitest";
import { getElements } from "./cyto";

describe("Cyto", () => {
  test("gets elements", async () => {
    const afdf = somePacks.reduce((a, b) => {
      return a.set(b.name, b);
    }, new Map<string, Packument>());

    const [a, b, c] = someJs;

    const gels = await getElements(
      new Map<string, PackageJson[]>([
        ["kw-ac", [a, c]],
        ["kw-ab", [a, b]],
        ["kw-a", [a]],
      ]),
    );
    expect(
      gels.nodes.map((l) => {
        return l.data;
      }),
    ).toMatchInlineSnapshot(`
      [
        {
          "id": "bathroom@0.0.0",
          "label": "bathroom",
        },
        {
          "id": "kitchen@0.0.0",
          "label": "kitchen",
        },
        {
          "id": "house@0.0.0",
          "label": "house",
        },
      ]
    `);
    expect(gels.edges.map((l) => l.data)).toMatchInlineSnapshot(`
      [
        {
          "id": "house@0.0.0kw-ac",
          "source": "kw-ac",
          "target": "house@0.0.0",
        },
        {
          "id": "bathroom@0.0.0kw-ac",
          "source": "kw-ac",
          "target": "bathroom@0.0.0",
        },
        {
          "id": "house@0.0.0kw-ab",
          "source": "kw-ab",
          "target": "house@0.0.0",
        },
        {
          "id": "kitchen@0.0.0kw-ab",
          "source": "kw-ab",
          "target": "kitchen@0.0.0",
        },
        {
          "id": "house@0.0.0kw-a",
          "source": "kw-a",
          "target": "house@0.0.0",
        },
      ]
    `);
  });
});

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

const somePacks: Packument[] = someJs.map<Packument>((j, i) => {
  const {
    name,
    description,
    version,
    keywords,
    dependencies,
    devDependencies,
  } = j;
  return {
    _id: name,
    _rev: i.toString(),
    name,
    description: description,
    "dist-tags": {
      latest: version,
    },
    versions: {
      [version]: {
        name,
        version,
        description,
        keywords,
        dependencies,
        devDependencies,
      },
    },
    readme: "",
    maintainers: [],
    time: undefined,
    homepage: "",
    keywords,
    repository: undefined,
    bugs: undefined,
    license: "",
    readmeFilename: "",
  };
});
