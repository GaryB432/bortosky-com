<script context="module" lang="ts">
  import Grid from '$lib/Grid.svelte';
  import Footer from '$lib/Footer.svelte';
  import Month from '$lib/Month.svelte';
  // export const prerender = true;

  import type { Load } from '@sveltejs/kit';
  import { each } from 'svelte/internal';

  // export async function load({ params }){

  // }

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
  export let title = 'unset';
  export let start: string;
  $: months = [start];
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Bortosky Family" />
</svelte:head>

<Grid>
  <h2>Bortosky Family</h2>
  {#each months as monthIso}
    <Month {monthIso} />
  {/each}
</Grid>

<Footer />

<style>
</style>
