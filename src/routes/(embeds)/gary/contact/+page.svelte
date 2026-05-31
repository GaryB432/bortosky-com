<script lang="ts">
  import { resolve } from "$app/paths";
  import { generate } from "lean-qr";
  import { onMount } from "svelte";

  const STAGE_SIZE = 320;

  let ctx: CanvasRenderingContext2D | null = $state(null);

  const url = $state(resolve("/gary/contact/download"));
  const qr = $derived(generate(url));

  let moduleEntities: ModuleEntity[] = [];

  let isScanned = $state(false);

  let canvasElement: HTMLCanvasElement;

  interface ModuleEntity {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    isFinder: boolean;
    originX: number;
    originY: number;
  }

  function handleSuccess() {
    if (isScanned) return;
    isScanned = true;
  }

  onMount(() => {
    if (!canvasElement) return;
    ctx = canvasElement.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const rawString = qr.toString({ pad: 0 });

    const gridMatrixSize = qr.size;
    const paddingModules = 4;
    const totalVirtualModules = gridMatrixSize + paddingModules * 2;
    const moduleRenderSize = STAGE_SIZE / totalVirtualModules;
    const offset = paddingModules * moduleRenderSize;

    moduleEntities = pullQrModuleParticles(
      rawString.split("\n"),
      moduleRenderSize,
      offset,
      gridMatrixSize,
    );

    let animationFrameId: number = renderLoop(moduleEntities, moduleRenderSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  });

  function pullQrModuleParticles(
    rows: string[],
    moduleRenderSize: number,
    offset: number,
    gridMatrixSize: number,
  ): ModuleEntity[] {
    const moduleEntities: ModuleEntity[] = [];
    rows.forEach((row, y) => {
      for (let charIndex = 0; charIndex < row.length; charIndex += 2) {
        const cellChunk = row.slice(charIndex, charIndex + 2);
        const x = charIndex / 2;

        if (cellChunk.includes("#")) {
          const targetX = x * moduleRenderSize + offset;
          const targetY = y * moduleRenderSize + offset;

          const isTopLeft = x < 7 && y < 7;
          const isTopRight = x >= gridMatrixSize - 7 && y < 7;
          const isBottomLeft = x < 7 && y >= gridMatrixSize - 7;
          const isFinder = isTopLeft || isTopRight || isBottomLeft;

          moduleEntities.push({
            x: targetX + (Math.random() - 0.5) * 120,
            y: targetY + (Math.random() - 0.5) * 120,
            originX: targetX,
            originY: targetY,
            vx: (Math.random() - 0.5) * 15,
            vy: (Math.random() - 0.5) * 15,
            size: moduleRenderSize + 0.3,
            isFinder,
          });
        }
      }
    });
    return moduleEntities;
  }

  function renderLoop(
    moduleEntities: ModuleEntity[],
    moduleRenderSize: number,
  ) {
    ctx!.fillStyle = "#0a0a0c";
    ctx!.fillRect(0, 0, STAGE_SIZE, STAGE_SIZE);

    for (let i = 0; i < moduleEntities.length; i++) {
      const m = moduleEntities[i];

      if (isScanned) {
        // SUCCESS BEHAVIOR: Blow particles outward away from center
        const dx = m.x - STAGE_SIZE / 2;
        const dy = m.y - STAGE_SIZE / 2;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Add outward explosion force + friction
        m.vx += (dx / dist) * 1.5;
        m.vy += (dy / dist) * 1.5;
        m.vx *= 0.95;
        m.vy *= 0.95;

        // Fade size out over time
        m.size = Math.max(0, m.size - 0.05);
      } else {
        // SCANNING BEHAVIOR: Magnetic pull to home coordinates
        if (m.isFinder) {
          const ax = (m.originX - m.x) * 0.08;
          const ay = (m.originY - m.y) * 0.08;
          m.vx = (m.vx + ax) * 0.8;
          m.vy = (m.vy + ay) * 0.8;
        } else {
          const ax = (m.originX - m.x) * 0.03;
          const ay = (m.originY - m.y) * 0.03;
          m.vx = (m.vx + ax) * 0.88;
          m.vy = (m.vy + ay) * 0.88;
        }
      }

      m.x += m.vx;
      m.y += m.vy;

      // Color shifts to pure white/bright neon green upon success
      ctx!.fillStyle = isScanned
        ? `rgba(255, 255, 255, ${m.size / moduleRenderSize})`
        : m.isFinder
          ? "#00ff80"
          : "#00dd70";

      if (m.size > 0) {
        ctx!.fillRect(
          Math.floor(m.x),
          Math.floor(m.y),
          Math.ceil(m.size),
          Math.ceil(m.size),
        );
      }
    }

    return requestAnimationFrame(() =>
      renderLoop(moduleEntities, moduleRenderSize),
    );
  }

  function boom() {
    if (isScanned) return;
    console.log(moduleEntities.length);
    for (let i = 0; i < moduleEntities.length; i++) {
      const m = moduleEntities[i];

      if (m.isFinder) {
        const ax = (m.originX - m.x) * 0.08;
        const ay = (m.originY - m.y) * 0.08;
        m.vx = (m.vx + ax) * 0.8;
        m.vy = (m.vy + ay) * 0.8;
      } else {
        const ax = (m.originX - m.x) * 0.03;
        const ay = (m.originY - m.y) * 0.03;
        m.vx = (m.vx + ax) * 0.88;
        m.vy = (m.vy + ay) * 0.88;
      }
    }
  }
</script>

<svelte:head>
  <title>Contact Gary</title>
</svelte:head>

<div class="vp" class:success={isScanned} style="--qr-size: {STAGE_SIZE}px">
  <button onclick={handleSuccess}>
    <div class="stage">
      <canvas bind:this={canvasElement} width={STAGE_SIZE} height={STAGE_SIZE}>
      </canvas>
      <div class="scanner-line"></div>

      {#if isScanned}
        <div class="success-overlay">✓</div>
      {/if}
    </div>
  </button>

  <div class="hud">
    <div class="copy">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <h1>
        {isScanned ? "Gary Added!" : "Snap To Add Gary"}
      </h1>

      <!-- Clicking triggers download AND fires the success animation -->
      <a class="download" href={url} target="_blank" rel="noreferrer">
        {isScanned ? "✓ Saved" : "Add to Contacts"}
      </a>
    </div>
  </div>
</div>

<style lang="scss">
  $neon-green: #00ff80;
  $dark-void: #0a0a0c;

  .vp {
    display: flex;
    flex-direction: column;
    background-color: var(--color-document-bg, #f4f4f4);
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 420px;
    min-height: calc(100dvh - 35px);
    margin: 0 auto;
    gap: 2rem;
    transition: background-color 0.8s ease;

    // Changes the background profile to dark mode during the explosion
    &.success {
      background-color: #050507;

      .scanner-line {
        display: none; /* Turn off scanner beam */
      }

      .stage {
        border-color: rgba(#fff, 0.4);
        box-shadow: 0 0 50px rgba($neon-green, 0.4);
      }

      h1 {
        color: #fff;
      }
    }
  }

  .stage {
    position: relative;
    width: var(--qr-size);
    height: var(--qr-size);
    border: 2px solid rgba($neon-green, 0.3);
    border-radius: 12px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 0 30px rgba($neon-green, 0.15);
    view-transition-name: qr;
    transition: all 0.5s ease;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .scanner-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      to bottom,
      rgba($neon-green, 0) 0%,
      $neon-green 50%,
      rgba($neon-green, 0) 100%
    );
    box-shadow: 0 0 15px $neon-green;
    animation: scanCycle 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  .success-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $neon-green;
    font-size: 5rem;
    font-weight: bold;
    animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  }

  .hud {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }

  .copy {
    text-align: center;
    color: #333;
    max-width: var(--qr-size);
    animation: rise-in 0.6s ease-out both;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0 0 0.75rem 0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 900;
    transition: color 0.5s ease;
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
    transition: all 0.3s ease;

    &:active {
      transform: translateY(1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  }

  @keyframes scanCycle {
    0% {
      top: 0%;
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    95% {
      opacity: 1;
    }
    100% {
      top: 100%;
      opacity: 0;
    }
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

  @keyframes pop-in {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
