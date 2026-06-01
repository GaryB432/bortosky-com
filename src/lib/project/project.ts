/* eslint @typescript-eslint/member-ordering: 0 */

export interface Dependency {
  depender: Pick<PackageJson, "name" | "version">;
  name: string;
  type: "dev" | "runtime";
  version: string;
}

export interface GaryProject {
  projects: PackageOrProject[];
  root: PackageJson;
}

export type NpmUser = {
  email?: string;
  name?: string;
};

export type NpmUserNamedUser =
  | {
      username?: string;
    }
  | Omit<NpmUser, "name">;

export interface NxProjectJson {
  $schema?: string;
  generators?: Record<string, unknown>;
  implicitDependencies?: string[];
  name?: string;
  projectType?: "application" | "library";
  sourceRoot?: string;
  tags?: string[];
  targets?: Record<string, unknown>;
}

export interface PackageJson {
  bin?: Record<string, string> | string;
  bugs?: { email?: string; url?: string; } | string;
  builders?: string;
  dependencies?: Record<string, string>;
  description?: string;
  devDependencies?: Record<string, string>;
  dist?: {
    [k: string]: unknown;
    shasum?: string;
    tarball?: string;
  };
  engines?: unknown;
  executors?: string;
  exports?:
    | Record<
        string,
        | {
            import?: string;
            require?: string;
            types?: string;
          }
        | string
      >
    | string;
  files?: string[];
  generators?: string;
  homepage?: string;
  keywords?: string[];
  license?: string;
  main?: string;
  maintainers?: NpmUserNamedUser[];
  module?: string;
  name: string;
  nx?: NxProjectJson;
  optionalDependencies?: Record<string, string>;
  overrides?: unknown;
  packageManager?: string;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<
    string,
    {
      optional: boolean;
    }
  >;
  private?: ("false" | "true") | boolean;
  publishConfig?: Record<string, string>;
  repository?:
    | {
        [k: string]: unknown;
        directory?: string;
        type?: string;
        url?: string;
      }
    | string;
  resolutions?: Record<string, string>;
  schematics?: string;
  scripts?: Record<string, string>;
  type?: "commonjs" | "module";
  types?: string;
  typings?: string;
  version: string;
  workspaces?:
    | {
        [k: string]: unknown;
        nohoist?: string[];
        packages?: string[];
      }
    | string[];
}

type PackageOrProject = NxProjectJson | PackageJson;

export function allKeywords(subject: GaryProject): string[] {
  const keywords = subject.root.keywords ?? [];
  subject.projects.forEach((p) => {
    if ("keywords" in p) {
      keywords.push(...(p.keywords ?? []));
    }
  });
  return [...new Set(keywords)].sort();
}
