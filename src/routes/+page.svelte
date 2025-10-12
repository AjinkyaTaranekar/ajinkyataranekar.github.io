<script lang="ts">
	import { onMount } from 'svelte';
	import { portfolio } from '$lib/stores/portfolio';
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

	let showQR = $state(false);
	let darkMode = $state(false);

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
			localStorage.setItem('theme', 'luxury');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<div class="min-h-screen bg-base-100 transition-colors duration-300">
	<Navigation {darkMode} {toggleTheme} bind:showQR />
	
	<main>
		<Hero personal={$portfolio.personal} />
		<About personal={$portfolio.personal} stats={$portfolio.stats} />
		<Experience experiences={$portfolio.experiences} />
		<Projects projects={$portfolio.projects} />
		<PhotoCarousel photos={$portfolio.photos} />
		<Education education={$portfolio.education} />
		<Skills skillCategories={$portfolio.skillCategories} additionalSkills={$portfolio.additionalSkills} />
		<Contact personal={$portfolio.personal} social={$portfolio.social} />
	</main>

	<footer class="bg-base-200 py-6 sm:py-8 transition-colors duration-300">
		<div class="container mx-auto px-4 text-center text-base-content/60">
			<p class="text-sm sm:text-base">&copy; {new Date().getFullYear()} {$portfolio.personal.name}. All rights reserved.</p>
			<p class="mt-2 text-xs sm:text-sm">Built with ❤️ using SvelteKit & Tailwind CSS</p>
		</div>
	</footer>

	{#if showQR}
		<QRCode bind:show={showQR} />
	{/if}
</div>
