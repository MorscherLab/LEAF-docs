# Prepare Your Data

Before you launch an analysis, you need two things in front of you: your **RAW files** and a **metabolite list**.

## RAW files

LEAF reads Thermo Fisher `.raw` files and `.mzml` / `.mzml.gz` directly. Put all the files for one experiment into a single folder. LEAF will process every supported file in the folder.

**Naming**: name your files descriptively — e.g., `WT_rep1.raw`, `WT_rep2.raw`, `KO_rep1.raw`. LEAF can auto-extract clean sample names from the file name and auto-group replicates by name prefix.

**Blanks**: include them in the folder if you want — LEAF skips files with "blank" in the name by default.

## Metabolite list (CSV / TSV)

A CSV or TSV listing the compounds you want to quantify. **No reformatting required for files coming out of common tools** — drop in any of:

- **LEAF native (RFA)** — minimal columns described below
- **Skyline transition / target lists** — the same CSV/TSV you'd import into Skyline
- **El-MAVEN compound databases or peak tables** — both files you'd feed into El-MAVEN and files El-MAVEN exports

LEAF maps the columns to its internal schema automatically based on the headers it finds. Tab-delimited (TSV) files are auto-detected from the header line.

### What LEAF needs

After column mapping, three fields are required and three more are commonly used:

| LEAF field | Required? | LEAF native | Skyline | El-MAVEN |
|------------|:---:|-------------|---------|----------|
| Compound name | ✓ | `Metabolite` / `Compound` / `Name` | `Precursor Name` / `Molecule Name` | `compoundName` / `compoundId` |
| Molecular formula | ✓ | `Formula` | `Precursor Formula` / `Molecular Formula` / `Molecule Formula` | `Formula` |
| Retention time (min) | ✓ | `RetentionTime` / `RT` | `Explicit Retention Time` | `medRt` / `expectedRt` |
| Adduct | recommended | `Adduct` | `Precursor Adduct` / `Precursor Charge` | `adductName` / `ionName` / `charge` |
| Exact m/z | optional | `Mass` | `Precursor m/z` | `medMz` |
| Tracing group | optional | `TracingGroup` / `Group` | `Molecule List Name` | — |

Header matching is case-insensitive and ignores spaces and underscores, so `precursor_name`, `Precursor Name`, and `PrecursorName` all map to **Compound**. If `Adduct` is missing, LEAF fills it with the default for the selected polarity (`M-H` for NEG, `M+H` for POS). If `Mass` is missing, LEAF computes it from formula + adduct.

### El-MAVEN isotopologue rows

If the file is an El-MAVEN peak table with per-isotopologue rows (`isotopeLabel` / `label` column with values like `C12 PARENT`, `C13-label-1`, etc.), LEAF keeps only the parent (`C12 PARENT`, `parent`, or `M+0`) row per compound. Configure isotopologue tracking in the [Tracing Editor](/workflow/tracing) on the Extract page instead.

### Example (LEAF native)

```csv
Metabolite,Formula,RetentionTime,Adduct
Glucose,C6H12O6,5.2,M-H
Lactate,C3H6O3,3.1,M-H
Citrate,C6H8O7,8.5,M-H
Pyruvate,C3H4O3,2.8,M-H
Glutamate,C5H9NO4,4.1,M-H
Succinate,C4H6O4,7.2,M-H
Malate,C4H6O5,6.5,M-H
Fumarate,C4H4O4,7.0,M-H
```

A starter list for primary metabolism is included with LEAF — see [`examples/metabolite-list-primary-metabolism.csv`](https://github.com/MorscherLab/LEAF/blob/main/examples/metabolite-list-primary-metabolism.csv).

## For untargeted analysis

You don't need a metabolite list for untargeted runs. LEAF discovers features automatically from your RAW files. See [Untargeted analysis](/workflow/untargeted).

## For isotope tracing

Use the same CSV — no extra columns needed. Isotopologues (M+1, M+2, ...) are configured in the Tracing Editor on the Extract page, not in the CSV. See [Isotope tracing](/workflow/tracing).

## Validating before you launch

After uploading the CSV, click **Validate** in the compound list editor. LEAF flags:

- Missing required columns (Compound, Formula, RetentionTime)
- Empty compound names
- Duplicate compound + adduct combinations
- Invalid molecular formulas (typos, unsupported elements)
- Non-positive retention times

Fix the warnings before you start the extraction.

> [Screenshot: compound list editor showing validation warnings]

::: details Also from a script
The compound CSV is identical for the CLI and Python paths — no separate format. Pass it as the second positional argument to `leaf targeted`:

```bash
leaf targeted ./samples ./compounds.csv
```

→ [`leaf targeted` reference](/scripting/cli/targeted)
:::

## Next step

→ [Extract](/workflow/extract)
