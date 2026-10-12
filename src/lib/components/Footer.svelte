<script lang="ts">
  import Icon from "./Icon.svelte";

  interface Props {
    name: string;
    /** Shows the ⌘K hint; omitted on pages without the command palette. */
    openPalette?: () => void;
  }

  let { name, openPalette }: Props = $props();
  const first = $derived(name.split(" ")[0]);
</script>

<footer class="relative overflow-hidden border-t hairline">
  <div class="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
    <div class="space-y-1 text-sm">
      <p class="text-muted">&copy; {new Date().getFullYear()} {name}. All rights reserved.</p>
      <p class="text-faint">Built with ❤️ using Poha and Jalebi.</p>
    </div>
    <div class="flex items-center gap-3">
      {#if openPalette}
        <button onclick={openPalette} class="hidden items-center gap-2 font-mono text-2xs text-faint transition-colors hover:text-fg sm:flex">
          Press <kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd> to jump anywhere
        </button>
      {/if}
      <!-- "#top" scrolls to the top of any page, no matching id needed -->
      <a href="#top" class="btn-ghost !px-3.5 !py-2 text-xs">
        <Icon name="arrow-up" class="h-3.5 w-3.5" /> Back to top
      </a>
    </div>
  </div>

  <!-- Oversized wordmark, cropped by the page edge -->
  <div class="pointer-events-none select-none" aria-hidden="true">
    <p class="wordmark -mb-[0.22em] text-center font-semibold leading-none tracking-[-0.06em]">
      {first.toLowerCase()}<span class="text-accent">.</span>
    </p>
  </div>
</footer>

<style>
  .wordmark {
    font-size: clamp(6rem, 26vw, 22rem);
    color: transparent;
    -webkit-text-stroke: 1px rgb(var(--line) / 0.14);
    background: linear-gradient(180deg, rgb(var(--fg) / 0.08), transparent 70%);
    -webkit-background-clip: text;
    background-clip: text;
  }
  .wordmark span {
    -webkit-text-stroke: 0;
    color: rgb(var(--accent));
  }
</style>
