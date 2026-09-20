"""Scan source design-assets and rewrite styles/*/meta.json file existence flags."""
from pathlib import Path
import json

SRC = Path(r"C:\Users\30816\Desktop\design-assets")
OUT = Path(__file__).resolve().parents[1] / "styles"

for meta in OUT.glob("*/meta.json"):
    data = json.loads(meta.read_text(encoding="utf-8"))
    src = data.get("source", {})
    flags = {}
    for k, rel in src.items():
        # rel like ../../design-assets/hero/xx
        p = SRC / Path(rel).name  # fallback
        # better: map by id
        flags[k] = "missing"
    style_id = data["id"]  # e.g. 01-minimalism
    num, slug = style_id.split("-", 1)
    checks = {
        "hero": SRC / "hero" / f"{num}-{slug}-hero.jpg",
        "background": SRC / "background" / f"{num}-{slug}-bg.jpg",
        "widgets": SRC / "widgets" / f"{num}-{slug}-widgets.jpg",
    }
    data["files"] = {k: (str(p) if p.exists() else None) for k, p in checks.items()}
    data["complete"] = all(data["files"].values())
    meta.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print("meta flags updated")
