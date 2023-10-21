import type {
  EdgeDefinition,
  ElementsDefinition,
  NodeDefinition,
} from "cytoscape";
import type { GaryProject } from "./project";

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
    Object.entries(rec ?? {}).forEach(([target, aversion]) => {
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

  const nodes = Array.from(mns.values()).sort((a, b) =>
    a.data.id ? a.data.id.localeCompare(b.data.id ?? "") : 0,
  );

  const edges = Array.from(mes.values()).sort((a, b) =>
    a.data.id ? a.data.id.localeCompare(b.data.id ?? "") : 0,
  );

  return { nodes, edges };
}
