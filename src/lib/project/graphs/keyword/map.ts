import type { PackageJson } from "$lib/project/project";

import type { Packument } from "$lib/project/npm/packument";

export type Keyword = string;

async function getPackageDefinition(
  key: string,
): Promise<PackageJson | undefined> {
  return new Promise((a, b) => {
    setTimeout(() => {
      a({ name: key, version: "0" });
    }, 2000);
  });
}

const someKeywords = [
  "helicopter",
  "photograph",
  "television",
  "dictionary",
  "restaurant",
  "instrument",
  "experience",
];

// prettier-ignore

const ff: Required<Packument> = {
  _id: "",
  _rev: "",
  name: "",
  description: "",
  "dist-tags": {
    latest: ""
  },
  versions: {"0.0.0":  {
    name: "house",
    version: "0.0.0",
    description: "the house project",
    dependencies: {
      bathroom: "^0.0.0",
    },
    devDependencies: {
      kitchen: "^0.0.0",
    },
  },},
  readme: "",
  maintainers: [],
  time: {},
  homepage: "",
  keywords: [],
  repository: undefined,
  bugs: undefined,
  license: "",
  readmeFilename: ""
}

const someJs: PackageJson[] = [
  {
    name: "apple",
    version: "0.0.0",
    description: "the apple project",
    keywords: ["apple"],
  },
  {
    name: "chair",
    version: "0.0.0",
    description: "the chair project",
    keywords: ["chair"],
  },
  {
    name: "table",
    version: "0.0.0",
    description: "the table project",
    keywords: ["table"],
  },
  {
    name: "house",
    version: "0.0.0",
    description: "the house project",
    keywords: ["house"],
  },
  {
    name: "stone",
    version: "0.0.0",
    description: "the stone project",
    keywords: ["stone"],
  },
  {
    name: "field",
    version: "0.0.0",
    description: "the field project",
    keywords: ["field"],
  },
  {
    name: "plant",
    version: "0.0.0",
    description: "the plant project",
    keywords: ["plant"],
  },
  {
    name: "river",
    version: "0.0.0",
    description: "the river project",
    keywords: ["river"],
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
      [version]: { keywords, name, description, dependencies, devDependencies },
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

function getRandomElement<T>(array: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function someDependencies(max?: number): Record<string, string> {
  const size = max ?? Math.floor(Math.random() * 8 + 1);
  const deps = new Array(size)
    .fill(0)
    .map(() => getRandomElement(someJs).name)
    // .map((g) => g.name)
    .sort()
    .reduce<Record<string, string>>((a, b) => {
      a[b] = "^0.0.0";
      return a;
    }, {});
  return deps;
}

export async function getKeywordMap(
  packages: PackageJson[],
  depth = 0,
): Promise<Map<string, PackageJson[]>> {
  const registry = packages.reduce((a, b) => {
    a.set(b.name, b);
    return a;
  }, new Map<string, PackageJson>());

  const result: Map<Keyword, PackageJson[]> = new Map();

  function digestKeyword(keyword: string, subject: PackageJson): void {
    const kwdPackages = result.get(keyword);
    if (!kwdPackages) {
      result.set(keyword, [subject]);
    } else {
      if (
        !kwdPackages.find(
          (f) => f.name === subject.name && f.version === subject.version,
        )
      ) {
        kwdPackages.push(subject);
      }
    }
  }

  for (const subject of packages) {
    for (const k of subject.keywords ?? []) {
      digestKeyword(k, subject);
    }
  }

  return result;
}
