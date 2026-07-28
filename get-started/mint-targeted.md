# Targeted Analysis in MINT

This walkthrough runs a complete targeted LEAF analysis inside MINT: open the plugin, bind the work to an experiment, select server data, process the demo compound list, inspect the result, and save the `.msd` artifact back to the experiment.

For a local LEAF installation, use the [standalone hands-on tutorial](/get-started/quickstart).

## Before you start

You need:

- Access to a MINT server with the LEAF 0.7 plugin installed
- Permission to use LEAF and read the required server data folder
- A MINT experiment where the result can be stored
- Your LC-MS files in a folder exposed by the MINT administrator
- The demo [`metabolite-list-primary-metabolism.csv`](https://github.com/MorscherLab/LEAF/blob/main/examples/metabolite-list-primary-metabolism.csv) on your computer

The demo list is for learning the workflow. Its retention times may not match your LC method.

## Step 1: Sign in and open LEAF

Open your lab's MINT URL and sign in. On the application dashboard, select **LEAF**.

![MINT application dashboard with the LEAF tile](/screenshots/targeted/mint-leaf-tile.jpg)

LEAF opens on **Extract**. If another LEAF page is active, use the page selector in the top bar and choose **Extract**.

## Step 2: Select the MINT experiment

Use the experiment control in the LEAF top bar to select the experiment that owns this analysis.

The selected experiment provides the destination for the result artifact. Confirm the experiment name before starting, especially when several projects use similar names.

![LEAF in MINT with an experiment selected](/screenshots/targeted/mint-experiment-selected.jpg)

## Step 3: Select a server data folder

Confirm that the extraction mode is **Targeted**.

Open **RAW Folders**, search for the folder containing your LC-MS files, and select it. LEAF can process `.raw`, `.mzml`, or `.mzml.gz` targeted inputs. Keep one input format per run.

If the expected folder is absent, refresh the folder list. If it still does not appear, ask the MINT administrator to expose it to LEAF.

::: tip Analyze without uploading RAW files
**Analyze local files (no upload)** decodes supported local files in the browser and sends extracted chromatograms rather than the original RAW files. The normal MINT path uses a server folder and is the path used in this walkthrough.
:::

## Step 4: Load and validate the demo list

Drop `metabolite-list-primary-metabolism.csv` onto **Compound List**, or click the upload area and select it.

Click **Validate** after the table appears. LEAF 0.7 blocks the run when a formula is invalid or when an adduct conflicts with the selected polarity. Correct the highlighted rows before continuing.

![MINT targeted extraction with the demo compound list validated](/screenshots/targeted/mint-targeted-setup.jpg)

## Step 5: Check polarity and keep the defaults

Choose **Neg** or **Pos** to match the acquisition. For the first run, keep the other defaults:

| Setting | Default |
|---|---|
| Mass tolerance | 5 ppm |
| RT window | ±0.3 min |
| Peak picking | On |
| RT mode | Reference-guided |
| Quality scoring | On |
| MS² capture | On |

No sample metadata, tracing configuration, or advanced parameter changes are required for this walkthrough.

## Step 6: Start and monitor the job

Click **Start Processing**.

The **Jobs** button in the lower-right corner shows progress. Open it to see the current stage, file count, warnings, and cancel action. MINT may queue the job when the configured concurrency limit is already in use.

When processing finishes, open **Jobs → Completed** and click **Open**.

## Step 7: Review the analysis

LEAF opens the targeted **Analysis** workspace.

In **Charts**:

1. Select a compound from the metabolite table.
2. Inspect its **EIC Chart** and detected peak.
3. Review the **Isotopologue** bars.
4. Read the quality verdict and its review reasons.
5. Open **MS²** when spectra were captured.

Use **Results** to inspect the quantitative matrix, choose **Apex** or **Area**, filter metabolites or isotopologues, and download a ZIP containing wide or long/tidy CSV output.

## Step 8: Save the result to MINT

Confirm the experiment shown in the top bar, then click **Save as new result**.

In the artifact dialog:

1. Enter a stable **Artifact key**.
2. Enter a clear **Display name** ending in `.msd`.
3. Add an optional **Note**.
4. Click **Save Artifact**.

After the first save, **Save to experiment** updates the current artifact. Use **Save as new result** when the revised analysis must remain separate from the existing artifact.

![Saving a targeted result artifact to a MINT experiment](/screenshots/targeted/mint-save-targeted-result.jpg)

The complete `.msd` is then available from the experiment's analysis artifacts. Use the top-bar download button when you also want a local `.msd` copy.

## Reopen a saved MINT result

Open the experiment in LEAF and select the required targeted artifact. LEAF loads it into **Analysis** with peaks, groups, quality information, parameters, and result data restored.

## Troubleshooting

- **LEAF tile is missing:** ask an administrator to grant access to the LEAF plugin.
- **Experiment is missing:** confirm project membership and experiment permissions.
- **Server folder is missing:** refresh the folder list, then ask the administrator to expose the path.
- **Start Processing is disabled:** select a folder, load a compound list, validate it, and resolve polarity/adduct errors.
- **A newly deployed LEAF version does not appear:** follow [Browser refresh and cache](/reference/troubleshooting#browser-refresh-and-cache).
- **Saving fails:** confirm that you can write analysis artifacts to the selected experiment.

For additional cases, see [Troubleshooting](/reference/troubleshooting).
