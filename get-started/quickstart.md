# Run Your First Analysis

A complete walkthrough from opening LEAF to seeing your first peak — about 5 minutes.

> [Screenshot: full LEAF window showing the Extract view, ready to start]

## Before you start

You should already have LEAF installed via one of:

- [Install in MINT (recommended)](/get-started/install-mint) — open the lab's MINT URL, sign in, click the **LEAF** tile.
- [Install the wheel + CLI](/get-started/install-cli) — launch the local server and open it in your browser.

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

The browser tab should land on the LEAF **Extract** view.

## Inputs

Two things are needed:

1. **A folder of LC-MS files** — Thermo `.raw` or `.mzml` (`.mzml.gz` is also accepted). A single file is sufficient for this walkthrough.
2. **A CSV listing the target metabolites** — described below.

## Make a metabolite CSV

The fastest path is to use the starter list shipped with LEAF: [`examples/metabolite-list-primary-metabolism.csv`](https://github.com/MorscherLab/LEAF/blob/main/examples/metabolite-list-primary-metabolism.csv) — a primary-metabolism panel with sensible defaults.

Or save the following as `compounds.csv` if you'd rather start small:

```csv
Metabolite,Formula,RetentionTime,Adduct
Glucose,C6H12O6,5.2,M-H
Lactate,C3H6O3,3.1,M-H
Citrate,C6H8O7,8.5,M-H
Pyruvate,C3H4O3,2.8,M-H
Glutamate,C5H9NO4,4.1,M-H
```

Adjust the retention times to match your chromatographic method. Exact values are not required — the RT search window tolerates moderate drift. See [Prepare your data](/workflow/prepare-data) for the complete CSV specification.

## Step 1: Pick your data folder

On the Extract page, click **Select Folder** and choose the folder with your `.raw` (or `.mzml`) files. The number of files appears next to the folder name.

> [Screenshot: folder selector with files counted]

## Step 2: Drop your CSV

Drag `compounds.csv` onto the upload zone — or click to browse. You'll see your compounds parsed into a table. Click **Validate** to check for formula or adduct errors.

> [Screenshot: compound list editor with validated rows]

## Step 3: Set parameters

For an initial run, the defaults are appropriate for most LC-MS methods:

| Setting | Default | What it means |
|---------|---------|---------------|
| Polarity | NEG | Match your LC-MS method's polarity |
| Mass tolerance | 5 ppm | How tightly to match m/z values |
| RT window | 0.3 min | How far from expected RT to search |
| Peak picking | On (`v4`) | Detect peak boundaries automatically |
| Quality scoring | On | Flag unreliable compounds |

If the acquisition was performed in positive mode, change **Polarity** to POS. This is typically the only parameter requiring adjustment for an initial run.

## Step 4: Start

Click the blue **Start Processing** button. A floating progress button appears in the bottom-right corner.

> [Screenshot: floating action button showing job in progress]

Processing completes when the spinner is replaced by a green checkmark. Runtime depends on file size, backend, storage speed, and compound count; a single input file with a small compound list should finish quickly, while larger batches may take several minutes.

## Step 5: See your results

When done, click the green checkmark, then **Open** in the jobs panel. LEAF opens the Peak Picking view with your data loaded.

> [Screenshot: Peak Picking view with one metabolite selected]

Click any metabolite in the left-hand list. You'll see:

- **EIC chart** (top right) — the chromatogram for that metabolite across every sample
- **Isotopologue bars** (bottom left) — peak intensity per isotope (M+0, M+1, ...)
- **Quality info** (bottom right) — the verdict (good / warning / poor) with reasons

The walkthrough has covered extraction, peak picking, quality scoring, and result inspection.

## Further steps

- **Sample grouping** — click the lightning-bolt icon in the sidebar to group samples by name prefix (e.g., `WT_rep1`, `WT_rep2` → group "WT"). See [Analyze](/workflow/analyze).
- **Visualization** — open the **Visualize** dropdown for PCA, heatmaps, volcano plots, and additional chart types. See [Visualize](/workflow/visualize).
- **Export** — click the download button to save a `.msd` archive (full bundle) or a `.csv` (intensity matrix). See [Export](/workflow/export).
- **Isotope tracing** — for ¹³C and other labeling experiments, see [Isotope tracing](/workflow/tracing).
- **No metabolite list?** Switch the Extract page to the **Untargeted** mode for de-novo feature detection — see [Untargeted overview](/workflow/untargeted).

## Troubleshooting

→ [Common issues and resolutions](/reference/troubleshooting)
