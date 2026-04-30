# Export

When you're done analyzing, save your data so you can reopen it later or hand it off to a collaborator or downstream tool.

## Two formats

| Format | Use case | Contents |
|--------|----------|----------|
| **`.msd`** | Reopen in LEAF, share with collaborators | Full bundle: intensities, peaks, quality scores, isotopologues, metadata, parameters |
| **`.csv`** | Excel, R, Python, GraphPad, etc. | Flat intensity matrix — one row per metabolite, one column per sample |

## How to export

Click the **download** button in the top action bar, or open the jobs panel and click **Download** next to your finished job.

> [Screenshot: download button and jobs panel with download options]

A modal lets you pick the format and what to include:

| Option | Default | Effect |
|--------|---------|--------|
| **Format** | `.msd` | `.msd` for full bundle, `.csv` for spreadsheet |
| **Verdict filter** | All | Restrict to Good only, or Good + Warning, etc. |
| **Pick mode** | Area Top | Intensity at peak apex vs Area Sum (matches the sidebar setting) |
| **Include isotopologues** | On (tracing only) | Add per-isotopologue columns |
| **Include metadata** | On | Sample groups, file paths, timestamps |

## What's in a `.msd` file?

A zstd-compressed Apache Arrow / Parquet bundle:

- **`samples.parquet`** — sample metadata (file path, group, injection volume, timestamps)
- **`compounds.parquet`** — per-compound metadata + verdicts
- **`intensities.parquet`** — sparse matrix of intensities (compound × sample)
- **`peaks.parquet`** — detected peak boundaries and shapes
- **`isotopologues.parquet`** — per-isotopologue intensities (if tracing was enabled)
- **`parameters.json`** — every parameter used during extraction (for reproducibility)

You don't need to know the internals — `.msd` files reopen in LEAF with a single drag-and-drop.

## What's in a `.csv` file?

A wide table:

```csv
Metabolite,Formula,RetentionTime,Adduct,Verdict,WT_rep1,WT_rep2,KO_rep1,KO_rep2
Glucose,C6H12O6,5.2,M-H,good,1.23e6,1.18e6,8.4e5,9.1e5
Lactate,C3H6O3,3.1,M-H,good,4.5e5,4.7e5,9.8e5,1.05e6
...
```

For tracing data, isotopologue rows interleave per compound:

```csv
Metabolite,Isotopologue,WT_rep1,WT_rep2,KO_rep1,KO_rep2
Glucose,M+0,1.23e6,1.18e6,8.4e5,9.1e5
Glucose,M+1,2.4e4,2.6e4,1.8e4,2.1e4
Glucose,M+2,3.1e3,3.3e3,2.4e3,2.6e3
...
```

## Reopening a `.msd` file

Drag the `.msd` file onto the LEAF window from anywhere — Extract page, home page, Peak Picking view, doesn't matter. LEAF detects the format and routes you to the Peak Picking view with everything restored.

## Sharing results

- **`.msd`** is the canonical sharing format. It's a single self-contained file. Email it, drop it on a shared drive, or upload to your lab's storage. Anyone with LEAF can open it.
- **`.csv`** is the right choice for downstream stats software, manuscript supplementary data, or showing a colleague who doesn't have LEAF.

## Untargeted exports

The Untargeted view exports `.usd` files (same format family as `.msd`) plus per-feature CSVs of intensities, retention times, and m/z values. See [Untargeted analysis](/workflow/untargeted).

## Next step

→ [Isotope tracing setup](/workflow/tracing) — if you're running labeling experiments

Or jump to [UI tour](/reference/ui-tour) for a tour of every panel and button.
