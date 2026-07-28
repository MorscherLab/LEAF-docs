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

## Inspect the EIC chart

The upper chart area opens on **EIC Chart**. It overlays the extracted-ion chromatograms for the selected samples and active compound.

### EIC toolbar

| Control | How to use it |
|---|---|
| **Per-sample** | Enter single-sample integration. The active trace remains highlighted while the others are dimmed. |
| **Align RT** | Temporarily show each trace at its aligned retention time. This toolbar choice returns to the saved default after a page reload. |
| **Peak view** | Zoom to the expected peak region for routine review and integration. |
| **Global view** | Show the full chromatogram to inspect distant peaks or unexpected signal. |
| **Chart settings** | Set the chart defaults, display aids, renderer, and peak-marker threshold. |

### Chart settings

![EIC Chart Settings open beside the chromatogram](/screenshots/targeted/targeted-chart-settings.jpg)

These settings are saved in the browser and reused for later chart sessions.

| Option | How to use it |
|---|---|
| **Show Legend** | Show or hide the sample names and trace colors. Hide it when the legend covers the chromatogram. |
| **Wheel zooms Y** | Make the mouse wheel zoom intensity instead of retention time. When it is off, scroll zooms RT and `Shift` + scroll zooms intensity. |
| **KDE Groups** | Show or hide consensus peak groups as green triangle labels above the chart. |
| **Fast Renderer — Preview** | Use the WebGL2 preview for large or slow traces. The option is marked as a preview because its behavior may still change. |
| **Align RT (default)** | Save whether new chart sessions start with aligned traces. Use the toolbar **Align RT** switch for a temporary override. |
| **Shade merged peak** | Shade the integrated region after a manual merge. This is available with the fast renderer. |
| **Default View — Peak / Global** | Choose the view used when a chart session opens. The toolbar view buttons change only the current view. |
| **Peak Threshold** | Hide auto-detected peak markers below the selected intensity. Click **Reset** to return to `1e6`. The threshold only controls marker visibility; stored measurements stay unchanged. |

## Integrate one sample at a time

Use **Per-sample** mode when different samples need different RT windows.

![Per-sample mode with the active sample highlighted and other traces dimmed](/screenshots/targeted/targeted-per-sample-mode.jpg)

1. Select the samples that require review.
2. Click **Per-sample** or press `S`. LEAF starts with the first selected sample.
3. Press `J` / `K` or `↑` / `↓` to move through the selected samples. The active sample name appears in the toolbar.
4. Drag across the intended RT window for the highlighted trace.
5. Press `Enter` or click **Merge Sample** to apply the window only to that sample.
6. Repeat for the remaining samples, then press `Esc` or click the active sample switch to leave the mode.

Navigation wraps from the last selected sample to the first. Changing the compound exits Per-sample mode so an edit is not accidentally applied to another compound.

## Integrate the selected samples together

Use the standard mode when the same RT window is correct for all selected samples:

1. Leave **Per-sample** mode.
2. Select the required compound and samples.
3. Drag across the intended RT region in **EIC Chart**.
4. Press `Enter` or click **Merge Data**.
5. Use **Undo last merge** to reverse the most recent change.

Manual peak edits persist with the session. LEAF keeps the RT alignment state when it recalculates the affected quantification.

## Review RT alignment

Open **RT Check** to review retention-time behavior across compounds.

| Item | What it shows |
|---|---|
| **Total compounds** | Number of compounds included in the RT summary |
| **Outliers** | Count and percentage of compounds outside the expected RT relationship |
| **R² correlation** | Agreement between the compared retention times |
| **Mean Δ (min)** | Average retention-time difference in minutes |
| **Alignment status** | Whether aligned RT information is available and being used |

Select an outlying compound to return to its EIC. A legacy `.msd` may show **No RT data available** if the saved session does not contain the required RT fields.

## Compare total-ion chromatograms

Open **TIC Overlay** to compare total-ion chromatograms across the selected samples. The tab is available when TIC data were saved with the session.

| Control | How to use it |
|---|---|
| **Linear / Log** | Use **Linear** to compare absolute signal or **Log** to reveal lower-intensity differences. |
| **Normalize each trace to max = 1** | Compare trace shape independently of total intensity. Turn it off when absolute signal differences matter. |
| Sample and point counts | Confirm how many selected samples and TIC points are being displayed. |

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

## Inspect isotopologues

The lower-left panel opens on **Isotopologue**.

| Control | How to use it |
|---|---|
| **Abs** | Compare measured isotopologue intensities. |
| **%** | Compare each isotopologue as a percentage of its sample's displayed envelope. |
| **Group** | Aggregate the bars by the sample groups defined in the sidebar. The control is disabled until groups exist. |
| **Select All** | Show every available isotopologue channel. |
| Individual channels | Show or hide **Parent**, **M+1**, **M+2**, and any additional channels present in the session. |
| **Correction** | Display corrected values when a compatible tracer is configured. |
| **Configure tracers…** | Set the tracer element and purity used for correction. |

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

## Chart keyboard shortcuts

Shortcuts work while the chart workspace has focus and a text field is not being edited.

| Key | Standard mode | Per-sample mode |
|---|---|---|
| `J` / `K` or `↓` / `↑` | Next / previous compound | Next / previous selected sample |
| `S` | Enter Per-sample mode | Exit Per-sample mode |
| `Esc` | Close the active overlay | Exit Per-sample mode |
| `Enter` | Merge the selected window for all selected samples | Merge the selected window for the active sample |
| `Space` | Switch between Peak and Global view | Same |
| `R` | Reset chart zoom | Same |
| `H` / `L` | Pan left / right | Same |
| `Shift` + `L` / `Shift` + `H` | Zoom in / out | Same |
| `G` / `M` / `B` | Mark the compound good / medium / bad | Same |
| `I` | Toggle the compound's important marker | Same |

## Next step

→ [Visualize targeted results](/workflow/visualize)

→ [Filter and export targeted results](/workflow/export)
