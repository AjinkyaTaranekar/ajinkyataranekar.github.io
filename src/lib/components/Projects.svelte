<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { spotlight } from "$lib/actions/spotlight";
  import type { Project } from "$lib/types/portfolio";
  import { track } from "$lib/utils/analytics";
  import { projectLinks as links, projectPath, youtubeEmbed, youtubeId } from "$lib/utils/project";
  import { fade, scale } from "svelte/transition";
  import HighlightList from "./HighlightList.svelte";
  import Icon from "./Icon.svelte";
  import ProjectCover from "./ProjectCover.svelte";
  import SectionHeader from "./SectionHeader.svelte";

  interface Props {
    projects: Project[];
  }

  let { projects }: Props = $props();

  const featured = $derived(projects.filter((p) => p.featured && !p.archived));
  const selected = $derived(projects.filter((p) => !p.featured && !p.archived));
  const archived = $derived(projects.filter((p) => p.archived));

  // Asymmetric 12-column rhythm for the selected grid: wide/narrow, then narrow/wide
  const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
  const MAX_TAGS = 4;

  let open = $state<Project | null>(null);
  let closeBtn = $state<HTMLButtonElement>();
  let lastFocus: HTMLElement | null = null;

  // Titles are real links to the project page (crawlable, and they open in a
  // new tab with a modifier key); a plain click opens the dialog instead.
  function show(project: Project, placement: string, event: MouseEvent) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    lastFocus = event.currentTarget as HTMLElement;
    open = project;
    track("project_open", { project: project.slug, placement });
  }

  function close() {
    open = null;
    lastFocus?.focus();
  }

  $effect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeBtn?.focus();
    // Also runs on unmount, e.g. when "Project page" navigates away with the dialog open
    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && open && close()} />

