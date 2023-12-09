<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: projects = data.projects;
</script>

<div class="container">
  <div class="projects">
    {#each projects as project}
      <ProjectCard {project}></ProjectCard>
    {/each}
  </div>
</div>

<style>
  .projects {
    margin: 2em auto;
    width: 70vw;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
</style>
