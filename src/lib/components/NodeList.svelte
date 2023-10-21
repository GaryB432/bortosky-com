<script lang="ts">
  import type { ElementsDefinition } from "cytoscape";

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
  {/each}
</div>

<style lang="scss">
  .container {
    border: thin solid silver;
    height: 600px;
    overflow-y: scroll;
    > div {
      border: thin solid #ccc;
      text-wrap: nowrap;
    }
  }
</style>
