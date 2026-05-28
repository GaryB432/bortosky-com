<script lang="ts">
  import { onMount } from "svelte";
  import { getQRPoints } from "./qr";
  import { ParticleEngine } from "./engine";
  import { resolve } from "$app/paths";

  const STAGE_SIZE = 320;
  let canvas: HTMLCanvasElement | undefined = $state();
  let stageFrame: HTMLDivElement | undefined = $state();
  let engine: ParticleEngine | undefined = $state();
  let currentPattern = $state("qr");
  const patterns = ["qr", "random", "settle", "hourglass"] as const;

  let innerWidth = $state(0);
  let innerHeight = $state(0);
  let stageX = 0;
  let stageY = 0;

  let touchStartX = 0;
  let touchStartTime = 0;
  let choreographyTimeout: ReturnType<typeof setTimeout>;

  function handlePointerDown(e: PointerEvent) {
    touchStartX = e.clientX;
    touchStartTime = performance.now();
  }

  function handlePointerUp(e: PointerEvent) {
    const deltaX = e.clientX - touchStartX;
    const elapsed = performance.now() - touchStartTime;
    const velocity = Math.abs(deltaX / elapsed);

    // Flick left
    if (deltaX < -50 && (velocity > 0.5 || deltaX < -100)) {
      nextPattern();
    } else if (Math.abs(deltaX) < 10) {
      // It was a tap
      nextPattern();
    }
  }

  function setPattern(p: (typeof patterns)[number]) {
    currentPattern = p;
    runChoreography();
  }

  function nextPattern() {
    const idx = patterns.indexOf(currentPattern as any);
    currentPattern = patterns[(idx + 1) % patterns.length];
    runChoreography();
  }

  function runChoreography() {
    if (!engine) return;
    clearTimeout(choreographyTimeout);

    // Phase 1: Wide explosion reset.
    engine.explosion();

    // Phase 2: Pause targets span the whole screen area.
    const pauseTargets = Array.from(
      { length: engine.particles.length },
      () => ({
        x: Math.random() * innerWidth - stageX,
        y: Math.random() * innerHeight - stageY,
      }),
    );
    engine.setTargets(
      pauseTargets,
      "pause",
      currentPattern,
      performance.now(),
      stageY,
    );

    // Phase 3: Smoothly settle into final pattern and stop.
    choreographyTimeout = setTimeout(() => {
      if (!engine) return;
      const finalTargets = getFinalTargets(currentPattern);
      engine.setTargets(
        finalTargets,
        "finalize",
        currentPattern,
        performance.now(),
        stageY,
      );
    }, 1200);
  }

  function updateStageOffset() {
    if (!canvas || !stageFrame) return;
    const canvasRect = canvas.getBoundingClientRect();
    const stageRect = stageFrame.getBoundingClientRect();
    stageX = stageRect.left - canvasRect.left;
    stageY = stageRect.top - canvasRect.top;
  }

  function getFinalTargets(pattern: string) {
    if (!engine) return [];
    const count = engine.particles.length;
    const url = resolve("/gary/contact/download");

    if (pattern === "qr") {
      return getQRPoints(url, STAGE_SIZE).points;
    } else if (pattern === "random") {
      return Array.from({ length: count }, () => ({
        x: Math.random() * STAGE_SIZE,
        y: Math.random() * STAGE_SIZE,
      }));
    } else if (pattern === "settle") {
      return Array.from({ length: count }, () => ({
        x: Math.random() * STAGE_SIZE,
        y: STAGE_SIZE - Math.random() * (STAGE_SIZE * 0.05),
      }));
    } else if (pattern === "hourglass") {
      return getPileTargets(count, STAGE_SIZE);
    }
    return [];
  }

  function getPileTargets(count: number, stageSize: number) {
    const points: { x: number; y: number }[] = [];
    const pSize = 4;
    let currentParticle = 0;
    let row = 0;

    while (currentParticle < count) {
      let particlesInRow = row + 1;
      if (currentParticle + particlesInRow > count) {
        particlesInRow = count - currentParticle;
      }
      const rowWidth = particlesInRow * pSize;
      const startX = (stageSize - rowWidth) / 2;
      for (let i = 0; i < particlesInRow; i++) {
        points.push({
          x: startX + i * pSize + pSize / 2,
          y: row * pSize + pSize / 2,
        });
        currentParticle++;
      }
      row++;
    }
    const totalHeight = row * pSize;
    const yShift = stageSize - totalHeight;
    points.forEach((p) => (p.y += yShift));
    return points;
  }

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    engine = new ParticleEngine(STAGE_SIZE);

    const url = resolve("/gary/contact/download");
    const { points, cellSize } = getQRPoints(url, STAGE_SIZE);

    engine.init(points.length, cellSize);
    updateStageOffset();

    // Seed particles in the center of the current stage before first animation.
    for (const particle of engine.particles) {
      particle.x = STAGE_SIZE / 2;
      particle.y = STAGE_SIZE / 2;
      particle.tx = STAGE_SIZE / 2;
      particle.ty = STAGE_SIZE / 2;
    }

    runChoreography();

    let frame: number;
    function loop(time: number) {
      if (engine && ctx) {
        updateStageOffset();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        ctx.save();
        ctx.translate(stageX, stageY);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, STAGE_SIZE, STAGE_SIZE);
        engine.update(time);
        engine.draw(ctx);
        ctx.restore();
      }
      frame = requestAnimationFrame(loop);
    }
    loop(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(choreographyTimeout);
    };
  });
