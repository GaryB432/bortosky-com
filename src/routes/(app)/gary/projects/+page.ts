import { getElements } from "$lib/project/cyto";
import type { GaryProject } from "$lib/project/project";
import type { PageLoad } from "./$types";
import allProjects from "./projects.json";

export const load = (async ({ params }) => {
  // TODO use fetch like ./theater
  const elements = await getElements(<GaryProject[]>allProjects);

  return { elements };
}) satisfies PageLoad;
