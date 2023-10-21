/* eslint @typescript-eslint/member-ordering: 0 */

type UnknownRecord = Record<string, unknown>;

export interface PackageJson {
  name: string;
  version: string;
  dependencies?: UnknownRecord;
  description?: string;
  private?: boolean;
  devDependencies?: UnknownRecord;
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
