<script lang="ts">
  import { goto } from "$app/navigation";
  import CommandPalette, { type Command } from "$lib/components/CommandPalette.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import HighlightList from "$lib/components/HighlightList.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import ProjectCover from "$lib/components/ProjectCover.svelte";
  import { track } from "$lib/utils/analytics";
  import { projectCommands } from "$lib/utils/commands";
  import { projectLinks, projectPath, summarize, youtubeEmbed, youtubeId } from "$lib/utils/project";
  import { absolute, jsonForScript, projectJsonLd, projectUrl } from "$lib/utils/seo";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }
  let { data }: Props = $props();

  const project = $derived(data.project);
  const personal = $derived(data.personal);
  const links = $derived(projectLinks(project));
  const video = $derived(youtubeId(project.video));

  const url = $derived(projectUrl(project.slug));
  const title = $derived(`${project.title} – ${personal.name}`);
  const description = $derived(summarize(project.description));
  const ogImage = $derived(absolute(data.ogImage));
  const twitterHandle = $derived(data.social.twitter?.split("/").pop());
  const jsonLd = $derived(jsonForScript(projectJsonLd(project, personal)));

  const count = $derived(data.projects.length);
  const prev = $derived(data.projects[(data.index - 1 + count) % count]);
  const next = $derived(data.projects[(data.index + 1) % count]);

  let paletteOpen = $state(false);

  const open = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
  // Palette actions aren't clicks on tracked elements, so they report themselves
  const tracked = (event: string, params: Record<string, string>, run: () => void) => () => {
    track(event, { ...params, placement: "palette" });
    run();
  };

  const commands = $derived<Command[]>(
    [
      { id: "home", label: "Home", group: "Navigate", icon: "arrow-up", run: () => goto("/") },
      { id: "all-projects", label: "All projects", group: "Navigate", icon: "layout", run: () => goto("/#projects") },
      { id: "next", label: `Next: ${next.title}`, group: "Navigate", icon: "arrow-right", run: () => goto(projectPath(next.slug)) },
      ...projectCommands(data.projects, project.slug),
      { id: "github", label: "GitHub", group: "Links", icon: "github", hint: "↗", run: tracked("social_click", { network: "github" }, open(data.social.github)) },
      { id: "linkedin", label: "LinkedIn", group: "Links", icon: "linkedin", hint: "↗", run: tracked("social_click", { network: "linkedin" }, open(data.social.linkedin)) },
      data.social.resume && { id: "resume", label: "Résumé", group: "Links", icon: "file", hint: "PDF ↗", run: tracked("resume_open", {}, open(data.social.resume)) },
      { id: "email", label: "Send an email", group: "Actions", icon: "mail", run: tracked("contact_click", { method: "email" }, () => (location.href = `mailto:${personal.email}`)) },
    ].filter(Boolean) as Command[],
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={project.technologies.join(", ")} />
  <link rel="canonical" href={url} />

  <meta property="og:type" content="article" />
  <meta property="og:url" content={url} />
  <meta property="og:site_name" content={personal.name} />
  <meta property="og:locale" content="en_IE" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={project.title} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={project.title} />
  {#if twitterHandle}<meta name="twitter:creator" content="@{twitterHandle}" />{/if}

  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<div class="relative min-h-screen overflow-x-clip">
  <PageHeader email={personal.email} backHref="/#projects" backLabel="All projects" openPalette={() => (paletteOpen = true)} />

  <main>
    <article class="container-page pb-24 pt-12 sm:pt-20">
      <header class="max-w-4xl animate-fade-up">
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <p class="eyebrow">Project</p>
          {#if project.winner}
            <p class="inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-accent-ink">
              <Icon name="trophy" class="h-3.5 w-3.5" /> {project.winner}
            </p>
          {/if}
        </div>
        <h1 class="h-section mt-5">{project.title}</h1>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted">{project.description}</p>

        {#if links.length}
          <div class="mt-8 flex flex-wrap gap-2">
            {#each links as link, i}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                class={i === 0 ? "btn-primary" : "btn-ghost"}
                data-track="project_link_click"
                data-track-project={project.slug}
                data-track-link-type={link.kind}
                data-track-placement="project_page"
              >
                <Icon name={link.icon} /> {link.label}
              </a>
            {/each}
          </div>
        {/if}
      </header>

      <div class="card mt-12 p-2 sm:mt-16">
        {#if video}
          <div class="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
              class="h-full w-full"
              src={youtubeEmbed(video)}
              title="{project.title} demo video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowfullscreen
            ></iframe>
          </div>
        {:else}
          <ProjectCover {project} fit="contain" class="aspect-video max-h-[36rem] w-full rounded-xl" />
        {/if}
      </div>

      <div class="mt-14 grid gap-12 lg:grid-cols-12">
        {#if project.highlights?.length}
          <section class="lg:col-span-8" aria-labelledby="highlights-title">
            <h2 id="highlights-title" class="font-mono text-2xs uppercase tracking-[0.18em] text-faint">Highlights</h2>
            <div class="mt-5">
              <HighlightList items={project.highlights} size="text-base" />
            </div>
          </section>
        {/if}
        <section class={project.highlights?.length ? "lg:col-span-4" : "lg:col-span-12"} aria-labelledby="stack-title">
          <h2 id="stack-title" class="font-mono text-2xs uppercase tracking-[0.18em] text-faint">Built with</h2>
          <ul class="mt-5 flex flex-wrap gap-1.5">
            {#each project.technologies as tech}
              <li class="chip">{tech}</li>
            {/each}
          </ul>
        </section>
      </div>

      <!-- Visitors from search land here first, so say who built it and how to get in touch -->
      <section class="card relative mt-20 overflow-hidden" aria-labelledby="author-title">
        <div class="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true"></div>
        <div class="relative p-6 py-10 sm:p-10">
          <p class="eyebrow">About the author</p>
          <h2 id="author-title" class="mt-5 text-3xl font-medium tracking-tight sm:text-4xl">
            Built by {personal.name}<span class="text-accent">.</span>
          </h2>
          {#if personal.intro}
            <p class="mt-4 max-w-2xl leading-relaxed text-muted">{personal.intro}</p>
          {/if}
          <p class="mt-3 max-w-2xl leading-relaxed text-muted">
            {personal.availability}{personal.lookingFor ? `: ${personal.lookingFor}` : ""}.
          </p>
          <div class="mt-8 flex flex-wrap gap-2">
            <a
              href="mailto:{personal.email}"
              class="btn-primary"
              data-track="contact_click"
              data-track-method="email"
              data-track-placement="project_page"
            >
              <Icon name="mail" /> Email me
            </a>
            {#if data.social.resume}
              <a
                href={data.social.resume}
                target="_blank"
                rel="noopener noreferrer"
                class="btn-ghost"
                data-track="resume_open"
                data-track-placement="project_page"
              >
                <Icon name="file" /> Résumé
              </a>
            {/if}
            <a href="/" class="btn-ghost group">
              Full portfolio
              <Icon name="arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      <!-- Project switcher: every project one click away, this one marked -->
      <nav class="mt-20" aria-labelledby="switcher-title">
        <div class="mb-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h2 id="switcher-title" class="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            All projects <span class="text-faint">· {data.index + 1}/{count}</span>
          </h2>
          <span class="hidden h-px flex-1 bg-fg/10 sm:block"></span>
          <div class="flex gap-2">
            <a href={projectPath(prev.slug)} class="btn-ghost !px-3.5 !py-2 text-xs" title={prev.title}>
              <Icon name="arrow-right" class="h-3.5 w-3.5 rotate-180" /> Previous
            </a>
            <a href={projectPath(next.slug)} class="btn-primary !px-3.5 !py-2 text-xs" title={next.title}>
              Next <Icon name="arrow-right" class="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        <ol class="border-t hairline">
          {#each data.projects as item, i}
            {@const current = i === data.index}
            <li class="border-b hairline">
              <a
                href={projectPath(item.slug)}
                aria-current={current ? "page" : undefined}
                class="group flex items-center gap-4 rounded-lg px-3 py-4 transition-colors duration-300 hover:bg-fg/[0.03] {current ? 'bg-fg/[0.04]' : ''}"
              >
                <span class="w-6 shrink-0 font-mono text-2xs {current ? 'text-accent-ink' : 'text-faint'}">{String(i + 1).padStart(2, "0")}</span>
                <span class="min-w-0 flex-1 font-medium tracking-tight {current ? 'text-accent-ink' : ''}">
                  {item.title}
                  {#if item.winner}
                    <Icon name="trophy" class="ml-1 inline h-3.5 w-3.5 -translate-y-px text-accent-ink" />
                    <span class="sr-only">(award winner)</span>
                  {/if}
                </span>
                <span class="hidden gap-1.5 md:flex">
                  {#each item.technologies.slice(0, 2) as tech}
                    <span class="chip">{tech}</span>
                  {/each}
                </span>
                {#if current}
                  <span class="font-mono text-2xs uppercase tracking-wider text-accent-ink">Viewing</span>
                {:else}
                  <Icon name="arrow-right" class="h-4 w-4 shrink-0 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-fg" />
                {/if}
              </a>
            </li>
          {/each}
        </ol>
      </nav>
    </article>
  </main>

  <Footer name={personal.name} openPalette={() => (paletteOpen = true)} />

  <CommandPalette bind:open={paletteOpen} {commands} />
</div>
