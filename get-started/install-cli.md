# Install the wheel and CLI

LEAF 0.8 ships as one platform wheel containing the Python package, web interface, Rust extensions, and SEED reader. The former standalone installer archives and private `~/.leaf` launcher are no longer used.

![LEAF home page after local launch](/screenshots/get-started/leaf-home.jpg)

## Requirements

| | |
|---|---|
| **Operating system** | macOS 14+ (Apple Silicon), Windows x64, or Linux x86_64 |
| **Python** | CPython 3.12, managed automatically by `uv tool install` |
| **Disk** | About 500 MB for LEAF, plus space for LC-MS data |
| **RAM** | 8 GB minimum; 16 GB recommended for large datasets |
| **Browser** | Current Chrome, Edge, Firefox, or Safari |

## Install

1. Install [`uv`](https://docs.astral.sh/uv/getting-started/installation/) if it is not already available.
2. Download the wheel for your operating system and Python 3.12 from the [latest LEAF release](https://github.com/MorscherLab/LEAF/releases/latest).
   Since 0.8.4, automatic releases provide the Linux wheel and MINT bundle. macOS and Windows wheels are built separately for stable tags; check the release assets for your platform.
3. Install it as an isolated command-line tool:

::: code-group

```bash [macOS / Linux]
uv tool install --python 3.12 ./leaf-*.whl
uv tool update-shell
```

```powershell [Windows PowerShell]
uv tool install --python 3.12 (Get-ChildItem .\leaf-*-win_amd64.whl -File).FullName
uv tool update-shell
```

:::

Restart the terminal after `uv tool update-shell`, then verify the installation:

```bash
leaf --version
leaf doctor
```

The expected version for this documentation is `leaf 0.8.7`. `leaf doctor` checks the Python package, native extension, SEED reader, server dependencies, and bundled web interface.

::: warning Install the release wheel
LEAF is not distributed through the public PyPI package named `leaf`. Install the wheel downloaded from the LEAF release page.
:::

## Launch the web interface

```bash
leaf webui run
```

Open `http://127.0.0.1:18008`. Keep the terminal open while using LEAF; press **Ctrl+C** to stop the server.

![Terminal showing LEAF Web UI startup output](/screenshots/get-started/standalone-launcher-terminal.svg)

Use another port when 18008 is already occupied:

```bash
leaf webui run --port 18009
```

For a background process:

```bash
leaf webui start
leaf webui status
leaf webui stop
```

See [`leaf webui`](/scripting/cli/webui) for all service commands.

## Update

Preview the update before installing it:

```bash
leaf update --dry-run
leaf update
```

To install a wheel downloaded manually:

```bash
leaf update --package ./downloaded-leaf-wheel.whl
```

## Uninstall

```bash
uv tool uninstall leaf
```

## Troubleshooting

| Problem | Fix |
|---|---|
| `command not found: leaf` | Run `uv tool update-shell`, restart the terminal, and check `uv tool dir --bin`. |
| Port already in use | Run `leaf webui run --port 18009`. |
| Install seems incomplete | Run `leaf doctor`; use `leaf doctor --strict` in setup scripts. |
| RAW file fails to load | Confirm the file opens in the vendor software, then see [Troubleshooting](/reference/troubleshooting). |
| Browser shows an old interface | Follow [Browser refresh and cache](/reference/troubleshooting#browser-refresh-and-cache). |

## Next step

→ [Run a hands-on targeted analysis](/get-started/quickstart)
