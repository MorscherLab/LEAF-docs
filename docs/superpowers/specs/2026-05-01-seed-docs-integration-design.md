# SEED Docs Integration — Design

**Date:** 2026-05-01
**Author:** Estrella Pan (with Claude)
**Status:** Approved (pending user review of this spec)

## Goal

Host SEED's user-facing documentation under `leaf-docs.morscherlab.org`. SEED becomes a peer pillar alongside LEAF's existing sections.

SEED (Spectral Extraction & Encoding Driver, formerly oxion) is independently usable: standalone CLI, Python wheel, and GUI converter. Its repository (`EstrellaXD/oxion-core`) is private with public release artifacts but no public docs site. Until SEED has its own dedicated site, LEAF-docs is the host.

## Non-goals

- No format-internals coverage (`FORMAT_SPEC.md`, `OLE2_STRUCTURE.md`, `SCAN_DATA_ENCODING.md`, `VERSION_DIFFERENCES.md`, `TransitionMatrix.md`). These are valuable to RAW-file reverse engineers but niche; reference upstream from a single sentence on the Overview page.
- No vendor archive (`UsingRawFileReader.md`, `UsingNuGet.md`). These are Thermo's 2015 .NET reader docs — not SEED's material.
- No internal docs (`RE_PLAN.md`, `VALIDATION_REPORT.md`, `plans/`, `presentations/`, `superpowers/`).
- No site rebrand. The site stays LEAF-branded, URL stays `leaf-docs.morscherlab.org`. SEED is a peer section, but LEAF stays the primary tenant of the home page and brand.
- No automated upstream sync. Source-of-truth diff is a monthly manual checklist, same shape as the LEAF CLI flag-drift checklist already documented.

## Constraints

