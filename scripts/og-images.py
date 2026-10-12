"""Builds 1200x630 social preview cards for project pages.

Each project's cover image is fitted (never cropped) onto the site's dark
surface and saved as static/og/projects/<slug>.jpg. Project pages fall back
to the site-wide og-image.jpg when a card is missing, so re-run this after
adding a project or changing its image:

    python scripts/og-images.py      (needs Pillow: pip install pillow)
"""

import json
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / "static"
OUT = STATIC / "og" / "projects"

W, H = 1200, 630
PAD = 56
RADIUS = 20
BG = (8, 9, 10)  # --bg (dark theme)
SURFACE = (23, 24, 27)  # --surface-2 (dark theme)
ACCENT = (52, 211, 153)  # --accent


def card(src: Path) -> Image.Image:
    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        backdrop = Image.new("RGBA", im.size, SURFACE + (255,))
        im = Image.alpha_composite(backdrop, im)
    im = im.convert("RGB")
    # Fit inside the padded area; small sources may grow up to 2x so they don't look like stamps
    scale = min((W - 2 * PAD) / im.width, (H - 2 * PAD - 8) / im.height, 2.0)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)

    canvas = Image.new("RGB", (W, H), BG)
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *im.size), RADIUS, fill=255)
    canvas.paste(im, ((W - im.width) // 2, (H - im.height) // 2 - 4), mask)
    # Accent rule along the bottom edge, as on the site's cards
    ImageDraw.Draw(canvas).rectangle((0, H - 8, W, H), fill=ACCENT)
    return canvas


def main():
    data = json.loads((ROOT / "src" / "lib" / "data" / "portfolio.json").read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)
    for project in data["projects"]:
        image = project.get("image")
        if not image:
            continue
        # Prefer the full-resolution PNG/JPG when one sits next to the WebP
        src = STATIC / image.lstrip("/")
        for ext in (".png", ".jpg", ".jpeg"):
            if src.with_suffix(ext).exists():
                src = src.with_suffix(ext)
                break
        out = OUT / f"{project['slug']}.jpg"
        card(src).save(out, "JPEG", quality=86, optimize=True, progressive=True)
        print(f"{out.relative_to(ROOT)}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
