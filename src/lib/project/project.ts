/* eslint @typescript-eslint/member-ordering: 0 */

type UnknownRecord = Record<string, unknown>;

export interface Dependency {
  name: string;
  version: string;
  type: "dev" | "runtime";
  depender: PackageJson;
}

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
  repository?: string | { type: string; url: string; directory?: string };
  homepage?: string;
  scripts?: Record<string, string>;
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

export function getDependencies(
  projects: GaryProject[],
  queriedPackageNames: string[],
): Dependency[] {
  const deps: Dependency[] = [];

  function grabDependencies(
    depender: PackageJson,
    name: string,
    parent?: PackageJson,
  ): void {
    if (depender.devDependencies) {
      const version = depender.devDependencies[name];
      if (version) {
        deps.push({ name: name, version, type: "dev", depender });
      }
    }
    if (depender.dependencies) {
      const version = depender.dependencies[name];
      if (version) {
        deps.push({ name: name, version, type: "runtime", depender });
      }
    }
  }

  for (const project of projects) {
    for (const name of queriedPackageNames) {
      grabDependencies(project.root, name);
      for (const subp of (project.projects as PackageJson[]).filter(
        (p) => p.devDependencies || p.dependencies,
      )) {
        grabDependencies(subp, name, project.root);
      }
    }
  }
  return deps;
}
