import type { PageLoad } from "./$types";
import { Vector } from "$lib/shared/vector";

export const load = (async () => {
  const corners = [
    { label: "N", loc: Vector.create(300, 120) },
    { label: "E", loc: Vector.create(480, 300) },
    { label: "S", loc: Vector.create(300, 480) },
    { label: "W", loc: Vector.create(120, 300) },
  ];

  return { corners };
}) satisfies PageLoad;
