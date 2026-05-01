# LEAF Docs Reorganization — Design

**Date:** 2026-05-01
**Author:** Estrella Pan (with Claude)
**Status:** Approved (pending user review of this spec)

## Goal

Reorganize the LEAF user manual to:

1. **Fix accuracy** — multiple pages reference `leaf serve`, an "auto / dotnet / rust" backend choice misnamed as "Rust / Python", an invented Python API, and SEED (the Rust RAW reader) is unmentioned. Items confirmed against current source in `MorscherLab/LEAF` (commit-tracking is informal; the relevant files are `packages/leaf/analyzer/cli/`, `packages/leaf/analyzer/__init__.py`, `pyproject.toml`).
2. **Restructure information architecture** — split lab scientists from scripters cleanly. Workflow spine becomes mode-prefixed (Targeted vs Untargeted) per how the app actually behaves.

## Non-goals

- No formal Python class/method reference. The LEAF maintainers haven't ratified a stable public surface; the upstream `LEAF/docs/leaf/api/` reference is authoritative for that. We document **recipes only** in this manual (decision B3).
- No rebuild of branding or styling. The `.vitepress/theme/custom.css` palette and home-page layout stay.
- No automated CLI-flag scraping. Curated reference + monthly manual cross-check is sufficient given how stable the surface is.

## Constraints

- **Project CLAUDE.md** — "leave Python TODOs as TODOs rather than inventing import paths or function names." Honored: the Python pillar uses real exports verified in source (`Samples`, `Analyzer`, `PeakPicking`, `QCReport` from `packages/leaf/analyzer/__init__.py`) and stops at the boundary where the public function genuinely doesn't exist yet, linking upstream rather than inventing.
- **VitePress build invariants** — `cleanUrls: true`, `ignoreDeadLinks: false`. `srcExclude` carries `'README.md'` and `'node_modules/**'`; this commit adds `'docs/**'` so the design file is committed but not published.
- **`.vitepress/config.ts` is the single source of truth** for nav and sidebar (per CLAUDE.md). Every new page requires two edits: create the file + register in `config.ts`.
- **Single-author maintenance** — the design favours convention over tooling so the doc surface stays maintainable by one person.

## Architecture

Two pillars, one workflow spine, shared reference.

```
                  ┌─── Pillar 1: App (scientists) ──┐
   Get Started ──→│  Install · Quickstart           │
                  │  Workflow spine:                │──┐
                  │   Prepare → Targeted: Extract → │  │
                  │     Analyze → Visualize →       │  │
                  │     Export (+ Tracing modifier) │  │
                  │   Untargeted: Extract → Inspect │  │   ┌── Reference ──┐
                  │     → Export                    │  ├──→│ UI tour       │
                  └─────────────────────────────────┘  │   │ Troubleshoot  │
                                                       │   │ FAQ · Glossary│
                  ┌─── Pillar 2: Scripting ────────┐   │   │ Team          │
                  │  Overview (when not the UI)    │   │   │ Changelog     │
                  │  CLI: targeted / untargeted /  │───┤   └───────────────┘
                  │       watch / webui            │   │
                  │  Python: recipes only          │   │
                  │  Reader: SEED note             │───┘
                  └────────────────────────────────┘
```

**Bridge between pillars.** Workflow pages with a scripting equivalent end with one collapsed `::: details Also from a script :::` block (uniform shape across the manual). Scientists ignore it. Scripters click it for the matching CLI / Python recipe link. No screenshots or parameter tables inside the bridge — the scripting pillar owns those.

## Top nav and sidebar

Top nav (replaces the current 5-bucket layout with `More` dropdown):

```
Get Started · Workflow · Scripting · Reference · Open MINT
```

The `Changelog` and `Team` links move under `Reference` instead of a `More` dropdown.

Sidebars:

```
/get-started/
  Install on desktop
  Use the hosted version
  First analysis (5 min)

/workflow/
  Prepare your data
  ─── Targeted ───
  Extract
  Analyze
  Visualize
  Export
  Isotope tracing  (badge: "modifier")
  ─── Untargeted ───
  Extract (untargeted)
  Inspect features
  Export (untargeted)

/scripting/
  Overview — when to use scripting
  ─── Command line ───
  Install & verify
  leaf webui
  leaf targeted
  leaf untargeted
  leaf watch
  Configuration
  ─── Python package ───
  Overview & install
  Recipes
  ─── RAW reader ───
  SEED (macOS / Linux)

/reference/
  UI tour
  Troubleshooting
  FAQ
  Glossary
  Team
  Changelog
```

