# SEED Rust API

Embed SEED in a Rust application via the `seed` crate. The crate is format-agnostic at the trait level (`MsReader`) with format-specific entry points underneath.

::: warning Public release status
SEED's crate is not yet published to crates.io. Until the public 0.x release, depend on it via git or path.
:::

## Add the dependency

```toml
[dependencies]
seed = { git = "https://github.com/EstrellaXD/oxion-core", default-features = false, features = ["raw", "mzml"] }
```

| Feature | Pulls in | Required for |
|---------|----------|--------------|
| `raw` | Thermo RAW parser | `RawFile`, `seed::open(*.raw)` |
| `mzml` | mzML reader | `MzMLFile`, `seed::open(*.mzML)` |
| `convert` | RAW → mzML conversion | `seed::convert::*` |

The default feature set in the upstream `Cargo.toml` is `["raw", "mzml", "convert"]`. Disable defaults if you only need one format.

## Quick start

```rust
use seed::{open, MsReader};
use std::path::Path;

fn main() -> anyhow::Result<()> {
    // Auto-detect format from path
    let reader: Box<dyn MsReader> = open(Path::new("sample.RAW"))?;

    println!("{} scans, {:.2}-{:.2} min",
        reader.n_scans(), reader.start_time(), reader.end_time());

    let tic = reader.tic()?;
    let xic = reader.xic(760.5851, 5.0)?;

    Ok(())
}
```

## Format-agnostic entry points

```rust
pub fn open(path: impl AsRef<Path>) -> Result<Box<dyn MsReader>, MsError>
pub fn open_mmap(path: impl AsRef<Path>) -> Result<Box<dyn MsReader>, MsError>
```

Auto-detect by extension or directory layout (`.raw`, `.mzML`, `.mzML.gz`, `.mzXML`, `.lcd`, `.d` for Bruker / Agilent / Waters). Returns a trait object so the caller code is format-agnostic.

`open_mmap` uses memory-mapped I/O — faster on local SSDs for large files. The two return identical types and are interchangeable at the call site.

## `MsReader` trait

The format-agnostic interface. All vendor-specific reader types implement it.

```rust
pub trait MsReader: Send + Sync {
    fn scan(&self, scan_number: u32) -> Result<Scan, MsError>;
    fn n_scans(&self) -> u32;
    fn first_scan(&self) -> u32;
    fn last_scan(&self) -> u32;
    fn start_time(&self) -> f64;       // minutes
    fn end_time(&self) -> f64;         // minutes

    // Chromatograms
    fn tic(&self) -> Result<Chromatogram, MsError>;
    fn bpc(&self) -> Result<Chromatogram, MsError>;
    fn xic(&self, mz: f64, ppm: f64) -> Result<Chromatogram, MsError>;
    fn xic_ms1(&self, mz: f64, ppm: f64) -> Result<Chromatogram, MsError>;
    fn xic_batch(
        &self,
        targets: &[(f64, f64)],
        enable_ms2: bool,
    ) -> Result<(Vec<Chromatogram>, Vec<(Ms2ScanInfo, Scan)>), MsError>;

    // Variants with explicit scope, I/O strategy, or progress counter:
    //   tic_with_scope, bpc_with_scope, xic_with_strategy,
    //   xic_ms1_with_strategy, xic_batch_with_strategy,
    //   xic_with_progress, xic_ms1_with_progress
    // (default impls forward to the simple versions)

    // Metadata
    fn metadata(&self) -> &FileMetadata;
}
```

For format-specific functionality (Thermo trailer access, mzML chromatogram lookup, Bruker ion mobility, etc.) downcast the `Box<dyn MsReader>` to the concrete type — see the per-format sections below.

## `RawFile` (Thermo)

```rust
use seed::RawFile;

let raw = RawFile::open("sample.RAW")?;
let raw = RawFile::open_mmap("sample.RAW")?;  // ~2x faster for large files
```

In addition to the `MsReader` surface, `RawFile` exposes:

