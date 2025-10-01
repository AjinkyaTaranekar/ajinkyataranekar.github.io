<script lang="ts">
	import { onMount } from 'svelte';
	import QRCode from '$lib/components/QRCode.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Education from '$lib/components/Education.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	let showQR = $state(false);
	let darkMode = $state(false);

	onMount(() => {
		// Check for saved theme preference or default to light mode
		darkMode = localStorage.getItem('theme') === 'dark';
		if (darkMode) {
			document.documentElement.classList.add('dark');
		}
	});

	function toggleTheme() {
		darkMode = !darkMode;
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
	<Navigation {darkMode} {toggleTheme} bind:showQR />
	
	<main>
		<Hero />
		<About />
		<Experience />
		<Projects />
		<Education />
		<Skills />
		<Contact />
	</main>

	<footer class="bg-gray-100 dark:bg-gray-800 py-8 transition-colors duration-300">
		<div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
			<p>&copy; {new Date().getFullYear()} Ajinkya Taranekar. All rights reserved.</p>
			<p class="mt-2 text-sm">Built with ❤️ using SvelteKit & Tailwind CSS</p>
		</div>
	</footer>

	{#if showQR}
		<QRCode bind:show={showQR} />
	{/if}
</div>
