<script lang="ts">
  import type cytoscape from "cytoscape";
  import type { ElementsDefinition } from "cytoscape";
  import cystyle from "../../routes/(app)/gary/projects/cy-style.json";
  import { focusedNodes } from "../stores/focused-nodes";
  import AddToCollectionButton from "./AddToCollectionButton.svelte";

  const styles = cystyle as cytoscape.StylesheetStyle[];

  const fss = styles.find((s) => s.selector === "node.focused") ?? {
    selector: "node.focused",
    style: {
      "background-color": "blue",
      "border-width": 6,
      "border-color": "green",
    } as cytoscape.CssStyleDeclaration,
  };

  const focusedNodeStyle = fss.style as cytoscape.Css.Node;

  const focusedNodeRadius = 200;

  const backgroundColor = focusedNodeStyle[
    "background-color"
  ]?.valueOf() as string;
  const borderColor = focusedNodeStyle["border-color"]?.valueOf() as string;
  const borderWidth = focusedNodeStyle["border-width"]?.valueOf() as number;

  export let elements: ElementsDefinition = {
    nodes: [],
    edges: [],
  };

  $: nodes = elements.nodes;
  $: edges = elements.edges;
</script>

<div class="container">
  <section class="top">
    <div class="left">
      <h2>Focused Nodes</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {focusedNodeRadius * 2} {focusedNodeRadius * 2}"
      >
        <circle
          cx={focusedNodeRadius}
          cy={focusedNodeRadius}
          r={focusedNodeRadius - borderWidth}
          stroke={borderColor}
          stroke-width={borderWidth}
          fill={backgroundColor}
        />
      </svg>
    </div>
    <button
      class="button-a medium"
      on:click={() => ($focusedNodes = [])}
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
          on:change={(evt) => {
            focusedNodes.update((a) => {
              return evt.detail.checked
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
    max-height: 600px;
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
      svg {
        height: 2rem;
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
      text-wrap: nowrap;
    }
  }
</style>
