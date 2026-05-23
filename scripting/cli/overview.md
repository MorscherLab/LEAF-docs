# Command-Line Interface

The `leaf` command-line interface ships with the LEAF Python package. This manual documents the targeted analysis commands, service commands, and setup / file utilities:

| Sub-command | Purpose | Reference |
|-------------|---------|-----------|
| `leaf webui` | Start / stop the local web application (`run`, `start`, `stop`, `status`) | [Detail](/scripting/cli/webui) |
| `leaf targeted` | Targeted metabolite extraction, peak picking, and quality scoring (no UI) | [Detail](/scripting/cli/targeted) |
| `leaf watch` | Real-time folder monitoring; auto-extracts new LC-MS files (`run`, `start`, `stop`, `status`) | [Detail](/scripting/cli/watch) |
| `leaf doctor` | Check the local Python package, native extensions, reader support, and Web UI assets | [Detail](/scripting/cli/tools#check-an-installation) |
| `leaf validate` | Preflight a metabolite list and optional RAW / mzML input path | [Detail](/scripting/cli/tools#validate-inputs-before-a-run) |
| `leaf init` | Create a starter analysis folder | [Detail](/scripting/cli/tools#start-a-new-run-folder) |
| `leaf inspect` | Summarize saved `.msd` result archives and acquisition files | [Detail](/scripting/cli/tools#inspect-saved-results) |
| `leaf update` | Upgrade LEAF in the active Python environment | [Detail](/scripting/cli/tools#update-leaf) |
| `leaf convert` | Convert Thermo RAW folders to mzML | [Detail](/scripting/cli/tools#convert-raw-to-mzml) |

For programmatic use without a CLI, see the [Python package documentation](/scripting/python/overview).

## Verifying the installation

```bash
leaf --version
leaf doctor
```

Expected output:

```
leaf 0.5.7
```

If the command is not found, the install location is not on `PATH`. Resolutions are listed in [Install the wheel + CLI — Troubleshooting](/get-started/install-cli#troubleshooting).

## Legacy aliases

One console-script shim preserves compatibility with existing watcher scripts:

| Shim | Equivalent to |
|------|---------------|
| `leaf-watch` | `leaf watch run` |

The CLI also accepts `leaf analyze` as a hidden deprecated alias for `leaf targeted`. New scripts should use `leaf targeted`.

## Configuration

Persistent settings (storage paths, default backend, worker counts) are configured through the **Settings** dialog in the web UI. Configuration on disk is described in [Configuration](/scripting/cli/configuration).

## Next

→ [`leaf webui`](/scripting/cli/webui) — start the web application
→ [Setup & file tools](/scripting/cli/tools) — check installs, validate inputs, inspect results
→ [Configuration](/scripting/cli/configuration) — config files and environment variables
