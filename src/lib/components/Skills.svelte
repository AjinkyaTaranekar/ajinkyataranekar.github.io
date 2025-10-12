<script lang="ts">
  import type { SkillCategory } from "$lib/types/portfolio";
  import { onMount } from "svelte";

  interface Props {
    skillCategories: SkillCategory[];
    additionalSkills: string[];
  }

  let { skillCategories, additionalSkills }: Props = $props();
  let visible = $state(false);

  // Helper function to get badge styling based on experience level
  const getExperienceBadge = (level: number) => {
    if (level >= 90) return { label: "Expert", color: "badge-success" };
    if (level >= 80) return { label: "Advanced", color: "badge-primary" };
    if (level >= 70) return { label: "Proficient", color: "badge-info" };
    return { label: "Intermediate", color: "badge-secondary" };
  };

  // Helper function to get years of experience approximation
  const getYearsLabel = (level: number) => {
    if (level >= 90) return "3+ years";
    if (level >= 80) return "2+ years";
    if (level >= 70) return "1+ year";
    return "< 1 year";
  };

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible = true;
        }
      });
    });

    const section = document.getElementById("skills");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<section
  id="skills"
  class="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
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
        Technical <span class="text-primary">Skills</span>
      </h2>
      <p
        class="text-center text-sm sm:text-base text-gray-900 dark:text-white/70 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
      >
        Technologies and tools I work with, organized by experience and
        practical application.
      </p>

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto"
      >
        {#each skillCategories as category, i}
          <div
            class="card bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
            style="animation-delay: {i * 100}ms"
          >
            <div class="card-body">
              <div class="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                <span class="text-3xl sm:text-4xl">{category.icon}</span>
                <h3 class="card-title text-xl sm:text-2xl">
                  {category.name}
                </h3>
              </div>

              <div class="flex flex-wrap gap-3">
                {#each category.skills as skill}
                  {@const badge = getExperienceBadge(skill.level)}
                  {@const years = getYearsLabel(skill.level)}
                  <div
                    class="tooltip tooltip-top"
                    data-tip="{years} experience"
                  >
                    <div
                      class="flex flex-col gap-1 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                    >
                      <span
                        class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white"
                      >
                        {skill.name}
                      </span>
                      <span class="badge {badge.color} badge-sm">
                        {badge.label}
                      </span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Additional Skills/Technologies Badge Cloud -->
      <div class="mt-8 sm:mt-12 max-w-6xl mx-auto">
        <h3
          class="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 sm:mb-8"
        >
          Technologies & Tools
        </h3>
        <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
          {#each additionalSkills as tech}
            <span
              class="badge badge-lg badge-outline dark:bg-gray-800 dark:text-white hover:badge-primary transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {tech}
            </span>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
