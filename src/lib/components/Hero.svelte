<script lang="ts">
	import { onMount } from 'svelte';
	import TypewriterEffect from './TypewriterEffect.svelte';
	import type { PersonalInfo } from '$lib/types/portfolio';

	interface Props {
		personal: PersonalInfo;
	}

	let { personal }: Props = $props();
	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<section
	id="home"
	class="min-h-screen flex items-center justify-center relative overflow-hidden bg-base-100"
>
	<!-- Animated Background - Using DaisyUI theme colors -->
	<div class="absolute inset-0 -z-10">
		<div
			class="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
		></div>
		<div
			class="absolute top-40 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
		></div>
		<div
			class="absolute -bottom-8 left-1/2 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
		></div>
	</div>

	<div class="container mx-auto px-4 text-center">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-base-content mb-4">
				Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{personal.name}</span>
			</h1>
			<div class="text-lg sm:text-xl md:text-2xl text-base-content/80 mb-8 min-h-[2em]">
				<TypewriterEffect text={personal.tagline} speed={50} delay={500} />
			</div>
			<div class="flex flex-wrap justify-center gap-4 mb-8">
				<a
					href="#projects"
					class="btn btn-primary btn-lg text-sm sm:text-base"
				>
					View My Work
				</a>
				<a
					href="#contact"
					class="btn btn-outline btn-primary btn-lg text-sm sm:text-base"
				>
					Get In Touch
				</a>
			</div>
			
			<!-- Scroll Indicator -->
			<div class="mt-16 animate-bounce">
				<svg
					class="w-6 h-6 mx-auto text-base-content/40"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes blob {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	:global(.animate-blob) {
		animation: blob 7s infinite;
	}

	:global(.animation-delay-2000) {
		animation-delay: 2s;
	}

	:global(.animation-delay-4000) {
		animation-delay: 4s;
	}
</style>
