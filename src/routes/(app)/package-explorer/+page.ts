import { getKeywordMap } from "$lib/project/graphs/keyword/map";
import { Service } from "$lib/project/npm";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { makeMermaidGraph } from "$lib/project/graphs/keyword/mermaid";

export const prerender = false;

type Packument = {
  description: string;
  "dist-tags": Record<string, string>;
  error?: unknown;
  keywords: string[];
  name: string;
  versions: Record<string, Packument>;
};

const npm = new Service();

export const load = (async ({ url, fetch }) => {
  const paramPackages = await Promise.all(
    url.searchParams.getAll("p").map(async (p) => {
      // const response = await fetch(`https://registry.npmjs.org/${p}`);
      // const paramPkg = (await response.json()) as Packument;

      // if (paramPkg.error) {
      //   error(404, `${p} was not returned from npm registry api`);
      // }

      // const { keywords, name, description } =
      //   paramPkg.versions[paramPkg["dist-tags"]["latest"]];

      const packument = await npm.getPackage(p);

      // console.log(ppk);

      if (!packument) {
        error(404, `${p} was not returned from npm registry api`);
      }
      const packMap = await getKeywordMap(packument, npm);

      console.log("handle", Array.from(packMap.keys()).join());

      const mermaidGraph = makeMermaidGraph(packMap);

      // console.log(mermaidGraph.join("\n"));

      // const m = new Set(
      //   Array.from(packageRecord.entries()).map(([f, d]) => {
      //     return f;
      //   }),
      // );

      const { name, description, keywords } = packument;

      return {
        name,
        mermaidGraph,
        description,
        keywords,
      };
    }),
  );

  paramPackages.push({
    name: "FUN",
    mermaidGraph: [],
    description: "FUNNEST PACKAGE EVER",
    keywords: ["NBD"],
  });

  return {
    paramPackages,
  };
}) satisfies PageLoad;


