<script lang="ts">
  import type { ElementsDefinition } from "cytoscape";
  import { focusedNodes } from "../stores/focused-nodes";
  import AddToCollectionButton from "./AddToCollectionButton.svelte";

  export let elements: ElementsDefinition = {
    nodes: [],
    edges: [],
  };

  $: nodes = elements.nodes;
  $: nodes.forEach((n) => (n.scratch = n.scratch ?? { selected: false }));
  $: focusedNodes.update(() => nodes.filter((n) => n.scratch.selected));
  $: edges = elements.edges;
</script>

<div class="container">
  {#each nodes as n}
    <div>
      {n.data.id}
    </div>
    <div>
      <AddToCollectionButton
        checked={n.scratch && n.scratch.selected}
        on:change={(c) => {
          // $focusedNodes = [];

          focusedNodes.update((a) => {
            console.log(c.detail);
            if (c.detail.checked) {
              return [...a, n];
            } else {
              return a.filter((nq) => n.data.id !== nq.data.id);
            }
          });

          console.dir($focusedNodes);
        }}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr auto;
    border: thin solid silver;
    height: 600px;
    overflow-y: scroll;
    > div {
      border: thin solid #ccc;
      text-wrap: nowrap;
    }
  }
</style>
