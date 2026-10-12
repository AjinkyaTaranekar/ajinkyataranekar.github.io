<script lang="ts">
  import type { SocialLinks } from "$lib/types/portfolio";
  import { onMount, tick } from "svelte";
  import Icon from "./Icon.svelte";

  interface Props {
    darkMode: boolean;
    toggleTheme: (event?: MouseEvent) => void;
    showQR: boolean;
    openPalette: () => void;
    social: SocialLinks;
    email: string;
  }

  let { darkMode, toggleTheme, showQR = $bindable(), openPalette, social, email }: Props = $props();

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  let mobileMenuOpen = $state(false);
  let scrolled = $state(false);
  let progress = $state(0);
  let active = $state("");
  let isMac = $state(true);

  let linkEls: HTMLAnchorElement[] = $state([]);
  let indicator = $state({ left: 0, width: 0, visible: false });

  function updateIndicator() {
    const index = navItems.findIndex((item) => item.href === `#${active}`);
    const el = linkEls[index];
    indicator = el
      ? { left: el.offsetLeft, width: el.offsetWidth, visible: true }
      : { ...indicator, visible: false };
  }

  onMount(() => {
    isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrolled = y > 8;
        progress = max > 0 ? Math.min(1, y / max) : 0;

        let current = "";
        for (const section of sections) {
          if (section.getBoundingClientRect().top < window.innerHeight * 0.4) {
            current = section.id;
          }
        }
        if (current !== active) {
          active = current;
          tick().then(updateIndicator);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateIndicator);
      cancelAnimationFrame(frame);
    };
  });

  // Lock page scroll while the full-screen mobile menu is open
  $effect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  });

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") mobileMenuOpen = false;
  }
</script>

<svelte:window onkeydown={onKeydown} />

<!-- Scroll progress -->
<div
  class="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
  style="transform: scaleX({progress})"
  aria-hidden="true"
></div>

<header
  class="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out {scrolled
    ? 'glass border-b hairline'
    : 'border-b border-transparent'}"
>
  <nav class="container-page flex h-16 items-center justify-between gap-4" aria-label="Primary">
    <!-- Monogram -->
    <a href="#home" class="group flex items-center gap-2.5" aria-label="AT Ajinkya Taranekar, back to top">
      <span
        aria-hidden="true"
        class="relative grid h-8 w-8 place-items-center rounded-lg border bg-surface font-mono text-xs font-semibold tracking-tight hairline transition-transform duration-300 group-hover:-rotate-6"
      >
        <span>AT<span class="ml-[1.5px] inline-block h-[5px] w-[5px] rounded-full bg-accent"></span></span>
      </span>
      <span class="hidden font-medium tracking-tight sm:inline">Ajinkya</span>
    </a>

    <!-- Desktop links with a sliding active pill -->
    <div
      class="relative hidden items-center rounded-full border bg-surface/60 p-1 hairline lg:flex"
    >
      <span
        class="absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-fg/[0.08] transition-all duration-500 ease-out"
        style="left: {indicator.left}px; width: {indicator.width}px; opacity: {indicator.visible
          ? 1
          : 0}"
        aria-hidden="true"
      ></span>
      {#each navItems as item, i}
        <a
          bind:this={linkEls[i]}
          href={item.href}
          class="relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 {active ===
          item.href.slice(1)
            ? 'text-fg'
            : 'text-muted hover:text-fg'}"
          aria-current={active === item.href.slice(1) ? "true" : undefined}
        >
          {item.name}
        </a>
      {/each}
    </div>

    <!-- Controls -->
    <div class="flex items-center gap-1">
      <!-- The labelled search pill gives way to an icon from lg to xl, where the
           section links appear and the bar would otherwise overflow -->
      <button
        onclick={openPalette}
        class="hidden items-center gap-2 rounded-full border bg-surface/60 py-1.5 pl-3 pr-1.5 text-sm text-muted transition-colors hairline hover:text-fg md:inline-flex lg:hidden xl:inline-flex"
        aria-label="Open command menu"
      >
        <Icon name="search" class="h-3.5 w-3.5" />
        <span>Search</span>
        <span class="flex gap-0.5">
          <kbd class="kbd">{isMac ? "⌘" : "Ctrl"}</kbd><kbd class="kbd">K</kbd>
        </span>
      </button>
      <button onclick={openPalette} class="icon-btn md:hidden lg:inline-flex xl:hidden" aria-label="Open command menu">
        <Icon name="search" />
      </button>
      <button onclick={() => (showQR = true)} class="icon-btn" aria-label="Share this site" data-track="share" data-track-method="qr" data-track-placement="nav">
        <Icon name="qr" />
      </button>
      <button
        onclick={toggleTheme}
        class="icon-btn"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {#key darkMode}
          <span class="animate-scale-in">
            <Icon name={darkMode ? "sun" : "moon"} />
          </span>
        {/key}
      </button>
      {#if social.resume}
        <a href={social.resume} target="_blank" rel="noopener noreferrer" class="btn-ghost ml-1 hidden !px-4 !py-2 text-xs sm:inline-flex" data-track="resume_open" data-track-placement="nav">
          <Icon name="file" class="h-3.5 w-3.5" /> Résumé
        </a>
      {/if}
      <a href="mailto:{email}" class="btn-primary ml-1 hidden !px-4 !py-2 text-xs sm:inline-flex" data-track="contact_click" data-track-method="email" data-track-placement="nav">
        <Icon name="mail" class="h-3.5 w-3.5" /> Email me
      </a>
      <a href="mailto:{email}" class="icon-btn sm:hidden" aria-label="Email me" data-track="contact_click" data-track-method="email" data-track-placement="nav">
        <Icon name="mail" />
      </a>
      <button
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        class="icon-btn lg:hidden"
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <Icon name={mobileMenuOpen ? "close" : "menu"} />
      </button>
    </div>
  </nav>
</header>

<!-- Full-screen mobile menu -->
{#if mobileMenuOpen}
  <div class="glass fixed inset-0 z-40 flex flex-col px-5 pb-10 pt-24 sm:px-8 lg:hidden">
    <ul class="flex flex-col">
      {#each navItems as item, i}
        <li class="animate-fade-up border-b hairline" style="animation-delay: {i * 50}ms">
          <a
            href={item.href}
            onclick={() => (mobileMenuOpen = false)}
            class="flex items-baseline gap-4 py-4 text-3xl font-medium tracking-tight"
          >
            <span class="font-mono text-xs text-faint">0{i + 1}</span>
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
    <div class="mt-auto flex flex-wrap gap-2 animate-fade-up" style="animation-delay: 350ms">
      <a href="mailto:{email}" class="btn-primary" data-track="contact_click" data-track-method="email" data-track-placement="menu">
        <Icon name="mail" /> Email me
      </a>
      {#if social.resume}
        <a href={social.resume} target="_blank" rel="noopener noreferrer" class="btn-ghost" data-track="resume_open" data-track-placement="menu">
          <Icon name="file" /> Résumé
        </a>
      {/if}
      <a href={social.github} target="_blank" rel="noopener noreferrer" class="btn-ghost" data-track="social_click" data-track-network="github" data-track-placement="menu">
        <Icon name="github" /> GitHub
      </a>
      <a href={social.linkedin} target="_blank" rel="noopener noreferrer" class="btn-ghost" data-track="social_click" data-track-network="linkedin" data-track-placement="menu">
        <Icon name="linkedin" /> LinkedIn
      </a>
    </div>
  </div>
{/if}
