<script lang="ts">
  import { makeMermaidGraph } from "$lib/project/graphs/keyword/mermaid";
  import type { PackageJson } from "$lib/project/project";

  let { keywordMap }: { keywordMap: Map<string, PackageJson[]> } = $props();

  let open = $state(false);

  const mermaidLines = $derived(makeMermaidGraph(keywordMap));
</script>

<div class="container" class:open>
  <div class="header">
    <div>Mermaid</div>
    <div class="buttons">
      <button class="copy">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect
            x="5"
            y="10"
            width="40"
            height="30"
            fill="#fff"
            stroke="#000"
            stroke-width="1"
          />
          <circle
            cx="25"
            cy="10"
            r="5"
            fill="#000"
            stroke="#000"
            stroke-width="1"
          />
        </svg>
      </button>
      <button class="open" onclick={() => (open = !open)}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <path d="M 15,15 L 30,35 L 45,15" stroke="black" stroke-width="2" />
        </svg>
      </button>
    </div>
  </div>
  <pre class="lines">{mermaidLines.join("\n")}</pre>
</div>

<style lang="scss">
  .lines {
    display: none;
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

  .open > .lines {
    background-color: green;
    display: block;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
        fill: none;
        margin: 0.2rem;
        width: 1rem;
        height: 1rem;
      }
    }
  }
</style>
