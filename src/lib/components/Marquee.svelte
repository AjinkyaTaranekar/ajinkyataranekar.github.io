<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    items: string[];
  }

  let { items }: Props = $props();

  // Two rows moving in opposite directions. Each track needs a duplicate copy
  // for the -50% keyframe to loop seamlessly; that copy (and the animation) is
  // added once the browser is idle, keeping it out of first render.
  const rows = $derived.by(() => {
    const half = Math.ceil(items.length / 2);
    return [items.slice(0, half), items.slice(half)];
  });

  let looping = $state(false);

  onMount(() => {
    const start = () => (looping = true);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(start, { timeout: 2500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(start, 1200);
    return () => clearTimeout(id);
  });
</script>

<div class="relative border-y py-6 hairline">
  <h2 class="sr-only">Technologies I work with</h2>
  <div class="fade-x flex flex-col gap-4 overflow-hidden">
    {#each rows as row, r}
      <div
        class="marquee-row flex w-max {looping ? (r === 0 ? 'animate-marquee' : 'animate-marquee-reverse') : ''}"
        style="--marquee-duration: {row.length * 3.2}s"
      >
        {#each looping ? [0, 1] : [0] as copy}
          <ul class="flex shrink-0 items-center" aria-hidden={copy === 1 ? "true" : undefined}>
            {#each row as item}
              <li class="item font-mono text-sm text-muted transition-colors hover:text-fg">{item}</li>
            {/each}
          </ul>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .marquee-row:hover {
    animation-play-state: paused;
  }
  /* Separator drawn in CSS rather than as an extra element per item */
  .item {
    padding-right: 1.5rem;
  }
  .item::after {
    content: "✦";
    margin-left: 1.5rem;
    color: rgb(var(--accent-ink) / 0.7);
  }
</style>
