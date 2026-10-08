<script lang="ts">
  import type { Achievement, Education, Experience, PersonalInfo, SocialLinks } from "$lib/types/portfolio";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import Icon from "./Icon.svelte";

  interface Props {
    personal: PersonalInfo;
    social?: SocialLinks;
    /** Most recent role, education and a headline award, shown as badges on the portrait. */
    role?: Experience;
    degree?: Education;
    award?: Achievement;
  }

  let { personal, social, role, degree, award }: Props = $props();

  const words = $derived(personal.focus?.length ? personal.focus : ["reliable"]);
  const nameParts = $derived(personal.name.split(" "));
  const roles = $derived(personal.tagline.split("|").map((part) => part.trim()));
  const shortDegree = $derived(
    degree?.degree.startsWith("Master") ? "MSc" : degree?.degree.startsWith("Bachelor") ? "BTech" : "",
  );

  // "Shri G.S. Institute of Technology and Science" -> "SGSITS"
  const abbreviate = (name: string) =>
    name.length <= 24
      ? name
      : name
          .split(/\s+/)
          .filter((w) => /^[A-Z]/.test(w))
          .map((w) => w.replace(/[^A-Z]/g, ""))
          .join("");

  let wordIndex = $state(0);
  let copied = $state(false);
  let hero: HTMLElement;

  onMount(() => {
    if (words.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => (wordIndex = (wordIndex + 1) % words.length), 2600);
    return () => clearInterval(id);
  });

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(personal.email);
      copied = true;
      setTimeout(() => (copied = false), 1800);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  }

  function onPointerMove(event: PointerEvent) {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    hero.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }
</script>

<section
  id="home"
  bind:this={hero}
  onpointermove={onPointerMove}
  class="hero relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 sm:pt-32"
