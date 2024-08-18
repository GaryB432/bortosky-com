/* eslint @typescript-eslint/member-ordering: 0 */

export interface Packument {
  _id?: string;
  _rev?: string;
  name: string;
  description?: string;
  "dist-tags": { latest: string };
  versions: Record<string, N010>;
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

interface N010 {
  name: string;
  version: string;
  description?: string;
  license?: string;
  repository?: {
    type?: string;
    url?: string;
  };
  keywords?: string[];
  files?: string[];
  bin?: unknown;
  main?: string;
  typings?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  engines?: unknown;
  bugs?: unknown;
  homepage?: string;
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
