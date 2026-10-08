import { SITE_URL } from "$lib/utils/seo";

export const prerender = true;

// Single-page site; lastmod is stamped at build time.
export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
