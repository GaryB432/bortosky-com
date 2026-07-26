<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  let diamondPoints = $derived(data.corners.map((c) => c.loc.svgstr).join(" "));

  let activeAnimation = $state<string | null>(null);

  let center = $derived.by(() => {
    const { corners } = data;
    const n = corners.length || 1;
    const sum = corners.reduce(
      (acc, c) => ({ x: acc.x + c.loc.x, y: acc.y + c.loc.y }),
      { x: 0, y: 0 },
    );
    return { x: sum.x / n, y: sum.y / n };
  });

  let cornerHeadings = $derived.by(() =>
    data.corners.map((c) => {
      const vx = c.loc.x - center.x;
      const vy = c.loc.y - center.y;
      const mag = Math.hypot(vx, vy) || 1;
      const ux = vx / mag;
      const uy = vy / mag;
      const dist = 50;
      return {
        ...c,
        heading: {
          angleDeg: Math.atan2(uy, ux) * (180 / Math.PI),
          dx: ux * dist,
          dy: uy * dist,
        },
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
          stroke="#003366"
          stroke-width="0.5"
          opacity="0.3"
        />
        <path
          d="M 200 0 L 0 0 0 200"
          fill="none"
          stroke="#003366"
          stroke-width="1"
          opacity="0.5"
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
          fill="#000"
          stroke="#00ffcc"
          stroke-width="2"
          filter="url(#glow)"
        />
        <circle r="2" fill="#00ffcc" />
      </g>
    </defs>

    <!-- Background Layer -->
    <rect width="100%" height="100%" fill="#0a1128" />
    <rect width="100%" height="100%" fill="url(#grid)" />

    <!-- Center Coordinate Crosshairs -->
    <g stroke="#003366" stroke-width="1" opacity="0.4" stroke-dasharray="4 8">
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
        fill="#00ffcc"
        fill-opacity="0.03"
        stroke="#00ffcc"
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
        fill="#00ffcc"
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
                .dy}px;"
              font-size="22">{c.label}</text
            >
          </g>
        {/each}

        <!-- Edge Labels (Translated to midpoints of diamond segments) -->
        <!-- Midpoint NW (210, 210) -->
        <text
          transform="translate(210, 210) rotate(-45)"
          font-size="14"
          fill="#88ffea">FRONT</text
        >

        <!-- Midpoint NE (390, 210) -->
        <text
          transform="translate(390, 210) rotate(45)"
          font-size="14"
          fill="#88ffea">BACK</text
        >

        <!-- Midpoint SE (390, 390) -->
        <text
          transform="translate(390, 390) rotate(-45)"
          font-size="14"
          fill="#00aaff">TBD-A</text
        >

        <!-- Midpoint SW (210, 390) -->
        <text
          transform="translate(210, 390) rotate(45)"
          font-size="14"
          fill="#00aaff">TBD-B</text
        >
      </g>

      <!-- Center Status Display Overlay -->
      <g
        font-family="monospace"
        fill="#00aaff"
        opacity="0.7"
        text-anchor="middle"
      >
        <text x="300" y="290" font-size="12" letter-spacing="2">The Porter</text
        >
        <text x="300" y="315" font-size="10" fill="#00ffcc" letter-spacing="1"
          >READY TO ANIMATE</text
        >
      </g>
    </g>
  </svg>
</section>

<section class="controls">
  {#each animations as anim}
    <button onclick={anim.fn}>{anim.name} </button>
  {/each}
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

    & > button {
      all: revert;
      margin: 2px;
      width: 10ch;
    }
  }

  .anim-corner-shift {
    animation: corner-shift 800ms ease-out forwards;
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
