import { goto } from "$app/navigation";
import type { Command } from "$lib/components/CommandPalette.svelte";
import type { Project } from "$lib/types/portfolio";
import { projectPath } from "./project";

export type ProjectSummary = Pick<Project, "slug" | "title" | "technologies" | "winner">;

/**
 * One command-palette entry per project page. The hint shows the main stack,
 * and the palette searches hints too, so "pytorch" or "go" finds projects.
 */
export const projectCommands = (projects: ProjectSummary[], current?: string): Command[] =>
  projects.map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    group: "Projects",
    icon: p.winner ? "trophy" : "layout",
    hint: p.slug === current ? "You're here" : p.technologies.slice(0, 2).join(" · "),
    run: () => goto(projectPath(p.slug)),
  }));
