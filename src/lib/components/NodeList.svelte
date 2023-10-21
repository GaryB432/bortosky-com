<script lang="ts">
  import type { ElementsDefinition } from "cytoscape";
  import AddToCollectionButton from "./AddToCollectionButton.svelte";

  export let elements: ElementsDefinition = {
    nodes: [],
    edges: [],
  };

  $: nodes = elements.nodes;
  $: edges = elements.edges;
</script>

<div class="container">
  {#each nodes as n}
    <div>
      {n.data.id}
    </div>
    <div>
      <AddToCollectionButton />
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr 2em;
    border: thin solid silver;
    height: 600px;
    overflow-y: scroll;
    > div {
      border: thin solid #ccc;
      text-wrap: nowrap;
    }
  }
</style>
