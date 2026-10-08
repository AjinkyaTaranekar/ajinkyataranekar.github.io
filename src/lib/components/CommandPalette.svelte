<script lang="ts" module>
  export interface Command {
    id: string;
    label: string;
    group: string;
    icon: string;
    hint?: string;
    run: () => void;
  }
</script>

<script lang="ts">
  import { fade } from "svelte/transition";
  import Icon from "./Icon.svelte";

  interface Props {
    open: boolean;
    commands: Command[];
  }

  let { open = $bindable(), commands }: Props = $props();

  let query = $state("");
  let selected = $state(0);
  let input = $state<HTMLInputElement>();
  let list = $state<HTMLUListElement>();
  let lastFocus: Element | null = null;

  const filtered = $derived.by(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q));
  });

  const groups = $derived.by(() => {
    const map = new Map<string, { command: Command; index: number }[]>();
    filtered.forEach((command, index) => {
      if (!map.has(command.group)) map.set(command.group, []);
      map.get(command.group)!.push({ command, index });
    });
    return [...map.entries()];
  });

  $effect(() => {
    if (open) {
      lastFocus = document.activeElement;
      query = "";
      selected = 0;
      document.body.style.overflow = "hidden";
      queueMicrotask(() => input?.focus());
    } else {
      document.body.style.overflow = "";
      (lastFocus as HTMLElement | null)?.focus?.();
    }
  });

  // Keep the highlighted row in range and in view
  $effect(() => {
    if (selected >= filtered.length) selected = Math.max(0, filtered.length - 1);
    list?.querySelector(`[data-index="${selected}"]`)?.scrollIntoView({ block: "nearest" });
  });

  function run(command: Command) {
    open = false;
    // Let the palette close before navigating/scrolling
    setTimeout(command.run, 60);
  }

  function onWindowKeydown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      open = !open;
      return;
    }
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      open = false;
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      selected = (selected + 1) % Math.max(1, filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      selected = (selected - 1 + filtered.length) % Math.max(1, filtered.length);
    } else if (event.key === "Enter" && filtered[selected]) {
      event.preventDefault();
      run(filtered[selected]);
    }
  }
</script>

<svelte:window onkeydown={onWindowKeydown} />

{#if open}
  <div class="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]" transition:fade={{ duration: 150 }}>
    <button class="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm" aria-label="Close command menu" onclick={() => (open = false)}></button>

    <div
      class="card relative w-full max-w-xl animate-scale-in overflow-hidden shadow-2xl shadow-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
    >
      <div class="flex items-center gap-3 border-b px-4 hairline">
        <Icon name="search" class="h-4 w-4 text-muted" />
        <input
          bind:this={input}
          bind:value={query}
          oninput={() => (selected = 0)}
          placeholder="Jump to a section, open a link…"
          class="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-faint"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={filtered[selected] ? `cmd-${filtered[selected].id}` : undefined}
          autocomplete="off"
          spellcheck="false"
        />
        <kbd class="kbd">Esc</kbd>
      </div>

      <ul id="command-list" bind:this={list} class="max-h-[50vh] overflow-y-auto p-2" role="listbox">
        {#each groups as [group, items]}
          <li role="presentation" class="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{group}</li>
          {#each items as { command, index }}
            <li
              id="cmd-{command.id}"
              role="option"
              aria-selected={index === selected}
              data-index={index}
              class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors {index === selected
                ? 'bg-fg/[0.07] text-fg'
                : 'text-muted'}"
              onclick={() => run(command)}
              onmousemove={() => (selected = index)}
              onkeydown={() => {}}
            >
              <span class="grid h-7 w-7 place-items-center rounded-md border hairline {index === selected ? 'border-accent/50 text-accent-ink' : ''}">
                <Icon name={command.icon} class="h-3.5 w-3.5" />
              </span>
              <span class="flex-1">{command.label}</span>
              {#if command.hint}<span class="font-mono text-2xs text-faint">{command.hint}</span>{/if}
              {#if index === selected}<Icon name="arrow-right" class="h-3.5 w-3.5 text-faint" />{/if}
            </li>
          {/each}
        {:else}
          <li class="px-3 py-10 text-center text-sm text-faint">No results for “{query}”</li>
        {/each}
      </ul>

      <div class="flex items-center gap-4 border-t px-4 py-2.5 font-mono text-[10px] text-faint hairline">
        <span class="flex items-center gap-1"><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd> navigate</span>
        <span class="flex items-center gap-1"><kbd class="kbd">↵</kbd> select</span>
        <span class="ml-auto">ajinkya.k</span>
      </div>
    </div>
  </div>
{/if}
