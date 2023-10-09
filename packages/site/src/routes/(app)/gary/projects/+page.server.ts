import type { PageServerLoad, RouteParams } from './$types';
async function demo(params: RouteParams): Promise<string> {
  return Promise.resolve(`gary/projects`);
}

export const load = (async ({ params }) => {
  return {
    subject: await demo(params),
  };
}) satisfies PageServerLoad;
