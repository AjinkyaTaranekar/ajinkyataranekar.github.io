<script lang="ts">
  import type { Photo } from "$lib/types/portfolio";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "./Icon.svelte";
  import SectionHeader from "./SectionHeader.svelte";

  interface Props {
    photos: Photo[];
  }

  let { photos }: Props = $props();

  // Alternate photos between two filmstrips that drift in opposite directions
  const rows = $derived([
    photos.map((p, i) => ({ ...p, index: i })).filter((_, i) => i % 2 === 0),
    photos.map((p, i) => ({ ...p, index: i })).filter((_, i) => i % 2 === 1),
  ]);

  // The filmstrips hold ~100 nodes per row, so they are only built once the
  // section is about to scroll into view (keeps them out of first render).
  let section: HTMLElement;
  let near = $state(false);

  onMount(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          near = true;
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  });

  let current = $state<number | null>(null);
  let closeBtn = $state<HTMLButtonElement>();
  let lastFocus: HTMLElement | null = null;

  function openAt(index: number, event: MouseEvent) {
    lastFocus = event.currentTarget as HTMLElement;
    current = index;
  }
  function close() {
    current = null;
    lastFocus?.focus();
  }
  function go(delta: number) {
    if (current === null) return;
    current = (current + delta + photos.length) % photos.length;
  }

  $effect(() => {
    document.body.style.overflow = current !== null ? "hidden" : "";
    if (current !== null) closeBtn?.focus();
  });

  function onKeydown(event: KeyboardEvent) {
    if (current === null) return;
    if (event.key === "Escape") close();
    else if (event.key === "ArrowRight") go(1);
    else if (event.key === "ArrowLeft") go(-1);
  }

  const ratio = (p: Photo) => (p.width && p.height ? `${p.width} / ${p.height}` : "4 / 3");
</script>

<svelte:window onkeydown={onKeydown} />

<section id="photos" class="section overflow-hidden" bind:this={section}>
  <div class="container-page">
    <SectionHeader
      index="06"
      label="Off the clock"
      title="Through"
      accent="my lens."
      description="Capturing moments and places that inspire me. A glimpse into my adventures and explorations."
    />
  </div>

  <div class="fade-x flex flex-col gap-4">
    {#if !near}
      <!-- Same height as the two strips, so nothing shifts when they mount -->
      <div class="h-[25rem] sm:h-[33rem]" aria-hidden="true"></div>
    {/if}
    {#each near ? rows : [] as row, r}
      <div
        class="strip flex w-max {r === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}"
        style="--marquee-duration: {row.length * 7}s"
      >
        {#each [0, 1] as copy}
          <ul class="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1 ? "true" : undefined}>
            {#each row as photo}
              <li class="h-48 shrink-0 sm:h-64" style="aspect-ratio: {ratio(photo)}">
                <button
                  class="group block h-full w-full overflow-hidden rounded-xl border hairline"
                  onclick={(e) => openAt(photo.index, e)}
                  tabindex={copy === 1 ? -1 : undefined}
                  aria-label="Open photo {photo.index + 1}{photo.caption ? `: ${photo.caption}` : ''}"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption ?? ""}
                    width={photo.width}
                    height={photo.height}
                    class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            {/each}
          </ul>
        {/each}
      </div>
    {/each}
  </div>
</section>

<!-- Lightbox -->
{#if current !== null}
  {@const photo = photos[current]}
  <div class="fixed inset-0 z-[80] flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Photo viewer" transition:fade={{ duration: 200 }}>
    <button class="absolute inset-0 cursor-default bg-black/90 backdrop-blur-sm" aria-label="Close viewer" onclick={close}></button>

    {#key current}
      <img
        src={photo.url}
        alt={photo.caption ?? `Photo ${current + 1}`}
        class="relative max-h-[82svh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
        in:fade={{ duration: 250 }}
      />
    {/key}

    <div class="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white sm:p-6">
      <span class="font-mono text-xs tracking-wider text-white/70">
        {String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </span>
      <button bind:this={closeBtn} onclick={close} class="icon-btn text-white/80 hover:bg-white/10 hover:text-white" aria-label="Close">
        <Icon name="close" />
      </button>
    </div>
    <button onclick={() => go(-1)} class="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-6" aria-label="Previous photo">
      <Icon name="chevron-left" class="h-5 w-5" />
    </button>
    <button onclick={() => go(1)} class="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6" aria-label="Next photo">
      <Icon name="chevron-right" class="h-5 w-5" />
    </button>
    {#if photo.caption || photo.location}
      <p class="absolute inset-x-0 bottom-6 text-center text-sm text-white/80">
        {photo.caption ?? ""}{photo.caption && photo.location ? " · " : ""}{photo.location ?? ""}
      </p>
    {/if}
  </div>
{/if}

<style>
  .strip:hover,
  .strip:focus-within {
    animation-play-state: paused;
  }
</style>
