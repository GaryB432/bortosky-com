import type { PackageJson } from "$lib/project/project";
import type {
  CssStyleDeclaration,
  EdgeDataDefinition,
  EdgeDefinition,
  ElementDataDefinition,
  ElementsDefinition,
  NodeDefinition,
} from "cytoscape";

type ElementDataWithId = Required<Pick<ElementDataDefinition, "id">>;

type PackageJsonDataDefinition = ElementDataWithId & PackageJson;

type KeywordDataDefinition = ElementDataWithId;

type PkEdgeDefinition = ElementDataWithId & EdgeDataDefinition;

export type GElementDataDefinitionx = ElementDataDefinition & {
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

export async function getElements(
  keywordMap: Map<string, PackageJson[]>,
): Promise<ElementsDefinition> {
  const mns = new Map<string, NodeDefinition>();
  const mes = new Map<string, EdgeDefinition>();

  // const nodes = [...packageMap.keys()].map<NodeDefinition>((keyword) => {
  //   return { data: { id: keyword } };
  // });

  keywordMap.forEach((pJs, keyword) => {
    const kwdData: KeywordDataDefinition = getKeywordNodeData(keyword);
    mns.set(kwdData.id, {
      data: kwdData,
      classes: ["keyword"],
    });
    for (const pJ of pJs) {
      const pJData: PackageJsonDataDefinition = getPackageNodeData(pJ);
      mns.set(pJData.id, { data: pJData, classes: ["package"] });

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
    nodes: Array.from(mns.values()),
    edges: Array.from(mes.values()),
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
    const { name, version, description, keywords } = pJ;

    return {
      id: pJ.name.concat("@".concat(pJ.version)),
      name,
      version,
      description,
      keywords,
    };
  }

  function getKeywordNodeData(keyword: string): KeywordDataDefinition {
    return { id: keyword };
  }
}

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
