<script lang="ts">
  import { makeMermaidGraph } from "$lib/project/graphs/keyword/mermaid";
  import type { PackageJson } from "$lib/project/project";

  let { keywordMap }: { keywordMap: Map<string, PackageJson[]> } = $props();

  const mermaidLines = $derived(makeMermaidGraph(keywordMap));
</script>

<div class="container">
  {#each mermaidLines as line}
    <div>
      {line}
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    font-family: monospace;
    border: thin solid silver;
    overflow-y: scroll;
    // width: 100%;
    max-height: 500px;
    // hyphens: none;
    flex-grow: 1;
    overflow-x: hidden;
    div {
      white-space: pre;
      font-size: 0.75em;
      line-height: 1.1em;
      // hyphens: none;
      // width: 200px;
      // overflow-x: hidden;
    }
  }
</style>
