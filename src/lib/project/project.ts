/* eslint @typescript-eslint/member-ordering: 0 */

export interface PackageJson {
  name: string;
  version: string;
  dependencies?: Record<string, string>;
  description?: string;
  private?: boolean;
  devDependencies?: Record<string, string>;
  type?: 'commonjs' | 'module';
  keywords?: string[];
  license?: string;
  repository?: unknown;
  homepage?: string;
  scripts?: Record<string, string>;
  workspaces?: string | string[];
  nx?: NxProjectJson;
}

export interface NxProjectJson {
  name?: string;
  $schema?: string;
  implicitDependencies?: string[];
  projectType?: 'application' | 'library';
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
