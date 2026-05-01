# `leaf webui`

Starts the LEAF backend server and serves the web interface on the local machine. This is the primary entry point for desktop installations.

::: info Renamed
Older documentation referenced a `serve` subcommand that has never existed in the shipping CLI. The actual entry point is `leaf webui` with four sub-commands (`run`, `start`, `stop`, `status`). See the [glossary entry](/reference/glossary#l) for the legacy-alias note.
:::

## Synopsis

```bash
leaf webui run    [--host HOST] [--port PORT]   # foreground
leaf webui start  [--host HOST] [--port PORT]   # detached daemon
leaf webui stop                                  # terminate the daemon
leaf webui status                                # show daemon state
```

## Default behavior — `leaf webui run`

```bash
leaf webui run
```

On startup, the server:

1. Binds to the loopback interface `127.0.0.1` (not `0.0.0.0`); the application is therefore reachable only from the local machine.
2. Listens on TCP port **18008** by default.
3. Runs in the foreground until interrupted (`Ctrl+C`).

Expected output (uvicorn banner):

```
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:18008 (Press CTRL+C to quit)
```

## Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--host`, `-H` | `127.0.0.1` | Bind address. Use `0.0.0.0` to expose on the local network — see warning below. |
| `--port`, `-p` | `18008` | TCP port. Use a different value if 18008 is taken. |

::: warning Network exposure
`--host 0.0.0.0` exposes LEAF to anyone on the same network and provides no authentication. Use only on trusted networks. For multi-user deployments, use the hosted MINT path instead — see [Use the hosted version](/get-started/install-hosted).
:::

## Daemon mode

`leaf webui start` runs the server in the background. The PID is recorded so `leaf webui stop` can terminate it cleanly:

```bash
leaf webui start --port 18009
leaf webui status
leaf webui stop
```

`leaf webui status` prints `running (pid N, port 18009)` or `not running`.

## Common scenarios

### Port already in use

```bash
leaf webui run --port 18009
```

Then open `http://127.0.0.1:18009` in the browser.

### Confirming the server is running

```bash
curl -I http://127.0.0.1:18008
```

A `200 OK` or `302 Found` response indicates the server is reachable.

## Lifecycle

| Action | Effect |
|--------|--------|
| `Ctrl+C` (foreground `run`) | Stops the server. |
| Close the browser tab | No effect; server keeps running. |
| Close the terminal window | Terminates `leaf webui run` (SIGHUP). The daemon (`leaf webui start`) survives. |
| `leaf webui stop` | Terminates the daemon. |

## Next

→ [Configuration](/cli/configuration) — storage paths, backend selection
