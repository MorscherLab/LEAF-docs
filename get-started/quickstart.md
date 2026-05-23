# Run a First Targeted Analysis

This walkthrough starts LEAF, processes a small targeted LC-MS dataset, and opens the processed result for chromatogram review. The procedure takes approximately 5 minutes with a small input folder.

> [Screenshot: full LEAF window showing the Extract view, ready to start]

## Prerequisites

LEAF should already be installed by one of the supported local paths:

- [Install the wheel + CLI](/get-started/install-cli) — launches the local server and opens it in a browser.

Hosted MINT access is [under development](/get-started/install-mint) and not yet available for general use.

For a local install, launch LEAF in a terminal:

::: code-group

```bash [Standalone installer (Path A)]
~/.leaf/leaf
# Open http://127.0.0.1:8000
```

```bash [Manual wheel + CLI (Path B)]
leaf webui run
# Open http://127.0.0.1:18008
```

:::

The browser opens on the **Extract** view.

## Inputs

Two inputs are required:

1. **A folder of LC-MS files** — Thermo `.raw` or `.mzml` (`.mzml.gz` is also accepted). A single file is sufficient for this walkthrough.
2. **A CSV listing the target metabolites** — described below.

## Create a metabolite CSV

The recommended command-line setup is:

```bash
leaf init ./leaf-run
```

This creates `leaf-run/metabolites.csv`, plus empty `raw/` and `results/` folders. Place the LC-MS files in `leaf-run/raw/`, then use the generated CSV as the starting list.

The release also includes [`examples/metabolite-list-primary-metabolism.csv`](https://github.com/MorscherLab/LEAF/blob/main/examples/metabolite-list-primary-metabolism.csv), a primary-metabolism panel with representative retention times.

For a minimal test, save the following as `compounds.csv`:

```csv
Metabolite,Formula,RetentionTime,Adduct
Glucose,C6H12O6,5.2,M-H
Lactate,C3H6O3,3.1,M-H
Citrate,C6H8O7,8.5,M-H
Pyruvate,C3H4O3,2.8,M-H
Glutamate,C5H9NO4,4.1,M-H
```

Adjust retention times to match the chromatographic method. Exact values are not required for this walkthrough because the RT search window allows moderate drift. See [Prepare Data](/workflow/prepare-data) for the complete CSV specification.

Optional preflight:

```bash
leaf validate ./compounds.csv ./path/to/raw-folder
```

## Step 1: Select the data folder

On the Extract page, click **Select Folder** and choose the folder containing `.raw`, `.mzml`, or `.mzml.gz` files. LEAF displays the file count next to the folder name.

> [Screenshot: folder selector with files counted]

## Step 2: Load the compound list

Drag `compounds.csv` onto the upload zone, or click to browse. LEAF parses the compounds into an editable table. Click **Validate** to check formulas, adducts, retention times, and duplicate entries.

> [Screenshot: compound list editor with validated rows]

## Step 3: Set parameters

For an initial run, the default parameters are appropriate for many targeted LC-MS methods:

| Setting | Default | What it means |
|---------|---------|---------------|
| Polarity | AUTO | Resolves to NEG for targeted runs unless POS is selected |
| Mass tolerance | 5 ppm | How tightly to match m/z values |
| RT window | 0.4 min | How far from expected RT to search |
| Peak picking | On | Detect peak boundaries automatically |
| Quality scoring | On | Flag unreliable compounds |

If the acquisition was performed in positive mode, change **Polarity** to POS. This is typically the only parameter requiring adjustment for a first run.

## Step 4: Start

Click **Start Processing**. A floating progress button appears in the bottom-right corner.

> [Screenshot: floating action button showing job in progress]

Processing is complete when the spinner changes to a green checkmark. Runtime depends on file size, reader backend, storage speed, and compound count. A single input file with a small compound list generally completes within a short interval; larger batches may take several minutes.

## Step 5: Review results

After completion, click the green checkmark, then **Open** in the jobs panel. LEAF opens the Peak Picking view with the processed dataset loaded.

> [Screenshot: Peak Picking view with one metabolite selected]

Click any metabolite in the left-hand list. The linked panels show:

- **EIC chart** (top right) — chromatograms for the selected metabolite across samples
- **Isotopologue bars** (bottom left) — peak intensity per isotopologue when tracing is configured
- **Quality info** (bottom right) — the compound-level verdict and supporting warnings

The walkthrough has covered targeted extraction, peak picking, quality scoring, and result inspection.

## Further steps

- **Sample grouping** — click the lightning-bolt icon in the sidebar to group samples by name prefix (e.g., `WT_rep1`, `WT_rep2` → group "WT"). See [Analyze](/workflow/analyze).
- **Visualization** — open the **Visualize** dropdown for PCA, heatmaps, volcano plots, and additional chart types. See [Visualize](/workflow/visualize).
- **Export** — click the download button to save a `.msd` archive (full bundle) or a `.csv` (intensity matrix). See [Export](/workflow/export).
- **Isotope tracing** — for ¹³C and other labeling experiments, see [Isotope tracing](/workflow/tracing).

## Troubleshooting

→ [Common issues and resolutions](/reference/troubleshooting)
