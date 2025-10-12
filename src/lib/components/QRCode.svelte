<script lang="ts">
  import QRCodeLib from "qrcode";
  import { onMount } from "svelte";

  interface Props {
    show: boolean;
  }

  let { show = $bindable() }: Props = $props();
  let qrCodeDataURL = $state("");

  onMount(async () => {
    try {
      // Generate QR code for the website URL
      const url = window.location.origin;
      qrCodeDataURL = await QRCodeLib.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  });

  function closeModal() {
    show = false;
  }

  function downloadQR() {
    const link = document.createElement("a");
    link.download = "portfolio-qr-code.png";
    link.href = qrCodeDataURL;
    link.click();
  }
</script>

{#if show}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
    onclick={closeModal}
    role="dialog"
    aria-modal="true"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full sm:w-4/5 md:w-3/4 lg:w-1/2 p-4 sm:p-6 md:p-8 transform transition-all"
      onclick={(e) => e.stopPropagation()}
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          Share My Portfolio
        </h3>
        <button
          onclick={closeModal}
          class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Close"
        >
          <svg
            class="w-6 h-6 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- QR Code -->
      <div class="flex flex-col items-center">
        {#if qrCodeDataURL}
          <div class="bg-white p-4 rounded-xl shadow-inner mb-6">
            <img
              src={qrCodeDataURL}
              alt="Portfolio QR Code"
              class="w-64 h-64"
            />
          </div>

          <p class="text-center text-gray-600 dark:text-gray-300 mb-6">
            Scan this QR code to visit my portfolio on any device
          </p>

          <!-- Action Buttons -->
          <div class="flex gap-4 w-full">
            <button
              onclick={downloadQR}
              class="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>
            <button
              onclick={() => {
                navigator.clipboard.writeText(window.location.origin);
                alert("Link copied to clipboard!");
              }}
              class="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Link
            </button>
          </div>
        {:else}
          <div class="flex items-center justify-center h-64">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
            ></div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
