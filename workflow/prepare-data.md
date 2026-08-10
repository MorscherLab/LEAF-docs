# Prepare Data

Targeted LEAF analyses require two inputs: a folder of LC-MS files and a compound list. The compound list defines the ions or transitions to extract, while the data folder provides the chromatographic measurements.

## Workflow

```d2
direction: right

raw: "LC-MS files\nRAW / mzML" {
  shape: document
  style.fill: "#dbeafe"
}

compounds: "Compound list\nCSV / TSV" {
  shape: page
  style.fill: "#e0f2fe"
}

targeted: "Targeted extraction" {
  style.fill: "#dcfce7"
}
analyze: "Analyze"
visualize: "Visualize"

export: "Export" {
  shape: package
  style.fill: "#ede9fe"
}

compounds -> targeted
raw -> targeted
targeted -> analyze -> visualize -> export
```

## LC-MS files

LEAF reads targeted inputs from `.raw`, `.mzml`, and `.mzml.gz` files in the web UI and CLI. The Python extractor also supports Shimadzu `.lcd` files when the compound list supplies explicit MRM transitions. Put all files for one experiment in a single folder and use one acquisition format per extraction; mixed formats are rejected.

**Naming:** use descriptive filenames such as `WT_rep1.raw`, `WT_rep2.raw`, and `KO_rep1.raw`. LEAF can derive clean sample names from filenames and can group replicates by name prefix during review.

**Blanks:** include blank injections when they are part of the experiment. LEAF skips files with `blank` in the filename by default during targeted extraction.

## Metabolite list (CSV / TSV)

A CSV or TSV lists the compounds or transitions to quantify. LEAF maps common exported formats into its internal schema based on column headers:

- **LEAF native (RFA)** — minimal columns described below
- **Skyline transition / target lists** — CSV/TSV files used for Skyline imports
- **El-MAVEN compound databases or peak tables** — El-MAVEN input files and El-MAVEN exported peak tables

Header matching is case-insensitive and ignores spaces and underscores. For example, `precursor_name`, `Precursor Name`, and `PrecursorName` map to the same field. Tab-delimited files are detected from the header line.

### What LEAF needs

After column mapping, LEAF requires a compound name, a retention time, and either a molecular formula or an explicit transition. Formula-based targeted extraction is the common LC-MS metabolomics path; transition rows are used for MRM/SRM datasets such as Shimadzu `.lcd` inputs.

| LEAF field | Required? | LEAF native | Skyline | El-MAVEN |
|------------|:---:|-------------|---------|----------|
| Compound name | ✓ | `Metabolite` / `Compound` / `Name` | `Precursor Name` / `Molecule Name` | `compoundName` / `compoundId` |
| Retention time (min) | ✓ | `RetentionTime` / `RT` | `Explicit Retention Time` | `medRt` / `expectedRt` |
| Molecular formula | conditional | `Formula` | `Precursor Formula` / `Molecular Formula` / `Molecule Formula` | `Formula` |
| Transition | conditional | `Transition` | transition columns | — |
| Adduct | recommended | `Adduct` | `Precursor Adduct` / `Precursor Charge` | `adductName` / `ionName` / `charge` |
| Exact m/z | optional | `Mass` | `Precursor m/z` | `medMz` |
| Tracing group | optional | `TracingGroup` / `Group` | `Molecule List Name` | — |

If `Adduct` is missing in a formula-based list, LEAF uses the default adduct for the selected polarity (`M-H` for NEG, `M+H` for POS). If `Mass` is missing, LEAF computes the expected m/z from formula and adduct.

### El-MAVEN isotopologue rows

If an El-MAVEN peak table contains per-isotopologue rows (`isotopeLabel` or `label` values such as `C12 PARENT`, `C13-label-1`, or `M+0`), LEAF keeps the parent row per compound. Isotopologue extraction is configured separately in the [Tracing Editor](/workflow/tracing).

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

A starter list for primary metabolism is included with LEAF: [`examples/metabolite-list-primary-metabolism.csv`](https://github.com/MorscherLab/LEAF/blob/main/examples/metabolite-list-primary-metabolism.csv).

## For isotope tracing

Use the same compound CSV. Configure isotopologue channels in the right-side **Isotope Tracing** panel on **Extract**.

Add an optional `TracingGroup` column to assign compounds during import:

```csv
Metabolite,Formula,RetentionTime,Adduct,TracingGroup
Glucose,C6H12O6,5.2,M-H,U-13C
Lactate,C3H6O3,3.1,M-H,U-13C
Citrate,C6H8O7,8.5,M-H,default
```

A blank value or `default` uses the default manual tracing list. A new group name is created as **¹³C Auto from formula**; review its isotope and formula preview in the tracing panel before extraction.

See [Stable-isotope tracing](/workflow/tracing) for panel setup, manual lists, formula-based expansion, and correction limits.

## Validation before extraction

After uploading the CSV, click **Validate** in the compound list editor. LEAF flags:

- Missing required columns (Compound, Formula, RetentionTime)
- Empty compound names
- Duplicate compound + adduct combinations
- Invalid molecular formulas (typos, unsupported elements)
- Non-positive retention times

Resolve validation errors before starting extraction. Warnings should be reviewed because they may affect quantitative interpretation.

> [Screenshot: compound list editor showing validation warnings]

::: details Also from a script
The compound CSV is identical for the CLI and Python paths — no separate format. Pass it as the second positional argument to `leaf targeted`:

```bash
leaf targeted ./samples ./compounds.csv ./outputs
```

→ [`leaf targeted` reference](/scripting/cli/targeted)
:::

## Next step

→ [Extract](/workflow/extract)
