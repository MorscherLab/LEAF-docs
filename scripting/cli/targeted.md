# `leaf targeted`

Headless targeted extraction — the same pipeline the [Extract](/workflow/extract) page drives in the web UI, but without a browser. Produces a result CSV, with an optional `.msd` archive when `--save-extract` is enabled.

## Synopsis

```bash
leaf targeted INPUT_PATH COMPOUND_LIST OUTPUT_DIR [OPTIONS]
```

## Required arguments

| Argument | Description |
|---|---|
| `INPUT_PATH` | A single `.raw` / `.mzml` / `.mzml.gz` file, or a folder containing one supported format |
| `COMPOUND_LIST` | Path to the metabolite CSV (see [Prepare your data](/workflow/prepare-data) for the schema) |
| `OUTPUT_DIR` | Directory where LEAF writes result files |

## Common flags

| Flag | Default | Description |
|---|---|---|
| `--polarity {NEG,POS}` | `NEG` | MS polarity for mass calculation. Must match your acquisition. |
| `--tolerance INT` | `5` | m/z tolerance in ppm for EIC extraction. |
| `--rt-window FLOAT` | `0.3` | Retention-time search window in minutes. |
| `--method {v1,v2,v4}` | `v4` | CLI enum retained for compatibility; the current peak picker only implements `v4`. See [Extract — Targeted: Peak picking](/workflow/extract#peak-picking). |
| `--backend {auto,rust,dotnet}` | `auto` | Input-file reader. `rust` uses [SEED](/scripting/reader); `dotnet` uses Thermo's RawFileReader for `.raw` files. |
| `--parallel / --no-parallel` | off | Use the .NET parallel extraction path when `--backend dotnet` is selected. |
| `--max-workers INT` | `4` | Parallel extraction threads. |
| `--skip-blank / --no-skip-blank` | on | Skip files whose name contains "blank". |
| `--organize-name / --no-organize-name` | on | Auto-parse clean sample names from file names. |
| `--tracing-path PATH` | (none) | Path to a JSON tracing config (export from the web UI's Tracing Editor). See [Isotope tracing](/workflow/tracing). |
| `--save-extract` | off | Also write the extracted `.msd` bundle. |

For the full flag set, run `leaf targeted --help`.

## Recipe — minimal targeted run

```bash
leaf targeted ./samples ./compounds.csv ./outputs --polarity NEG --tolerance 5
```

Writes a result CSV into `./outputs`. Add `--save-extract` when you also need an `.msd` bundle for reopening in the web UI or Python — see [Recipe 2](/scripting/python/recipes#recipe-2-reopen-a-msd-and-re-run-peak-picking).

## Recipe — tracing run

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --polarity NEG --tolerance 5 \
  --tracing-path ./tracing-13C.json \
  --save-extract
```

The tracing JSON is produced by the web UI's Tracing Editor (Export button) or hand-written — see [Isotope tracing](/workflow/tracing).

## Recipe — overriding the backend

```bash
# Force the Thermo .NET reader on Windows when SEED can't decode a file:
leaf targeted ./samples ./compounds.csv ./outputs --backend dotnet
```

## Hidden alias

`leaf analyze` is a hidden alias for `leaf targeted`. New scripts should use the canonical name.

## Next

→ [`leaf untargeted`](/scripting/cli/untargeted) — untargeted feature discovery
→ [Configuration](/scripting/cli/configuration) — backend selection on disk
