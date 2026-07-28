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

1. Open **Results** in the analysis workspace.
2. Apply the sample, compound, isotopologue, or quality filters that should be included.
3. Choose **Apex** or **Area** for the quantification value.
4. Choose the table layout:
   - **Wide** — samples are arranged as columns.
   - **Long** — each measurement is a separate row, which is convenient for R, Python, and other tidy-data tools.
5. Click **Download ZIP**.

The downloaded ZIP contains the requested CSV output. The export follows the filters that are active when you download it.

::: tip Check before exporting
If a sample or compound should not be in the final table, hide or exclude it in **Results** before clicking **Download ZIP**.
:::

## Natural-abundance correction

For isotope-tracing analyses with a valid tracer configuration, LEAF can apply natural-abundance correction before export.

1. Review the tracer element and purity settings.
2. Enable the correction option in **Results**.
3. Click **Download Corrected ZIP**.

Keep the uncorrected export as well when you need a record of the measured values.

## Export matched MS² spectra

The MS² export section in **Results** can create:

- **MGF** for general mass-spectrometry software
- **MSP** for spectral-library tools

You can restrict the export to matched spectra. Sample and compound filters also apply to the MS² export.

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
