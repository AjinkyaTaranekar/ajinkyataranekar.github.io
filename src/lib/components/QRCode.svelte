<script lang="ts">
  import QRCodeLib from "qrcode";
  import { onMount } from "svelte";
  import { fade, scale } from "svelte/transition";
  import Icon from "./Icon.svelte";

  interface Props {
    show: boolean;
  }

  let { show = $bindable() }: Props = $props();
  let qrCodeDataURL = $state("");
  let url = $state("");
  let copied = $state(false);
  let closeBtn = $state<HTMLButtonElement>();

  onMount(async () => {
    closeBtn?.focus();
    try {
      // Generate QR code for the website URL
      url = window.location.origin;
      qrCodeDataURL = await QRCodeLib.toDataURL(url, {
        width: 320,
        margin: 1,
        color: {
          dark: "#08090a",
          light: "#ffffff",
        },
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  });

  function closeModal() {
    show = false;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      copied = true;
      setTimeout(() => (copied = false), 1600);
    } catch {
      // clipboard blocked; the URL is visible to copy manually
    }
  }
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && closeModal()} />

<div class="fixed inset-0 z-[85] flex items-center justify-center p-4" transition:fade|global={{ duration: 150 }}>
  <button class="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm" aria-label="Close" onclick={closeModal}></button>

  <div
    class="card relative w-full max-w-sm p-6 text-center shadow-2xl sm:p-8"
    role="dialog"
    aria-modal="true"
    aria-labelledby="qr-title"
    transition:scale|global={{ start: 0.95, duration: 250 }}
  >
    <button bind:this={closeBtn} onclick={closeModal} class="icon-btn absolute right-3 top-3" aria-label="Close">
      <Icon name="close" />
    </button>

    <p class="eyebrow justify-center">Share</p>
    <h3 id="qr-title" class="mt-3 text-2xl font-medium tracking-tight">Scan to visit</h3>

    <div class="mx-auto mt-6 grid aspect-square w-full max-w-[16rem] place-items-center rounded-2xl bg-white p-4 shadow-[0_0_0_6px_rgb(var(--accent)/0.25)]">
      {#if qrCodeDataURL}
        <img src={qrCodeDataURL} alt="QR code linking to {url}" class="h-full w-full" />
      {:else}
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-black/20 border-t-black"></div>
      {/if}
    </div>

    <button onclick={copyLink} class="btn-ghost mt-6 w-full justify-between font-mono text-xs" data-track="share" data-track-method="copy_link" data-track-placement="qr">
      <span class="truncate">{url.replace(/^https?:\/\//, "")}</span>
      <span class="flex items-center gap-1.5 {copied ? 'text-accent-ink' : 'text-muted'}">
        <Icon name={copied ? "check" : "copy"} class="h-3.5 w-3.5" />
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  </div>
</div>
