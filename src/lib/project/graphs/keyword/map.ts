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

const somePacks: PackumentBase[] = someJs.map<PackumentBase>((j, i) => {
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

export function getPackageGVersion(subject: PackumentBase): PackageJson {
  const { "dist-tags": tags } = subject;
  const gbv = tags["_gb"];
  const pj = subject.versions[gbv] as PackageJson;
  // console.log(tags);
  if (!pj) {
    throw `${subject.name} is broken`;
  }
  return pj;
}

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
