<script lang="ts">
  import { onMount } from "svelte";

  // 1. Hard-coded points
  const rawPoints = $state([
    { x: -110.44446701644054, y: 18.701513717453203 },
    { x: -110.44380027958378, y: 18.701025112562903 },
    { x: -110.44439180527074, y: 18.700512708393774 },
    { x: -110.44506464033043, y: 18.70101083509708 },
  ]);

  // UI State switches
  let showMarker = $state(true);

  // Animation progress state (0 to 1)
  let progress = $state(0);

  // 2. Automatically derive dynamic bounds and center latitude using Svelte 5 $derived
  let bounds = $derived.by(() => {
    let lonMin = Infinity,
      lonMax = -Infinity;
    let latMin = Infinity,
      latMax = -Infinity;

    rawPoints.forEach((pt) => {
      if (pt.x < lonMin) lonMin = pt.x;
      if (pt.x > lonMax) lonMax = pt.x;
      if (pt.y < latMin) latMin = pt.y;
      if (pt.y > latMax) latMax = pt.y;
    });

    const lonPad = (lonMax - lonMin) * 0.05 || 0.0001;
    const latPad = (latMax - latMin) * 0.05 || 0.0001;

    return {
      lonMin: lonMin - lonPad,
      lonMax: lonMax + lonPad,
      latMin: latMin - latPad,
      latMax: latMax + latPad,
      centerLat: (latMin + latMax) / 2,
    };
  });

  // 3. Project points into 600x600 SVG space using cosine-adjusted scaling
  const svgWidth = 600;
  const svgHeight = 600;

  const projectedPoints = $derived.by(() => {
    const latRad = bounds.centerLat * (Math.PI / 180);
    const cosFactor = Math.cos(latRad);

    const lonSpan = (bounds.lonMax - bounds.lonMin) * cosFactor;
    const latSpan = bounds.latMax - bounds.latMin;

    return rawPoints.map((pt) => {
      const lonDelta = (pt.x - bounds.lonMin) * cosFactor;
      return {
        x: (lonDelta / lonSpan) * svgWidth,
        y: ((bounds.latMax - pt.y) / latSpan) * svgHeight,
      };
    });
  });

  const polygonPointsString = $derived(
    projectedPoints.map((pt) => `${pt.x},${pt.y}`).join(" "),
  );

  // 4. Calculate current animated marker position along the polygon perimeter
  const currentMarkerPos = $derived.by(() => {
    if (projectedPoints.length === 0) return { x: 0, y: 0 };

    const totalPoints = projectedPoints.length;
    const scaledIndex = progress * totalPoints;
    const currentIndex = Math.floor(scaledIndex);
    const nextIndex = (currentIndex + 1) % totalPoints;
    const t = scaledIndex - currentIndex;

    const p1 = projectedPoints[currentIndex];
    const p2 = projectedPoints[nextIndex];

    return {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t,
    };
  });

  // Animation Loop setup
  onMount(() => {
    let animationFrameId: number;

    function loop() {
      progress += 0.004;
      if (progress > 1) progress = 0;
      animationFrameId = requestAnimationFrame(loop);
    }

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  });
</script>

<main class="presentation-container">
  <div class="header">
    <h1>OSC Changes Presentation</h1>
    <p>Standalone Svelte 5 Prototyping Viewport</p>
  </div>

  <!-- Controls Toolbar -->
  <div class="toolbar">
    <label for="marker-toggle"> Show Animation Dot </label>
    <input id="marker-toggle" type="checkbox" bind:checked={showMarker} />
  </div>

  <!-- SVG Map Canvas Container -->
  <div class="canvas-box">
    <svg viewBox="0 0 600 600" width="450" height="450">
      <!-- Base boundary polygon mapping your points -->
      <polygon points={polygonPointsString} class="region-polygon" />

      <!-- Vertex Pinpoints -->
      {#each projectedPoints as pt}
        <circle cx={pt.x} cy={pt.y} r="4" class="vertex-dot" />
      {/each}

      <!-- Toggleable Animated Marker -->
      {#if showMarker}
        <circle
          cx={currentMarkerPos.x}
          cy={currentMarkerPos.y}
          r="7"
          class="animation-marker"
        />
      {/if}
    </svg>
  </div>
</main>

<style>
  .presentation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #0a0a0a;
    color: #f3f4f6;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    padding: 1.5rem;
  }

  .header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .header h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.025em;
  }

  .header p {
    font-size: 0.875rem;
    color: #9ca3af;
    margin-top: 0.25rem;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
    background-color: #171717;
    border: 1px solid #262626;
    padding: 0.625rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .toolbar label {
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    user-select: none;
  }

  .toolbar input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    accent-color: #3b82f6;
  }

  .canvas-box {
    background-color: #171717;
    border: 1px solid #262626;
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  }

  .canvas-box svg {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 0.375rem;
    background-color: #030712;
  }

  .region-polygon {
    fill: rgba(59, 130, 246, 0.15);
    stroke: #3b82f6;
    stroke-width: 2.5px;
    stroke-linejoin: round;
  }

  .vertex-dot {
    fill: #60a5fa;
  }

  .animation-marker {
    fill: #ef4444;
    transition: transform 75ms linear;
    filter: drop-shadow(0px 0px 6px rgba(239, 68, 68, 0.8));
  }
</style>
