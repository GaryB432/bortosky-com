import { base } from "$app/paths";
import { getElements } from "$lib/project/cyto";
import type { GaryProject } from "$lib/project/project";
import type { PageLoad } from "./$types";
import {page} from "$app/stores"


export const load = (async (asdf) => {
  const ff = await asdf.parent();
  const elements = await getElements(ff.projects);

  return { elements };
}) satisfies PageLoad;
