<script lang="ts">
  import About from "$lib/components/About.svelte";
  import Achievements from "$lib/components/Achievements.svelte";
  import CommandPalette, { type Command } from "$lib/components/CommandPalette.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Education from "$lib/components/Education.svelte";
  import Experience from "$lib/components/Experience.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Marquee from "$lib/components/Marquee.svelte";
  import Navigation from "$lib/components/Navigation.svelte";
  import PhotoCarousel from "$lib/components/PhotoCarousel.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import QRCode from "$lib/components/QRCode.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }
  let { data }: Props = $props();

  const portfolio = $derived(data.portfolio);
  const photos = $derived(data.photos?.length ? data.photos : portfolio.photos);

  // Credential badges on the hero portrait
  const award = $derived(
    portfolio.achievements.find((a) => /medal/i.test(a.title)) ?? portfolio.achievements[0],
  );

  let showQR = $state(false);
  let paletteOpen = $state(false);
  let darkMode = $state(true);

  onMount(() => {
    darkMode = document.documentElement.getAttribute("data-theme") !== "light";
  });

  // Theme switch with a circular reveal from the click point (View Transitions API)
  function toggleTheme(event?: MouseEvent) {
    const apply = () => {
      darkMode = !darkMode;
      const theme = darkMode ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("theme", theme);
      } catch {
        // storage unavailable (private mode); the theme still applies for this visit
      }
    };

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced) {
      apply();
      return;
    }

    const x = event?.clientX || innerWidth / 2;
    const y = event?.clientY || innerHeight / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  const scrollTo = (id: string) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const openUrl = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

  const commands = $derived<Command[]>(
    [
      { id: "home", label: "Home", group: "Navigate", icon: "arrow-up", run: scrollTo("home") },
      { id: "about", label: "About", group: "Navigate", icon: "sparkle", run: scrollTo("about") },
      { id: "experience", label: "Experience", group: "Navigate", icon: "briefcase", run: scrollTo("experience") },
      { id: "projects", label: "Projects", group: "Navigate", icon: "layout", run: scrollTo("projects") },
      { id: "skills", label: "Skills", group: "Navigate", icon: "code", run: scrollTo("skills") },
      { id: "education", label: "Education", group: "Navigate", icon: "graduation-cap", run: scrollTo("education") },
      { id: "photos", label: "Photography", group: "Navigate", icon: "camera", run: scrollTo("photos") },
      { id: "contact", label: "Contact", group: "Navigate", icon: "mail", run: scrollTo("contact") },
      { id: "github", label: "GitHub", group: "Links", icon: "github", hint: "↗", run: openUrl(portfolio.social.github) },
      { id: "linkedin", label: "LinkedIn", group: "Links", icon: "linkedin", hint: "↗", run: openUrl(portfolio.social.linkedin) },
      portfolio.social.twitter && { id: "x", label: "X / Twitter", group: "Links", icon: "x", hint: "↗", run: openUrl(portfolio.social.twitter) },
      portfolio.social.resume && { id: "resume", label: "Résumé", group: "Links", icon: "file", hint: "PDF ↗", run: openUrl(portfolio.social.resume) },
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: "copy",
        hint: portfolio.personal.email,
        run: () => navigator.clipboard?.writeText(portfolio.personal.email),
      },
      { id: "email", label: "Send an email", group: "Actions", icon: "mail", run: () => (location.href = `mailto:${portfolio.personal.email}`) },
      { id: "theme", label: darkMode ? "Switch to light theme" : "Switch to dark theme", group: "Actions", icon: darkMode ? "sun" : "moon", run: () => toggleTheme() },
      { id: "share", label: "Share via QR code", group: "Actions", icon: "qr", run: () => (showQR = true) },
    ].filter(Boolean) as Command[],
  );
</script>

<div class="relative min-h-screen overflow-x-clip">
  <Navigation
    {darkMode}
    {toggleTheme}
    bind:showQR
    openPalette={() => (paletteOpen = true)}
    social={portfolio.social}
    email={portfolio.personal.email}
  />

  <main>
    <Hero
      personal={portfolio.personal}
      social={portfolio.social}
      role={portfolio.experiences[0]}
      degree={portfolio.education[0]}
      {award}
    />
    <Marquee items={portfolio.additionalSkills} />
    <About personal={portfolio.personal} stats={portfolio.stats} signals={portfolio.signals} />
    <Experience experiences={portfolio.experiences} />
    <Projects projects={portfolio.projects} />
    <Skills skillCategories={portfolio.skillCategories} />
    <Education education={portfolio.education} />
    <Achievements achievements={portfolio.achievements} />
    <PhotoCarousel {photos} />
    <Contact personal={portfolio.personal} social={portfolio.social} />
  </main>

  <Footer name={portfolio.personal.name} openPalette={() => (paletteOpen = true)} />

  {#if showQR}
    <QRCode bind:show={showQR} />
  {/if}
  <CommandPalette bind:open={paletteOpen} {commands} />
  <div class="grain" aria-hidden="true"></div>
</div>
