# Hands-on Targeted Analysis

This walkthrough takes you from opening LEAF to inspecting a targeted result. It uses your own LC-MS files and the demo primary-metabolism compound list. Allow about 5 minutes for setup, plus processing time.

When LEAF is opened inside MINT, select the experiment before starting and save the finished result back to that experiment.

## What this walkthrough covers

| Capability | Current status |
|---|---|
| Targeted extraction from DDA, Full Scan, SIM, or PRM data | Stable |
| Automatic peak picking and quality scoring | Stable |
| Isotope tracing and natural-abundance correction for ¹³C, ²H, and ¹⁵N | Stable |
| MS² extraction and spectral-library matching | Stable |
| MRM transition-list workflows | Not yet supported |

| Input | Support |
|---|---|
| Thermo `.raw` | Native |
| `.mzml` / `.mzml.gz` | Native |
| Other vendor formats | Convert to mzML first |

## Before you start

Install and launch LEAF using [the standalone installer or wheel](/get-started/install-cli).

::: code-group

```bash [macOS standalone]
~/.leaf/leaf
# Open http://127.0.0.1:8000
```

```powershell [Windows standalone]
%LOCALAPPDATA%\leaf\leaf.cmd
# Open http://127.0.0.1:8000
```

```bash [Manual wheel install]
leaf webui run
# Open http://127.0.0.1:18008
```

:::

Keep the terminal open while you work. The browser should open on the LEAF **Extract** page.

## Prepare the two inputs

You need:

1. **Your LC-MS files** in one folder. For this first run, use a small folder containing one input format: `.raw`, `.mzml`, or `.mzml.gz`.
2. **The demo compound list**: download [`metabolite-list-primary-metabolism.csv`](https://github.com/MorscherLab/LEAF/blob/main/examples/metabolite-list-primary-metabolism.csv).

The demo list contains expected retention times. They may not match your chromatographic method, but they are sufficient for learning the interface. For quantitative work, replace them with method-specific values.

## Step 1: Confirm Targeted mode

Open **Extract** from the page selector and choose **Targeted** in the mode control.

## Step 2: Select your data folder

In **Data Folder**, click the folder picker and select the folder containing your LC-MS files. LEAF shows the selected path.

If the operating-system folder dialog does not open, use the path-entry button and paste the absolute folder path.

## Step 3: Load and validate the demo list

Drop `metabolite-list-primary-metabolism.csv` onto the **Compound List** area, or click the upload area and select it.

LEAF displays the parsed compounds in an editable table. Click **Validate**. The **Start Processing** button remains disabled until the list is valid and its adducts match the selected polarity.

![Targeted extraction setup with a validated compound list](/screenshots/targeted/targeted-extract-demo-list.jpg)

## Step 4: Check polarity and keep the defaults

Set **Polarity** to match the acquisition:

- **Neg** for negative-ion data
- **Pos** for positive-ion data

For this introductory run, keep the remaining LEAF 0.7 defaults:

| Setting | Default |
|---|---|
| Mass tolerance | 5 ppm |
| RT window | ±0.3 min |
| Peak picking | On |
| RT mode | Reference-guided |
| Quality scoring | On |
| MS² capture | On |

You do not need to configure sample metadata, isotope tracing, or advanced parameters for the first run.

## Step 5: Start processing

Click **Start Processing**. The **Jobs** button in the lower-right corner shows the current percentage.

Click **Jobs** to see the active job, current stage, file count, warnings, and cancel action. When processing finishes, the button turns green and the job moves to **Completed**.

## Step 6: Open the result

Open **Jobs → Completed**, then click **Open** for the targeted job. LEAF loads the **Analysis** workspace.

In **Charts**:

1. Select a compound in the metabolite table.
2. Inspect its extracted-ion chromatogram in **EIC Chart**.
3. Review the **Isotopologue** bars.
4. Read the quality verdict and review reasons.

![Targeted analysis workspace showing chromatograms and quality results](/screenshots/targeted/targeted-analysis-charts.jpg)

## Step 7: Inspect and export the result table

Open **Results** in the top navigation. This table contains the quantitative matrix.

- Switch between **Apex** and **Area** only if the analysis requires a different quantification metric.
- Use the metabolite and isotopologue filters to define the exported rows.
- Choose **Wide** for a conventional matrix or **Long/Tidy** for analysis in R or Python.
- Click **Download ZIP** for the filtered CSV output.
- Use the download button in the top bar to save the complete `.msd` session.

The export follows the filters currently applied in **Results**.

## Next targeted steps

- [Prepare a method-specific compound list](/workflow/prepare-data)
- [Review all targeted extraction controls](/workflow/extract)
- [Inspect and edit peaks](/workflow/analyze)
- [Configure isotope tracing](/workflow/tracing)
- [Create statistical visualizations](/workflow/visualize)
- [Export or reopen targeted results](/workflow/export)

For MS² data, enable capture during extraction, then use the **MS²** tab in **Charts** to inspect spectra and configure library matching.

For non-Thermo instruments, convert the vendor data to mzML with the vendor converter or ProteoWizard before starting.

## Troubleshooting

See [Troubleshooting](/reference/troubleshooting), including [forced browser refresh and cache clearing](/reference/troubleshooting#browser-refresh-and-cache).
