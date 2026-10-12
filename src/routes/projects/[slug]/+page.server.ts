import portfolioData from "$lib/data/portfolio.json";
import type { PortfolioData } from "$lib/types/portfolio";
import type { ProjectSummary } from "$lib/utils/commands";
import { error } from "@sveltejs/kit";
import fs from "node:fs";
import path from "node:path";
import type { EntryGenerator, PageServerLoad } from "./$types";

const data = portfolioData as unknown as PortfolioData;

// /projects/<slug>/ -> projects/<slug>/index.html (see projectPath)
export const trailingSlash = "always";

// Prerender one page per project
export const entries: EntryGenerator = () => data.projects.map((p) => ({ slug: p.slug }));

export const load: PageServerLoad = ({ params }) => {
  const index = data.projects.findIndex((p) => p.slug === params.slug);
  if (index < 0) error(404, "Project not found");

  const project = data.projects[index];

  // Social card from scripts/og-images.py, else the site-wide one
  const card = `/og/projects/${project.slug}.jpg`;
  const ogImage = fs.existsSync(path.join(process.cwd(), "static", card)) ? card : data.seo.image;

  return {
    project,
    index,
    ogImage,
    // Compact list for the project switcher and the command palette
    projects: data.projects.map(({ slug, title, technologies, winner }): ProjectSummary => ({
      slug,
      title,
      technologies: technologies.slice(0, 3),
      winner,
    })),
    personal: (({ name, email, intro, availability, lookingFor }) => ({ name, email, intro, availability, lookingFor }))(data.personal),
    social: { github: data.social.github, linkedin: data.social.linkedin, resume: data.social.resume, twitter: data.social.twitter },
  };
};
