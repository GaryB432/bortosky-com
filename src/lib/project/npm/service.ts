import { error } from "@sveltejs/kit";
import type { PackageJson } from "../project";
import type { Packument as NpmPack } from "./packument";

type PackumentVersion = {
  dependencies?: Record<string, string> | undefined;
  description?: string;
  devDependencies?: Record<string, string> | undefined;
  keywords?: string[];
  name: string;
  version: string;
};

type Packument = Pick<
  NpmPack,
  "description" | "dist-tags" | "keywords" | "name"
> & { versions: Record<string, PackumentVersion> };

export class Service {
  public async getPackage(name: string): Promise<Packument | undefined> {
    console.log("asking for ", name);
    const response = await fetch(`https://registry.npmjs.org/${name}`);
    const paramPkg = (await response.json()) as Packument & { error: string };

    if (paramPkg.error) {
      error(404, `${name} was not returned from npm registry api`);
    }

    return paramPkg;

    // const { keywords, name, description } =
    //   paramPkg.versions[paramPkg["dist-tags"]["latest"]];

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const pkg = somePacks.find((p) => p.name === name);
    //     if (!pkg)
    //       throw new Error(`${name} is not in the registry you're using`);
    //     resolve(pkg);
    //     console.log(pkg?.name, "found");
    //   }, 500);
    // });
  }
}

export class FakeService {
  public async getPackage(name: string): Promise<Packument | undefined> {
    console.log("asking for ", name);

    return new Promise((resolve) => {
      setTimeout(() => {
        const pkg = somePacks.find((p) => p.name === name);
        if (!pkg)
          throw new Error(`${name} is not in the registry you're using`);
        resolve(pkg);
        console.log(pkg?.name, "found");
      }, 500);
    });
  }
}

const venvPack: Packument = {
  name: "venv",
  description: "Use build-time environment variables in your application",
  "dist-tags": { latest: "1.0.1" },
  versions: {
    "0.1.0": {
      name: "venv",
      version: "0.1.0",
      description:
        "Use build-time environment variables in your Angular CLI project",
      keywords: ["environment", "variables", "angular", "cli"],
      dependencies: { ejs: "^2.5.7", "fs-extra": "^4.0.1", md5: "^2.2.1" },
      devDependencies: {
        "@types/ejs": "^2.3.33",
        "@types/fs-extra": "^4.0.0",
        "@types/jest": "^20.0.5",
        "@types/md5": "^2.1.32",
        "@types/node": "^8.0.0",
        "@types/yargs": "^8.0.2",
        coveralls: "^2.0.0",
        jest: "^20.0.4",
        "jest-environment-node-debug": "^2.0.0",
        prettier: "^1.5.2",
        rimraf: "^2.0.0",
        "ts-jest": "^20.0.7",
        "ts-node": "^3.2.0",
        tslint: "^5.0.0",
        "tslint-config-prettier": "^1.1.0",
        typescript: "^2.0.0",
      },
    },
    "0.2.0": {
      name: "venv",
      version: "0.2.0",
      description:
        "Use build-time environment variables in your Angular CLI project",
      keywords: ["environment", "variables", "angular", "cli"],
      dependencies: { ejs: "^2.5.7", "fs-extra": "^4.0.1", md5: "^2.2.1" },
      devDependencies: {
        "@types/ejs": "^2.3.33",
        "@types/fs-extra": "^4.0.0",
        "@types/jest": "^20.0.5",
        "@types/md5": "^2.1.32",
        "@types/node": "^8.0.0",
        "@types/yargs": "^8.0.2",
        coveralls: "^2.0.0",
        jest: "^20.0.4",
        "jest-environment-node-debug": "^2.0.0",
        prettier: "^1.5.2",
        rimraf: "^2.0.0",
        "ts-jest": "^20.0.7",
        "ts-node": "^3.2.0",
        tslint: "^5.0.0",
        "tslint-config-prettier": "^1.1.0",
        typescript: "^2.0.0",
      },
    },
    "1.0.1": {
      name: "venv",
      version: "1.0.1",
      description: "Use build-time environment variables in your application",
      keywords: ["environment", "variables", "angular", "cli"],
      dependencies: { ejs: "^2.5.7", "fs-extra": "^4.0.1", yargs: "^8.0.2" },
      devDependencies: {
        "@types/ejs": "^2.3.33",
        "@types/fs-extra": "^4.0.0",
        "@types/jest": "^20.0.5",
        "@types/md5": "^2.1.32",
        "@types/node": "^8.0.0",
        "@types/yargs": "^8.0.2",
        coveralls: "^2.0.0",
        jest: "^20.0.4",
        "jest-environment-node-debug": "^2.0.0",
        prettier: "^1.5.2",
        rimraf: "^2.0.0",
        "ts-jest": "^20.0.7",
        "ts-node": "^3.2.0",
        tslint: "^5.0.0",
        "tslint-config-prettier": "^1.1.0",
        typescript: "^2.0.0",
      },
    },
  },
  keywords: ["environment", "variables", "angular", "cli"],
};

// const pks = new Map<string, Packument>([["x", {}]]);

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
