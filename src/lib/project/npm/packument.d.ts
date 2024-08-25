/* eslint @typescript-eslint/member-ordering: 0 */

import type { PackageJson } from "$lib/project/project";

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
  maintainers?: Maintainer[];
  readme?: string;
  readmeFilename?: string;
  repository?: unknown;
  time?: Time;
}

interface PackumentVersion extends PackageJson {
  gitHead?: string;
  _id?: string;
  _npmVersion?: string;
  _nodeVersion?: string;
  _npmUser?: NpmUser;
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

type Time = { modified: string; created: string } | Record<string, string>;
