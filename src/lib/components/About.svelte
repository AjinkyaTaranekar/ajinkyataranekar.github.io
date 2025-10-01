<script lang="ts">
	let visible = $state(false);

	import { onMount } from 'svelte';

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
</script>

<section id="about" class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
	<div class="container mx-auto px-4">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h2 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
				About <span class="text-blue-500">Me</span>
			</h2>

			<div class="max-w-4xl mx-auto">
				<div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 transition-colors duration-300">
					<div class="flex flex-col md:flex-row gap-8 items-center">
						<div class="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl font-bold shrink-0">
							AT
						</div>

						<div class="flex-1">
							<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
								Computer Science Engineer
							</h3>
							<p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
								I'm a passionate Computer Science Engineer with a deep love for technology and innovation. 
								My journey in the world of programming began with curiosity and evolved into a commitment 
								to creating impactful solutions.
							</p>
							<p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
								I specialize in full-stack development, with expertise in modern web technologies, 
								cloud platforms, and software architecture. I believe in writing clean, efficient code 
								and staying updated with the latest industry trends.
							</p>
							<p class="text-gray-600 dark:text-gray-300 leading-relaxed">
								When I'm not coding, you can find me exploring new technologies, contributing to 
								open-source projects, or sharing knowledge with the developer community.
							</p>
						</div>
					</div>

					<div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="text-3xl font-bold text-blue-500">5+</div>
							<div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Projects</div>
						</div>
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="text-3xl font-bold text-purple-500">10+</div>
							<div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Technologies</div>
						</div>
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="text-3xl font-bold text-green-500">100%</div>
							<div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Dedication</div>
						</div>
						<div class="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="text-3xl font-bold text-pink-500">∞</div>
							<div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Learning</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
