<script lang="ts">
  import type { Project } from "$lib/types/portfolio";
  import { onMount } from "svelte";

  interface Props {
    projects: Project[];
  }

  let { projects }: Props = $props();
  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });

    const section = document.getElementById("projects");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section
  id="projects"
  class="py-12 sm:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
>
  <div class="container mx-auto px-4">
    <div
      class="transform transition-all duration-1000 {visible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'}"
    >
      <h2
        class="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4"
      >
        My <span class="text-blue-500">Projects</span>
      </h2>
      <p
        class="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
      >
        Here are some of my recent projects that showcase my skills and passion
        for development.
      </p>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6"
      >
        {#each projects as project, i}
          <div
            class="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl transform-gpu hover:-translate-y-1 {project.featured
              ? 'md:col-span-2'
              : ''}"
            style="animation-delay: {i * 100}ms"
          >
            <div
              class={project.featured
                ? "md:flex flex-col md:flex-row"
                : "flex flex-col"}
            >
              <div
                class="relative {project.featured
                  ? 'md:w-1/2'
                  : 'w-full'} h-48 sm:h-56 md:h-64 overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
                {#if project.featured}
                  <div
                    class="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white text-xs sm:text-sm font-semibold rounded-full"
                  >
                    Featured
                  </div>
                {/if}
              </div>

              <div class="p-4 sm:p-6 {project.featured ? 'md:w-1/2' : ''}">
                <h3
                  class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3"
                >
                  {project.title}
                </h3>
                <p
                  class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4"
                >
                  {project.description}
                </p>

                <div class="flex flex-wrap gap-2 mb-4">
                  {#each project.technologies as tech}
                    <span
                      class="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  {/each}
                </div>

                <div class="flex flex-wrap gap-2 sm:gap-4">
                  {#if project.github}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <svg
                        class="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        ><path
                          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                        /></svg
                      >
                      <span class="inline">GitHub</span>
                    </a>
                  {/if}
                  {#if project.demo}
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <svg
                        class="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        /></svg
                      >
                      <span class="inline">Demo</span>
                    </a>
                  {/if}
                  {#if project.document}
                    <a
                      href={project.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm flex-1 sm:flex-none"
                    >
                      <svg
                        class="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        /></svg
                      >
                      <span class="inline">Document</span>
                    </a>
                  {/if}
                  {#if project.link}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                    >
                      <svg
                        class="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        ><path
                          d="M3.27 12C2.48 11.05 2 9.83 2 8.5C2 5.48 4.47 3 7.5 3H12.5C15.52 3 18 5.48 18 8.5C18 11.52 15.53 14 12.5 14H10"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.73 12C21.52 12.95 22 14.17 22 15.5C22 18.52 19.53 21 16.5 21H11.5C8.48 21 6 18.52 6 15.5C6 12.48 8.47 10 11.5 10H14"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <span class="inline">Link</span>
                    </a>
                  {/if}
                </div>
                {#if project.winner}
                  <div
                    class="mt-2 text-xs sm:text-sm font-semibold text-yellow-600 dark:text-yellow-400"
                  >
                    🏆 {project.winner}
                  </div>
                {/if}
                <!-- Render any extra keys dynamically -->
                <div class="mt-2 text-xs text-gray-500">
                  {#each Object.entries(project) as [key, value]}
                    {#if !["title", "description", "image", "technologies", "github", "demo", "document", "link", "winner", "featured"].includes(key)}
                      <div>
                        <span class="font-semibold">{key}:</span>
                        {value}
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
