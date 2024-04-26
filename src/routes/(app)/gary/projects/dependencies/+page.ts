import { getDependencyElements } from "$lib/project/cyto";
import type { PageLoad } from "./$types";

export const load = (async ({ parent }) => {
  const { projects } = await parent();
  const elements = await getDependencyElements(
    projects,
    [], // url.searchParams.getAll("p"),
  );

  return { elements };
}) satisfies PageLoad;
