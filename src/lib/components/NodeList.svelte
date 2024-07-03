<script lang="ts">
  import type { ElementsDefinition } from "cytoscape";
  import { onMount } from "svelte";
  import tippy from "tippy.js";
  import { focusedNodes } from "../stores";
  import AddToCollectionButton from "./AddToCollectionButton.svelte";
  import FocusedNodeIcon from "./FocusedNodeIcon.svelte";

  let { elements }: { elements: ElementsDefinition } = $props();

  let nodes = $derived(elements.nodes);

  onMount(() => {
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
        $focusedNodes = [];
      }}
      disabled={$focusedNodes.length === 0}
    >
      Clear {$focusedNodes.length}
    </button>
  </section>
  <section class="other">
    {#each nodes as n}
      <div class="node-id">
        {n.data.id}
      </div>
      <div>
        <AddToCollectionButton
          checked={$focusedNodes.includes(n)}
          change={(isChecked: boolean) => {
            focusedNodes.update((a) => {
              return isChecked
                ? [...a, n]
                : a.filter((nq) => n.data.id !== nq.data.id);
            });
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
