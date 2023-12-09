import { base } from "$app/paths";
import type { GaryProject } from "$lib/project/project";
import type { LayoutLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const resp = await fetch(base.concat("/gary/projects.json"));
  const projects = (await resp.json()) as GaryProject[];

  return { projects };
}) satisfies LayoutLoad;
