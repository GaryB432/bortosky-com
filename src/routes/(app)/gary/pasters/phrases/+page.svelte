<script lang="ts">
  import ClipboardCopy from "$lib/components/ClipboardCopy.svelte";
  import { adjectives, nouns } from "./words";

  type Capsule = { sequence: number; phrase: string };

  // 1. STATLESS DETERMINISTIC GENERATOR
  // Instead of a sequential loop, we skip the PRNG forward to a specific index
  function getCapsuleAtSequence(seq: number): Capsule {
    // If your PRNG allows stepping to a specific state, use that here.
    // If not, we can simulate an isolated seed generation for this sequence:
    const phrase = [
      randoAtSeq(adjectives, seq, 1),
      randoAtSeq(adjectives, seq, 2),
      randoAtSeq(adjectives, seq, 3),
      randoAtSeq(nouns, seq, 4),
    ].join(" ");

    return { sequence: seq, phrase };
  }

  // Helper to get a deterministic index for a specific row and word position
  function randoAtSeq<T>(arr: T[], seq: number, step: number): T {
    // A simple deterministic hash combining sequence and word step
    // to keep it fast and independent of previous loops
    const hash = Math.sin(seq * 12.9898 + step * 78.233) * 43758.5453;
    const pseudoRand = hash - Math.floor(hash);
    return arr[Math.floor(pseudoRand * arr.length)];
  }

  // 2. RUNES FOR VIRTUAL WINDOW
  let scrollTop = $state(0);
  let viewportHeight = $state(800); // Dynamic fallback
  let viewportEl: HTMLDivElement | null = null;

  const ROW_HEIGHT = 50; // Pixels per grid row
  const BUFFER_COUNT = 10; // Extra padding rows above/below

  // Compute indices dynamically based on scroll position
  let startSequence = $derived(
    Math.max(1, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER_COUNT),
  );
  let endSequence = $derived(
    startSequence + Math.ceil(viewportHeight / ROW_HEIGHT) + BUFFER_COUNT * 2,
  );

  // Generate only the visible slices reactively!
  let visibleCapsules = $derived.by(() => {
    const list: Capsule[] = [];
    const end = Math.min(10000000, endSequence);
    for (let i = startSequence; i <= end; i++) {
      list.push(getCapsuleAtSequence(i));
    }
    return list;
  });

  function moveScroll(rows: number) {
    const nextTop = Math.max(0, scrollTop + rows * ROW_HEIGHT);
    scrollTop = nextTop;

    if (viewportEl) {
      viewportEl.scrollTop = nextTop;
    }
  }

  function handleScroll(e: Event) {
    const target = e.currentTarget as HTMLDivElement;
    scrollTop = target.scrollTop;
  }
</script>

<div class="controls" aria-label="Phrase navigation controls">
  <button
    class="nav-button coarse back"
    type="button"
    aria-label="Back 100 sequences"
    onclick={() => moveScroll(-100)}
  >
    <svg viewBox="0 0 24 12" aria-hidden="true" focusable="false">
      <polygon class="tri tri-1" points="12,0 0,6 12,12" />
      <polygon class="tri tri-2" points="24,0 12,6 24,12" />
    </svg>
    <span class="num">100</span>
  </button>
  <button
    class="nav-button fine back"
    type="button"
    aria-label="Back 1 sequence"
    onclick={() => moveScroll(-1)}
  >
    <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <polygon class="tri" points="12,0 0,6 12,12" />
    </svg>
    <span class="num">1</span>
  </button>
  <button
    class="nav-button fine forward"
    type="button"
    aria-label="Forward 1 sequence"
    onclick={() => moveScroll(1)}
  >
    <span class="num">1</span>
    <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <polygon class="tri" points="0,0 12,6 0,12" />
    </svg>
  </button>
  <button
    class="nav-button coarse forward"
    type="button"
    aria-label="Forward 100 sequences"
    onclick={() => moveScroll(100)}
  >
    <span class="num">100</span>
    <svg viewBox="0 0 24 12" aria-hidden="true" focusable="false">
      <polygon class="tri tri-1" points="0,0 12,6 0,12" />
      <polygon class="tri tri-2" points="12,0 24,6 12,12" />
    </svg>
  </button>
</div>

<div
  class="viewport"
  bind:this={viewportEl}
  onscroll={handleScroll}
  bind:clientHeight={viewportHeight}
