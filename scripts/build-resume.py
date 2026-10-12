"""Builds static/resume.pdf from resume/resume.tex with LuaLaTeX.

LuaLaTeX embeds the fonts as compact OpenType (a ~45 KB PDF), where
pdfLaTeX's Type 1 fonts come out around 250 KB. Re-run after editing the .tex:

    npm run resume      (or: python scripts/build-resume.py)

Needs lualatex on PATH (MiKTeX or TeX Live). static/resume.pdf is left
untouched if LaTeX reports an error or the résumé spills onto a second page.
"""

import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "resume" / "resume.tex"
OUT = ROOT / "static" / "resume.pdf"
MAX_PASSES = 3


def tex_env() -> dict[str, str]:
    # MiKTeX refuses to run when a PATH entry is a file rather than a
    # directory (e.g. "...\.local\bin\claude.exe"), so leave those out
    env = os.environ.copy()
    env["PATH"] = os.pathsep.join(p for p in env.get("PATH", "").split(os.pathsep) if not os.path.isfile(p))
    return env


def first_error(log: str) -> str:
    lines = log.splitlines()
    for i, line in enumerate(lines):
        if line.startswith("!"):
            return "\n".join(lines[i : i + 4])
    return "\n".join(lines[-15:])


def main() -> None:
    env = tex_env()
    lualatex = shutil.which("lualatex", path=env["PATH"])
    if not lualatex:
        sys.exit("lualatex not found. Install MiKTeX or TeX Live, or compile on Overleaf with the LuaLaTeX compiler.")

    print(f"Building {SRC.relative_to(ROOT)} with LuaLaTeX...")
    with tempfile.TemporaryDirectory() as tmp:
        pdf, log_file = Path(tmp) / f"{SRC.stem}.pdf", Path(tmp) / f"{SRC.stem}.log"
        # Usually two passes: the second picks up hyperref's PDF bookmarks
        for _ in range(MAX_PASSES):
            run = subprocess.run(
                [lualatex, "-interaction=nonstopmode", "-halt-on-error", f"-output-directory={tmp}", SRC.name],
                cwd=SRC.parent,
                env=env,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            log = log_file.read_text(encoding="utf-8", errors="replace") if log_file.exists() else run.stdout + run.stderr
            if run.returncode != 0 or not pdf.exists():
                sys.exit(f"LaTeX failed, static/resume.pdf not updated:\n\n{first_error(log)}")
            if "Rerun to get" not in log:
                break

        for line in sorted(set(re.findall(r"Missing character: .*", log))):
            print(f"warning: {line}")

        pages = int(re.search(r"Output written on .*?\((\d+) pages?", log, re.S).group(1))
        if pages != 1:
            # ASCII only: Windows consoles garble "é"
            sys.exit(f"Resume runs to {pages} pages, static/resume.pdf not updated. Trim it back to one page.")

        before = OUT.stat().st_size if OUT.exists() else 0
        shutil.copyfile(pdf, OUT)

    after = OUT.stat().st_size
    print(f"{OUT.relative_to(ROOT)}  {before // 1024} KB -> {after // 1024} KB, {pages} page")


if __name__ == "__main__":
    main()
