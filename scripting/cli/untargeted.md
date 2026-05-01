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
| `--polarity {NEG,POS,auto}` | `auto` | Ionization polarity to process. |
| `--ppm FLOAT` | `5.0` | m/z tolerance in ppm for ROI matching. |
| `--min-scans INT` | `5` | Minimum number of scans per ROI. |
| `--min-intensity FLOAT` | `1000` | Drop features below this peak height. |
| `--rt-tolerance FLOAT` | `0.3` | Retention-time tolerance in minutes for matching. |
| `--no-align` | off | Disable retention-time alignment. |
| `--rescue` | off | Enable cross-sample rescue for faint reproducible features; slower and more memory-intensive. |
| `--exclude-blank` | off | Exclude files whose name contains "blank". |
| `-o, --output PATH` | `<folder>_untargeted.usd` | Where to write the `.usd` archive, or `.csv` for CSV export. |

For the full flag set, run `leaf untargeted --help`.

## Recipe — minimal untargeted run

```bash
leaf untargeted ./samples --polarity NEG --min-scans 5
```

Outputs `./untargeted.usd`. Open in the web UI by drag-and-drop to triage in the [Inspect features](/workflow/inspect-features) view.

## Recipe — CSV export

Use a `.csv` suffix when you want a flat feature table instead of a `.usd` archive:

```bash
leaf untargeted ./samples \
  --ppm 5 \
  --min-scans 5 \
  -o ./features.csv
```

## Hidden alias

`leaf untarget` is a hidden alias retained for older scripts. The console-script shim `leaf-untarget` invokes the same command.

## Next

→ [Inspect features](/workflow/inspect-features) — what to do with the resulting `.usd`
