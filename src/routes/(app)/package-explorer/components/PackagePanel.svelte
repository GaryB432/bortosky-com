<script lang="ts">
  import type { PackageJson } from "$lib/project/project";
  import { selectedNode } from "$lib/states.svelte";

  let pJ = $derived(selectedNode.data) as PackageJson;
</script>

<div class="container">
  {pJ.description}
</div>

<style lang="scss">
  .container {
    border: thin solid silver;
  }
</style>
