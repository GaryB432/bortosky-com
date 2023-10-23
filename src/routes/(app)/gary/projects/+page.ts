import { base } from "$app/paths";
import { getElements } from "$lib/project/cyto";
import type { GaryProject } from "$lib/project/project";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const response = await fetch(base.concat("/gary/projects.json"));
  const info: GaryProject[] = await response.json();
  const elements = await getElements(info);

  return { elements };
}) satisfies PageLoad;
