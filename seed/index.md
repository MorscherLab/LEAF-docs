# SEED — Spectral Extraction & Encoding Driver

A universal mass spectrometry file reader. Fast, cross-platform, no .NET required.

SEED reads mass spectrometry files from **7 vendor formats** directly from their binary formats, achieving **up to 700× faster scan decoding** than the official .NET RawFileReader library. It provides a CLI tool, a desktop GUI converter, and Python bindings with NumPy integration.

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
git clone https://github.com/EstrellaXD/oxion-core
cd oxion-core
cargo build --release -p seed-cli
# → target/release/seed
```

Move the binary onto your `PATH`. Static binary, ~2 MB, no runtime dependencies.

### Python

```bash
git clone https://github.com/EstrellaXD/oxion-core
cd oxion-core/crates/seed-py
maturin develop --release
```

Requires Python 3.11+, [maturin](https://www.maturin.rs/), and a Rust toolchain.

### GUI converter

Build from `crates/seed-gui` (Tauri v2 + Vue 3):

```bash
cd oxion-core/crates/seed-gui
bun install
bun tauri build
```

The GUI provides drag-and-drop RAW-to-mzML conversion with progress bars. Build artifacts land in `src-tauri/target/release/bundle/`.

## Performance

Benchmarked with a 796 MB Thermo Orbitrap Astral file (228,790 scans). The CLI is a 2 MB static binary with no runtime dependencies.

### End-to-end operations

Wall-clock time including process startup and file open:

| Operation | SEED (macOS) | .NET (macOS) | SEED (Windows) | .NET (Windows) | SEED (Linux) | .NET (Linux) |
|-----------|--------------|--------------|----------------|----------------|--------------|--------------|
| Full scan decode (228 K scans) | **84 ms** | — | 804 ms | — | 393 ms | — |
| RAW → mzML conversion | **5.5 s** | 12.1 s | **9.4 s** | 9.8 s | **13.8 s** | 22.8 s |

### Data access operations

Internal timing after file open — measures only the operation itself:

| Operation | SEED (macOS) | .NET (macOS) | SEED (Linux) | .NET (Linux) |
|-----------|--------------|--------------|--------------|--------------|
| Full scan decode (228 K) | **40 ms** | 396 ms | **213 ms** | 772 ms |
| TIC (228 K scans) | **0.4 ms** | 57 ms | **0.3 ms** | 109 ms |
| XIC (single target) | **0.9 ms** | 154 ms | **3.0 ms** | 250 ms |
| XIC (2,000 targets) | **9.6 ms** | 2,589 ms | **94 ms** | 3,044 ms |

### Why SEED is fast

- **Direct binary parsing** — reads the RAW format natively, no .NET runtime
- **Memory-mapped I/O** — zero-copy file access via OS virtual memory
- **Zero-allocation hot paths** — XIC reads raw bytes in-place, no heap allocations
- **Buffer reuse** — pre-allocated decode buffers eliminate ~220 K allocations per file
- **Parallel processing** — work-stealing across all cores for scan decode and folder conversion
- **Bounded-memory batch pipeline** — two-pass chunked extraction scales to 270+ files on NAS without exceeding available RAM
- **LTO + codegen-units=1** — whole-program link-time optimization

## Where to next

- → [Command line](/seed/cli) — `seed` subcommand reference
- → [Python API](/seed/python-api) — `import seed` (with `batch_xic` deep dive)
- → [Rust API](/seed/rust-api) — `use seed::…`
- → [Changelog](/seed/changelog) — release history

---

LEAF — the metabolomics analysis platform built on top of SEED — has its own user manual; see [LEAF Get Started](/get-started/install-desktop) if you arrived here via that route.

<!-- Source: oxion-core/PUBLIC_README.md -->
