<script lang="ts">
  import LayoutSelect from "$lib/components/LayoutSelect.svelte";
  import MermaidList from "$lib/components/MermaidList.svelte";
  import type { LayoutOptions } from "cytoscape";
  import type { PageData } from "./$types";
  import CytoGraph from "./components/CytoGraph.svelte";
  import { selectedNode } from "$lib/states.svelte";

  let { data }: { data: PageData } = $props();

  let layout = $state({ name: "dagre" });

  // let m = $derived(selectedNodeData);

  $inspect(data.paramPackages);
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
      <div class="temp">
        {JSON.stringify(selectedNode.data, null, 0)}
      </div>
      <MermaidList keywordMap={paramPkg.keywordMap}></MermaidList>
    </aside>
  {/each}
</article>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr max-content;
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
