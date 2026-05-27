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

  function handleScroll(e: Event) {
    const target = e.currentTarget as HTMLElement;
    scrollTop = target.scrollTop;
  }
</script>

<!-- The scrollable viewport container -->
<div
  class="viewport"
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
  .viewport {
    height: 80vh;
    overflow-y: auto;
    position: relative;
    border: 1px solid #ccc;
  }

  .total-space {
    position: relative;
    width: 100%;
  }

  .container {
    position: absolute;
    background-color: white;
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
</style>
