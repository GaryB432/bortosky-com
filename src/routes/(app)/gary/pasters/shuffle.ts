/**
 * Shuffle Algorithms — Three Variants
 */

// ─────────────────────────────────────────────────────────────
// 3. Lazy shuffle generator — the coolest variant 🎲
//    Yields one random element at a time, performing swaps
//    only as needed. Perfect when you don't need ALL n items —
//    e.g. "pick 5 random words" costs only 5 swaps, not 100.
//
//    Usage:
//      const gen = lazyShuffleGen(myArray);
//      const [first] = gen;               // 1 swap
//      const picks = [...take(gen, 5)];   // 5 swaps
//      const all   = [...gen];            // full shuffle, n swaps
// ─────────────────────────────────────────────────────────────
export function* lazyShuffleGen<T>(arr: T[]): Generator<T> {
  const a = [...arr];
  let remaining = a.length;

  while (remaining > 0) {
    const i = Math.floor(Math.random() * remaining);
    remaining--;
    [a[i], a[remaining]] = [a[remaining], a[i]];
    yield a[remaining];
  }
}

// ─────────────────────────────────────────────────────────────
// 1. Classic Fisher-Yates (in-place, full pass)
//    O(n) time, O(1) space — the baseline.
// ─────────────────────────────────────────────────────────────
export function shuffleFY<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────────────────────
// 2. Half-pass Fisher-Yates — minimum swaps variant
//    Only iterates n/2 positions. Each swap is "real" (i !== j),
//    so no wasted identity swaps. Statistically equivalent to
//    full FY for uniform distribution.
//    O(n/2) swaps, O(n) space (copy).
// ─────────────────────────────────────────────────────────────
export function shuffleHalf<T>(arr: T[]): T[] {
  const a = [...arr];
  const mid = Math.ceil(a.length / 2);

  for (let i = a.length - 1; i >= mid; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (i !== j) [a[i], a[j]] = [a[j], a[i]]; // skip identity swaps
  }
  return a;
}

// Helper: take the first n items from any iterator
export function take<T>(iter: Iterable<T>, n: number): T[] {
  const result: T[] = [];
  for (const item of iter) {
    result.push(item);
    if (result.length >= n) break;
  }
  return result;
}

// ─────────────────────────────────────────────────────────────
// Usage examples
// ─────────────────────────────────────────────────────────────

// import { adjectives, nouns } from "./wordArrays";

// // Full shuffle
// const shuffledAdj = shuffleFY(adjectives);

// // Half-pass (minimum swaps)
// const shuffledNouns = shuffleHalf(nouns);

// // Lazy: pick 5 random adjectives — only 5 swaps ever happen
// const fiveAdj = take(lazyShuffleGen(adjectives), 5);

// // Lazy: generate random phrases until you find one you like
// const phrases = lazyShuffleGen(adjectives);
// for (const adj of phrases) {
//   const noun = take(lazyShuffleGen(nouns), 1)[0];
//   console.log(`${adj} ${noun}`);
//   // break whenever you want — unused items are never touched
// }
