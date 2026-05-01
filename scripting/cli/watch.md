# `leaf watch`

Real-time folder monitoring — automatically runs targeted extraction as new `.raw`, `.mzml`, or `.mzml.gz` files land in a folder. Useful for instrument acquisition computers where samples are being saved continuously.

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
| `FOLDER` | Folder to monitor for new `.raw`, `.mzml`, or `.mzml.gz` files |

## Common flags

| Flag | Default | Description |
|---|---|---|
| `--list-path PATH` | (auto-discovered if omitted) | Compound list CSV — same schema as [`leaf targeted`](/scripting/cli/targeted). |
| `-o, --output PATH` | (sibling of FOLDER) | Where to write per-file `.msd` archives. |
| `--polarity {NEG,POS}` | `NEG` | MS polarity. |
| `--tolerance INT` | `5` | m/z tolerance in ppm. |
| `--method {v1,v2,v4}` | `v4` | CLI enum retained for compatibility; the current peak picker only implements `v4`. |
| `--rt-window FLOAT` | `0.3` | Retention-time search window. |
| `--idle-timeout FLOAT` | `60` | Stop watching after N minutes with no new files. |
| `--poll-interval FLOAT` | `10` | Seconds between filesystem polls. |
| `--stability-time FLOAT` | `10` | Wait N seconds after a file stops growing before processing (avoids partial reads). |
| `--multi / --no-multi` | off | Watch multiple sub-folders concurrently. |

For the full flag set, run `leaf watch run --help`.

## Recipe — foreground watch

```bash
leaf watch run /path/to/inbox --list-path ./compounds.csv -o /path/to/outputs
```

Stops with `Ctrl+C`.

## Recipe — daemon

```bash
leaf watch start /path/to/inbox --list-path ./compounds.csv -o /path/to/outputs
leaf watch status
leaf watch stop
```

The daemon survives terminal close. Use `leaf watch status` to verify it is running and to see the last-processed file.

## Legacy shim

`leaf-watch` is a console-script shim equivalent to `leaf watch run`.

## Next

→ [`leaf targeted`](/scripting/cli/targeted) — same extraction pipeline, one-shot
