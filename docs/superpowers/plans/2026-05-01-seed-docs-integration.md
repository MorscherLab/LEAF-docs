# SEED Docs Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a SEED peer pillar to `leaf-docs.morscherlab.org` with five new pages (Overview, CLI, Python API, Rust API, Changelog stub), shrink the existing LEAF-side `scripting/reader.md` to a pointer, and wire it all into the nav/sidebar.

**Architecture:** SEED becomes a top-level peer to LEAF's existing pillars. Material is lifted from `oxion-core/PUBLIC_README.md` and `oxion-core/docs/{python-api,batch-xic,rust-api}.md` and adapted to VitePress conventions (`:::` admonitions, internal-link rewrites, dead-link cleanliness). Format-internals and the Thermo vendor archive are explicitly skipped per the spec.

**Tech Stack:** VitePress 1.6, bun, Markdown + YAML frontmatter. No new tooling.

**Spec:** `docs/superpowers/specs/2026-05-01-seed-docs-integration-design.md`.

**Source-of-truth references** (verified during plan-writing):
- SEED CLI subcommands: `oxion-core/crates/seed-cli/src/main.rs:85-300` mounts these via clap: `info`, `streams`, `scan`, `tic`, `xic`, `trailer`, `status-log`, `devices`, `device-tic`, `validate`, `benchmark`, `debug`, `diagnose`, `bench-concurrency`, `convert`. **There is no `batch-xic` CLI subcommand** — multi-target extraction is done with `seed xic --mz a,b,c` or `seed xic --mz-file targets.txt`. `batch_xic` is a Python-only entry point.
- SEED upstream docs: `oxion-core/docs/python-api.md` (~373 lines), `oxion-core/docs/batch-xic.md` (~705 lines), `oxion-core/docs/rust-api.md` (~553 lines), `oxion-core/PUBLIC_README.md` (~250 lines covering install, vendor formats, CLI sketch, Python API sketch, performance).
- SEED brand: lowercase `seed` for CLI / module / crate; uppercase `SEED` in prose. Confirmed in `oxion-core/CLAUDE.md` and `oxion-core/BRAND.md`.

---

## File Structure

| File | Disposition | Responsibility |
|---|---|---|
| `seed/index.md` | NEW | SEED Overview — install, vendor support, performance, entry-point links |
| `seed/cli.md` | NEW | `seed` CLI reference — 15 subcommand index + 3 recipes |
| `seed/python-api.md` | NEW | Python API reference — `RawFile`, format classes, `batch_xic`, NumPy patterns |
| `seed/rust-api.md` | NEW | Rust crate reference — `seed::open`, `MsReader` trait, feature flags |
| `seed/changelog.md` | NEW | 1-screen page linking to GitHub Releases |
| `scripting/reader.md` | Rewrite | Shrinks from full SEED page to 1-screen LEAF-context pointer |
| `.vitepress/config.ts` | Modify | Add SEED to top nav; add `/seed/` sidebar group |
| `CLAUDE.md` | Modify | Add "SEED docs" section: source of truth, update protocol, brand |

No deletions. No URL breakage. Existing LEAF-side links to `/scripting/reader` continue to resolve (and that page funnels to `/seed/`).

---

## Phase 1 — Create the SEED pages

The five pages are independent of each other except for cross-links. Each has a self-contained task. Build them in this order so cross-links between SEED pages don't fail the build.

### Task 1.1: Create `seed/index.md` (Overview)

**Files:**
- Create: `seed/index.md`
- Source: `/Users/estrella/Developer/MorscherLab/oxion-core/PUBLIC_README.md`

- [ ] **Step 1: Create the directory**

```bash
cd /Users/estrella/Developer/MorscherLab/LEAF-docs
mkdir -p seed
```

- [ ] **Step 2: Write the Overview page**

