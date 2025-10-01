<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<section
	id="home"
	class="min-h-screen flex items-center justify-center relative overflow-hidden"
>
	<!-- Animated Background -->
	<div class="absolute inset-0 -z-10">
		<div
			class="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"
		></div>
		<div
			class="absolute top-40 right-10 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"
		></div>
		<div
			class="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"
		></div>
	</div>

	<div class="container mx-auto px-4 text-center">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
				Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Ajinkya Taranekar</span>
			</h1>
			<p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
				Computer Science Engineer | Full Stack Developer | Tech Enthusiast
			</p>
			<div class="flex flex-wrap justify-center gap-4 mb-8">
				<a
					href="#projects"
					class="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
				>
					View My Work
				</a>
				<a
					href="#contact"
					class="px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105"
				>
					Get In Touch
				</a>
			</div>
			
			<!-- Scroll Indicator -->
			<div class="mt-16 animate-bounce">
				<svg
					class="w-6 h-6 mx-auto text-gray-400 dark:text-gray-500"
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
