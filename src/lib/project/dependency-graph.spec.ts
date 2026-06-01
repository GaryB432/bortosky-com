import { beforeEach, describe, expect, test } from "vitest";

import type { GaryProject } from "./project";

import { DependencyGraph } from "./dependency-graph";

/**
 * jest | ^07.0.0 | workspace-a | workspace-a@ws-a | dev
 *                | workspace-a | workspace-a@ws-b | dev
 */

describe("DependencyGraph", () => {
  let dependencyGraph: DependencyGraph;
  beforeEach(() => {
    dependencyGraph = new DependencyGraph();
  });

  test("digestWorkspace", () => {
    const asdf = dependencyGraph.digestWorkspace(subject[0]);
    expect(dependencyGraph.elements()).toMatchSnapshot();
  });
});

const subject: GaryProject[] = [
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
        version: "",
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
