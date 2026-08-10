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

  // 2. Camera Viewport State (supports smooth transitions)
  const defaultBounds = (() => {
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
  })();

  let currentBounds = $state({ ...defaultBounds });
  let targetBounds = $state({ ...defaultBounds });

  // 3. Derived projection based on current active bounds
  const svgWidth = 600;
  const svgHeight = 600;

  const projectedPoints = $derived.by(() => {
    const latRad = currentBounds.centerLat * (Math.PI / 180);
    const cosFactor = Math.cos(latRad);

    const lonSpan = (currentBounds.lonMax - currentBounds.lonMin) * cosFactor;
    const latSpan = currentBounds.latMax - currentBounds.latMin;

    return rawPoints.map((pt) => {
      const lonDelta = (pt.x - currentBounds.lonMin) * cosFactor;
      return {
        x: (lonDelta / lonSpan) * svgWidth,
        y: ((currentBounds.latMax - pt.y) / latSpan) * svgHeight,
      };
    });
  });

  const polygonPointsString = $derived(
    projectedPoints.map((pt) => `${pt.x},${pt.y}`).join(" "),
  );

  let markerIndex = $state(1);
  const currentMarkerPos = $derived(
    projectedPoints[markerIndex] || { x: 300, y: 300 },
  );

  // 4. Choreography Controller: Smoothly lerp current bounds towards target bounds
  onMount(() => {
    let animId: number;

    function step() {
      const ease = 0.08;

      currentBounds.lonMin +=
        (targetBounds.lonMin - currentBounds.lonMin) * ease;
      currentBounds.lonMax +=
        (targetBounds.lonMax - currentBounds.lonMax) * ease;
      currentBounds.latMin +=
        (targetBounds.latMin - currentBounds.latMin) * ease;
      currentBounds.latMax +=
        (targetBounds.latMax - currentBounds.latMax) * ease;
      currentBounds.centerLat +=
        (targetBounds.centerLat - currentBounds.centerLat) * ease;

      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  });

  // Choreography Actions
  function flyToNECopper() {
    // const nePoint = rawPoints.reduce(
    //   (max, pt) => (pt.x > max.x ? pt : max),
    //   rawPoints[0],
    // );
    const nePoint = rawPoints.at(0)!
    markerIndex = rawPoints.indexOf(nePoint);

    const span = 0.0003;
    targetBounds = {
      lonMin: nePoint.x - span,
      lonMax: nePoint.x + span,
      latMin: nePoint.y - span,
      latMax: nePoint.y + span,
      centerLat: nePoint.y,
    };
  }

  function resetView() {
    targetBounds = { ...defaultBounds };
    markerIndex = 1;
  }
</script>

<main class="presentation-container">
  <div class="header">
    <h1>OSC Changes Presentation</h1>
    <p>Choreographed Viewport Transitions</p>
  </div>

  <!-- Controls Toolbar -->
  <div class="toolbar">
    <button onclick={flyToNECopper} class="btn">Fly-to NE Corner</button>
    <button onclick={resetView} class="btn btn-secondary">Reset View</button>

    <div class="separator"></div>

    <label for="marker-toggle" class="checkbox-label">
      <input id="marker-toggle" type="checkbox" bind:checked={showMarker} />
      Show Change Marker
    </label>
  </div>

  <!-- SVG Map Canvas Container -->
  <div class="canvas-box">
    <svg viewBox="0 0 600 600" width="450" height="450">
      <!-- Base boundary polygon -->
      <polygon points={polygonPointsString} class="region-polygon" />

      <!-- Vertex Pinpoints -->
      {#each projectedPoints as pt}
        <circle cx={pt.x} cy={pt.y} r="4" class="vertex-dot" />
      {/each}

      <!-- Toggleable Target Marker -->
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

  .btn {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.15s ease;
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
    font-weight: 500;
    cursor: pointer;
    user-select: none;
  }

  .checkbox-label input[type="checkbox"] {
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
    transition: all 0.05s linear;
  }

  .vertex-dot {
    fill: #60a5fa;
  }

  .animation-marker {
    fill: #ef4444;
    transition:
      cx 0.05s linear,
      cy 0.05s linear;
    filter: drop-shadow(0px 0px 6px rgba(239, 68, 68, 0.8));
  }
</style>
