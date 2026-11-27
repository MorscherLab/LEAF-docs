# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

User-facing documentation site for [LEAF](https://github.com/MorscherLab/LEAF) (LC-MS Extensible Analysis Framework). Built with VitePress, deployed to **leaf-docs.morscherlab.org** via GitHub Pages on every push to `main`.

This repo contains the **user-facing manual**: install, workflow walkthroughs, scripting references, SEED reader docs, UI tour, FAQ, glossary, team, and changelog links. The legacy `/cli/` and `/python/` folders are redirect stubs; current material lives under `/scripting/`. Developer-internal material (full Python API reference, plugin architecture, frontend internals, extension points) lives in the LEAF repo at `MorscherLab/LEAF/docs` — do not duplicate it here. When in doubt, link out.

## Commands

Managed with Vite+ (`vp`) on pnpm. VitePress is on `2.0.0-alpha.21` because Vite+ needs Vite 7+; VitePress 1.x pins Vite 5.

```bash
vp install
vp run dev      # http://localhost:17173/  (strictPort, will fail if taken)
vp run build    # outputs to .vitepress/dist/
vp run preview  # serve the built site
vp check        # oxfmt + oxlint + type check on code files
```

There are no tests. `vp check` formats and lints the TypeScript, CSS, YAML and JSON files; `vite.config.ts` excludes Markdown and `docs/**` from formatting. CI installs dependencies, installs D2 for diagram rendering, runs the retired-CLI grep gate, `vp check`, `vp run build`, then builds the v0.5 archive.

## v0.5 archive

The `archive/v0.5` branch holds the frozen LEAF 0.5 manual (from commit `3bba696`). CI builds it with `vitepress build --base /v0.5/` and copies the output into `.vitepress/dist/v0.5/`. Fix an archive page on that branch, not on `main`, then run `gh workflow run deploy.yml --ref main`: the archive branch has no workflow, so its pushes do not deploy. The version menu in `nav` links to it by absolute URL, because `/v0.5/` is not a page in this build.

D2 diagrams are rendered from fenced `d2` blocks by `vitepress-plugin-d2`. Local builds need the `d2` executable on `PATH` (`brew install d2` on macOS, or the upstream install script from the D2 docs).

## Architecture

VitePress reads markdown from the project root recursively, but `srcExclude` in `.vitepress/config.ts` skips README/agent guidance, `node_modules/**`, working plans, hidden untargeted pages, and hidden API-reference pages. Five content directories drive the navigation:

- `get-started/` — install paths and the 5-minute quickstart
- `workflow/` — the targeted metabolomics pipeline pages: prepare → extract → analyze → visualize → export, plus tracing modifier. Untargeted pages remain in the repository but are hidden from the built site.
- `scripting/` — LEAF's CLI reference (`leaf webui`, `leaf targeted`, `leaf watch`, configuration), Python recipes, and a pointer to SEED. Replaces the legacy `cli/` and `python/` directories, which now host redirect stubs only.
- `seed/` — user-facing SEED reader pages. Keep implementation/API details hidden here; link upstream when needed.
- `reference/` — UI tour, troubleshooting, FAQ, glossary, plus team and changelog

Plus `index.md` (home), `team.md` (Vue components from `vitepress/theme`), and `changelog.md` (links out to GitHub Releases — release notes themselves are not maintained here).

The `scripting/python/` pages document the curated public surface (`Samples`, `Extractor`, `PeakPicking`, `QCReport` from `leaf.analyzer`, plus `score_dataset` from `leaf.analyzer.score`) with recipes verified against `packages/leaf/analyzer/` source. Stop at the boundary where a public function genuinely doesn't exist yet — link to upstream developer docs at `https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api` rather than inventing an API. The authoritative class reference lives in the LEAF repo.

`.vitepress/config.ts` is the single source of truth for nav bar, sidebar groups, search, and the GitHub edit-link pattern. **Adding a page requires two edits**: create the `.md` file, then register it in the matching `sidebar` group in `config.ts` — otherwise it won't appear in navigation.

`.vitepress/theme/` adds `custom.css` and a small diagram zoom helper on top of the default theme. The brand palette there is intentionally kept in sync with `packages/ui/frontend/src/style.css` in the LEAF repo — change both together if you change either. `.vitepress/public/` ships static assets straight to the site root — notably `CNAME` (custom domain) and `leaf-icon.png`. The Vite config sets `publicDir` explicitly so the CNAME survives builds run from any cwd.

Edit links in the footer point to `MorscherLab/LEAF-docs` on GitHub (capital `LEAF-docs`). The dev server uses `lastUpdated` git timestamps, which is why CI checks out with `fetch-depth: 0`.

## SEED docs

[SEED](https://github.com/EstrellaXD/seed-core) (Spectral Extraction & Encoding Driver, formerly oxion) is a peer reader project hosted under `/seed/`. LEAF stays the primary tenant of this site (home page, brand); SEED is a top-nav peer.

**Source of truth.** SEED docs live at:

- `seed-core/PUBLIC_README.md` — install, vendor formats, perf summary
- `seed-core/docs/python-api.md` — Python API (link upstream; do not publish here unless requested)
- `seed-core/docs/batch-xic.md` — multi-file batch extraction internals (link upstream; do not publish here unless requested)
- `seed-core/docs/rust-api.md` — Rust crate reference (link upstream; do not publish here unless requested)
- `seed-core/crates/seed-cli/src/main.rs` — clap subcommand definitions, authoritative for the CLI surface

The public pages in `seed/` are derived from upstream files but should remain user-facing. Avoid exposing implementation internals, algorithm details, and full API reference in this docs site.

**Update protocol.** Monthly diff `seed-core/docs/{python-api,batch-xic,rust-api}.md` and `seed-core/PUBLIC_README.md` against the corresponding pages here. Format-internals (`FORMAT_SPEC.md`, `OLE2_STRUCTURE.md`, `SCAN_DATA_ENCODING.md`, `VERSION_DIFFERENCES.md`, `TransitionMatrix.md`) are intentionally not mirrored — they live upstream only. The Thermo vendor archive (`UsingRawFileReader.md`, `UsingNuGet.md`) is also out of scope.

**Brand.** Lowercase `seed` for the CLI / Python module / Rust crate; uppercase `SEED` for the product name in prose. Same convention as `leaf` / `LEAF`.

## Conventions for content edits

- The audience is lab scientists, not developers. Use concise scientific documentation style: define inputs, state defaults, describe observable behavior, and avoid AI-assistant phrasing or speculative implementation detail.
- Untargeted workflow pages and algorithm/API reference pages are intentionally hidden. Do not re-add them to navigation or public source unless the project owner asks for that surface explicitly.
- Screenshot placeholders use the convention `> [Screenshot: description of what should be shown]` as a blockquote — these are TODOs for the actual image. Match this pattern when drafting new pages so they're easy to grep for and replace later.
- Internal links use VitePress clean URLs (no `.md` extension, since `cleanUrls: true`).
- `ignoreDeadLinks: false` — broken internal links fail the build, so verify links resolve before committing.
- The home page (`index.md`) uses VitePress's `layout: home` frontmatter with `hero` + `features`; don't convert it to a regular markdown page.
- For anything related to the LEAF app's internals, link out to the LEAF repo rather than restating it here.

## Comments and lint

- Write no comment unless the code cannot say it: a license header, behavior forced by an external dependency or protocol, a public API doc comment, or an issue/RFC link. In `.vitepress/` TypeScript and CI scripts, rename or extract a surprise instead. No commented-out code.
- When a mistake recurs, add a check that fails on it instead of a note here or in the code. This repo has two checks: the retired-CLI grep gate in `.github/workflows/deploy.yml` and the VitePress build (`ignoreDeadLinks: false`). Extend one of them.
- Use no lint suppression unless a rule is wrong for that line.
- There are no tests. If you add one, make it assert behavior a caller can observe, not internals. A check that a type, a lint rule or the build already makes needs no test.
