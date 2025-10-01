<script lang="ts">
	import { onMount } from 'svelte';
	import type { PersonalInfo, Stats } from '$lib/types/portfolio';

	interface Props {
		personal: PersonalInfo;
		stats: Stats;
	}

	let { personal, stats }: Props = $props();
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visible = true;
				}
			});
		});

		const section = document.getElementById('about');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});

	// Extract initials from name
	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase();
	};
</script>

<section id="about" class="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
	<div class="container mx-auto px-4">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
				About <span class="text-blue-500">Me</span>
			</h2>

			<div class="max-w-4xl mx-auto">
				<div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 sm:p-8 transition-colors duration-300">
					<div class="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
						<div class="w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl sm:text-6xl font-bold shrink-0">
							{getInitials(personal.name)}
						</div>

						<div class="flex-1">
							<h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
								{personal.title}
							</h3>
							{#each personal.bio as paragraph}
								<p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
									{paragraph}
								</p>
							{/each}
						</div>
					</div>

					<div class="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
						<div class="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="text-2xl sm:text-3xl font-bold text-blue-500">{stats.projects}</div>
							<div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Projects</div>
						</div>
						<div class="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="text-2xl sm:text-3xl font-bold text-purple-500">{stats.technologies}</div>
							<div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Technologies</div>
						</div>
						<div class="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="text-2xl sm:text-3xl font-bold text-green-500">{stats.dedication}</div>
							<div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Dedication</div>
						</div>
						<div class="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="text-2xl sm:text-3xl font-bold text-pink-500">{stats.learning}</div>
							<div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Learning</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