>
  <!-- Total height spacer mimicking 10,000,000 elements so the scrollbar behaves accurately -->
  <div class="total-space" style="height: {10000000 * ROW_HEIGHT}px;">
    <!-- Floating grid layout positioned exactly where the user is looking -->
    <section
      class="container"
      style="transform: translateY({(startSequence - 1) * ROW_HEIGHT}px);"
    >
      {#each visibleCapsules as cap (cap.sequence)}
        <div class="row-item seq">{cap.sequence}</div>
        <div class="row-item phrase">{cap.phrase}</div>
        <div class="row-item action">
          <ClipboardCopy
            oncopied={(detail: string) => console.log(detail)}
            width="3em"
            textToCopy={cap.phrase}
          />
        </div>
      {/each}
    </section>
  </div>
</div>

<style lang="scss">
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0 1rem;
    background: linear-gradient(180deg, var(--sand-1), rgba(230, 228, 220, 0.5));
    border-bottom: 1px solid var(--sand-3);
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(8px);
  }

  .nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    border: 1px solid rgba(var(--fun-blue), 0.15);
    border-radius: 999px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    background: var(--sand-5);
    box-shadow: 0 0.35rem 0.9rem rgba(33, 37, 41, 0.12);
    transition:
      transform 180ms cubic-bezier(0.2, 0.9, 0.2, 1),
      background-color 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease;

    svg {
      width: 1.2rem;
      height: 1.2rem;
      overflow: visible;
      filter: drop-shadow(0 0 0 rgba(var(--fun-blue), 0));
      transition:
        transform 180ms cubic-bezier(0.2, 0.9, 0.2, 1),
        filter 180ms ease;
    }

    .tri {
      fill: white;
      transform-box: fill-box;
      transform-origin: center;
      transition:
        fill 180ms ease,
        opacity 180ms ease,
        transform 180ms cubic-bezier(0.2, 0.9, 0.2, 1);
    }

    .num {
      min-width: 2ch;
      text-align: center;
      line-height: 1;
      transition: transform 180ms ease, letter-spacing 180ms ease;
    }

    &:focus-visible {
      outline: 3px solid rgba(var(--fun-blue), 0.65);
      outline-offset: 3px;
    }
  }

  .nav-button.fine {
    min-width: 5.75rem;
  }

  .nav-button.coarse {
    min-width: 7.5rem;
    background: linear-gradient(180deg, rgb(var(--fun-blue)), rgba(var(--fun-blue), 0.88));
  }

  .nav-button.back {
    flex-direction: row;
  }

  .nav-button.forward {
    flex-direction: row;
  }

  @media (prefers-reduced-motion: no-preference) {
    .nav-button:hover {
      transform: translateY(-2px) scale(1.12);
      background-color: rgb(var(--fun-blue));
      border-color: rgba(var(--fun-blue), 0.45);
      box-shadow:
        0 0.5rem 1.2rem rgba(33, 37, 41, 0.2),
        0 0 1.25rem rgba(var(--fun-blue), 0.45);

      svg {
        filter: drop-shadow(0 0 0.6rem rgba(var(--fun-blue), 0.8));
      }

      .num {
        letter-spacing: 0.16em;
        transform: scale(1.05);
      }

      &.back svg {
        transform: translateX(-4px);
      }

      &.forward svg {
        transform: translateX(4px);
      }
    }

    .nav-button.coarse:hover .tri-1 {
      animation: chase-back 320ms cubic-bezier(0.2, 1.05, 0.35, 1) both;
    }

    .nav-button.coarse:hover .tri-2 {
      animation: chase-back 320ms cubic-bezier(0.2, 1.05, 0.35, 1) 70ms both;
    }

    .nav-button.coarse.forward:hover .tri-1 {
      animation-name: chase-forward;
    }

    .nav-button.coarse.forward:hover .tri-2 {
      animation-name: chase-forward;
    }

    .nav-button:active {
      animation: squish 150ms ease both;
    }
  }

  @keyframes chase-back {
    0% {
      transform: translateX(0) scale(1);
    }
    55% {
      transform: translateX(-3px) scale(1.08);
    }
    100% {
      transform: translateX(-1px) scale(1);
    }
  }

  @keyframes chase-forward {
    0% {
      transform: translateX(0) scale(1);
    }
    55% {
      transform: translateX(3px) scale(1.08);
    }
    100% {
      transform: translateX(1px) scale(1);
    }
  }

  @keyframes squish {
    0% {
      transform: translateY(-2px) scale(1.12);
    }
    45% {
      transform: translateY(0) scaleX(0.9) scaleY(1.06);
    }
    100% {
      transform: translateY(0) scale(1);
    }
  }

  .viewport {
    height: 80vh;
    overflow-y: auto;
    position: relative;
    border: 1px solid var(--sand-3);
    border-top: 0;
    background: var(--color-document-bg);
  }

  .total-space {
    position: relative;
    width: 100%;
  }

  .container {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.95);
    top: 0;
    left: 0;
    right: 0;
    max-width: 60vw;
    display: grid;
    gap: 0.6rem;
    grid-template-columns: 5ch 1fr 60px;
    align-items: center;
    margin: auto;
    padding: 0 1rem;
    box-shadow: 0 1rem 3rem rgba(33, 37, 41, 0.05);
    backdrop-filter: blur(2px);
  }

  .row-item {
    height: 60px; /* Must match ROW_HEIGHT variable exactly */
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: whitesmoke;
    font-size: 1rem;
    padding: 0 1rem;
    &.seq {
      justify-content: flex-end;
    }
    &.action {
      justify-content: center;
    }
  }

  .nav-button.coarse .tri {
    stroke: rgba(255, 255, 255, 0.72);
    stroke-width: 0.9;
    stroke-linejoin: round;
  }
</style>
