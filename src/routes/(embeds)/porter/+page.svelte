<script lang="ts">
  import osmChangeSet from "$lib/data/porter/changes.osc?raw";
  import { Vector } from "$lib/shared/vector";
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import type { Corner } from "./+page";
  import { themes, type ThemeKey } from "./themes";

  type CornerHeading = {
    angleDeg: number;
    dx: number;
    dy: number;
  };

  type CornerWithHeading = Corner & {
    heading: CornerHeading;
  };

  let { data }: PageProps = $props();

  let diamondPoints = $derived(data.corners.map((c) => c.loc.svgstr).join(" "));

  let activeAnimation = $state<string | null>(null);
  let activeThemeKey = $state<ThemeKey>("engineering");
  let activeTheme = $derived(themes[activeThemeKey]);

  let center = $derived.by(() => {
    const { corners } = data;
    const n = corners.length || 1;
    const sum = corners.reduce(
      (acc, c) => ({ x: acc.x + c.loc.x, y: acc.y + c.loc.y }),
      { x: 0, y: 0 },
    );
    return { x: sum.x / n, y: sum.y / n };
  });

  let cornerHeadings: CornerWithHeading[] = $derived(
    data.corners.map((c) => {
      const vx = c.loc.x - center.x;
      const vy = c.loc.y - center.y;
      const mag = Math.hypot(vx, vy) || 1;
      const ux = vx / mag;
      const uy = vy / mag;
      const dist = activeTheme.cornerLabelShiftPx;
      const heading = {
        angleDeg: Math.atan2(uy, ux) * (180 / Math.PI),
        dx: ux * dist,
        dy: uy * dist,
      };

      return {
        ...c,
        heading,
      };
    }),
  );

  function triggerAnimationA() {
    activeAnimation = null;
    requestAnimationFrame(() => {
      activeAnimation = "a";
    });
  }

  function clearAnimation() {
    activeAnimation = null;
  }

  function setTheme(key: ThemeKey) {
    activeThemeKey = key;
  }

  const animations = [
    {
      name: "a",
      fn: triggerAnimationA,
    },
    {
      name: "b",
      fn: clearAnimation,
    },
  ];

  onMount(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(osmChangeSet, "application/xml");
    const lmnt = doc.documentElement;
    const create_nodes = lmnt.querySelectorAll("osmChange create node");
    // const fdf = Array.from(create_nodes).map(n=> Vector.create(n.getatt))
    for (const node of create_nodes) {
      const lat = parseFloat(node.getAttribute("lat") ?? "0");
      const lon = parseFloat(node.getAttribute("lon") ?? "0");
      const v = Vector.create(lon, lat);
      console.log(v);
    }
  });
</script>

<h1>see you soon</h1>

