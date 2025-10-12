<script lang="ts">
  import type { PersonalInfo } from "$lib/types/portfolio";
  import { onMount } from "svelte";
  import TypewriterEffect from "./TypewriterEffect.svelte";

  interface Props {
    personal: PersonalInfo;
  }

  let { personal }: Props = $props();
  let visible = $state(false);

  onMount(() => {
    visible = true;
  });
</script>

<section
  id="home"
  class="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
>
  <div class="container mx-auto px-4 sm:px-6 text-center">
    <div
      class="transform transition-all duration-1000 {visible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0'}"
    >
      <h1
        class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 px-2"
      >
        Hi, I'm <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
          >{personal.name}</span
        >
      </h1>
      <div
        class="text-base sm:text-xl md:text-2xl text-gray-900 dark:text-white/80 mb-8 min-h-[2em] px-4 sm:px-0"
      >
        <TypewriterEffect text={personal.tagline} speed={50} delay={500} />
      </div>
      <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
        <a
          href="#projects"
          class="btn btn-primary btn-md sm:btn-lg text-xs sm:text-sm md:text-base px-3 sm:px-6"
        >
          View My Work
        </a>
        <a
          href="#contact"
          class="btn btn-outline btn-primary btn-md sm:btn-lg text-xs sm:text-sm md:text-base px-3 sm:px-6"
        >
          Get In Touch
        </a>
      </div>

      <!-- Scroll Indicator -->
      <div class="mt-16 animate-bounce">
        <svg
          class="w-6 h-6 mx-auto text-gray-900 dark:text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  </div>
</section>

<style>
  @keyframes blob {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }

  :global(.animate-blob) {
    animation: blob 7s infinite;
  }

  :global(.animation-delay-2000) {
    animation-delay: 2s;
  }

  :global(.animation-delay-4000) {
    animation-delay: 4s;
  }
</style>