- **Source of truth.** SEED docs live at `oxion-core/docs/*.md` and `oxion-core/PUBLIC_README.md`. Pages here cite the upstream file in a "Source" footer line. When SEED changes, we diff upstream and propagate.
- **Brand.** Lowercase `seed` for the CLI, Python module, and Rust crate (parallels LEAF's `leaf`). Uppercase `SEED` for the product name in prose.
- **VitePress invariants** (unchanged from the prior reorg): `cleanUrls: true`, `ignoreDeadLinks: false`, `srcExclude` carrying `'README.md'`, `'node_modules/**'`, `'docs/**'`. No new build-time tooling.
- **Single-author maintenance.** Five new pages is the budget; total surface ≈ 1,200 lines after edits.

## Architecture

```
                        ┌── LEAF (existing) ──────────┐
   leaf-docs            │ Get Started                 │
   .morscherlab.org ───→│ Workflow                    │
                        │ Scripting                   │
                        │ Reference                   │
                        └─────────────────────────────┘
                                  ┌── SEED (NEW peer pillar) ──┐
                                  │ Overview                   │
                                  │  (install · supported      │
                                  │   vendors · performance)   │
                                  │ Command line (`seed`)      │
                                  │ Python API (`import seed`) │
                                  │ Rust API (`use seed::…`)   │
                                  │ Changelog (link out)       │
                                  └────────────────────────────┘
```

LEAF's existing `scripting/reader.md` shrinks to a 1-screen pointer that introduces SEED in LEAF context and links forward to `/seed/`. SEED's pillar reads as a standalone product manual; cross-references to LEAF are limited to the single mention at the bottom of `seed/index.md` ("LEAF is one of SEED's downstream consumers").

## Top nav and sidebar

```
Top nav:  Get Started · Workflow · Scripting · SEED · Reference · Open MINT

(`Open MINT` stays in the nav for now. If five top-level items + an
external link feels noisy, the followup is to drop the external from
nav and rely on /get-started/install-hosted to surface it.)

/seed/
  Overview                  /seed/             ← landing page
  ─── Reference ───
  Command line              /seed/cli
  Python API                /seed/python-api
  Rust API                  /seed/rust-api
  Changelog                 /seed/changelog
```

URLs are flat (no `/seed/reference/cli` nesting); sidebar grouping does the visual work, mirroring LEAF.

## Page-by-page plan

### NEW (5 pages)

#### `seed/index.md` — Overview
Landing page. Lifted from `oxion-core/PUBLIC_README.md`, sections retained:

- One-paragraph "what SEED is" (universal MS file reader; Rust; no .NET)
- Supported formats table (Thermo · Bruker · Waters · Agilent · Shimadzu · Sciex · mzML)
- Install — CLI binary (release tarball), Python wheel (`pip install seed`), GUI desktop converter
- Performance summary (the 100–700× scan-decode speedup figure)
- Entry-point links into CLI, Python API, Rust API
- Single sentence at the bottom: *"LEAF is one of SEED's downstream consumers — see [LEAF](/) for the metabolomics analysis platform built on top."*

#### `seed/cli.md` — Command line
Source: `oxion-core/PUBLIC_README.md` CLI section + verification against `oxion-core/crates/seed-cli/src/main.rs` for current subcommand surface.

Subcommand index (from `seed --help`): `info`, `scan`, `tic`, `xic`, `batch-xic`, `convert`, `streams`, `trailer`, `status-log`, `devices`, `device-tic`, `validate`, `benchmark`, `bench-concurrency`, `debug`, `diagnose`. Curated reference per the same convention LEAF uses (10–15 most common flags per subcommand, link to `seed <cmd> --help` for the rest).

Three recipes:
1. `seed convert sample.RAW sample.mzML` — RAW → mzML conversion
2. `seed batch-xic samples/ --targets targets.csv` — multi-file XIC extraction
3. `seed info sample.RAW` + `seed benchmark sample.RAW` — quick file inspection and perf measurement

#### `seed/python-api.md` — Python API
Source: `oxion-core/docs/python-api.md` (~373 lines) folded with `oxion-core/docs/batch-xic.md` (~705 lines). The folded shape:

- Install (`pip install seed` or `maturin develop --release` for source)
- `seed.open(path)` auto-detect
- `RawFile` constructor + methods (`scan`, `tic`, `bpc`, `xic`, `xic_ms1`, `xic_batch`, metadata getters)
- `MzmlFile`, `MzxmlFile`, `LcdFile`, `BrukerFile`, `WatersFile` summaries (one section each, with the deltas from `RawFile`)
- `batch_xic()` deep dive — the multi-file two-pass extraction API. This is the SEED feature LEAF actually uses; deserves the deep dive on its own H2.
- NumPy integration patterns + memory model

Total after editing: ≈ 600–700 lines on a single page. Splittable later if it grows.

#### `seed/rust-api.md` — Rust API
Source: `oxion-core/docs/rust-api.md` (~553 lines).

- `Cargo.toml` dependency block (`seed = { version = "...", features = [...] }`)
- `seed::open()` / `seed::open_mmap()` auto-detect entry points
- `MsReader` trait (the format-agnostic interface)
- `RawFile`, `MzMLFile` per-format details
- Feature flags (`raw`, `mzml`, `convert`, defaults)
- Pointer to `cargo doc --open -p seed` for the full generated reference; we don't try to mirror rustdoc here.

#### `seed/changelog.md` — Changelog stub
Mirrors LEAF's `changelog.md` pattern: a short page that links out to GitHub Releases for the actual notes. No prose duplication.

### REWRITES IN PLACE

#### `scripting/reader.md` — shrink to a pointer
The current page (added in the LEAF reorg) becomes a 1-screen LEAF-context note:

```md
# SEED — the LEAF reader backend

LEAF reads RAW files through SEED on macOS / Linux (the `rust` backend in
`leaf --backend`). SEED is a separate project with its own user manual:

→ [SEED — Overview](/seed/)

For the LEAF-specific backend selection (when to override `auto`, the
`dotnet` Windows alternative), see [Configuration](/scripting/cli/configuration#backend-selection).
```

#### `.vitepress/config.ts`
Add `SEED` to the top nav; add the `/seed/` sidebar group; no other nav changes.

#### `CLAUDE.md`
Add a top-level "SEED docs" section describing:

- SEED is a peer product hosted under `/seed/`; LEAF stays the primary tenant
- Source of truth: `oxion-core/docs/{python-api,batch-xic,rust-api}.md` and `oxion-core/PUBLIC_README.md`
- Update protocol: monthly diff against upstream; changes ship in ordinary docs commits
- Brand: `seed` lowercase for CLI/module/crate, `SEED` uppercase in prose

### NO CHANGE

`index.md` (LEAF home), all `workflow/`, `get-started/`, `scripting/`, `reference/` pages, theme, redirect stubs.

## URL stability

```
KEEP                              all existing LEAF URLs unchanged

NEW                               /seed/
                                  /seed/cli
                                  /seed/python-api
                                  /seed/rust-api
                                  /seed/changelog

REWRITE IN PLACE                  /scripting/reader  (content shrinks; URL stays)
```

## LEAF-side cross-references to `/scripting/reader`

The LEAF pillar links to `/scripting/reader` from four places (introduced during the prior reorg):

1. `get-started/install-desktop.md` — Requirements row + Windows tip
2. `scripting/cli/configuration.md` — Backend table
3. `reference/glossary.md` — SEED entry
4. `reference/troubleshooting.md` — RAW-files row mentions SEED implicitly

These do **not** need to change. `/scripting/reader` is now a pointer that funnels to `/seed/` — the LEAF reader still introduces SEED in LEAF context, and the standalone product manual lives at `/seed/`. Single hop.

## Verification

- `bun run build` (existing) — internal dead-link check.
- `leaf serve` grep gate (existing, unchanged).
- No new gates. The SEED pages do not interact with LEAF's CLI surface, so the LEAF flag-drift checklist is independent.
- New manual checklist in `CLAUDE.md`: monthly diff `oxion-core/docs/python-api.md` and `batch-xic.md` and `rust-api.md` against the corresponding pages here. Surface in the same way as the LEAF CLI checklist.

## Risks

- **Upstream drift.** SEED's repo is private; we mirror its docs by hand. Mitigated by the source-line footer + monthly checklist + small surface (5 pages). If drift becomes a problem, the next iteration is a make target that diffs upstream.
- **Audience confusion.** A LEAF-shaped site hosting a peer-product manual could confuse first-time visitors. Mitigated by keeping the home page LEAF-only and putting SEED behind its own top-nav entry; the bridge page (`scripting/reader.md`) handles the LEAF-side hand-off.
- **Maintenance load.** ~1,200 new lines doubles the LEAF surface. Mitigated by skipping format-internals and vendor archive; staying user-facing only.
- **Open MINT in nav.** Five top-level pillars + an external link is borderline noisy. If it becomes a problem, the cleanest move is dropping the external from nav (it lives in `get-started/install-hosted`).

## Implementation phasing (handover to writing-plans)

The implementation is small enough for one continuous pass. Suggested coarse phases for the plan to refine:

1. Create `seed/` directory; write the five pages with content lifted from upstream sources.
2. Update `scripting/reader.md` to the pointer form.
3. Update `.vitepress/config.ts` (nav + sidebar).
4. Update `CLAUDE.md` (SEED docs section).
5. Build, push, watch CI.

No accuracy-fix phase needed (SEED pages are net-new content, not corrections).
