<script lang="ts">
  import type { Education } from "$lib/types/portfolio";
  import { onMount } from "svelte";

  interface Props {
    education: Education[];
  }

  let { education }: Props = $props();
  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });

    const section = document.getElementById("education");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section
  id="education"
  class="py-12 sm:py-20 bg-white dark:bg-gray-800 transition-colors duration-300"
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
        My <span class="text-blue-500">Education</span>
      </h2>

      <div class="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {#each education as edu, i}
          <div
            class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl"
            style="animation-delay: {i * 200}ms"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4"
            >
              <div class="flex-1 w-full">
                <div class="flex items-start gap-3 mb-2">
                  <div
                    class="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center shrink-0 overflow-hidden"
                  >
                    {#if edu.institutionLogo}
                      <img
                        src={edu.institutionLogo}
                        alt="{edu.institution} logo"
                        class="w-full h-full object-contain p-1"
                      />
                    {:else}
                      <svg
                        class="w-5 h-5 sm:w-6 sm:h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    {/if}
                  </div>
                  <h3
                    class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    {edu.degree}
                  </h3>
                </div>
                <p
                  class="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2 ml-13"
                >
                  {edu.institution}
                </p>
              </div>
              <div
                class="flex flex-row sm:flex-col gap-2 w-full sm:w-auto sm:items-end"
              >
                <span
                  class="px-3 sm:px-4 py-1 bg-blue-500 text-white rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap"
                >
                  {edu.period}
                </span>
                <span
                  class="px-3 sm:px-4 py-1 bg-green-500 text-white rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap"
                >
                  {edu.grade}
                </span>
              </div>
            </div>

            <p
              class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4"
            >
              {edu.description}
            </p>

            <div class="space-y-2">
              <h4
                class="font-semibold text-sm sm:text-base text-gray-900 dark:text-white"
              >
                Achievements:
              </h4>
              <ul class="space-y-1">
                {#each edu.achievements as achievement}
                  <li
                    class="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300"
                  >
                    <svg
                      class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>{achievement}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
