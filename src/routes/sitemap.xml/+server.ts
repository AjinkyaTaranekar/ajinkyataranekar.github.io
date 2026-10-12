import portfolioData from "$lib/data/portfolio.json";
import type { PortfolioData } from "$lib/types/portfolio";
import { SITE_URL, projectUrl } from "$lib/utils/seo";

export const prerender = true;

const data = portfolioData as unknown as PortfolioData;

// Home page plus one page per project; lastmod is stamped at build time.
export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const url = (loc: string, priority: string) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[url(`${SITE_URL}/`, "1.0"), ...data.projects.map((p) => url(projectUrl(p.slug), p.archived ? "0.5" : "0.8"))].join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
