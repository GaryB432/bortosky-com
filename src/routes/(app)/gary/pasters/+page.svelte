<script lang="ts">
  import ClipboardCopy from "$lib/components/ClipboardCopy.svelte";
  import { rand } from "$lib/shared/prng";
  import { onMount } from "svelte";
  import { adjectives, nouns } from "./words";

  type Capsule = {
    sequence: number;
    phrase: string;
    active?: boolean;
  };

  function rando<T>(a: T[]): T {
    return a.at(Math.floor(rand() * a.length))!;
  }

  const phrase = () =>
    [
      rando(adjectives),
      rando(adjectives),
      rando(adjectives),
      rando(nouns),
    ].join(" ");

  // Track the current sequence globally or inside the manager
  let currentSequence = 1;

  function getRandomCapsule(): Capsule {
    return {
      sequence: currentSequence++,
      phrase: phrase(),
      active: false,
    };
  }

  function* infiniteCapsuleStream(): Iterator<Capsule, void> {
    while (true) {
      yield getRandomCapsule();
    }
  }

  class InfiniteScrollManager {
    private stream = infiniteCapsuleStream();

    public loadNextScreen(pageSize: number = 10): Capsule[] {
      const batch: Capsule[] = [];
      for (let i = 0; i < pageSize; i++) {
        const result = this.stream.next();
        if (!result.done) {
          batch.push(result.value);
        }
      }
      return batch;
    }
  }

  const scrollManager = new InfiniteScrollManager();
  const capsules: Capsule[] = $state([]);
  let anchorElement: HTMLDivElement; // Reference to our scroll anchor

  function reload() {
    capsules.push(...scrollManager.loadNextScreen(15));
  }

  onMount(() => {
    // 1. Initial Load
    reload();

    // 2. Setup Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          reload();
        }
      },
      {
        rootMargin: "300px", // Start loading 300px before reaching the bottom
      },
    );

    observer.observe(anchorElement);

    // 3. Cleanup observer on destroy
    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>bortosky.com - pasters</title>
</svelte:head>

<h2>Pick and paste as needed <i>IYKYK 😏</i></h2>
<button
  class="button-a"
  onclick={() => {
    reload();
  }}>SPIN</button
>

<section class="container">
  {#each capsules as cap}
    <div>{cap.sequence}</div>
    <!-- FIXED: Correct Svelte class binding syntax -->
    <div class:active={cap.active}>
      {cap.phrase}
    </div>
    <div>
      <ClipboardCopy
        width="3em"
        textToCopy={cap.phrase}
        oncopied={(detail: string) => console.log(detail)}
      />
    </div>
  {/each}
</section>

<!-- FIXED: Bind the anchor element to our TypeScript variable -->
<div bind:this={anchorElement} id="scroll-anchor"></div>

<style lang="scss">
  .container {
    max-width: 60vw;
    display: grid;
    /* 4 character sequence, flexible phrase, 50px copy button */
    grid-template-columns: 4ch 1fr 50px;
    align-items: center;
    margin: 0 auto;
    row-gap: 0.5rem; /* Added spacing between rows */

    > div {
      font-size: 1rem;
    }
  }
</style>