## URL stability

URLs stay flat — sidebar grouping is the visual divider, not URL nesting.

```
KEEP
  /get-started/install-desktop
  /get-started/install-hosted
  /get-started/quickstart
  /workflow/prepare-data
  /workflow/extract                  (rebrand as "Extract — targeted")
  /workflow/analyze
  /workflow/visualize
  /workflow/export                   (covers .msd and .usd)
  /workflow/tracing                  (modifier badge in sidebar)
  /reference/ui-tour
  /reference/troubleshooting
  /reference/faq
  /reference/glossary
  /team
  /changelog

NEW
  /workflow/extract-untargeted        (split from current /workflow/untargeted)
  /workflow/inspect-features          (split from current /workflow/untargeted)
  /scripting/                         (Overview)
  /scripting/cli/overview
  /scripting/cli/webui                (replaces /cli/serve)
  /scripting/cli/targeted             (NEW)
  /scripting/cli/untargeted           (NEW)
  /scripting/cli/watch                (NEW)
  /scripting/cli/configuration        (was /cli/configuration)
  /scripting/python/overview          (was /python/overview, rewritten per B3)
  /scripting/python/recipes           (was /python/quickstart, rewritten per B3)
  /scripting/reader                   (NEW — SEED short page)

REDIRECT STUBS (5-line bodies linking forward; protect inbound links)
  /cli/overview                       → /scripting/cli/overview
  /cli/serve                          → /scripting/cli/webui
  /cli/configuration                  → /scripting/cli/configuration
  /python/overview                    → /scripting/python/overview
  /python/quickstart                  → /scripting/python/recipes

REWRITE OLD PATH
  /workflow/untargeted                becomes a 1-screen "Untargeted overview"
                                       linking to extract-untargeted, inspect-features,
                                       and the existing /workflow/export
```

## Accuracy fixes (independent of IA)

| # | Where | Wrong today | Fix |
|---|---|---|---|
| 1 | `index.md`, `install-desktop.md`, `quickstart.md`, `cli/overview.md`, `cli/serve.md`, `troubleshooting.md` | Launch command shown as `leaf serve` | Replace with `leaf webui run` (foreground) and `leaf webui start` (detached daemon). Reference `stop`, `status` where relevant. |
| 2 | `cli/overview.md` | Command index lists only `serve` | List four sub-apps: `leaf targeted`, `leaf untargeted`, `leaf watch run\|start\|stop\|status`, `leaf webui run\|start\|stop\|status`. |
| 3 | `cli/configuration.md` | "Backend = Rust / Python" | Actual flag is `--backend auto\|dotnet\|rust`. `rust` is the SEED reader. The "Python reference backend" framing does not match source. |
| 4 | `install-desktop.md` startup output | `LEAF v0.5.0 ready at http://127.0.0.1:18008` | Replace with the real uvicorn banner or strip the fake "ready at" line. |
| 5 | `python/overview.md` import surface | TODO placeholder | Real exports: `from leaf.analyzer import Samples, Analyzer, PeakPicking, QCReport`. Banner: *"Public surface — names may change before 1.0; the formal class reference lives upstream in the LEAF repo."* No class signatures inline. |
| 6 | `python/quickstart.md` placeholder code | Invented `leaf.io.read_compound_list`, `leaf.extract`, `leaf.ExtractionParameters` | Rewrite as recipes using real exports. Stop at the boundary where the public function does not yet exist; link upstream rather than invent. |
| 7 | `troubleshooting.md` "Port 18008 already in use" | `leaf serve --port 18009` | `leaf webui run --port 18009` (or `-p 18009`). |
| 8 | New | SEED is unmentioned | Add `/scripting/reader` (1 screen) plus a one-line note in `install-desktop.md` Requirements: *"macOS/Linux read RAW files via the bundled SEED reader — no .NET required."* |

## File-level move plan

