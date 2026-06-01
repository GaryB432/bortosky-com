import { error } from "@sveltejs/kit";
import { getElements } from "$lib/project/graphs/keyword/cyto";
import { getKeywordMap } from "$lib/project/graphs/keyword/map";
import { Service } from "$lib/project/npm";

import type { PageLoad } from "./$types";

export const prerender = false;

export const load = (async ({ fetch, url }) => {
  const npm = new Service(fetch);
  const ps = url.searchParams.getAll("p").filter((p) => p !== "");
  if (ps.length !== 1) {
    throw new Error("1 package and only 1");
  }
  const paramPackages = await Promise.all(
    ps.map(async (p) => {
      const packument = await npm.getPackument(p, "latest");

      if (!packument) {
        error(404, `${p} was not returned from npm registry api`);
      }
      const keywordMap = await getKeywordMap(packument, npm);

      const cytoElements = getElements(keywordMap);

      return {
        cyto: { elements: cytoElements },
        keywordMap,
      };
    }),
  );

  return {
    paramPackages,
  };
}) satisfies PageLoad;
