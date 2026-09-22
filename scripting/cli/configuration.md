# Run Configuration

LEAF 0.8 uses one typed run-config contract across the CLI, Web UI, and Python run objects.

## Precedence

For `leaf targeted`, `leaf untargeted`, and `leaf watch`, values are resolved in this order:

1. Built-in defaults
2. `--config FILE`
3. Repeatable `--set PATH=VALUE` overrides
4. Typed flags explicitly supplied on the command line

An omitted typed flag does not replace a value read from the TOML file.

## Generate a template

```bash
leaf targeted --init-config targeted.toml
leaf untargeted --init-config untargeted.toml
leaf watch run --init-config watch.toml
```

The targeted and untargeted templates contain every field, default, description, and required path. The watch template omits paths; pass its folder, compound list, and output through the watch command.

## Minimal targeted config

```toml
[targeted]
file_path = "./samples"
list_path = "./compounds.csv"
output_path = "./outputs"

[targeted.input]
polarity = "auto"
ppm = 5.0
align = "auto"
skip_blank = true
ms2 = true

[targeted.peak_picking]
enabled = true
mode = "cwt"
rt_window = 0.3

[targeted.result]
save_extract = true
```

Run it with:

```bash
leaf targeted --config targeted.toml
```

Paths can instead be passed as positional arguments; command-line paths take precedence over the `[targeted]` table.

## Shared input fields

The targeted and untargeted contracts both use an `input` table.

| Field | Default | Purpose |
|---|---|---|
| `input.metadata_path` | none | Sample sheet used by design-aware engines. |
| `input.polarity` | `auto` | Auto-detect, or force `pos` or `neg`. |
| `input.ppm` | `5.0` | m/z tolerance. |
| `input.align` | `auto` | Per-block RT alignment: `auto`, `on`, or `off`. |
| `input.align_by` | `[]` | Sample-sheet factors defining acquisition blocks. |
| `input.align_reference` | none | Reference block label. |
| `input.skip_blank` | targeted `true`; untargeted `false` | Drop filenames containing `blank` before reading. |
| `input.ms2` | targeted `true`; untargeted `false` | Extract DDA MS² spectra. |
| `input.acquisition_mode` | `auto` | Detect or force acquisition routing. |

## Override one value

`--set` parses the value as TOML:

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --set peak_picking.intensity_threshold=200000 \
  --set result.report.enabled=true
```

Unknown paths and values with the wrong type are rejected before processing.

## Tracing and correction

```toml
[targeted.extraction]
tracing = { "M+1" = 1.003355, "M+2" = 2.00671 }
tracing_groups = []

[targeted.result.correction]
enabled = true
tracer = ["13C:0.99"]
high_res = true
```

The 0.7 keys `extraction.polarity`, `extraction.tolerance`, `extraction.extract_ms2`, `extraction.skip_blank`, `common.*`, `design.*`, and `volume3d.ppm_bin` are not migrated automatically. Generate a new 0.8 template and copy the intended values into the current paths.

## Web UI settings

The gear icon opens runtime and scientific defaults. In MINT, server-wide **Plugin** settings are visible only to platform administrators; standalone LEAF shows them to the local operator.

| Tab | What it controls |
|---|---|
| **Plugin** | RAW-file path, concurrent jobs, and SEED I/O settings |
| **Peak Picking** | Targeted peak-detection defaults |
| **Untargeted / Volume3D** | Untargeted processing defaults |
| **MS²** | Spectral-matching defaults |
| **Appearance** | Theme, colour palette, and table density |

![Current LEAF Settings dialog showing the Plugin runtime controls](/screenshots/reference/settings-plugin.jpg)

## Next

→ [`leaf targeted`](/scripting/cli/targeted)

→ [`leaf watch`](/scripting/cli/watch)
