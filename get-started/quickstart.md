# Run Your First Analysis

A complete walkthrough from opening LEAF to seeing your first peak — about 5 minutes.

> [Screenshot: full LEAF window showing the Extract view, ready to start]

## What you need

Two files:

1. **One folder of Thermo `.raw` files** — your LC-MS samples. Even a single file is enough for this walkthrough.
2. **One CSV listing the metabolites you want to find** — see below.

## Make a metabolite CSV

Open a text editor and save this as `compounds.csv`:

```csv
Metabolite,Formula,RetentionTime,Adduct
Glucose,C6H12O6,5.2,M-H
Lactate,C3H6O3,3.1,M-H
Citrate,C6H8O7,8.5,M-H
Pyruvate,C3H4O3,2.8,M-H
Glutamate,C5H9NO4,4.1,M-H
```

Adjust the retention times to match your method. Don't worry about getting them exactly right — LEAF tolerates some drift. See [Prepare your data](/workflow/prepare-data) for the full CSV format.

## Step 1: Pick your RAW folder

On the Extract page, click **Select Folder** and choose the folder with your `.raw` files. The number of files appears next to the folder name.

> [Screenshot: folder selector with files counted]

## Step 2: Drop your CSV

Drag `compounds.csv` onto the upload zone — or click to browse. You'll see your compounds parsed into a table. Click **Validate** to check for formula or adduct errors.

> [Screenshot: compound list editor with validated rows]

## Step 3: Set parameters

For your first run, leave the defaults — they're sensible for most experiments:

| Setting | Default | What it means |
|---------|---------|---------------|
| Polarity | NEG | Match your LC-MS method's polarity |
| Mass tolerance | 5 ppm | How tightly to match m/z values |
| RT window | 0.5 min | How far from expected RT to search |
| Peak picking | On (v4 Advanced) | Detect peak boundaries automatically |
| Quality scoring | On | Flag unreliable compounds |

If your method ran in positive mode, switch **Polarity** to POS. That's usually the only setting that needs changing for a first run.

## Step 4: Start

Click the blue **Start Processing** button. A floating progress button appears in the bottom-right corner.

> [Screenshot: floating action button showing job in progress]

Wait for the spinner to turn into a green checkmark. For a single RAW file with 5 compounds, this takes a few seconds. For a 50-file dataset with 200 compounds, expect a couple of minutes.

## Step 5: See your results

When done, click the green checkmark, then **Open** in the jobs panel. LEAF opens the Peak Picking view with your data loaded.

> [Screenshot: Peak Picking view with one metabolite selected]

Click any metabolite in the left-hand list. You'll see:

- **EIC chart** (top right) — the chromatogram for that metabolite across every sample
- **Isotopologue bars** (bottom left) — peak intensity per isotope (M+0, M+1, ...)
- **Quality info** (bottom right) — the verdict (good / warning / poor) with reasons

That's it. You ran an extraction, picked peaks, scored them, and visualized the results.

## What to do next

- **Group your samples** — click the lightning-bolt icon in the sidebar to auto-group by sample name prefix (e.g., `WT_rep1`, `WT_rep2` → group "WT"). See [Analyze](/workflow/analyze).
- **Visualize** — open the **Visualize** dropdown for PCA, heatmap, volcano plot, and more. See [Visualize](/workflow/visualize).
- **Export** — click the download button to save a `.msd` bundle (everything) or a `.csv` (intensity matrix). See [Export](/workflow/export).
- **Trace isotopes** — for ¹³C labeling experiments, see [Isotope tracing](/workflow/tracing).

## If something went wrong

→ [Troubleshooting](/reference/troubleshooting)
