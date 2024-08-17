<script lang="ts">
  import { makeMermaidGraph } from "$lib/project/graphs/keyword/mermaid";
  import type { PackageJson } from "$lib/project/project";
  let subject = $state("MermaidList component");

  let { keywordMap }: { keywordMap: Map<string, PackageJson[]> } = $props();

  let keywordMapcc = $state<Map<string, PackageJson[]>>();
  // let lines = $state<string[]>([]);

  const mermaidLines = $derived(makeMermaidGraph(keywordMap!));

  const m = makeMermaidGraph(new Map());
  console.log(m);
</script>

<div class="container">
  {#each mermaidLines as line}
    <div>
      {line}
    </div>
  {/each}
  <div></div>
  {subject} works
</div>

<style lang="scss">
  .container {
    border: thin solid silver;
  }
</style>
