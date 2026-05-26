<script lang="ts">
  import ClipboardCopy from "$lib/components/ClipboardCopy.svelte";
  import { rand } from "$lib/shared/prng";
  import { onMount } from "svelte";
  import { adjectives, nouns } from "./words";

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

  let phrases: string[] = $state([]);

  function reload() {
    phrases = Array(12).fill(0).map(phrase);
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
  {#each phrases as str}
    <div class={{ active: false }}>
      <div class="p">
        {str}
      </div>
      <div>
        <ClipboardCopy
          width="3em"
          textToCopy={str}
          oncopied={(detail: string) => console.log(detail)}
        />
      </div>
    </div>
  {/each}
</section>

<style lang="scss">
  .container {
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    > div {
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .p {
        padding: 0.5rem;
        width: 15ch;
      }
      &.active .p {
        //  background: radial-gradient(
        //    ellipse at center,
        //    #f73134 0%,
        //    #ff0000 47%,
        //    #ff0000 47%,
        //    #23bc2b 47%,
        //    #23bc2b 48%
        //  );
        background-color: rgb(var(--fun-blue));

        color: white;

        &::before {
          content: "";
        }
      }
    }
  }
  i {
    font-size: 0.5em;
  }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    .container {
      grid-template-columns: repeat(4, 1fr);
    }
    /* desktops */
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>
