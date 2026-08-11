<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // 1. Hard-coded building polygon points
  const rawPoints = [
    { x: -90.44446701644054, y: 38.701513717453203 },
    { x: -90.44380027958378, y: 38.701025112562903 },
    { x: -90.44439180527074, y: 38.700512708393774 },
    { x: -90.44506464033043, y: 38.70101083509708 },
  ];

  let showMarker = $state(true);

  // 2. Project points ONCE into a fixed 600x600 master coordinate space (5-mile domain)
  const centroid = {
    x: rawPoints.reduce((sum, pt) => sum + pt.x, 0) / rawPoints.length,
    y: rawPoints.reduce((sum, pt) => sum + pt.y, 0) / rawPoints.length,
  };
  const centerLatRad = centroid.y * (Math.PI / 180);
  const cosFactor = Math.cos(centerLatRad);

  const overviewSpan = 0.072; // ~5-mile domain span reference
  const domainLonMin = centroid.x - overviewSpan;
  const domainLonMax = centroid.x + overviewSpan;
  const domainLatMin = centroid.y - overviewSpan;
  const domainLatMax = centroid.y + overviewSpan;

  const svgWidth = 600;
  const svgHeight = 600;

  const staticProjectedPoints = rawPoints.map((pt) => {
    const lonDelta = (pt.x - domainLonMin) * cosFactor;
    const lonSpan = (domainLonMax - domainLonMin) * cosFactor;
    const latSpan = domainLatMax - domainLatMin;
    return {
      x: (lonDelta / lonSpan) * svgWidth,
      y: ((domainLatMax - pt.y) / latSpan) * svgHeight,
    };
  });

  const polygonPointsString = staticProjectedPoints
    .map((pt) => `${pt.x},${pt.y}`)
    .join(" ");
  // const currentMarkerPos = staticProjectedPoints[1]; // NE corner marker anchor

  // 3. Define Tweened ViewBox Store
  const overviewVb = { x: 0, y: 0, width: 600, height: 600 };

  const vb = tweened(overviewVb, {
    duration: 800,
    easing: cubicOut,
  });

  const viewBoxString = $derived(
    `${$vb.x} ${$vb.y} ${$vb.width} ${$vb.height}`,
  );

  // 4. Choreography Actions
  function flyToBuilding() {
    let minX = Infinity,
      maxX = -Infinity;
    let minY = Infinity,
      maxY = -Infinity;

    staticProjectedPoints.forEach((pt) => {
      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
    });

    // Balanced padding so the building is nicely framed and legible
    const padding = 35;
    vb.set({
      x: minX - padding,
      y: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2,
    });
  }

  function resetToOverview() {
    vb.set(overviewVb);
  }
</script>

<main class="presentation-container">
  <div class="header">
    <h1>OSC Changes Presentation</h1>
    <p>Tweened Viewport Animations</p>
  </div>

  <div class="toolbar">
    <button onclick={flyToBuilding} class="btn">Fly to Building</button>
    <button onclick={resetToOverview} class="btn btn-secondary"
      >Reset to 5-Mile Overview</button
    >

    <div class="separator"></div>

    <label for="marker-toggle" class="checkbox-label">
      <input id="marker-toggle" type="checkbox" bind:checked={showMarker} />
      Show Change Marker
    </label>
  </div>

  <div class="canvas-box">
    <svg viewBox={viewBoxString} width="450" height="450">
      <!-- 5-Mile Master Frame Reference -->
      <rect
        x="0"
        y="0"
        width="600"
        height="600"
        fill="none"
        stroke="#262626"
        stroke-width="2"
        stroke-dasharray="8 8"
      />

      <!-- Building Footprint -->
      <polygon points={polygonPointsString} class="region-polygon" />

      <!-- Building Vertices -->
      {#each staticProjectedPoints as pt}
        <circle cx={pt.x} cy={pt.y} r="4" class="vertex-dot" />
      {/each}

      <!-- Change Marker
      {#if showMarker}
        <circle
          cx={currentMarkerPos.x}
          cy={currentMarkerPos.y}
          r="8"
          class="animation-marker"
        />
      {/if} -->
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
    margin-bottom: 1.25rem;
  }
  .header h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
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
  }
  .btn {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #1d4ed8;
  }
  .btn-secondary {
    background-color: #374151;
  }
  .btn-secondary:hover {
    background-color: #4b5563;
  }
  .separator {
    width: 1px;
    height: 20px;
    background-color: #374151;
    margin: 0 0.25rem;
  }
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    cursor: pointer;
    user-select: none;
  }
  .canvas-box {
    background-color: #171717;
    border: 1px solid #262626;
    padding: 1rem;
    border-radius: 0.75rem;
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
 
</style>
