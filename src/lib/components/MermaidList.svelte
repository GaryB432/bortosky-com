<script lang="ts">
  import { makeMermaidGraph } from "$lib/project/graphs/keyword/mermaid";
  import type { PackageJson } from "$lib/project/project";

  let { keywordMap }: { keywordMap: Map<string, PackageJson[]> } = $props();

  const mermaidLines = $derived(makeMermaidGraph(keywordMap));
</script>

<div class="container">
  <div class="buttons">
    <button class="copy">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="23"
          fill="red"
          stroke="blue"
          stroke-width="2"
        />
      </svg>
    </button>
    <button class="open">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="23"
          fill="blue"
          stroke="red"
          stroke-width="2"
        />
      </svg>
    </button>
  </div>
  <div class="lines">
    {#each mermaidLines as line}
      <div>
        {line}
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .lines {
    font-family: monospace;
    outline: thin solid var(--color-h1);
    overflow-y: scroll;
    max-height: 500px;
    flex-grow: 1;
    overflow-x: hidden;
    div {
      white-space: pre;
      font-size: 0.5em;
    }
  }
  .buttons {
    display: flex;
    gap: 0.25rem;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    button {
      display: flex;
      border: 1px solid silver;
      align-items: center;
      svg {
        margin: 0.2rem;
        width: 1rem;
        height: 1rem;
      }
    }
  }
</style>
