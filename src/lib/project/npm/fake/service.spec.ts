import type { Packument } from "$lib/project/npm";
import { beforeEach, describe, expect, test } from "vitest";
import { FakeService } from "./service";

describe("Fake Service", () => {
  let service: FakeService;
  beforeEach(() => {
    service = new FakeService();
  });
  test("package getting", async () => {
    const pack = await service.getPackage("house");
    expect(pack?.keywords).toEqual(["DO-NOT-USE", "ROOT-HOUSE-PROJECT"]);
  });
});
