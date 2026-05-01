# Command-Line Interface

The `leaf` command-line interface is installed alongside the LEAF Python package and serves two primary purposes:

1. **Launching the local web application** (`leaf serve`) — the most common use, covered in [Install on desktop](/get-started/install-desktop) and detailed in [`leaf serve`](/cli/serve).
2. **Inspecting the installed version and configuration** — useful for bug reports and reproducibility.

For programmatic use of LEAF without a server, see the [Python package documentation](/python/overview).

## Verifying the installation

After installing the LEAF wheel, the `leaf` executable should be available on the system `PATH`:

```bash
leaf --version
```

Expected output:

```
LEAF 0.5.0
```

If the command is not found, the install location is not on `PATH`. Resolutions are listed in [Install on desktop — Troubleshooting](/get-started/install-desktop#troubleshooting).

## Command index

| Command | Purpose | Reference |
|---------|---------|-----------|
| `leaf serve` | Start the local web application | [Detail](/cli/serve) |
| `leaf --version` | Print the installed LEAF version | This page |
| `leaf --help` | List all available subcommands and flags | This page |

::: info
The full set of `leaf` subcommands is enumerated by `leaf --help`. If a subcommand is not described in this manual, it is either unstable or developer-internal; consult the [LEAF repository documentation](https://github.com/MorscherLab/LEAF/tree/main/docs) for authoritative reference.
:::

## Configuration

Persistent settings — storage paths, default backend, worker counts — are configured through the **Settings** dialog in the web UI. Configuration on disk is described in [CLI configuration](/cli/configuration).

## Next

→ [`leaf serve`](/cli/serve) — start the web application
→ [Configuration](/cli/configuration) — config files and environment variables
