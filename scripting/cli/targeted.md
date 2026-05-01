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

Outputs `./analysis.msd` in the current directory. Open it in the web UI by drag-and-drop, or load it from a Python script — see [Recipe 2](/scripting/python/recipes#recipe-2-reopen-a-msd-and-re-run-peak-picking).

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
