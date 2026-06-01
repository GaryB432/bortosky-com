import { getElements } from "$lib/project/cyto";

import type { PageLoad } from "./$types";

export const load = (async ({ parent }) => {
  const { projects } = await parent();
  const elements = getElements(projects);

  return { elements };
}) satisfies PageLoad;
