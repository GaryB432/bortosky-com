import { getElements } from '$lib/project/cyto';
import type { GaryProject } from '$lib/project/project';
import type { PageLoad } from './$types';
import allProjects from './projects.json';

export const load = (async ({ params }) => {
  const elements = await getElements(allProjects as GaryProject[]);

  return { elements };
}) satisfies PageLoad;