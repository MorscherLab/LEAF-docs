# `leaf serve`

Starts the LEAF backend server and serves the web interface on the local machine. This is the primary entry point for desktop installations.

## Synopsis

```bash
leaf serve [--port PORT]
```

## Default behavior

```bash
leaf serve
```

On startup, the server:

1. Binds to the loopback interface `127.0.0.1` (not `0.0.0.0`); the application is therefore reachable only from the local machine.
2. Listens on TCP port **18008** by default.
3. Prints the resolved URL to standard output and remains in the foreground.

Expected output:

```
LEAF v0.5.0 ready at http://127.0.0.1:18008
Press Ctrl+C to stop.
```

## Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--port` | `18008` | TCP port to listen on. Use a different port if 18008 is in use. |

::: info
Additional flags exposed by `leaf serve --help` are not documented here. Treat any flag not listed in this table as unstable until it appears in this manual.
:::

## Lifecycle

| Action | Effect |
|--------|--------|
| Stop the server | Press `Ctrl+C` in the terminal running `leaf serve`. |
| Close the browser tab | Has no effect on the server; the server continues running. |
| Close the terminal window | Terminates the server process (SIGHUP). |

## Common scenarios

### Port already in use

If port 18008 is occupied (for example, by a previous LEAF process that did not exit cleanly), specify a different port:

```bash
leaf serve --port 18009
```

Then open `http://127.0.0.1:18009` in the browser.

### Confirming the server is running

In a separate terminal:

```bash
curl -I http://127.0.0.1:18008
```

A `200 OK` or `302 Found` response indicates the server is reachable.

## Network exposure

`leaf serve` binds only to `127.0.0.1`. The application is **not** exposed to other machines on the local network or the internet. Exposing LEAF on a multi-user host requires the hosted MINT deployment, not the desktop server; see [Use the hosted version](/get-started/install-hosted).

## Next

→ [Configuration](/cli/configuration) — storage paths, backend selection
