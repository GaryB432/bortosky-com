import type { Packument as NpmPack } from "./packument";

type Packument = Pick<
  NpmPack,
  | "_id"
  | "_rev"
  | "description"
  | "dist-tags"
  | "homepage"
  | "keywords"
  | "name"
  | "readme"
  | "time"
  | "versions"
>;

export class Service {
  public constructor(private counter: number) {}
  public add(a: number): number {
    this.counter += a;
    return this.counter;
  }
  public greet(name: string): string {
    return `Service says: hello to ${name}`;
  }

  public async getPackage(name: string): Promise<Packument | undefined> {
    return new Promise((a, b) => {
      setTimeout(() => {
        a(aPackument);
      }, 1000);
    });
  }
}

const aPackument: Packument = {
  _id: "venv",
  _rev: "7-86ca215f54470a9ab54fd8e9b143787b",
  name: "venv",
  description: "Use build-time environment variables in your application",
  "dist-tags": { latest: "1.0.1" },
  versions: {
    "0.1.0": {
      name: "venv",
      version: "0.1.0",
      description:
        "Use build-time environment variables in your Angular CLI project",
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/Tester/venv.git",
      },
      keywords: ["environment", "variables", "angular", "cli"],
      files: ["lib"],
      bin: { venv: "lib/cli.js" },
      main: "lib/index.js",
      typings: "lib/index.d.ts",
      scripts: {
        clean: "rimraf lib && rimraf coverage",
        format:
          'prettier --write "{src,__tests__}/**/*.ts" --single-quote --trailing-comma es5',
        lint: 'tslint --force --format verbose "src/**/*.ts"',
        prepublish: "npm run build",
        prebuild:
          "npm run clean && npm run format && npm run lint && echo Using TypeScript && tsc --version",
        build: "tsc --pretty",
        test: "jest",
        coverage: "jest --coverage",
        watch: "npm run build -- --watch",
        "watch:test": "jest --watch",
      },
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
      engines: { node: ">=6.0.0" },
      bugs: { url: "https://github.com/Tester/venv/issues" },
      homepage: "https://github.com/Tester/venv#readme",
      jest: {
        transform: {
          ".(ts)": "<rootDir>/node_modules/ts-jest/preprocessor.js",
        },
        testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
        moduleFileExtensions: ["ts", "js"],
        testEnvironment: "node",
      },
      gitHead: "42465049de306626517e31e4dce3f1d1b5c2ffa6",
      _id: "venv@0.1.0",
      _npmVersion: "5.2.0",
      _nodeVersion: "8.1.3",
      _npmUser: { name: "tester", email: "tbd@example.com" },
      dist: {
        integrity:
          "sha512-RMdeiD0OJC+S2w4931iqdi5MB9xe2T/lXZbRrHxbsmQrSA+FwhPk2bIqIwbNDCmThPgNw841Q272O6EFSYhBjQ==",
        shasum: "32b9f3bd9f501afce0557aa5cd5b7fc5e063a617",
        tarball: "https://registry.npmjs.org/venv/-/venv-0.1.0.tgz",
        signatures: [
          {
            keyid: "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
            sig: "MEUCICKQJCEvvV3HdhCSj3TwH9qqIWLwc0GR1m/NED/s1bPIAiEAvkTmhIDIrD4MZoI2g27+HsuxoFJhC/evORT6T2UUwSc=",
          },
        ],
      },
      maintainers: [{ name: "tester", email: "tbd@example.com" }],
    },
    "0.2.0": {
      name: "venv",
      version: "0.2.0",
      description:
        "Use build-time environment variables in your Angular CLI project",
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/Tester/venv.git",
      },
      keywords: ["environment", "variables", "angular", "cli"],
      files: ["lib"],
      bin: { venv: "lib/venv.js" },
      main: "lib/index.js",
      typings: "lib/index.d.ts",
      scripts: {
        clean: "rimraf lib && rimraf coverage",
        format:
          'prettier --write "{src,__tests__}/**/*.ts" --single-quote --trailing-comma es5',
        lint: 'tslint --force --format verbose "src/**/*.ts"',
        prepare: "npm run build",
        prebuild:
          "npm run clean && npm run format && npm run lint && echo Using TypeScript && tsc --version",
        build: "tsc --pretty",
        test: "jest",
        coverage: "jest --coverage",
        watch: "npm run build -- --watch",
        "watch:test": "jest --watch",
      },
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
      engines: { node: ">=6.0.0" },
      bugs: { url: "https://github.com/Tester/venv/issues" },
      homepage: "https://github.com/Tester/venv#readme",
      jest: {
        transform: {
          ".(ts)": "<rootDir>/node_modules/ts-jest/preprocessor.js",
        },
        testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
        moduleFileExtensions: ["ts", "js"],
        testEnvironment: "node",
      },
      gitHead: "591a03076e20cb8001c16154599a0081c1116f19",
      _id: "venv@0.2.0",
      _npmVersion: "5.2.0",
      _nodeVersion: "8.1.3",
      _npmUser: { name: "tester", email: "tbd@example.com" },
      dist: {
        integrity:
          "sha512-M1Ylf5ReOXO1mLhwJk3n6oRwGPlTZa6bPGr73Y8FG8Jj1V3uvaevt2lrPLK/MmAEu1/ctEQw56C7qFEbUOYGlw==",
        shasum: "38303c9597ca85ba76d4775b039013277b461e8d",
        tarball: "https://registry.npmjs.org/venv/-/venv-0.2.0.tgz",
        signatures: [
          {
            keyid: "SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA",
            sig: "MEQCIAiofk9UL7GoDl73Add+9WYxc3ryLSgE4a0fjWBMaPFAAiBmNGlIFOnH/rBHaITVrxuqdJVgVt0iHW9H3HrjBNqN4g==",
          },
        ],
      },
      maintainers: [{ name: "tester", email: "tbd@example.com" }],
    },
    "1.0.1": {
      name: "venv",
      version: "1.0.1",
      description: "Use build-time environment variables in your application",
      license: "MIT",
      repository: {
        type: "git",
        url: "git+https://github.com/Tester/venv.git",
      },
      keywords: ["environment", "variables", "angular", "cli"],
      files: ["lib"],
      bin: { venv: "lib/venv.js" },
      main: "lib/index.js",
      typings: "lib/index.d.ts",
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
      engines: { node: ">=6.0.0" },
      bugs: { url: "https://github.com/Tester/venv/issues" },
      homepage: "https://github.com/Tester/venv#readme",
      jest: {
        transform: {
          ".(ts)": "<rootDir>/node_modules/ts-jest/preprocessor.js",
        },
        testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
        moduleFileExtensions: ["ts", "js"],
        testEnvironment: "node",
      },
      gitHead: "dd06e3d9d54aaa2cb209ec645b8afbeb1dc8ba92",
      _id: "venv@1.0.1",
      _npmVersion: "5.2.0",
      _nodeVersion: "8.1.3",
      _npmUser: { name: "tester", email: "tbd@example.com" },
      maintainers: [{ name: "tester", email: "tbd@example.com" }],
    },
  },
  readme:
    "# venv\r\n\r\n[![Build Status](https://travis-ci.org/Tester/venv.svg?branch=master)](https://travis-ci.org/Tester/venv)\r\n",
  time: {
    modified: "2022-05-23T04:53:53.765Z",
    created: "2017-08-13T02:53:28.982Z",
    "0.1.0": "2017-08-13T02:53:28.982Z",
    "0.2.0": "2017-08-13T03:15:40.512Z",
    "1.0.1": "2017-08-22T17:57:46.084Z",
  },
  homepage: "https://github.com/Tester/venv#readme",
  keywords: ["environment", "variables", "angular", "cli"],
};
