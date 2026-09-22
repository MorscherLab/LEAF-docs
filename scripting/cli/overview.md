# Command-Line Interface

The `leaf` command ships with the LEAF 0.8 platform wheel.

| Command | Purpose | Reference |
|---|---|---|
| `leaf targeted` | Targeted extraction, peak picking, and scoring | [Targeted](/scripting/cli/targeted) |
| `leaf untargeted` | Untargeted MS1 feature discovery | Run `leaf untargeted --help` |
| `leaf watch` | Process new files from a watched folder | [Watch](/scripting/cli/watch) |
| `leaf webui` | Start or stop the local web interface | [Web UI](/scripting/cli/webui) |
| `leaf doctor` | Check the installation and bundled components | [Setup tools](/scripting/cli/tools#check-an-installation) |
| `leaf validate` | Validate a compound list and optional data path | [Setup tools](/scripting/cli/tools#validate-inputs-before-a-run) |
| `leaf init` | Create a starter run folder | [Setup tools](/scripting/cli/tools#start-a-new-run-folder) |
| `leaf inspect` | Summarize an `.msd`, `.usd`, or acquisition file | [Setup tools](/scripting/cli/tools#inspect-saved-results) |
| `leaf update` | Install a compatible release wheel | [Setup tools](/scripting/cli/tools#update-leaf) |
| `leaf downstream` | Run trend or annotation workflows on saved results | [Upstream CLI reference](https://github.com/MorscherLab/LEAF/blob/main/docs/leaf/api/cli.md) |
| `leaf export` | Export SIRIUS, MGF, or MSP input from saved results | [Export](/scripting/cli/export) |

## Verify the installation

```bash
leaf --version
leaf doctor
```

Expected version:

```text
leaf 0.8.6
```

## LEAF 0.8 command model

Targeted and untargeted analyses are direct commands; there is no `run` subcommand:

```bash
leaf targeted DATA COMPOUNDS OUT
leaf untargeted DATA OUT
```

Both use the same input controls: `--metadata`, `--polarity`, `--ppm`, `--align`, `--ms2/--no-ms2`, and `--skip-blank/--no-skip-blank`. The engine and output options depend on the pipeline.

Advanced settings use one run-config interface:

```bash
leaf targeted --init-config targeted.toml
leaf targeted DATA COMPOUNDS OUT --config targeted.toml
leaf targeted DATA COMPOUNDS OUT --set peak_picking.intensity_threshold=200000
```

Precedence is: defaults, TOML file, `--set`, then an explicitly supplied typed flag.

The 0.7 aliases and flags, including `leaf targeted run`, `leaf analyze`, `leaf-watch`, `--tolerance`, `--backend`, and `--peak-picking`, were removed. Use the current command names shown by `leaf --help`.

## Next

→ [`leaf targeted`](/scripting/cli/targeted)

→ [Run configuration](/scripting/cli/configuration)
