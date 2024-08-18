/* eslint @typescript-eslint/member-ordering: 0 */

import type { PackageJson } from "$lib/project/project";

export interface Packument {
  _id?: string;
  _rev?: string;
  name: string;
  description?: string;
  "dist-tags": Record<string, string>;
  versions: Record<string, PackumentVersion>;
  readme?: string;
  maintainers?: Maintainer[];
  time?: Time;
  homepage?: string;
  keywords?: string[];
  repository?: unknown;
  bugs?: unknown;
  license?: string;
  readmeFilename?: string;
}

interface PackumentVersion extends PackageJson {
  files?: string[];
  bin?: unknown;
  typings?: string;
  engines?: unknown;
  bugs?: unknown;
  jest?: unknown;
  gitHead?: string;
  _id?: string;
  _npmVersion?: string;
  _nodeVersion?: string;
  _npmUser?: NpmUser;
  dist?: unknown;
  maintainers?: Maintainer[];
}

interface NpmUser {
  name: string;
  email: string;
}

interface Maintainer {
  name: string;
  email: string;
}

type Time = { modified: string; created: string } | Record<string, string>;

interface NpmUser {
  name: string;
  email: string;
}

interface Maintainer {
  name: string;
  email: string;
}

type Time = { modified: string; created: string } | Record<string, string>;
