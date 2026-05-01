# Command-Line Interface

The `leaf` command-line interface ships with the LEAF Python package. It has four sub-applications:

| Sub-command | Purpose | Reference |
|-------------|---------|-----------|
| `leaf webui` | Start / stop the local web application (`run`, `start`, `stop`, `status`) | [Detail](/scripting/cli/webui) |
| `leaf targeted` | Targeted metabolite extraction, peak picking, and quality scoring (no UI) | [Detail](/scripting/cli/targeted) |
| `leaf untargeted` | Untargeted MS1 feature discovery (no UI) | [Detail](/scripting/cli/untargeted) |
| `leaf watch` | Real-time folder monitoring; auto-extracts new RAW files (`run`, `start`, `stop`, `status`) | [Detail](/scripting/cli/watch) |

For programmatic use without a CLI, see the [Python package documentation](/scripting/python/overview).

## Verifying the installation

```bash
leaf --version
```

Expected output:

```
leaf 0.5.0
```

If the command is not found, the install location is not on `PATH`. Resolutions are listed in [Install the wheel + CLI — Troubleshooting](/get-started/install-cli#troubleshooting).

## Legacy aliases

Two console-script shims preserve compatibility with existing scripts:

| Shim | Equivalent to |
|------|---------------|
| `leaf-watch` | `leaf watch run` |
| `leaf-untarget` | `leaf untargeted` |

The CLI also accepts hidden aliases `leaf analyze` and `leaf untarget` as deprecated forms of `leaf targeted` and `leaf untargeted`.

## Configuration

Persistent settings (storage paths, default backend, worker counts) are configured through the **Settings** dialog in the web UI. Configuration on disk is described in [Configuration](/scripting/cli/configuration).

## Next

→ [`leaf webui`](/scripting/cli/webui) — start the web application
→ [Configuration](/scripting/cli/configuration) — config files and environment variables
