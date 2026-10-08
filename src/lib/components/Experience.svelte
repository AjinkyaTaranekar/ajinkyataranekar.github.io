<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { spotlight } from "$lib/actions/spotlight";
  import type { Experience } from "$lib/types/portfolio";
  import { emphasize } from "$lib/utils/emphasize";
  import { formatDuration, isOngoing, parsePeriod } from "$lib/utils/period";
  import { slide } from "svelte/transition";
  import Icon from "./Icon.svelte";
  import SectionHeader from "./SectionHeader.svelte";

  interface Props {
    experiences: Experience[];
  }

  let { experiences }: Props = $props();

  const VISIBLE_HIGHLIGHTS = 3;

  // Consecutive roles at the same company become one card with a role timeline
  const groups = $derived.by(() => {
    const out: { company: string; logo?: string; location: string; roles: Experience[] }[] = [];
    for (const exp of experiences) {
      const last = out[out.length - 1];
      if (last && last.company === exp.company) last.roles.push(exp);
      else out.push({ company: exp.company, logo: exp.companyLogo, location: exp.location, roles: [exp] });
    }
    return out.map((group) => {
      const newest = parsePeriod(group.roles[0].period);
      const oldest = parsePeriod(group.roles[group.roles.length - 1].period);
      return {
        ...group,
        range: `${oldest.startLabel} — ${newest.endLabel}`,
        duration: formatDuration(oldest.start, newest.end),
        ongoing: isOngoing(group.roles[0].period),
      };
    });
  });

  let expanded = $state<Record<string, boolean>>({});

  const shortName = (company: string) => company.split(",")[0];
  const initials = (company: string) =>
    shortName(company)
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
</script>

<section id="experience" class="section">
  <div class="container-page">
    <SectionHeader
      index="02"
      label="Experience"
      title="Where I've"
      accent="shipped."
      description="From bank reconciliation pipelines to GenAI voice agents, owning systems end to end: design, build, on-call."
    />

    <ol class="exp-list space-y-5">
      {#each groups as group}
        <li class="exp-item card grid gap-8 p-6 transition-opacity duration-500 sm:p-8 lg:grid-cols-12 lg:p-10" use:spotlight use:reveal>
          <!-- Company -->
          <div class="lg:col-span-4">
            <div class="lg:sticky lg:top-28">
              <div class="flex items-center gap-4 lg:block">
                {#if group.logo}
                  <div class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-black/5">
                    <img src={group.logo} alt="{shortName(group.company)} logo" class="h-full w-full object-contain" loading="lazy" />
                  </div>
                {:else}
                  <div class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-fg font-mono text-lg font-semibold text-bg">
                    {initials(group.company)}
                  </div>
                {/if}
                <div class="lg:mt-5">
                  <h3 class="text-xl font-medium tracking-tight sm:text-2xl">{shortName(group.company)}</h3>
                  <p class="mt-1 text-sm text-muted">{group.location}</p>
                </div>
              </div>
              <div class="mt-5 flex flex-wrap items-center gap-2 font-mono text-2xs text-faint">
                <span>{group.range}</span>
                {#if group.duration}<span aria-hidden="true">·</span><span>{group.duration}</span>{/if}
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                {#if group.ongoing}
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 font-mono text-2xs text-accent-ink">
                    <span class="h-1.5 w-1.5 rounded-full bg-accent"></span> Current
                  </span>
                {/if}
                {#if group.roles.length > 1}
                  <span class="chip">{group.roles.length} roles</span>
                {/if}
              </div>
            </div>
          </div>

          <!-- Roles -->
          <ol class="relative lg:col-span-8">
            {#each group.roles as role, r}
              {@const key = `${group.company}-${r}`}
              {@const hidden = (role.highlights?.length ?? 0) - VISIBLE_HIGHLIGHTS}
              <li class="relative pb-10 pl-7 last:pb-0">
                <!-- timeline rail -->
                {#if group.roles.length > 1}
                  <span class="absolute left-[5px] top-3 h-full w-px bg-fg/10 {r === group.roles.length - 1 ? 'hidden' : ''}" aria-hidden="true"></span>
                {/if}
                <span
                  class="absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border-2 {r === 0
                    ? 'border-accent bg-accent/30'
                    : 'border-fg/25 bg-bg'}"
                  aria-hidden="true"
                ></span>

                <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 class="text-lg font-medium tracking-tight">{role.title}</h4>
                  <span class="font-mono text-2xs text-faint">{role.period}</span>
                </div>
                {#if role.type === "internship"}
                  <span class="chip mt-2">Internship</span>
                {/if}

                <p class="mt-3 leading-relaxed text-muted">{role.description}</p>

                {#if role.highlights?.length}
                  <ul class="mt-5 space-y-2.5">
                    {#each role.highlights as highlight, h}
                      {#if h < VISIBLE_HIGHLIGHTS || expanded[key]}
                        <li class="flex gap-3 text-[0.95rem] leading-relaxed text-muted" transition:slide={{ duration: 350 }}>
                          <Icon name="arrow-right" class="mt-[0.4rem] h-3.5 w-3.5 shrink-0 text-accent-ink" />
                          <span>
                            {#each emphasize(highlight) as seg}
                              {#if seg.em}<strong class="font-medium text-fg underline decoration-accent/60 decoration-1 underline-offset-4">{seg.text}</strong>{:else}{seg.text}{/if}
                            {/each}
                          </span>
                        </li>
                      {/if}
                    {/each}
                  </ul>
                  {#if hidden > 0}
                    <button
                      class="mt-4 inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-muted transition-colors hover:text-fg"
                      onclick={() => (expanded[key] = !expanded[key])}
                      aria-expanded={!!expanded[key]}
                    >
                      {expanded[key] ? "Show less" : `+ ${hidden} more highlights`}
                      <Icon name="chevron-down" class="h-3.5 w-3.5 transition-transform duration-300 {expanded[key] ? 'rotate-180' : ''}" />
                    </button>
                  {/if}
                {/if}

                <ul class="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {#each role.technologies as tech}
                    <li class="chip">{tech}</li>
                  {/each}
                </ul>
              </li>
            {/each}
          </ol>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  /* Dim the other cards while one is hovered (pointer devices only) */
  @media (hover: hover) and (min-width: 1024px) {
    .exp-list:hover > :global(.exp-item:not(:hover)) {
      opacity: 0.55;
    }
  }
</style>
