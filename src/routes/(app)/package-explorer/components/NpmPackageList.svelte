<script lang="ts">
  import type { Download } from "$lib/project/npm";
  import { formatNumber } from "$lib/shared/utils";

  let { downloads }: { downloads: Download[] } = $props();
</script>

<section class="vp">
  {#each downloads as d}
    <a class="row" href="/package-explorer/?p={d.package}">{d.package}</a>
    <div class="row downloads">{formatNumber(d.downloads)}</div>
  {/each}
</section>

<style lang="scss">
  .vp {
    margin: 1em 0;
    display: grid;
    max-width: 30vw;
    grid-template-columns: 2fr 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
    align-items: center;
  }
  a {
    text-decoration: underline;
  }
  .downloads {
    justify-self: flex-end;
  }
</style>