```rust
impl RawFile {
    pub fn version(&self) -> u32                                  // 57-66
    pub fn low_mass(&self) -> f64
    pub fn high_mass(&self) -> f64
    pub fn file_size(&self) -> usize

    pub fn scans_parallel(&self, range: Range<u32>) -> Result<Vec<Scan>, RawError>
    pub fn is_ms1_scan(&self, scan_idx: u32) -> bool

    pub fn trailer_extra(&self, scan_number: u32) -> Result<HashMap<String, String>, RawError>
    pub fn trailer_fields(&self) -> Vec<String>

    pub fn scan_index(&self) -> &[ScanIndexEntry]
    pub fn scan_events(&self) -> &[ScanEvent]
    pub fn run_header(&self) -> &RunHeader

    pub fn debug_info(&self) -> DebugInfo
    pub fn list_streams(path: impl AsRef<Path>) -> Result<Vec<String>, RawError>
}
```

```rust
let scan = raw.scan(1)?;
println!("RT={:.2} MS{:?} {} peaks",
    scan.rt, scan.ms_level, scan.centroid_mz.len());

let scans = raw.scans_parallel(1..1001)?;
let ms1_count = scans.iter().filter(|s| s.ms_level == seed::MsLevel::Ms1).count();
```

### Stage-by-stage diagnostics

```rust
use seed::{diagnose, DiagnosticReport};

let data = std::fs::read("sample.RAW")?;
let report: DiagnosticReport = diagnose(&data);
report.print();   // tests magic, FileHeader, RawFileInfo, RunHeader, ScanIndex,
                  //       TrailerLayout, first scan decode — non-cascading
```

Useful for triaging a file SEED won't open — each stage's `success: bool` and `detail: String` are independently inspectable.

## Other format readers

| Type | Path target | Constructor | Notes |
|---|---|---|---|
| `MzMLFile` | `.mzML`, `.mzML.gz` | `MzMLFile::open(path)` | Adds chromatogram lookup (`chromatogram_by_id`); has `n_chromatograms` and `has_index` |
| `MzXMLFile` | `.mzXML` | `MzXMLFile::open(path)` | Same shape as mzML, no chromatogram store |
| `LcdFile` | Shimadzu `.lcd` | `LcdFile::open(path)` | Adds `n_events`, `event_chromatogram(event_idx)` |
| `BrukerFile` | Bruker `.d/` | `BrukerFile::open(path)` | SQLite-backed (TDF / TSF); adds ion mobility metadata |
| `AgilentFile` | Agilent `.d/` | `AgilentFile::open(path)` | Vendor directory layout |
| `WatersFile` | Waters `.raw/` | `WatersFile::open(path)` | MassLynx; adds creation date, ion mobility flag |
| `SciexFile` | Sciex `.wiff` | `SciexFile::open(path)` | Metadata only as of 0.x |

All implement `MsReader`. Non-RAW types do not accept an `mmap` parameter (they use vendor-specific I/O).

## Core types

```rust
pub struct Scan {
    pub scan_number: u32,
    pub rt: f64,                              // minutes
    pub ms_level: MsLevel,
    pub polarity: Polarity,
    pub tic: f64,
    pub base_peak_mz: f64,
    pub base_peak_intensity: f64,
    pub centroid_mz: Vec<f64>,
    pub centroid_intensity: Vec<f64>,
    pub profile_mz: Option<Vec<f64>>,
    pub profile_intensity: Option<Vec<f64>>,
    pub precursor: Option<PrecursorInfo>,
    pub filter_string: Option<String>,
}

pub struct Chromatogram {
    pub rt: Vec<f64>,
    pub intensity: Vec<f64>,
}

pub struct FileMetadata {
    pub creation_date: String,
    pub instrument_model: String,
    pub instrument_name: String,
    pub serial_number: String,
    pub software_version: String,
    pub sample_name: String,
    pub comment: String,
}

pub struct PrecursorInfo {
    pub mz: f64,
    pub charge: Option<i32>,
    pub isolation_width: Option<f64>,
    pub activation_type: Option<String>,
    pub collision_energy: Option<f64>,
}
```

All derive `Debug`, `Clone`, `Serialize`, `Deserialize`.

## Enums

