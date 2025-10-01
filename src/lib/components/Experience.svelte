<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	const experiences = [
		{
			title: 'Senior Software Engineer',
			company: 'Tech Corp',
			period: '2023 - Present',
			description:
				'Leading development of scalable web applications using modern tech stack. Mentoring junior developers and implementing best practices.',
			technologies: ['React', 'Node.js', 'TypeScript', 'AWS'],
			type: 'work'
		},
		{
			title: 'Full Stack Developer',
			company: 'Innovation Labs',
			period: '2021 - 2023',
			description:
				'Built and maintained multiple client projects. Implemented CI/CD pipelines and improved application performance by 40%.',
			technologies: ['Vue.js', 'Python', 'Docker', 'PostgreSQL'],
			type: 'work'
		},
		{
			title: 'Software Development Intern',
			company: 'StartUp Inc',
			period: '2020 - 2021',
			description:
				'Contributed to the development of core features. Worked on frontend and backend components.',
			technologies: ['JavaScript', 'Express.js', 'MongoDB', 'Git'],
			type: 'internship'
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

		const section = document.getElementById('experience');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="experience" class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
	<div class="container mx-auto px-4">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h2 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
				My <span class="text-blue-500">Experience</span>
			</h2>

			<div class="max-w-4xl mx-auto">
				<div class="relative">
					<!-- Timeline line -->
					<div
						class="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-500"
					></div>

					{#each experiences as exp, i}
						<div
							class="relative mb-8 md:mb-12 {i % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}"
							style="animation-delay: {i * 200}ms"
						>
							<div class="flex items-center mb-4">
								<div
									class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center z-10 shrink-0 {i % 2 === 0 ? 'md:ml-auto md:mr-8' : 'md:ml-8'}"
								>
									{#if exp.type === 'work'}
										<svg
											class="w-8 h-8 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
									{:else}
										<svg
											class="w-8 h-8 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
											/>
										</svg>
									{/if}
								</div>
							</div>

							<div
								class="ml-24 md:ml-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
							>
								<div class="flex justify-between items-start mb-2">
									<h3 class="text-xl font-bold text-gray-900 dark:text-white">
										{exp.title}
									</h3>
									<span
										class="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
									>
										{exp.period}
									</span>
								</div>
								<p class="text-blue-500 dark:text-blue-400 font-semibold mb-3">
									{exp.company}
								</p>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									{exp.description}
								</p>
								<div class="flex flex-wrap gap-2">
									{#each exp.technologies as tech}
										<span
											class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
										>
											{tech}
										</span>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
