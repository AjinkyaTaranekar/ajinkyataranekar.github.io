<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import type { PersonalInfo, SocialLinks } from "$lib/types/portfolio";
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";

  interface Props {
    personal: PersonalInfo;
    social: SocialLinks;
    timeZone?: string;
  }

  let { personal, social, timeZone = "Europe/Dublin" }: Props = $props();

  let copied = $state(false);
  let localTime = $state("");

  onMount(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    const update = () => (localTime = fmt.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
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

  const links = $derived(
    [
      { label: "GitHub", value: social.github.replace(/^https?:\/\/(www\.)?/, ""), href: social.github, icon: "github", event: "social_click" },
      { label: "LinkedIn", value: social.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: social.linkedin, icon: "linkedin", event: "social_click" },
      social.twitter && { label: "X / Twitter", value: "@" + social.twitter.split("/").pop(), href: social.twitter, icon: "x", event: "social_click" },
      social.resume && { label: "Résumé", value: "View PDF", href: social.resume, icon: "file", event: "resume_open" },
    ].filter(Boolean) as { label: string; value: string; href: string; icon: string; event: string }[],
  );
</script>

<section id="contact" class="section">
  <div class="container-page">
    <div class="card relative overflow-hidden" use:reveal>
      <!-- Backdrop -->
      <div class="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true"></div>
      <div
        class="pointer-events-none absolute -bottom-48 -left-24 h-[30rem] w-[30rem] rounded-full blur-[110px]"
        style="background: rgb(var(--accent) / calc(var(--glow-a) * 0.6))"
        aria-hidden="true"
      ></div>

      <div class="relative grid gap-14 p-6 py-14 sm:p-12 lg:grid-cols-12 lg:gap-10 lg:p-16">
        <div class="lg:col-span-7">
          <p class="eyebrow"><span class="text-accent-ink">07</span> Contact</p>
          <h2 class="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Let's build something
            <span class="serif-accent text-accent-ink">that lasts.</span>
          </h2>
          <p class="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            {personal.availability}{personal.lookingFor ? `: ${personal.lookingFor}` : ""}.
            My inbox is always open.
          </p>

          <!-- Click-to-copy email -->
          <button
            onclick={copyEmail}
            data-track="contact_click"
            data-track-method="copy_email"
            data-track-placement="contact"
            class="group mt-10 flex max-w-full items-center gap-3 rounded-2xl border bg-bg/60 py-3 pl-5 pr-3 text-left transition-colors hairline hover:border-accent/60"
            aria-label="Copy email address {personal.email}"
          >
            <span class="truncate font-mono text-sm sm:text-lg">{personal.email}</span>
            <span
              class="grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors {copied
                ? 'bg-accent text-accent-fg'
                : 'bg-surface-2 text-muted group-hover:text-fg'}"
            >
              <Icon name={copied ? "check" : "copy"} class="h-4 w-4" strokeWidth={copied ? 2.4 : 1.6} />
            </span>
          </button>
          <p class="mt-2 h-4 font-mono text-2xs text-accent-ink" aria-live="polite">
            {copied ? "Copied to clipboard" : ""}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <a href="mailto:{personal.email}" class="btn-primary group" data-track="contact_click" data-track-method="email" data-track-placement="contact">
              <Icon name="mail" /> Say hello
              <Icon name="arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            {#if personal.phone}
              <a href="tel:{personal.phone.replace(/\s/g, '')}" class="btn-ghost font-mono text-xs" data-track="contact_click" data-track-method="phone" data-track-placement="contact">{personal.phone}</a>
            {/if}
          </div>
        </div>

        <!-- Details & links -->
        <div class="flex flex-col justify-end lg:col-span-5">
          <div class="mb-8 grid grid-cols-2 gap-4">
            <div class="rounded-xl border bg-bg/50 p-4 hairline">
              <p class="font-mono text-2xs uppercase tracking-wider text-faint">Based in</p>
              <p class="mt-1.5 text-sm">{personal.location}</p>
            </div>
            <div class="rounded-xl border bg-bg/50 p-4 hairline">
              <p class="font-mono text-2xs uppercase tracking-wider text-faint">Local time</p>
              <p class="mt-1.5 flex items-center gap-2 text-sm tabular-nums">
                <Icon name="clock" class="h-3.5 w-3.5 text-muted" />
                {localTime || "—"}
              </p>
            </div>
          </div>

          <ul class="border-t hairline">
            {#each links as link}
              <li class="border-b hairline">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track={link.event}
                  data-track-network={link.event === "social_click" ? link.icon : undefined}
                  data-track-placement="contact"
                  class="group flex items-center gap-4 py-4 transition-colors"
                >
                  <Icon name={link.icon} class="h-[18px] w-[18px] text-muted transition-colors group-hover:text-fg" />
                  <span class="font-medium">{link.label}</span>
                  <span class="ml-auto truncate font-mono text-2xs text-faint transition-colors group-hover:text-muted">{link.value}</span>
                  <span class="relative h-4 w-4 shrink-0 overflow-hidden text-muted group-hover:text-accent-ink">
                    <Icon name="arrow-up-right" class="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-4 group-hover:translate-x-4" />
                    <Icon name="arrow-up-right" class="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
