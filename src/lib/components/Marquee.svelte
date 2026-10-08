<script lang="ts">
  interface Props {
    items: string[];
  }

  let { items }: Props = $props();

  // Two rows moving in opposite directions; each track is duplicated so the
  // -50% keyframe loops seamlessly.
  const rows = $derived.by(() => {
    const half = Math.ceil(items.length / 2);
    return [items.slice(0, half), items.slice(half)];
  });
</script>

<div class="relative border-y py-6 hairline">
  <h2 class="sr-only">Technologies I work with</h2>
  <div class="fade-x flex flex-col gap-4 overflow-hidden">
    {#each rows as row, r}
      <div class="marquee-row flex w-max {r === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}" style="--marquee-duration: {row.length * 3.2}s">
        {#each [0, 1] as copy}
          <ul class="flex shrink-0 items-center" aria-hidden={copy === 1 ? "true" : undefined}>
            {#each row as item}
              <li class="flex items-center gap-6 pr-6 font-mono text-sm text-muted transition-colors hover:text-fg">
                {item}
                <span class="text-accent-ink/70" aria-hidden="true">✦</span>
              </li>
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
</style>
