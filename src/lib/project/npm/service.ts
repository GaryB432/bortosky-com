import type { Packument, PackumentVersion } from "./packument";
import * as semver from "semver";

export interface IService {
  getPackage(name: string, range: string): Promise<Packument | undefined>;
}

export function trimDown(pack: Packument, range: string): Packument {
  const { "dist-tags": tags, versions } = pack;

  const rangeWanted = tags[range] ?? range;

  const semverRange = new semver.Range(rangeWanted, {
    loose: false,
    includePrerelease: true,
  });

  const vs = Array.from(Object.keys(versions))
    .filter((a) => semverRange.test(a))
    .map((v) => {
      return versions[v];
    })
    .reduce<Record<string, PackumentVersion>>((rec, packVersionJ) => {
      rec[packVersionJ.version] = packVersionJ;
      return rec;
    }, {});

  return { ...pack, versions: vs };
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
            resolve(trimDown(pack, range));
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
