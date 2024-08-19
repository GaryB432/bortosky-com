import type { IService, Packument } from "$lib/project/npm";
import type { PackageJson } from "$lib/project/project";

export class FakeService implements IService {
  public async getPackage(name: string): Promise<Packument | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(packMap.get(name));
      }, 500);
    });
  }
}

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

const packMap = someJs
  .map<Packument>((j, i) => {
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
  })
  .reduce<Map<string, Packument>>((map, pack) => {
    map.set(pack.name, pack);
    return map;
  }, new Map());
