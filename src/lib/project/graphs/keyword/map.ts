import type { IService, PackumentBase } from "$lib/project/npm";
import type { PackageJson } from "$lib/project/project";

import semver from "semver";
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

const somePacks: PackumentBase[] = someJs.map<PackumentBase>((j, i) => {
  const {
    dependencies,
    description,
    devDependencies,
    keywords,
    name,
    version,
  } = j;
  return {
    _id: name,
    _rev: i.toString(),
    bugs: undefined,
    description: description,
    "dist-tags": {
      latest: version,
    },
    homepage: "",
    keywords,
    license: "",
    maintainers: [],
    name,
    readme: "",
    readmeFilename: "",
    repository: undefined,
    time: undefined,
    versions: {
      [version]: {
        dependencies,
        description,
        devDependencies,
        keywords,
        name,
        version,
      },
    },
  };
});

export async function getKeywordMap(
  subject: PackumentBase,
  // packages: PackageJson[],
  npm: IService,
  depth = 0,
): Promise<Map<string, PackageJson[]>> {
  const subjectJ = getPackageGVersion(subject);

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

  async function digestDependencies(
    depRecord: Record<string, string>,
  ): Promise<void> {
    if (depRecord) {
      for (const dep of Object.keys(depRecord)) {
        const v = depRecord[dep];
        if (semver.validRange(v)) {
          const dpack = await npm.getPackument(dep, v);
          if (dpack) {
            const pj = getPackageGVersion(dpack);
            for (const k of pj.keywords ?? []) {
              digestKeyword(k, pj);
            }
          }
        }
      }
    }
  }

  const { dependencies, devDependencies } = subjectJ;
  const allDeps = { ...dependencies, ...devDependencies };
  void (await digestDependencies(allDeps));
  return result;
}

export function getPackageGVersion(subject: PackumentBase): PackageJson {
  const { "dist-tags": tags } = subject;
  const gbv = tags["_gb"];
  const pj = subject.versions[gbv] as PackageJson;
  // console.log(tags);
  if (!pj) {
    throw new Error(`${subject.name} is broken`);
  }
  return pj;
}

const someOldeTimeyJs: PackageJson[] = [
  {
    description: "the apple project",
    keywords: ["apple"],
    name: "apple",
    version: "0.0.0",
  },
  {
    description: "the chair project",
    keywords: ["chair"],
    name: "chair",
    version: "0.0.0",
  },
  {
    description: "the table project",
    keywords: ["table"],
    name: "table",
    version: "0.0.0",
  },
  {
    description: "the house project",
    keywords: ["house"],
    name: "house",
    version: "0.0.0",
  },
  {
    description: "the stone project",
    keywords: ["stone"],
    name: "stone",
    version: "0.0.0",
  },
  {
    description: "the field project",
    keywords: ["field"],
    name: "field",
    version: "0.0.0",
  },
  {
    description: "the plant project",
    keywords: ["plant"],
    name: "plant",
    version: "0.0.0",
  },
  {
    description: "the river project",
    keywords: ["river"],
    name: "river",
    version: "0.0.0",
  },
];
