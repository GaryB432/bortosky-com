/* eslint-disable @typescript-eslint/member-ordering */

export interface Features {
  management: {
    nx: boolean;
    lerna: boolean;
    rush: boolean;
  };
  devOps: {
    azure: boolean;
    github: boolean;
  };
  rxjs: boolean;
  angular: boolean;
  devkit: boolean;
  webpack: boolean;
}

export interface Report {
  plat?: string;
  path: string;
  json: PackageJson;
  features: Features;
  monorepo: Report[];
}

export interface PackageJsonRepository {
  type?: string;
  url?: string;
  directory?: string;
}

export interface PackageJson {
  name: string;
  version?: string;
  private?: boolean;
  description?: string;
  keywords?: string[];
  repository?: string | PackageJsonRepository;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}
