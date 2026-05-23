# SEED — Spectral Extraction & Encoding Driver

A cross-platform mass spectrometry file reader used by LEAF. It runs without .NET on supported platforms.

SEED reads mass spectrometry files from **7 vendor formats** directly from their binary formats. It provides a CLI tool, a desktop GUI converter, and Python bindings with NumPy integration.

Supported vendors: **Thermo**, **Bruker**, **Waters**, **Agilent**, **Shimadzu**, **Sciex**, plus the open **mzML** standard.

::: warning Public release status
Public binaries and the `pip install seed` wheel are currently unavailable while SEED prepares its 0.x public relaunch. Build from source until then — see [Install](#install) below.
:::

## Supported formats

| Format | Extension | Read | Convert to mzML | Notes |
|--------|-----------|------|-----------------|-------|
| Thermo RAW | `.raw` | Full | Yes | Versions 57-66; all Orbitrap / LTQ / Astral instruments |
| Bruker TDF / TSF | `.d` | Full | Yes | timsTOF (4D ion mobility), QTOF |
| Waters .raw | `.raw` (directory) | Full | Yes | MassLynx SQD2, ZQ, SIR / MRM |
| Agilent .d | `.d` (directory) | Full | Yes | MassHunter + ChemStation |
| Shimadzu LCD | `.lcd` | Full | Yes | MRM, triple-quad |
| Sciex WIFF | `.wiff` | Metadata | Planned | OLE2 metadata extraction |
| mzML | `.mzml`, `.mzml.gz` | Full | N/A | Indexed + non-indexed, gzip |

### Vendor format details

- **Thermo RAW** — versions 57-66, centroid / profile / FT / LT decoders, trailer metadata (86+ fields). No .NET required.
- **Bruker .d** — SQLite + zstd-compressed binary blobs, TOF-to-m/z quadratic calibration, full ion mobility (1/K0), ddaPASEF and diaPASEF support.
- **Waters .raw** — all 4 MassLynx binary encodings (2 / 4 / 6 / 8-byte), polynomial m/z calibration, multi-function support.
- **Agilent .d** — MassHunter (MSScan.bin + MSPeak.bin / MSProfile.bin) and ChemStation (DATA.MS big-endian) sub-formats.
- **Sciex WIFF** — OLE2 metadata extraction; scan data decoding pending (format is not publicly documented).

## Install

### CLI

Build from source while the public binary release pipeline is dormant:

```bash
git clone https://github.com/EstrellaXD/seed-core
cd seed-core
cargo build --release -p seed-cli
# → target/release/seed
```

Place the binary on `PATH`. The binary is static, ~2 MB, and has no runtime dependencies.

### Python

```bash
git clone https://github.com/EstrellaXD/seed-core
cd seed-core/crates/seed-py
maturin develop --release
```

Requires Python 3.11+, [maturin](https://www.maturin.rs/), and a Rust toolchain.

### GUI converter

Build from `crates/seed-gui` (Tauri v2 + Vue 3):

```bash
cd seed-core/crates/seed-gui
bun install
bun tauri build
```

The GUI provides drag-and-drop RAW-to-mzML conversion with progress bars. Build artifacts land in `src-tauri/target/release/bundle/`.

## Where to next

- → [Command line](/seed/cli) — `seed` subcommand reference
- → [Changelog](/seed/changelog) — release history

---

LEAF, the metabolomics analysis platform built on top of SEED, has its own user manual: [LEAF Get Started](/get-started/install-cli).

<!-- Source: seed-core/PUBLIC_README.md -->
