/* eslint @typescript-eslint/member-ordering: 0 */

export interface Dependency {
  name: string;
  version: string;
  type: "dev" | "runtime";
  depender: Pick<PackageJson, "name" | "version">;
}

export interface PackageJson {
  name: string;
  version: string;
  license?: string;
  private?: boolean;
  scripts?: Record<string, string>;
  type?: "module" | "commonjs";
  main?: string;
  types?: string;
  module?: string;
  exports?:
    | string
    | Record<
        string,
        | string
        | {
            types?: string;
            require?: string;
            import?: string;
          }
      >;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<
    string,
    {
      optional: boolean;
    }
  >;
  resolutions?: Record<string, string>;
  overrides?: unknown;
  bin?: Record<string, string> | string;
  workspaces?:
    | string[]
    | {
        packages: string[];
      };
  publishConfig?: Record<string, string>;
  repository?: string | { type?: string; url?: string; directory?: string };
  nx?: NxProjectJson;
  generators?: string;
  schematics?: string;
  builders?: string;
  executors?: string;
  packageManager?: string;
  description?: string;
  bugs?: string | { url?: string; email?: string };
  keywords?: string[];
  homepage?: string;
}

export interface NxProjectJson {
  name?: string;
  $schema?: string;
  implicitDependencies?: string[];
  projectType?: "application" | "library";
  sourceRoot?: string;
  generators?: Record<string, unknown>;
  tags?: string[];
  targets?: Record<string, unknown>;
}

type PackageOrProject = PackageJson | NxProjectJson;

export interface GaryProject {
  root: PackageJson;
  projects: PackageOrProject[];
}

export function allKeywords(subject: GaryProject): string[] {
  const keywords = subject.root.keywords ?? [];
  subject.projects.forEach((p) => {
    if ("keywords" in p) {
      keywords.push(...(p.keywords ?? []));
    }
  });
  return [...new Set(keywords)].sort();
}
