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

export const load = (async ({ url, fetch }) => {
  const paramPackages = await Promise.all(
    url.searchParams.getAll("p").map(async (p) => {
      const response = await fetch(`https://registry.npmjs.org/${p}`);
      const paramPkg = (await response.json()) as Packument;

      if (paramPkg.error) {
        error(404, `${p} was not returned from npm registry api`);
      }

      const { keywords, name, description } =
        paramPkg.versions[paramPkg["dist-tags"]["latest"]];

      // const {keywords} = m

      return {
        name,
        description,
        keywords,
      };
    }),
  );
  return {
    paramPackages,
  };
}) satisfies PageLoad;
