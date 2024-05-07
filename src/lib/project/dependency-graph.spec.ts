import { beforeEach, describe, expect, test } from "vitest";
import { DependencyGraph } from "./dependency-graph";
import type { GaryProject } from "./project";

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
    root: {
      name: "workspace-a",
      version: "whatever",
      devDependencies: { jest: "3.0.0" },
      dependencies: { album: "4.0.0" },
    },
    projects: [
      {
        name: "wsa-a",
        version: "",
        type: "module",
        devDependencies: {
          desk: "^1.4.9",
          window: "5.4.2",
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
