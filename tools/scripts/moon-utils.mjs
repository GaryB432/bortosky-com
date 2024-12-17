// prettier-ignore
const moons = [
  ["Wolf",       "2025-01-13T17:27:00Z"],
  ["Snow",       "2025-02-12T08:53:00Z"],
  ["Worm",       "2025-03-14T02:55:00Z"],
  ["Pink",       "2025-04-12T20:22:00Z"],
  ["Flower",     "2025-05-12T12:56:00Z"],
  ["Strawberry", "2025-06-11T03:44:00Z"],
  ["Buck",       "2025-07-10T16:37:00Z"],
  ["Sturgeon",   "2025-08-09T03:55:00Z"],
  ["Corn",       "2025-09-07T14:09:00Z"],
  ["Harvest",    "2025-10-06T23:48:00Z"],
  ["Beaver",     "2025-11-05T08:19:00Z"],
  ["Cold",       "2025-12-04T18:14:00Z"]
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

const moonZeroYear = moons[0][1].slice(0, 4);

const stamp = new Date();

[
  "BEGIN:VCALENDAR",
  "PRODID:-//Bortosky//Full Moons v1.0//EN",
  "VERSION:2.0",
  "CALSCALE:GREGORIAN",
  `X-WR-CALNAME:Full Moons ${moonZeroYear}`,
  "X-WR-TIMEZONE:UTC",
].forEach((line) => console.log(line));

for (const [name, md] of moons) {
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
console.log("END:VCALENDAR");
