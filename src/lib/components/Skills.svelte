<script lang="ts">
	import { onMount } from 'svelte';
	import type { SkillCategory } from '$lib/types/portfolio';

	interface Props {
		skillCategories: SkillCategory[];
		additionalSkills: string[];
	}

	let { skillCategories, additionalSkills }: Props = $props();
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visible = true;
				}
			});
		});

		const section = document.getElementById('skills');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="skills" class="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
	<div class="container mx-auto px-4">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
				Technical <span class="text-blue-500">Skills</span>
			</h2>
			<p class="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
				A comprehensive overview of my technical expertise and proficiency levels.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
				{#each skillCategories as category, i}
					<div
						class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl"
						style="animation-delay: {i * 100}ms"
					>
						<div class="flex items-center gap-3 mb-6">
							<span class="text-3xl sm:text-4xl">{category.icon}</span>
							<h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
								{category.name}
							</h3>
						</div>

						<div class="space-y-4">
							{#each category.skills as skill}
								<div>
									<div class="flex justify-between mb-2">
										<span class="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium"
											>{skill.name}</span
										>
										<span class="text-sm sm:text-base text-blue-500 dark:text-blue-400 font-semibold"
											>{skill.level}%</span
										>
									</div>
									<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5 overflow-hidden">
										<div
											class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-2.5 rounded-full transition-all duration-1000 ease-out"
											style="width: {visible ? skill.level : 0}%"
										></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- Additional Skills/Technologies Badge Cloud -->
			<div class="mt-8 sm:mt-12 max-w-6xl mx-auto">
				<h3 class="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 sm:mb-8">
					Other Technologies & Tools
				</h3>
				<div class="flex flex-wrap justify-center gap-2 sm:gap-3">
					{#each additionalSkills as tech}
						<span
							class="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
						>
							{tech}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
