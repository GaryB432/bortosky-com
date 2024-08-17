import { getElements } from "$lib/project/graphs/keyword/cyto";
import { getKeywordMap } from "$lib/project/graphs/keyword/map";
import { Service } from "$lib/project/npm";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const prerender = false;

const npm = new Service();

export const load = (async ({ url, fetch }) => {
  const ps = url.searchParams.getAll("p");
  if (ps.length !== 1) {
    throw new Error("1 package and only 1");
  }
  const paramPackages = await Promise.all(
    ps.map(async (p) => {
      const packument = await npm.getPackage(p);

      if (!packument) {
        error(404, `${p} was not returned from npm registry api`);
      }
      const keywordMap = await getKeywordMap(packument, npm);

      const cytoElements = await getElements(keywordMap);

      return {
        keywordMap,
        cyto: { elements: cytoElements },
      };
    }),
  );

  return {
    paramPackages,
  };
}) satisfies PageLoad;
