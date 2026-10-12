import type { Project } from "$lib/types/portfolio";

export interface ProjectLink {
  href: string;
  label: string;
  icon: string;
  /** Stable name for analytics (`link_type`). */
  kind: "source" | "video" | "demo" | "link" | "report";
}

/**
 * Site path of a project page. The trailing slash makes the static build write
 * projects/<slug>/index.html next to its __data.json, instead of a <slug>.html
 * file beside a <slug>/ folder, which GitHub Pages can resolve to a 404.
 */
export const projectPath = (slug: string) => `/projects/${slug}/`;

/** "https://www.youtube.com/watch?v=ID" / "youtu.be/ID" -> "ID" */
export const youtubeId = (url?: string) => url?.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1];

/** Privacy-enhanced embed; enablejsapi lets GA4 measure video engagement. */
export const youtubeEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&enablejsapi=1`;

export function projectLinks(project: Project): ProjectLink[] {
  return [
    project.github && { href: project.github, label: "Source", icon: "github", kind: "source" },
    project.video && { href: project.video, label: "Watch demo", icon: "play", kind: "video" },
    project.demo && { href: project.demo, label: "Live demo", icon: "arrow-up-right", kind: "demo" },
    project.link && { href: project.link, label: "Read more", icon: "arrow-up-right", kind: "link" },
    project.document && { href: project.document, label: "Report", icon: "file", kind: "report" },
  ].filter(Boolean) as ProjectLink[];
}

/** Trims to a meta-description length at a word boundary. */
export function summarize(text: string, max = 158) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[\s,;:.–—-]+$/, "") + "…";
}
