<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { spotlight } from "$lib/actions/spotlight";
  import type { Education } from "$lib/types/portfolio";
  import Icon from "./Icon.svelte";
  import SectionHeader from "./SectionHeader.svelte";

  interface Props {
    education: Education[];
  }

  let { education }: Props = $props();
</script>

<section id="education" class="section !pb-16 sm:!pb-20">
  <div class="container-page">
    <SectionHeader
      index="05"
      label="Education"
      title="Always"
      accent="learning."
      description="A gold medal in Computer Science, then a master's in future networked systems with a 1:1 Distinction."
    />

    <div class="grid gap-5 lg:grid-cols-2">
      {#each education as edu, i}
        <article class="card flex flex-col p-6 sm:p-8" use:spotlight use:reveal={{ delay: i * 90 }}>
          <div class="flex items-start justify-between gap-4">
            {#if edu.institutionLogo}
              <div class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-black/5">
                <img src={edu.institutionLogo} alt="{edu.institution} logo" class="h-full w-full object-contain" loading="lazy" />
              </div>
            {:else}
              <div class="grid h-14 w-14 place-items-center rounded-2xl bg-surface-2">
                <Icon name="graduation-cap" class="h-6 w-6" />
              </div>
            {/if}
            <span class="font-mono text-2xs text-faint">{edu.period}</span>
          </div>

          <h3 class="mt-6 text-xl font-medium leading-snug tracking-tight sm:text-2xl">{edu.degree}</h3>
          <p class="mt-1 text-muted">{edu.institution}</p>
          <p class="mt-1 flex items-center gap-1.5 text-sm text-faint">
            <Icon name="pin" class="h-3.5 w-3.5" />
            {edu.location}
          </p>

          <div class="mt-5">
            <span class="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 font-mono text-xs text-accent-ink">
              {edu.grade}
            </span>
          </div>

          <p class="mt-5 leading-relaxed text-muted">{edu.description}</p>

          {#if edu.achievements.length}
            <ul class="mt-6 space-y-2.5 border-t pt-6 hairline">
              {#each edu.achievements as achievement}
                <li class="flex gap-3 text-sm leading-relaxed text-muted">
                  <Icon name="check" class="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" strokeWidth={2} />
                  {achievement}
                </li>
              {/each}
            </ul>
          {/if}
        </article>
      {/each}
    </div>
  </div>
</section>
