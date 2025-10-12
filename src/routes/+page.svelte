<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import QRCode from '$lib/components/QRCode.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import PhotoCarousel from '$lib/components/PhotoCarousel.svelte';
	import Education from '$lib/components/Education.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let showQR = $state(false);
	let darkMode = $state(false);

	// Initialize theme on mount (client-side only)
	onMount(() => {
		// Check for saved theme preference or default to dark (luxury) mode
		const savedTheme = localStorage.getItem('theme');
		darkMode = savedTheme === 'luxury' || savedTheme === null; // Default to luxury theme
		
		if (darkMode) {
			document.documentElement.setAttribute('data-theme', 'luxury');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
		}
	});

	function toggleTheme() {
		darkMode = !darkMode;
		if (darkMode) {
			document.documentElement.setAttribute('data-theme', 'luxury');
			if (browser) localStorage.setItem('theme', 'luxury');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			if (browser) localStorage.setItem('theme', 'light');
		}
	}
</script>

<div class="min-h-screen bg-base-100 transition-colors duration-300">
	<Navigation {darkMode} {toggleTheme} bind:showQR />
	
	<main>
		<Hero personal={data.portfolio.personal} />
		<About personal={data.portfolio.personal} stats={data.portfolio.stats} />
		<Experience experiences={data.portfolio.experiences} />
		<Projects projects={data.portfolio.projects} />
		<PhotoCarousel photos={data.portfolio.photos} />
		<Education education={data.portfolio.education} />
		<Skills skillCategories={data.portfolio.skillCategories} additionalSkills={data.portfolio.additionalSkills} />
		<Contact personal={data.portfolio.personal} social={data.portfolio.social} />
	</main>

	<!-- Footer with DaisyUI classes -->
	<footer class="footer footer-center bg-base-200 text-base-content p-10">
		<aside>
			<p class="font-semibold text-lg">
				{data.portfolio.personal.name}
			</p>
			<p class="text-base-content/60">
				&copy; {new Date().getFullYear()} {data.portfolio.personal.name}. All rights reserved.
			</p>
			<p class="text-base-content/60 text-sm mt-2">
				Built with ❤️ using SvelteKit, Tailwind CSS & DaisyUI
			</p>
		</aside>
	</footer>

	{#if showQR}
		<QRCode bind:show={showQR} />
	{/if}
</div>
