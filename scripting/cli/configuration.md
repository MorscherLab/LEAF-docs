# Configuration

LEAF reads configuration from three sources, in increasing order of precedence:

1. **Built-in defaults** — used when no other source overrides them.
2. **On-disk configuration** — written by the **Settings** dialog in the web UI.
3. **Command-line flags** — passed to `leaf webui` (see [`leaf webui`](/scripting/cli/webui)) or to `leaf targeted` / `leaf untargeted`.

For most users, the Settings dialog is the only configuration interface required.

## Settings dialog

Open the gear icon in the top action bar of the web UI. Three tabs are available:

| Tab | Setting | Description |
|-----|---------|-------------|
| **Storage** | Storage path | Filesystem location where LEAF writes intermediate files, jobs, and result archives. |
| **Display** | Theme | Light or dark colour scheme for the UI. |
| **Display** | Chart defaults | Default colormaps and normalization choices applied to new visualizations. |
| **Advanced** | Backend | `auto`, `rust` (SEED), or `dotnet` (Windows). |
| **Advanced** | Worker count | Number of parallel workers used during extraction. Default scales with available CPU cores. |

> [Screenshot: Settings → Advanced tab showing backend selector and worker count]

Changes to **Storage** and **Advanced** settings apply to subsequent jobs. Running jobs are not affected.

## On-disk configuration

::: info
The on-disk format and location of LEAF's configuration file are implementation details and are not part of the stable user-facing API. Edit configuration through the Settings dialog rather than directly on disk. For administrative deployment scenarios, refer to the [LEAF repository documentation](https://github.com/MorscherLab/LEAF/tree/main/docs).
:::

## Storage path

The configured storage path holds:

| Subdirectory | Contents |
|--------------|----------|
| `jobs/` | Per-job directories with intermediate state and logs |
| `archives/` | Saved `.msd` and `.usd` archives produced by the export dialog |
| `cache/` | Cached parsing results for previously seen RAW files |

Removing the cache directory is safe; it will be regenerated on the next extraction at the cost of one re-parse per RAW file.

## Backend selection

LEAF reads RAW files through one of three backends. Selection is per-run via the `--backend` flag on `leaf targeted` / `leaf untargeted`, or per-installation via the **Settings → Advanced** dialog in the web UI.

| Backend | When used | Source |
|---------|-----------|--------|
| `auto` (default) | Picks the best backend for the current platform: `dotnet` on Windows, `rust` (SEED) elsewhere | — |
| `rust` | Bundled SEED reader (Rust); no .NET required | [SEED](/scripting/reader) |
| `dotnet` | Thermo .NET RawFileReader; requires .NET 8.0 SDK on Windows | Thermo Fisher |

Switching backends does not modify saved results.

## Next

→ [Python package overview](/scripting/python/overview) — using LEAF programmatically
