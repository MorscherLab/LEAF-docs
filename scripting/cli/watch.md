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
