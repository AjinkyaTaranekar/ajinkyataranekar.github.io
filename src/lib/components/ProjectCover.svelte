<script lang="ts">
  import type { Project } from "$lib/types/portfolio";

  interface Props {
    project: Project;
    class?: string;
    imgClass?: string;
    /** "cover" crops to fill (cards); "contain" shows the whole image (dialog). */
    fit?: "cover" | "contain";
  }

  let { project, class: className = "", imgClass = "", fit = "cover" }: Props = $props();

  let loaded = $state(false);
  let failed = $state(false);

  // The image may have settled before hydration attached the handlers
  function watch(img: HTMLImageElement) {
    if (img.complete) {
      if (img.naturalWidth > 0) loaded = true;
      else failed = true;
    }
  }

  // Short display name: "Atlas – ML Training Observatory" -> "Atlas"
  const name = $derived(project.title.split(/\s[–—-]\s|\s\(/)[0]);
  const display = $derived(name.length > 18 ? name.split(/\s+/).slice(0, 2).join(" ") : name);
  // Stable per-project variation for the glow position
  const seed = $derived([...project.title].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7));
</script>

<div class="relative overflow-hidden bg-surface-2 {className}">
  <!-- Typographic cover: shown while the image loads, or instead of a missing one -->
  <div
    class="cover absolute inset-0 {imgClass}"
    style="--gx: {20 + (seed % 60)}%; --gy: {15 + ((seed >> 3) % 50)}%"
    aria-hidden="true"
  >
    <div class="bg-grid absolute inset-0 opacity-60"></div>
    <div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
      <span class="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-ink/80">
        {project.technologies.slice(0, 3).join(" · ")}
      </span>
      <span class="serif-accent mt-2 text-5xl leading-none text-fg/90 sm:text-6xl">{display}</span>
    </div>
  </div>

  {#if project.image && !failed}
    <img
      src={project.image}
      alt=""
      class="photo absolute inset-0 h-full w-full {fit === 'contain'
        ? 'bg-surface-2 object-contain'
        : 'object-cover'} {imgClass}"
      class:loaded
      loading="lazy"
      decoding="async"
      onload={() => (loaded = true)}
      onerror={() => (failed = true)}
      use:watch
    />
  {/if}
</div>

<style>
  .cover {
    background:
      radial-gradient(60% 70% at var(--gx) var(--gy), rgb(var(--accent) / 0.22), transparent 70%),
      radial-gradient(50% 60% at calc(100% - var(--gx)) 100%, rgb(var(--fg) / 0.06), transparent 70%),
      rgb(var(--surface-2));
  }

  /* Fade real images in over the cover (only when JS runs, so no-JS still shows them) */
  :global(html.js) .photo {
    opacity: 0;
    transition:
      opacity 0.6s ease,
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  :global(html.js) .photo.loaded {
    opacity: 1;
  }
</style>
