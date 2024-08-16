import { beforeEach, describe, expect, test } from "vitest";
import { Service } from "./service";

describe("Service", () => {
  let service: Service;
  beforeEach(() => {
    service = new Service();
  });
  test("package getting", async () => {
    expect(service).toBeDefined();
  });
});
