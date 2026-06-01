/* eslint @typescript-eslint/member-ordering: 0 */

import type {
  NpmUser,
  NpmUserNamedUser,
  PackageJson,
} from "$lib/project/project";

export type Download = {
  downloads: number;
  end: string;
  package: string;
  start: string;
};

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

export interface PackumentBase {
  "dist-tags": Record<string, string>;
  name: string;
  versions: Record<string, PackumentVersion>;
}

export interface PackumentVersion extends PackageJson {
  _id?: string;
  _nodeVersion?: string;
  _npmUser?: NpmUser;
  _npmVersion?: string;
  gitHead?: string;
}

export interface SearchResultResponse {
  objects: SearchResultObject[];
  time: string;
  total: number;
}

interface SearchResultObject {
  flags: { insecure: number };
  package: SearchResultPackage;
  score: {
    detail: {
      maintenance: number;
      popularity: number;
      quality: number;
    };
    final: number;
  };
  searchScore: number;
}

interface SearchResultPackage extends PackageJson {
  author?: NpmUser;
  date?: string;
  links?: {
    bugs?: string;
    homepage?: string;
    npm: string;
    repository?: string;
  };
  publisher: NpmUserNamedUser;
  scope?: string;
}

type Time = { created: string; modified: string; } | Record<string, string>;