<section class="vp">
  <svg xmlns="http://w3.org" viewBox="0 0 600 600">
    <defs>
      <!-- Technical Blueprint Grid Background -->
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke={activeTheme.grid}
          stroke-width="0.5"
          opacity={activeTheme.gridMinorOpacity}
        />
        <path
          d="M 200 0 L 0 0 0 200"
          fill="none"
          stroke={activeTheme.grid}
          stroke-width="1"
          opacity={activeTheme.gridMajorOpacity}
        />
      </pattern>

      <!-- UI Glow Effects for Engineering Aesthetic -->
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <!-- Reusable Corner Label Template -->
      <g id="corner-marker">
        <circle
          r="6"
          fill={activeTheme.cornerMarkerFill}
          stroke={activeTheme.cornerMarkerStroke}
          stroke-width="2"
          filter="url(#glow)"
        />
        <circle r="2" fill={activeTheme.cornerMarkerDot} />
      </g>
    </defs>

    <!-- Background Layer -->
    <rect width="100%" height="100%" fill={activeTheme.bg} />
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Center Coordinate Crosshairs -->
    <g
      stroke={activeTheme.crosshair}
      stroke-width="1"
      opacity="0.4"
      stroke-dasharray="4 8"
    >
      <line x1="300" y1="50" x2="300" y2="550" />
      <line x1="50" y1="300" x2="550" y2="300" />
    </g>

    <!-- Main Animation System Group -->
    <!-- Target coordinates for vertices: N(300,120), S(300,480), E(480,300), W(120,300) -->
    <g id="animation-system">
      <!-- Core Geometric Shape -->
      <polygon
        id="diamond-frame"
        points={diamondPoints}
        fill={activeTheme.diamondFill}
        fill-opacity={activeTheme.diamondFillOpacity}
        stroke={activeTheme.diamondStroke}
        stroke-width="3"
        filter="url(#glow)"
      />

      <!-- Corner Node Hardware Markers ARE WE USING THESE -->
      <use href="#corner-marker" x="300" y="120" id="node-n" />
      <use href="#corner-marker" x="480" y="300" id="node-e" />
      <use href="#corner-marker" x="300" y="480" id="node-s" />
      <use href="#corner-marker" x="120" y="300" id="node-w" />

      <!-- Technical Typography (CSS-Styled for Engineering/HUD Vibe) -->
      <g
        font-family="monospace"
        font-weight="bold"
        fill={activeTheme.labelPrimary}
        text-anchor="middle"
        dominant-baseline="central"
        filter="url(#glow)"
      >
        <!-- Corner Labels (Translated relative to node coordinates) -->

        {#each cornerHeadings as c}
          <g transform="translate({c.loc.x}, {c.loc.y})">
            <text
              class:anim-corner-shift={activeAnimation === "a"}
              style="--heading-dx:{c.heading.dx}px; --heading-dy:{c.heading
                .dy}px; --corner-shift-duration:{activeTheme.cornerLabelShiftDurationMs}ms; --corner-shift-easing:{activeTheme.cornerLabelShiftEasing};"
              font-size="22">{c.label}</text
            >
          </g>
        {/each}

        <!-- Edge Labels (Translated to midpoints of diamond segments) -->
        <!-- Midpoint NW (210, 210) -->
        <text
          transform="translate(210, 210) rotate(-45)"
          font-size="14"
          fill={activeTheme.labelSecondary}>FRONT</text
        >

        <!-- Midpoint NE (390, 210) -->
        <text
          transform="translate(390, 210) rotate(45)"
          font-size="14"
          fill={activeTheme.labelSecondary}>BACK</text
        >

        <!-- Midpoint SE (390, 390) -->
        <text
          transform="translate(390, 390) rotate(-45)"
          font-size="14"
          fill={activeTheme.labelTertiary}>TBD-A</text
        >

        <!-- Midpoint SW (210, 390) -->
        <text
          transform="translate(210, 390) rotate(45)"
          font-size="14"
          fill={activeTheme.labelTertiary}>TBD-B</text
        >
      </g>

      <!-- Center Status Display Overlay -->
      <g
        font-family="monospace"
        fill={activeTheme.statusPrimary}
        opacity="0.7"
        text-anchor="middle"
      >
        <text x="300" y="290" font-size="12" letter-spacing="2">The Porter</text
        >
        <text
          x="300"
          y="315"
          font-size="10"
          fill={activeTheme.statusSecondary}
          letter-spacing="1">READY TO ANIMATE</text
        >
      </g>
    </g>
  </svg>
</section>

<section class="controls">
  <strong>Animations</strong>
  {#each animations as anim}
    <button onclick={anim.fn}>{anim.name} </button>
  {/each}

  <strong>Themes</strong>
  <button
    class:selected={activeThemeKey === "engineering"}
    onclick={() => setTheme("engineering")}>engineering</button
  >
  <button
    class:selected={activeThemeKey === "mapsLand"}
    onclick={() => setTheme("mapsLand")}>maps-land</button
  >
</section>

<style>
  section.vp {
    display: flex;
    justify-content: center;
    border: thin solid red;
  }
  svg {
    height: 600px;
  }

  .controls {
    border: thin solid red;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    align-items: center;

    & > button {
      all: revert;
      width: 10ch;
      padding: 0.2rem 0.35rem;
    }

    & > strong {
      margin-inline: 0.3rem 0;
      font-size: 0.85rem;
      letter-spacing: 0.03em;
      opacity: 0.8;
    }

    & > button.selected {
      outline: 2px solid #1f1f1f;
      outline-offset: 1px;
    }
  }

  .anim-corner-shift {
    animation-name: corner-shift;
    animation-duration: var(--corner-shift-duration, 800ms);
    animation-timing-function: var(--corner-shift-easing, ease-out);
    animation-fill-mode: forwards;
  }

  @keyframes corner-shift {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(var(--heading-dx), var(--heading-dy));
    }
  }
</style>
