# Extract

The **Extract** page is where you configure parameters and launch a processing run. This is the first step of every targeted analysis.

> [Screenshot: full Extract view with parameters configured and compound list loaded]

## Layout

The Extract page has four panels:

| Panel | Position | Purpose |
|-------|----------|---------|
| **Folder selector** | Top-left | Choose which RAW files to process |
| **Compound list editor** | Center | Upload, edit, and validate your metabolite CSV |
| **Parameters sidebar** | Right | Polarity, mass tolerance, RT window, peak picking, scoring |
| **Tracing editor** | Right (below parameters) | Configure isotopologues for tracing experiments |

## Select RAW files

### Local mode (desktop)

Click the folder selector and choose the folder containing your `.raw` files. The file count appears next to the folder name.

### Server mode (hosted)

Search and select folders from the list. Use the checkboxes to select multiple folders at once.

> [Screenshot: folder selector in both local and server modes]

## Upload your compound list

Drag and drop your CSV onto the upload zone, or click to browse. LEAF parses it and shows the compounds in an editable table.

After uploading, click **Validate** to check for errors. Common issues (missing formulas, invalid adducts) appear as warnings — fix them before continuing.

→ [Compound list format](/workflow/prepare-data)

## Set parameters

| Parameter | Recommended | Range | What it does |
|-----------|-------------|-------|--------------|
| **Polarity** | Match your method | NEG / POS | Must match your LC-MS acquisition polarity |
| **Mass Tolerance** | 5 ppm | 1–50 ppm | EIC extraction window. Lower is stricter. Color-coded: green ≤5, yellow 5–15, red >15. |
| **RT Window** | 0.5 min | 0.1–5.0 min | How far from expected RT to search for peaks |

## Peak picking

Toggle peak picking **on** (recommended). Choose a detection method:

| Method | Label | Best for |
|--------|-------|----------|
| **v4** | Advanced | Most experiments — best accuracy and peak shape detection |
| **v2** | Smoothed | Noisy data — uses Savitzky-Golay smoothing |
| **v1** | Basic | Quick exploratory runs |

Additional toggles:

- **Organize names** *(on by default)* — extracts clean sample names from RAW file names (e.g., `WT_rep1_240301.raw` → `WT_rep1`)
- **Skip blanks** *(on by default)* — automatically skips files with "blank" in the name

## Quality scoring

Toggle quality scoring **on** (recommended). LEAF assigns each compound a verdict (good / warning / poor) based on detection rate, peak shape, and RT consistency.

| Parameter | Default | What it means |
|-----------|---------|---------------|
| **SNR Threshold** | 3 (lenient) to 20 (strict) | Signal-to-noise ratio cutoff |
| **LOD Threshold** | 100,000 | Minimum intensity for a peak to count as detected |

→ [Quality verdicts explained](/workflow/analyze#quality-info)

## Tracing (optional)

For isotope-labeling experiments, configure the **Tracing Editor** before starting. See [Isotope tracing](/workflow/tracing).

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

## Untargeted instead?

The Extract page has a **Targeted / Untargeted** toggle at the top. Switch to Untargeted mode for feature discovery without a compound list. See [Untargeted analysis](/workflow/untargeted).

## Next step

→ [Analyze your results](/workflow/analyze)
