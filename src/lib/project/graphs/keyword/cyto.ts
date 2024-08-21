import type { PackageJson } from "$lib/project/project";
import type {
  CssStyleDeclaration,
  EdgeDefinition,
  ElementDataDefinition,
  ElementsDefinition,
  NodeDefinition,
} from "cytoscape";

export type GElementDataDefinition = ElementDataDefinition & {
  description?: string;
  id: string;
  label?: string;
};

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
    const kwdData: GElementDataDefinition = getKeywordNode(keyword);
    mns.set(kwdData.id, {
      data: kwdData,
      classes: ["keyword"],
    });
    for (const pJ of pJs) {
      const pJData: GElementDataDefinition = getPackageNode(pJ);
      mns.set(pJData.id, { data: pJData, classes: ["package"] });

      const edgeData: GElementDataDefinition = getEdge(kwdData, pJData);
      mes.set(edgeData.id, {
        data: {
          source: kwdData.id,
          target: pJData.id,
        },
      });
    }
  });

  return {
    nodes: Array.from(mns.values()),
    edges: Array.from(mes.values()),
  };

  function getEdge(
    kwdData: GElementDataDefinition,
    pJData: GElementDataDefinition,
  ): GElementDataDefinition {
    return {
      id: kwdData.id.concat("|").concat(pJData.id),
      description: "",
    };
  }

  function getPackageNode(pJ: PackageJson): GElementDataDefinition {
    return {
      id: pJ.name.concat("@".concat(pJ.version)),
      description: pJ.description,
      label: pJ.name,
    };
  }

  function getKeywordNode(keyword: string): GElementDataDefinition {
    return { id: keyword, label: keyword };
  }
}

export function cssDeclarations(): CssStyleDeclaration[] {
  return [
    {
      selector: "node",
      style: { "background-color": "#666", label: "data(label)" },
    },
    {
      selector: "node.package",
      style: { "background-color": "#f00" },
    },
    {
      selector: "node.keyword",
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
