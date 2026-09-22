# `leaf targeted`

`leaf targeted` runs the targeted extraction pipeline without opening a browser. It writes a result CSV and, by default, an `.msd` archive that can be reopened in LEAF.

## Synopsis

```bash
leaf targeted DATA COMPOUNDS OUT [OPTIONS]
```

| Argument | Description |
|---|---|
| `DATA` | MS data file, vendor directory, or folder of supported files |
| `COMPOUNDS` | Compound-list CSV; see [Prepare Data](/workflow/prepare-data) |
| `OUT` | Output directory |

The paths may be passed as arguments or supplied in the top-level `[targeted]` TOML table. `--init-config` does not require input paths.

## Front-panel options

| Option | Default | Description |
|---|---|---|
| `--metadata FILE` | none | CSV/TSV sample sheet. Required by `--engine volume2d`. |
| `--polarity {auto,pos,neg}` | `auto` | Detect from the folder name, compound adducts, or scan metadata; or force a polarity. |
| `--ppm FLOAT` | `5` | m/z tolerance in ppm. |
| `--align {auto,on,off}` | `auto` | Per-block RT alignment. Auto activates for a multi-block sample sheet. |
| `--ms2 / --no-ms2` | `--ms2` | Extract DDA MS² spectra with MS1 chromatograms. |
| `--skip-blank / --no-skip-blank` | `--skip-blank` | Drop files whose name contains `blank`. |
| `--engine {cwt,prominence,volume2d,off}` | `cwt` | Peak picker. `off` extracts EICs without peak picking or scoring. |
| `--rt-window FLOAT` | `0.3` | Peak-search window around the compound-list RT, in minutes. |
| `--report / --no-report` | `--no-report` | Write a PDF report with EIC plots. |
| `--verbose`, `-v` | off | Enable verbose logging. |

## Run configuration

| Option | Description |
|---|---|
| `--init-config FILE` | Write a commented TOML template containing every setting, then exit. |
| `--config FILE` | Read the `[targeted]` table from a TOML run config. |
| `--set PATH=VALUE` | Override one config value using TOML syntax; repeat as needed. |

Typed flags override `--set`, which overrides `--config`.

## Minimal run

```bash
leaf targeted ./samples ./compounds.csv ./outputs
```

LEAF detects polarity, uses 5 ppm, skips filenames containing `blank`, extracts MS² when present, and runs the CWT peak picker.

Specify the front-panel choices when they should be fixed for a reproducible script:

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --polarity neg \
  --ppm 5 \
  --engine cwt \
  --rt-window 0.3
```

## Volume2D run

Volume2D uses cross-sample coherence and requires a sample sheet:

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --metadata ./samples.csv \
  --engine volume2d
```

## Advanced settings

Generate the complete template instead of passing many flags:

```bash
leaf targeted --init-config targeted.toml
leaf targeted ./samples ./compounds.csv ./outputs --config targeted.toml
```

For one advanced override:

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --set peak_picking.intensity_threshold=200000
```

## Tracing and correction

Tracing groups and natural-abundance correction now live in the run config. Example:

```toml
[targeted.extraction]
tracing = { "M+1" = 1.003355, "M+2" = 2.00671 }
tracing_groups = []

[targeted.result.correction]
enabled = true
tracer = ["13C:0.99"]
high_res = true
```

Run it with:

```bash
leaf targeted ./samples ./compounds.csv ./outputs --config tracing.toml
```

The removed 0.7 flags `--tracing-path`, `--correct`, `--tracer`, and `--high-res` are not accepted by LEAF 0.8.

## Next

→ [Run configuration](/scripting/cli/configuration)

→ [Stable-isotope tracing](/workflow/tracing)
