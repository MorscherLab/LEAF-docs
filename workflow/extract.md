# Extract — Targeted

The **Extract** page configures and starts a targeted LC-MS processing run. This page documents the targeted workflow only.

> [Screenshot: full Extract view with parameters configured and compound list loaded]

## Layout

The Extract page has four working areas:

| Panel | Position | Purpose |
|-------|----------|---------|
| **Folder selector** | Left sidebar | Choose which RAW / mzML files to process |
| **Parameters sidebar** | Left sidebar | Retention-time search, peak picking, grouping, scoring, backend, and file-handling options |
| **Compound list editor** | Center | Upload, edit, and validate the metabolite list |
| **Tracing editor** | Right panel | Configure isotopologues for tracing experiments |

## Select files

### Local mode (CLI / desktop)

Click the folder selector and choose the folder containing `.raw`, `.mzml`, or `.mzml.gz` files. The file count appears next to the folder name.

### Server mode (MINT)

Server-mode folder browsing is reserved for the MINT integration, which is under development and not enabled for general use.

> [Screenshot: folder selector in both local and server modes]

## Upload the compound list

Drag and drop a CSV or TSV onto the upload zone, or click to browse. LEAF parses the file and shows the compounds in an editable table.

After uploading, click **Validate** to check for errors. Common issues include missing required columns, invalid formulas, invalid retention times, and duplicate compound-adduct combinations. Resolve errors before continuing.

LEAF auto-detects LEAF native (RFA), Skyline transition lists, and El-MAVEN peak tables / compound DBs based on header names.

→ [Compound list format](/workflow/prepare-data)

## Set parameters

### Acquisition

| Parameter | Default | Range | What it does |
|-----------|---------|-------|--------------|
| **Polarity** | AUTO | AUTO / NEG / POS | Match the LC-MS acquisition polarity. In targeted runs, AUTO currently resolves to NEG when the run is submitted. |
| **Mass tolerance** | 5 ppm | 1–50 ppm | EIC extraction window. Lower is stricter. The slider value is color-coded: green ≤5, yellow 5–15, red >15. |
| **Backend** | seed (Rust) on macOS / Linux; RawFileReader (.NET) on Windows | seed / RawFileReader | Underlying RAW reader. seed is faster on Thermo files; RawFileReader is the reference implementation. Unavailable backends are disabled in the selector. |

### Retention time

| Parameter | Default | Range | What it does |
|-----------|---------|-------|--------------|
| **RT window** | 0.4 min | 0.1–5.0 min | ± window around the expected RT to search for peaks |

The sidebar header summarizes the current setting, for example `RT ±0.4 min`.

## Peak picking

Keep peak picking enabled for routine targeted analyses.

### RT mode

| Mode | Behavior |
|------|----------|
| **Reference** *(default)* | Use the RT from the compound list as the search center |
| **Auto** | Auto-detect the RT from the EIC, ignoring the compound-list value |

Use **Auto** when the CSV contains approximate placeholder RTs and the peak location should be inferred from the chromatograms.

## Instrument settings and quality scoring

Keep quality scoring enabled for routine analyses. LEAF assigns each compound a verdict (good / warning / poor / insufficient_data) from the extracted chromatograms and configured instrument thresholds.

| Parameter | Default | What it means |
|-----------|---------|---------------|
| **SNR threshold** | 10 | Minimum signal-to-noise ratio used during quality review. Higher values are stricter. |
| **Intensity threshold** | 100,000 | Peak-picking noise floor. |
| **LOD (scoring)** | Auto | Limit of detection used by the scoring gate. Auto derives the value from the intensity threshold. |
| **Saturation flag** | Auto | Intensity level that triggers a non-blocking saturation warning. |

→ [Quality verdicts explained](/workflow/analyze#quality-info)

## File-handling toggles

| Toggle | Default | Effect |
|--------|---------|--------|
| **Organize names** | On | Strip date/timestamp prefixes from file names for clean grouping (e.g. `20240321_WT_rep1.raw` → `WT_rep1`). |
| **Skip blanks** | On | Skip files with `blank` (case-insensitive) in the name during extraction. |
| **MS² extraction** | On | Capture MS² spectra alongside MS¹ when present. This enables raw-spectrum and retention-time preview in Peak Picking. Enabling MS² automatically uses the SEED (Rust) backend. |

## Tracing (optional)

For isotope-labeling experiments, configure the **Tracing Editor** below the parameters before starting. See [Isotope tracing](/workflow/tracing).

## Start processing

Once the folder is selected and the compound list is valid, the **Start Processing** button is enabled. Click it to start the run.

A floating action button appears in the bottom-right corner:

| State | Meaning |
|-------|---------|
| Blue with spinner | Job running — shows % progress |
| Green with checkmark | Job done — click to download or open |
| Red with warning icon | Job failed — click for details |

> [Screenshot: floating action button cycling through states]

Click the button to open the jobs panel with progress, per-file status, and **Download** / **Open** options.

::: details Also from a script
Headless equivalent of this page:

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --polarity NEG --tolerance 5 --rt-window 0.4
```

→ [`leaf targeted` reference](/scripting/cli/targeted)
Or in Python: [Recipe 1 — Batch extraction](/scripting/python/recipes#recipe-1-batch-extraction-from-a-folder)
:::

## Next step

→ [Analyze results](/workflow/analyze)
