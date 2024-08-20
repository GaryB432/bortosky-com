<script lang="ts">
  import type { PackageJson } from "$lib/project/project";
  import { selectedNode } from "$lib/states.svelte";

  let pJ = $derived(
    selectedNode.data ?? {
      name: "",
      version: "",
      description: "Select a package node in the graph",
    },
  ) as PackageJson;
</script>

<div class="container">
  <h1>{pJ.name}</h1>
  <div class="name">
    {pJ.description}
  </div>
  <ul>
    {#each pJ.keywords ?? [] as keyword}
      <li>
        {keyword}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .container {
    border: thin solid silver;
    height: 30vh;
    overflow-y: scroll;
  }
  h1 {
    font-size: 1.2rem;
    line-height: revert;
    margin-bottom: 0;
    color: var(--color-h1);
  }
  .name {
    margin: 4px 0;
  }
  li {
    font-size: 1rem;
  }
</style>
