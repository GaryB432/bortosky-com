<script lang="ts">
  import QRCode from "qrcode-generator";
  import { resolve } from "$app/paths";
  import { onMount, tick } from "svelte";

  type JustAPointNotARectSVGOrOtherwise = {
    x: number;
    y: number;
  };

  
  type Translation = {
    from: JustAPointNotARectSVGOrOtherwise;
    to: JustAPointNotARectSVGOrOtherwise;
  };

  let animating = $state(true);
  let darkPoints = $state<JustAPointNotARectSVGOrOtherwise[]>([]);
  let qrSize = $state(0);
  let qrUrl = resolve("/gary/contact/download");
  let qrContainer: HTMLElement | null = null;

  function animate() {
    animating = false;
    setTimeout(() => {
      animating = true;
    }, 0);
    // tick().then(() => (animating = true));
  }

  // Animation logic
  onMount(() => {
    const qr = QRCode(0, "L");
    qr.addData(qrUrl);
    qr.make();
    qrSize = qr.getModuleCount();
    // Build array of rects for black modules
    // const rects = [];
    for (let r = 0; r < qrSize; r++) {
      for (let c = 0; c < qrSize; c++) {
        if (qr.isDark(r, c)) {
          darkPoints.push({ x: c, y: r });
        }
      }
    }
  });
</script>

{#snippet cell(point: JustAPointNotARectSVGOrOtherwise)}
  <rect
    // x={point.x}
    // y={point.y}
    width="1"
    height="1"
    style="--startX: {Math.random() * 200}px; --startY: {Math.random() *
      200}px; --startRot: {Math.random() *
      180}deg; --delay: 0; --targetX: {point.x}px; --targetY: {point.y}px;"
    class={{ ["confetti-piece"]: animating }}
  />
{/snippet}

<div class="qr-wrapper">
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div class="qr-svg" aria-label="QR Code" tabindex="0">
    <svg
      // width="320"
      // height="320"
      viewBox={`0 0 ${qrSize} ${qrSize}`}
      shape-rendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      style="background:#fff;"
    >
      {#each darkPoints as pnt (pnt.x + "-" + pnt.y)}
        {@render cell(pnt)}
      {/each}
    </svg>
  </div>
  <div class="qr-instructions">Scan to download my contact card</div>
  <button onclick={animate}>go</button>
</div>

<style>
  .qr-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 30px);
    background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
  }
  .qr-svg {
    margin: 2rem 0 1rem 0;
    width: 320px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 4px 32px 0 #0001;
    overflow: visible;
  }
  .confetti-piece {
    opacity: 0;
    transform: translate(var(--startX), var(--startY)) rotate(var(--startRot));
    animation: confetti-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    /* animation-delay: var(--delay); */
  }
  @keyframes confetti-in {
    0% {
      opacity: 0;
      transform: translate(var(--startX), var(--startY)) rotate(var(--startRot));
    }
    40% {
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translate(var(--targetX), var(--targetY)) rotate(0deg);
    }
  }
  .qr-instructions {
    font-size: 1.1rem;
    color: #333a;
    margin-bottom: 2rem;
    letter-spacing: 0.01em;
  }
</style>
