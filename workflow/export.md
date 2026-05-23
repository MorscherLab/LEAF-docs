# Export Targeted Results

Export the processed targeted dataset as a LEAF archive for review or as a flat table for downstream statistical analysis.

## Two formats

| Format | Use case | Contents |
|--------|----------|----------|
| **`.msd`** | Reopen in LEAF, share with collaborators | Full bundle: intensities, peaks, quality scores, isotopologues, metadata, parameters |
| **`.csv`** | Excel, R, Python, GraphPad, etc. | Flat intensity matrix — one row per metabolite, one column per sample |

## How to export

Click the **download** button in the top action bar, or open the jobs panel and click **Download** next to the completed job.

> [Screenshot: download button and jobs panel with download options]

A modal provides controls for format selection and included fields:

| Option | Default | Effect |
|--------|---------|--------|
| **Format** | `.msd` | `.msd` for full bundle, `.csv` for spreadsheet |
| **Verdict filter** | All | Restrict to Good only, or Good + Warning, etc. |
| **Pick mode** | Area Top | Intensity at peak apex vs Area Sum (matches the sidebar setting) |
| **Include isotopologues** | On (tracing only) | Add per-isotopologue columns |
| **Include metadata** | On | Sample groups, file paths, timestamps |

## `.msd` archive

The `.msd` file is LEAF's native targeted result archive. It stores:

- Sample metadata and file provenance
- Compound metadata and quality verdicts
- Extracted intensities and selected peaks
- Isotopologue intensities when tracing is enabled
- Extraction and scoring parameters required for reproducibility

The archive reopens in LEAF with drag-and-drop.

## CSV table

The standard CSV is a wide table:

```csv
Metabolite,Formula,RetentionTime,Adduct,Verdict,WT_rep1,WT_rep2,KO_rep1,KO_rep2
Glucose,C6H12O6,5.2,M-H,good,1.23e6,1.18e6,8.4e5,9.1e5
Lactate,C3H6O3,3.1,M-H,good,4.5e5,4.7e5,9.8e5,1.05e6
# additional metabolites omitted
```

For tracing data, isotopologue rows interleave per compound:

```csv
Metabolite,Isotopologue,WT_rep1,WT_rep2,KO_rep1,KO_rep2
Glucose,M+0,1.23e6,1.18e6,8.4e5,9.1e5
Glucose,M+1,2.4e4,2.6e4,1.8e4,2.1e4
Glucose,M+2,3.1e3,3.3e3,2.4e3,2.6e3
# additional isotopologues omitted
```

## Reopening a `.msd` file

Drag the `.msd` file onto the LEAF window. LEAF detects the format and opens the Peak Picking view with the stored targeted analysis restored.

## Sharing results

- **`.msd`** is the canonical sharing format. It is a single self-contained file that can be opened by another LEAF installation.
- **`.csv`** is suitable for downstream statistical software, manuscript supplementary data, or collaborators who do not use LEAF.

::: tip Lab-wide storage
LEAF can persist `.msd` archives directly to an S3-compatible bucket (AWS S3, MinIO, Ceph RGW) so results are reachable from any configured LEAF instance without manual copying. Configure storage under **Settings → Storage** or with environment variables. See [Storage backend](/scripting/cli/configuration#storage-backend).
:::

::: details Also from a script
Saving and reopening a `.msd` from Python:

```python
from leaf.analyzer import Samples
samples = Samples.load("analysis.msd")
# inspect / mutate ...
samples.save("analysis-revised.msd")
```

→ [Python recipes](/scripting/python/recipes)
:::

## Next step

→ [Isotope tracing setup](/workflow/tracing) — for stable-isotope labeling experiments

Or jump to [UI tour](/reference/ui-tour) for a tour of every panel and button.
