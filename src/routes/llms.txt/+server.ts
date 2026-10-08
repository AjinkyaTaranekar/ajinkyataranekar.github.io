import portfolioData from "$lib/data/portfolio.json";
import type { PortfolioData } from "$lib/types/portfolio";
import { SITE_URL, absolute } from "$lib/utils/seo";

export const prerender = true;

const data = portfolioData as unknown as PortfolioData;

/**
 * llms.txt for AI search and assistants, generated from portfolio.json at
 * build time so it always matches the site. https://llmstxt.org
 */
export function GET() {
  const { personal: p, social: s, seo } = data;
  const out: string[] = [];
  const line = (label: string, value?: string) => value && out.push(`- ${label}: ${value}`);

  out.push(`# ${p.name}`, "", `> ${seo.description}`, "");

  out.push("## Personal Information");
  line("Name", p.name);
  line("Role", seo.jobTitle);
  line("Latest position", p.title);
  line("Location", p.location);
  line("Email", p.email);
  line("Availability", p.availability);
  line("Website", `${SITE_URL}/`);
  out.push("");

  out.push("## Bio", "", ...p.bio.flatMap((para) => [para, ""]));
  if (p.motto) out.push(`Motto: ${p.motto}`, "");

  out.push("## Links");
  line("GitHub", s.github);
  line("LinkedIn", s.linkedin);
  line("Twitter", s.twitter);
  line("Resume", s.resume);
  out.push("");

  out.push("## Experience", "");
  for (const e of data.experiences) {
    out.push(`### ${e.title}, ${e.company}`);
    line("Period", e.period);
    line("Location", e.location);
    line("Type", e.type === "internship" ? "Internship" : "Full-time");
    line("Summary", e.description);
    for (const h of e.highlights ?? []) out.push(`  - ${h}`);
    line("Technologies", e.technologies.join(", "));
    out.push("");
  }

  out.push("## Projects", "");
  for (const pr of data.projects) {
    out.push(`### ${pr.title}`);
    line("Award", pr.winner);
    line("Summary", pr.description);
    for (const h of pr.highlights ?? []) out.push(`  - ${h}`);
    line("Technologies", pr.technologies.join(", "));
    line("Source", pr.github);
    line("Demo video", pr.video);
    line("Link", pr.link);
    line("Report", pr.document);
    out.push("");
  }

  out.push("## Education", "");
  for (const e of data.education) {
    out.push(`### ${e.degree}`);
    line("Institution", e.institution);
    line("Period", e.period);
    line("Grade", e.grade);
    line("Summary", e.description);
    for (const a of e.achievements) out.push(`  - ${a}`);
    out.push("");
  }

  out.push("## Awards", "");
  for (const a of data.achievements) out.push(`- ${a.title}, ${a.organization} (${a.year}): ${a.description}`);
  out.push("");

  out.push("## Skills", "");
  for (const c of data.skillCategories) out.push(`- ${c.name}: ${c.skills.map((sk) => sk.name).join(", ")}`);
  out.push("");

  if (data.signals?.metrics.length) {
    out.push("## Impact", "");
    for (const m of data.signals.metrics) out.push(`- ${m.label}: ${m.value}`);
    if (data.signals.latency) {
      const l = data.signals.latency;
      out.push(`- ${l.label}: ${l.from} → ${l.to}`);
    }
    out.push("");
  }

  out.push("## Optional", "");
  out.push(`- [Social preview card](${absolute(seo.image)})`);
  out.push(`- [Sitemap](${SITE_URL}/sitemap.xml)`, "");

  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