Read the upstream `PUBLIC_README.md` for the full prose. The page mirrors its structure but:
- Drops the `<p align="center"><img …seed-icon-256.png</p>` (the icon isn't shipped in this repo).
- Drops the "Table of Contents" section (VitePress auto-renders an outline).
- Drops the "License" section (LEAF site has its own footer).
- Replaces all references to GitHub release URLs with the actual current URL (`https://github.com/EstrellaXD/oxion/releases`) — verify this against `oxion-core/CLAUDE.md` before pasting; the spec marks the public-release path as currently dormant. **If `oxion-core/CLAUDE.md` says "Public release distribution is currently dormant", remove the install URLs and replace with a banner "Public binaries are temporarily unavailable; build from source until SEED 0.x ships."** (Per `oxion-core/CLAUDE.md:131-132` this is the current state.)
- Adds a final paragraph at the very bottom: *"LEAF — the metabolomics analysis platform built on top of SEED — has its own user manual; see [LEAF Get Started](/get-started/install-desktop) if you arrived here via that route."*

Write `seed/index.md` with this skeleton (fill the per-section prose by adapting upstream):

```md
# SEED — Spectral Extraction & Encoding Driver

A universal mass spectrometry file reader. Fast, cross-platform, no .NET required.

SEED reads mass spectrometry files from 7 vendor formats directly from their binary formats, achieving up to 700× faster scan decoding than the official .NET RawFileReader library. It provides a CLI tool, a desktop GUI converter, and Python bindings with NumPy integration.

::: warning Public release status
Public binaries and the `pip install seed` wheel are currently unavailable while SEED prepares its 0.x public relaunch. Build from source until then — see [Build from source](#build-from-source) below.
:::

## Supported Formats

(lift the table from `PUBLIC_README.md` — Thermo / Bruker / Waters / Agilent / Shimadzu / Sciex / mzML rows)

## Install

### CLI

(adapt: drop release-URL table; replace with build-from-source instructions —
`cd oxion-core && cargo build --release -p seed-cli`)

### Python

(adapt: drop `pip install seed` block; replace with
`cd oxion-core/crates/seed-py && maturin develop --release`)

### GUI

(adapt: same drop-and-replace)

## Performance

(lift the headline numbers from `PUBLIC_README.md` "Performance" section
and the perf-vs-Thermo bullet)

## Where to next

- → [Command line](/seed/cli) — `seed` subcommand reference
- → [Python API](/seed/python-api) — `import seed`
- → [Rust API](/seed/rust-api) — `use seed::…`
- → [Changelog](/seed/changelog) — release history

---

LEAF — the metabolomics analysis platform built on top of SEED — has its own user manual; see [LEAF Get Started](/get-started/install-desktop) if you arrived here via that route.

<!-- Source: oxion-core/PUBLIC_README.md -->
```

- [ ] **Step 3: Build to confirm no dead links**

```bash
bun run build
```

Expected: success. Fails on `/seed/cli`, `/seed/python-api`, `/seed/rust-api`, `/seed/changelog` because those pages don't exist yet. To keep the build green during incremental landing, replace those four "Where to next" links with plain text (no `[link](...)` syntax) and re-add as `[link]` in Task 1.6 after the other four pages exist. Or land the four pages first, then this one — order is up to the executor.

**Recommended order:** land Tasks 1.2 → 1.3 → 1.4 → 1.5 first (each is self-contained), then 1.1 last. This avoids the dead-link dance.

- [ ] **Step 4: Commit**

```bash
git add seed/index.md
git commit -m "docs(seed): add SEED Overview page"
```

---

### Task 1.2: Create `seed/cli.md`

**Files:**
- Create: `seed/cli.md`
- Sources: `oxion-core/PUBLIC_README.md` (CLI section, ~lines 80-150), `oxion-core/crates/seed-cli/src/main.rs:85-300` (subcommand definitions)

- [ ] **Step 1: Verify the subcommand list**

```bash
grep -E '^    /// |^    [A-Z][a-zA-Z]+ ' /Users/estrella/Developer/MorscherLab/oxion-core/crates/seed-cli/src/main.rs | head -50
```

Expected: 15 subcommands (`Info`, `Streams`, `Scan`, `Tic`, `Xic`, `Trailer`, `StatusLog`, `Devices`, `DeviceTic`, `Validate`, `Benchmark`, `Debug`, `Diagnose`, `BenchConcurrency`, `Convert`). Snake-case the multi-word ones in the docs (`status-log`, `device-tic`, `bench-concurrency`).

- [ ] **Step 2: Write the page**

```md
# `seed` Command Line

The `seed` CLI is a single binary with 15 subcommands for inspecting, exporting, and converting mass spectrometry files.

## Synopsis

\`\`\`bash
seed <subcommand> [arguments] [options]
\`\`\`

Run `seed --help` for the top-level help, or `seed <subcommand> --help` for per-subcommand options.

## Subcommand index

| Subcommand | Purpose |
|---|---|
| `info` | Print summary metadata (instrument, scan count, RT range) |
| `scan` | Export a single scan as JSON |
| `streams` | List OLE2 container streams (RAW only) |
| `tic` | Export the Total Ion Chromatogram as CSV |
| `xic` | Export Extracted Ion Chromatogram(s) as CSV — single or multi-target |
| `trailer` | Show trailer extra data for a scan (RAW only) |
| `status-log` | Extract instrument status log fields (RAW only) |
| `devices` | List instrument devices (controllers) in the file |
| `device-tic` | Extract per-device traces (pump pressure, UV, etc.) |
| `validate` | Validate output against ground-truth data |
| `benchmark` | Performance benchmark — read all scans, optionally measure XIC |
| `bench-concurrency` | Sweep concurrency levels for batch-XIC tuning |
| `convert` | Convert MS files to mzML |
| `debug` | Dump internal addresses and sanity checks |
| `diagnose` | Stage-by-stage parsing report (non-cascading) |

## Common flags

Most subcommands accept these:

| Flag | Description |
|---|---|
| `-o, --output PATH` | Write to file instead of stdout |
| `--mmap` (where relevant) | Use memory-mapped I/O — faster for large files |

For Thermo-specific flags like `--filter-shoulders` and `--shoulder-ratio`, run `seed scan --help` or `seed xic --help`.

## Recipes

### 1 — Convert RAW to mzML

\`\`\`bash
seed convert sample.RAW
# → sample.mzML in the same directory

seed convert sample.RAW -o /scratch/converted/sample.mzML
seed convert /data/study/                # folder mode, parallel across files
\`\`\`

Compression and precision are tunable: `--mz-bits 64`, `--intensity-bits 32`, `--compression zlib|none`. See `seed convert --help` for the full surface.

### 2 — Multi-target XIC extraction

\`\`\`bash
# Several m/z values in a single scan pass:
seed xic sample.RAW --mz 524.2646,612.3401,445.1234 --ppm 5

# m/z values from a file (one per line):
seed xic sample.RAW --mz-file targets.txt --ppm 5 -o xics.csv

# By formula + adduct:
seed xic sample.RAW --formula C17H18FN7O7 --adduct "[M-H]-" --ppm 5

# Restrict to MS1 (much faster on DDA data):
seed xic sample.RAW --mz 524.26 --ms1-only
\`\`\`

The Python `batch_xic` API (see [Python API](/seed/python-api)) is the right tool when you want to extract from many files into a tensor. The CLI `xic` is single-file.

### 3 — Quick file inspection and benchmark

\`\`\`bash
seed info sample.RAW                     # summary metadata
seed devices sample.RAW                  # list controllers
seed benchmark sample.RAW --xic --ops    # measure scan-decode + XIC perf
\`\`\`

`seed benchmark` writes JSON to stdout; pipe to `jq` for human-readable output.

## Lifecycle and exit codes

`seed` subcommands exit `0` on success, `1` on parse errors, and `2` on I/O / validation failures. `seed validate` returns a non-zero status when the validation set diverges from ground truth.

<!-- Source: oxion-core/PUBLIC_README.md (CLI section); oxion-core/crates/seed-cli/src/main.rs -->
```

- [ ] **Step 3: Build**

```bash
bun run build
```

Expected: success (the only internal links are forward to `/seed/python-api`, which doesn't exist yet). If the build fails on that link, comment it out with `<!-- → [Python API](/seed/python-api) -->` and re-enable in Task 1.6.

Better: land Task 1.3 next, then return.

- [ ] **Step 4: Commit**

```bash
git add seed/cli.md
git commit -m "docs(seed): add CLI reference (15 subcommands + 3 recipes)"
```

---

### Task 1.3: Create `seed/python-api.md`

**Files:**
- Create: `seed/python-api.md`
- Sources: `oxion-core/docs/python-api.md` (full file), `oxion-core/docs/batch-xic.md` (Python sections only)

This is the largest page (~600 lines after editing). Split policy: one page now; if it grows past ~800 lines later, revisit.

- [ ] **Step 1: Inspect upstream structure**

```bash
grep -E '^##? ' /Users/estrella/Developer/MorscherLab/oxion-core/docs/python-api.md
```

Expected sections: `Installation`, `Module: seed`, `RawFile`, `MzmlFile`, `Other format classes`, `ScanInfo`, `PyMs2Scan`, `batch_xic()`, `Streaming batch XIC`, `Changelog`.

```bash
grep -E '^##? ' /Users/estrella/Developer/MorscherLab/oxion-core/docs/batch-xic.md
```

Expected sections: `Motivation`, `Quick start — Python`, `Quick start — CLI`, `Architecture: two-pass design`, `Memory model and estimation`, `API reference — Python`, `API reference — Rust`, `CLI reference`, `NAS and network storage tips`.

- [ ] **Step 2: Plan the merge**

Final page outline:

```
# SEED Python API

## Installation
  (from python-api.md "Installation"; replace `pip install seed` with the
  build-from-source maturin command per the same dormant-release reasoning
  as Task 1.1)

## Quick start
  (lift the seed.open() auto-detect block from python-api.md "Module: seed";
  add a 5-line working example showing scan/TIC/XIC)

## `RawFile`
  (full section from python-api.md, including constructor, methods, types)

## Other format classes
  (`MzmlFile`, `MzxmlFile`, `LcdFile`, `BrukerFile`, `WatersFile` — one
  H3 each with the per-format deltas from RawFile)

## Type reference
  (`ScanInfo`, `PyMs2Scan` from python-api.md)

## Batch XIC — multi-file extraction
  (Merge from batch-xic.md: `Motivation`, `Quick start — Python`,
  `Architecture: two-pass design`, `Memory model and estimation`,
  `API reference — Python`, `Streaming batch XIC` sub-section.
  Drop the CLI sections and the Rust API sections — those live elsewhere.)

## NAS and network storage tips
  (from batch-xic.md, near-verbatim)

<!-- Source: oxion-core/docs/python-api.md and oxion-core/docs/batch-xic.md -->
```

- [ ] **Step 3: Apply VitePress edits during transcription**

For every adapted section:
- Wrap installation warnings in `:::warning` admonitions (VitePress style; the upstream uses plain `> Note:` blockquotes that work too but look out-of-style).
- Rewrite cross-links: any `[link](rust-api.md)` → `[link](/seed/rust-api)`; any `[link](batch-xic.md)` → in-page anchors (e.g., `#batch-xic-multi-file-extraction`); any external link to the LEAF repo stays as-is.
- Rewrite the `import seed` snippets verbatim (they are correct Python).
- Drop the upstream's "## Changelog" section — we have a dedicated `/seed/changelog` page.

- [ ] **Step 4: Build**

```bash
bun run build
```

Expected: success. If a link to `/seed/rust-api` fails because that page doesn't exist yet, replace with `<!-- TODO link --> [Rust API]` plain text; re-add the link in Task 1.6.

- [ ] **Step 5: Commit**

```bash
git add seed/python-api.md
git commit -m "docs(seed): add Python API (incl. batch_xic deep dive)"
```

---

### Task 1.4: Create `seed/rust-api.md`

**Files:**
- Create: `seed/rust-api.md`
- Source: `oxion-core/docs/rust-api.md` (full file)

- [ ] **Step 1: Inspect upstream structure**

```bash
grep -E '^##? ' /Users/estrella/Developer/MorscherLab/oxion-core/docs/rust-api.md
```

Expected sections: `Crate: thermo-raw`, `RawFile`, `Core Types`, `Enums`, `Scan Event Types`, `Scan Index`, `Batch Processing`, `Error Handling`, `Version Support`, `Diagnostics`.

- [ ] **Step 2: Critical correction during transcription**

The upstream `rust-api.md` opens with `## Crate: thermo-raw` and a `[dependencies] thermo-raw = { path = "crates/thermo-raw" }` block. **This is stale** — per the SEED brand (`oxion-core/CLAUDE.md`), the actual crate is `seed`, not `thermo-raw`. Verify by inspecting `oxion-core/Cargo.toml` and `oxion-core/crates/seed/Cargo.toml`:

```bash
grep -E '^name|^\[' /Users/estrella/Developer/MorscherLab/oxion-core/crates/seed/Cargo.toml | head -5
```

Expected: `name = "seed"`. If confirmed, every `thermo-raw` reference in this page becomes `seed`. The crate-import block becomes:

```rust
use seed::{open, MsReader, RawFile, MzMLFile};
```

The `[dependencies]` block becomes:

```toml
[dependencies]
seed = { git = "https://github.com/EstrellaXD/oxion-core", default-features = false, features = ["raw", "mzml", "convert"] }
```

(The repo URL stays `oxion-core` per the brand note — it's the legacy repo name. If the public mirror is restored before this lands, swap the URL.)

- [ ] **Step 3: Write the page**

Final outline:

```
# SEED Rust API

## Add the dependency
  (Cargo.toml block; feature flags `raw`, `mzml`, `convert`)

## Quick start
  (`use seed::{open, MsReader}` — auto-detect entry; show a 5-line example
  reading scan count and exporting one TIC)

## `MsReader` trait
  (the format-agnostic interface; from upstream "RawFile" but reframed
  to lead with the trait)

## `RawFile`
  (Thermo-specific entry; constructors, metadata getters, scan accessors)

## `MzMLFile`
  (mzML reader; from upstream)

## Core types
  (Scan, Chromatogram, FileMetadata, PrecursorInfo from upstream "Core Types"
  and "Scan Event Types")

## Enums
  (DeviceType, MsLevel, Polarity, Precision, Compression, ChromatogramType
  from upstream "Enums")

## Batch processing
  (from upstream "Batch Processing" — `batch_xic_ms1`, `prescan_rt_grid`,
  `extract_xic_onto_grid`)

## Error handling
  (from upstream — MsError vs RawError vs MzMLError)

## Version support
  (RAW versions 57-66 supported; from upstream)

## Generated reference

For the full method-by-method reference (every public function with its rustdoc), generate locally:

\`\`\`bash
cd /path/to/oxion-core
cargo doc --open -p seed
\`\`\`

This page covers the surface; the rustdoc covers the depth.

<!-- Source: oxion-core/docs/rust-api.md -->
```

- [ ] **Step 4: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 5: Commit**

```bash
git add seed/rust-api.md
git commit -m "docs(seed): add Rust API (with thermo-raw → seed crate-name fix)"
```

---

### Task 1.5: Create `seed/changelog.md`

**Files:**
- Create: `seed/changelog.md`

The page mirrors LEAF's `changelog.md` pattern: a 1-screen page that links out to GitHub Releases for the actual notes.

- [ ] **Step 1: Read LEAF's existing changelog page**

```bash
cat /Users/estrella/Developer/MorscherLab/LEAF-docs/changelog.md
```

Match its tone and shape.

- [ ] **Step 2: Write the page**

```md
# SEED Changelog

Release notes are maintained in the [oxion-core repository](https://github.com/EstrellaXD/oxion-core) — see [GitHub Releases](https://github.com/EstrellaXD/oxion/releases) for the published series.

::: info Public release status
The public release pipeline is currently dormant; releases are being built privately while SEED prepares its 0.x public relaunch. The `oxion` and `oxion-core` repositories share their release tags — both names appear in older release URLs.
:::

## Recent activity

For the development changelog (per-commit, including unreleased work), see [`CHANGELOG.md`](https://github.com/EstrellaXD/oxion-core/blob/main/CHANGELOG.md) in the SEED repository.

## Performance log

SEED maintains a separate [`OPTIMIZATION.md`](https://github.com/EstrellaXD/oxion-core/blob/main/OPTIMIZATION.md) recording every release that ships a measured performance improvement — workload, before/after timings, and the change that produced the speedup. Use it when you need historical perf context, not feature notes.
```

- [ ] **Step 3: Build, commit**

```bash
bun run build
git add seed/changelog.md
git commit -m "docs(seed): add changelog stub linking out to GitHub releases"
```

---

### Task 1.6: Re-enable forward links across SEED pages

**Files:**
- Modify: `seed/index.md`
- Modify: `seed/cli.md`
- Modify: `seed/python-api.md`

Re-enable any links you commented out / replaced with plain text in the previous tasks (the "Where to next" block on `seed/index.md`, the `[Python API]` link in `seed/cli.md`, the `[Rust API]` link in `seed/python-api.md`).

- [ ] **Step 1: Find any TODO link comments**

```bash
grep -nE '<!-- TODO link -->|<!-- → \[' seed/*.md
```

Replace each with the proper `[Text](/seed/page)` link.

- [ ] **Step 2: Build**

```bash
bun run build
```

Expected: success, no dead links.

- [ ] **Step 3: Commit**

```bash
git add seed/
git commit -m "docs(seed): wire up cross-links between SEED pages"
```

---

## Phase 2 — Shrink `scripting/reader.md` to a pointer

### Task 2.1: Rewrite `scripting/reader.md`

**Files:**
- Modify: `scripting/reader.md`

- [ ] **Step 1: Replace the entire file body**

Overwrite `scripting/reader.md` with:

```md
# SEED — the LEAF reader backend

LEAF reads RAW files through SEED on macOS and Linux (the `rust` backend in [`leaf --backend`](/scripting/cli/configuration#backend-selection)). On Windows, LEAF defaults to Thermo's `dotnet` reader and falls back to SEED on opt-in.

SEED is a separate project with its own user manual:

→ [SEED — Overview](/seed/)
→ [Command line](/seed/cli) · [Python API](/seed/python-api) · [Rust API](/seed/rust-api)

## When the backend choice matters

- **macOS / Linux** — there is no choice; SEED is the only reader.
- **Windows** — `auto` picks `dotnet` by default. Override to `rust` (`--backend rust` or **Settings → Advanced**) when you want SEED's parser; override to `dotnet` (the default) for files SEED cannot decode.

## Reporting RAW files SEED cannot read

1. Confirm Thermo's Xcalibur opens the file.
2. On Windows, retry with `--backend dotnet`.
3. If neither works, [open a LEAF issue](https://github.com/MorscherLab/LEAF/issues) with the LEAF version, the instrument model, and the firmware version.
```

This trims the page from ~50 lines to ~25; all the "what is SEED" prose now lives at `/seed/`.

- [ ] **Step 2: Build, commit**

```bash
bun run build
git add scripting/reader.md
git commit -m "docs(scripting): shrink reader.md to a 1-screen LEAF-context pointer"
```

---

## Phase 3 — Wire SEED into the nav and sidebar

### Task 3.1: Update `.vitepress/config.ts`

**Files:**
- Modify: `.vitepress/config.ts`

- [ ] **Step 1: Add `SEED` to the top nav**

Find the `nav` array (currently in `.vitepress/config.ts:21-27`):

```ts
    nav: [
      { text: 'Get Started', link: '/get-started/install-desktop' },
      { text: 'Workflow', link: '/workflow/prepare-data' },
      { text: 'Scripting', link: '/scripting/' },
      { text: 'Reference', link: '/reference/ui-tour' },
      { text: 'Open MINT', link: 'https://mint.morscherlab.org' },
    ],
```

Replace with:

```ts
    nav: [
      { text: 'Get Started', link: '/get-started/install-desktop' },
      { text: 'Workflow', link: '/workflow/prepare-data' },
      { text: 'Scripting', link: '/scripting/' },
      { text: 'SEED', link: '/seed/' },
      { text: 'Reference', link: '/reference/ui-tour' },
      { text: 'Open MINT', link: 'https://mint.morscherlab.org' },
    ],
```

- [ ] **Step 2: Add the `/seed/` sidebar group**

Find the `sidebar` object. Append (just before the closing `},` of the `sidebar` object):

```ts
      '/seed/': [
        {
          text: 'SEED',
          items: [
            { text: 'Overview', link: '/seed/' },
          ],
        },
        {
          text: 'Reference',
          items: [
            { text: 'Command line', link: '/seed/cli' },
            { text: 'Python API', link: '/seed/python-api' },
            { text: 'Rust API', link: '/seed/rust-api' },
            { text: 'Changelog', link: '/seed/changelog' },
          ],
        },
      ],
```

- [ ] **Step 3: Build**

```bash
bun run build
```

Expected: success. The new top-nav `SEED` item should resolve, and visiting any `/seed/*` URL should show the `/seed/` sidebar.

- [ ] **Step 4: Visual smoke test**

```bash
bun run dev
```

Open http://localhost:17173/seed/ and verify:
- Top nav shows: Get Started · Workflow · Scripting · SEED · Reference · Open MINT
- Sidebar on `/seed/` shows two groups (SEED with Overview; Reference with four items)
- Cross-links between SEED pages work (Overview → CLI → Python API → Rust API → back to Overview)
- Cross-link from `/scripting/reader` to `/seed/` works

Stop with `Ctrl+C`.

- [ ] **Step 5: Commit**

```bash
git add .vitepress/config.ts
git commit -m "docs(config): add SEED to top nav; register /seed/ sidebar"
```

---

## Phase 4 — Update CLAUDE.md

### Task 4.1: Document SEED docs in `CLAUDE.md`

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add an SEED-specific section**

Find the `## Architecture` section in `CLAUDE.md`. Append a new H2 directly after the directory bullet list:

```md
## SEED docs

[SEED](https://github.com/EstrellaXD/oxion-core) (Spectral Extraction & Encoding Driver, formerly oxion) is a peer product hosted under `/seed/` here while it has no public docs site of its own. LEAF stays the primary tenant of this site (home page, brand); SEED is a top-nav peer.

**Source of truth.** SEED docs live at:
- `oxion-core/PUBLIC_README.md` — install, vendor formats, perf summary
- `oxion-core/docs/python-api.md` — Python API
- `oxion-core/docs/batch-xic.md` — multi-file batch extraction
- `oxion-core/docs/rust-api.md` — Rust crate

The pages in `seed/` are derived from those upstream files. Every page ends with a `<!-- Source: ... -->` comment naming its upstream.

**Update protocol.** Monthly diff `oxion-core/docs/{python-api,batch-xic,rust-api}.md` and `oxion-core/PUBLIC_README.md` against the corresponding pages here. Format-internals (`FORMAT_SPEC.md`, `OLE2_STRUCTURE.md`, `SCAN_DATA_ENCODING.md`, `VERSION_DIFFERENCES.md`, `TransitionMatrix.md`) are intentionally not mirrored — they live upstream only. The Thermo vendor archive (`UsingRawFileReader.md`, `UsingNuGet.md`) is also out of scope.

**Brand.** Lowercase `seed` for the CLI / Python module / Rust crate; uppercase `SEED` for the product name in prose. Same convention as `leaf` / `LEAF`.
```

- [ ] **Step 2: Update the directory list to mention `seed/`**

Find the bullet list of content directories. Add a new bullet after the `scripting/` line:

```md
- `seed/` — SEED user manual (Overview · CLI · Python API · Rust API · Changelog). Material lifted from `oxion-core` upstream; see "SEED docs" below for the source-of-truth process.
```

- [ ] **Step 3: Build, commit**

```bash
bun run build
git add CLAUDE.md
git commit -m "docs: document SEED docs section in CLAUDE.md"
```

---

## Phase 5 — Final acceptance

### Task 5.1: End-to-end smoke + push

- [ ] **Step 1: Full build**

```bash
bun run build
```

Expected: success, zero dead-link warnings.

- [ ] **Step 2: Grep gate**

```bash
grep -rEn 'leaf serve' --include='*.md' --exclude-dir=node_modules --exclude-dir=docs --exclude='glossary.md' . || echo "GATE PASSED"
```

Expected: `GATE PASSED`.

- [ ] **Step 3: Visual smoke test**

```bash
bun run dev
```

Open http://localhost:17173/ and walk:
- Home page (`/`) — still LEAF-branded; nothing about SEED on the front
- `/seed/` — Overview renders with vendor-format table, install (build-from-source), perf summary, "Where to next" block
- `/seed/cli` — 15-row subcommand table, three recipes, exit-codes section
- `/seed/python-api` — `RawFile` reference, format classes, `batch_xic` deep dive, NAS tips
- `/seed/rust-api` — `Cargo.toml` block uses `seed` (not `thermo-raw`), `MsReader` trait section
- `/seed/changelog` — 1-screen page linking to GitHub Releases
- `/scripting/reader` — shrunken pointer page; clicks through to `/seed/`
- `/get-started/install-desktop` — Requirements row still mentions SEED via `/scripting/reader`; that link still resolves
- `/reference/glossary` — SEED entry still resolves

Stop with `Ctrl+C`.

- [ ] **Step 4: Push**

```bash
git push origin main
```

- [ ] **Step 5: Watch CI**

```bash
gh run list --limit 1 --json databaseId,status,conclusion,displayTitle
gh run watch <id> --exit-status
```

CI must show:
- `bun install --frozen-lockfile` → green
- "Check for retired `leaf serve` references" → green
- `bun run build` → green
- Pages deploy → green

If anything red, fix the root cause and re-push.

---

## Self-Review Checklist (post-write)

**Spec coverage:**
- ✅ Five new SEED pages — Tasks 1.1, 1.2, 1.3, 1.4, 1.5
- ✅ `scripting/reader.md` shrink — Task 2.1
- ✅ Top nav + sidebar update — Task 3.1
- ✅ `CLAUDE.md` SEED section — Task 4.1
- ✅ "When in doubt, link out" honored — format-internals and vendor archive explicitly excluded; mentioned in `seed/index.md` and `CLAUDE.md`
- ✅ Source-of-truth footer comments — required at the bottom of every new page (Tasks 1.1-1.4)
- ✅ Brand consistency — lowercase `seed` for code, uppercase `SEED` in prose, called out in CLAUDE.md
- ✅ Build verification — every task ends with `bun run build` + commit
- ✅ Existing LEAF-side cross-references to `/scripting/reader` continue to resolve — verified by smoke test in Task 5.1

**Placeholder scan:** No "TBD" / "TODO" / "implement later" patterns. Every step has runnable content (commands, code, edit instructions). Where a section says "lift from upstream", the upstream path is named explicitly and the structure to extract is enumerated.

**Type consistency:** Crate name `seed` (not `thermo-raw`) is used uniformly; the upstream rust-api.md staleness is called out in Task 1.4 with a verification step. Subcommand names (`status-log`, `device-tic`, `bench-concurrency` — kebab-case) match what clap actually exposes per the verification in Task 1.2 Step 1. Brand convention `seed` / `SEED` consistent across Tasks 1.1, 1.2, 1.3, 1.4, 4.1.

**One known concern:** The `seed/python-api.md` page is large (~600 lines). If it grows past ~800 lines after adapting upstream, split into `seed/python-api.md` (core: install, RawFile, formats, types) + `seed/batch-xic.md` (batch_xic deep dive + NAS tips). Defer that decision until after Task 1.3 completes.
