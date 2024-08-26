import { Service, type Download } from "$lib/project/npm";
import { shuffle } from "$lib/shared/utils";
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  const svc = new Service(fetch);

  const downloadInfo: Array<{
    category: string;
    popularDownloads: Download[];
  }> = [];

  const texts = ["web", "framework", "cli"];

  for (const category of texts) {
    const somePackages = await svc.getSomePackages(200, category);
    const popularDownloads = (
      await Promise.all(
        shuffle(
          somePackages.map(
            async (p) => await svc.getDownloads(p, "last-month"),
          ),
        ),
      )
    )
      .filter((d) => !!d)
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 20);
    downloadInfo.push({ category, popularDownloads });
  }

  return { downloadInfo };
}) satisfies PageLoad;
