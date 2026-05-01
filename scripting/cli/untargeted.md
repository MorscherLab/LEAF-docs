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