</script>

<svelte:head>
  <title>Contact Gary</title>
</svelte:head>

<svelte:window bind:innerWidth bind:innerHeight />

<main class="scene" class:is-non-qr={currentPattern !== "qr"}>
  <canvas
    class="scene-canvas"
    bind:this={canvas}
    width={innerWidth}
    height={innerHeight}
  ></canvas>

  <div class="hud">
    <div
      bind:this={stageFrame}
      class="stage-frame"
      onpointerdown={handlePointerDown}
      onpointerup={handlePointerUp}
      aria-label="Contact QR Code. Flick or tap to change pattern."
      role="button"
      tabindex="0"
    ></div>

    <div class="copy">
      <h1>Snap To Add Gary</h1>
      <p>Confetti settles into a live QR. Flick to reshuffle.</p>

      <a
        class="download"
        href="/gary/contact/download"
        target="_blank"
        rel="noreferrer">Add to Contacts</a
      >
    </div>

    <div class="pattern-row" role="group" aria-label="Particle pattern">
      {#each patterns as pattern}
        <button
          class="chip"
          class:active={currentPattern === pattern}
          type="button"
          onclick={() => setPattern(pattern)}
        >
          {pattern}
        </button>
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #fff;
    font-family:
      "Montserrat",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      sans-serif;
  }

  .scene {
    position: relative;
    min-height: 100vh;
    background: radial-gradient(circle at center, #ffffff 0%, #f4f4f4 100%);
    padding: clamp(0.75rem, 2vh, 1.5rem) 1rem
      max(0.75rem, env(safe-area-inset-bottom));
    display: flex;
    justify-content: center;
    align-items: stretch;
    transition: background 1.2s ease;

    &.is-non-qr {
      background: radial-gradient(circle at center, #fff6f6 0%, #ffe8e8 100%);
    }
  }

  .scene-canvas {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    display: block;
  }

  .hud {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    width: min(100%, 420px);
    min-height: calc(100dvh - clamp(2.75rem, 7vh, 4.5rem));
    margin: 0 auto;
  }

  .stage-frame {
    width: min(88vw, 340px);
    height: min(88vw, 340px);
    margin-top: clamp(1.25rem, 10vh, 5rem);
    cursor: pointer;
    outline: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    border-radius: 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: transparent;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    transition: transform 0.2s ease;

    &:active {
      transform: scale(0.98);
    }
  }

  .copy {
    margin-top: auto;
    text-align: center;
    color: #333;
    max-width: 320px;
    animation: rise-in 0.6s ease-out both;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 900;
  }

  p {
    margin: 0.5rem 0 1rem;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .download {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    padding: 0 1.5rem;
    border-radius: 999px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    font-weight: 800;
    background: #000;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:active {
      transform: translateY(1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  }

  .pattern-row {
    display: flex;
    gap: 0.5rem;
    margin: 0 1rem max(1.75rem, calc(env(safe-area-inset-bottom) + 0.75rem));
    padding: 0.4rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    animation: rise-in 0.8s ease-out both;
  }

  .chip {
    border: 1px solid transparent;
    background: transparent;
    color: #666;
    border-radius: 999px;
    height: 2rem;
    padding: 0 1rem;
    font-weight: 700;
    font-size: 0.7rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: #000;
    }
  }

  .chip.active {
    color: #000;
    background: #fff;
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  @keyframes rise-in {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
