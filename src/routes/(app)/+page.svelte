<script lang="ts">
  import type { PageData } from "./$types";
  import NpmPackageList from "./package-explorer/components/NpmPackageList.svelte";
  let { data }: { data: PageData } = $props();
  let packName = $state("");
  let selected = $state("");
  const npmLogoFactor = 0.1;
</script>

<h1>Welcome</h1>

<p>
  The only family information available at this time is <a href="gary">
    Gary's
  </a>
</p>

<div class="container">
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="{540 * npmLogoFactor}px"
    height="{210 * npmLogoFactor}px"
    viewBox="0 0 18 7"
  >
    <path
      fill="#CB3837"
      d="M0,0h18v6H9v1H5V6H0V0z M1,5h2V2h1v3h1V1H1V5z M6,1v5h2V5h2V1H6z M8,2h1v2H8V2z M11,1v4h2V2h1v3h1V2h1v3h1V1H11z"
    />
    <polygon fill="#FFFFFF" points="1,5 3,5 3,2 4,2 4,5 5,5 5,1 1,1 " />
    <path fill="#FFFFFF" d="M6,1v5h2V5h2V1H6z M9,4H8V2h1V4z" />
    <polygon
      fill="#FFFFFF"
      points="11,1 11,5 13,5 13,2 14,2 14,5 15,5 15,2 16,2 16,5 17,5 17,1 "
    />
  </svg>
  <input type="text" bind:value={packName} placeholder="package-name" />
  <a class="button-a" href="/package-explorer/?p={packName}">Explore</a>
</div>

<NpmPackageList downloads={data.popularDownloads.filter((d) => !!d)}
></NpmPackageList>


<style>
  .container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  a {
    text-decoration: underline;
  }
</style>
