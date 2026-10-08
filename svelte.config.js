import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Inline CSS into the prerendered HTML (the whole bundle is ~40 KB raw,
    // ~9 KB gzipped), so first paint doesn't wait on a separate request.
    inlineStyleThreshold: 60000,
    // Using adapter-static for GitHub Pages deployment
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
  },
};

export default config;
