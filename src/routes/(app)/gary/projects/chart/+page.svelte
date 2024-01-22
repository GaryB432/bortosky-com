<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#each data.projects as project}
  {@const keywords = project.root.keywords ?? []}
  {#each keywords as k}
    {k}
  {/each}
{/each}

{data.projects.length}
