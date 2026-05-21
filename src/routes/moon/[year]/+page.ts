import suncalc from "suncalc";
import type { PageLoad } from "./$types";

type FullMoon = {
  timeISO: string;
  name?: string;
};

export const load = (({ params }) => {
  const year = Number(params.year);
  // Validate year: must be an integer between 1900 and 2100
  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    return {
      fullMoons: [],
      error: `Invalid year: ${params.year}. Please enter a year between 1900 and 2100.`,
    };
  }

  const fullMoons = findFullMoons(year).map<FullMoon>((d, _, ds) => {
    const name = likelyMoonName(d, ds);
    return {
      timeISO: d.toISOString(),
      name,
    };
  });

  return { fullMoons };
}) satisfies PageLoad;

function findFullMoons(year: number): Date[] {
  const fullMoons: Date[] = [];
  let date = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year + 1, 0, 1, 0, 0, 0));
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000; // ms

  while (date < end) {
    // Rough guess for next full moon
    const guess = new Date(date.getTime() + synodicMonth / 2);
    // Binary search for phase closest to 0.5 (full moon)
    let min = new Date(guess.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days before
    let max = new Date(guess.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days after
    let best: Date = guess;
    let bestDelta = 1;

    for (let i = 0; i < 20; i++) {
      // 20 iterations is plenty
      const mid = new Date((min.getTime() + max.getTime()) / 2);
      const phase = suncalc.getMoonIllumination(mid).phase;
      const delta = Math.abs(phase - 0.5);
      if (delta < bestDelta) {
        best = mid;
        bestDelta = delta;
      }
      if (phase < 0.5) {
        min = mid;
      } else {
        max = mid;
      }
    }

    // Only add if in this year
    if (best.getUTCFullYear() === year) {
      fullMoons.push(best);
    }
    // Move to next full moon
    date = new Date(best.getTime() + synodicMonth * 0.9); // step forward, avoid duplicates
  }
  return fullMoons;
}

function likelyMoonName(d: Date, ds: Date[]): string {
  const moons = [
    "Wolf",
    "Snow",
    "Worm",
    "Pink",
    "Flower",
    "Strawberry",
    "Buck",
    "Sturgeon",
    "Corn",
    "Harvest",
    "Beaver",
    "Cold",
  ];

  return `${d.getMonth() + 1} moon`;
}
