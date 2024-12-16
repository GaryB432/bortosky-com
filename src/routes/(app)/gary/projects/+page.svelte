<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";

  let { data } = $props();

  let projects = $derived(data.projects);
</script>

<svelte:head>
  <title>Gary's Projects - bortosky.com</title>
</svelte:head>

<section class="views">
  <a href="./cytoscape/">cytoscape view</a>
  <a href="./chart/">chart view</a>
</section>

<svg style="display: none">
  <defs>
    <symbol id="nx-logo" viewBox="0 0 24 24">
      <path
        d="M11.987 14.138l-3.132 4.923-5.193-8.427-.012 8.822H0V4.544h3.691l5.247 8.833.005-3.998 3.044 4.759zm.601-5.761c.024-.048 0-3.784.008-3.833h-3.65c.002.059-.005 3.776-.003 3.833h3.645zm5.634 4.134a2.061 2.061 0 0 0-1.969 1.336 1.963 1.963 0 0 1 2.343-.739c.396.161.917.422 1.33.283a2.1 2.1 0 0 0-1.704-.88zm3.39 1.061c-.375-.13-.8-.277-1.109-.681-.06-.08-.116-.17-.176-.265a2.143 2.143 0 0 0-.533-.642c-.294-.216-.68-.322-1.18-.322a2.482 2.482 0 0 0-2.294 1.536 2.325 2.325 0 0 1 4.002.388.75.75 0 0 0 .836.334c.493-.105.46.36 1.203.518v-.133c-.003-.446-.246-.55-.75-.733zm2.024 1.266a.723.723 0 0 0 .347-.638c-.01-2.957-2.41-5.487-5.37-5.487a5.364 5.364 0 0 0-4.487 2.418c-.01-.026-1.522-2.39-1.538-2.418H8.943l3.463 5.423-3.379 5.32h3.54l1.54-2.366 1.568 2.366h3.541l-3.21-5.052a.7.7 0 0 1-.084-.32 2.69 2.69 0 0 1 2.69-2.691h.001c1.488 0 1.736.89 2.057 1.308.634.826 1.9.464 1.9 1.541a.707.707 0 0 0 1.066.596zm.35.133c-.173.372-.56.338-.755.639-.176.271.114.412.114.412s.337.156.538-.311c.104-.231.14-.488.103-.74z"
      ></path>
    </symbol>
    <symbol id="ng-logo" viewBox="0 0 250 250">
      <polygon
        points="108,135.4 125,135.4 125,135.4 125,135.4 142,135.4 125,94.5"
      />
      <path
        d="M125 30L125 30L125 30L31.9 63.2l14.2 123.1L125 230l0 0l0 0l78.9-43.7l14.2-123.1L125 30z M183.1 182.6h-21.7h0 l-11.7-29.2H125h0h0h-24.7l-11.7 29.2h0H66.9h0L125 52.1l0 0l0 0l0 0l0 0L183.1 182.6L183.1 182.6z"
      />
    </symbol>
    <symbol
      fill="none"
      id="external-link"
      shape-rendering="geometricPrecision"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
      <path d="M15 3h6v6"></path>
      <path d="M10 14L21 3"></path>
    </symbol>
  </defs>
</svg>

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
