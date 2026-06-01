import { getDependencyElements } from "$lib/project/cyto";

import type { PageLoad } from "./$types";

export const prerender = false;

export const load = (async ({ parent, url }) => {
  const { projects } = await parent();

  console.log(projects.length);

  const xprojects = [
    {
      projects: [
        {
          dependencies: { brake: "~1.4.6", throttle: "^4.1.2" },
          devDependencies: {
            desk: "^1.4.9",
            "eslint-plugin-gb": "skipped",
            window: "5.4.2",
          },
          name: "wsa-a",
          type: "module",
        },
        {
          dependencies: { brake: "~1.4.6", throttle: "^4.1.2" },
          devDependencies: {
            desk: "^1.4.9",
            "eslint-plugin-gb": "skipped",
          },
          name: "wsa-b",
          type: "commonjs",
        },
      ],
      root: {
        dependencies: { album: "4.0.0" },
        devDependencies: { jest: "3.0.0" },
        name: "workspace-a",
        version: "whatever",
      },
    },
    {
      projects: [],
      root: {
        dependencies: { album: "2" },
        devDependencies: { jest: "^4.0.0" },
        name: "workspace-b",
        version: "0",
      },
    },
  ];

  const elements = getDependencyElements(
    projects,
    url.searchParams.getAll("p"),
  );

  return { elements };
}) satisfies PageLoad;
