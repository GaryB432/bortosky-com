import { toElementsDefinition, type PackageConfiguration } from '$lib/cyto';
import type { PageLoad } from './$types';
import bortoskyProjects from './azure/bortosky.json';
import gitHubProjects from './github/garyb432.json';

export const load = (async ({ params }) => {
  const jj = bortoskyProjects as unknown as PackageConfiguration[];
  const gh = gitHubProjects as unknown as PackageConfiguration[];

  console.log(gh.length);

  const elements = toElementsDefinition(gh);

  // const elements = ghElements.nodes.filter((a) => {
  //   const dev = a.data['dev'];
  //   return !dev;
  // });

  // elements.forEach((n) => console.log(n.data, n.selected, n.data['dev']));

  return { elements };
}) satisfies PageLoad;
