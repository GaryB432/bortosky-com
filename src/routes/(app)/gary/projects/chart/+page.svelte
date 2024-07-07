<script lang="ts">
  let { data } = $props();
</script>

{#each data.projects as project}
  {@const keywords = project.root.keywords ?? []}
  {#each keywords as k}
    {k}
  {/each}
{/each}

{data.projects.length}
