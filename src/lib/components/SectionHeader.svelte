<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import type { Snippet } from "svelte";

  interface Props {
    index: string;
    label: string;
    title: string;
    /** Trailing words set in the italic serif. */
    accent?: string;
    description?: string;
    aside?: Snippet;
  }

  let { index, label, title, accent, description, aside }: Props = $props();
</script>

<div class="mb-14 grid gap-8 sm:mb-20 lg:grid-cols-12 lg:items-end">
  <div class="lg:col-span-8">
    <p class="eyebrow" use:reveal>
      <span class="text-accent-ink">{index}</span>
      {label}
    </p>
    <h2 class="h-section mt-5" use:reveal={{ delay: 80 }}>
      {title}
      {#if accent}<span class="serif-accent text-muted">{accent}</span>{/if}
    </h2>
  </div>
  {#if description || aside}
    <div class="lg:col-span-4" use:reveal={{ delay: 160 }}>
      {#if description}
        <p class="max-w-md leading-relaxed text-muted">{description}</p>
      {/if}
      {@render aside?.()}
    </div>
  {/if}
</div>
