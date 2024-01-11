import { rand } from "./prng";

describe("Prng", () => {
  test("rands", () => {
    for (let i = 0; i < 100; i++) {
      rand();
    }
    expect(rand()).toBeCloseTo(0.75801182, 8);
  });
});
