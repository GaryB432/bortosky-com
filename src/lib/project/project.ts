/* eslint @typescript-eslint/member-ordering: 0 */

type UnknownRecord = Record<string, unknown>;

export interface PackageJson {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  description?: string;
  private?: boolean;
  devDependencies?: Record<string, string>;
  type?: "commonjs" | "module";
  keywords?: string[];
  license?: string;
  repository?: unknown;
  homepage?: string;
  scripts?: UnknownRecord;
  workspaces?: string | string[];
  nx?: NxProjectJson;
}

export interface NxProjectJson {
  name?: string;
  $schema?: string;
  implicitDependencies?: string[];
  projectType?: "application" | "library";
  sourceRoot?: string;
  generators?: UnknownRecord;
  tags?: string[];
  targets?: UnknownRecord;
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
