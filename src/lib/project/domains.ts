/**
 * map of project names to DNS records
 */
export const domains = new Map<string, string[]>([
  ["@human-accomplishment/source", ["humanaccomplishment.com"]],
  [
    "@poemtoday/source",
    [
      "poemtoday.bortosky.app",
      "poemtoday.nabors-place.com",
      "poemtoday-web.vercel.app",
    ],
  ],
  [
    "bortosky-com",
    ["bortosky.com", "www.bortosky.com", "bortosky.app", "www.bortosky.app"],
  ],
  [
    "artboard",
    [
      "artboard.bortosky.app",
      "artboard.nabors-place.com",
      "artboard-nu.vercel.app",
    ],
  ],
  ["compass-pwa", ["compass-pwa.bortosky.app", "compass-pwa.vercel.app"]],
  [
    "package-compare",
    [
      "package-compare.bortosky.app",
      "package-compare.vercel.app",
      "package-compare.nabors-place.com",
    ],
  ],
  [
    "personal-counter",
    [
      "personal-counter.bortosky.app",
      "personal-counter.nabors-place.com",
      "personal-counter.vercel.app",
    ],
  ],
]);
