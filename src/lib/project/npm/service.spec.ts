import { beforeEach, describe, expect, test } from "vitest";
import venvPack from "./packuments/venv.json";
import { Service, trimDown } from "./service";

describe("Service", () => {
  let service: Service;
  beforeEach(() => {
    service = new Service();
  });
  test("package getting", async () => {
    expect(service).toBeDefined();
  });

  test("trimDown ^0.2.0", () => {
    const trimmed = trimDown(venvPack, "^0.2.0");
    expect(trimmed.name).toEqual("venv");
    expect(trimmed["dist-tags"]["latest"]).toEqual("1.0.1");
    expect(trimmed.versions).toEqual({ "0.2.0": expect.any(Object) });
    expect(trimmed.keywords).toEqual([
      "environment",
      "variables",
      "angular",
      "cli",
    ]);
  });

  test("trimDown latest", () => {
    expect(trimDown(venvPack, "latest")).toEqual({
      name: "venv",
      description: "Use build-time environment variables in your application",
      "dist-tags": { latest: "1.0.1" },
      versions: {
        "1.0.1": {
          name: "venv",
          version: "1.0.1",
          description:
            "Use build-time environment variables in your application",
          keywords: ["environment", "variables", "angular", "cli"],
          dependencies: {
            ejs: "^2.5.7",
            "fs-extra": "^4.0.1",
            yargs: "^8.0.2",
          },
          devDependencies: expect.anything(),
        },
      },
      keywords: ["environment", "variables", "angular", "cli"],
    });
  });
});