>
  <!-- Background: engineering grid, ambient glow and a cursor spotlight -->
  <div class="bg-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
  <div
    class="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full blur-[120px]"
    style="background: rgb(var(--accent) / calc(var(--glow-a) * 0.5))"
    aria-hidden="true"
  ></div>
  <div class="spot pointer-events-none absolute inset-0" aria-hidden="true"></div>

  <div class="container-page relative grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
    <div class="lg:col-span-7">
      <!-- Availability -->
      <div class="animate-fade-up" style="animation-delay: 80ms">
        <span class="inline-flex items-center gap-2.5 rounded-full border bg-surface/70 px-3 py-1.5 text-xs text-muted hairline">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          <span class="text-fg">{personal.availability}</span>
          <span class="h-3 w-px bg-fg/15" aria-hidden="true"></span>
          {personal.location}
        </span>
      </div>

      <!-- Name: each word rises out of a mask -->
      <h1
        class="mt-7 text-[clamp(3.2rem,9vw,7.25rem)] font-medium leading-[0.92] tracking-[-0.055em]"
        aria-label={personal.name}
      >
        {#each nameParts as part, i}
          <span class="mask" aria-hidden="true"><span class="rise text-gradient" style="--d: {150 + i * 110}ms">{part}</span></span>{#if i < nameParts.length - 1}{" "}{/if}
        {/each}
      </h1>

      <!-- Statement with a rotating serif word -->
      <p
        class="animate-fade-up mt-6 text-2xl tracking-tight text-muted sm:text-3xl"
        style="animation-delay: 420ms"
      >
        Engineering software that's
        <span class="relative inline-grid align-bottom">
          {#key wordIndex}
            <span
              class="serif-accent col-start-1 row-start-1 text-[1.15em] leading-none text-fg"
              in:fly={{ y: 18, duration: 600, delay: 150 }}
              out:fly={{ y: -18, duration: 400 }}
            >
              {words[wordIndex]}.
            </span>
          {/key}
        </span>
      </p>

      {#if personal.intro}
        <p
          class="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          style="animation-delay: 520ms"
        >
          {personal.intro}
        </p>
      {/if}

      <!-- Actions: email first, so visitors can reach out straight away -->
      <div class="animate-fade-up mt-9 flex flex-wrap items-center gap-3" style="animation-delay: 620ms">
        <div class="flex items-center">
          <a href="mailto:{personal.email}" class="btn-primary rounded-r-md pr-4">
            <Icon name="mail" /> Email me
          </a>
          <button
            onclick={copyEmail}
            class="btn-primary ml-px rounded-l-md px-3 py-3"
            aria-label={copied ? "Email address copied" : `Copy email address ${personal.email}`}
            title={copied ? "Copied!" : "Copy email address"}
          >
            <Icon name={copied ? "check" : "copy"} class="h-4 w-4" strokeWidth={copied ? 2.4 : 1.8} />
          </button>
        </div>
        <a href="#projects" class="btn-ghost group">
          View my work
          <Icon name="arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
        {#if social?.resume}
          <a href={social.resume} target="_blank" rel="noopener noreferrer" class="btn-ghost">
            <Icon name="file" /> Résumé
          </a>
        {/if}
      </div>

      <!-- Email address + socials -->
      <div class="animate-fade-up mt-5 flex flex-wrap items-center gap-x-4 gap-y-2" style="animation-delay: 680ms">
        <a href="mailto:{personal.email}" class="link font-mono text-xs text-muted">{personal.email}</a>
        {#if copied}
          <span class="font-mono text-2xs text-accent-ink">Copied to clipboard</span>
        {/if}
        {#if social}
          <div class="-ml-2 flex items-center gap-1">
            <a href={social.github} target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="GitHub">
              <Icon name="github" class="h-[18px] w-[18px]" />
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="LinkedIn">
              <Icon name="linkedin" class="h-[17px] w-[17px]" />
            </a>
            {#if social.twitter}
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" class="icon-btn" aria-label="X (Twitter)">
                <Icon name="x" class="h-4 w-4" />
              </a>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Role tags -->
      <ul class="animate-fade-up mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-2xs uppercase tracking-[0.16em] text-faint" style="animation-delay: 760ms">
        {#each roles as tag, i}
          <li class="flex items-center gap-5">
            {#if i > 0}<span class="h-1 w-1 rounded-full bg-fg/25" aria-hidden="true"></span>{/if}
            {tag}
          </li>
        {/each}
      </ul>
    </div>

    <!-- Portrait with floating credential badges -->
    {#if personal.profileImage}
      <div class="animate-fade-up lg:col-span-5" style="animation-delay: 350ms">
        <div class="relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-none lg:pl-8">
          <div
            class="absolute inset-8 -z-10 rounded-[2.5rem] blur-3xl"
            style="background: rgb(var(--accent) / calc(var(--glow-a) * 0.9))"
            aria-hidden="true"
          ></div>

          <div class="portrait card overflow-hidden rounded-[2rem] p-2">
            <div class="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
              <img
                src={personal.profileImage}
                alt="Portrait of {personal.name}"
                class="h-full w-full object-cover object-[62%_center]"
                fetchpriority="high"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
            </div>
          </div>

          {#if role}
            <div class="badge -left-3 top-8 sm:-left-8" style="--delay: 900ms; --drift: 6s">
              {#if role.companyLogo}
                <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white p-1.5">
                  <img src={role.companyLogo} alt="" class="h-full w-full object-contain" />
                </span>
              {/if}
              <span class="min-w-0">
                <span class="block truncate text-sm font-medium leading-tight">{role.title.replace("Site Reliability Engineer", "SRE")}</span>
                <span class="block truncate font-mono text-2xs text-muted">{role.company} · {role.location.split(",")[0]}</span>
              </span>
            </div>
          {/if}

          {#if degree}
            <div class="badge -right-3 top-[63%] sm:-right-8" style="--delay: 1050ms; --drift: 7s">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-fg">
                <Icon name="graduation-cap" class="h-5 w-5" />
              </span>
              <span class="min-w-0">
                <span class="block truncate text-sm font-medium leading-tight">{shortDegree ? `${shortDegree} · ` : ""}{degree.grade}</span>
                <span class="block truncate font-mono text-2xs text-muted">{degree.institution}</span>
              </span>
            </div>
          {/if}

          {#if award}
            <div class="badge -left-2 bottom-6 sm:-left-6" style="--delay: 1200ms; --drift: 5.5s">
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-500 dark:text-amber-300">
                <Icon name="trophy" class="h-5 w-5" />
              </span>
              <span class="min-w-0">
                <span class="block truncate text-sm font-medium leading-tight">{award.title}</span>
                <span class="block truncate font-mono text-2xs text-muted">{abbreviate(award.organization)} · {award.year}</span>
              </span>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>

  <!-- Scroll cue -->
  <a
    href="#about"
    class="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint transition-colors hover:text-fg md:flex"
  >
    Scroll
    <span class="relative h-10 w-px overflow-hidden bg-fg/10">
      <span class="scroll-dot absolute inset-x-0 top-0 h-3 bg-accent"></span>
    </span>
  </a>
</section>

<style>
  .mask {
    display: inline-block;
    overflow: hidden;
    padding-bottom: 0.08em;
    margin-bottom: -0.08em;
    vertical-align: bottom;
  }
  .rise {
    display: inline-block;
    animation: rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: var(--d);
  }
  @keyframes rise {
    from {
      transform: translateY(105%);
    }
  }

  .spot {
    background: radial-gradient(
      600px circle at var(--mx, 70%) var(--my, 30%),
      rgb(var(--accent) / 0.06),
      transparent 60%
    );
  }

  .portrait {
    transform: rotate(1.5deg);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .portrait:hover {
    transform: rotate(0deg) scale(1.01);
  }

  /* Glass credential badges that pop in, then drift gently */
  .badge {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    max-width: 17rem;
    padding: 0.6rem 0.9rem 0.6rem 0.6rem;
    border-radius: 1rem;
    border: 1px solid rgb(var(--line) / var(--line-a));
    background: rgb(var(--surface) / 0.82);
    -webkit-backdrop-filter: blur(14px) saturate(160%);
    backdrop-filter: blur(14px) saturate(160%);
    box-shadow: 0 18px 40px -16px rgb(0 0 0 / 0.45);
    animation:
      pop 0.8s cubic-bezier(0.16, 1, 0.3, 1) var(--delay) both,
      drift var(--drift) ease-in-out calc(var(--delay) + 0.8s) infinite;
  }
  @keyframes pop {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.92);
    }
  }
  @keyframes drift {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  .scroll-dot {
    animation: drip 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
  }
  @keyframes drip {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(350%);
    }
  }
</style>
