<script context="module" lang="ts">
  import Footer from '$lib/Footer.svelte';
  import Grid from '$lib/Grid.svelte';
  export const prerender = true;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Bortosky Family" />
</svelte:head>


<Grid>
  <h2>Bortosky Family</h2>
  <p>The only information available about the fam at this time is Gary's</p>
  <li><a href="gary">Gary</a></li>
</Grid>

<Footer />
<style>
</style>
