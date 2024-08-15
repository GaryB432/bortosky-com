import type { PackageJson } from "$lib/project/project";
import { Service, type Packument } from "$lib/project/npm";
// import { get } from "simple-get";

export type Keyword = string;

// async function getPackageDefinition(
//   key: string,
// ): Promise<Packument | undefined> {
//   const p = somePacks.find((m) => m.name === key);
//   if (!p) throw new Error("not found");
//   return new Promise((a, b) => {
//     const m = setTimeout(() => {
//       a(p);
//     }, 200);
//   });
// }

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

// function getRandomElement<T>(array: Array<T>): T {
//   const randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }

// function someDependencies(max?: number): Record<string, string> {
//   const size = max ?? Math.floor(Math.random() * 8 + 1);
//   const deps = new Array(size)
//     .fill(0)
//     .map(() => getRandomElement(someJs).name)
//     // .map((g) => g.name)
//     .sort()
//     .reduce<Record<string, string>>((a, b) => {
//       a[b] = "^0.0.0";
//       return a;
//     }, {});
//   return deps;
// }

export function getLatestPackage(
  subject: PackageJson | Packument,
): PackageJson {
  if ("dist-tags" in subject) {
    return subject.versions[subject["dist-tags"].latest] as PackageJson;
  } else {
    return subject;
  }
}

export async function getKeywordMap(
  subject: PackageJson | Packument,
  // packages: PackageJson[],
  npm: Service,
  depth = 0,
): Promise<Map<string, PackageJson[]>> {
  // const registry = packages.reduce((a, b) => {
  //   a.set(b.name, b);
  //   return a;
  // }, new Map<string, PackageJson>());

  const subjectJ = getLatestPackage(subject);

  const result: Map<Keyword, PackageJson[]> = new Map();

  function digestKeyword(keyword: string, subject: PackageJson): void {
    console.log(keyword);
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

  async function digestDependencies(
    depRecord: Record<string, string>,
  ): Promise<void> {
    if (depRecord) {
      for (const dep of Object.keys(depRecord)) {
        const dpack = await npm.getPackage(dep);
        if (dpack) {
          for (const k of dpack.keywords ?? []) {
            digestKeyword(k, getLatestPackage(dpack));
          }
        }
      }
    }
  }

  const { dependencies, devDependencies } = subjectJ;
  const allDeps = { ...dependencies, ...devDependencies };
  void (await digestDependencies(allDeps));
  console.log(result);
  return result;
}

const someOldeTimeyJs: PackageJson[] = [
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
