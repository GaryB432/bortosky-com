<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: projects = data.projects;
</script>

<svelte:head>
  <title>Gary's Projects - bortosky.com</title>
</svelte:head>

<section class="views">
  <a href="./cytoscape">cytoscape view</a>
  <a href="./chart">chart view</a>
</section>

<div class="container">
  <div class="projects">
    {#each projects as project}
      <ProjectCard {project}></ProjectCard>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    padding: 2em;
  }
  .views {
    display: flex;
    align-content: center;
    justify-content: flex-end;
    gap: 1em;
    padding-block-end: 2em;
    a {
      border: thin solid silver;
      padding: 0.5em;
    }
    :hover {
      text-decoration: underline;
    }
  }
  .projects {
    width: fit-content;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr 0.4fr 1fr 1fr;
    align-items: center;
  }
</style>
