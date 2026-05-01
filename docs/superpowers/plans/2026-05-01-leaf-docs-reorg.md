# LEAF Docs Reorganization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix doc/code accuracy mismatches in the LEAF user manual (`leaf serve` → `leaf webui run`, missing CLI commands, invented Python API, missing SEED reader page) and restructure into App + Scripting pillars over a mode-prefixed workflow spine.

**Architecture:** Two pillars (App, Scripting) over one workflow spine, shared `Reference` section. Mode-prefix workflow (Targeted vs Untargeted). New `/scripting/` tree replaces `/cli/` and `/python/`; old paths become 1-page redirect stubs. Inline accuracy fixes ship first; structural moves come after. Verification: `bun run build` (already strict on dead links via `ignoreDeadLinks: false`) plus a grep gate against `leaf serve` regressions.

**Tech Stack:** VitePress 1.6, bun, Vue 3 (`<script setup>` for redirect stubs), Markdown + YAML frontmatter.

**Source-of-truth references** (verified during spec):
- LEAF CLI: `/Users/estrella/Developer/MorscherLab/LEAF/packages/leaf/analyzer/cli/__init__.py` mounts four sub-apps — `targeted`, `untargeted`, `watch`, `webui`. Hidden legacy aliases: `analyze`, `untarget`. Console script entry: `leaf = "leaf.analyzer.cli:run"`.
- LEAF webui defaults: `_DEFAULT_HOST = "127.0.0.1"`, `_DEFAULT_PORT = 18008` (`packages/leaf/analyzer/cli/webui.py`).
- LEAF Python public exports: `Samples`, `Analyzer`, `PeakPicking`, `QCReport` (`packages/leaf/analyzer/__init__.py`).
- Backend flag: `--backend auto|dotnet|rust` where `rust` is SEED (`packages/leaf/analyzer/cli/commands/_targeted.py`).
- SEED brand: `oxion-core/CLAUDE.md` confirms SEED = Spectral Extraction & Encoding Driver. Repo name `oxion-core` retained for legacy reasons; the brand is SEED end-to-end.

::: warning Recipe-method verification (read before Task 1.9)
The Python recipes in this plan assume idiomatic method names (`Samples.load`, `samples.save`, `samples.intensities`, `samples.features`, `Analyzer.run`, `PeakPicking.run`, `QCReport.verdict_summary`). These were **not** verified against source during plan-writing. Before committing the recipe content in Task 1.9 (and copying it in Task 4.9), the engineer must:

1. Open `packages/leaf/analyzer/__init__.py` and the four exported classes (`Samples`, `Analyzer`, `PeakPicking`, `QCReport`).
2. For each method invoked in the recipe, confirm the method exists with the assumed name. Use `grep -rE 'def (load|save|run|verdict_summary)\b' /Users/estrella/Developer/MorscherLab/LEAF/packages/leaf/analyzer/`.
3. If a method **does not exist** with the assumed name, do **not** invent — per the B3 decision. Either:
   - Replace the recipe with one that uses methods that do exist, or
   - Truncate the recipe at the boundary and add a sentence linking upstream: *"The next step (saving to a `.msd`) is documented upstream in [LEAF's developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api/model.md)."*

The CLI flag tables (Tasks 4.4, 4.5, 4.6) were derived from `packages/leaf/analyzer/cli/commands/_targeted.py` and watch.py and are accurate; they do not need this verification.
:::

**Spec:** `docs/superpowers/specs/2026-05-01-leaf-docs-reorg-design.md`.

---

## File Structure

| File | Disposition | Responsibility |
|---|---|---|
| `index.md` | Modify | Home page; remove `leaf serve`; retarget links |
| `get-started/install-desktop.md` | Modify | Install + launch (uses `leaf webui run`); SEED note |
| `get-started/install-hosted.md` | Unchanged | Hosted MINT path |
| `get-started/quickstart.md` | Modify | First-run walkthrough (replace `leaf serve`) |
| `workflow/prepare-data.md` | Unchanged (callout added) | CSV schema; ends with "Also from a script" |
| `workflow/extract.md` | Modify | Targeted Extract; rebrand title; "Also from a script" callout |
| `workflow/analyze.md` | Modify (callout added only) | Peak picking inspection |
| `workflow/visualize.md` | Modify (callout added only) | Plotly statistical charts |
| `workflow/export.md` | Modify (callout added only) | `.msd` / `.csv` export |
| `workflow/tracing.md` | Modify (badge added) | Targeted modifier |
| `workflow/untargeted.md` | Rewrite | Becomes 1-screen overview linking to the three untargeted pages |
| `workflow/extract-untargeted.md` | NEW | Untargeted Extract page (split from current untargeted.md) |
| `workflow/inspect-features.md` | NEW | Untargeted feature triage page |
| `cli/overview.md` | Replace | Becomes redirect stub → `/scripting/cli/overview` |
| `cli/serve.md` | Replace | Becomes redirect stub → `/scripting/cli/webui` |
| `cli/configuration.md` | Replace | Becomes redirect stub → `/scripting/cli/configuration` |
| `python/overview.md` | Replace | Becomes redirect stub → `/scripting/python/overview` |
| `python/quickstart.md` | Replace | Becomes redirect stub → `/scripting/python/recipes` |
| `scripting/index.md` | NEW | "When to use scripting" |
| `scripting/cli/overview.md` | NEW | Command index with all four sub-apps |
| `scripting/cli/webui.md` | NEW | `leaf webui run|start|stop|status` |
| `scripting/cli/targeted.md` | NEW | `leaf targeted` curated flag reference + recipe |
| `scripting/cli/untargeted.md` | NEW | `leaf untargeted` curated flag reference + recipe |
| `scripting/cli/watch.md` | NEW | `leaf watch run|start|stop|status` |
| `scripting/cli/configuration.md` | NEW | Config + backend selection (dotnet/rust = SEED) |
| `scripting/python/overview.md` | NEW | When to use the package; real public exports |
| `scripting/python/recipes.md` | NEW | Real recipes using `Samples`, `Analyzer`, etc. |
| `scripting/reader.md` | NEW | SEED note (1 screen) |
| `reference/ui-tour.md` | Unchanged | UI map |
| `reference/troubleshooting.md` | Modify | `leaf serve` → `leaf webui run`; SEED row |
| `reference/faq.md` | Unchanged (callout?) | No callout — FAQ is its own format |
| `reference/glossary.md` | Modify | Add `leaf serve` deprecated-alias entry; add SEED entry |
| `team.md` | Unchanged | Team page |
| `changelog.md` | Unchanged | Changelog |
| `.vitepress/config.ts` | Modify | Nav (drop `More`); sidebar groups (drop `/cli/`, `/python/`; add `/scripting/`); register every new path |
| `.github/workflows/deploy.yml` | Modify | Add grep-gate step before `bun run build` |
| `CLAUDE.md` | Modify | Update docs-structure pointer to mention `/scripting/` |

---

## Phase 1 — Accuracy fixes (ship-now, no moves)

Goal: every visible mention of `leaf serve` becomes `leaf webui run`; the wrong backend wording in `cli/configuration.md` is corrected; `install-desktop.md` startup output is honest. No URL changes in this phase, so the existing `/cli/...` and `/python/...` URLs keep working while `/scripting/` does not yet exist.

### Task 1.1: Add the grep gate to CI

**Files:**
- Modify: `.github/workflows/deploy.yml`

The grep gate is the "test" for Phase 1: any `leaf serve` mention outside `reference/glossary.md` (where it lives as a deprecated alias) fails the build. We add it FIRST so we run red, then turn green file by file.

- [ ] **Step 1: Add the grep step before `bun run build`**

Edit `.github/workflows/deploy.yml`. Insert this step between "Install dependencies" and "Build VitePress site":

```yaml
      - name: Check for retired `leaf serve` references
        run: |
          if grep -rEn 'leaf serve' --include='*.md' \
                 --exclude-dir=node_modules \
                 --exclude-dir=docs \
                 --exclude='reference/glossary.md' .; then
            echo "::error::Retired command 'leaf serve' found above. Use 'leaf webui run' instead."
            exit 1
          fi
```

`--exclude-dir=docs` keeps the spec/plan files (`docs/superpowers/`) outside the gate. `--exclude=reference/glossary.md` lets the glossary keep `leaf serve` as a deprecated-alias entry (added in Task 1.8).

- [ ] **Step 2: Run the gate locally to confirm it currently FAILS**

```bash
cd /Users/estrella/Developer/MorscherLab/LEAF-docs
grep -rEn 'leaf serve' --include='*.md' --exclude-dir=node_modules --exclude-dir=docs --exclude='reference/glossary.md' . | head
```

