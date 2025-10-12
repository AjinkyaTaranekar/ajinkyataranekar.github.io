<script lang="ts">
	import { onMount } from 'svelte';
	import type { PersonalInfo, SocialLinks } from '$lib/types/portfolio';

	interface Props {
		personal: PersonalInfo;
		social: SocialLinks;
	}

	let { personal, social }: Props = $props();
	let visible = $state(false);

	const socialLinksData = [
		{
			name: 'GitHub',
			url: social.github,
			icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
			color: 'hover:bg-gray-900 dark:hover:bg-gray-600'
		},
		{
			name: 'LinkedIn',
			url: social.linkedin,
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
			color: 'hover:bg-blue-600'
		}
	];

	if (social.twitter) {
		socialLinksData.push({
			name: 'Twitter',
			url: social.twitter,
			icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
			color: 'hover:bg-sky-500'
		});
	}

	socialLinksData.push({
		name: 'Email',
		url: `mailto:${personal.email}`,
		icon: 'M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z',
		color: 'hover:bg-red-500'
	});

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visible = true;
				}
			});
		});

		const section = document.getElementById('contact');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="contact" class="py-12 sm:py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
	<div class="container mx-auto px-4">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h2 class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
				Get In <span class="text-blue-500">Touch</span>
			</h2>
			<p class="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
				I'm always open to discussing new projects, creative ideas, or opportunities to be part of
				your visions.
			</p>

			<div class="max-w-4xl mx-auto">
				<!-- Contact Info -->
				<div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 rounded-xl p-6 sm:p-8">
					<h3 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>

					<div class="space-y-4">
						<div class="flex items-start gap-4">
							<div
								class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center shrink-0"
							>
								<svg
									class="w-5 h-5 sm:w-6 sm:h-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Email</h4>
								<a
									href="mailto:{personal.email}"
									class="text-sm sm:text-base text-blue-500 dark:text-blue-400 hover:underline break-all"
									>{personal.email}</a
								>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div
								class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-lg flex items-center justify-center shrink-0"
							>
								<svg
									class="w-5 h-5 sm:w-6 sm:h-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Location</h4>
								<p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">{personal.location}</p>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div
								class="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0"
							>
								<svg
									class="w-5 h-5 sm:w-6 sm:h-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">Availability</h4>
								<p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">{personal.availability}</p>
							</div>
						</div>
					</div>

					<!-- Social Links -->
					<div class="mt-6 sm:mt-8">
						<h4 class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-4">Connect with me</h4>
						<div class="flex flex-wrap gap-3">
							{#each socialLinksData as socialLink}
								<a
									href={socialLink.url}
									target="_blank"
									rel="noopener noreferrer"
									class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 {socialLink.color} hover:scale-110"
									aria-label={socialLink.name}
								>
									<svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
										<path d={socialLink.icon} />
									</svg>
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
