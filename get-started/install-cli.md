# Install the wheel + CLI

LEAF runs as a local web application. Installation puts the LEAF wheel into a Python 3.12 environment; you launch the server from a terminal and use it in your browser at `127.0.0.1`. All processing and storage stay on the local machine.

> [Screenshot: LEAF home page in a browser after launch]

::: warning Not on PyPI
LEAF is not yet published to PyPI. `pip install leaf` will install an unrelated package. Use one of the install paths below — both work from official LEAF release artifacts on GitHub.
:::

## Pick a path

| | Standalone installer | Manual wheel install |
|---|---|---|
| **Who** | Individual researchers, first-time setup | Power users, custom Python environments, Linux servers without MINT |
| **What it does** | Bundles `uv`, Python 3.12, the LEAF wheel, and SEED into `~/.leaf` (or `%LOCALAPPDATA%\leaf`) | Drops the platform wheel into a Python 3.12 venv you manage |
| **Default port** | `8000` (hardcoded in the launcher script) | `18008` (LEAF CLI default) |
| **Platforms** | macOS (Apple Silicon), Windows (x64) | macOS, Windows, Linux x86_64 |

If you're not sure, use the **standalone installer** — it does not touch your system Python.

## Requirements

| | |
|---|---|
| **Operating system** | macOS (Apple Silicon), Linux (x86_64), or Windows (x64). On macOS / Linux, RAW files are read via the bundled [SEED](/scripting/reader) Rust reader — no .NET required. |
| **Disk** | ~500 MB for LEAF + room for your RAW files |
| **RAM** | 8 GB minimum, 16 GB recommended for large datasets |
| **Browser** | Any modern browser (Chrome, Firefox, Safari, Edge) |
| **Python** (manual path only) | 3.12 — [download from python.org](https://www.python.org/downloads/) |

::: tip Windows users
Windows uses Thermo's .NET RawFileReader by default and additionally needs the **.NET 8 runtime**. The standalone installer prompts to install it for you. For the manual path, install with `winget install Microsoft.DotNet.Runtime.8` or [download .NET 8](https://dotnet.microsoft.com/download/dotnet/8.0).
:::

## Path A — Standalone installer

Download the bundle for your platform from the [latest LEAF release](https://github.com/MorscherLab/LEAF/releases/latest). The bundle is a zip containing `install.sh` (or `install.ps1`) and a `wheels/` directory.

::: code-group

```bash [macOS (Apple Silicon)]
unzip leaf-*-macos-arm64.zip
cd leaf-*-macos-arm64
bash install.sh
```

```powershell [Windows (x64)]
Expand-Archive leaf-*-windows-x64.zip
cd leaf-*-windows-x64
powershell -ExecutionPolicy Bypass -File install.ps1
```

:::

The installer creates a private Python 3.12 environment under `~/.leaf` (macOS) or `%LOCALAPPDATA%\leaf` (Windows) and installs `uv` if it isn't already present. Your system Python is not touched.

**Custom install location:**

```bash
LEAF_HOME=/opt/leaf bash install.sh                 # macOS
$env:LEAF_HOME="D:\leaf"; .\install.ps1             # Windows
```

### Launch (Path A)

::: code-group

```bash [macOS]
~/.leaf/leaf
```

```powershell [Windows]
%LOCALAPPDATA%\leaf\leaf.cmd
```

:::

The launcher prints a uvicorn banner ending in:

```
Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

Open `http://127.0.0.1:8000` in your browser. To launch with just `leaf`, add the install directory to your `PATH`.

> [Screenshot: terminal showing the standalone launcher startup output]

### Uninstall (Path A)

::: code-group

```bash [macOS]
rm -rf ~/.leaf
```

```powershell [Windows]
Remove-Item -Recurse "$env:LOCALAPPDATA\leaf"
```

:::

The bundled `uv` stays installed — remove with `rm -rf ~/.local/bin/uv` (macOS) or `Remove-Item "$env:USERPROFILE\.local\bin\uv.exe"` (Windows) if you don't use it elsewhere.

## Path B — Manual wheel install

For users who want LEAF in their own Python environment (e.g. a `uv` project, a Conda env, a Linux server, or alongside other scientific Python tools).

Each LEAF release ships a single platform-specific wheel. Match the wheel filename to your OS / CPU / Python version. SEED ships as a separate wheel from the [oxion-core releases](https://github.com/EstrellaXD/oxion-core/releases) on macOS and Linux; on Windows, LEAF uses the bundled .NET reader and the SEED wheel is optional.

### Install

```bash
# Create a fresh Python 3.12 environment (uv example)
uv venv --python 3.12
source .venv/bin/activate           # macOS / Linux
# .venv\Scripts\Activate.ps1        # Windows

# Install LEAF — pick the wheel that matches your platform and Python version
pip install ./leaf-*.whl

# macOS / Linux: install the matching SEED wheel from the oxion-core release
pip install ./seed-*.whl
```

If you use `uv` natively, `uv pip install ./leaf-*.whl ./seed-*.whl` is equivalent.

### Launch (Path B)

```bash
leaf webui run
```

Default port is **18008**. Override with `--port`:

```bash
leaf webui run --port 8000
```

The full output ends with:

```
Uvicorn running on http://127.0.0.1:18008 (Press CTRL+C to quit)
```

To run LEAF in the background instead, use `leaf webui start` and `leaf webui stop`. See [`leaf webui`](/scripting/cli/webui) for full options.

## Stop

Press **Ctrl+C** in the terminal window. Closing the browser tab does not stop the LEAF server — it keeps running until the terminal is stopped (Path A) or the CLI is interrupted (Path B).

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `command not found: leaf` (Path B) | The Python venv's `bin/` is not on `PATH`. Activate the venv (`source .venv/bin/activate`) or invoke `./.venv/bin/leaf webui run` directly. |
| `pip install leaf` succeeded but doesn't run | That is the unrelated PyPI `leaf` package. Uninstall (`pip uninstall leaf`) and install from the GitHub release wheel instead. |
| Port already in use | Path A: edit the launcher script's `--port 8000`. Path B: run `leaf webui run --port 18009` (or any free port). |
| `pythonnet` errors on Windows | .NET 8 runtime missing. Install with `winget install Microsoft.DotNet.Runtime.8` or [the .NET installer](https://dotnet.microsoft.com/download/dotnet/8.0). |
| `seed` import fails on macOS (Path A) | The installer rewrites the dylib linkage automatically. If it failed, re-run `bash install.sh` and check the output for "Patching seed dylib linkage". |
| RAW file fails to load | The Thermo file may be from an unsupported instrument firmware. See [Troubleshooting](/reference/troubleshooting). |

## Next step

→ [Run your first analysis](/get-started/quickstart) (5 minutes)

Or, if your lab operates a MINT server:

→ [Install in MINT instead](/get-started/install-mint)
