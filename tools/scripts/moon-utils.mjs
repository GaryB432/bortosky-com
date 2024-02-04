// prettier-ignore
const moons = [
  ["Wolf",       ["2024-01-25T17:54:00Z"]],
  ["Snow",       ["2024-02-24T12:30:00Z"]],
  ["Worm",       ["2024-03-25T08:00:00Z"]],
  ["Pink",       ["2024-04-24T00:49:00Z"]],
  ["Flower",     ["2024-05-23T14:53:00Z"]],
  ["Strawberry", ["2024-06-22T02:08:00Z"]],
  ["Buck",       ["2024-07-21T11:17:00Z"]],
  ["Sturgeon",   ["2024-08-19T19:26:00Z"]],
  ["Corn",       ["2024-09-18T03:34:00Z"]],
  ["Hunter's",   ["2024-10-17T12:26:00Z"]],
  ["Beaver",     ["2024-11-15T21:28:00Z"]],
  ["Cold",       ["2024-12-15T09:02:00Z"]],
];

/**
 * RegExp to test a string for a full ISO 8601 Date
 * Does not do any sort of date validation, only checks if the string is according to the ISO 8601 spec.
 *  YYYY-MM-DDThh:mm:ss
 *  YYYY-MM-DDThh:mm:ssTZD
 *  YYYY-MM-DDThh:mm:ss.sTZD
 * @see: https://www.w3.org/TR/NOTE-datetime
 * @type {RegExp}
 */
const ISO_8601_FULL =
  /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

/**
 *
 * @param {Date} date
 * @returns {string}
 */
function abbreviateDate(date) {
  const iso = date.toISOString();
  const dp = [iso.slice(0, 4), iso.slice(5, 7), iso.slice(8, 10), "T"].join("");
  const tp = [
    iso.slice(11, 13),
    iso.slice(14, 16),
    iso.slice(17, 19),
    "Z",
  ].join("");
  return [dp, tp].join("");
}

/**
 *
 * @param {Date} start the date of the moon
 * @param {string} name the name of the moon
 * @returns {string} the  uid for the vevent
 */
function makeUID(start, name) {
  return [
    encodeURIComponent(
      [start.getUTCFullYear(), name, "MOON"]
        .join("_")
        .replace(/'/, "_")
        .toUpperCase(),
    ),
    "bortosky.com",
  ].join("@");
}

const minute = 60000;
const window = 20 * minute;
const stamp = new Date();

[
  "BEGIN:VCALENDAR",
  "PRODID:-//Bortosky//Full Moons v1.0//EN",
  "VERSION:2.0",
  "CALSCALE:GREGORIAN",
  `X-WR-CALNAME:Full Moons ${stamp.getFullYear()}`,
  "X-WR-TIMEZONE:UTC",
].forEach((line) => console.log(line));

for (const moon of moons) {
  const name = moon[0];
  for (const md of moon[1]) {
    if (!ISO_8601_FULL.test(md)) {
      throw new Error("bad date format");
    }
    const peak = new Date(md).getTime();
    const start = new Date(peak - window / 2);
    const end = new Date(peak + window / 2);
    const eventLines = [
      "BEGIN:VEVENT",
      ["UID", makeUID(start, name)].join(":"),
      ["DTSTAMP", abbreviateDate(stamp)].join(":"),
      ["DTSTART", abbreviateDate(start)].join(":"),
      ["DTEND", abbreviateDate(end)].join(":"),
      `SUMMARY:Full ${name} Moon`,
      "END:VEVENT",
    ];
    eventLines.forEach((line) => console.log(line));
  }
}
console.log("END:VCALENDAR");
