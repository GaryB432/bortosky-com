import { Vector } from "$lib/shared/vector";
import type { PageLoad } from "./$types";

export type Corner = { id: string; label: string; loc: Vector };

export const load = (() => {
  const shafts = [{ loc: Vector.create(300, 120) }];
  const corners: Corner[] = [
    { id: "corner-N", label: "N", loc: Vector.create(300, 120) },
    { id: "corner-E", label: "E", loc: Vector.create(480, 300) },
    { id: "corner-S", label: "S", loc: Vector.create(300, 480) },
    { id: "corner-W", label: "W", loc: Vector.create(120, 300) },
  ];

  return { corners, shafts };
}) satisfies PageLoad;
