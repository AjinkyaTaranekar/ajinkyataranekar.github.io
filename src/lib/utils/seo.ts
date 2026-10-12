import type { PortfolioData, Project } from "$lib/types/portfolio";
import { projectPath } from "./project";

export const SITE_URL = "https://ajinkyataranekar.github.io";

/** Absolute URL for a site path ("/og-image.jpg" -> "https://…/og-image.jpg"). */
export const absolute = (path: string) => new URL(path, SITE_URL + "/").href;

/**
 * schema.org ProfilePage + Person, built from portfolio data so it never
 * drifts from what the page shows. https://developers.google.com/search/docs/appearance/structured-data/profile-page
 */
export function profileJsonLd(data: PortfolioData, modified = new Date()) {
  const { personal, social, seo } = data;
  const knowsAbout = [...new Set(data.skillCategories.flatMap((c) => c.skills.map((s) => s.name)))];

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_URL + "/",
    name: seo.title,
    dateModified: modified.toISOString().slice(0, 10),
    mainEntity: {
      "@type": "Person",
      "@id": SITE_URL + "/#person",
      name: personal.name,
      url: SITE_URL + "/",
      image: personal.profileImage ? absolute(personal.profileImage) : undefined,
      jobTitle: seo.jobTitle,
      description: seo.description,
      email: `mailto:${personal.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
      alumniOf: data.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
      award: data.achievements.map((a) => `${a.title} – ${a.organization} (${a.year})`),
      knowsAbout,
      sameAs: [social.github, social.linkedin, social.twitter, ...(seo.sameAs ?? [])].filter(Boolean),
    },
  };
}

/** Canonical URL of a project page. */
export const projectUrl = (slug: string) => SITE_URL + projectPath(slug);

/**
 * schema.org description of a project page: the work itself (source code when
 * there is a repository), credited to the Person on the home page, plus a breadcrumb.
 */
export function projectJsonLd(project: Project, person: { name: string }) {
  const url = projectUrl(project.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": project.github ? "SoftwareSourceCode" : "CreativeWork",
        "@id": url + "#project",
        name: project.title,
        description: project.description,
        url,
        image: project.image ? absolute(project.image) : undefined,
        author: { "@type": "Person", "@id": SITE_URL + "/#person", name: person.name, url: SITE_URL + "/" },
        keywords: project.technologies.join(", "),
        codeRepository: project.github,
        award: project.winner,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: person.name, item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
    ],
  };
}

/** Serialise JSON for an inline <script>, escaping "<" so it cannot close the tag. */
export const jsonForScript = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
