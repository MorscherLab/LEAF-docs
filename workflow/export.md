# Export Targeted Results

LEAF 0.7 separates the complete analysis session from spreadsheet and spectrum exports.

## Save the complete analysis

Click the **download** button in the analysis header to save a `.msd` file.

The `.msd` file preserves the targeted result, including extracted signals, peak selections, compound metadata, sample groups, quality information, and analysis settings. Use it when you need to:

- reopen the analysis in LEAF
- share an editable result with a collaborator
- archive the analysis before making more changes

## Reopening a .msd file

To reopen it, launch LEAF and select or drop the `.msd` file. LEAF restores the analysis workspace.

## Export the quantitative table

Open **Results** in the analysis workspace. The table and export controls use the samples selected in the left sidebar.

![Results table with quantification, filters, display, and export options](/screenshots/targeted/targeted-results-options.jpg)

### Read and navigate the table

Each row is identified by **Metabolite**, **Formula**, and **Isotopologue**. In the wide table, the remaining columns are samples.

The footer shows the visible row range, total rows, and sample count. Use **Rows per page** to show 50, 100, 250, or 500 rows, then use the previous and next buttons to change page. Pagination affects the on-screen table, not the contents selected for export.

### Choose the quantification value

| Option | How to use it |
|---|---|
| **Apex** | Use the peak maximum for each measurement. |
| **Area** | Use the integrated peak area for each measurement. |
| **Important only** | Include only compounds marked as important in Charts. This switch appears after at least one compound is marked. |

Changing **Apex / Area** updates the current result table. An older `.msd` may initially show **Current result: Unknown (legacy file)**; select the required metric before exporting it.

### Choose metabolites and isotopologues

Both filter sections show the selected and total counts.

- Expand **Metabolites** to search the compound list, use **All** or **None**, or select individual compounds.
- Expand **Isotopologues** to use **All** or **None**, or select individual channels such as **Parent**, **M+1**, and **M+2**.

The table and downloaded files follow these selections.

### Format table values

| Option | How to use it |
|---|---|
| **Scientific** | Show values in scientific notation, such as `1.23e+6`. |
| **Decimal** | Show regular decimal values. |
| **Percentage** | Show each isotopologue as a percentage of its sample's displayed envelope. |
| **Precision** | Set 0–6 displayed digits. |
| **Show empty isotopologues** | Include rows that have no signal in any sample. It is off by default; higher-order channels that contain signal remain visible. Turning it on loads the full isotopologue envelope. |

### Choose the CSV layout

| Layout | Result |
|---|---|
| **Wide** | One sample per column; convenient for spreadsheets and matrix-based tools. |
| **Long/Tidy** | One measurement per row; convenient for R, Python, and tidy-data workflows. |

For **Long/Tidy**, select any additional metadata columns required downstream: **Formula**, **RT**, and **Adduct**.

### Download

1. Select the samples in the left sidebar.
2. Choose **Apex** or **Area**.
3. Set the metabolite, isotopologue, display, and export options.
4. Click **Download ZIP**.

The ZIP contains the requested CSV output and follows the selections active when it is downloaded.

::: tip Check before exporting
If a sample or compound should not be in the final table, hide or exclude it in **Results** before clicking **Download ZIP**.
:::

## Natural-abundance correction

For isotope-tracing analyses with a valid tracer configuration, LEAF can apply natural-abundance correction before export.

1. Review the tracer element and purity settings.
2. Click **Configure tracers…** if the tracer has not been defined.
3. Enable **Natural-abundance correction** in **Results**.
4. Click **Download Corrected ZIP**.

Keep the uncorrected export as well when you need a record of the measured values.

The corrected download is unavailable when correction is on but no valid tracer is configured.

## Export matched MS² spectra

In **Spectra (MS²)**, choose:

- **MGF** for general mass-spectrometry software
- **MSP** for spectral-library tools

Enable **Only matched spectra** to exclude spectra without a library match. Click **Download MS²** to download the selected spectrum format. Sample and metabolite filters also apply to the MS² export.

## Save the result in MINT

When LEAF is opened from a MINT experiment, use the save controls in the analysis header to store the targeted `.msd` as an experiment artifact.

- **Save to experiment** updates the selected artifact.
- **Save as new result** creates another artifact and keeps the previous one unchanged.

Use a clear artifact name that identifies the analysis or processing stage. You can reopen the saved artifact from the same MINT experiment later.

## Which output should I use?

| Output | Use it for |
|--------|------------|
| `.msd` | Reopening, editing, sharing, or archiving the complete LEAF analysis |
| Results ZIP | Statistics, spreadsheets, plotting, or downstream scripts |
| Corrected results ZIP | Downstream analysis of corrected isotope-tracing values |
| MGF or MSP | Spectral-library work and MS² review |
| MINT artifact | Keeping the analysis with its experiment and collaborators |

## Next step

→ [Troubleshooting](/reference/troubleshooting) — including browser refresh and cache recovery
