# `leaf watch`

`leaf watch` runs targeted extraction when new `.raw`, `.mzml`, or `.mzml.gz` inputs appear in a folder.

## Commands

```bash
leaf watch run    FOLDER [OPTIONS]   # foreground
leaf watch start  FOLDER [OPTIONS]   # background daemon
leaf watch status                    # show daemon state
leaf watch stop                      # stop the daemon
```

Omit `FOLDER` from `run` or `start` to use the interactive setup.

## Watcher options

| Option | Default | Description |
|---|---|---|
| `--output`, `-o` | `<folder>_results` | Output directory for processed results. |
| `--list-path PATH` | auto-discover | Compound-list CSV. |
| `--idle-timeout FLOAT` | `60` | Finalize after this many inactive minutes. |
| `--poll-interval FLOAT` | `10` | Seconds between folder scans. |
| `--stability-time FLOAT` | `10` | Seconds a file size must remain unchanged before processing. |
| `--multi` | off | Treat each subfolder as a separate experiment. |

## Extraction options

| Option | Default | Description |
|---|---|---|
| `--polarity {auto,pos,neg}` | `auto` | Detect polarity or force a value. |
| `--ppm FLOAT` | `5` | m/z tolerance in ppm. |
| `--skip-blank / --no-skip-blank` | `--skip-blank` | Drop files whose name contains `blank`. |
| `--engine {cwt,prominence,volume2d,off}` | `cwt` | Targeted peak-picking engine. |
| `--rt-window FLOAT` | `0.3` | Peak-search window in minutes. |
| `--verbose`, `-v` | off | Enable verbose logging. |

Volume2D needs sample metadata. Supply `input.metadata_path` through `--config` or `--set`.

## Run configuration

The watcher accepts the 0.8 run-config format for advanced picker, scoring, metadata, and alignment settings:

```bash
leaf watch run --init-config watch.toml
leaf watch run /path/to/inbox --config watch.toml
leaf watch run /path/to/inbox --set peak_picking.intensity_threshold=200000
```

Precedence is: defaults, TOML file, `--set`, then an explicitly supplied typed flag.

Incremental watch runs do not apply the run config's MS², tracing, or correction fields. Use `leaf targeted` for those workflows.

## Foreground recipe

```bash
leaf watch run /path/to/inbox \
  --list-path ./compounds.csv \
  --output /path/to/results
```

Stop with **Ctrl+C**.

## Daemon recipe

```bash
leaf watch start /path/to/inbox \
  --list-path ./compounds.csv \
  --output /path/to/results

leaf watch status
leaf watch stop
```

The 0.7 `leaf targeted watch` command and `leaf-watch` console script were removed.

## Next

→ [`leaf targeted`](/scripting/cli/targeted)

→ [Run configuration](/scripting/cli/configuration)
