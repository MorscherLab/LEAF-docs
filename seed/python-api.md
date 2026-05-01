# SEED Python API

The Python module is `seed` (`import seed`).

## Installation

::: warning Public release status
The `pip install seed` wheel is currently unavailable while SEED prepares its 0.x public relaunch. Build from source until then.
:::

```bash
cd oxion-core/crates/seed-py
maturin develop --release
```

## Quick start

```python
import seed

# Auto-detect format from extension
reader = seed.open("sample.RAW")        # Thermo RAW
reader = seed.open("sample.mzML")       # mzML (plain or .gz)
reader = seed.open("sample.mzXML")      # mzXML
reader = seed.open("sample.lcd")        # Shimadzu LCD
reader = seed.open("sample.d")          # Bruker / Agilent / Waters
```

All format classes share the same core surface (`scan`, `tic`, `bpc`, `xic`, `xic_ms1`, `xic_batch`, plus metadata getters). Below documents `RawFile` explicitly; see [`MzmlFile`](#mzmlfile) for mzML-specific extras and [Other format classes](#other-format-classes) for `MzxmlFile`, `LcdFile`, `BrukerFile`, `WatersFile`.

```python
from seed import RawFile, MzmlFile, batch_xic, open

raw = RawFile("sample.RAW")
print(f"{raw.n_scans} scans, {raw.start_time:.2f}-{raw.end_time:.2f} min")

rt, intensity = raw.tic(scope="ms1")            # MS1 TIC
rt, intensity = raw.xic(760.5851, ppm=5.0)      # Single-target XIC
mzs, ints = raw.scan(1000)                      # Single scan
```

## `RawFile`

Primary entry point for reading Thermo RAW files.

### Constructor

```python
RawFile(path: str, mmap: bool = True)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | `str` | required | Path to `.RAW` file |
| `mmap` | `bool` | `True` | Use memory-mapped I/O. Pass `False` to read fully into memory (e.g. on Windows when you want the file handle released as soon as the reader is dropped) |

```python
raw = RawFile("sample.RAW")             # mmap=True by default
raw = RawFile("sample.RAW", mmap=False) # disable mmap
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `n_scans` | `int` | Total number of scans |
| `first_scan` | `int` | First scan number |
| `last_scan` | `int` | Last scan number |
| `start_time` | `float` | Acquisition start time (minutes) |
| `end_time` | `float` | Acquisition end time (minutes) |
| `instrument_model` | `str` | Instrument model name |
| `sample_name` | `str` | Sample name from file metadata |
| `version` | `int` | RAW file format version (57–66) |

### Chromatograms

#### `tic(scope: str = "all") -> (ndarray, ndarray)`

TIC (Total Ion Current) as `(rt, intensity)` arrays. Sub-millisecond; reads from scan index without decoding scans.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `scope` | `str` | `"all"` | `"all"` = all scans (vendor convention); `"ms1"` = MS1-only |

```python
rt, intensity = raw.tic()             # all scans
rt, intensity = raw.tic(scope="ms1")  # MS1 only
```

#### `bpc(scope: str = "all") -> (ndarray, ndarray)`

Base peak chromatogram. Same `scope` semantics as `tic`.

```python
rt, intensity = raw.bpc()
```

#### `xic(mz, ppm=5.0, progress=False) -> (ndarray, ndarray)`

Extracted ion chromatogram across all scans. Uses sum-per-scan aggregation (vendor convention: Xcalibur Genesis, Skyline, MzMine, OpenMS).

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mz` | `float` | required | Target m/z |
| `ppm` | `float` | `5.0` | Mass tolerance in ppm |
| `progress` | `bool` | `False` | Show tqdm progress bar |

```python
rt, intensity = raw.xic(760.5851, ppm=5.0)
```

#### `xic_ms1(mz, ppm=5.0, progress=False) -> (ndarray, ndarray)`

XIC restricted to MS1 scans only. Much faster for DDA data (skips 85–95% of scans).

#### `xic_batch(targets, enable_ms2=False, progress=False)`

Batch XIC for multiple targets in a single pass. Decodes each scan once for all targets.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `targets` | `list[(float, float)]` | required | `(mz, ppm)` tuples |
| `enable_ms2` | `bool` | `False` | If `True`, also collects fully-decoded MS2 scans whose precursor falls in any target window. Returns `(chromatograms, ms2_scans)` instead of just `chromatograms`. |
| `progress` | `bool` | `False` | Show tqdm progress bar |

```python
targets = [(760.5851, 5.0), (788.6164, 5.0), (810.6007, 10.0)]
results = raw.xic_batch(targets)
chroms, ms2 = raw.xic_batch(targets, enable_ms2=True)
```

For multi-file batch extraction across many samples, see [Batch XIC](#batch-xic-multi-file-extraction).

### Scans

#### `scan(scan_number) -> (ndarray, ndarray)`

Returns centroid `(mz, intensity)` for a single scan.

#### `scan_info(scan_number) -> ScanInfo`

Scan metadata without decoding peak arrays. See [`ScanInfo`](#scaninfo).

#### `all_ms1_scans(progress=False) -> list[(ndarray, ndarray)]`

Decodes all MS1 scans in parallel (rayon). Returns list of `(mz, intensity)` tuples.

#### `ms_level_of_scan(scan_number) -> int`

Returns MS level (1, 2, 3, …) for the given scan.

#### `is_ms2_scan(scan_number) -> bool`

True if the scan is MS2.

#### `scan_numbers_by_level(level: int) -> list[int]`

All scan numbers at a given MS level.

### MS2 / Precursor workflows

#### `ms2_scans_for_precursor(precursor_mz, tolerance_ppm=10.0) -> list[Ms2ScanInfo]`

Metadata-only lookup: finds MS2 scans whose precursor m/z matches, without decoding peaks.

#### `ms2_spectra_for_precursor(precursor_mz, tolerance_ppm=10.0) -> list[PyMs2Scan]`

Same filter as above, but fully decodes the matched spectra in parallel. Each `PyMs2Scan` bundles metadata (`rt`, `precursor_mz`, `collision_energy`, `activation`, …) with NumPy arrays (`mz_array`, `intensity_array`).

#### `ms2_scans_for_windows(windows: list[(float, float)]) -> list[PyMs2Scan]`

Batch extraction: MS2 scans whose precursor m/z falls in any of the given `(mz_low, mz_high)` windows. Each scan appears at most once even if its precursor lies in multiple windows. Decoding runs in parallel via rayon.

```python
# DIA: one window per isolation bin
windows = [(400.0, 410.0), (410.0, 420.0), (420.0, 430.0)]
scans = raw.ms2_scans_for_windows(windows)
for s in scans:
    print(s.rt, s.precursor_mz, len(s.mz_array))
```

#### `isolation_windows() -> list[IsolationWindow]`

Unique DIA isolation windows sorted by center m/z.

#### `scans_for_window(window) -> list[Ms2ScanInfo]`

MS2 scans belonging to a specific isolation window.

#### `xic_ms2_window(mz, ppm, window) -> (ndarray, ndarray)`

XIC within a specific isolation window (DIA workflows).

#### `acquisition_type() -> str`

Classifies the run as `"ms1_only"`, `"dda"`, `"dia"`, `"mrm"`, or `"mixed"`.

#### `precursor_list() -> ndarray`

Sorted, deduplicated precursor m/z values as a NumPy array.

#### `parent_ms1_scan(scan_number) -> int | None`

Returns the scan number of the survey MS1 that preceded this MS2 scan.

### Trailer & device data

#### `trailer_extra(scan_number) -> dict[str, str]`
#### `trailer_fields() -> list[str]`
#### `status_log_fields() -> list[str]`
#### `status_log(field_name) -> (ndarray, ndarray)`
#### `devices() -> list[PyDeviceInfo]`
#### `device_tic(device_type, device_index=0) -> (ndarray, ndarray)`

`device_type` is one of `"ms"`, `"msanalog"`, `"analog"`, `"uv"`, `"pda"`, `"other"` (case-insensitive).

## `MzmlFile`

Reads `.mzML` and `.mzML.gz`. Constructor: `MzmlFile(path: str, mmap: bool = True)`.

Same core surface as `RawFile` (`tic` / `bpc` / `xic` / `xic_ms1` / `xic_batch` with `scope` on TIC/BPC, same MS2 workflows), plus:

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `has_index` | `bool` | `True` if the file had an embedded `indexedmzML` index |
| `n_chromatograms` | `int` | Number of embedded chromatograms (TIC, BPC, SRM, …) |

### Chromatogram access

#### `chromatogram(index: int) -> (ndarray, ndarray)`

Read an embedded chromatogram by its index (0-based) within the `<chromatogramList>`.

#### `chromatogram_by_id(id: str) -> (ndarray, ndarray)`

Read an embedded chromatogram by its `id` string (e.g., `"TIC"`, `"BPC"`, or a `SRM SIC 123.45`-style transition id).

```python
mz = MzmlFile("sample.mzML")
print(f"{mz.n_chromatograms} embedded chromatograms")
rt, intensity = mz.chromatogram_by_id("TIC")
```

## Other format classes

| Class | Path target | Constructor | Notes |
|---|---|---|---|
| `MzxmlFile` | `.mzXML` | `MzxmlFile(path, mmap=True)` | Same shape as `MzmlFile`, no chromatogram store; adds `instrument_name` |
| `LcdFile` | Shimadzu `.lcd` | `LcdFile(path)` | Adds `n_events`, `event_chromatogram(event_idx)`, `events()` |
| `BrukerFile` | Bruker `.d/` | `BrukerFile(path)` | Adds `serial_number`, `software_version`, `creation_date`, `has_ion_mobility()` |
| `WatersFile` | Waters `.raw/` | `WatersFile(path)` | Adds `creation_date`, `has_ion_mobility()` |

`LcdFile`, `BrukerFile`, and `WatersFile` use vendor-specific I/O paths (SQLite for Bruker, parsed streams for LCD, vendor directory layout for Waters) and do not accept an `mmap` parameter.

All four expose the same core methods as `RawFile`/`MzmlFile`: `scan`, `scan_info`, `tic`, `bpc`, `xic`, plus `acquisition_type()` for MS-aware classes.

## Type reference

### `ScanInfo`

Scan metadata object returned by `RawFile.scan_info()` / `MzmlFile.scan_info()`. All fields are read-only.

| Field | Type | Description |
|-------|------|-------------|
| `scan_number` | `int` | Scan number |
| `rt` | `float` | Retention time (minutes) |
| `ms_level` | `int` | MS level (1, 2, 3, …) |
| `polarity` | `str` | `"positive"`, `"negative"`, or `"unknown"` |
| `tic` | `float` | Total ion current |
| `base_peak_mz` | `float` | Base peak m/z |
| `base_peak_intensity` | `float` | Base peak intensity |
| `filter_string` | `str \| None` | Thermo filter string |
| `precursor_mz` | `float \| None` | Precursor m/z (MS2+ only) |
| `precursor_charge` | `int \| None` | Precursor charge (MS2+ only) |

### `PyMs2Scan`

MS2 scan bundled with decoded peaks, returned by `ms2_scans_for_windows` and `ms2_spectra_for_precursor`.

| Field | Type | Description |
|-------|------|-------------|
| `scan_number` | `int` | Scan number |
| `rt` | `float` | Retention time (minutes) |
| `precursor_mz` | `float` | Precursor m/z |
| `isolation_width` | `float` | Isolation width (Da) |
| `collision_energy` | `float` | Collision energy |
| `activation` | `str` | `"HCD"`, `"CID"`, `"ETD"`, … |
| `scan_event_index` | `int` | Scan event index (RAW only; 0 for mzML) |
| `tic` | `float` | Total ion current |
| `mz_array` | `ndarray` | Centroid m/z values |
| `intensity_array` | `ndarray` | Centroid intensities |

## Batch XIC — multi-file extraction

Use this API when you need aligned XICs from many files. It returns a single tensor of shape `(n_samples, n_targets, n_timepoints)` that can go directly into downstream analysis (peak picking, alignment, quantification).

### Why a separate API

Extracting XICs from a single file is straightforward — open, walk MS1 scans, filter by m/z, return. Doing this across hundreds of files creates two problems:

**Memory.** A naive implementation opens all files simultaneously and accumulates results in memory. For a typical proteomics run — 200 files × 2,000 peptide targets × 5,000 RT points × 8 bytes — the output tensor alone exceeds 15 GB. Add open file buffers and you exceed available RAM.

**Reliability.** Files served from NAS or SMB shares can stall a read for minutes on a dropped packet. A blocking read in a worker thread locks the entire rayon thread pool.

The batch XIC API solves both with a two-pass design and per-file timeouts. Files are processed in chunks bounded by `max_concurrent`, so peak memory scales with concurrency rather than total sample count.

### Quick start

```python
import seed
import numpy as np

files = [
    "/data/study/sample_001.raw",
    "/data/study/sample_002.raw",
    "/data/study/sample_003.raw",
]

# Targets: list of (center_mz, ppm_tolerance) tuples
targets = [
    (524.2646, 5.0),   # peptide A [M+2H]2+
    (612.3401, 5.0),   # peptide B [M+2H]2+
    (445.1234, 10.0),  # metabolite C [M+H]+
]

tensor, rt_grid, sample_names = seed.batch_xic(files, targets)

# tensor.shape == (3, 3, n_timepoints)
# tensor[sample_idx, target_idx, :] is the XIC trace

# Slice out peptide A across all samples
peptide_a = tensor[:, 0, :]   # shape (3, n_timepoints)

# Find the peak apex RT for peptide A in sample 1
apex_rt = rt_grid[np.argmax(peptide_a[0])]
print(f"Sample 1 peptide A apex: {apex_rt:.3f} min")
```

### Half-memory extraction (`use_f32=True`)

Use `use_f32=True` when working with large cohorts. Intensity values are cast from f64 to f32 after interpolation; the m/z coordinates (targets) and RT grid remain f64. The output NumPy array has dtype `float32` — half the memory of the default f64 path.

```python
tensor, rt_grid, sample_names = seed.batch_xic(
    files,
    targets,
    use_f32=True,
)
```

### Restricting the RT window

Pass `rt_range=(start_min, end_min)` to extract only a portion of the chromatogram. The RT grid is computed from the intersection of the requested range and the data range common to all files.

```python
tensor, rt_grid, sample_names = seed.batch_xic(
    files,
    targets,
    rt_range=(5.0, 60.0),   # minutes
    rt_resolution=0.005,    # 0.005 min grid spacing; 0.0 = auto from scan density
)
```

### Progress reporting

`progress=True` uses tqdm if installed. For custom integrations, pass a callable to `progress_callback`; it is called with `(completed: int, total: int)` after each file.

```python
tensor, rt_grid, sample_names = seed.batch_xic(
    files,
    targets,
    progress=True,
)
```

### Architecture: two-pass design

```
Pass 1 — Prescan (mmap, sequential, lightweight)
  For each file:
    - Open with RawFile::open_mmap()
    - Read ms1_retention_times() from the scan index (no scan decoding)
    - Collect (first_rt, last_rt, median_rt_delta) per file
  Compute:
    - RT grid = intersection of all files' MS1 RT ranges (or user-specified range)
    - Resolution = min(median_rt_delta across files) or user-specified value
    - Build uniform RT grid vector

Pass 2 — Extraction (parallel within each chunk)
  For each chunk of max_concurrent files (in parallel via rayon):
    - Open file (RawFile::open — full read into memory)
    - Extract all target XICs in one pass (xic_batch)
    - Interpolate each chromatogram onto the common RT grid
    - Write into the pre-allocated output tensor
    - Drop file from memory
  Next chunk starts only after the current chunk is complete
```

The key property is that at most `max_concurrent` files are open simultaneously. The output tensor is pre-allocated in full before extraction begins, but no raw file data beyond the current chunk is resident.

**Interpolation** is linear between adjacent MS1 scan points. Timepoints outside a file's RT range are written as 0.0. This is intentional: boundary zeros are distinguishable from real signal and do not affect retention-time intersection logic.

**Timeout mechanism.** Each file in a chunk is dispatched to a dedicated OS thread (not a rayon thread) via `std::thread::spawn`. The rayon worker calls `mpsc::Receiver::recv_timeout`. If the read does not complete within `timeout_secs`, the rayon worker moves on and the stalled thread eventually unblocks and exits. This ensures NAS stalls cannot exhaust the thread pool.

### Memory model

Peak memory during extraction is bounded by:

```
peak_bytes ≈ (n_samples × n_targets × n_timepoints × dtype_bytes)    # output tensor
           + (max_concurrent × avg_file_bytes)                         # open file buffers
           + (max_concurrent × n_targets × n_timepoints × 8)          # per-file chrom buffers
```

Where `dtype_bytes` is 8 for f64 (default) or 4 for f32 (`use_f32=True`).

#### Example: 200-sample metabolomics run

| Parameter | Value |
|-----------|-------|
| Files | 200 |
| Targets | 2,000 |
| RT grid (5 s resolution, 90 min) | ~1,080 timepoints |
| Average file size | 800 MB |
| `max_concurrent` | 4 |

```
Output tensor (f64):  200 × 2000 × 1080 × 8 = 3.46 GB
Output tensor (f32):  200 × 2000 × 1080 × 4 = 1.73 GB

Per-chunk file buffers:  4 × 800 MB = 3.2 GB
Per-chunk chrom buffers: 4 × 2000 × 1080 × 8 = 69 MB

Total peak (f64): ~6.7 GB
Total peak (f32): ~5.0 GB
```

Reducing `max_concurrent` from 4 to 1 drops chunk overhead from 3.2 GB to 800 MB at the cost of longer runtime.

#### Choosing `max_concurrent`

- **SSD (NVMe / SATA):** I/O is rarely the bottleneck. Start with `max_concurrent = cpu_count / 2`. Run [`seed bench-concurrency`](/seed/cli#4-quick-file-inspection-and-benchmark) to verify.
- **NAS / SMB / CIFS:** I/O is almost always the bottleneck. Start with `max_concurrent = 2`. Higher values increase contention without reducing wall time.
- **`max_concurrent = 0` (default):** Auto-selects `min(available_cpus, 4)`. Conservative — appropriate for NAS.

#### Choosing `rt_resolution`

`rt_resolution = 0.0` (default) measures the median inter-scan interval across all files and uses the smallest value found. This ensures no MS1 scan is lost to sub-Nyquist sampling. For Orbitrap data with ~250 ms cycle times the auto value is typically ~0.004 min. For faster methods it will be smaller; for slower ones, larger.

Setting an explicit value larger than the native cycle time will alias peaks. Setting it much smaller than necessary increases tensor size without adding information.

### `seed.batch_xic` reference

```python
def batch_xic(
    file_paths: list[str],
    targets: list[tuple[float, float]],
    rt_range: tuple[float, float] | None = None,
    rt_resolution: float = 0.01,
    progress: bool = False,
    progress_callback: Callable[[int, int], None] | None = None,
    max_concurrent: int = 0,
    use_f32: bool = False,
    timeout_secs: int = 120,
    io_strategy: str | None = None,
    enable_ms2: bool = False,
    enable_tic: bool = False,
)
```

Auto-detects format from the first file's extension (`.raw`, `.mzml` / `.mzml.gz`). All files in a single call must be the same format.

| Parameter | Type | Default | Description |
|------|------|---------|-------------|
| `file_paths` | `list[str]` | required | Mix of RAW and mzML paths OK |
| `targets` | `list[(float, float)]` | required | `(mz, ppm)` tuples |
| `rt_range` | `(float, float) \| None` | `None` | Optional RT window in minutes |
| `rt_resolution` | `float` | `0.01` | Grid spacing in minutes; `0.0` auto-detects from scan density |
| `progress` | `bool` | `False` | Show tqdm progress bar (requires tqdm installed) |
| `progress_callback` | `Callable \| None` | `None` | Called with `(n_completed, n_total)` after each file |
| `max_concurrent` | `int` | `0` | Max files open simultaneously; `0` = auto (`min(cpu_count, 4)`) |
| `use_f32` | `bool` | `False` | Return `float32` tensor (half memory) |
| `timeout_secs` | `int` | `120` | Per-file read timeout in seconds; `0` disables |
| `io_strategy` | `str \| None` | `None` | Override auto-detected storage strategy (`"parallel"` or `"sequential"`) |
| `enable_ms2` | `bool` | `False` | Also return per-file MS2 scans whose precursor falls in any target window. **RAW files only.** |
| `enable_tic` | `bool` | `False` | Also return a `(n_samples, n_timepoints)` TIC matrix on the same grid. **RAW files only.** |

**Returns** — tensor shape is `(n_samples, n_targets, n_timepoints)`:

| Flags | Tuple shape |
|---|---|
| Default | `(tensor, rt_grid, sample_names)` |
| `enable_tic=True` | `(tensor, rt_grid, sample_names, tic_matrix)` |
| `enable_ms2=True` | `(tensor, rt_grid, sample_names, ms2_per_file)` |
| Both | `(tensor, rt_grid, sample_names, tic_matrix, ms2_per_file)` |

Files that fail to open or time out are skipped with a warning printed to stderr. `n_samples` in the returned tensor reflects only successful files.

### Streaming API — full memory control

When you need to process files one at a time (e.g., to write results incrementally to disk), use the two-step streaming API instead of `batch_xic`.

```python
import seed
import numpy as np

files = ["/data/study/sample_001.raw", "/data/study/sample_002.raw"]
targets = [(524.2646, 5.0), (612.3401, 5.0)]

# Step 1: prescan to establish the common RT grid
rt_grid, valid_paths, sample_names = seed.prescan_batch_xic(
    files,
    rt_range=(2.0, 90.0),  # optional
)

# Step 2: process each file independently
results = {}
for path, name in zip(valid_paths, sample_names):
    # shape: (n_targets, n_timepoints), dtype float32 by default
    xic_matrix = seed.extract_xic_onto_grid(path, targets, rt_grid)
    results[name] = xic_matrix
    # or: write to HDF5 / parquet here and discard from RAM
```

#### `seed.prescan_batch_xic` reference

```python
def prescan_batch_xic(
    file_paths: list[str],
    rt_range: tuple[float, float] | None = None,
    rt_resolution: float = 0.0,
) -> tuple[np.ndarray, list[str], list[str]]
```

Lightweight pass-1 prescan. Opens each file via mmap, reads only the MS1 scan-index metadata (no peak data), and computes the common RT grid.

Returns `(rt_grid, valid_file_paths, sample_names)`. Files that fail to open are dropped from `valid_file_paths` and `sample_names`. `rt_resolution=0.0` uses each file's native median spacing.

#### `seed.extract_xic_onto_grid` reference

```python
def extract_xic_onto_grid(
    file_path: str,
    targets: list[tuple[float, float]],
    rt_grid: list[float] | np.ndarray,
    use_f32: bool = True,
) -> np.ndarray
```

Extract XICs from a single file and interpolate them onto a pre-computed RT grid. Returns `(n_targets, n_timepoints)`.

Intended for use in a loop after `prescan_batch_xic`. Because each call opens and closes exactly one file, the caller has full control over concurrency and memory.

### NAS and network storage tips

Files on NAS, CIFS / SMB shares, or remote SFTP mounts behave differently from local SSDs.

**Stalls.** A dropped network packet or overloaded server can cause a `read()` syscall to block for minutes. The per-file timeout (`timeout_secs`) spawns each file read in a dedicated OS thread and uses `recv_timeout` in the rayon worker. A stalled file is skipped after the timeout; the thread eventually unblocks and exits. Set the timeout to match your network's typical worst-case latency, not the expected read time.

**Concurrency.** NAS throughput rarely scales past 2–4 parallel readers. Beyond that, additional readers compete for the same uplink and slow each other down. Run [`seed bench-concurrency`](/seed/cli#4-quick-file-inspection-and-benchmark) from the analysis host with `--mmap` to measure this directly.

**mmap vs. read.** Memory-mapped I/O (`open_mmap`) is faster on local SSDs because the OS pre-fetches pages. On network shares, mmap may perform worse because page faults are handled one at a time. The `--mmap` flag in `bench-concurrency` lets you compare directly.

**Failed files.** Files that fail to open during the prescan are excluded from the RT grid computation and the output tensor. Files that fail during extraction (including timeouts) are excluded from the tensor with a warning to stderr. The `sample_names` vector in the result corresponds exactly to the files that succeeded.

**Copy first when possible.** For jobs over hundreds of files, copying to local NVMe storage before extraction eliminates network variability entirely. Use `rsync -a` or similar; SEED has no built-in copy facility.

<!-- Source: oxion-core/docs/python-api.md and oxion-core/docs/batch-xic.md -->
