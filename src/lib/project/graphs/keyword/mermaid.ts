import type { PackageJson } from "$lib/project/project";

function getLabel(n: number): string {
  if (n < 0 || n >= 26 * 26) {
    throw new RangeError("Index out of bounds");
  }

  const firstChar = String.fromCharCode(65 + Math.floor(n / 26));
  const secondChar = String.fromCharCode(65 + (n % 26));

  return firstChar + secondChar;
}

function escape(inputString: string): string {
  return inputString.replace(/[@<>]/g, (match) => {
    switch (match) {
      case '@':
        return '&commat;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      default:
        return match; // If no match is found, return the original character
    }
  });
}

export function makeMermaidGraph(
  packMap: Map<string, PackageJson[]>,
): string[] {
  return [
    "```mermaid",
    "graph TD",
    ...Array.from(packMap.keys(), (k, i) => {
      const v = packMap.get(k);

      if (!v) {
        throw new Error("s");
      }
      const label = getLabel(i);

      const keywordLine = `${label}[${k}]`;
      const packageLines = v.map((pkg) => `${label} -.-> ${escape(pkg.name)}`);

      return [keywordLine, ...packageLines];
    }).flat(),
    "```",
  ];
}
