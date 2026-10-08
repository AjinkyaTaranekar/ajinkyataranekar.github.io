<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    /** A display value such as "1,400+", "91.7%", "3+ Years" or "∞". */
    value: string;
    duration?: number;
    class?: string;
  }

  let { value, duration = 1600, class: className = "" }: Props = $props();

  // Split "1,400+ alerts" into prefix / number / suffix; non-numeric values render as-is.
  const parts = $derived.by(() => {
    const match = value.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    const raw = match[2];
    return {
      prefix: match[1],
      target: parseFloat(raw.replace(/,/g, "")),
      decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
      grouped: raw.includes(","),
      suffix: match[3],
    };
  });

  let el: HTMLSpanElement;
  let current = $state<number | null>(null);

  function format(n: number) {
    if (!parts) return value;
    const fixed = n.toFixed(parts.decimals);
    const num = parts.grouped
      ? Number(fixed).toLocaleString("en-US", {
          minimumFractionDigits: parts.decimals,
          maximumFractionDigits: parts.decimals,
        })
      : fixed;
    return `${parts.prefix}${num}${parts.suffix}`;
  }

  onMount(() => {
    if (!parts || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parts.target;
    current = 0;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          current = target * eased;
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  });
</script>

<span bind:this={el} class="tabular-nums {className}">
  <span class="sr-only">{value}</span>
  <span aria-hidden="true">{current === null ? value : format(current)}</span>
</span>
