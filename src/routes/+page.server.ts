import portfolioData from "$lib/data/portfolio.json";
import type { Photo, PortfolioData } from "$lib/types/portfolio";
import fs from "node:fs";
import path from "node:path";

/**
 * Reads pixel dimensions from a JPEG or PNG header so the gallery can reserve
 * the right space for each photo before it loads (no layout shift).
 */
function imageSize(file: string): { width: number; height: number } | null {
  try {
    const buf = fs.readFileSync(file);
    // PNG: width/height live in the IHDR chunk
    if (buf.readUInt32BE(0) === 0x89504e47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    // JPEG: walk the segments until a start-of-frame marker
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        if (buf[i] !== 0xff) {
          i++;
          continue;
        }
        const marker = buf[i + 1];
        if (marker >= 0xc0 && marker <= 0xc3) {
          return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
  } catch {
    // Fall through: the gallery copes without dimensions
  }
  return null;
}

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
      .map((name) => {
        const size = imageSize(path.join(photosDir, name));
        return {
          id: String(id++),
          url: `/assets/photos/${name}`,
          ...(size ?? {}),
        };
      });
  } catch (err) {
    // If reading fails (e.g., during certain build contexts), just return empty and allow client to fallback
    photos = [];
  }

  return { photos, portfolio: portfolioData as unknown as PortfolioData };
};
