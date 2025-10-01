<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	const projects = [
		{
			title: 'E-Commerce Platform',
			description:
				'A full-featured e-commerce platform with real-time inventory management, payment integration, and admin dashboard.',
			image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
			technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
			github: 'https://github.com',
			demo: 'https://demo.com',
			featured: true
		},
		{
			title: 'Task Management App',
			description:
				'Collaborative task management application with real-time updates, team collaboration features, and analytics.',
			image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
			technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
			github: 'https://github.com',
			demo: 'https://demo.com',
			featured: true
		},
		{
			title: 'AI Chat Bot',
			description:
				'Intelligent chatbot using natural language processing for customer support automation.',
			image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
			technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
			github: 'https://github.com',
			demo: 'https://demo.com',
			featured: false
		},
		{
			title: 'Weather Dashboard',
			description:
				'Real-time weather dashboard with forecasts, maps, and historical data visualization.',
			image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop',
			technologies: ['Svelte', 'TypeScript', 'D3.js', 'API Integration'],
			github: 'https://github.com',
			demo: 'https://demo.com',
			featured: false
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

		const section = document.getElementById('projects');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="projects" class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
	<div class="container mx-auto px-4">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h2 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
				My <span class="text-blue-500">Projects</span>
			</h2>
			<p class="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
				Here are some of my recent projects that showcase my skills and passion for development.
			</p>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
				{#each projects as project, i}
					<div
						class="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 {project.featured ? 'md:col-span-2' : ''}"
						style="animation-delay: {i * 100}ms"
					>
						<div class="{project.featured ? 'md:flex' : ''}">
							<div class="relative {project.featured ? 'md:w-1/2' : 'w-full'} h-64 overflow-hidden">
								<img
									src={project.image}
									alt={project.title}
									class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
								/>
								{#if project.featured}
									<div
										class="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full"
									>
										Featured
									</div>
								{/if}
							</div>

							<div class="p-6 {project.featured ? 'md:w-1/2' : ''}">
								<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
									{project.title}
								</h3>
								<p class="text-gray-600 dark:text-gray-300 mb-4">
									{project.description}
								</p>

								<div class="flex flex-wrap gap-2 mb-4">
									{#each project.technologies as tech}
										<span
											class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
										>
											{tech}
										</span>
									{/each}
								</div>

								<div class="flex gap-4">
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
									>
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
											/>
										</svg>
										GitHub
									</a>
									<a
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
									>
										<svg
											class="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
										Demo
									</a>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
