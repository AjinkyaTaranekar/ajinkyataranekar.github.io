<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { spotlight } from "$lib/actions/spotlight";
  import type { SkillCategory } from "$lib/types/portfolio";
  import Icon from "./Icon.svelte";
  import SectionHeader from "./SectionHeader.svelte";

  interface Props {
    skillCategories: SkillCategory[];
  }

  let { skillCategories }: Props = $props();

  // Line icons for known categories; anything else falls back to the emoji in the data
  const ICONS: [RegExp, string][] = [
    [/language/i, "code"],
    [/backend/i, "server"],
    [/frontend/i, "layout"],
    [/database|data/i, "database"],
    [/devops|cloud/i, "cloud"],
    [/secur|identity/i, "shield"],
    [/observab|analytic/i, "activity"],
    [/genai|ml|ai\b/i, "brain"],
    [/tool|method/i, "wrench"],
  ];
  const iconFor = (name: string) => ICONS.find(([re]) => re.test(name))?.[1];
</script>

<section id="skills" class="section">
  <div class="container-page">
    <SectionHeader
      index="04"
      label="Skills"
      title="The"
      accent="toolbox."
      description="Breadth across the stack, depth where it matters: distributed backends, data infrastructure and keeping production healthy."
    />

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each skillCategories as category, i}
        {@const icon = iconFor(category.name)}
        <div class="card group p-6" use:spotlight use:reveal={{ delay: (i % 3) * 70 }}>
          <div class="flex items-center justify-between">
            <span class="grid h-10 w-10 place-items-center rounded-xl border bg-surface-2 text-fg transition-colors duration-300 hairline group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
              {#if icon}
                <Icon name={icon} class="h-5 w-5" />
              {:else}
                <span aria-hidden="true">{category.icon}</span>
              {/if}
            </span>
            <span class="font-mono text-2xs text-faint">{String(category.skills.length).padStart(2, "0")}</span>
          </div>
          <h3 class="mt-6 text-lg font-medium tracking-tight">{category.name}</h3>
          <ul class="mt-4 flex flex-wrap gap-1.5">
            {#each category.skills as skill}
              <li class="rounded-md border px-2 py-1 text-xs text-muted transition-colors hairline group-hover:text-fg">
                {skill.name}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>
