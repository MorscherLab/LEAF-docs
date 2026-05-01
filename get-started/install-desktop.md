# Install on Your Desktop

LEAF runs as a local web application. After installation, the server is launched on demand from the command line and accessed in a browser at `127.0.0.1`. All processing and storage occur on the local machine.

> [Screenshot: LEAF home page in a browser after running `leaf serve`]

## Requirements

| | |
|---|---|
| **Operating system** | macOS (Apple Silicon), Linux (x86_64), or Windows (x64) |
| **Python** | 3.12 or newer — [download from python.org](https://www.python.org/downloads/) |
| **Disk** | ~500 MB for LEAF + room for your RAW files |
| **RAM** | 8 GB minimum, 16 GB recommended for large datasets |
| **Browser** | Any modern browser (Chrome, Firefox, Safari, Edge) |

::: tip Windows users
Windows additionally needs the **.NET 8.0 SDK** to read Thermo RAW files. [Download .NET 8.0](https://dotnet.microsoft.com/download/dotnet/8.0). macOS and Linux do not need .NET — LEAF uses a built-in Rust reader.
:::

## Install

LEAF ships as a single Python wheel per platform. Pick your preferred installer:

::: code-group

```bash [uv (recommended)]
# Install uv if you don't have it: https://docs.astral.sh/uv/
uv tool install leaf
```

```bash [pip]
pip install --user leaf
```

```bash [pipx]
pipx install leaf
```

:::

The wheel bundles everything LEAF needs: the Python backend, the Rust extraction engine, the web frontend, and the .NET reader (Windows). No separate downloads.

## Launch

Open a terminal and run:

```bash
leaf serve
```

You should see:

```
LEAF v0.5.0 ready at http://127.0.0.1:18008
Press Ctrl+C to stop.
```

Open the URL in your browser and you'll see the LEAF home page.

> [Screenshot: terminal showing `leaf serve` startup output]

## Stop

Press **Ctrl+C** in the terminal window. Closing the browser tab does not stop LEAF — it keeps running until you stop the terminal.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `command not found: leaf` | The install location isn't on your PATH. With `uv tool install`, run `uv tool update-shell`. With `pip install --user`, add `~/.local/bin` (macOS/Linux) or `%APPDATA%\Python\Scripts` (Windows) to PATH. |
| Port 18008 already in use | Another process is using the port. Run `leaf serve --port 18009` (or any free port). |
| `pythonnet` errors on Windows | .NET 8.0 SDK is missing. Install from [dotnet.microsoft.com](https://dotnet.microsoft.com/download/dotnet/8.0). |
| RAW file fails to load | The Thermo file may be from an unsupported instrument firmware. See [Troubleshooting](/reference/troubleshooting). |

## Next step

→ [Run your first analysis](/get-started/quickstart) (5 minutes)

Or if your lab has a hosted MINT instance with LEAF already installed:

→ [Use the hosted version instead](/get-started/install-hosted)
