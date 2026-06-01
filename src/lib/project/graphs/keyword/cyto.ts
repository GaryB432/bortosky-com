import type { PackageJson } from "$lib/project/project";
import type {
  CssStyleDeclaration,
  EdgeDataDefinition,
  EdgeDefinition,
  ElementDataDefinition,
  ElementsDefinition,
  NodeDefinition,
} from "cytoscape";

export type GElementDataDefinitionx = {
  description?: string;
  id: string;
  label?: string;
} & ElementDataDefinition;

type ElementDataWithId = Required<Pick<ElementDataDefinition, "id">>;

type KeywordDataDefinition = ElementDataWithId;

type PackageJsonDataDefinition = ElementDataWithId & PackageJson;

type PkEdgeDefinition = EdgeDataDefinition & ElementDataWithId;

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

export function cssDeclarations(): CssStyleDeclaration[] {
  return [
    {
      selector: "node",
      style: { "background-color": "#666" },
    },
    {
      selector: "node.package",
      style: { "background-color": "#f00", label: "data(name)" },
    },
    {
      selector: "node.keyword",
      style: { "background-color": "#0f0", label: "data(id)" },
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

export function getElements(
  keywordMap: Map<string, PackageJson[]>,
): ElementsDefinition {
  const mns = new Map<string, NodeDefinition>();
  const mes = new Map<string, EdgeDefinition>();

  // const nodes = [...packageMap.keys()].map<NodeDefinition>((keyword) => {
  //   return { data: { id: keyword } };
  // });

  keywordMap.forEach((pJs, keyword) => {
    const kwdData: KeywordDataDefinition = getKeywordNodeData(keyword);
    mns.set(kwdData.id, {
      classes: ["keyword"],
      data: kwdData,
    });
    for (const pJ of pJs) {
      const pJData: PackageJsonDataDefinition = getPackageNodeData(pJ);
      mns.set(pJData.id, { classes: ["package"], data: pJData });

      const edgeData: PkEdgeDefinition = getEdge(kwdData, pJData);
      mes.set(edgeData.id, {
        data: {
          source: kwdData.id,
          target: pJData.id,
        },
      });
    }
  });

  return {
    edges: Array.from(mes.values()),
    nodes: Array.from(mns.values()),
  };

  function getEdge(
    kwdData: KeywordDataDefinition,
    pJData: PackageJsonDataDefinition,
  ): PkEdgeDefinition {
    return {
      id: kwdData.id.concat("|").concat(pJData.id),
      source: kwdData.id,
      target: pJData.id,
    };
  }

  function getPackageNodeData(pJ: PackageJson): PackageJsonDataDefinition {
    const { description, keywords, name, version } = pJ;

    return {
      description,
      id: pJ.name.concat("@".concat(pJ.version)),
      keywords,
      name,
      version,
    };
  }

  function getKeywordNodeData(keyword: string): KeywordDataDefinition {
    return { id: keyword };
  }
}
