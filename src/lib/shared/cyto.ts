import type {
  EdgeDataDefinition,
  EdgeDefinition,
  ElementDataDefinition,
  ElementDefinition,
  ElementsDefinition,
  NodeDataDefinition,
  NodeDefinition,
} from "cytoscape";

interface WorkspaceFeatures {
  angular: boolean;
  devOps: {
    azure?: boolean;
    github?: boolean;
  };
  devkit: boolean;
  management: {
    lerna?: boolean;
    nx?: boolean;
    rush?: boolean;
  };
  rxjs: boolean;
  webpack: boolean;
}

interface NodePackage {
  dependencies?: Record<string, string>;
  description?: string;
  devDependencies?: Record<string, string>;
  homepage?: string;
  keywords?: string[];
  license?: string;
  name: string;
  repository?: unknown;
  version: string;
}

export interface PackageConfiguration {
  features: WorkspaceFeatures;
  json: NodePackage;
  monorepo: unknown[];
  path: string;
}

// export function onep(p: PackageConfiguration): NodeDataDefinition {
//   const pj = p.json;
//   const j = Object.keys(p.json.dependencies ?? {}).map((dep) => ({
//     name: pj.name,
//     dep,
//   }));

//   const qq = j.map((ji) => {
//     return ji;
//   });

//   console.log(j);
//   return {};
// }

function compareElements(a: ElementDefinition, b: ElementDefinition): number {
  const sa = a.data.id ?? "";
  const sb = b.data.id ?? "";
  return sa.localeCompare(sb);
}

export function toElementsDefinition(
  ps: PackageConfiguration[],
): ElementsDefinition {
  const nmap = new Map<string, NodeDefinition>();
  const emap = new Map<string, EdgeDefinition>();

  for (const p of ps) {
    const setEdge = (depk: string, dev: boolean) => {
      if (!nmap.has(depk)) {
        nmap.set(depk, { data: { id: depk } });
      }
      const ek = `${depk}_${p.json.name}`;
      emap.set(ek, {
        data: { id: ek, source: p.json.name, target: depk, dev },
      });
    };

    nmap.set(p.json.name, {
      data: { id: p.json.name, root: true },
      classes: ["root"],
    });
    for (const depk of Object.keys(p.json.devDependencies ?? {})) {
      setEdge(depk, true);
    }
    for (const depk of Object.keys(p.json.dependencies ?? {})) {
      setEdge(depk, false);
    }
  }

  // console.log({ nmap, emap });

  // const nodes = ps.map<NodeDefinition>((p) => {
  //   const { path, features } = p;
  //   // const id = idn.toString();
  //   const id = p.json.name;
  //   const data: NodeDataDefinition = {
  //     id,
  //     path,
  //     features,
  //   };
  //   return { data };
  // });

  // const edges: EdgeDefinition[] = [];
  const nodes = Array.from(nmap.values()).sort(compareElements);
  const edges = Array.from(emap.values()).sort(compareElements);

  edges.forEach(
    (e) => (e.classes = [e.data["dev"] ? "devDependency" : "dependency"]),
  );

  // const f: ElementsDefinition = {
  //   nodes,
  //   edges,
  // };

  // const a = { nodes, edges };

  // console.log(JSON.stringify(a));

  // return JSON.parse(JSON.stringify(a));

  // console.log(JSON.stringify({ nodes, edges }));
  return { nodes, edges };
}
