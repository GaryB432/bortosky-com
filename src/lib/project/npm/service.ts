import * as semver from "semver";
import type { Packument, PackumentVersion } from "./packument";

export interface IService {
  getPackage(name: string, range: string): Promise<Packument | undefined>;
}

export async function ensureLatest(pack: Packument): Promise<Packument> {
  const { name, "dist-tags": tags, versions } = pack;

  if (!versions[tags.latest]) {
    console.log("fetching latest", pack.name, tags.latest);
    const description = [
      "**",
      "no latest for:",
      pack.name,

      pack["dist-tags"].latest,
      JSON.stringify(Object.keys(pack.versions).length),
      "**",
    ].join(" ");
    // console.warn(description);
    versions[tags.latest] = {
      name,
      version: tags.latest,
      description,
      keywords: ["*FAKE*"],
    };
  }

  return pack;
}

export function trimDown(pack: Packument, range: string): Packument {
  const { name, description, "dist-tags": tags, versions, keywords } = pack;

  const wanted = range === "latest" ? tags.latest : range;

  const checker = new semver.Range(wanted);

  const matchVersions = Object.keys(versions).reduce<
    Record<string, PackumentVersion>
  >((a, versionSpec) => {
    if (checker.test(versionSpec)) {
      const {
        name,
        version,
        description,
        keywords,
        dependencies,
        devDependencies,
      } = versions[versionSpec];
      a[versionSpec] = {
        name,
        version,
        description,
        dependencies,
        devDependencies,
        keywords,
      };
    }
    return a;
  }, {});

  if (JSON.stringify(matchVersions) === "{}") {
    console.warn(`no latest for ${name}`);
  }

  return {
    // _id,
    // _rev,
    name,
    description,
    "dist-tags": tags,
    versions: matchVersions,
    // readme,
    // maintainers,
    // time,
    // homepage,
    keywords,
    // repository,
    // bugs,
    // license,
    // readmeFilename,
  };
}

export class Service implements IService {
  public async getPackage(
    name: string,
    range: string,
  ): Promise<Packument | undefined> {
    return new Promise<Packument | undefined>((resolve) => {
      fetch(this.registryUrl(name)).then((res) => {
        if (res.ok) {
          res.json().then((pack: Packument) => {
            ensureLatest(trimDown(pack, range)).then((p) => {
              resolve(p);
            });
          });
        } else {
          resolve(undefined);
        }
      });
    });
  }

  private registryUrl(name: string): string | URL | Request {
    return `https://registry.npmjs.org/${name}`;
  }
}
