<script lang="ts">
  import { emphasize } from "$lib/utils/emphasize";
  import Icon from "./Icon.svelte";

  interface Props {
    items: string[];
    /** Text size utility for the list items. */
    size?: string;
  }

  let { items, size = "text-sm" }: Props = $props();

  // "Teaching the format: training on…" -> a short bold label plus the body
  function splitLabel(text: string) {
    const match = text.match(/^([^:]{3,32}):\s+(.*)$/s);
    return match ? { label: match[1], body: match[2] } : { label: "", body: text };
  }
</script>

<ul class="space-y-2">
  {#each items as highlight}
    {@const { label, body } = splitLabel(highlight)}
    <li class="flex gap-2.5 leading-relaxed text-muted {size}">
      <Icon name="arrow-right" class="mt-[0.35em] h-3.5 w-3.5 shrink-0 text-accent-ink" />
      <span>
        {#if label}<strong class="font-semibold text-fg">{label}:</strong>{" "}{/if}
        {#each emphasize(body) as seg}
          {#if seg.em}<strong class="font-medium text-fg">{seg.text}</strong>{:else}{seg.text}{/if}
        {/each}
      </span>
    </li>
  {/each}
</ul>
