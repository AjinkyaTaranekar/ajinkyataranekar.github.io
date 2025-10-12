import portfolioData from "$lib/data/portfolio.json";
import type { Photo } from "$lib/types/portfolio";
import fs from "node:fs";
import path from "node:path";

export const load = async () => {
  const photosDir = path.join(process.cwd(), "static", "assets", "photos");
  const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

  let photos: Photo[] = [];

  try {
    const entries = fs.readdirSync(photosDir, { withFileTypes: true });
    let id = 1;
    photos = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => allowed.has(path.extname(name).toLowerCase()))
      // Exclude the profile image from the carousel by convention
      .filter((name) => name.toLowerCase() !== "profile.jpg")
      .map((name) => ({ id: String(id++), url: `/assets/photos/${name}` }));
  } catch (err) {
    // If reading fails (e.g., during certain build contexts), just return empty and allow client to fallback
    photos = [];
  }

  return { photos, portfolio: portfolioData } as {
    photos: Photo[];
    portfolio: typeof portfolioData;
  };
};
