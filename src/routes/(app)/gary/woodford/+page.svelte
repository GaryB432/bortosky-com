<script lang="ts">
  type Vector = { x: number; y: number };

  interface BPost {
    point: Vector;
    height: number;
  }

  interface BRect {
    id: string;
    position: Vector;
    size: Vector;
  }

  interface BSegment {
    from: Vector;
    to: Vector;
  }

  interface BArea {
    id: string;
    segments: BSegment[];
  }

  const posts: BPost[] = [
    { point: { x: 0, y: 0 }, height: 0 },
    { point: { x: 120, y: 0 }, height: 0 },
    { point: { x: 120, y: 46 }, height: 0 },
  ];

  const areas: BArea[] = [
    {
      id: "living",
      segments: [
        { from: { x: 0, y: 0 }, to: { x: 120, y: 0 } },
        { from: { x: 120, y: 0 }, to: { x: 120, y: 0 } },
        { from: { x: 120, y: 0 }, to: { x: 120, y: 0 } },
      ],
    },
    { id: "kitchen", segments: [] },
    { id: "laundry", segments: [] },
    { id: "utility", segments: [] },
    { id: "pantry", segments: [] },
    { id: "closet", segments: [] },
    { id: "bath", segments: [] },
    { id: "tub", segments: [] },
    { id: "bedroom", segments: [] },
    { id: "balcony", segments: [] },
  ];

  function lengthString(inches: number): string {
    if (inches < 0) return `-${lengthString(-inches)}`;
    const feet = Math.floor(inches / 12);
    const rem = Math.round(inches % 12);
    if (feet === 0) return `${rem}"`;
    if (rem === 0) return `${feet}'`;
    return `${feet}'${rem}"`;
  }

  const rects: BRect[] = $state([
    {
      id: "bed1",
      position: { x: 120, y: 46 },
      size: { x: 106, y: 120 },
    },
    {
      id: "balcony",
      position: { x: 120, y: 0 },
      size: { x: 106, y: 45 },
    },
    {
      id: "closet",
      position: { x: 120, y: 168 },
      size: { x: 48, y: 63 },
    },
    {
      id: "bath",
      position: { x: 171, y: 168 },
      size: { x: 56, y: 87 },
    },
    {
      id: "tub",
      position: { x: 171, y: 257 },
      size: { x: 56, y: 36 },
    },
    {
      id: "living",
      position: { x: 0, y: 0 },
      size: { x: 120, y: 120 },
    },
    {
      id: "kitchen",
      position: { x: 0, y: 120 },
      size: { x: 120, y: 134 },
    },
    {
      id: "lanudry",
      position: { x: 0, y: 257 },
      size: { x: 60, y: 36 },
    },
    {
      id: "utility",
      position: { x: 60, y: 257 },
      size: { x: 32, y: 36 },
    },
    {
      id: "pantry",
      position: { x: 68, y: 226 },
      size: { x: 24, y: 26 },
    },
  ]);

  let svgd: SVGSVGElement | undefined = $state();
</script>

<h1>Welcome to SvelteKit</h1>

<svg bind:this={svgd} viewBox="0 0 240 303" xmlns="http://www.w3.org/2000/svg">
  <g id="layer1">
    {#each rects as r}
      <rect
        x={r.position.x}
        y={r.position.y}
        width={r.size.x}
        height={r.size.y}
      />
      <text
        x={r.position.x + 2}
        y={r.position.y + 4}
        font-size="5"
        font-family="sans-serif"
        fill="black"
      >
        <tspan x={r.position.x + 2} dy="0">{r.id}</tspan>
        <tspan x={r.position.x + 2} dy="5"
          >x: {r.position.x}, y: {r.position.y}</tspan
        >
        <tspan x={r.position.x + 2} dy="5"
          >{lengthString(r.size.x)}x{lengthString(r.size.y)}</tspan
        >
      </text>
    {/each}
  </g>
</svg>

<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>

<style>
  svg {
    border: thin solid silver;
    max-height: 80vh;
  }

  rect {
    fill: white;
    stroke-width: 1px;
    stroke: lime;
  }
</style>