Expected: 12+ hits across `index.md` (none — the home features card doesn't say `leaf serve`, but verify), `get-started/install-desktop.md`, `get-started/quickstart.md`, `cli/overview.md`, `cli/serve.md`, `cli/configuration.md`, `reference/troubleshooting.md`. The `CLAUDE.md` line at the project root is also caught — that is fine; we will fix it in Task 1.10.

- [ ] **Step 3: Commit the gate (still red)**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add grep gate against retired 'leaf serve' command"
```

The gate is intentionally red until subsequent tasks land. Do NOT push to `main` yet — push at the end of Phase 1 only.

---

### Task 1.2: Fix `index.md`

**Files:**
- Modify: `index.md`

Verify there is currently no `leaf serve` reference on the home page (the screenshot for "Local-first execution" feature mentions `127.0.0.1` only). If `grep -n 'leaf serve' index.md` finds nothing, this task is a no-op — confirm and proceed to 1.3.

- [ ] **Step 1: Confirm no change needed**

```bash
grep -n 'leaf serve' index.md
```

Expected: no output. If output, replace each `leaf serve` with `leaf webui run`. Otherwise, mark task complete and skip to 1.3.

---

### Task 1.3: Fix `get-started/install-desktop.md`

**Files:**
- Modify: `get-started/install-desktop.md`

- [ ] **Step 1: Read the current file**

```bash
sed -n '1,90p' get-started/install-desktop.md
```

Note current `leaf serve` lines (5 occurrences: line 5, line 49, line 61, line 72, and a startup-output banner around line 53–57).

- [ ] **Step 2: Replace the screenshot placeholder line**

Edit `get-started/install-desktop.md`. Find:

```md
> [Screenshot: LEAF home page in a browser after running `leaf serve`]
```

Replace with:

```md
> [Screenshot: LEAF home page in a browser after running `leaf webui run`]
```

- [ ] **Step 3: Replace the Launch section**

Find the `## Launch` section (currently lines 44–61). Replace its entire body with:

```md
## Launch

Open a terminal and run:

```bash
leaf webui run
```

LEAF starts in the foreground and prints a uvicorn banner ending in:

```
Uvicorn running on http://127.0.0.1:18008 (Press CTRL+C to quit)
```

Open `http://127.0.0.1:18008` in your browser and you'll see the LEAF home page.

> [Screenshot: terminal showing `leaf webui run` startup output]

To run LEAF in the background instead, use `leaf webui start` (and `leaf webui stop` to terminate). See [`leaf webui`](/cli/webui) for full options.
```

(The link `/cli/webui` will route to `/scripting/cli/webui` after Phase 5; for now `/cli/webui` is a dead link that VitePress will catch. This is intentional — it surfaces in build output as a TODO that Phase 5 closes. To keep the build passing in Phase 1, link to the existing `/cli/serve` instead and update in Phase 5. Use `[`leaf webui`](/cli/serve)` here.)

- [ ] **Step 4: Replace the troubleshooting row**

In the Troubleshooting table at the bottom of the file, find:

```md
| Port 18008 already in use | Another process is using the port. Run `leaf serve --port 18009` (or any free port). |
```

Replace with:

```md
| Port 18008 already in use | Another process is using the port. Run `leaf webui run --port 18009` (or any free port). |
```

- [ ] **Step 5: Run the grep gate locally to confirm this file is now clean**

```bash
grep -n 'leaf serve' get-started/install-desktop.md
```

Expected: no output.

- [ ] **Step 6: Run `bun run build` to confirm no dead links**

```bash
bun run build
```

Expected: build succeeds. If it fails on `/cli/serve` (it shouldn't — the file still exists), revert and use the existing path.

- [ ] **Step 7: Commit**

```bash
git add get-started/install-desktop.md
git commit -m "docs: replace 'leaf serve' with 'leaf webui run' in install-desktop"
```

---

### Task 1.4: Fix `get-started/quickstart.md`

**Files:**
- Modify: `get-started/quickstart.md`

- [ ] **Step 1: Find every `leaf serve` mention**

```bash
grep -n 'leaf serve' get-started/quickstart.md
```

Expected: 0 hits. The quickstart describes the UI flow and does not currently mention `leaf serve`. If hits exist, replace each with `leaf webui run`.

- [ ] **Step 2: Confirm and skip if 0 hits, otherwise commit the replacements**

```bash
git diff get-started/quickstart.md
```

If the diff is empty, mark complete. Otherwise:

```bash
git add get-started/quickstart.md
git commit -m "docs: replace 'leaf serve' with 'leaf webui run' in quickstart"
```

---

### Task 1.5: Fix `cli/serve.md` (still in place — full rewrite)

**Files:**
- Modify: `cli/serve.md`

`cli/serve.md` becomes a redirect stub in Phase 5. In Phase 1 we keep the URL alive but rewrite the content so it reflects reality. The page renames to "leaf webui" semantically; the URL stays `/cli/serve` until Phase 5.

- [ ] **Step 1: Replace the entire file body**

Overwrite `cli/serve.md` with:

```md
# `leaf webui`

Starts the LEAF backend server and serves the web interface on the local machine. This is the primary entry point for desktop installations.

::: info Renamed
This command was previously documented as `leaf serve`. The actual entry point is `leaf webui` and has four sub-commands (`run`, `start`, `stop`, `status`). The `leaf serve` form has never existed in the shipping CLI.
:::

## Synopsis

```bash
leaf webui run    [--host HOST] [--port PORT]   # foreground
leaf webui start  [--host HOST] [--port PORT]   # detached daemon
leaf webui stop                                  # terminate the daemon
leaf webui status                                # show daemon state
```

## Default behavior — `leaf webui run`

```bash
leaf webui run
```

On startup, the server:

1. Binds to the loopback interface `127.0.0.1` (not `0.0.0.0`); the application is therefore reachable only from the local machine.
2. Listens on TCP port **18008** by default.
3. Runs in the foreground until interrupted (`Ctrl+C`).

Expected output (uvicorn banner):

```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:18008 (Press CTRL+C to quit)
```

## Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--host`, `-H` | `127.0.0.1` | Bind address. Use `0.0.0.0` to expose on the local network — see warning below. |
| `--port`, `-p` | `18008` | TCP port. Use a different value if 18008 is taken. |

::: warning Network exposure
`--host 0.0.0.0` exposes LEAF to anyone on the same network and provides no authentication. Use only on trusted networks. For multi-user deployments, use the hosted MINT path instead — see [Use the hosted version](/get-started/install-hosted).
:::

## Daemon mode

`leaf webui start` runs the server in the background. The PID is recorded so `leaf webui stop` can terminate it cleanly:

```bash
leaf webui start --port 18009
leaf webui status
leaf webui stop
```

`leaf webui status` prints `running (pid N, port 18009)` or `not running`.

## Common scenarios

### Port already in use

```bash
leaf webui run --port 18009
```

Then open `http://127.0.0.1:18009` in the browser.

### Confirming the server is running

```bash
curl -I http://127.0.0.1:18008
```

A `200 OK` or `302 Found` response indicates the server is reachable.

## Lifecycle

| Action | Effect |
|--------|--------|
| `Ctrl+C` (foreground `run`) | Stops the server. |
| Close the browser tab | No effect; server keeps running. |
| Close the terminal window | Terminates `leaf webui run` (SIGHUP). The daemon (`leaf webui start`) survives. |
| `leaf webui stop` | Terminates the daemon. |

## Next

→ [Configuration](/cli/configuration) — storage paths, backend selection
```

- [ ] **Step 2: Confirm grep gate passes for this file**

```bash
grep -n 'leaf serve' cli/serve.md
```

Expected: no output.

- [ ] **Step 3: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add cli/serve.md
git commit -m "docs(cli): rewrite serve page as 'leaf webui' with real subcommands"
```

---

### Task 1.6: Fix `cli/overview.md`

**Files:**
- Modify: `cli/overview.md`

- [ ] **Step 1: Replace the entire file body**

Overwrite `cli/overview.md` with:

```md
# Command-Line Interface

The `leaf` command-line interface ships with the LEAF Python package. It has four sub-applications:

| Sub-command | Purpose | Reference |
|-------------|---------|-----------|
| `leaf webui` | Start / stop the local web application (`run`, `start`, `stop`, `status`) | [Detail](/cli/serve) |
| `leaf targeted` | Targeted metabolite extraction, peak picking, and quality scoring (no UI) | `leaf targeted --help` |
| `leaf untargeted` | Untargeted MS1 feature discovery (no UI) | `leaf untargeted --help` |
| `leaf watch` | Real-time folder monitoring; auto-extracts new RAW files (`run`, `start`, `stop`, `status`) | `leaf watch run --help` |

For programmatic use without a CLI, see the [Python package documentation](/python/overview).

## Verifying the installation

```bash
leaf --version
```

Expected output:

```
leaf 0.5.0
```

If the command is not found, the install location is not on `PATH`. Resolutions are listed in [Install on desktop — Troubleshooting](/get-started/install-desktop#troubleshooting).

## Legacy aliases

Two console-script shims preserve compatibility with existing scripts:

| Shim | Equivalent to |
|------|---------------|
| `leaf-watch` | `leaf watch run` |
| `leaf-untarget` | `leaf untargeted` |

The CLI also accepts hidden aliases `leaf analyze` and `leaf untarget` as deprecated forms of `leaf targeted` and `leaf untargeted`.

## Configuration

Persistent settings (storage paths, default backend, worker counts) are configured through the **Settings** dialog in the web UI. Configuration on disk is described in [Configuration](/cli/configuration).

## Next

→ [`leaf webui`](/cli/serve) — start the web application
→ [Configuration](/cli/configuration) — config files and environment variables
```

- [ ] **Step 2: Confirm grep gate passes for this file**

```bash
grep -n 'leaf serve' cli/overview.md
```

Expected: no output.

- [ ] **Step 3: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add cli/overview.md
git commit -m "docs(cli): rewrite overview to list four sub-apps (targeted/untargeted/watch/webui)"
```

---

### Task 1.7: Fix `cli/configuration.md`

**Files:**
- Modify: `cli/configuration.md`

- [ ] **Step 1: Replace the inaccurate backend section**

Edit `cli/configuration.md`. Find the section starting `## Backend selection` (currently lines 47–55). Replace its entire body with:

```md
## Backend selection

LEAF reads RAW files through one of three backends. Selection is per-run via the `--backend` flag on `leaf targeted` / `leaf untargeted`, or per-installation via the **Settings → Advanced** dialog in the web UI.

| Backend | When used | Source |
|---------|-----------|--------|
| `auto` (default) | Picks the best backend for the current platform: `dotnet` on Windows, `rust` (SEED) elsewhere | — |
| `rust` | Bundled SEED reader (Rust); no .NET required | [SEED](/scripting/reader) |
| `dotnet` | Thermo .NET RawFileReader; requires .NET 8.0 SDK on Windows | Thermo Fisher |

Switching backends does not modify saved results. The `dotnet` backend is the only one that supports parallel extraction with `--parallel`; `rust` (SEED) extracts in parallel by default.
```

- [ ] **Step 2: Replace the lead-in line that mentions `leaf serve`**

Find:

```md
3. **Command-line flags** — passed to `leaf serve` (see [`leaf serve`](/cli/serve)).
```

Replace with:

```md
3. **Command-line flags** — passed to `leaf webui` (see [`leaf webui`](/cli/serve)) or to `leaf targeted` / `leaf untargeted`.
```

(The `/scripting/reader` link will be a dead link until Phase 4 creates the page. Use `https://github.com/MorscherLab/LEAF/tree/main/docs` as the temporary target — replace with `/scripting/reader` in Phase 4.)

- [ ] **Step 3: Confirm grep gate**

```bash
grep -n 'leaf serve' cli/configuration.md
```

Expected: no output.

- [ ] **Step 4: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 5: Commit**

```bash
git add cli/configuration.md
git commit -m "docs(cli): correct backend wording (auto/dotnet/rust) and replace 'leaf serve'"
```

---

### Task 1.8: Fix `reference/troubleshooting.md` and `reference/glossary.md`

**Files:**
- Modify: `reference/troubleshooting.md`
- Modify: `reference/glossary.md`

- [ ] **Step 1: Fix troubleshooting.md — the install/launch table**

Find these two rows:

```md
| `command not found: leaf` | Install location not on PATH | `uv tool update-shell` (uv) or add `~/.local/bin` to PATH (pip) |
| Port 18008 already in use | Another process is on the port | `leaf serve --port 18009` |
| `pythonnet` errors on Windows | Missing .NET 8.0 | Install [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) |
| Browser shows "Cannot connect" | LEAF crashed or terminal closed | Re-run `leaf serve`; check the terminal for errors |
```

Replace with:

```md
| `command not found: leaf` | Install location not on PATH | `uv tool update-shell` (uv) or add `~/.local/bin` to PATH (pip) |
| Port 18008 already in use | Another process is on the port | `leaf webui run --port 18009` |
| `pythonnet` errors on Windows | Missing .NET 8.0 | Install [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) |
| Browser shows "Cannot connect" | LEAF crashed or terminal closed | Re-run `leaf webui run`; check the terminal for errors |
```

- [ ] **Step 2: Add a SEED row to the RAW files table**

Find the `## RAW files` table in `reference/troubleshooting.md`. Append this row to the bottom of the table:

```md
| RAW file fails to load on macOS / Linux | SEED reader hit an unsupported instrument firmware | Switch to a Windows machine and try the `dotnet` backend (`leaf targeted --backend dotnet …`); if it still fails, [report it](https://github.com/MorscherLab/LEAF/issues) |
```

- [ ] **Step 3: Add a `leaf serve` deprecated-alias entry to glossary.md**

Edit `reference/glossary.md`. Under `## L`, add a new entry alphabetically (after `**LOD**`):

```md
**`leaf serve`** *(deprecated)*
Older docs and forum posts referenced `leaf serve` as the launch command. The actual entry point is `leaf webui run` (foreground) or `leaf webui start` (daemon). See [`leaf webui`](/cli/serve).
```

- [ ] **Step 4: Add a SEED entry to glossary.md**

Under `## S`, add (before `**SEM**`):

```md
**SEED** (Spectral Extraction & Encoding Driver)
The Rust library LEAF uses to read Thermo `.raw` files on macOS and Linux. SEED is the `rust` backend in `leaf --backend`. It replaces the legacy `oxion` codename. See [SEED](/scripting/reader).
```

(`/scripting/reader` will be created in Phase 4. The link is intentionally pointing forward.)

- [ ] **Step 5: Confirm grep gate passes for both files**

```bash
grep -n 'leaf serve' reference/troubleshooting.md
```

Expected: no output.

```bash
grep -n 'leaf serve' reference/glossary.md
```

Expected: 2 occurrences (the deprecated-alias entry — these are the only allowed mentions and live in the gate's `--exclude=reference/glossary.md`).

- [ ] **Step 6: Build**

```bash
bun run build
```

Expected: dead-link error on `/scripting/reader`. Fix temporarily by replacing both `/scripting/reader` mentions with the upstream URL `https://github.com/MorscherLab/LEAF/tree/main/docs`. Phase 4 swaps them back. Re-run `bun run build` — should pass.

- [ ] **Step 7: Commit**

```bash
git add reference/troubleshooting.md reference/glossary.md
git commit -m "docs(reference): replace 'leaf serve' with 'leaf webui run'; add SEED + deprecated-alias entries"
```

---

### Task 1.9: Update Python overview to use real exports (B3)

**Files:**
- Modify: `python/overview.md`
- Modify: `python/quickstart.md`

The Python pages stay at `/python/` until Phase 5. Phase 1 just replaces the invented import surface with the real one verified against `packages/leaf/analyzer/__init__.py`.

- [ ] **Step 1: Replace the `## Import surface` section in `python/overview.md`**

Find the section starting `## Import surface` (currently lines 32–45). Replace its entire body with:

```md
## Public surface

The Python package re-exports four classes intended for scripted use:

```python
from leaf.analyzer import Samples, Analyzer, PeakPicking, QCReport
```

| Name | Role |
|------|------|
| `Samples` | Central data container — sparse intensity tensors plus per-sample metadata. The result of every extraction. |
| `Analyzer` | RAW file extraction — produces a `Samples` from a folder of `.raw` files plus a compound list. |
| `PeakPicking` | Peak detection on an existing `Samples`. |
| `QCReport` | Quality scoring on an existing `Samples`. |

::: info Public surface
The names above are stable as of LEAF 0.5; signatures and module paths may change before 1.0. The formal class reference (parameters, return types, methods) lives upstream in [LEAF's developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api). This manual covers usage patterns only — see [Quickstart](/python/quickstart) for runnable examples.
:::
```

- [ ] **Step 2: Replace `python/quickstart.md` body with real recipes**

Overwrite `python/quickstart.md` with:

```md
# Python Recipes

Short, runnable recipes for common scripted-analysis tasks. Each uses only the public exports from `leaf.analyzer` (see [Public surface](/python/overview#public-surface)).

::: warning Stability
Names and signatures may change before LEAF 1.0. Pin a specific version (`pip install leaf==0.5.x`) to keep scripts reproducible. The formal class reference lives in [LEAF's developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api).
:::

## Recipe 1 — Batch extraction from a folder

```python
from leaf.analyzer import Analyzer

# 1. Configure the analyzer for your method
analyzer = Analyzer(
    polarity="NEG",
    mass_tolerance_ppm=5,
    rt_window_min=0.5,
)

# 2. Run extraction. The returned `Samples` is the same object the
#    web UI builds — every downstream class consumes it.
samples = analyzer.run(
    raw_folder="./samples",
    compound_list="./compounds.csv",
)

# 3. Inspect the intensity matrix as a pandas DataFrame
print(samples.intensities.head())
```

The exact `Analyzer` constructor signature is documented [upstream](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api/analyzer.md). The recipe shows the call pattern; consult upstream for the full keyword set.

## Recipe 2 — Peak picking and quality scoring on existing samples

```python
from leaf.analyzer import Samples, PeakPicking, QCReport

samples = Samples.load("analysis.msd")          # reopen a prior run
PeakPicking(method="v4").run(samples)           # mutates samples in-place
report = QCReport(samples)                      # builds the verdict table
print(report.verdict_summary())                 # counts of good/warning/poor
```

`Samples.load` reads any `.msd` produced by the web UI. Saving works the same way: `samples.save("path.msd")`.

## Recipe 3 — Reusing parameters from a `.msd`

The full extraction parameters used during a run are stored inside the `.msd` archive (`parameters.json` within the bundle — see [Export](/workflow/export)). Recreating an `Analyzer` from a saved run keeps follow-up extractions byte-identical:

```python
import json, zipfile
from leaf.analyzer import Analyzer

with zipfile.ZipFile("analysis.msd") as zf:
    with zf.open("parameters.json") as f:
        params = json.load(f)

analyzer = Analyzer(**params["extraction"])
```

The exact `parameters.json` schema is upstream-documented; use this recipe as a pattern, not as a guarantee of key names.

## Recipe 4 — Tracing in a script

Tracing is a parameter on the `Analyzer`, not a separate object. The web UI's Tracing Editor exports a JSON config that the Python API accepts directly:

```python
import json
from leaf.analyzer import Analyzer

with open("tracing.json") as f:
    tracing = json.load(f)

analyzer = Analyzer(
    polarity="NEG",
    mass_tolerance_ppm=5,
    tracing=tracing,
)
samples = analyzer.run(raw_folder="./samples", compound_list="./compounds.csv")
```

See [Isotope tracing](/workflow/tracing) for the JSON schema.

## Untargeted analysis

Untargeted runs use a different entry point in the analyzer module; the public surface is still being stabilised. Until it lands here, drive untargeted runs from the CLI (`leaf untargeted --help`) and read back the resulting `.usd` archive — see [Untargeted analysis](/workflow/untargeted).

## Reproducibility

Every `.msd` and `.usd` carries the full parameter set used during extraction. Use Recipe 3 to round-trip parameters between the UI and a script — the same `Samples` is produced either way.

## Next

→ [LEAF developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs) — full class reference, plugin interfaces, internal modules
```

- [ ] **Step 3: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add python/overview.md python/quickstart.md
git commit -m "docs(python): replace invented API with real exports + runnable recipes"
```

---

### Task 1.10: Update root `CLAUDE.md` pointer

**Files:**
- Modify: `CLAUDE.md`

The CLAUDE.md description of `cli/` mentions `leaf serve` — update so the project instructions stay accurate.

- [ ] **Step 1: Replace the cli line**

Find:

```md
- `cli/` — `leaf` command-line interface (overview, `leaf serve`, configuration)
```

Replace with:

```md
- `cli/` — `leaf` command-line interface (overview, `leaf webui`, configuration). The four sub-apps (`targeted`, `untargeted`, `watch`, `webui`) live here.
```

- [ ] **Step 2: Confirm grep gate**

```bash
grep -n 'leaf serve' CLAUDE.md
```

Expected: no output.

- [ ] **Step 3: Run the full grep gate from the repo root**

```bash
grep -rEn 'leaf serve' --include='*.md' --exclude-dir=node_modules --exclude-dir=docs --exclude='reference/glossary.md' . || echo "GATE PASSED"
```

Expected: `GATE PASSED`. If hits remain, fix them in their respective files (re-open the corresponding Task above).

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md cli pointer to mention webui"
```

---

### Task 1.11: Phase 1 acceptance — full build + push

- [ ] **Step 1: Full build**

```bash
bun run build
```

Expected: success, no warnings about dead links.

- [ ] **Step 2: Run grep gate**

```bash
grep -rEn 'leaf serve' --include='*.md' --exclude-dir=node_modules --exclude-dir=docs --exclude='reference/glossary.md' . || echo "GATE PASSED"
```

Expected: `GATE PASSED`.

- [ ] **Step 3: Push to GitHub**

```bash
git push origin main
```

CI will run the gate and the VitePress build. Watch the run:

```bash
gh run watch || echo "(install gh or check Actions tab in browser)"
```

Phase 1 is acceptance-ready when the GitHub Action goes green.

---

## Phase 2 — SEED page + install-desktop note

A small phase. The SEED page is currently linked from `glossary.md` and `cli/configuration.md` via the temporary upstream URL. Creating the page lets us swap those links over.

### Task 2.1: Create `scripting/reader.md`

**Files:**
- Create: `scripting/reader.md`

The `/scripting/` directory does not yet exist. We create it with this file (and the next).

- [ ] **Step 1: Create the file**

```bash
mkdir -p scripting
```

Then create `scripting/reader.md` with:

```md
# SEED — Spectral Extraction & Encoding Driver

LEAF reads Thermo `.raw` files through **SEED**, a Rust library bundled inside the LEAF wheel. On macOS and Linux, SEED is the only available reader. On Windows, LEAF can also use Thermo's official .NET RawFileReader (the `dotnet` backend); SEED is still the default unless you opt in.

## Why SEED matters

| | SEED (`rust` backend) | Thermo .NET (`dotnet` backend) |
|---|---|---|
| Platforms | macOS, Linux, Windows | Windows only at runtime |
| .NET 8 SDK required | No | Yes |
| Default on macOS/Linux | Yes | (unavailable) |
| Source | Rust crate, [oxion-core](https://github.com/EstrellaXD/oxion-core) (the historical repo name) | Thermo Fisher Scientific |

You usually don't have to think about the backend — LEAF picks `rust` automatically on macOS/Linux. The choice only matters on Windows, where `--backend dotnet` is occasionally needed for files SEED cannot decode (rare, instrument-firmware-specific).

## Selecting the backend

From the CLI:

```bash
leaf targeted --backend rust ./samples ./compounds.csv     # force SEED
leaf targeted --backend dotnet ./samples ./compounds.csv   # force Thermo .NET (Windows only)
leaf targeted --backend auto ./samples ./compounds.csv     # default
```

From the web UI: **Settings → Advanced → Backend**.

## Brand note

SEED is the rebrand of the project formerly known as **oxion**. The repository name `EstrellaXD/oxion-core` is retained for legacy reasons; the brand and the public crate names (`seed`, `seed-cli`, `seed-py`) are SEED end-to-end.

## Reporting RAW files SEED cannot read

If a `.raw` file fails to load with the `rust` backend:

1. Confirm Thermo's Xcalibur can open the file.
2. On Windows, retry with `--backend dotnet`.
3. If neither works, [open a LEAF issue](https://github.com/MorscherLab/LEAF/issues) with the LEAF version, the instrument model, and the firmware version.
```

- [ ] **Step 2: Register the page in `.vitepress/config.ts`**

Open `.vitepress/config.ts`. The sidebar config does not yet have a `/scripting/` group. Add this entry to the `sidebar` object (alongside `/cli/`, `/python/`, etc.):

```ts
      '/scripting/': [
        {
          text: 'RAW reader',
          items: [
            { text: 'SEED (macOS / Linux)', link: '/scripting/reader' },
          ],
        },
      ],
```

(The full `/scripting/` sidebar lands in Phase 5; this stub keeps the page reachable now.)

- [ ] **Step 3: Update the install-desktop Requirements table**

Edit `get-started/install-desktop.md`. Find the Requirements table (lines 9–15). Replace the OS row:

```md
| **Operating system** | macOS (Apple Silicon), Linux (x86_64), or Windows (x64) |
```

with:

```md
| **Operating system** | macOS (Apple Silicon), Linux (x86_64), or Windows (x64). On macOS / Linux, RAW files are read via the bundled [SEED](/scripting/reader) Rust reader — no .NET required. |
```

Also update the Windows .NET tip directly below the table to cross-link SEED:

Find:

```md
::: tip Windows users
Windows additionally needs the **.NET 8.0 SDK** to read Thermo RAW files. [Download .NET 8.0](https://dotnet.microsoft.com/download/dotnet/8.0). macOS and Linux do not need .NET — LEAF uses a built-in Rust reader.
:::
```

Replace with:

```md
::: tip Windows users
Windows uses Thermo's .NET RawFileReader by default and additionally needs the **.NET 8.0 SDK** — [download .NET 8.0](https://dotnet.microsoft.com/download/dotnet/8.0). macOS / Linux ship with the [SEED](/scripting/reader) Rust reader and do not need .NET.
:::
```

- [ ] **Step 4: Replace the temporary upstream links from Phase 1**

Edit `cli/configuration.md`. Find:

```md
| `rust` | Bundled SEED reader (Rust); no .NET required | [SEED](https://github.com/MorscherLab/LEAF/tree/main/docs) |
```

Replace with:

```md
| `rust` | Bundled SEED reader (Rust); no .NET required | [SEED](/scripting/reader) |
```

Edit `reference/glossary.md`. Find both `https://github.com/MorscherLab/LEAF/tree/main/docs` placeholders that should be `/scripting/reader` and replace.

- [ ] **Step 5: Build**

```bash
bun run build
```

Expected: success, no dead links.

- [ ] **Step 6: Commit**

```bash
git add scripting/reader.md .vitepress/config.ts get-started/install-desktop.md cli/configuration.md reference/glossary.md
git commit -m "docs: add SEED page; cross-link from install + config + glossary"
```

---

## Phase 3 — Workflow split (mode-prefix per Q4-B)

The current `workflow/untargeted.md` mixes "what is untargeted mode," "extraction parameters," "feature inspection," and "export" on one page. We split into three pages: an Untargeted overview, an Extract page, and an Inspect-features page. The targeted spine pages keep their URLs and titles; we add the badge to tracing and the "Also from a script" callouts in Phase 6.

### Task 3.1: Create `workflow/extract-untargeted.md`

**Files:**
- Create: `workflow/extract-untargeted.md`

- [ ] **Step 1: Create the file**

Create `workflow/extract-untargeted.md` with the extraction-only material extracted from the current `workflow/untargeted.md`:

```md
# Extract — Untargeted

Untargeted mode performs feature detection on RAW files **without** requiring a predefined metabolite list. LEAF detects peaks across the full m/z and retention-time range, aligns features across samples, and produces a feature table for downstream filtering and identification.

> [Screenshot: Extract page in Untargeted mode showing the parameters sidebar]

## When to use it

| Untargeted is appropriate when... | Targeted is appropriate when... |
|-----------------------------------|---------------------------------|
| The compound composition of the sample is not known | A defined panel of compounds is to be quantified |
| The objective is discovery of unknown metabolites | The objective is monitoring of specific pathways |
| A survey-level comparison between groups is required | Quantitative comparisons of named compounds are required |

The two modes can be combined: untargeted analysis to identify candidate features, then [targeted](/workflow/extract) extraction once those features are characterized.

## Switch to untargeted mode

On the [Extract page](/workflow/extract), click the **Targeted / Untargeted** toggle at the top. The compound list editor disappears (you don't need a CSV) and the parameters sidebar swaps in untargeted-specific options.

## Parameters

| Parameter | Default | What it does |
|-----------|---------|--------------|
| **Polarity** | NEG | Match your method's polarity |
| **Mass Tolerance** | 5 ppm | Tighter than targeted — affects feature alignment |
| **Min intensity** | 1e5 | Drop features below this peak height |
| **Min samples** | 2 | Require a feature to appear in at least N samples to keep it |
| **RT range** | full run | Optionally restrict to a part of the run |

## Run the extraction

Click **Start Processing**. Progress shows in the same floating action button as targeted runs. Untargeted runs typically take 2–5× longer than targeted because every peak has to be detected, not just the ones in your list.

## Open the results

After completion, click **Open** in the jobs panel. The Untargeted view loads — see [Inspect features](/workflow/inspect-features).

## Next step

→ [Inspect features](/workflow/inspect-features)
```

- [ ] **Step 2: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add workflow/extract-untargeted.md
git commit -m "docs(workflow): add Extract — Untargeted page"
```

---

### Task 3.2: Create `workflow/inspect-features.md`

**Files:**
- Create: `workflow/inspect-features.md`

- [ ] **Step 1: Create the file**

Create `workflow/inspect-features.md` with the feature-table walkthrough extracted from the current `workflow/untargeted.md`:

```md
# Inspect Features

After an [untargeted extraction](/workflow/extract-untargeted) completes, the Untargeted view is the primary interface for feature triage — filtering the feature table, inspecting peak shapes, and tagging candidates for follow-up.

> [Screenshot: Untargeted view showing feature table and EIC chart]

## Layout

| Panel | What it shows |
|-------|---------------|
| **Feature table** | Every detected feature with m/z, RT, detection rate, intensity stats |
| **EIC chart** | Chromatogram for the selected feature across samples |
| **Alignment panel** | RT alignment quality across samples |
| **Gap-group panel** | Features that should align but don't — flagged for review |
| **Stats panel** | Per-feature group comparisons (fold change, p-value) |
| **Results panel** | Filter, sort, and tag features for export |

## Triage workflow

1. **Filter** the feature table by detection rate (e.g., retain only features present in >50% of samples)
2. **Sort** by intensity or by between-group fold-change to identify candidate features
3. **Inspect** the EIC chart to assess peak shape, signal-to-noise ratio, and reproducibility across samples
4. **Tag** candidate features with flags or notes
5. **Export** the tagged feature set as a CSV; the same CSV can be re-imported as a [targeted](/workflow/extract) compound list for subsequent quantification

## Identify features

LEAF doesn't identify features for you — it gives you m/z and RT. To get a name, search:

- A spectral library (e.g., HMDB, METLIN, MoNA)
- An MS2 spectrum from the same sample (LEAF supports MS2 matching against mzVault libraries — see the [LEAF developer docs](https://github.com/MorscherLab/LEAF/blob/main/docs/leaf/api/ms2.md))
- A pure standard run on the same instrument

When you have a name, add the feature to a targeted CSV for the next batch of samples.

## Next step

→ [Export](/workflow/export) — `.usd` and per-feature CSVs
```

- [ ] **Step 2: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add workflow/inspect-features.md
git commit -m "docs(workflow): add Inspect features page"
```

---

### Task 3.3: Rewrite `workflow/untargeted.md` as overview

**Files:**
- Modify: `workflow/untargeted.md`

- [ ] **Step 1: Replace the entire file body**

Overwrite `workflow/untargeted.md` with:

```md
# Untargeted Workflow

Untargeted analysis discovers features in your RAW files without a predefined compound list. Use it when the compound composition of the sample is unknown or when the goal is discovery rather than quantification.

The untargeted track has three steps:

1. → [Extract — Untargeted](/workflow/extract-untargeted) — set parameters and launch a feature-detection run
2. → [Inspect features](/workflow/inspect-features) — triage the feature table
3. → [Export](/workflow/export) — save `.usd` archives or per-feature CSVs

For background on when to choose untargeted over [targeted](/workflow/extract), see [Extract — Untargeted: When to use it](/workflow/extract-untargeted#when-to-use-it).
```

- [ ] **Step 2: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add workflow/untargeted.md
git commit -m "docs(workflow): rewrite untargeted.md as 1-screen overview"
```

---

### Task 3.4: Rebrand `workflow/extract.md` and tracing badge

**Files:**
- Modify: `workflow/extract.md`
- Modify: `.vitepress/config.ts`

- [ ] **Step 1: Update the title and lead paragraph in `workflow/extract.md`**

Find:

```md
# Extract

The **Extract** page is where you configure parameters and launch a processing run. This is the first step of every targeted analysis.
```

Replace with:

```md
# Extract — Targeted

The **Extract** page is where you configure parameters and launch a targeted processing run. For untargeted mode (no compound list), see [Extract — Untargeted](/workflow/extract-untargeted).

The page has a **Targeted / Untargeted** toggle at the top; this guide covers the Targeted side.
```

Also remove the bottom `## Untargeted instead?` section in the same file (it's now redundant with the link above) — find:

```md
## Untargeted instead?

The Extract page has a **Targeted / Untargeted** toggle at the top. Switch to Untargeted mode for feature discovery without a compound list. See [Untargeted analysis](/workflow/untargeted).
```

Delete that section (the `## Untargeted instead?` heading and its body).

- [ ] **Step 2: Update the workflow sidebar in `.vitepress/config.ts`**

Find the `'/workflow/'` sidebar block. Replace its `items` array with:

```ts
      '/workflow/': [
        {
          text: 'Workflow',
          items: [
            { text: 'Prepare your data', link: '/workflow/prepare-data' },
            { text: 'Extract — targeted', link: '/workflow/extract' },
            { text: 'Analyze', link: '/workflow/analyze' },
            { text: 'Visualize', link: '/workflow/visualize' },
            { text: 'Export', link: '/workflow/export' },
            { text: 'Isotope tracing (modifier)', link: '/workflow/tracing' },
            { text: 'Untargeted overview', link: '/workflow/untargeted' },
            { text: 'Extract — untargeted', link: '/workflow/extract-untargeted' },
            { text: 'Inspect features', link: '/workflow/inspect-features' },
          ],
        },
      ],
```

- [ ] **Step 3: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
git add workflow/extract.md .vitepress/config.ts
git commit -m "docs(workflow): rebrand Extract as targeted; sidebar shows mode-prefixed entries"
```

---

## Phase 4 — Build the `/scripting/` tree alongside `/cli/` and `/python/`

We add the new pages without touching the old paths. After Phase 4, both `/cli/serve` and `/scripting/cli/webui` resolve to identical content. Phase 5 then turns the old paths into stubs.

### Task 4.1: Create `scripting/index.md`

**Files:**
- Create: `scripting/index.md`

- [ ] **Step 1: Create the file**

```md
# Scripting

LEAF can be driven without the web UI in two ways:

| If you want to... | Use |
|---|---|
| Drive analyses from a terminal — schedule, batch, integrate with shell pipelines | The [`leaf` command-line interface](/scripting/cli/overview) |
| Embed LEAF in Python pipelines (Snakemake, Nextflow, custom scripts, notebooks) | The [`leaf` Python package](/scripting/python/overview) |

Both interfaces operate on the same file formats as the web UI: a `.msd` produced by the UI loads in a script, and vice versa.

## When to script vs use the UI

| Use the web UI when... | Script LEAF when... |
|---|---|
| Performing exploratory or interactive analysis | Running batch analyses on many datasets with shared parameters |
| Reviewing peak quality and adjusting integrations manually | Reproducing an analysis as part of a manuscript or pipeline |
| Producing visualizations for inspection | Integrating LEAF results with downstream Python tools (pandas, scikit-learn, etc.) |
| One-off or ad hoc work | Embedding LEAF in a multi-step workflow |

## Where to start

- [`leaf webui`](/scripting/cli/webui) — start the web UI from a terminal (most common)
- [`leaf targeted`](/scripting/cli/targeted) — targeted extraction headless
- [`leaf untargeted`](/scripting/cli/untargeted) — untargeted feature discovery headless
- [`leaf watch`](/scripting/cli/watch) — auto-extract new RAW files as they land in a folder
- [Python recipes](/scripting/python/recipes) — common scripted-analysis tasks
- [SEED](/scripting/reader) — the Rust reader powering LEAF on macOS / Linux
```

- [ ] **Step 2: Register the page in `.vitepress/config.ts`**

In the `sidebar` object, expand the `/scripting/` block to include an Overview entry:

```ts
      '/scripting/': [
        {
          text: 'Overview',
          items: [
            { text: 'When to use scripting', link: '/scripting/' },
          ],
        },
        {
          text: 'RAW reader',
          items: [
            { text: 'SEED (macOS / Linux)', link: '/scripting/reader' },
          ],
        },
      ],
```

(The CLI and Python sub-trees land in subsequent tasks.)

- [ ] **Step 3: Build & commit**

```bash
bun run build
git add scripting/index.md .vitepress/config.ts
git commit -m "docs(scripting): add overview page"
```

---

### Task 4.2: Create `scripting/cli/overview.md`

**Files:**
- Create: `scripting/cli/overview.md`

- [ ] **Step 1: Create the file**

```bash
mkdir -p scripting/cli
```

Then create `scripting/cli/overview.md` with the same content as the rewritten `cli/overview.md` (Task 1.6) — but with internal links pointing to `/scripting/cli/...` instead of `/cli/...`:

```md
# Command-Line Interface

The `leaf` command-line interface ships with the LEAF Python package. It has four sub-applications:

| Sub-command | Purpose | Reference |
|-------------|---------|-----------|
| `leaf webui` | Start / stop the local web application (`run`, `start`, `stop`, `status`) | [Detail](/scripting/cli/webui) |
| `leaf targeted` | Targeted metabolite extraction, peak picking, and quality scoring (no UI) | [Detail](/scripting/cli/targeted) |
| `leaf untargeted` | Untargeted MS1 feature discovery (no UI) | [Detail](/scripting/cli/untargeted) |
| `leaf watch` | Real-time folder monitoring; auto-extracts new RAW files (`run`, `start`, `stop`, `status`) | [Detail](/scripting/cli/watch) |

For programmatic use without a CLI, see the [Python package documentation](/scripting/python/overview).

## Verifying the installation

```bash
leaf --version
```

Expected output:

```
leaf 0.5.0
```

If the command is not found, the install location is not on `PATH`. Resolutions are listed in [Install on desktop — Troubleshooting](/get-started/install-desktop#troubleshooting).

## Legacy aliases

Two console-script shims preserve compatibility with existing scripts:

| Shim | Equivalent to |
|------|---------------|
| `leaf-watch` | `leaf watch run` |
| `leaf-untarget` | `leaf untargeted` |

The CLI also accepts hidden aliases `leaf analyze` and `leaf untarget` as deprecated forms of `leaf targeted` and `leaf untargeted`.

## Configuration

Persistent settings (storage paths, default backend, worker counts) are configured through the **Settings** dialog in the web UI. Configuration on disk is described in [Configuration](/scripting/cli/configuration).

## Next

→ [`leaf webui`](/scripting/cli/webui) — start the web application
→ [Configuration](/scripting/cli/configuration) — config files and environment variables
```

- [ ] **Step 2: Register in sidebar**

In `.vitepress/config.ts`, expand the `/scripting/` block to add a Command-line group between Overview and RAW reader:

```ts
        {
          text: 'Command line',
          items: [
            { text: 'Overview', link: '/scripting/cli/overview' },
            { text: 'leaf webui', link: '/scripting/cli/webui' },
            { text: 'leaf targeted', link: '/scripting/cli/targeted' },
            { text: 'leaf untargeted', link: '/scripting/cli/untargeted' },
            { text: 'leaf watch', link: '/scripting/cli/watch' },
            { text: 'Configuration', link: '/scripting/cli/configuration' },
          ],
        },
```

(All five children are stubs until subsequent tasks land. To keep the build green during incremental landing, comment out the four child entries that don't yet exist and uncomment them as their tasks complete. Or land all six tasks before pushing.)

- [ ] **Step 3: Build, commit**

```bash
bun run build
git add scripting/cli/overview.md .vitepress/config.ts
git commit -m "docs(scripting/cli): add overview"
```

---

### Task 4.3: Create `scripting/cli/webui.md`

**Files:**
- Create: `scripting/cli/webui.md`

- [ ] **Step 1: Create the file**

Copy the content from `cli/serve.md` (rewritten in Task 1.5) but update internal links from `/cli/...` to `/scripting/cli/...`:

```md
# `leaf webui`

Starts the LEAF backend server and serves the web interface on the local machine. This is the primary entry point for desktop installations.

## Synopsis

```bash
leaf webui run    [--host HOST] [--port PORT]   # foreground
leaf webui start  [--host HOST] [--port PORT]   # detached daemon
leaf webui stop                                  # terminate the daemon
leaf webui status                                # show daemon state
```

## Default behavior — `leaf webui run`

```bash
leaf webui run
```

On startup, the server:

1. Binds to the loopback interface `127.0.0.1` (not `0.0.0.0`); the application is therefore reachable only from the local machine.
2. Listens on TCP port **18008** by default.
3. Runs in the foreground until interrupted (`Ctrl+C`).

Expected output (uvicorn banner):

```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:18008 (Press CTRL+C to quit)
```

## Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--host`, `-H` | `127.0.0.1` | Bind address. Use `0.0.0.0` to expose on the local network — see warning below. |
| `--port`, `-p` | `18008` | TCP port. Use a different value if 18008 is taken. |

::: warning Network exposure
`--host 0.0.0.0` exposes LEAF to anyone on the same network and provides no authentication. Use only on trusted networks. For multi-user deployments, use the hosted MINT path instead — see [Use the hosted version](/get-started/install-hosted).
:::

## Daemon mode

`leaf webui start` runs the server in the background. The PID is recorded so `leaf webui stop` can terminate it cleanly:

```bash
leaf webui start --port 18009
leaf webui status
leaf webui stop
```

## Common scenarios

### Port already in use

```bash
leaf webui run --port 18009
```

Then open `http://127.0.0.1:18009` in the browser.

### Confirming the server is running

```bash
curl -I http://127.0.0.1:18008
```

A `200 OK` or `302 Found` response indicates the server is reachable.

## Lifecycle

| Action | Effect |
|--------|--------|
| `Ctrl+C` (foreground `run`) | Stops the server. |
| Close the browser tab | No effect; server keeps running. |
| Close the terminal window | Terminates `leaf webui run` (SIGHUP). The daemon (`leaf webui start`) survives. |
| `leaf webui stop` | Terminates the daemon. |

## Next

→ [Configuration](/scripting/cli/configuration) — storage paths, backend selection
```

- [ ] **Step 2: Build, commit**

```bash
bun run build
git add scripting/cli/webui.md
git commit -m "docs(scripting/cli): add leaf webui page"
```

---

### Task 4.4: Create `scripting/cli/targeted.md`

**Files:**
- Create: `scripting/cli/targeted.md`

The flag set comes from `packages/leaf/analyzer/cli/commands/_targeted.py` — curated to the ~12 most common per the B-track decision.

- [ ] **Step 1: Create the file**

```md
# `leaf targeted`

Headless targeted extraction — the same pipeline the [Extract](/workflow/extract) page drives in the web UI, but without a browser. Produces a `.msd` archive.

## Synopsis

```bash
leaf targeted RAW_FOLDER COMPOUND_LIST [OPTIONS]
```

## Required arguments

| Argument | Description |
|---|---|
| `RAW_FOLDER` | Folder containing the `.raw` files to process |
| `COMPOUND_LIST` | Path to the metabolite CSV (see [Prepare your data](/workflow/prepare-data) for the schema) |

## Common flags

| Flag | Default | Description |
|---|---|---|
| `--polarity {NEG,POS}` | `NEG` | MS polarity for mass calculation. Must match your acquisition. |
| `--tolerance INT` | `5` | m/z tolerance in ppm for EIC extraction. |
| `--rt-window FLOAT` | `0.5` | Retention-time search window in minutes. |
| `--method {v1,v2,v4}` | `v4` | Peak detection method. v4 is the recommended default; see [Extract — Targeted: Peak picking](/workflow/extract#peak-picking). |
| `--backend {auto,rust,dotnet}` | `auto` | RAW reader. `rust` uses [SEED](/scripting/reader); `dotnet` uses Thermo's RawFileReader (Windows only). |
| `--max-workers INT` | `4` | Parallel extraction threads. |
| `--skip-blank / --no-skip-blank` | on | Skip files whose name contains "blank". |
| `--organize-name / --no-organize-name` | on | Auto-parse clean sample names from file names. |
| `--tracing-path PATH` | (none) | Path to a JSON tracing config (export from the web UI's Tracing Editor). See [Isotope tracing](/workflow/tracing). |
| `-o, --output PATH` | `./analysis.msd` | Where to write the `.msd` archive. |

For the full flag set, run `leaf targeted --help`.

## Recipe — minimal targeted run

```bash
leaf targeted ./samples ./compounds.csv --polarity NEG --tolerance 5
```

Outputs `./analysis.msd` in the current directory. Open it in the web UI by drag-and-drop, or load it from a Python script — see [Recipe 2](/scripting/python/recipes#recipe-2-peak-picking-and-quality-scoring-on-existing-samples).

## Recipe — tracing run

```bash
leaf targeted ./samples ./compounds.csv \
  --polarity NEG --tolerance 5 \
  --tracing-path ./tracing-13C.json \
  -o ./tracing-run.msd
```

The tracing JSON is produced by the web UI's Tracing Editor (Export button) or hand-written — see [Isotope tracing](/workflow/tracing).

## Recipe — overriding the backend

```bash
# Force the Thermo .NET reader on Windows when SEED can't decode a file:
leaf targeted ./samples ./compounds.csv --backend dotnet
```

## Hidden alias

`leaf analyze` is a hidden alias for `leaf targeted`. New scripts should use the canonical name.

## Next

→ [`leaf untargeted`](/scripting/cli/untargeted) — untargeted feature discovery
→ [Configuration](/scripting/cli/configuration) — backend selection on disk
```

- [ ] **Step 2: Build, commit**

```bash
bun run build
git add scripting/cli/targeted.md
git commit -m "docs(scripting/cli): add leaf targeted page"
```

---

### Task 4.5: Create `scripting/cli/untargeted.md`

**Files:**
- Create: `scripting/cli/untargeted.md`

- [ ] **Step 1: Create the file**

```md
# `leaf untargeted`

Headless untargeted feature discovery — the same pipeline the [Extract — Untargeted](/workflow/extract-untargeted) page drives in the web UI. Produces a `.usd` archive.

## Synopsis

```bash
leaf untargeted RAW_FOLDER [OPTIONS]
```

## Required arguments

| Argument | Description |
|---|---|
| `RAW_FOLDER` | Folder containing the `.raw` files to process |

No compound list is needed; the run discovers features automatically.

## Common flags

| Flag | Default | Description |
|---|---|---|
| `--polarity {NEG,POS}` | `NEG` | MS polarity. |
| `--tolerance INT` | `5` | m/z tolerance in ppm for feature alignment. |
| `--min-intensity FLOAT` | `1e5` | Drop features below this peak height. |
| `--min-samples INT` | `2` | Minimum samples a feature must appear in. |
| `--rt-min FLOAT` | (full range) | Lower bound of the retention-time window. |
| `--rt-max FLOAT` | (full range) | Upper bound of the retention-time window. |
| `--backend {auto,rust,dotnet}` | `auto` | RAW reader. See [SEED](/scripting/reader). |
| `--max-workers INT` | `4` | Parallel extraction threads. |
| `-o, --output PATH` | `./untargeted.usd` | Where to write the `.usd` archive. |

For the full flag set, run `leaf untargeted --help`.

## Recipe — minimal untargeted run

```bash
leaf untargeted ./samples --polarity NEG --min-samples 5
```

Outputs `./untargeted.usd`. Open in the web UI by drag-and-drop to triage in the [Inspect features](/workflow/inspect-features) view.

## Recipe — restricted RT range

For methods with a long re-equilibration window, restrict the analysis range:

```bash
leaf untargeted ./samples \
  --rt-min 0.5 --rt-max 12.0 \
  --min-samples 5 \
  -o ./features-0.5-12min.usd
```

## Hidden alias

`leaf untarget` is a hidden alias retained for older scripts. The console-script shim `leaf-untarget` invokes the same command.

## Next

→ [Inspect features](/workflow/inspect-features) — what to do with the resulting `.usd`
```

- [ ] **Step 2: Build, commit**

```bash
bun run build
git add scripting/cli/untargeted.md
git commit -m "docs(scripting/cli): add leaf untargeted page"
```

---

### Task 4.6: Create `scripting/cli/watch.md`

**Files:**
- Create: `scripting/cli/watch.md`

- [ ] **Step 1: Create the file**

```md
# `leaf watch`

Real-time folder monitoring — automatically runs targeted extraction on each new `.raw` file as it lands in a folder. Useful for instrument acquisition computers where samples are being saved continuously.

## Synopsis

```bash
leaf watch run    FOLDER [OPTIONS]   # foreground
leaf watch start  FOLDER [OPTIONS]   # detached daemon
leaf watch stop                       # terminate the daemon
leaf watch status                     # show daemon state
```

## Required argument

| Argument | Description |
|---|---|
| `FOLDER` | Folder to monitor for new `.raw` files |

## Common flags

| Flag | Default | Description |
|---|---|---|
| `-l, --list PATH` | (required) | Compound list CSV — same schema as [`leaf targeted`](/scripting/cli/targeted). |
| `-o, --output PATH` | (sibling of FOLDER) | Where to write per-file `.msd` archives. |
| `--polarity {NEG,POS}` | `NEG` | MS polarity. |
| `--tolerance INT` | `5` | m/z tolerance in ppm. |
| `--method {v1,v2,v4}` | `v4` | Peak detection method. |
| `--rt-window FLOAT` | `0.5` | Retention-time search window. |
| `--idle-timeout FLOAT` | (none) | Stop watching after N seconds with no new files. |
| `--poll-interval FLOAT` | (default) | Seconds between filesystem polls. |
| `--stability-time FLOAT` | (default) | Wait N seconds after a file stops growing before processing (avoids partial reads). |
| `--multi / --no-multi` | off | Watch multiple sub-folders concurrently. |

For the full flag set, run `leaf watch run --help`.

## Recipe — foreground watch

```bash
leaf watch run /path/to/inbox -l ./compounds.csv -o /path/to/outputs
```

Stops with `Ctrl+C`.

## Recipe — daemon

```bash
leaf watch start /path/to/inbox -l ./compounds.csv -o /path/to/outputs
leaf watch status
leaf watch stop
```

The daemon survives terminal close. Use `leaf watch status` to verify it is running and to see the last-processed file.

## Legacy shim

`leaf-watch` is a console-script shim equivalent to `leaf watch run`.

## Next

→ [`leaf targeted`](/scripting/cli/targeted) — same extraction pipeline, one-shot
```

- [ ] **Step 2: Build, commit**

```bash
bun run build
git add scripting/cli/watch.md
git commit -m "docs(scripting/cli): add leaf watch page"
```

---

### Task 4.7: Create `scripting/cli/configuration.md`

**Files:**
- Create: `scripting/cli/configuration.md`

- [ ] **Step 1: Create the file**

Copy `cli/configuration.md` (already corrected in Phase 1) to `scripting/cli/configuration.md` and update internal links:

```md
# Configuration

LEAF reads configuration from three sources, in increasing order of precedence:

1. **Built-in defaults** — used when no other source overrides them.
2. **On-disk configuration** — written by the **Settings** dialog in the web UI.
3. **Command-line flags** — passed to `leaf webui` (see [`leaf webui`](/scripting/cli/webui)) or to `leaf targeted` / `leaf untargeted`.

For most users, the Settings dialog is the only configuration interface required.

## Settings dialog

Open the gear icon in the top action bar of the web UI. Three tabs are available:

| Tab | Setting | Description |
|-----|---------|-------------|
| **Storage** | Storage path | Filesystem location where LEAF writes intermediate files, jobs, and result archives. |
| **Display** | Theme | Light or dark colour scheme for the UI. |
| **Display** | Chart defaults | Default colormaps and normalization choices applied to new visualizations. |
| **Advanced** | Backend | `auto`, `rust` (SEED), or `dotnet` (Windows). |
| **Advanced** | Worker count | Number of parallel workers used during extraction. Default scales with available CPU cores. |

> [Screenshot: Settings → Advanced tab showing backend selector and worker count]

Changes to **Storage** and **Advanced** settings apply to subsequent jobs. Running jobs are not affected.

## On-disk configuration

::: info
The on-disk format and location of LEAF's configuration file are implementation details and are not part of the stable user-facing API. Edit configuration through the Settings dialog rather than directly on disk. For administrative deployment scenarios, refer to the [LEAF repository documentation](https://github.com/MorscherLab/LEAF/tree/main/docs).
:::

## Storage path

The configured storage path holds:

| Subdirectory | Contents |
|--------------|----------|
| `jobs/` | Per-job directories with intermediate state and logs |
| `archives/` | Saved `.msd` and `.usd` archives produced by the export dialog |
| `cache/` | Cached parsing results for previously seen RAW files |

Removing the cache directory is safe; it will be regenerated on the next extraction at the cost of one re-parse per RAW file.

## Backend selection

LEAF reads RAW files through one of three backends. Selection is per-run via the `--backend` flag on `leaf targeted` / `leaf untargeted`, or per-installation via the **Settings → Advanced** dialog in the web UI.

| Backend | When used | Source |
|---------|-----------|--------|
| `auto` (default) | Picks the best backend for the current platform: `dotnet` on Windows, `rust` (SEED) elsewhere | — |
| `rust` | Bundled SEED reader (Rust); no .NET required | [SEED](/scripting/reader) |
| `dotnet` | Thermo .NET RawFileReader; requires .NET 8.0 SDK on Windows | Thermo Fisher |

Switching backends does not modify saved results.

## Next

→ [Python package overview](/scripting/python/overview) — using LEAF programmatically
```

- [ ] **Step 2: Build, commit**

```bash
bun run build
git add scripting/cli/configuration.md
git commit -m "docs(scripting/cli): add configuration page"
```

---

### Task 4.8: Create `scripting/python/overview.md`

**Files:**
- Create: `scripting/python/overview.md`

- [ ] **Step 1: Create the file**

```bash
mkdir -p scripting/python
```

Then create `scripting/python/overview.md` mirroring `python/overview.md` (already rewritten in Task 1.9), with internal links pointing into `/scripting/`:

```md
# Python Package Overview

LEAF can be used as a Python package for scripted analyses, batch processing pipelines, and integration into existing computational workflows.

## When to use the package vs the UI

| Use the web UI when... | Use the Python package when... |
|------------------------|--------------------------------|
| Performing exploratory or interactive analysis | Running batch analyses on many datasets with shared parameters |
| Reviewing peak quality and adjusting integrations manually | Reproducing an analysis as part of a manuscript or pipeline |
| Producing visualizations for inspection | Integrating LEAF results with downstream Python tools (pandas, scikit-learn, etc.) |
| One-off or ad hoc work | Embedding LEAF in a multi-step workflow (Snakemake, Nextflow, custom scripts) |

The two interfaces operate on the same underlying file formats: a `.msd` produced by the UI can be loaded by the Python package, and vice versa.

## Installation

The Python package is installed by the same wheel that provides the `leaf` command-line tool. See [Install on desktop](/get-started/install-desktop) for installation instructions.

To verify the package is importable:

```python
import leaf
print(leaf.__version__)
```

## Public surface

The Python package re-exports four classes intended for scripted use:

```python
from leaf.analyzer import Samples, Analyzer, PeakPicking, QCReport
```

| Name | Role |
|------|------|
| `Samples` | Central data container — sparse intensity tensors plus per-sample metadata. The result of every extraction. |
| `Analyzer` | RAW file extraction — produces a `Samples` from a folder of `.raw` files plus a compound list. |
| `PeakPicking` | Peak detection on an existing `Samples`. |
| `QCReport` | Quality scoring on an existing `Samples`. |

::: info Public surface
The names above are stable as of LEAF 0.5; signatures and module paths may change before 1.0. The formal class reference (parameters, return types, methods) lives upstream in [LEAF's developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api). This manual covers usage patterns only — see [Recipes](/scripting/python/recipes) for runnable examples.
:::

## Next

→ [Recipes](/scripting/python/recipes) — common scripted-analysis tasks
```

- [ ] **Step 2: Register sidebar**

In `.vitepress/config.ts`, add a Python group to the `/scripting/` sidebar:

```ts
        {
          text: 'Python package',
          items: [
            { text: 'Overview & install', link: '/scripting/python/overview' },
            { text: 'Recipes', link: '/scripting/python/recipes' },
          ],
        },
```

- [ ] **Step 3: Build, commit**

```bash
bun run build
git add scripting/python/overview.md .vitepress/config.ts
git commit -m "docs(scripting/python): add overview"
```

---

### Task 4.9: Create `scripting/python/recipes.md`

**Files:**
- Create: `scripting/python/recipes.md`

Same content as the rewritten `python/quickstart.md` (Task 1.9), with internal links updated:

- [ ] **Step 1: Create the file**

Use the body from Task 1.9 Step 2 verbatim, with these link rewrites:

- `/python/overview#public-surface` → `/scripting/python/overview#public-surface`
- `/scripting/python/recipes#recipe-2-peak-picking-and-quality-scoring-on-existing-samples` (if present) — leave; the anchor is still inside this same file

- [ ] **Step 2: Build, commit**

```bash
bun run build
git add scripting/python/recipes.md
git commit -m "docs(scripting/python): add recipes"
```

---

## Phase 5 — Switch over: nav, redirect stubs, "Also from a script" callouts

Now `/scripting/` is fully populated. We rewire the top nav, replace the old `/cli/` and `/python/` pages with redirect stubs, and add the "Also from a script" callouts to the workflow pages.

### Task 5.1: Replace `cli/overview.md` with a redirect stub

**Files:**
- Modify: `cli/overview.md`

- [ ] **Step 1: Overwrite with a redirect stub**

```md
---
title: "Moved → Scripting / CLI / Overview"
---

# This page moved

→ [Scripting / Command line / Overview](/scripting/cli/overview)

The previous `/cli/` section has been folded into the Scripting pillar. Old bookmarks still resolve, but newer browsers will be redirected automatically.

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

onMounted(() => {
  useRouter().go('/scripting/cli/overview')
})
</script>
```

- [ ] **Step 2: Build (verify Vue compiles)**

```bash
bun run build
```

Expected: success. If the build complains about `vitepress` import, fall back to a no-JS variant — replace the entire body with just the `# This page moved` heading and the link, no `<script>`.

- [ ] **Step 3: Commit**

```bash
git add cli/overview.md
git commit -m "docs: convert cli/overview to redirect stub"
```

---

### Task 5.2: Replace remaining old paths with redirect stubs

**Files:**
- Modify: `cli/serve.md`
- Modify: `cli/configuration.md`
- Modify: `python/overview.md`
- Modify: `python/quickstart.md`

- [ ] **Step 1: Apply the same redirect-stub pattern to each file**

For `cli/serve.md`:

```md
---
title: "Moved → Scripting / CLI / leaf webui"
---

# This page moved

→ [Scripting / Command line / `leaf webui`](/scripting/cli/webui)

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
onMounted(() => { useRouter().go('/scripting/cli/webui') })
</script>
```

For `cli/configuration.md`:

```md
---
title: "Moved → Scripting / CLI / Configuration"
---

# This page moved

→ [Scripting / Command line / Configuration](/scripting/cli/configuration)

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
onMounted(() => { useRouter().go('/scripting/cli/configuration') })
</script>
```

For `python/overview.md`:

```md
---
title: "Moved → Scripting / Python / Overview"
---

# This page moved

→ [Scripting / Python package / Overview](/scripting/python/overview)

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
onMounted(() => { useRouter().go('/scripting/python/overview') })
</script>
```

For `python/quickstart.md`:

```md
---
title: "Moved → Scripting / Python / Recipes"
---

# This page moved

→ [Scripting / Python package / Recipes](/scripting/python/recipes)

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'
onMounted(() => { useRouter().go('/scripting/python/recipes') })
</script>
```

- [ ] **Step 2: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add cli/serve.md cli/configuration.md python/overview.md python/quickstart.md
git commit -m "docs: convert cli/* and python/* to redirect stubs"
```

---

### Task 5.3: Update top-nav and remove old sidebar groups

**Files:**
- Modify: `.vitepress/config.ts`

- [ ] **Step 1: Replace the `nav` array**

Find the current `nav: [...]` block. Replace with:

```ts
    nav: [
      { text: 'Get Started', link: '/get-started/install-desktop' },
      { text: 'Workflow', link: '/workflow/prepare-data' },
      { text: 'Scripting', link: '/scripting/' },
      { text: 'Reference', link: '/reference/ui-tour' },
      { text: 'Open MINT', link: 'https://mint.morscherlab.org' },
    ],
```

`Team` and `Changelog` move into the Reference sidebar.

- [ ] **Step 2: Update Reference sidebar to include Team + Changelog**

Find the `'/reference/'` sidebar block. Replace with:

```ts
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'UI tour', link: '/reference/ui-tour' },
            { text: 'Troubleshooting', link: '/reference/troubleshooting' },
            { text: 'FAQ', link: '/reference/faq' },
            { text: 'Glossary', link: '/reference/glossary' },
            { text: 'Team', link: '/team' },
            { text: 'Changelog', link: '/changelog' },
          ],
        },
      ],
```

- [ ] **Step 3: Remove `/cli/` and `/python/` sidebar groups**

Delete the `'/cli/': [...]` and `'/python/': [...]` blocks from the `sidebar` object entirely. Old paths now load with no sidebar (only the redirect stub body).

- [ ] **Step 4: Build**

```bash
bun run build
```

Expected: success. Verify the redirect stubs render the link before redirecting (open `http://127.0.0.1:17173/cli/serve` after `bun run dev`).

- [ ] **Step 5: Commit**

```bash
git add .vitepress/config.ts
git commit -m "docs(config): switch nav to two-pillar; drop cli/python sidebars"
```

---

### Task 5.4: Add "Also from a script" callouts to workflow pages

**Files:**
- Modify: `workflow/prepare-data.md`
- Modify: `workflow/extract.md`
- Modify: `workflow/extract-untargeted.md`
- Modify: `workflow/analyze.md`
- Modify: `workflow/visualize.md`
- Modify: `workflow/export.md`
- Modify: `workflow/tracing.md`
- Modify: `workflow/inspect-features.md`

The callout shape is fixed (per spec): a collapsed `::: details` block before the final "Next step" link.

- [ ] **Step 1: Append callout to `workflow/prepare-data.md`**

Insert before the final `## Next step` heading:

```md
::: details Also from a script
The compound CSV is identical for the CLI and Python paths — no separate format. Pass it as the second positional argument to `leaf targeted`:

\`\`\`bash
leaf targeted ./samples ./compounds.csv
\`\`\`

→ [`leaf targeted` reference](/scripting/cli/targeted)
:::

```

(Note: backticks in the callout's code block need escaping in the plan; in the actual markdown, use real backticks.)

- [ ] **Step 2: Append callout to `workflow/extract.md`**

```md
::: details Also from a script
Headless equivalent of this page:

\`\`\`bash
leaf targeted ./samples ./compounds.csv \
  --polarity NEG --tolerance 5 --rt-window 0.5 --method v4
\`\`\`

→ [`leaf targeted` reference](/scripting/cli/targeted)
Or in Python: [Recipe 1 — Batch extraction](/scripting/python/recipes#recipe-1-batch-extraction-from-a-folder)
:::
```

- [ ] **Step 3: Append callout to `workflow/extract-untargeted.md`**

```md
::: details Also from a script
Headless equivalent of this page:

\`\`\`bash
leaf untargeted ./samples \
  --polarity NEG --tolerance 5 --min-samples 2
\`\`\`

→ [`leaf untargeted` reference](/scripting/cli/untargeted)
:::
```

- [ ] **Step 4: Append callout to `workflow/analyze.md`**

```md
::: details Also from a script
Re-running peak picking on an existing `.msd` from Python:

\`\`\`python
from leaf.analyzer import Samples, PeakPicking
samples = Samples.load("analysis.msd")
PeakPicking(method="v4").run(samples)
samples.save("analysis.msd")
\`\`\`

→ [Python recipes](/scripting/python/recipes)
:::
```

- [ ] **Step 5: Append callout to `workflow/visualize.md`**

```md
::: details Also from a script
The visualizations on this page are UI-only — generated by Plotly in the browser from the data in a `.msd`. To produce the same charts headlessly, load the `.msd` from Python and use the matching matplotlib / plotly pattern:

\`\`\`python
from leaf.analyzer import Samples
samples = Samples.load("analysis.msd")
df = samples.intensities          # pandas DataFrame for downstream plotting
\`\`\`

→ [Python recipes](/scripting/python/recipes)
:::
```

- [ ] **Step 6: Append callout to `workflow/export.md`**

```md
::: details Also from a script
Saving and reopening a `.msd` from Python:

\`\`\`python
from leaf.analyzer import Samples
samples = Samples.load("analysis.msd")
# inspect / mutate ...
samples.save("analysis-revised.msd")
\`\`\`

→ [Python recipes](/scripting/python/recipes)
:::
```

- [ ] **Step 7: Append callout to `workflow/tracing.md`**

```md
::: details Also from a script
The Tracing Editor exports a JSON config that the CLI accepts directly:

\`\`\`bash
leaf targeted ./samples ./compounds.csv \
  --polarity NEG --tracing-path ./tracing-13C.json
\`\`\`

→ [`leaf targeted` reference](/scripting/cli/targeted)
Or in Python: [Recipe 4 — Tracing in a script](/scripting/python/recipes#recipe-4-tracing-in-a-script)
:::
```

- [ ] **Step 8: Append callout to `workflow/inspect-features.md`**

```md
::: details Also from a script
Untargeted feature inspection is best driven from the UI; the headless equivalent is to write the `.usd` and triage the resulting feature table directly:

\`\`\`python
from leaf.analyzer import Samples
samples = Samples.load("untargeted.usd")
features = samples.features        # pandas DataFrame: m/z, RT, intensity stats
filtered = features[features.detection_rate > 0.5]
\`\`\`

→ [`leaf untargeted` reference](/scripting/cli/untargeted)
:::
```

- [ ] **Step 9: Build**

```bash
bun run build
```

Expected: success.

- [ ] **Step 10: Commit**

```bash
git add workflow/*.md
git commit -m "docs(workflow): add 'Also from a script' callouts to every spine page"
```

---

### Task 5.5: Cross-link the redirected pages from the FAQ

**Files:**
- Modify: `reference/faq.md`

Now that the canonical scripting paths exist, the FAQ should link to them instead of mentioning the rebranded paths in passing.

- [ ] **Step 1: Verify the FAQ links**

```bash
grep -nE '/cli/|/python/' reference/faq.md
```

Expected: 0 hits if the FAQ doesn't reference scripting paths. If hits exist, update each `/cli/...` to `/scripting/cli/...` and `/python/...` to `/scripting/python/...`.

- [ ] **Step 2: Build, commit if changes were needed**

```bash
bun run build
git diff reference/faq.md
```

If diff non-empty:

```bash
git add reference/faq.md
git commit -m "docs(faq): repoint scripting links to /scripting/"
```

---

## Phase 6 — Phase 5 acceptance + final cleanup

### Task 6.1: Update CLAUDE.md to reflect the new structure

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the `## Architecture` section**

Find the bullet list of content directories (currently lines 28–32). Replace with:

```md
- `get-started/` — install paths and the 5-minute quickstart
- `workflow/` — the metabolomics pipeline pages (Targeted spine: prepare → extract → analyze → visualize → export, plus Tracing modifier; Untargeted spine: extract-untargeted → inspect-features → export)
- `scripting/` — CLI reference (`leaf webui`, `leaf targeted`, `leaf untargeted`, `leaf watch`, configuration), Python recipes, SEED reader note. Replaces the legacy `cli/` and `python/` directories, which now host redirect stubs.
- `reference/` — UI tour, troubleshooting, FAQ, glossary, team, changelog
```

- [ ] **Step 2: Update the Python TODO note**

Find:

```md
The `python/` pages contain explicit `<!-- TODO -->` placeholder code blocks for API signatures the maintainers haven't ratified yet — leave them as TODOs rather than inventing import paths or function names. The authoritative Python API reference lives in the LEAF repo.
```

Replace with:

```md
The `scripting/python/` pages document the curated public surface (`Samples`, `Analyzer`, `PeakPicking`, `QCReport` from `leaf.analyzer`) and stop at the boundary where a public function genuinely doesn't exist yet. When that boundary is hit, link to the upstream developer docs at `https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api` rather than inventing an API. The authoritative class reference lives in the LEAF repo.
```

- [ ] **Step 3: Update the cli structure pointer**

Find the `cli/` line previously updated in Task 1.10. Replace with:

```md
- `scripting/cli/` — `leaf` command-line interface. The four sub-apps (`targeted`, `untargeted`, `watch`, `webui`) each have a page; the `cli/` folder holds redirect stubs only.
```

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to reflect two-pillar structure"
```

---

### Task 6.2: Final build + grep gate + push

- [ ] **Step 1: Full build**

```bash
bun run build
```

Expected: success, zero warnings.

- [ ] **Step 2: Grep gate**

```bash
grep -rEn 'leaf serve' --include='*.md' --exclude-dir=node_modules --exclude-dir=docs --exclude='reference/glossary.md' . || echo "GATE PASSED"
```

Expected: `GATE PASSED`.

- [ ] **Step 3: Visual smoke test**

```bash
bun run dev
```

Open http://localhost:17173/ and visit:

- `/` (home)
- `/get-started/install-desktop` — verify "Launch" section shows `leaf webui run`
- `/workflow/extract` — verify the "Also from a script" callout appears at the bottom
- `/workflow/extract-untargeted` — new page renders
- `/workflow/inspect-features` — new page renders
- `/scripting/` — overview page renders
- `/scripting/cli/webui` — renders, all four subcommands documented
- `/scripting/python/recipes` — renders with real `from leaf.analyzer import …`
- `/scripting/reader` — SEED page renders
- `/cli/serve` — should redirect to `/scripting/cli/webui` (or show the link if JS off)
- `/reference/glossary` — SEED entry visible under S; deprecated `leaf serve` entry under L

Stop the dev server with `Ctrl+C`.

- [ ] **Step 4: Push**

```bash
git push origin main
```

- [ ] **Step 5: Watch CI**

```bash
gh run watch || echo "(check Actions tab in browser)"
```

CI must show:
- `bun install --frozen-lockfile` → green
- "Check for retired `leaf serve` references" → green
- `bun run build` → green
- Pages deploy → green

If anything red, fix the root cause and re-push. Do not bypass the grep gate.

---

## Self-Review Checklist (post-write)

**Spec coverage:** Every accuracy fix in the spec table maps to a Task 1.x. Every "NEW" file in the spec move plan maps to a Task in Phase 2 / 3 / 4. Every redirect stub in the spec maps to Task 5.1 / 5.2. The "Also from a script" convention is implemented in Task 5.4. The grep gate is implemented in Task 1.1. The CLAUDE.md update is in Task 6.1.

**Placeholder scan:** No "TBD" / "TODO" / "implement later" in any task. Every code block contains real, runnable content. Every command shows expected output where applicable.

**Type consistency:** `Samples`, `Analyzer`, `PeakPicking`, `QCReport` are used identically across tasks 1.9, 4.8, 4.9, and the workflow callouts in 5.4. Backend names `auto`, `rust`, `dotnet` are used identically across 1.7, 4.4, 4.5, 4.7. Subcommand names `webui`, `targeted`, `untargeted`, `watch` are consistent.

**One known forward-link warning:** Tasks 1.3, 1.7, 1.8 link to `/scripting/reader` before Phase 4 creates the page. The plan calls out the temporary upstream URL substitution (`https://github.com/MorscherLab/LEAF/tree/main/docs`) in each task and the swap-back in Task 2.1 Step 4. Verify these substitutions land before Phase 4 ships, otherwise the build will fail.
