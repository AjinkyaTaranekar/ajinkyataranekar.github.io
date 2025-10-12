<script lang="ts">
  import About from "$lib/components/About.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import Education from "$lib/components/Education.svelte";
  import Experience from "$lib/components/Experience.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Navigation from "$lib/components/Navigation.svelte";
  import PhotoCarousel from "$lib/components/PhotoCarousel.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import QRCode from "$lib/components/QRCode.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  let showQR = $state(false);
  let darkMode = $state(false);

  interface Props {
    data: PageData;
  }
  let { data }: Props = $props();

  onMount(() => {
    // Check for saved theme preference or default to dark (luxury) mode
    const savedTheme = localStorage.getItem("theme");
    darkMode = savedTheme === "luxury" || savedTheme === null; // Default to luxury theme

    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "luxury");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  });

  function toggleTheme() {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "luxury");
      localStorage.setItem("theme", "luxury");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }
</script>

<div
  class="min-h-screen bg-base-100 transition-colors duration-300 overflow-x-hidden"
>
  <Navigation {darkMode} {toggleTheme} bind:showQR />

  <main class="w-full">
    <Hero personal={data.portfolio.personal} />
    <About personal={data.portfolio.personal} stats={data.portfolio.stats} />
    <Experience experiences={data.portfolio.experiences} />
    <Projects projects={data.portfolio.projects} />
    <Skills
      skillCategories={data.portfolio.skillCategories}
      additionalSkills={data.portfolio.additionalSkills}
    />
    <Education education={data.portfolio.education} />
    <PhotoCarousel
      photos={data.photos && data.photos.length
        ? data.photos
        : data.portfolio.photos}
    />
    <Contact
      personal={data.portfolio.personal}
      social={data.portfolio.social}
    />
  </main>
  <!-- Footer with DaisyUI classes -->
  <footer
    class="footer footer-center bg-white dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-white p-6 sm:p-8 md:p-10"
  >
    <aside>
      <p class="font-semibold text-base sm:text-lg">
        {data.portfolio.personal.name}
      </p>
      <p class="text-gray-900 dark:text-white/60 text-sm sm:text-base">
        &copy; {new Date().getFullYear()}
        {data.portfolio.personal.name}. All rights reserved.
      </p>
      <p class="text-gray-900 dark:text-white/60 text-xs sm:text-sm mt-2">
        Built with ❤️ using Poha and Jalebi.
      </p>
    </aside>
  </footer>

  {#if showQR}
    <QRCode bind:show={showQR} />
  {/if}
</div>
