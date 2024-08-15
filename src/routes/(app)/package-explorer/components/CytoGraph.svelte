<script lang="ts">
  import type { ElementsDefinition } from "cytoscape";
  let { elements }: { elements: ElementsDefinition } = $props();
</script>

<div class="container">
  {JSON.stringify(elements)}
</div>

<style lang="scss">
  .container {
    border: thin solid silver;
  }
</style>
