import type { PackageJson } from "$lib/project/project";

export function makeMermaidGraph(
  packMap: Map<string, PackageJson[]>,
): string[] {
  const rpt = [
    "```mermaid",
    "graph TD",
    // A[house] --> K[kitchen]
    // A --> B[bathroom]
    // B -.-> R(room)
    // B -.-> M(bathing)
    // K -.-> L(cooking)
    // K -.-> R
    // ```
  ];

  let counter = 64;
  packMap.forEach((v, k) => {
    const cn = String.fromCharCode(++counter);
    rpt.push(`${cn}[${k}]`);
    rpt.push(...v.map((m) => `${cn} -.-> ${m.name}`));
  });

  rpt.push("```");
  return rpt;
}
