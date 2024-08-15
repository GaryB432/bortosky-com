import type { GaryProject, PackageJson } from "$lib/project/project";
import { error } from "@sveltejs/kit";
import type {
  CssStyleDeclaration,
  EdgeDataDefinition,
  EdgeDefinition,
  ElementDataDefinition,
  ElementDefinition,
  ElementsDefinition,
  NodeDataDefinition,
  NodeDefinition,
} from "cytoscape";

type GelementDef = ElementDataDefinition & { id: string; label?: string; description?: string };

// export async function getDependencyElements(
//   gprojs: GaryProject[],
//   filter?: string[],
// ): Promise<ElementsDefinition> {
//   if (filter && filter.length > 0) error(501, "bad request");
//   const dg = new DependencyGraph();
//   for (const ws of gprojs) {
//     dg.digestWorkspace(ws);
//   }
//   return dg.elements();
// }

function keywordNode(): NodeDefinition {
  return { data: { id: "" } };
}

export async function getElements(
  keywordMap: Map<string, PackageJson[]>,
): Promise<ElementsDefinition> {
  const mns = new Map<string, NodeDefinition>();
  const mes = new Map<string, EdgeDefinition>();

  // const nodes = [...packageMap.keys()].map<NodeDefinition>((keyword) => {
  //   return { data: { id: keyword } };
  // });

  keywordMap.forEach((pJs, keyword) => {
    const kwdData: GelementDef = getKeywordNode(keyword);
    mns.set(kwdData.id, {
      data: kwdData,
      classes: ["keyword"],
    });
    for (const pJ of pJs) {
      const pJData: GelementDef = getPackageNode(pJ);
      mns.set(pJData.id, { data: pJData, classes: ["package"] });

      const edgeData: GelementDef = getEdge(kwdData, pJData);
      mes.set(edgeData.id, {
        data: {
          source: kwdData.id,
          target: pJData.id,
        },
      });

      //   mns.set(keyword, {
      //     data: pJData,
      //     classes: ["package"],
      //   });
      //   if (!kwdData.id) {
      //     throw new Error("no edge id");
      //   }
      //   const edgeData: EdgeDataDefinition = {
      //     id: pJData.id.concat(keyword),
      //     source: kwdData.id,
      //     target: pJData.id,
      //   };
      //   if (!edgeData.id) {
      //     throw new Error("no element");
      //   }
      //   mes.set(edgeData.id, { data: edgeData });
    }
  });

  return {
    nodes: Array.from(mns.values()),
    edges: Array.from(mes.values()),
  };

  const DEP = "dep";

  function getEdge(kwdData: GelementDef, pJData: GelementDef): GelementDef {
    return {
      id: kwdData.id.concat("|").concat(pJData.id),
      description: ''
    };
  }

  function getPackageNode(pJ: PackageJson): GelementDef {
    return {
      id: pJ.name.concat("@".concat(pJ.version)),
      description: pJ.description,
      label: pJ.name,
    };
  }

  function getKeywordNode(keyword: string): GelementDef {
    return { id: keyword };
  }
  // function addDependencies(
  //   rec: Record<string, unknown> | undefined,
  //   source: string,
  //   depType: "run-time" | "development",
  // ) {
  //   Object.entries(rec ?? {})
  //     .filter(([target]) => !ignoredDeps.has(target))
  //     .forEach(([target, aversion]) => {
  //       mns.set(target, { data: { id: target, aversion }, classes: [DEP] });
  //       const dpid = `${target}_${source}`;
  //       mes.set(dpid, {
  //         data: { id: dpid, source, target },
  //         classes: [DEP, depType],
  //       });
  //     });
  // }

  // for (const gp of gprojs) {
  //   const id = gp.root.name;
  //   mns.set(id, { data: { id }, classes: ["gbp"] });

  //   addDependencies(gp.root.dependencies, id, "run-time");
  //   addDependencies(gp.root.devDependencies, id, "development");

  //   for (const sp of gp.projects) {
  //     const sid = `${id}#${sp.name}`;
  //     mns.set(sid, { data: { id: sid }, classes: ["psub"] });
  //     const eid = `${sid}-${id}`;

  //     mes.set(eid, {
  //       data: {
  //         id: eid,
  //         source: id,
  //         target: sid,
  //       },
  //       classes: "psub",
  //     });
  //     if ("dependencies" in sp) {
  //       addDependencies(sp.dependencies, sid, "run-time");
  //       addDependencies(sp.devDependencies, sid, "development");
  //     }
  //   }
  // }

  // const eleComparer = (a: ElementDefinition, b: ElementDefinition) =>
  //   a.data.id ? a.data.id.localeCompare(b.data.id ?? "") : 0;

  // const nodes = Array.from(mns.values()).sort(eleComparer);

  // const edges = Array.from(mes.values()).sort(eleComparer);

  // return { nodes, edges };
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
        label: "data(label)",
        "background-color": "#666",
      },
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
        "target-arrow-color": "black",
        "source-arrow-color": "black",
      },
    },
  ];
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
