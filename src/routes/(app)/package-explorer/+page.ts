import { getElements } from "$lib/project/graphs/keyword/cyto";
import { getKeywordMap } from "$lib/project/graphs/keyword/map";
import { makeMermaidGraph } from "$lib/project/graphs/keyword/mermaid";
import { Service } from "$lib/project/npm";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

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
      const packument = await npm.getPackage(p);

      if (!packument) {
        error(404, `${p} was not returned from npm registry api`);
      }
      const keywordMap = await getKeywordMap(packument, npm);

      const cytoElements = await getElements(keywordMap);

      return {
        cyto: { elements: cytoElements },
      };
    }),
  );

  // paramPackages.push({
  //   name: "FUN",
  //   mermaidGraph: [],
  //   description: "FUNNEST PACKAGE EVER",
  //   keywords: ["NBD"],
  // });

  return {
    paramPackages,
  };
}) satisfies PageLoad;
