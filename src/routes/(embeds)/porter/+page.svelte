<script lang="ts">
  import { onMount } from "svelte";

  // 1. Hard-coded points
  const rawPoints = [
    { x: -110.44446701644054, y: 18.701513717453203 },
    { x: -110.44380027958378, y: 18.701025112562903 },
    { x: -110.44439180527074, y: 18.700512708393774 },
    { x: -110.44506464033043, y: 18.70101083509708 },
  ];

  let showMarker = $state(true);

  // 2. Project points ONCE into a fixed 600x600 local pixel space
  const centroid = {
    x: rawPoints.reduce((sum, pt) => sum + pt.x, 0) / rawPoints.length,
    y: rawPoints.reduce((sum, pt) => sum + pt.y, 0) / rawPoints.length,
  };
  const centerLatRad = centroid.y * (Math.PI / 180);
  const cosFactor = Math.cos(centerLatRad);

  // Static 5-mile / building pixel boundaries in our base space
  const baseSpan = 0.072; // 5-mile span
  const baseLonMin = centroid.x - baseSpan;
  const baseLonMax = centroid.x + baseSpan;
  const baseLatMin = centroid.y - baseSpan;
  const baseLatMax = centroid.y + baseSpan;

  const svgWidth = 600;
  const svgHeight = 600;

  const staticProjectedPoints = rawPoints.map((pt) => {
    const lonDelta = (pt.x - baseLonMin) * cosFactor;
    const lonSpan = (baseLonMax - baseLonMin) * cosFactor;
    const latSpan = baseLatMax - baseLatMin;
    return {
      x: (lonDelta / lonSpan) * svgWidth,
      y: ((baseLatMax - pt.y) / latSpan) * svgHeight,
    };
  });

  const polygonPointsString = staticProjectedPoints
    .map((pt) => `${pt.x},${pt.y}`)
    .join(" ");
  let markerIndex = $state(1);
  const currentMarkerPos = $derived(staticProjectedPoints[markerIndex]);

  // 3. ViewBox State (x, y, width, height)
  // We animate these four numbers instead of recalculating the points!
  let vbX = $state(0);
  let vbY = $state(0);
  let vbWidth = $state(600);
  let vbHeight = $state(600);

  // Target ViewBox values for choreography
  let targetVb = { x: 0, y: 0, width: 600, height: 600 };

  // Computed string for the SVG viewBox attribute
  const viewBoxString = $derived(`${vbX} ${vbY} ${vbWidth} ${vbHeight}`);

  // 4. Smooth Lerp Loop for ViewBox Animation
  onMount(() => {
    let animId: number;

    function step() {
      const ease = 0.08;
      vbX += (targetVb.x - vbX) * ease;
      vbY += (targetVb.y - vbY) * ease;
      vbWidth += (targetVb.width - vbWidth) * ease;
      vbHeight += (targetVb.height - vbHeight) * ease;

      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  });

  // Choreography Actions modifying the ViewBox window
  function flyToBuilding() {
    // Find min/max in our already-projected static pixel space
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

    const padding = 50;
    targetVb = {
      x: minX - padding,
      y: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2,
    };
  }

  function resetToFiveMileOverview() {
    targetVb = { x: 0, y: 0, width: 600, height: 600 };
  }
</script>

<main class="presentation-container">
  <div class="header">
    <h1>OSC Changes Presentation</h1>
    <p>True SVG viewBox Panning & Zooming</p>
  </div>

  <div class="toolbar">
    <button onclick={flyToBuilding} class="btn">Fly-to Building</button>
    <button onclick={resetToFiveMileOverview} class="btn btn-secondary"
      >Reset (5-Mile Overview)</button
    >

    <div class="separator"></div>

    <label for="marker-toggle" class="checkbox-label">
      <input id="marker-toggle" type="checkbox" bind:checked={showMarker} />
      Show Change Marker
    </label>
  </div>

  <div class="canvas-box">
    <!-- Notice viewBox is now dynamic, while the points inside remain completely static -->
    <svg viewBox={viewBoxString} width="450" height="450">
      <polygon points={polygonPointsString} class="region-polygon" />

      {#each staticProjectedPoints as pt}
        <circle cx={pt.x} cy={pt.y} r="4" class="vertex-dot" />
      {/each}

      {#if showMarker}
        <circle
          cx={currentMarkerPos.x}
          cy={currentMarkerPos.y}
          r="8"
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
  .animation-marker {
    fill: #ef4444;
    filter: drop-shadow(0px 0px 6px rgba(239, 68, 68, 0.8));
  }
</style>
