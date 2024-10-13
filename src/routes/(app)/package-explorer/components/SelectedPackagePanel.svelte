<script lang="ts">
  import type { PackageJson } from "$lib/project/project";

  let { pJ }: { pJ: PackageJson } = $props();
</script>

<div class="container">
  <h1>{pJ.name}</h1>
  <div class="name">
    {pJ.description}
  </div>
  <a href={`../package-explorer?p=${pJ.name}`}>More</a>
  <a href={`https://www.npmjs.com/package/${pJ.name}`} target="_blank">npm</a>
  <ul>
    {#each pJ.keywords ?? [] as keyword}
      <li class="pill">
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
    display: block;
  }
  a {
    text-decoration: underline;
  }

  .pill {
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 20px; /* Adjust the radius as needed */
    cursor: pointer;
    margin: 1rem;
    transition: background-color 0.2s ease-in-out;
  }

  .pill:hover {
    background-color: #0062cc;
  }
</style>
