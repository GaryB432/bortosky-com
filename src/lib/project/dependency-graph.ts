import type {
  EdgeDataDefinition,
  EdgeDefinition,
  ElementsDefinition,
  NodeDataDefinition,
  NodeDefinition,
} from "cytoscape";
import type { GaryProject, NxProjectJson, PackageJson } from "./project";

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

type NodeDataWithId = WithRequired<NodeDataDefinition, "id" | "label">;
type EdgeDataWithId = WithRequired<EdgeDataDefinition, "id">;

type DepType = "dev" | "runtime";

export class DependencyGraph {
  private mes = new Map<string, EdgeDefinition>();
  private mns = new Map<string, NodeDefinition>();

  public digestWorkspace(ws: GaryProject): void {
    const wsNode = this.getWorkspaceData(ws);
    this.mns.set(wsNode.id, { data: wsNode, classes: ["ws"] });

    this.digestProject(ws.root, undefined);

    for (const subp of ws.projects) {
      this.digestProject(subp, ws);
    }
  }

  public elements(): ElementsDefinition {
    const nodes: NodeDefinition[] = Array.from(this.mns.values());
    const edges: EdgeDefinition[] = Array.from(this.mes.values());
    return { nodes, edges };
  }

  private digestDependencyRecord(
    dependencyRecord: Record<string, string> | undefined,
    dependerNodeData: NodeDataWithId,
    depType: DepType,
  ): void {
    for (const [k, v] of Object.entries(dependencyRecord ?? {})) {
      const pkgNodeData = this.getPackageData(k);
      const versionNodeData = this.getPackageVersionData(k, v);

      this.mns.set(pkgNodeData.id, { data: pkgNodeData, classes: [] });
      this.mns.set(versionNodeData.id, {
        data: versionNodeData,
        classes: [],
      });

      const pvEdgeData = this.edgeForPackageVersionPackage(
        pkgNodeData,
        versionNodeData,
      );
      this.mes.set(pvEdgeData.id, { data: pvEdgeData });

      const pppvEdgeData = this.edgeForProjectPackageVersion(
        versionNodeData,
        dependerNodeData,
      );

      this.mes.set(pppvEdgeData.id, {
        data: pppvEdgeData,
        classes: ["dependency", depType],
      });
    }
  }

  private digestProject(
    depender: PackageJson | NxProjectJson,
    ws: GaryProject | undefined,
  ): void {
    const dep = depender as PackageJson;
    if (dep.name && (dep.dependencies || dep.devDependencies)) {
      const workspace: GaryProject = ws ?? {
        root: { name: dep.name, version: "ephemeral" },
        projects: [],
      };
      const wsNodeData = this.getWorkspaceData(workspace);
      const dependerNodeData = this.getProjectData(dep, wsNodeData);
      this.mns.set(dependerNodeData.id, {
        data: dependerNodeData,
        classes: ws ? ["subp"] : ["subp", "root"],
      });
      const wsProjEdgeData = this.edgeForWorkspaceProject(
        dependerNodeData,
        wsNodeData,
      );
      this.mes.set(wsProjEdgeData.id, {
        data: wsProjEdgeData,
      });

      this.digestDependencyRecord(dep.devDependencies, dependerNodeData, "dev");
      this.digestDependencyRecord(
        dep.dependencies,
        dependerNodeData,
        "runtime",
      );
    }
  }

  private edgeForPackageVersionPackage(
    a: NodeDataWithId,
    b: NodeDataWithId,
  ): EdgeDataWithId {
    const id = a.id.concat(">").concat(b.id);
    return { id, source: a.id, target: b.id };
  }

  private edgeForProjectPackageVersion(
    a: NodeDataWithId,
    b: NodeDataWithId,
  ): EdgeDataWithId {
    const id = a.id.concat(">").concat(b.id);
    return { id, source: a.id, target: b.id };
  }

  private edgeForWorkspaceProject(
    a: NodeDataWithId,
    b: NodeDataWithId,
  ): EdgeDataWithId {
    const id = a.id.concat(">").concat(b.id);
    return { id, source: a.id, target: b.id };
  }

  private getPackageData(pkg: string): NodeDataWithId {
    const id = pkg.concat("@npm");
    const label = pkg;

    return { id, label };
  }

  private getPackageVersionData(pkg: string, version: string): NodeDataWithId {
    const id = pkg.concat("@npm").concat("@").concat(version);
    const label = version;

    return { id, label };
  }

  private getProjectData(
    pj: PackageJson | NxProjectJson,
    wsNode: NodeDataWithId,
  ): NodeDataWithId {
    const name = pj.name ?? "root";
    const id = wsNode.id.concat("@").concat(name);
    const label = name;

    return { id, label };
  }

  private getWorkspaceData(ws: GaryProject): NodeDataWithId {
    const id = ws.root.name;
    const label = ws.root.name;

    return { id, label };
  }
}