```
RENAMES (preserve git history via git mv)
  cli/overview.md          → scripting/cli/overview.md       (rewrite)
  cli/serve.md             → scripting/cli/webui.md          (rewrite + rename)
  cli/configuration.md     → scripting/cli/configuration.md  (small content fix)
  python/overview.md       → scripting/python/overview.md    (rewrite per B3)
  python/quickstart.md     → scripting/python/recipes.md     (rewrite per B3)

NEW
  scripting/index.md
  scripting/cli/targeted.md
  scripting/cli/untargeted.md
  scripting/cli/watch.md
  scripting/reader.md
  workflow/extract-untargeted.md
  workflow/inspect-features.md

REWRITES IN PLACE (URL preserved)
  index.md
  get-started/install-desktop.md
  get-started/quickstart.md
  workflow/extract.md                  rebrand as "Extract — targeted"
  workflow/untargeted.md               1-screen "Untargeted overview"
  reference/troubleshooting.md

REDIRECT STUBS
  cli/overview.md          (5-line redirect → /scripting/cli/overview)
  cli/serve.md             (→ /scripting/cli/webui)
  cli/configuration.md     (→ /scripting/cli/configuration)
  python/overview.md       (→ /scripting/python/overview)
  python/quickstart.md     (→ /scripting/python/recipes)

CONFIG
  .vitepress/config.ts     nav (drop `More` dropdown), sidebar groups
                            (drop /cli/, /python/; add /scripting/), every new path
  .vitepress/config.ts     srcExclude += 'docs/**' so this spec ships unpublished

NO CHANGE
  workflow/{prepare-data,analyze,visualize,export,tracing}.md
  reference/{ui-tour,faq,glossary}.md
  team.md, changelog.md
  .vitepress/theme/*, .vitepress/public/*
```

VitePress has no native redirect mechanism. The "redirect stub" technique is a one-page MD with `<script setup>` triggering `router.go(...)` after mount, plus a visible "moved →" link as the no-JS fallback. Single shared component reused on every stub.

## Conventions

**1. "Also from a script" callout.** Identical shape across the manual:

```md
::: details Also from a script
The same step in CLI form:
\`\`\`bash
leaf targeted --folder ./samples --list compounds.csv --polarity NEG
\`\`\`
Or as a Python recipe → [Batch extraction](/scripting/python/recipes#batch-extraction)
:::
```

Collapsed `<details>` is invisible until the reader expands it. No screenshots, no parameter tables — the scripting pillar owns those.

**2. Screenshot placeholders.** Existing convention preserved: `> [Screenshot: description]` blockquote. Easy to grep for and replace later.

**3. Mode badge.** Pages that are mode-specific (Targeted vs Untargeted, or "modifier") get a frontmatter-driven badge in the sidebar. Implementation: a small custom theme tweak that renders `frontmatter.badge` next to the link; or just plain text appended in `config.ts` (`text: 'Isotope tracing (modifier)'`). The latter avoids theme work.

## Verification

- **`bun run build`** — internal dead-link check via VitePress's existing `ignoreDeadLinks: false`.
- **`grep` gate** — small step in `.github/workflows/build.yml` (already runs `bun install --frozen-lockfile` + `bun run build`):
  ```bash
  ! grep -rE 'leaf serve' --include='*.md' --exclude-dir=node_modules \
        --exclude='reference/glossary.md' .
  ```
  The glossary keeps `leaf serve` as a deprecated-alias entry; everywhere else fails the build.
- **CLI flag drift** — append a once-a-month checklist to `CLAUDE.md`: open `packages/leaf/analyzer/cli/commands/_targeted.py`, scan flags, diff vs `scripting/cli/targeted.md`. Not automated.

## Out of scope (decision points already settled)

- Three-audience model with a separate "Administer" pillar (decided: no).
- Automated CLI scraping (decided: no — curated + manual review).
- Documenting unratified Python API surface (decided: stop at the public boundary, link upstream).
- URL-changing reorg (decided: no — flat URLs preserved, sidebar grouping does the work).

## Risks

- **Inbound links from outside this site** to `/cli/...` and `/python/...` — handled by the redirect stubs above.
- **Workflow spine split feels heavier than today** — mitigated by keeping the URLs flat; the heaviness is only in the sidebar.
- **CLI signature drift** — the `--help` footer + monthly checklist plus the small surface area (~10 documented flags per command vs ~25 actual) makes drift visible without becoming maintenance load. If drift becomes a problem, the next iteration is automated scraping; not pre-emptively.
- **Maintainers may ratify a Python public API** between now and 1.0, making the "stop at the boundary" recipes look stale — mitigated by the banner. When it happens, the recipes upgrade in place; the pillar architecture doesn't change.

## Implementation phasing (handover to writing-plans)

The implementation will need to be sequenced; this spec deliberately doesn't fix the order. Suggested coarse phases for the plan to refine:

1. Accuracy fixes in place (no moves) — fastest user-visible win.
2. New `scripting/` tree built alongside existing `cli/` and `python/`.
3. `.vitepress/config.ts` switched over; redirect stubs drop in.
4. Workflow split (untargeted → extract-untargeted + inspect-features + overview rewrite).
5. SEED page + install-desktop note.

Phases 1 and 2 are independent and can land in either order.
