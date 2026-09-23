#!/usr/bin/env python3
"""Fail if any tracked text file contains a machine-specific absolute path.

Guards this repository against re-introducing a leak like `C:\\Users\\<real name>\\...`
(which previously shipped inside every styles/*/meta.json) or `/Users/<name>/...`.

Exit code 0 = clean, 1 = offending lines found (printed), 2 = internal error.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]

PATTERNS = [
    # Windows drive path into a user profile: C:\Users\name or C:\\Users\\name
    re.compile(r"[A-Za-z]:\\{1,2}Users\\{1,2}[A-Za-z0-9._-]+"),
    # POSIX user profile path: /Users/name/ or /home/name/
    re.compile(r"/(?:Users|home)/[A-Za-z0-9._-]+/"),
]

SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv", "dist"}
SUFFIXES = {".md", ".json", ".py", ".js", ".mjs", ".html", ".yml", ".yaml", ".txt", ".svg", ".cfg", ".ini", ".toml"}
SELF = Path(__file__).resolve()


def is_scannable(path: Path) -> bool:
    """Extension-less files (NOTICE, LICENSE, CONTRIBUTING) count too — NOTICE used to leak."""
    return path.suffix.lower() in SUFFIXES or path.suffix == ""


hits = []
for path in sorted(ROOT.rglob("*")):
    if not path.is_file() or not is_scannable(path):
        continue
    if any(part in SKIP_DIRS for part in path.parts):
        continue
    if path.resolve() == SELF:  # this file documents the patterns on purpose
        continue
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        continue
    for lineno, line in enumerate(text.splitlines(), 1):
        if any(p.search(line) for p in PATTERNS):
            hits.append(f"{path.relative_to(ROOT)}:{lineno}: {line.strip()[:140]}")

if hits:
    print("machine-specific absolute path found:")
    for h in hits:
        print("  " + h)
    sys.exit(1)

print("OK: no machine-specific absolute paths")
