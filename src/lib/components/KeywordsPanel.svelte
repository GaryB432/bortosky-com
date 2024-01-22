<script lang="ts">
  import { allKeywords, type GaryProject } from "$lib/project/project";
  export let project: GaryProject = {
    root: { name: "", version: "" },
    projects: [],
  };
</script>

<div class="container">
  {#each allKeywords(project) as kw}
    <div>{kw}</div>
  {/each}
</div>

<style lang="scss">
  .container {
    margin: 0.5em;
    div {
      padding: 0.1em;
      margin: 0.1em;
      border: thin solid silver;
      display: inline-block;
      border-radius: 0.3em;
      background-color: var(--primary-color);
    }
  }
</style>
