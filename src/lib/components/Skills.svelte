<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	const skillCategories = [
		{
			name: 'Frontend Development',
			icon: '🎨',
			skills: [
				{ name: 'React', level: 90 },
				{ name: 'Vue.js', level: 85 },
				{ name: 'Svelte', level: 80 },
				{ name: 'TypeScript', level: 88 },
				{ name: 'Tailwind CSS', level: 92 },
				{ name: 'HTML/CSS', level: 95 }
			]
		},
		{
			name: 'Backend Development',
			icon: '⚙️',
			skills: [
				{ name: 'Node.js', level: 88 },
				{ name: 'Python', level: 85 },
				{ name: 'Express.js', level: 87 },
				{ name: 'FastAPI', level: 82 },
				{ name: 'REST APIs', level: 90 },
				{ name: 'GraphQL', level: 78 }
			]
		},
		{
			name: 'Database & Cloud',
			icon: '☁️',
			skills: [
				{ name: 'MongoDB', level: 85 },
				{ name: 'PostgreSQL', level: 83 },
				{ name: 'Redis', level: 75 },
				{ name: 'AWS', level: 80 },
				{ name: 'Docker', level: 82 },
				{ name: 'Firebase', level: 88 }
			]
		},
		{
			name: 'Tools & Others',
			icon: '🛠️',
			skills: [
				{ name: 'Git', level: 90 },
				{ name: 'CI/CD', level: 80 },
				{ name: 'Linux', level: 85 },
				{ name: 'Jest', level: 82 },
				{ name: 'Webpack', level: 78 },
				{ name: 'Agile', level: 88 }
			]
		}
	];

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

<section id="skills" class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
	<div class="container mx-auto px-4">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h2 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
				Technical <span class="text-blue-500">Skills</span>
			</h2>
			<p class="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
				A comprehensive overview of my technical expertise and proficiency levels.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
				{#each skillCategories as category, i}
					<div
						class="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl"
						style="animation-delay: {i * 100}ms"
					>
						<div class="flex items-center gap-3 mb-6">
							<span class="text-4xl">{category.icon}</span>
							<h3 class="text-2xl font-bold text-gray-900 dark:text-white">
								{category.name}
							</h3>
						</div>

						<div class="space-y-4">
							{#each category.skills as skill}
								<div>
									<div class="flex justify-between mb-2">
										<span class="text-gray-700 dark:text-gray-300 font-medium"
											>{skill.name}</span
										>
										<span class="text-blue-500 dark:text-blue-400 font-semibold"
											>{skill.level}%</span
										>
									</div>
									<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
										<div
											class="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
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
			<div class="mt-12 max-w-6xl mx-auto">
				<h3 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
					Other Technologies & Tools
				</h3>
				<div class="flex flex-wrap justify-center gap-3">
					{#each [
						'JavaScript',
						'Python',
						'Java',
						'C++',
						'React Native',
						'Next.js',
						'Nuxt.js',
						'SvelteKit',
						'Material-UI',
						'Bootstrap',
						'SASS',
						'Vite',
						'Webpack',
						'Babel',
						'ESLint',
						'Prettier',
						'Jest',
						'Cypress',
						'Playwright',
						'GitHub Actions',
						'Jenkins',
						'Nginx',
						'Apache',
						'MySQL',
						'SQLite',
						'Prisma',
						'Sequelize',
						'JWT',
						'OAuth',
						'WebSockets',
						'Socket.io',
						'Vercel',
						'Netlify',
						'Heroku',
						'DigitalOcean'
					] as tech}
						<span
							class="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
						>
							{tech}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