```rust
pub enum MsLevel  { Ms1, Ms2, Ms3, Other(u8) }
pub enum Polarity { Positive, Negative, Unknown }
pub enum ScanMode { Centroid, Profile, Unknown }
pub enum ScanType { Full, Zoom, Sim, Srm, Crm, Q1Ms, Q3Ms, Unknown(u8) }

pub enum AnalyzerType {
    Itms,    // Ion Trap
    Tqms,    // Triple Quad
    Sqms,    // Single Quad
    Tofms,   // Time of Flight
    Ftms,    // Orbitrap / FT
    Sector,
    Any,
    Astms,   // Advanced Segmented Trap
    Unknown(u8),
}

pub enum IonizationType {
    Ei, Ci, Fab, Esi, Apci, Nsi, Tsi, Fdi, Maldi, Gd, Any, Psi, Cnsi, Unknown(u8),
}

pub enum ActivationType {
    Cid, Mpd, Ecd, Pqd, Etd, Hcd, Any, Sa, Ptr, Netd, Nptr, Uvpd, Eid, Unknown(u8),
}
```

All derive `Debug`, `Clone`, `Copy`, `PartialEq`, `Eq`, `Serialize`, `Deserialize`.

## Batch processing

The Rust analogues to the Python `batch_xic` family. See [Python — Batch XIC](/seed/python-api#batch-xic-multi-file-extraction) for the design rationale (two-pass, NAS-aware, memory-bounded).

```rust
use seed::{
    batch_xic_ms1, batch_xic_ms1_f32,
    batch_xic_ms1_configured, batch_xic_ms1_f32_configured,
    batch_xic_ms1_with_progress, batch_xic_ms1_f32_with_progress,
    prescan_rt_grid, extract_xic_onto_grid, extract_xic_onto_grid_f32,
    BatchConfig, BatchXicResult, BatchXicResultF32, PreScanResult,
};
```

### `BatchConfig`

```rust
#[derive(Clone, Debug)]
pub struct BatchConfig {
    pub rt_range: Option<(f64, f64)>,
    pub rt_resolution: f64,
    pub max_concurrent: usize,
    pub timeout_secs: u64,
}
```

`BatchConfig::default()` sets `max_concurrent = 0` (auto) and `timeout_secs = 120`.

### `BatchXicResult` / `BatchXicResultF32`

```rust
pub struct BatchXicResult {
    pub rt_grid: Vec<f64>,
    pub data: Vec<f64>,         // flat: [sample][target][timepoint]
    pub sample_names: Vec<String>,
    pub n_samples: usize,
    pub n_targets: usize,
    pub n_timepoints: usize,
}

impl BatchXicResult {
    pub fn get(&self, sample: usize, target: usize) -> &[f64]
}
```

`BatchXicResultF32` is identical with `data: Vec<f32>` and `get` returning `&[f32]`.

The flat layout is row-major: `data[sample * n_targets * n_timepoints + target * n_timepoints + t]` is the intensity at RT index `t`. Use `.get(sample, target)` for a bounds-safe slice.

### Common entry points

```rust
pub fn batch_xic_ms1(
    paths: &[&Path],
    targets: &[(f64, f64)],
    rt_range: Option<(f64, f64)>,
    rt_resolution: f64,
    max_concurrent: usize,
) -> Result<BatchXicResult, RawError>
```

Convenience wrapper using `DEFAULT_TIMEOUT_SECS = 120`. The `_f32` variant returns `BatchXicResultF32`.

```rust
pub fn batch_xic_ms1_configured(
    paths: &[&Path],
    targets: &[(f64, f64)],
    config: &BatchConfig,
    counter: Option<&ProgressCounter>,
) -> Result<BatchXicResult, RawError>
```

Full control variant. Pass a `ProgressCounter` from `seed::new_counter()` to receive per-file completion events for custom progress UI.

```rust
use seed::{new_counter, batch_xic_ms1_configured, BatchConfig};
use std::path::Path;

let paths: Vec<&Path> = files.iter().map(Path::new).collect();
let targets = vec![(524.2646_f64, 5.0_f64), (612.3401, 5.0)];

let config = BatchConfig {
    rt_range: Some((2.0, 90.0)),
    rt_resolution: 0.005,
    max_concurrent: 4,
    timeout_secs: 120,
};

let counter = new_counter();
let result = batch_xic_ms1_configured(&paths, &targets, &config, Some(&counter))?;

let trace = result.get(0, 1);   // sample 0, target 1
```

### Streaming variants

```rust
pub fn prescan_rt_grid(
    paths: &[&Path],
    rt_range: Option<(f64, f64)>,
    rt_resolution: f64,
) -> Result<PreScanResult, RawError>

pub struct PreScanResult {
    pub rt_grid: Vec<f64>,
    pub valid_paths: Vec<PathBuf>,
    pub sample_names: Vec<String>,
}

pub fn extract_xic_onto_grid(
    path: &Path,
    targets: &[(f64, f64)],
    rt_grid: &[f64],
) -> Result<Vec<f64>, RawError>

pub fn extract_xic_onto_grid_f32(
    path: &Path,
    targets: &[(f64, f64)],
    rt_grid: &[f64],
) -> Result<Vec<f32>, RawError>
```

`prescan_rt_grid` opens each file with `RawFile::open_mmap`, reads only `ms1_retention_times()` from the scan index, and computes the common RT grid. Errors if all files fail to open or there is no overlapping RT range across the valid files.

`extract_xic_onto_grid[_f32]` opens a single file with `RawFile::open`, runs `xic_batch`, and interpolates each chromatogram onto `rt_grid`. Returns a flat row-major vector of length `n_targets × n_timepoints`.

```rust
use seed::{prescan_rt_grid, extract_xic_onto_grid_f32};
use std::path::Path;

let paths: Vec<&Path> = files.iter().map(Path::new).collect();
let targets = vec![(524.2646_f64, 5.0_f64)];

let prescan = prescan_rt_grid(&paths, None, 0.0)?;

for (path, name) in prescan.valid_paths.iter().zip(&prescan.sample_names) {
    let data = extract_xic_onto_grid_f32(path, &targets, &prescan.rt_grid)?;
    let n_tp = prescan.rt_grid.len();
    let trace = &data[0..n_tp];
    println!("{}: max intensity {:.0}", name,
        trace.iter().cloned().fold(0.0f32, f32::max));
}
```

## Error handling

```rust
pub enum MsError {
    Raw(RawError),
    MzML(MzMLError),
    Io(std::io::Error),
    UnsupportedFormat(String),
}

pub enum RawError {
    Io(std::io::Error),
    NotRawFile,
    UnsupportedVersion(u32),
    StreamNotFound(String),
    ScanOutOfRange(u32),
    ScanDecodeError { offset: usize, reason: String },
    CorruptedData(String),
    CfbError(String),
}
```

Both implement `std::error::Error` via `thiserror`. The `MsReader` trait returns `MsError`; format-specific functions return their format-specific error type.

## Version support

```rust
pub const MIN_SUPPORTED_VERSION: u32 = 57;
pub const MAX_SUPPORTED_VERSION: u32 = 66;
pub const FINNIGAN_MAGIC: u16 = 0xA101;

pub fn is_supported(version: u32) -> bool
pub fn scan_index_entry_size(version: u32) -> usize    // 72, 80, or 88 bytes
pub fn uses_64bit_addresses(version: u32) -> bool       // true for v64+
```

Versions cover modern Thermo instruments (LTQ, Orbitrap, Q Exactive, Exploris, Astral). The version dispatch is centralized; if a future version drops, only `version.rs` needs to change.

## Generated reference

This page covers the surface — what types and functions exist and what shape they have. For the full method-by-method reference (every parameter, every return type, every doc comment) generate locally:

```bash
cd /path/to/oxion-core
cargo doc --open -p seed
```

This launches the rustdoc in your browser, served from `target/doc/seed/index.html`.

<!-- Source: oxion-core/docs/rust-api.md (rewritten against current public surface in oxion-core/crates/seed/src/lib.rs and reader.rs); oxion-core/docs/batch-xic.md (Rust API section) -->
