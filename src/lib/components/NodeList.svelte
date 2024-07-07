<script lang="ts">
  import type { ElementsDefinition } from "cytoscape";
  import tippy from "tippy.js";
  import { focusedNodes } from "../states.svelte";
  import AddToCollectionButton from "./AddToCollectionButton.svelte";
  import FocusedNodeIcon from "./FocusedNodeIcon.svelte";

  let { elements }: { elements: ElementsDefinition } = $props();

  $effect(() => {
    tippy(".button-a.medium");
  });
</script>

<div class="container">
  <section class="top">
    <div class="left">
      <h2>Focused Nodes</h2>
      <FocusedNodeIcon />
    </div>
    <button
      class="button-a medium"
      data-tippy-content="Unfocus all nodes"
      onclick={() => {
        focusedNodes.nodes = [];
      }}
      disabled={focusedNodes.nodes.length === 0}
    >
      Clear {focusedNodes.nodes.length}
    </button>
  </section>
  <section class="other">
    {#each elements.nodes as n}
      <div class="node-id">
        {n.data.id}
      </div>
      <div>
        <AddToCollectionButton
          checked={focusedNodes.nodes.includes(n)}
          onchange={(isChecked: boolean) => {
            focusedNodes.nodes = isChecked
              ? [...focusedNodes.nodes, n]
              : focusedNodes.nodes.filter((nq) => n.data.id !== nq.data.id);
          }}
        />
      </div>
    {/each}
  </section>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    max-height: var(--height);
  }
  .top {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 0.2rem;
    border: thin solid var(--stone-5);
    .left {
      display: flex;
      gap: 0.5em;
      align-items: center;
      h2 {
        margin: 0;
        line-height: 2rem;
        font-size: 1.5rem;
      }
    }
  }
  .other {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 2px;
    line-height: 2;
    overflow-y: scroll;
    div.node-id {
      border: thin solid #ccc;
    }
  }
</style>
