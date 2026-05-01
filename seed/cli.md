# `seed` Command Line

The `seed` CLI is a single binary with 18 subcommands for inspecting, exporting, and converting mass spectrometry files.

## Synopsis

```bash
seed <subcommand> [arguments] [options]
```

Run `seed --help` for the top-level help, or `seed <subcommand> --help` for per-subcommand options.

## Subcommand index

| Subcommand | Purpose |
|---|---|
| `info` | Print summary metadata (instrument, scan count, RT range) |
| `scan` | Export a single scan as JSON |
| `streams` | List OLE2 container streams (RAW only) |
| `tic` | Export the Total Ion Chromatogram as CSV |
| `xic` | Export Extracted Ion Chromatogram(s) as CSV — single or multi-target, single file |
| `batch-xic` | Multi-file XIC extraction; emits an aligned RT-grid tensor as CSV |
| `ms2-spectra` | Extract MS2 fragment spectra for a precursor m/z (DDA) |
| `trailer` | Show trailer extra data for a scan (RAW only) |
| `status-log` | Extract instrument status log fields (RAW only) |
| `devices` | List instrument devices (controllers) in the file |
| `device-tic` | Extract per-device traces (pump pressure, UV, etc.) |
| `validate` | Validate output against ground-truth data |
| `benchmark` | Performance benchmark — read all scans, optionally measure XIC |
| `bench-concurrency` | Sweep concurrency levels for batch-XIC tuning |
| `convert` | Convert MS files to mzML |
| `scans` | Dump per-scan metadata to an Arrow IPC file |
| `debug` | Dump internal addresses and sanity checks |
| `diagnose` | Stage-by-stage parsing report (non-cascading) |

## Common flags

Most subcommands accept these:

| Flag | Description |
|---|---|
| `-o, --output PATH` | Write to file instead of stdout |
| `-n, --number N` | Scan number (for `scan`, `trailer`) |
| `--ppm FLOAT` | Mass tolerance for XIC and MS2 extraction (default 5.0) |

For Thermo-specific flags like `--filter-shoulders` and `--shoulder-ratio`, run `seed scan --help` or `seed xic --help` — they let you reproduce the .NET RawFileReader's centroid post-processing.

## Recipes

### 1 — Convert RAW to mzML

```bash
seed convert sample.RAW
# → sample.mzML in the same directory

seed convert sample.RAW -o /scratch/converted/sample.mzML
seed convert /data/study/                # folder mode, parallel across files
```

Compression and precision are tunable: `--mz-bits 64`, `--intensity-bits 32`, `--compression zlib|none`. See `seed convert --help` for the full surface, including `--no-index` for non-indexed mzML output.

### 2 — XIC extraction (single file)

```bash
# Several m/z values in a single scan pass:
seed xic sample.RAW --mz 524.2646,612.3401,445.1234 --ppm 5

# m/z values from a file (one per line):
seed xic sample.RAW --mz-file targets.txt --ppm 5 -o xics.csv

# By formula + adduct:
seed xic sample.RAW --formula C17H18FN7O7 --adduct "[M-H]-" --ppm 5

# Restrict to MS1 (much faster on DDA data):
seed xic sample.RAW --mz 524.26 --ms1-only
```

When you want extraction across many files into an aligned RT-grid tensor, use `batch-xic` (next recipe).

### 3 — Batch XIC across many files

```bash
# Single target across a folder:
seed batch-xic --files data/*.RAW --mz 524.26 --ppm 5 -o tensor.csv

# Many targets from a file:
seed batch-xic --files data/*.RAW --mz-file targets.txt --ppm 5 -o tensor.csv
```

Output is one CSV row per `(file, target, RT)` triple. For Python integration with NumPy tensors, use the [Python `batch_xic`](/seed/python-api#batch-xic-multi-file-extraction) — same algorithm, but returns a 3D `(n_samples, n_targets, n_timepoints)` `ndarray`.

### 4 — Quick file inspection and benchmark

```bash
seed info sample.RAW                     # summary metadata
seed devices sample.RAW                  # list instrument controllers
seed benchmark sample.RAW --xic --ops    # measure scan-decode + XIC perf
```

`seed benchmark` writes JSON to stdout; pipe to `jq` for human-readable output. Use `bench-concurrency` to find the optimal `--max-concurrent` value for your storage tier (SSD vs NAS vs SMB).

## Lifecycle and exit codes

`seed` subcommands exit `0` on success, `1` on parse errors, and `2` on I/O / validation failures. `seed validate` returns a non-zero status when the validation set diverges from ground truth.

<!-- Source: oxion-core/PUBLIC_README.md (CLI section); oxion-core/crates/seed-cli/src/main.rs -->
