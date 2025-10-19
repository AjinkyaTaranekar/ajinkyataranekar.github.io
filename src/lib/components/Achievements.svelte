<script lang="ts">
  import type { Achievement } from "$lib/types/portfolio";
  import { onMount } from "svelte";

  interface Props {
    achievements: Achievement[];
  }

  let { achievements }: Props = $props();
  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });

    const section = document.getElementById("achievements");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section
  id="achievements"
  class="py-12 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
>
  <div class="container mx-auto px-4">
    <div
      class="transform transition-all duration-1000 {visible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'}"
    >
      <h2
        class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12"
      >
        My <span class="text-blue-500">Achievements</span>
      </h2>

      <div class="max-w-4xl mx-auto">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {#each achievements as achievement, i}
            <div
              class="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-5 sm:p-6 transition-all duration-300 hover:shadow-xl"
              style="animation-delay: {i * 200}ms"
            >
              <div class="flex items-center gap-2 mb-3">
                <svg
                  class="w-6 h-6 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <h3
                  class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
                >
                  {achievement.title}
                </h3>
              </div>

              <div class="flex justify-between items-center mb-2">
                <p class="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {achievement.organization}
                </p>
                <span
                  class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
                >
                  {achievement.year}
                </span>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-300">
                {achievement.description}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
