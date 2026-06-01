import type {
  CssStyleDeclaration,
  EdgeDefinition,
  ElementDefinition,
  ElementsDefinition,
  NodeDefinition,
} from "cytoscape";

import { DependencyGraph } from "./dependency-graph";
import { type GaryProject } from "./project";

// const ignoredDeps = new Set(["eslint-plugin-gb"]);

export function cssDeclarations(): CssStyleDeclaration[] {
  return [
    {
      selector: "node",
      style: { "background-color": "#666", label: "data(id)" },
    },
    {
      selector: "node.gbp",
      style: { "background-color": "#f00" },
    },
    {
      selector: "node.dep",
      style: { "background-color": "#0f0" },
    },
    {
      selector: "node.focused",
      style: {
        "background-color": "blue",
        "border-color": "green",
        "border-width": 60,
      },
    },
    {
      selector: "edge",
      style: {
        "curve-style": "bezier",
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        width: 3,
      },
    },
    {
      selector: "edge.dep.development",
      style: {
        "line-color": "green",
        "target-arrow-color": "green",
      },
    },
    {
      selector: "edge.dep.run-time",
      style: {
        "line-color": "orange",
      },
    },
    {
      selector: ":selected",
      style: {
        "background-color": "yellow",
        "line-color": "yellow",
        "source-arrow-color": "black",
        "target-arrow-color": "black",
      },
    },
    { selector: "edge:selected", style: { width: 20 } },
  ];
}

export function cssDependencyDeclarations(): CssStyleDeclaration[] {
  return [
    // {
    //   selector: "node",
    //   style: { "background-color": "orange", label: "data(label)" },
    // },
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(label)",
      },
    },
    {
      selector: "node.focused",
      style: {
        "background-color": "blue",
        "border-color": "green",
        "border-width": 60,
      },
    },
    {
      selector: "node.npm",
      style: {
        "background-color": "orange",
        shape: "diamond",
      },
    },
    {
      selector: "node.ws",
      style: {
        "background-color": "#0f0",
      },
    },
    {
      selector: "node.subp",
      style: {
        "background-color": "#0fc",
      },
    },
    {
      selector: "node.subp.root",
      style: {
        "background-color": "red",
      },
    },
    {
      selector: "edge.dependency.dev",
      style: {
        "line-color": "green",
      },
    },
    {
      selector: "edge.dependency.runtime",
      style: {
        "line-color": "orange",
      },
    },
    {
      selector: ":selected",
      style: {
        "background-color": "yellow",
        "line-color": "yellow",
        "source-arrow-color": "black",
        "target-arrow-color": "black",
      },
    },
  ];
}

export function getDependencyElements(
  gprojs: GaryProject[],
  filter?: string[],
): ElementsDefinition {
  if (!filter || filter.length === 0) {
    filter = [];
  }
  console.log(filter);
  const dg = new DependencyGraph();
  for (const ws of gprojs) {
    if (filter.includes(ws.root.name)) {
      dg.digestWorkspace(ws);
    }
  }
  return dg.elements();
}

export function getElements(gprojs: GaryProject[]): ElementsDefinition {
  const mns = new Map<string, NodeDefinition>();
  const mes = new Map<string, EdgeDefinition>();

  const DEP = "dep";

  function addDependencies(
    rec: Record<string, unknown> | undefined,
    source: string,
    depType: "development" | "run-time",
  ) {
    Object.entries(rec ?? {})
      // .filter(([target]) => !ignoredDeps.has(target))
      .forEach(([target, aversion]) => {
        mns.set(target, { classes: [DEP], data: { aversion, id: target } });
        const dpid = `${target}_${source}`;
        mes.set(dpid, {
          classes: [DEP, depType],
          data: { id: dpid, source, target },
        });
      });
  }

  for (const gp of gprojs) {
    const id = gp.root.name;
    mns.set(id, { classes: ["gbp"], data: { id } });

    addDependencies(gp.root.dependencies, id, "run-time");
    addDependencies(gp.root.devDependencies, id, "development");

    for (const sp of gp.projects) {
      const sid = `${id}#${sp.name}`;
      mns.set(sid, { classes: ["psub"], data: { id: sid } });
      const eid = `${sid}-${id}`;

      mes.set(eid, {
        classes: "psub",
        data: {
          id: eid,
          source: id,
          target: sid,
        },
      });
      if ("dependencies" in sp) {
        addDependencies(sp.dependencies, sid, "run-time");
        addDependencies(sp.devDependencies, sid, "development");
      }
    }
  }

  const eleComparer = (a: ElementDefinition, b: ElementDefinition) =>
    a.data.id ? a.data.id.localeCompare(b.data.id ?? "") : 0;

  const nodes = Array.from(mns.values()).sort(eleComparer);

  const edges = Array.from(mes.values()).sort(eleComparer);

  return { edges, nodes };
}
