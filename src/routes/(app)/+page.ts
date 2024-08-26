import { Service } from "$lib/project/npm";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const svc = new Service(fetch);

  const somePackages = await svc.getSomePackages(20);

  const pops = await Promise.all(
    somePackages.map(async (p) => await svc.getDownloads(p, "last-month")),
  );

  const popularDownloads = pops
    .filter((d) => !!d)
    .sort((a, b) => b.downloads - a.downloads);

  return {
    somePackages,
    popularDownloads,
  };
}) satisfies PageLoad;
