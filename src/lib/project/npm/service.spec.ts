import { beforeEach, describe, expect, test } from "vitest";
import venvPack from "./packuments/venv.json";
import { Service } from "./service";

async function mockFetcher(
  input: string | URL | Request,
  init?: RequestInit,
): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const url = typeof input === "string" ? input : input.toString();
    setTimeout(() => {
      switch (url) {
        case "https://registry.npmjs.org/venv": {
          if (init) {
            const acceptHeader = new Headers(init.headers).get("Accept");
            if (
              acceptHeader ===
              "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*"
            ) {
              resolve(
                new Response(JSON.stringify(venvPack), {
                  status: 200,
                }),
              );
            } else {
              reject("missing Accept header");
            }
          }
          break;
        }
        case "https://registry.npmjs.org/venv/1.0.1": {
          if (init) {
            reject("version level requests should not have initializer");
          } else {
            resolve(
              new Response(JSON.stringify(venvPack.versions["1.0.1"]), {
                status: 200,
              }),
            );
          }
          break;
        }
        default: {
          resolve(
            new Response(JSON.stringify({ error: "not venv, not found" }), {
              status: 404,
              statusText: "not found",
            }),
          );
        }
      }
    }, 100);
  });
}

describe("Service", () => {
  let service: Service;
  beforeEach(() => {
    service = new Service(mockFetcher);
  });
  test("package getting", async () => {
    expect(service).toBeDefined();
  });

  test("getPackage", async () => {
    const venv = await service.getPackument("venv", "latest");
    expect(venv?.["dist-tags"]).toEqual({ latest: "1.0.1", _gb: "1.0.1" });
    expect(venv?.versions["1.0.1"].keywords).toEqual([
      // expect(venv?.keywords).toEqual([
      "environment",
      "variables",
      "angular",
      "cli",
    ]);
  });

  // test("trimDown ^0.2.0", () => {
  //   const trimmed = trimDown(venvPack, "^0.2.0");
  //   expect(trimmed.name).toEqual("venv");
  //   expect(trimmed["dist-tags"]["latest"]).toEqual("1.0.1");
  //   expect(trimmed.versions).toEqual({ "0.2.0": expect.any(Object) });
  //   expect(trimmed.keywords).toEqual([
  //     "environment",
  //     "variables",
  //     "angular",
  //     "cli",
  //   ]);
  // });

  // test("trimDown latest", () => {
  //   expect(trimDown(venvPack, "latest")).toEqual({
  //     name: "venv",
  //     description: "Use build-time environment variables in your application",
  //     "dist-tags": { latest: "1.0.1" },
  //     versions: {
  //       "1.0.1": {
  //         name: "venv",
  //         version: "1.0.1",
  //         description:
  //           "Use build-time environment variables in your application",
  //         keywords: ["environment", "variables", "angular", "cli"],
  //         dependencies: {
  //           ejs: "^2.5.7",
  //           "fs-extra": "^4.0.1",
  //           yargs: "^8.0.2",
  //         },
  //         devDependencies: expect.anything(),
  //       },
  //     },
  //     keywords: ["environment", "variables", "angular", "cli"],
  //   });
  // });
});
