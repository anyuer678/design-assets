"""Scan a local design-assets source directory and refresh styles/*/meta.json existence flags.

Source root resolution order:
  1. DESIGN_ASSETS_SRC environment variable
  2. ~/Desktop/design-assets

Only *portable, repo-relative* hints are written back into meta.json
(e.g. "hero/01-minimalism-hero.jpg"), never a machine-specific absolute path —
so this script can never re-introduce a `C:\\Users\\<name>\\...` leak into the public repo.
"""
from pathlib import Path
import json
import os

SRC = Path(os.environ.get("DESIGN_ASSETS_SRC") or Path.home() / "Desktop" / "design-assets").expanduser()
OUT = Path(__file__).resolve().parents[1] / "styles"

if not SRC.is_dir():
    raise SystemExit(
        f"source directory not found: {SRC}\n"
        "set DESIGN_ASSETS_SRC to your local design-assets folder, e.g.\n"
        "  DESIGN_ASSETS_SRC=D:\\assets\\design-assets python scripts/build_meta.py"
    )

ORDER = ("hero", "background", "widgets")
updated = 0

for meta in sorted(OUT.glob("*/meta.json")):
    data = json.loads(meta.read_text(encoding="utf-8"))
    style_id = data["id"]  # e.g. "01-minimalism"
    num, slug = style_id.split("-", 1)

    checks = {
        "hero": SRC / "hero" / f"{num}-{slug}-hero.jpg",
        "background": SRC / "background" / f"{num}-{slug}-bg.jpg",
        "widgets": SRC / "widgets" / f"{num}-{slug}-widgets.jpg",
    }

    files = {
        k: (str(p.relative_to(SRC)).replace("\\", "/") if p.exists() else None)
        for k, p in checks.items()
    }
    # keep a stable key order so the diff stays readable
    data["files"] = {k: files[k] for k in ORDER if k in files}
    data["complete"] = all(data["files"].values())

    meta.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    updated += 1

print(f"meta flags updated: {updated} style(s), src={SRC}")
