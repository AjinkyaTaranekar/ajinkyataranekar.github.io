<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";

  interface Props {
    email: string;
    /** Where the back link goes, e.g. "/#projects". */
    backHref?: string;
    backLabel?: string;
    /** Shows a search button for the command palette when the page has one. */
    openPalette?: () => void;
  }

  let { email, backHref = "/", backLabel = "Home", openPalette }: Props = $props();

  let isMac = $state(true);
  onMount(() => {
    isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  });
</script>

<!-- Compact header for subpages; the home page uses Navigation, whose links are in-page anchors -->
<header class="glass sticky top-0 z-50 border-b hairline">
  <nav class="container-page flex h-16 items-center justify-between gap-4" aria-label="Primary">
    <a href="/" class="group flex items-center gap-2.5" aria-label="AT Ajinkya Taranekar, home">
      <span
        aria-hidden="true"
        class="relative grid h-8 w-8 place-items-center rounded-lg border bg-surface font-mono text-xs font-semibold tracking-tight hairline transition-transform duration-300 group-hover:-rotate-6"
      >
        <span>AT<span class="ml-[1.5px] inline-block h-[5px] w-[5px] rounded-full bg-accent"></span></span>
      </span>
      <span class="hidden font-medium tracking-tight sm:inline">Ajinkya</span>
    </a>

    <div class="flex items-center gap-1 sm:gap-2">
      {#if openPalette}
        <button
          onclick={openPalette}
          class="hidden items-center gap-2 rounded-full border bg-surface/60 py-1.5 pl-3 pr-1.5 text-sm text-muted transition-colors hairline hover:text-fg md:inline-flex"
          aria-label="Open command menu"
        >
          <Icon name="search" class="h-3.5 w-3.5" />
          <span>Projects</span>
          <span class="flex gap-0.5">
            <kbd class="kbd">{isMac ? "⌘" : "Ctrl"}</kbd><kbd class="kbd">K</kbd>
          </span>
        </button>
        <button onclick={openPalette} class="icon-btn md:hidden" aria-label="Open command menu">
          <Icon name="search" />
        </button>
      {/if}
      <a href={backHref} class="btn-ghost !px-3.5 !py-2 text-xs">
        <Icon name="arrow-right" class="h-3.5 w-3.5 rotate-180" />
        {backLabel}
      </a>
      <a
        href="mailto:{email}"
        class="btn-primary !px-4 !py-2 text-xs"
        data-track="contact_click"
        data-track-method="email"
        data-track-placement="header"
      >
        <Icon name="mail" class="h-3.5 w-3.5" /> Email me
      </a>
    </div>
  </nav>
</header>
