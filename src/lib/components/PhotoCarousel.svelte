<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { Photo } from '$lib/types/portfolio';

	interface Props {
		photos: Photo[];
	}

	let { photos }: Props = $props();
	let currentIndex = $state(0);
	let visible = $state(false);
	let autoplayInterval: NodeJS.Timeout | null = null;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					visible = true;
					startAutoplay();
				} else {
					stopAutoplay();
				}
			});
		});

		const section = document.getElementById('photos');
		if (section) observer.observe(section);

		return () => {
			observer.disconnect();
			stopAutoplay();
		};
	});

	onDestroy(() => {
		stopAutoplay();
	});

	function startAutoplay() {
		stopAutoplay(); // Clear any existing interval
		autoplayInterval = setInterval(() => {
			nextSlide();
		}, 4000); // Change slide every 4 seconds
	}

	function stopAutoplay() {
		if (autoplayInterval) {
			clearInterval(autoplayInterval);
			autoplayInterval = null;
		}
	}

	function nextSlide() {
		currentIndex = (currentIndex + 1) % photos.length;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + photos.length) % photos.length;
	}

	function goToSlide(index: number) {
		currentIndex = index;
		stopAutoplay();
		setTimeout(startAutoplay, 5000); // Resume autoplay after 5 seconds
	}

	function handleMouseEnter() {
		stopAutoplay();
	}

	function handleMouseLeave() {
		startAutoplay();
	}
</script>

<section id="photos" class="py-12 sm:py-20 bg-base-100 transition-colors duration-300">
	<div class="container mx-auto px-4">
		<div class="transform transition-all duration-1000 {visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<h2 class="text-3xl sm:text-4xl font-bold text-center text-base-content mb-4">
				My <span class="text-primary">Photography</span>
			</h2>
			<p class="text-center text-sm sm:text-base text-base-content/70 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
				Capturing moments and places that inspire me. A glimpse into my adventures and explorations.
			</p>

			<div class="max-w-5xl mx-auto">
				<!-- Carousel Container -->
				<div
					class="carousel w-full rounded-2xl shadow-2xl bg-base-200 overflow-hidden"
					onmouseenter={handleMouseEnter}
					onmouseleave={handleMouseLeave}
				>
					<div class="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
						{#each photos as photo, index}
							<div
								class="carousel-item absolute w-full h-full transition-opacity duration-700 {index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}"
							>
								<img
									src={photo.url}
									alt={photo.caption}
									class="w-full h-full object-cover"
									loading="lazy"
								/>
								<!-- Photo Info Overlay -->
								<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-300/95 to-transparent p-4 sm:p-6">
									<h3 class="text-lg sm:text-xl font-bold text-base-content">{photo.caption}</h3>
									{#if photo.location}
										<p class="text-sm sm:text-base text-base-content/70 flex items-center gap-2 mt-1">
											<svg
												class="w-4 h-4"
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
											{photo.location}
											{#if photo.date}
												<span class="ml-2">• {photo.date}</span>
											{/if}
										</p>
									{/if}
								</div>
							</div>
						{/each}

						<!-- Navigation Arrows -->
						<button
							onclick={prevSlide}
							class="btn btn-circle btn-sm sm:btn-md absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-base-100/80 hover:bg-base-100 border-none z-20"
							aria-label="Previous photo"
						>
							<svg
								class="w-5 h-5 sm:w-6 sm:h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button
							onclick={nextSlide}
							class="btn btn-circle btn-sm sm:btn-md absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-base-100/80 hover:bg-base-100 border-none z-20"
							aria-label="Next photo"
						>
							<svg
								class="w-5 h-5 sm:w-6 sm:h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</div>

				<!-- Indicators -->
				<div class="flex justify-center gap-2 mt-6">
					{#each photos as photo, index}
						<button
							onclick={() => goToSlide(index)}
							class="btn btn-xs {index === currentIndex ? 'btn-primary' : 'btn-outline'}"
							aria-label="Go to photo {index + 1}"
						>
						</button>
					{/each}
				</div>

				<!-- Photo Count -->
				<div class="text-center mt-4 text-sm text-base-content/60">
					{currentIndex + 1} / {photos.length}
				</div>
			</div>
		</div>
	</div>
</section>
