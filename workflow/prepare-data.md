# Prepare Your Data

Before you launch an analysis, you need two things in front of you: your **RAW files** and a **metabolite list**.

## RAW files

LEAF reads Thermo Fisher `.raw` files directly. Put all the files for one experiment into a single folder. LEAF will process every `.raw` file in the folder.

**Naming**: name your files descriptively — e.g., `WT_rep1.raw`, `WT_rep2.raw`, `KO_rep1.raw`. LEAF can auto-extract clean sample names from the file name and auto-group replicates by name prefix.

**Blanks**: include them in the folder if you want — LEAF skips files with "blank" in the name by default.

## Metabolite list (CSV)

A CSV listing the compounds you want to quantify.

### Required columns

| Column | Description | Example |
|--------|-------------|---------|
| **Metabolite** | Compound name (also accepts `Compound` or `Name`) | Glucose |
| **Formula** | Molecular formula | C6H12O6 |
| **RetentionTime** | Expected retention time in minutes (also accepts `RT`) | 5.2 |
| **Adduct** | Ionization adduct | M-H |

### Optional columns

| Column | Description |
|--------|-------------|
| **Mass** | Exact m/z value. If omitted, LEAF calculates it from formula + adduct. |
| **Pathway** | Pathway annotation, used for pathway-network visualizations. |
| **Notes** | Free-text notes shown in the compound editor. |

### Flexible naming

LEAF recognizes common column-name variants:

- `Metabolite` / `Compound` / `Name`
- `Formula` / `MolecularFormula`
- `RetentionTime` / `RT` / `retention_time`
- `Adduct` / `IonizationAdduct`

### Example

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

A starter list for primary metabolism is included with LEAF — see `examples/metabolite-list-primary-metabolism.csv` in the repository.

## For untargeted analysis

You don't need a metabolite CSV for untargeted runs. LEAF discovers features automatically from your RAW files. See [Untargeted analysis](/workflow/untargeted).

## For isotope tracing

Use the same CSV — no extra columns needed. Isotopologues (M+1, M+2, ...) are configured in the Tracing Editor on the Extract page, not in the CSV. See [Isotope tracing](/workflow/tracing).

## Validating before you launch

After uploading the CSV, click **Validate** in the compound list editor. LEAF flags:

- Missing required columns
- Invalid molecular formulas (typos, unsupported elements)
- Unrecognized adducts
- Duplicate compound names

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
