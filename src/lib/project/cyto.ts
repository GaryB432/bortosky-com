import type {
  CssStyleDeclaration,
  EdgeDefinition,
  ElementDefinition,
  ElementsDefinition,
  NodeDefinition,
} from "cytoscape";
import type { GaryProject } from "./project";

const ignoredDeps = new Set(["eslint-plugin-gb"]);

export async function getElements(
  gprojs: GaryProject[],
): Promise<ElementsDefinition> {
  const mns = new Map<string, NodeDefinition>();
  const mes = new Map<string, EdgeDefinition>();

  const DEP = "dep";

  function addDependencies(
    rec: Record<string, unknown> | undefined,
    source: string,
    depType: "run-time" | "development",
  ) {
    Object.entries(rec ?? {})
      .filter(([target]) => !ignoredDeps.has(target))
      .forEach(([target, aversion]) => {
        mns.set(target, { data: { id: target, aversion }, classes: [DEP] });
        const dpid = `${target}_${source}`;
        mes.set(dpid, {
          data: { id: dpid, source, target },
          classes: [DEP, depType],
        });
      });
  }

  for (const gp of gprojs) {
    const id = gp.root.name;
    mns.set(id, { data: { id }, classes: ["gbp"] });

    addDependencies(gp.root.dependencies, id, "run-time");
    addDependencies(gp.root.devDependencies, id, "development");

    for (const sp of gp.projects) {
      const sid = `${id}#${sp.name}`;
      mns.set(sid, { data: { id: sid }, classes: ["psub"] });
      const eid = `${sid}-${id}`;

      mes.set(eid, {
        data: {
          id: eid,
          source: id,
          target: sid,
        },
        classes: "psub",
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

  return { nodes, edges };
}

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
        "border-width": 60,
        "border-color": "green",
      },
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
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
        "target-arrow-color": "black",
        "source-arrow-color": "black",
      },
    },
    { selector: "edge:selected", style: { width: 20 } },
  ];
}
