# Contributing

Thanks for your interest in improving this repository.

## Ground rules

1. **Account / scope**: Changes in this portfolio are developed under GitHub user **anyuer678**.
2. **Honesty**: README claims must match code. Prefer under-promise over marketing language.
3. **Status tags**: If you add a new project entry, use `local-tool` / `portfolio` / `engine` / `archived`.
4. **Visual discipline** (`design-assets` and product UIs):
   - Design assets are for **docs / PPT / case studies** only.
   - Do **not** replace product UI themes (e.g. chatez warm study room, codedrill terminal green, CET library/ink) with generic asset-pack skins.
5. **Security defaults**: Prefer dry-run, least privilege, local bind, fail-closed auth.

## Adding a new style (design assets)

New assets are **AI-generated** (see `NOTICE`). Content rules live in `USAGE.md`:
docs / PPT / portfolio use only, and never replace product UI themes.
When adding a new style, follow these conventions:

### Numbering & naming

1. Style id = `<nn>-<slug>` — two-digit sequence continuing the existing 24
   (next is `25-<slug>`); slug = lowercase English style name.
2. Asset files are JPG at **2048×1152 (16:9)**:
   - Main visual (required): `hero/<nn>-<slug>-hero.jpg`
   - Background (optional): `background/<nn>-<slug>-bg.jpg`
   - Widgets (optional): `widgets/<nn>-<slug>-widgets.jpg`

### Prompt template

Fill in the brackets and keep the structure, so results stay comparable across
styles. This is the recommended pattern; record the final prompt next to the
asset in your local source directory (prompts are not committed here):

```
A [subject / scene] in [style keywords — 3–6 adjectives or noun phrases],
[composition: layout, focal point, amount of whitespace],
for [hero visual / background / UI widget set] used in [docs, slides, portfolio pages].
16:9, 2048×1152.
Avoid: text, watermarks, logos, photographic human faces, [style-specific exclusions].
```

### Registration checklist

- [ ] `styles/<nn>-<slug>/meta.json` created (copy the shape of an existing entry; keep `complete` honest)
- [ ] Sample images copied to `docs/samples/` with the file names above
- [ ] `python scripts/build_meta.py` passes (validates hero/bg/widgets presence)
- [ ] New style appears on the Pages preview with correct filter tags

## Development

- Run the repository’s tests locally before opening a PR.
- Keep PRs focused; include a short summary of **why**.
- Update docs when behavior or claims change.

## CI

- Latest workflow on the default branch should stay green.
- Historical red Actions runs on old commits can be ignored; check the **head SHA** of the latest run.

## License

By contributing, you agree that your contributions are licensed under the repository’s existing LICENSE.
