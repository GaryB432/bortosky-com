<script lang="ts">
  import LayoutSelect from "$lib/components/LayoutSelect.svelte";
  import MermaidList from "$lib/components/MermaidList.svelte";
  import type { PageData } from "./$types";
  import CytoGraph from "./components/CytoGraph.svelte";

  let { data }: { data: PageData } = $props();

  let layout = $state({ name: "dagre" });

  $inspect(data.paramPackages);
</script>

<svelte:head>
  <title>bortosky-com - package-explorer</title>
</svelte:head>

<article class="container">
  {#each data.paramPackages as paramPkg}
    <CytoGraph elements={paramPkg.cyto.elements} {layout}></CytoGraph>
    <aside>
      <LayoutSelect
        selected="concentric"
        onselect={(newLayout) => {
          layout = newLayout;
        }}
      />
      <MermaidList keywordMap={paramPkg.keywordMap}></MermaidList>
    </aside>
  {/each}
</article>

<style lang="scss">
  .container {
    display: flex;
    // padding: 1em;
    border: thin solid red;
    flex-direction: row;
    width: 90vw;
  }
  aside {
    // max-width: 200px;
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
