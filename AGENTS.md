# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## What this repo is

User-facing documentation site for [LEAF](https://github.com/MorscherLab/LEAF) (LC-MS Extensible Analysis Framework). Built with VitePress, deployed to **leaf-docs.morscherlab.org** via GitHub Pages on every push to `main`.

This repo contains the **user-facing manual**: install, targeted workflow walkthroughs, scripting references, SEED reader notes, UI tour, FAQ, glossary, team, and changelog links. The legacy `/cli/` and `/python/` folders are redirect stubs; current material lives under `/scripting/`. Developer-internal material (full Python API reference, plugin architecture, frontend internals, extension points) lives in the LEAF repo at `MorscherLab/LEAF/docs` — do not duplicate it here. When in doubt, link out.

## Commands

Bun-managed (see `bunfig.toml` — `linker = "hoisted"` is required for VitePress).

```bash
bun install
bun run dev      # http://localhost:17173/  (strictPort, will fail if taken)
bun run build    # outputs to .vitepress/dist/
bun run preview  # serve the built site
```

There are no tests, linters, or formatters configured. CI only runs `bun install --frozen-lockfile` + `bun run build`.

## Architecture

VitePress reads markdown from the project root recursively, but `srcExclude` in `.vitepress/config.ts` skips README/agent guidance, `node_modules/**`, working plans, hidden untargeted pages, and hidden API-reference pages. Five content directories drive the navigation:

- `get-started/` — install paths and the 5-minute quickstart
- `workflow/` — the targeted metabolomics pipeline pages: prepare → extract → analyze → visualize → export, plus tracing modifier. Untargeted pages remain in the repository but are hidden from the built site.
- `scripting/` — CLI reference (`leaf webui`, `leaf targeted`, `leaf watch`, configuration), Python recipes, SEED reader note. Replaces the legacy `cli/` and `python/` directories, which now host redirect stubs only.
- `seed/` — user-facing SEED reader pages. Keep implementation/API details hidden here; link upstream when needed.
- `reference/` — UI tour, troubleshooting, FAQ, glossary, plus team and changelog

Plus `index.md` (home), `team.md` (Vue components from `vitepress/theme`), and `changelog.md` (links out to GitHub Releases — release notes themselves are not maintained here).

The `scripting/python/` pages document the curated public surface (`Samples`, `Extractor`, `PeakPicking`, `QCReport` from `leaf.analyzer`, plus `score_dataset` from `leaf.analyzer.score`) with recipes verified against `packages/leaf/analyzer/` source. Stop at the boundary where a public function genuinely doesn't exist yet — link to upstream developer docs at `https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api` rather than inventing an API. The authoritative class reference lives in the LEAF repo.

`.vitepress/config.ts` is the single source of truth for nav bar, sidebar groups, search, and the GitHub edit-link pattern. **Adding a page requires two edits**: create the `.md` file, then register it in the matching `sidebar` group in `config.ts` — otherwise it won't appear in navigation.

`.vitepress/theme/` only adds `custom.css` on top of the default theme (LEAF brand color overrides). The brand palette there is intentionally kept in sync with `packages/ui/frontend/src/style.css` in the LEAF repo — change both together if you change either. `.vitepress/public/` ships static assets straight to the site root — notably `CNAME` (custom domain) and `leaf-icon.png`. The Vite config sets `publicDir` explicitly so the CNAME survives builds run from any cwd.

Edit links in the footer point to `MorscherLab/LEAF-docs` on GitHub (capital `LEAF-docs`). The dev server uses `lastUpdated` git timestamps, which is why CI checks out with `fetch-depth: 0`.

## Conventions for content edits

- The audience is lab scientists, not developers. Use concise scientific documentation style: define inputs, state defaults, describe observable behavior, and avoid AI-assistant phrasing or speculative implementation detail.
- Untargeted workflow pages and algorithm/API reference pages are intentionally hidden. Do not re-add them to navigation or public source unless the project owner asks for that surface explicitly.
- Screenshot placeholders use the convention `> [Screenshot: description of what should be shown]` as a blockquote — these are TODOs for the actual image. Match this pattern when drafting new pages so they're easy to grep for and replace later.
- Internal links use VitePress clean URLs (no `.md` extension, since `cleanUrls: true`).
- `ignoreDeadLinks: false` — broken internal links fail the build, so verify links resolve before committing.
- The home page (`index.md`) uses VitePress's `layout: home` frontmatter with `hero` + `features`; don't convert it to a regular markdown page.
- For anything related to the LEAF app's internals, link out to the LEAF repo rather than restating it here.
