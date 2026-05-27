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

  function getRandomCapsule(): Capsule {
    return { sequence: 0, phrase: phrase(), active: false };
  }

  // 2. The infinite "never-done" generator
  // Typing it as Iterator<string, void> means it yields strings and never returns a final value
  function* infiniteCapsuleStream(): Iterator<Capsule, void> {
    while (true) {
      yield getRandomCapsule();
    }
  }

  // 3. UI Consumer: Fetching "a screen at a time"
  class InfiniteScrollManager {
    private stream = infiniteCapsuleStream();

    // Call this when the page loads, and every time the user scrolls near the bottom
    public loadNextScreen(pageSize: number = 10): Capsule[] {
      const batch: Capsule[] = [];

      for (let i = 0; i < pageSize; i++) {
        const result = this.stream.next();

        // Because 'done' is always false, 'value' is guaranteed to be a string
        if (!result.done) {
          batch.push(result.value);
        }
      }

      return batch;
    }
  }

  // let phrases: string[] = $state([]);

  const scrollManager = new InfiniteScrollManager();
  // const initialScreen = scrollManager.loadNextScreen(15); // Loads initial 15 sentences

  const capsules: Capsule[] = $state([]);

  function reload() {
    capsules.push(...scrollManager.loadNextScreen(15));
  }

  onMount(() => {
    reload();
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
    <div class={{ active: cap.active }}>
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

<style lang="scss">
  .container {
    max-width: 60vw;
    display: grid;
    grid-template-columns: 4ch 1fr 50px;
    align-items: center;
    margin: 0 auto;
    outline: 1px solid red;
    > div {
      outline: 3px solid green;
    }
  }

  // .container {
  //   display: grid;
  //   grid-template-columns: 1fr 50px 69px;
  //   padding: 1em;
  //   > div {

  //     font-size: 0.8rem;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     .p {
  //       padding: 0.5rem;
  //       width: 15ch;
  //     }
  //     &.active .p {
  //       background-color: rgb(var(--fun-blue));
  //       color: white;
  //       &::before {
  //         content: "";
  //       }
  //     }
  //   }
  // }
  // i {
  //   font-size: 0.5em;
  // }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    /* desktops */
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>
