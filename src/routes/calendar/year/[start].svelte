<script context="module" lang="ts">
  import Grid from '$lib/Grid.svelte';
  import Footer from '$lib/Footer.svelte';
  import Month from '$lib/Month.svelte';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ params }) => {
    console.log(params.start);
    const { start } = params;
    const data = {
      title: 'omfg ok d',
      start,
    };
    return {
      props: data,
    };
  };
</script>

<script lang="ts">
  export let start: string;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Bortosky Family" />
</svelte:head>

<Grid>
  <div class="vp">
    {#each Array(12)
      .fill(0)
      .map((_, n) => new Date(Number(start.slice(0, 4)), Number(start.slice(5, 7)) + n - 1, 1))
      .map((d) => d.toISOString().slice(0, 7)) as monthIso}
      <Month {monthIso} />
    {/each}
  </div>
</Grid>

<Footer />

<style>
  .vp {
    display: flex;
    flex-wrap: wrap;
  }
</style>
