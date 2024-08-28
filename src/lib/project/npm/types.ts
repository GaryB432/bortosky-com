/* eslint @typescript-eslint/member-ordering: 0 */

import type {
  NpmUser,
  NpmUserNamedUser,
  PackageJson,
} from "$lib/project/project";

type Time = { modified: string; created: string } | Record<string, string>;

interface SearchResultPackage extends PackageJson {
  scope?: "unscoped" | string;
  date?: string;
  links?: {
    npm: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
  publisher: NpmUserNamedUser;
  author?: NpmUser;
}

interface SearchResultObject {
  package: SearchResultPackage;
  flags: { insecure: number };
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
}

export interface SearchResultResponse {
  objects: SearchResultObject[];
  total: number;
  time: string;
}

export type Download = {
  downloads: number;
  start: string;
  end: string;
  package: string;
};

export interface PackumentBase {
  name: string;
  "dist-tags": Record<string, string>;
  versions: Record<string, PackumentVersion>;
}

export interface Packument extends PackumentBase {
  _id?: string;
  _rev?: string;
  bugs?: unknown;
  description?: string;
  homepage?: string;
  keywords?: string[];
  license?: string;
  maintainers?: NpmUserNamedUser[];
  readme?: string;
  readmeFilename?: string;
  repository?: unknown;
  time?: Time;
}

export interface PackumentVersion extends PackageJson {
  gitHead?: string;
  _id?: string;
  _npmVersion?: string;
  _nodeVersion?: string;
  _npmUser?: NpmUser;
}
