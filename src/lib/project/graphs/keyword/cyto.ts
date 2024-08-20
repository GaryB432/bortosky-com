import type { PackageJson } from "$lib/project/project";
import type {
  CssStyleDeclaration,
  EdgeDataDefinition,
  EdgeDefinition,
  ElementDataDefinition,
  ElementsDefinition,
  NodeDataDefinition,
  NodeDefinition,
} from "cytoscape";

type ElementDataWithId = Required<Pick<ElementDataDefinition, "id">>;

type PackageJsonDataDefinition = PackageJson &
  ElementDataWithId & {
    label: string;
  };

type KeywordDataDefinition = NodeDataDefinition & ElementDataWithId;

type GEdgeDataDefinition = EdgeDataDefinition & ElementDataWithId;

export async function getElements(
  keywordMap: Map<string, PackageJson[]>,
): Promise<ElementsDefinition> {
  const mns = new Map<string, NodeDefinition>();
  const mes = new Map<string, EdgeDefinition>();

  keywordMap.forEach((pJs, keyword) => {
    const kwdData: KeywordDataDefinition = getKeywordNodeData(keyword);
    mns.set(kwdData.id, {
      data: kwdData,
      classes: ["keyword"],
    });
    for (const pJ of pJs) {
      const pJData: PackageJsonDataDefinition = getPackageNodeData(pJ);
      mns.set(pJData.id, { data: pJData, classes: ["package"] });

      const edgeData = getEdgeData(kwdData, pJData);
      mes.set(edgeData.id, {
        data: edgeData,
      });
    }
  });

  return {
    nodes: Array.from(mns.values()),
    edges: Array.from(mes.values()),
  };

  function getEdgeData(
    kwdData: KeywordDataDefinition,
    pJData: PackageJsonDataDefinition,
  ): GEdgeDataDefinition {
    return {
      id: kwdData.id.concat("|").concat(pJData.id),
      source: kwdData.id,
      target: pJData.id,
    };
  }

  function getPackageNodeData(pJ: PackageJson): PackageJsonDataDefinition {
    return {
      ...pJ,
      id: pJ.name.concat("@".concat(pJ.version)),
      label: pJ.name,
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