{#snippet badges(project: Project)}
  {#if project.video}
    <span class="pointer-events-none absolute inset-0 z-[1] grid place-items-center" aria-hidden="true">
      <span class="grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-fg shadow-[0_0_0_10px_rgb(var(--accent)/0.18)] transition-transform duration-500 group-hover:scale-110">
        <Icon name="play" class="ml-1 h-6 w-6" />
      </span>
    </span>
    <span class="absolute bottom-3 right-3 z-[1] rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-md">Watch demo</span>
  {/if}
  {#if project.featured || project.winner}
    <div class="absolute left-3 top-3 z-[1] flex flex-wrap gap-2">
      {#if project.featured}
        <span class="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-fg">Featured</span>
      {/if}
      {#if project.winner}
        <span class="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white backdrop-blur-md">
          <Icon name="trophy" class="h-3.5 w-3.5 text-amber-300" />
          {project.winner}
        </span>
      {/if}
    </div>
  {/if}
{/snippet}

{#snippet footer(project: Project, maxTags: number)}
  <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
    <ul class="flex flex-wrap gap-1.5">
      {#each project.technologies.slice(0, maxTags) as tech}
        <li class="chip">{tech}</li>
      {/each}
      {#if project.technologies.length > maxTags}
        <li class="chip">+{project.technologies.length - maxTags}</li>
      {/if}
    </ul>
    <div class="relative z-[3] flex gap-1">
      {#each links(project) as link}
        <a href={link.href} target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="{link.label}: {project.title}" title={link.label} data-track="project_link_click" data-track-project={project.slug} data-track-link-type={link.kind} data-track-placement="card">
          <Icon name={link.icon} class="h-4 w-4" />
        </a>
      {/each}
    </div>
  </div>
{/snippet}

<section id="projects" class="section">
  <div class="container-page">
    <SectionHeader
      index="03"
      label="Projects"
      title="Selected"
      accent="work."
      description="Research, production systems and hackathon wins. Open any card for the full story."
    />

    <!-- Featured: full-width cards, image alternating sides -->
    {#if featured.length}
      <div class="mb-5 space-y-5">
        {#each featured as project, i}
          <article class="card group grid p-2 lg:grid-cols-12" use:spotlight use:reveal>
            <div class="relative lg:col-span-7 {i % 2 ? 'lg:order-2' : ''}">
              <ProjectCover
                {project}
                class="h-64 rounded-xl sm:h-80 lg:h-full lg:min-h-[28rem]"
                imgClass="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {@render badges(project)}
            </div>
            <div class="flex flex-col p-4 sm:p-6 lg:col-span-5 lg:p-8">
              <div class="flex items-start justify-between gap-4">
                <h3 class="text-2xl font-medium leading-tight tracking-tight sm:text-[1.7rem]">
                  <a href={projectPath(project.slug)} class="after:absolute after:inset-0 after:z-[2] after:content-['']" data-sveltekit-preload-data="off" onclick={(e) => show(project, "featured", e)}>
                    {project.title}
                  </a>
                </h3>
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border text-muted transition-all duration-500 hairline group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                  <Icon name="arrow-up-right" class="h-4 w-4" />
                </span>
              </div>
              <p class="mt-3 line-clamp-4 leading-relaxed text-muted">{project.description}</p>
              {#if project.highlights?.length}
                <div class="mt-5"><HighlightList items={project.highlights.slice(0, 4)} size="text-sm" /></div>
              {/if}
              {@render footer(project, 5)}
            </div>
          </article>
        {/each}
      </div>
    {/if}

    <!-- Selected work: asymmetric grid -->
    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
      {#each selected as project, i}
        <article
          class="card group flex flex-col p-2 transition-transform duration-500 ease-out hover:-translate-y-1 {SPANS[i % SPANS.length]}"
          use:spotlight
          use:reveal={{ delay: (i % 2) * 90 }}
        >
          <div class="relative">
            <ProjectCover
              {project}
              class="h-56 rounded-xl sm:h-64"
              imgClass="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            {@render badges(project)}
          </div>

          <div class="flex flex-1 flex-col p-4 sm:p-5">
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-lg font-medium leading-snug tracking-tight sm:text-xl">
                <a href={projectPath(project.slug)} class="after:absolute after:inset-0 after:z-[2] after:content-['']" data-sveltekit-preload-data="off" onclick={(e) => show(project, "grid", e)}>
                  {project.title}
                </a>
              </h3>
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full border text-muted transition-all duration-500 hairline group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                <Icon name="arrow-up-right" class="h-4 w-4" />
              </span>
            </div>
            <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>
            {#if project.highlights?.length}
              <div class="mt-4"><HighlightList items={project.highlights.slice(0, 2)} size="text-[0.85rem]" /></div>
            {/if}
            {@render footer(project, MAX_TAGS)}
          </div>
        </article>
      {/each}
    </div>

    <!-- Archive: compact list of earlier work -->
    {#if archived.length}
      <div class="mt-20" use:reveal>
        <div class="mb-4 flex items-center gap-4">
          <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-muted">More projects</h3>
          <span class="h-px flex-1 bg-fg/10"></span>
        </div>
        <ul>
          {#each archived as project}
            <li class="group relative border-b hairline">
              <div class="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg px-3 py-5 transition-colors duration-300 group-hover:bg-fg/[0.03]">
                <h4 class="min-w-0 flex-1 text-base font-medium tracking-tight sm:text-lg">
                  <a href={projectPath(project.slug)} class="after:absolute after:inset-0 after:z-[2] after:content-['']" data-sveltekit-preload-data="off" onclick={(e) => show(project, "archive", e)}>
                    {project.title}
                  </a>
                </h4>
                {#if project.winner}
                  <span class="inline-flex items-center gap-1.5 font-mono text-2xs text-accent-ink">
                    <Icon name="trophy" class="h-3.5 w-3.5" /> {project.winner}
                  </span>
                {/if}
                <span class="hidden gap-1.5 lg:flex">
                  {#each project.technologies.slice(0, 3) as tech}
                    <span class="chip">{tech}</span>
                  {/each}
                </span>
                <span class="relative z-[3] flex gap-1">
                  {#each links(project) as link}
                    <a href={link.href} target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="{link.label}: {project.title}" title={link.label} data-track="project_link_click" data-track-project={project.slug} data-track-link-type={link.kind} data-track-placement="archive">
                      <Icon name={link.icon} class="h-4 w-4" />
                    </a>
                  {/each}
                </span>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</section>

<!-- Case-study dialog -->
{#if open}
  <div class="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
    <button class="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm" aria-label="Close project" onclick={close} transition:fade={{ duration: 200 }}></button>
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      class="card relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-b-none shadow-2xl sm:rounded-2xl"
      transition:scale={{ start: 0.96, duration: 300 }}
    >
      <div class="relative">
        {#if youtubeId(open.video)}
          <div class="aspect-video w-full bg-black">
            <iframe
              class="h-full w-full"
              src={youtubeEmbed(youtubeId(open.video)!)}
              title="{open.title} demo video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        {:else}
          <ProjectCover project={open} fit="contain" class="h-[40svh] max-h-[26rem] min-h-[14rem]" />
        {/if}
        <button bind:this={closeBtn} onclick={close} class="icon-btn absolute right-3 top-3 bg-black/50 text-white backdrop-blur-md hover:bg-black/70 hover:text-white" aria-label="Close">
          <Icon name="close" />
        </button>
      </div>
      <div class="p-6 sm:p-8">
        {#if open.winner}
          <p class="mb-3 inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-accent-ink">
            <Icon name="trophy" class="h-3.5 w-3.5" /> {open.winner}
          </p>
        {/if}
        <h3 id="project-title" class="text-2xl font-medium tracking-tight sm:text-3xl">{open.title}</h3>
        <p class="mt-4 leading-relaxed text-muted">{open.description}</p>
        {#if open.highlights?.length}
          <div class="mt-6 rounded-xl border p-5 hairline">
            <p class="mb-3 font-mono text-2xs uppercase tracking-[0.18em] text-faint">Highlights</p>
            <HighlightList items={open.highlights} size="text-[0.95rem]" />
          </div>
        {/if}
        <ul class="mt-6 flex flex-wrap gap-1.5">
          {#each open.technologies as tech}
            <li class="chip">{tech}</li>
          {/each}
        </ul>
        <div class="mt-8 flex flex-wrap gap-2">
          {#each links(open) as link, i}
            <a href={link.href} target="_blank" rel="noopener noreferrer" class={i === 0 ? "btn-primary" : "btn-ghost"} data-track="project_link_click" data-track-project={open.slug} data-track-link-type={link.kind} data-track-placement="dialog">
              <Icon name={link.icon} /> {link.label}
            </a>
          {/each}
          <a href={projectPath(open.slug)} class="btn-ghost sm:ml-auto">
            Project page <Icon name="arrow-right" class="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}
