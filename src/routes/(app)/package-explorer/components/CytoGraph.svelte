<script lang="ts">
  import type { ElementsDefinition } from "cytoscape";
  let { elements }: { elements: ElementsDefinition } = $props();
</script>

<div class="container">
  <pre>
  {JSON.stringify(elements, undefined, 1)}
</pre>
</div>

<style lang="scss">
  .container {
    border: thin solid silver;
  }
</style>
