import * as semver from "semver";
import type {
  Download,
  PackumentBase,
  PackumentVersion,
  SearchResultResponse,
} from "./types";

export interface IService {
  getPackument(name: string, range: string): Promise<PackumentBase | undefined>;
}

type Period = "last-day" | "last-week" | "last-month" | "last-year";

export interface IDownloadService {
  getDownloads(name: string, period: Period): Promise<Download | undefined>;
  getSomePackages(size: number, text: string): Promise<string[]>;
}

export class Service implements IService, IDownloadService {
  public constructor(
    private readonly fetcher: (
      input: string | URL | Request,
      init?: RequestInit,
    ) => Promise<Response>,
  ) {}

  public async getDownloads(
    name: string,
    period: Period = "last-week",
  ): Promise<Download | undefined> {
    const resp = await this.fetcher(this.downloadsUrl(period, name));
    return resp.json() as Promise<Download>;
  }

  public async getPackument(
    name: string,
    rangeComparator: string,
  ): Promise<PackumentBase | undefined> {
    const npmUrl = this.registryUrl(name);
    const resp = await this.fetcher(npmUrl, {
      headers: {
        Accept:
          "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*",
      },
    });

    if (!resp.ok) {
      throw new Error(
        `failed getting packument ${name} (for ${rangeComparator}) from npm -> ${npmUrl}`,
      );
    }

    const pack: PackumentBase = await resp.json();

    const { "dist-tags": tags } = pack;

    const range = this.adjustRangeString(rangeComparator);

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

  private adjustRangeString(rangeComparator: string) {
    const [, part2] = rangeComparator.split(":");

    return part2 ? rangeComparator : "latest";
  }

  public async getSomePackages(size: number, text: string): Promise<string[]> {
    const u = this.getSearchUrl(text, size);
    const fetched = await this.fetcher(u, {
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    });
    const resp: SearchResultResponse = await fetched.json();

    return resp.objects.map((o) => o.package.name);
  }

  private readonly registryUrlBase = "https://registry.npmjs.org";

  private getSearchUrl(text: string, size: number): URL {
    const url = new URL("/-/v1/search", this.registryUrlBase);
    url.searchParams.set("text", text);
    url.searchParams.set("size", size.toString());
    return url;
  }

  private registryUrl(name: string): URL {
    return new URL(name, this.registryUrlBase);
  }

  private downloadsUrl(period: string, name: string): string | URL | Request {
    return new URL(
      `downloads/point/${period}/${name}`,
      "https://api.npmjs.org",
    );
  }
}
