<script lang="ts">
  import LayoutSelect from "$lib/components/LayoutSelect.svelte";
  import MermaidList from "$lib/components/MermaidList.svelte";
  import { selectedNode } from "$lib/states.svelte";
  import type { LayoutOptions } from "cytoscape";
  import type { PageData } from "./$types";
  import CytoGraph from "./components/CytoGraph.svelte";
  import SelectedPackagePanel from "./components/SelectedPackagePanel.svelte";

  let { data }: { data: PageData } = $props();

  let layout = $state({ name: "dagre" });
</script>

<svelte:head>
  <title>bortosky-com - package-explorer</title>
</svelte:head>

<article class="container">
  {#each data.paramPackages as paramPkg}
    <div>
      <CytoGraph elements={paramPkg.cyto.elements} {layout}></CytoGraph>
    </div>
    <aside>
      <LayoutSelect
        selected="concentric"
        onselect={(newLayout) => {
          layout = newLayout as LayoutOptions;
        }}
      />
      {#if selectedNode}
        <SelectedPackagePanel></SelectedPackagePanel>
      {/if}
      <MermaidList keywordMap={paramPkg.keywordMap}></MermaidList>
    </aside>
  {/each}
</article>

<style lang="scss">
  aside,
  aside * {
    width: 190px;
  }

  .container {
    display: grid;
    grid-template-columns: 6fr 1fr;
    width: 100%;
    height: 70vh;
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
