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

VitePress reads markdown from the project root recursively, but `srcExclude` in `.vitepress/config.ts` skips `README.md` and `node_modules/**`. Five content directories drive the navigation:

- `get-started/` — install paths and the 5-minute quickstart
- `workflow/` — the metabolomics pipeline pages (prepare → extract → analyze → visualize → export, plus tracing and untargeted)
- `cli/` — `leaf` command-line interface (overview, `leaf serve`, configuration)
- `python/` — using LEAF as a Python package for scripted analyses
- `reference/` — UI tour, troubleshooting, FAQ, glossary

Plus `index.md` (home), `team.md` (Vue components from `vitepress/theme`), and `changelog.md` (links out to GitHub Releases — release notes themselves are not maintained here).

The `python/` pages contain explicit `<!-- TODO -->` placeholder code blocks for API signatures the maintainers haven't ratified yet — leave them as TODOs rather than inventing import paths or function names. The authoritative Python API reference lives in the LEAF repo.

`.vitepress/config.ts` is the single source of truth for nav bar, sidebar groups, search, and the GitHub edit-link pattern. **Adding a page requires two edits**: create the `.md` file, then register it in the matching `sidebar` group in `config.ts` — otherwise it won't appear in navigation.

`.vitepress/theme/` only adds `custom.css` on top of the default theme (LEAF brand color overrides). The brand palette there is intentionally kept in sync with `packages/ui/frontend/src/style.css` in the LEAF repo — change both together if you change either. `.vitepress/public/` ships static assets straight to the site root — notably `CNAME` (custom domain) and `leaf-icon.png`. The Vite config sets `publicDir` explicitly so the CNAME survives builds run from any cwd.

Edit links in the footer point to `MorscherLab/LEAF-docs` on GitHub (capital `LEAF-docs`). The dev server uses `lastUpdated` git timestamps, which is why CI checks out with `fetch-depth: 0`.

## Conventions for content edits

- The audience is lab scientists, not developers — keep tone task-oriented, prefer screenshots/short steps over prose.
- Screenshot placeholders use the convention `> [Screenshot: description of what should be shown]` as a blockquote — these are TODOs for the actual image. Match this pattern when drafting new pages so they're easy to grep for and replace later.
- Internal links use VitePress clean URLs (no `.md` extension, since `cleanUrls: true`).
- `ignoreDeadLinks: false` — broken internal links fail the build, so verify links resolve before committing.
- The home page (`index.md`) uses VitePress's `layout: home` frontmatter with `hero` + `features`; don't convert it to a regular markdown page.
- For anything related to the LEAF app's internals, link out to the LEAF repo rather than restating it here.
