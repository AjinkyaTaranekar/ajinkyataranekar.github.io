import portfolioData from "$lib/data/portfolio.json";
import type { PortfolioData } from "$lib/types/portfolio";
import { isOngoing } from "$lib/utils/period";
import { SITE_URL, absolute, projectUrl } from "$lib/utils/seo";

export const prerender = true;

const data = portfolioData as unknown as PortfolioData;

/**
 * llms.txt for AI search and assistants, generated from portfolio.json at
 * build time so it always matches the site. https://llmstxt.org
 *
 * Layout follows the spec: H1, a one-line summary in a blockquote, a short
 * plain-text status paragraph, then H2 sections. Facts are stated with dates
 * and context so a model can't mistake a past role for a current one or
 * attribute a metric to the wrong employer.
 */
export function GET() {
  const { personal: p, social: s, seo } = data;
  const out: string[] = [];
  const line = (label: string, value?: string) => value && out.push(`- ${label}: ${value}`);
  const link = (label: string, url?: string, note?: string) =>
    url && out.push(`- [${label}](${url})${note ? `: ${note}` : ""}`);

  const updated = new Date().toISOString().slice(0, 10);
  const latest = data.experiences[0];
  const current = latest && isOngoing(latest.period);
  const latestRole = latest && `${latest.title} at ${latest.company} (${latest.period}${current ? ", current" : ", completed"})`;
  const availability = p.lookingFor ? `${p.availability}: ${p.lookingFor}` : p.availability;
  const resume = s.resume && absolute(s.resume);

  out.push(`# ${p.name}`, "", `> ${seo.description}`, "");
  out.push(
    `${p.name} is a ${seo.jobTitle.toLowerCase()} based in ${p.location}. ` +
      (latestRole ? `${current ? "Current" : "Most recent"} role: ${latestRole}. ` : "") +
      `${availability}. The best way to get in touch is email: ${p.email}.`,
    "",
    `Last updated: ${updated}.`,
    "",
  );

  out.push("## Profile");
  line("Name", p.name);
  line("Headline", seo.jobTitle);
  line(current ? "Current position" : "Most recent position", latestRole);
  line("Location", p.location);
  line("Availability", availability);
  line("Email (preferred contact)", p.email);
  line("Website", `${SITE_URL}/`);
  line("Résumé (PDF)", resume);
  out.push("");

  out.push("## Bio", "", ...p.bio.flatMap((para) => [para, ""]));
  if (p.motto) out.push(`Motto: ${p.motto}`, "");

  out.push("## Links");
  link("GitHub", s.github, "source code for most projects below");
  link("LinkedIn", s.linkedin);
  link("X / Twitter", s.twitter, s.twitter && `@${s.twitter.split("/").pop()}`);
  for (const url of seo.sameAs ?? []) {
    // "https://devpost.com/handle" -> [Devpost](…): handle
    const { hostname, pathname } = new URL(url);
    const site = hostname.replace(/^www\./, "").split(".")[0];
    link(site[0].toUpperCase() + site.slice(1), url, pathname.replace(/^\/|\/$/g, "") || undefined);
  }
  link("Résumé (PDF)", resume);
  out.push("");

  out.push("## Experience", "");
  for (const e of data.experiences) {
    out.push(`### ${e.title}, ${e.company}`);
    line("Period", `${e.period}${isOngoing(e.period) ? " (current)" : ""}`);
    line("Location", e.location);
    line("Type", e.type === "internship" ? "Internship" : "Full-time");
    line("Summary", e.description);
    for (const h of e.highlights ?? []) out.push(`  - ${h}`);
    line("Technologies", e.technologies.join(", "));
    out.push("");
  }

  out.push("## Projects", "", `Each project has its own page on ${SITE_URL}.`, "");
  for (const pr of data.projects) {
    out.push(`### ${pr.title}`);
    line("Page", projectUrl(pr.slug));
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
  const listed = new Set(data.skillCategories.flatMap((c) => c.skills.map((sk) => sk.name.toLowerCase())));
  const more = data.additionalSkills.filter((sk) => !listed.has(sk.toLowerCase()));
  if (more.length) out.push(`- Also: ${more.join(", ")}`);
  out.push("");

  if (data.signals?.metrics.length) {
    out.push("## Impact", "");
    if (data.signals.context) out.push(`${data.signals.context}:`, "");
    for (const m of data.signals.metrics) out.push(`- ${m.label}: ${m.value}`);
    if (data.signals.latency) {
      const l = data.signals.latency;
      out.push(`- ${l.label}: ${l.from} → ${l.to}`);
    }
    out.push("");
  }

  out.push("## Optional", "");
  link("Résumé (PDF)", resume, "one-page summary of the above");
  link("Sitemap", `${SITE_URL}/sitemap.xml`, "every page on the site");
  out.push("");

  return new Response(out.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
