<script lang="ts">
  import { page } from "$app/state";
  import Footer from "$lib/components/Footer.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import PageHeader from "$lib/components/PageHeader.svelte";
  // Named import so only this key is bundled, not the whole portfolio
  import { personal } from "$lib/data/portfolio.json";

  const { name, email } = personal;
  const notFound = $derived(page.status === 404);
</script>

<svelte:head>
  <!-- The title shows up in GA4's page reports, which makes broken inbound links easy to find -->
  <title>{notFound ? "Page not found" : "Something went wrong"} – {name}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="relative flex min-h-screen flex-col overflow-x-clip">
  <PageHeader {email} />

  <main class="container-page flex flex-1 flex-col justify-center py-24">
    <p class="eyebrow"><span class="text-accent-ink">{page.status}</span> {notFound ? "Not found" : "Error"}</p>
    <h1 class="h-section mt-5 max-w-3xl">
      {notFound ? "This page doesn't exist" : "Something went wrong"}<span class="serif-accent text-muted">{notFound ? " (anymore)." : "."}</span>
    </h1>
    <p class="mt-6 max-w-xl text-lg leading-relaxed text-muted">
      {notFound
        ? "The link may be old or mistyped. Everything lives on the home page, including the full project write-ups."
        : "Try reloading, or head back to the home page."}
    </p>
    <div class="mt-10 flex flex-wrap gap-3">
      <a href="/" class="btn-primary"><Icon name="arrow-right" class="h-4 w-4 rotate-180" /> Home</a>
      <a href="/#projects" class="btn-ghost">Projects</a>
      <a href="mailto:{email}" class="btn-ghost" data-track="contact_click" data-track-method="email" data-track-placement="error_page">
        <Icon name="mail" /> Email me
      </a>
    </div>
  </main>

  <Footer {name} />
</div>
