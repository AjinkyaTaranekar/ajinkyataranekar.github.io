<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import type { PersonalInfo, Signals, Stats } from "$lib/types/portfolio";
  import CountUp from "./CountUp.svelte";
  import Icon from "./Icon.svelte";
  import SectionHeader from "./SectionHeader.svelte";

  interface Props {
    personal: PersonalInfo;
    stats: Stats;
    signals?: Signals;
  }

  let { personal, stats, signals }: Props = $props();

  const statEntries = $derived([
    { label: "Experience", value: stats.experience },
    { label: "Projects", value: stats.projects },
    { label: "Technologies", value: stats.technologies },
    { label: "Learning", value: stats.learning },
  ]);

  const lead = $derived(personal.bio[0]);
  const rest = $derived(personal.bio.slice(1));

  // Relative bar widths for the before/after latency comparison
  const toMs = (v: string) => {
    const n = parseFloat(v);
    return /ms/i.test(v) ? n : /s/i.test(v) ? n * 1000 : n;
  };
  const latencyRatio = $derived(
    signals?.latency ? Math.max(0.04, toMs(signals.latency.to) / toMs(signals.latency.from)) : 1,
  );
</script>

<section id="about" class="section">
  <div class="container-page">
    <SectionHeader index="01" label="About" title="An engineer who takes" accent="ownership." />

    <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <!-- At a glance -->
      <div class="lg:col-span-5" use:reveal>
        <div class="card p-6 sm:p-8 lg:sticky lg:top-28">
          <p class="font-mono text-2xs uppercase tracking-[0.18em] text-faint">At a glance</p>

          <dl class="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
            {#each statEntries as stat}
              <div>
                <dt class="font-mono text-2xs uppercase tracking-wider text-faint">{stat.label}</dt>
                <dd class="mt-1.5 text-4xl font-medium tracking-tight">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            {/each}
          </dl>

          {#if personal.motto}
            <blockquote class="mt-8 border-t pt-8 hairline">
              <p class="serif-accent text-2xl leading-snug text-fg sm:text-[1.7rem]">
                <span class="text-accent-ink">“</span>{personal.motto}<span class="text-accent-ink">”</span>
              </p>
            </blockquote>
          {/if}

          <div class="mt-8 flex flex-wrap gap-2">
            <span class="chip gap-1.5"><Icon name="pin" class="h-3 w-3" /> {personal.location}</span>
            <span class="chip gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
              {personal.availability}
            </span>
          </div>
        </div>
      </div>

      <!-- Story + impact -->
      <div class="lg:col-span-7">
        {#if lead}
          <p class="text-xl leading-relaxed tracking-tight text-fg sm:text-2xl" use:reveal>
            {lead}
          </p>
        {/if}
        {#each rest as paragraph, i}
          <p class="mt-6 leading-relaxed text-muted sm:text-lg" use:reveal={{ delay: 80 * (i + 1) }}>
            {paragraph}
          </p>
        {/each}

        {#if signals}
          <div class="mt-14" use:reveal>
            <p class="mb-5 flex items-center gap-4 font-mono text-2xs uppercase tracking-[0.18em] text-faint">
              Impact, in numbers <span class="h-px flex-1 bg-fg/10"></span>
            </p>

            <dl class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-fg/[0.08] hairline">
              {#each signals.metrics as metric}
                <div class="bg-bg p-5 sm:p-6">
                  <dt class="font-mono text-2xs uppercase tracking-wider text-faint">{metric.label}</dt>
                  <dd class="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">
                    <CountUp value={metric.value} />
                  </dd>
                </div>
              {/each}
            </dl>

            {#if signals.latency}
              <div class="latency mt-4 rounded-2xl border p-5 hairline sm:p-6">
                <p class="font-mono text-2xs uppercase tracking-wider text-faint">{signals.latency.label}</p>
                <div class="mt-4 space-y-2.5 font-mono text-xs">
                  <div class="flex items-center gap-3">
                    <span class="w-12 shrink-0 text-faint">Before</span>
                    <span class="relative h-2.5 flex-1 overflow-hidden rounded-full bg-fg/[0.06]">
                      <span class="bar absolute inset-y-0 left-0 rounded-full bg-fg/25" style="--w: 100%"></span>
                    </span>
                    <span class="w-14 shrink-0 text-right text-muted">{signals.latency.from}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="w-12 shrink-0 text-faint">After</span>
                    <span class="relative h-2.5 flex-1 overflow-hidden rounded-full bg-fg/[0.06]">
                      <span class="bar absolute inset-y-0 left-0 rounded-full bg-accent" style="--w: {latencyRatio * 100}%"></span>
                    </span>
                    <span class="w-14 shrink-0 text-right text-accent-ink">{signals.latency.to}</span>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  /* Bars grow once their block has been revealed */
  .bar {
    width: 0;
    transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
  }
  :global(.is-visible) .bar,
  :global(html:not(.js)) .bar {
    width: var(--w);
  }
</style>
