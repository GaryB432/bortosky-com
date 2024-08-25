import * as semver from "semver";
import type { PackumentBase, PackumentVersion } from "./packument";

export interface IService {
  getPackument(name: string, range: string): Promise<PackumentBase | undefined>;
}

export class Service implements IService {
  public constructor(
    private readonly fetcher: (
      input: string | URL | Request,
      init?: RequestInit,
    ) => Promise<Response>,
  ) {}

  public async getPackument(
    name: string,
    range: string,
  ): Promise<PackumentBase | undefined> {
    const npmUrl = this.registryUrl(name);
    const resp = await this.fetcher(npmUrl, {
      headers: {
        Accept:
          "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*",
      },
    });

    if (!resp.ok) {
      throw new Error("failed getting packument from npm");
    }

    const pack: PackumentBase = await resp.json();

    const { "dist-tags": tags } = pack;

    const wanted = range === "latest" ? tags.latest : range;

    const wantedRange = new semver.Range(wanted);

    const satisfyingVersions = Object.keys(pack.versions).filter((version) =>
      wantedRange.test(version),
    );

    const mostRecentSatisfying = satisfyingVersions.at(
      satisfyingVersions.length - 1,
    );

    if (!mostRecentSatisfying) {
      throw new Error("no good version");
    }

    const versionResponse = await this.fetcher(
      [npmUrl, mostRecentSatisfying].join("/"),
    );

    if (!versionResponse.ok) {
      throw new Error("error from npm");
    }

    const pv: PackumentVersion = await versionResponse.json();
    pack.versions[mostRecentSatisfying] = pv;
    pack["dist-tags"]["_gb"] = mostRecentSatisfying;

    return pack;
  }

  private registryUrl(name: string): string | URL | Request {
    return `https://registry.npmjs.org/${name}`;
  }
}
