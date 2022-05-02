<script context="module" lang="ts">
	import Crumbs from '$lib/Crumbs.svelte';
	import Footer from '$lib/Footer.svelte';
	export const prerender = true;
</script>

<script lang="ts">
	import { select_options } from 'svelte/internal';

	type VCard = string[];

	interface QROptions {
		caption: string;
		from: string;
		src: string;
	}

	export function getVCardUrl(vcard: VCard): URL {
		const chl = ['BEGIN:VCARD', 'VERSION:3.0', ...vcard, 'END:VCARD'].join('\n');

		const u = new URL('w/chart', 'https://zxing.org');
		u.searchParams.append('cht', 'qr');
		u.searchParams.append('chs', '350x350');
		u.searchParams.append('chld', 'L');
		u.searchParams.append('choe', 'UTF-8');
		u.searchParams.append('chl', chl);
		return u;
	}

	export function addQR(options: QROptions, n = 0): void {
		// const qrs = document.querySelector<HTMLDivElement>('.qrs');

		console.log(options, n);

		// // if (qrs) {
		// 	const f = new DocumentFragment();
		// 	const dqr = document.createElement('div');
		// 	dqr.classList.add('qr');
		// 	const img = document.createElement('img');
		// 	img.setAttribute('id', `contact${n}`);
		// 	img.setAttribute('src', options.src);
		// 	img.setAttribute('alt', `contact qr ${n}`);
		// 	img.setAttribute('title', options.from);
		// 	const cap = document.createElement('div');
		// 	cap.classList.add('caption');
		// 	cap.textContent = options.caption;

		// 	dqr.appendChild(img);
		// 	dqr.appendChild(cap);
		// 	f.appendChild(dqr);
		// 	// qrs.appendChild(f);
		// // }
	}

	const qrs: QROptions[] = [
		{
			src: 'gary/qr/minimal-a.png',
			from: 'https://www.qrcode-monkey.com/#',
			caption: 'contact a'
		},
		{
			src: getVCardUrl([
				'N:Gary Bortosky',
				'TEL:13146090415',
				'URL:bortosky.com/gary',
				'EMAIL:gary@bortosky.com'
			]).toString(),
			from: 'https://zxing.org',
			caption: 'contact b'
		}
	];
	qrs.forEach(addQR);
	// const sorter = document.querySelector<HTMLTextAreaElement>('section.sorter > textarea');
	// const button = document.querySelector<HTMLButtonElement>('section.sorter > button');
	// if (sorter && button) {
	// 	button.addEventListener('click', () => {
	// 		sorter.value = sorter.value.split('\n').sort().join('\n');
	// 	});
	// }

	// if (document.readyState === 'loading') {
	// 	document.addEventListener('DOMContentLoaded', main);
	// } else {
	// 	main();
	// }
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Gary Bortosky" />
</svelte:head>

<div class="bort-container mdl-grid">
	<div class="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
	<div
		class="bort-content mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--8-col"
	>
		<Crumbs />
		<h2>Projects</h2>
		<ul>
			<li><a href="theater">Theater</a></li>
		</ul>
		<h2>Contact</h2>
		<section class="qrs">
			{#each qrs as qr}
				<div class="qr">
					<img src={qr.src} alt="qr" title={qr.from} />
					<div class="caption">{qr.caption}</div>
				</div>
			{/each}
		</section>
		<h2>Sorter</h2>
		<section class="sorter">
			<textarea cols="40" rows="5" />
			<button>Sort</button>
		</section>
	</div>
</div>

<Footer />

<style lang="scss">
	.qrs {
		align-items: center;
		flex-direction: column;
		display: flex;
		gap: 5em;
		.qr {
			img {
				width: 300px;
				height: 300px;
			}
			.caption {
				font-size: 2rem;
				text-align: center;
			}
		}
	}
</style>
