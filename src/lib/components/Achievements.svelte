<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { spotlight } from "$lib/actions/spotlight";
  import type { Achievement } from "$lib/types/portfolio";
  import Icon from "./Icon.svelte";

  interface Props {
    achievements: Achievement[];
  }

  let { achievements }: Props = $props();

  // Balanced rows on a 6-column grid: thirds, with the remainder split in halves
  function span(i: number, n: number) {
    const halves = n % 3 === 2 ? 2 : n % 3 === 1 ? 4 : 0;
    return i >= n - halves ? "lg:col-span-3" : "lg:col-span-2";
  }
</script>

<section id="achievements" class="relative pb-24 sm:pb-32" aria-labelledby="achievements-title">
  <div class="container-page">
    <div class="mb-8 flex items-center gap-4" use:reveal>
      <h3 id="achievements-title" class="font-mono text-xs uppercase tracking-[0.18em] text-muted">Recognition</h3>
      <span class="h-px flex-1 bg-fg/10"></span>
    </div>

    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
      {#each achievements as achievement, i}
        <article class="card group relative overflow-hidden p-6 sm:p-7 {span(i, achievements.length)}" use:spotlight use:reveal={{ delay: i * 80 }}>
          <!-- Oversized outlined year in the corner -->
          <span class="year pointer-events-none absolute right-4 top-3 select-none font-mono text-6xl font-semibold transition-transform duration-700 ease-out group-hover:-translate-x-2" aria-hidden="true">
            {achievement.year}
          </span>
          <span class="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-accent-ink">
            <Icon name="trophy" class="h-5 w-5" />
          </span>
          <h4 class="mt-8 text-xl font-medium tracking-tight">{achievement.title}</h4>
          <p class="mt-1 font-mono text-2xs uppercase tracking-wider text-faint">
            {achievement.organization} · {achievement.year}
          </p>
          <p class="mt-4 text-sm leading-relaxed text-muted">{achievement.description}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .year {
    color: transparent;
    -webkit-text-stroke: 1px rgb(var(--line) / 0.1);
  }
</style>
