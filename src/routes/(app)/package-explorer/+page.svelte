<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>bortosky-com - package-explorer</title>
</svelte:head>

<article class="container">
  {#each data.paramPackages as paramPkg}
    <h2>
      {paramPkg.name}
    </h2>
    <div>{paramPkg.description}</div>
    <div class="keywords">
      {#each paramPkg.keywords ?? [] as k}
        <div class="keyword">{k}</div>
      {/each}
    </div>
  {/each}
</article>

<style lang="scss">
  .container {
    padding: 1em;
    border: thin solid silver;
  }
  .keywords {
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
  }
  .keyword {
    display: inline-block;
    color: white;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: rgb(117, 106, 137);
  }
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
