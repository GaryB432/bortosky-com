import { describe, expect, test } from "vitest";
import { getVCardUrl } from "./vcard";

const c = [
  "N:G. K. Testerton",
  "TEL:12025559876",
  "URL:example.com/gk",
  "EMAIL:gk@example.com",
];

describe("Vcard", () => {
  test("getsVCardUrl", () => {
    const chl = [
      "BEGIN%3AVCARD",
      "VERSION%3A3.0",
      "N%3AG.+K.+Testerton",
      "TEL%3A12025559876",
      "URL%3Aexample.com%2Fgk",
      "EMAIL%3Agk%40example.com",
      "END%3AVCARD",
    ];
    const vs = `https://zxing.org/w/chart?cht=qr&chs=350x350&chld=L&choe=UTF-8&chl=${chl.join(
      "%0A",
    )}`;
    expect(getVCardUrl(c).toString()).toEqual(vs);
  });
});
