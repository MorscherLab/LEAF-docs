# Extract — Targeted

The **Extract** page is where you configure parameters and launch a targeted processing run. For untargeted mode (no compound list), see [Extract — Untargeted](/workflow/extract-untargeted).

The page has a **Targeted / Untargeted** toggle at the top; this guide covers the Targeted side.

> [Screenshot: full Extract view with parameters configured and compound list loaded]

## Layout

The Extract page has four panels:

| Panel | Position | Purpose |
|-------|----------|---------|
| **Folder selector** | Top-left | Choose which RAW / mzML files to process |
| **Compound list editor** | Center | Upload, edit, and validate your metabolite list |
| **Parameters sidebar** | Right | Acquisition, RT, peak picking, scoring, advanced |
| **Tracing editor** | Right (below parameters) | Configure isotopologues for tracing experiments |

## Select files

### Local mode (CLI / desktop)

Click the folder selector and choose the folder containing your `.raw` or `.mzml` files. The file count appears next to the folder name.

### Server mode (MINT)

Search and select folders from the list shown by the lab MINT instance. Use the checkboxes to pick multiple folders at once.

> [Screenshot: folder selector in both local and server modes]

## Upload your compound list

Drag and drop your CSV or TSV onto the upload zone, or click to browse. LEAF parses it and shows the compounds in an editable table.

After uploading, click **Validate** to check for errors. Common issues (missing required columns, invalid formulas, duplicate compound + adduct combinations) appear as warnings — fix them before continuing.

LEAF auto-detects LEAF native (RFA), Skyline transition lists, and El-MAVEN peak tables / compound DBs based on header names.

→ [Compound list format](/workflow/prepare-data)

## Set parameters

### Acquisition

| Parameter | Default | Range | What it does |
|-----------|---------|-------|--------------|
| **Polarity** | NEG | AUTO / NEG / POS | Match your LC-MS acquisition polarity. **AUTO** detects from the file's metadata. |
| **Mass tolerance** | 5 ppm | 1–50 ppm | EIC extraction window. Lower is stricter. The slider value is color-coded: green ≤5, yellow 5–15, red >15. |
| **Backend** | seed (Rust) on macOS / Linux; RawFileReader (.NET) on Windows | seed / RawFileReader | Underlying RAW reader. seed is faster on Thermo files; RawFileReader is the reference implementation. |

### Parameters (RT)

| Parameter | Default | Range | What it does |
|-----------|---------|-------|--------------|
| **RT window** | 0.3 min | 0.1–5.0 min | ± window around the expected RT to search for peaks |

The sidebar header shows your current setting as `RT ±0.3 min`.

## Peak picking

Toggle peak picking **on** (recommended).

### Method

`v4` is currently the only implemented peak detection method — robust MAD-based thresholds with prominence filtering, followed by KDE-based cross-sample RT alignment. The `v2` (Smoothed) and `v1` (Basic) buttons in the UI are placeholders for future algorithms and are not yet wired up; leave the selection on `v4`.

### RT mode

| Mode | Behavior |
|------|----------|
| **Reference** *(default)* | Use the RT from your compound list as the search center |
| **Auto** | Auto-detect the RT from the EIC, ignoring the compound-list value |

Use **Auto** when your CSV has rough placeholder RTs and you want LEAF to find the actual peak.

## Quality scoring

Toggle quality scoring **on** (recommended). LEAF assigns each compound a verdict (good / warning / poor / insufficient_data) based on three sub-scores (peak shape, interference, baseline) plus a continuous SNR multiplier and a hard intensity gate.

| Parameter | Default | What it means |
|-----------|---------|---------------|
| **Min SNR** | 3.0 | Hard gate. Peaks below this signal-to-noise ratio fail the gate and are excluded. Higher = stricter. |
| **Min intensity (LOD)** | 500,000 | Hard gate. Peaks below this absolute intensity are treated as below detection limit. |
| **Sample / blank ratio** | 3.0 | If a blank sample is present, sample peaks must exceed `ratio × blank_intensity` to count as detected. |
| **Verdict thresholds** | good ≥0.55, warning ≥0.27 | Compound-level quality cutoffs. Below 0.27 → poor. Below detection floor (3% detection rate) → insufficient_data. |

→ [Quality verdicts explained](/workflow/analyze#quality-info)

## File-handling toggles

| Toggle | Default | Effect |
|--------|---------|--------|
| **Organize names** | On | Strip date/timestamp prefixes from file names for clean grouping (e.g. `20240321_WT_rep1.raw` → `WT_rep1`). |
| **Skip blanks** | On | Skip files with `blank` (case-insensitive) in the name during extraction. |
| **MS² extraction** | Off | Capture MS² spectra alongside MS¹. Adds a raw-spectrum + RT preview in Peak Picking. Upload a spectral library later for cosine matching. |

## Tracing (optional)

For isotope-labeling experiments, configure the **Tracing Editor** below the parameters before starting. See [Isotope tracing](/workflow/tracing).

## Start processing

Once folders are selected and compounds validated, the **Start Processing** button turns blue. Click it.

A floating action button appears in the bottom-right corner:

| State | Meaning |
|-------|---------|
| Blue with spinner | Job running — shows % progress |
| Green with checkmark | Job done — click to download or open |
| Red with warning icon | Job failed — click for details |

> [Screenshot: floating action button cycling through states]

Click the button to open the jobs panel with full progress, per-file status, and **Download** / **Open** options.

::: details Also from a script
Headless equivalent of this page:

```bash
leaf targeted ./samples ./compounds.csv \
  --polarity NEG --tolerance 5 --rt-window 0.3 --method v4
```

→ [`leaf targeted` reference](/scripting/cli/targeted)
Or in Python: [Recipe 1 — Batch extraction](/scripting/python/recipes#recipe-1-batch-extraction-from-a-folder)
:::

## Next step

→ [Analyze your results](/workflow/analyze)
