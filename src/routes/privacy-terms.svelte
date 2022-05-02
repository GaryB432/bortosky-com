<script context="module" lang="ts">
	import Crumbs from '$lib/Crumbs.svelte';
	import Footer from '$lib/Footer.svelte';
	export const prerender = true;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Bortosky Family" />
</svelte:head>

<div class="bort-container mdl-grid">
	<div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
	<div
		class="bort-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
	>
		<Crumbs />
		<h2>Privacy Terms</h2>
		<p>We do not store anything</p>
	</div>
</div>

<Footer />

<style>
</style>
