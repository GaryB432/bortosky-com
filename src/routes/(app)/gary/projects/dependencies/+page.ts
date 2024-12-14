import { getDependencyElements } from "$lib/project/cyto";
import type { PageLoad } from "./$types";

export const load = (async ({ parent, url }) => {
  const { projects } = await parent();

  const xprojects = [
    {
      root: {
        name: "workspace-a",
        version: "whatever",
        devDependencies: { jest: "3.0.0" },
        dependencies: { album: "4.0.0" },
      },
      projects: [
        {
          name: "wsa-a",
          type: "module",
          devDependencies: {
            desk: "^1.4.9",
            window: "5.4.2",
            "eslint-plugin-gb": "skipped",
          },
          dependencies: { throttle: "^4.1.2", brake: "~1.4.6" },
        },
        {
          name: "wsa-b",
          type: "commonjs",
          devDependencies: {
            desk: "^1.4.9",
            "eslint-plugin-gb": "skipped",
          },
          dependencies: { throttle: "^4.1.2", brake: "~1.4.6" },
        },
      ],
    },
    {
      root: {
        name: "workspace-b",
        version: "0",
        devDependencies: { jest: "^4.0.0" },
        dependencies: { album: "2" },
      },
      projects: [],
    },
  ];

  const elements = await getDependencyElements(
    projects,
    url.searchParams.getAll("p"),
  );

  return { elements };
}) satisfies PageLoad;
