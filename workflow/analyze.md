# Analyze Targeted Results

The **Analysis** workspace is where you inspect chromatograms, review or adjust peaks, evaluate quality, visualize the dataset, and prepare the targeted result table.

![Targeted analysis workspace showing chromatograms and quality results](/screenshots/targeted/targeted-analysis-charts.jpg)

## Open a targeted result

Use one of these paths:

1. Open **Jobs → Completed** and click **Open** for a targeted job.
2. Open **Analysis** and drop a saved `.msd` onto the upload area.
3. In MINT, select an experiment and open one of its targeted analysis artifacts.

The workspace restores the session, including its extraction parameters, peak state, sample groups, compound review state, and available MS² data.

## Workspace navigation

The top navigation has three targeted sections:

| Section | Purpose |
|---|---|
| **Charts** | Compound-level chromatograms, RT review, isotopologues, MS², and quality information |
| **Visualize** | PCA, correlation, heatmap, box plot, dendrogram, volcano plot, networks, pathway mapping, and QC dashboard |
| **Results** | Quantitative matrix, filters, quantification metric, formatting, and CSV/MS² export |

## Select and group samples

The left sidebar lists the samples in the session.

- Select or clear samples to control which traces and values are shown.
- Create groups manually or use the smart-group control.
- Collapse the sidebar when more chart space is needed.

Sample groups affect grouped isotope bars and statistical visualizations. LEAF 0.7 stores group changes in the `.msd`, so they are restored when the result is reopened.

## Select a compound

In **Charts**, choose a row in the metabolite table. The remaining panels update to the selected compound.

The table provides the compound identity, observed m/z, retention-time information, detection rate, quality state, and review controls. Use its filters to narrow a large list before manual review.

## EIC Chart, RT Check, and TIC Overlay

The upper chart area has three views.

### EIC Chart

The extracted-ion chromatogram overlays the selected samples for the active compound.

Use the toolbar to:

- Inspect a single sample or the selected set
- Toggle aligned retention times
- Switch between peak-focused and global views
- Show or hide chart details such as KDE groups and merge shading

### RT Check

**RT Check** summarizes retention-time behavior across compounds and helps identify outliers. Select an outlying compound to return to its EIC.

### TIC Overlay

**TIC Overlay** compares total-ion chromatograms across samples. It is available when TIC extraction was enabled for the session.

## Correct a peak manually

To replace the integration window:

1. Select the required compound and samples.
2. Drag across the intended RT region in **EIC Chart**.
3. Choose **Merge Data** to apply the region across the selected data, or **Merge Sample** when one sample is active.
4. Use **Undo** to reverse the most recent merge.

Manual peak edits persist with the session. LEAF keeps the RT alignment state when it recalculates the affected quantification.

## Re-run peak picking

The sidebar's peak-picking settings button opens the parameter editor. **Apply & Re-run** recalculates peaks for the active session.

Re-running peak picking can replace automatic peak assignments. Save a separate `.msd` or use **Save as new result** in MINT before a major parameter change when the previous analysis must be retained.

## Choose the chart pick mode

The **Pick Mode** control in the sidebar changes the chart-level peak calculation:

| Mode | Meaning |
|---|---|
| **Apex** | Quantify at the peak maximum |
| **AUC** | Integrate the peak area |

The **Results** section has its own persisted **Apex / Area** quantification selector for the exported matrix.

## Isotopologue view

The lower-left panel opens on **Isotopologue**.

- Switch between absolute intensity and percentage.
- Group samples to show group summaries.
- Open the settings control for correction and display options.

For tracing experiments, percentage mode shows fractional labeling. Natural-abundance correction is configured separately and is only applied when a compatible tracer definition exists.

→ [Isotope tracing and correction](/workflow/tracing)

## MS² view

Open **MS²** beside **Isotopologue** when spectra were captured during extraction.

The panel can:

- Show the spectrum associated with the selected compound and sample
- Fall back to another selected sample when the current sample has no spectrum
- Load an MSP or MGF spectral library
- Configure precursor tolerance, fragment tolerance, and minimum cosine score
- Display the best match and candidate hits

Peak edits cause the MS² candidate to be evaluated against the current peak location.

## Quality information

The quality panel explains why a compound requires review. It combines detection, peak shape, interference, baseline, SNR, intensity, and RT behavior.

| State | Interpretation | Suggested action |
|---|---|---|
| **Good** | The result passed the configured gates | Include unless scientific context says otherwise |
| **Warning** | The result is usable but has review reasons | Inspect the EIC and affected samples |
| **Poor** | The signal or peak assignment is unreliable | Correct the peak, adjust the method, or exclude |
| **Insufficient data** | Too little usable signal is present | Verify polarity, m/z, RT, and detection limits |

Treat verdicts as review support, not as a replacement for method validation.

## Mark review state

Use the compound controls to mark important compounds, review status, or exclusions. These states persist in the targeted session.

The **Important only** and compound filters in **Results** define the exported subset. Apply them before downloading the CSV or MS² spectra.

## Next step

→ [Visualize targeted results](/workflow/visualize)

→ [Filter and export targeted results](/workflow/export)
