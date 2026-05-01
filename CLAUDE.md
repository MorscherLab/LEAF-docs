# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

User-facing documentation site for [LEAF](https://github.com/MorscherLab/LEAF) (LC-MS Extensible Analysis Framework). Built with VitePress, deployed to **leaf-docs.morscherlab.org** via GitHub Pages on every push to `main`.

This repo contains the **user-facing manual**: install, workflow walkthroughs, UI tour, FAQ, glossary, plus user-level CLI usage (`/cli/`) and scripted-analysis Python entry points (`/python/`). Developer-internal material (full Python API reference, plugin architecture, frontend internals, extension points) lives in the LEAF repo at `MorscherLab/LEAF/docs` — do not duplicate it here. When in doubt, link out.

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

VitePress reads markdown from the project root recursively, but `srcExclude` in `.vitepress/config.ts` skips `README.md`, `node_modules/**`, and `docs/**` (the spec / plan working directory). Six content directories drive the navigation:

- `get-started/` — install paths and the 5-minute quickstart
- `workflow/` — the metabolomics pipeline pages. Targeted spine: prepare → extract → analyze → visualize → export, plus tracing modifier. Untargeted spine: untargeted overview → extract-untargeted → inspect-features → export.
- `scripting/` — LEAF's CLI reference (`leaf webui`, `leaf targeted`, `leaf untargeted`, `leaf watch`, configuration), Python recipes, and a 1-screen pointer to SEED. Replaces the legacy `cli/` and `python/` directories, which now host 1-page redirect stubs only.
- `seed/` — SEED user manual hosted as a peer pillar. See "SEED docs" below for the source-of-truth process. Material is lifted from `oxion-core` upstream.
- `reference/` — UI tour, troubleshooting, FAQ, glossary, plus team and changelog

Plus `index.md` (home), `team.md` (Vue components from `vitepress/theme`), and `changelog.md` (links out to GitHub Releases — release notes themselves are not maintained here).

The `scripting/python/` pages document the curated public surface (`Samples`, `Analyzer`, `PeakPicking`, `QCReport` from `leaf.analyzer`, plus `score_dataset` from `leaf.analyzer.score`) with recipes verified against `packages/leaf/analyzer/` source. Stop at the boundary where a public function genuinely doesn't exist yet — link to upstream developer docs at `https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api` rather than inventing an API. The authoritative class reference lives in the LEAF repo.

`.vitepress/config.ts` is the single source of truth for nav bar, sidebar groups, search, and the GitHub edit-link pattern. **Adding a page requires two edits**: create the `.md` file, then register it in the matching `sidebar` group in `config.ts` — otherwise it won't appear in navigation.

`.vitepress/theme/` only adds `custom.css` on top of the default theme (LEAF brand color overrides). The brand palette there is intentionally kept in sync with `packages/ui/frontend/src/style.css` in the LEAF repo — change both together if you change either. `.vitepress/public/` ships static assets straight to the site root — notably `CNAME` (custom domain) and `leaf-icon.png`. The Vite config sets `publicDir` explicitly so the CNAME survives builds run from any cwd.

Edit links in the footer point to `MorscherLab/LEAF-docs` on GitHub (capital `LEAF-docs`). The dev server uses `lastUpdated` git timestamps, which is why CI checks out with `fetch-depth: 0`.

## SEED docs

[SEED](https://github.com/EstrellaXD/oxion-core) (Spectral Extraction & Encoding Driver, formerly oxion) is a peer product hosted under `/seed/` here while it has no public docs site of its own. LEAF stays the primary tenant of this site (home page, brand); SEED is a top-nav peer.

**Source of truth.** SEED docs live at:

- `oxion-core/PUBLIC_README.md` — install, vendor formats, perf summary
- `oxion-core/docs/python-api.md` — Python API
- `oxion-core/docs/batch-xic.md` — multi-file batch extraction
- `oxion-core/docs/rust-api.md` — Rust crate (note: heavily outdated — uses retired `thermo-raw` crate name and predates multi-vendor support; verify against `oxion-core/crates/seed/src/lib.rs` and `reader.rs` when updating)
- `oxion-core/crates/seed-cli/src/main.rs` — clap subcommand definitions, authoritative for the CLI surface

The pages in `seed/` are derived from those upstream files. Every page ends with a `<!-- Source: ... -->` comment naming its upstream.

**Update protocol.** Monthly diff `oxion-core/docs/{python-api,batch-xic,rust-api}.md` and `oxion-core/PUBLIC_README.md` against the corresponding pages here. Format-internals (`FORMAT_SPEC.md`, `OLE2_STRUCTURE.md`, `SCAN_DATA_ENCODING.md`, `VERSION_DIFFERENCES.md`, `TransitionMatrix.md`) are intentionally not mirrored — they live upstream only. The Thermo vendor archive (`UsingRawFileReader.md`, `UsingNuGet.md`) is also out of scope.

**Brand.** Lowercase `seed` for the CLI / Python module / Rust crate; uppercase `SEED` for the product name in prose. Same convention as `leaf` / `LEAF`.

## Conventions for content edits

- The audience is lab scientists, not developers — keep tone task-oriented, prefer screenshots/short steps over prose.
- Screenshot placeholders use the convention `> [Screenshot: description of what should be shown]` as a blockquote — these are TODOs for the actual image. Match this pattern when drafting new pages so they're easy to grep for and replace later.
- Internal links use VitePress clean URLs (no `.md` extension, since `cleanUrls: true`).
- `ignoreDeadLinks: false` — broken internal links fail the build, so verify links resolve before committing.
- The home page (`index.md`) uses VitePress's `layout: home` frontmatter with `hero` + `features`; don't convert it to a regular markdown page.
- For anything related to the LEAF app's internals, link out to the LEAF repo rather than restating it here.
