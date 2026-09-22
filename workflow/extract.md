# Extract — Targeted

Use **Extract** to choose LC-MS inputs, configure a targeted run, and start processing.

For a minimal first run, follow [Hands-on Targeted Analysis](/get-started/quickstart).

## Layout

LEAF 0.8 uses three working areas:

| Area | Contents |
|---|---|
| **Left sidebar** | Input, polarity, ppm, alignment, MS², blank handling, engine, RT window, and advanced controls |
| **Compound List / Sample Metadata / Presets** | Define inputs, design factors, or reuse a saved setup |
| **Isotope Tracing** | Define tracer groups and compound assignments |

The start button is fixed at the bottom of the sidebar. **Jobs** reports queued, active, completed, and failed work.

## Select input files

Open the file picker from the left sidebar. A normal open uses the cached folder listing; **Refresh** forces a server rescan. Plain clicks add or remove files, and **Shift** extends a range.

In standalone LEAF, select a local data folder. In a configured MINT deployment, select a folder exposed by the administrator.

**Analyze local files (no upload)** decodes supported files in the browser and sends extracted data instead of the original RAW files. This path disables MS² capture.

## Load the compound list

Drop a CSV or TSV onto **Compound List**, use the upload area, or load a default list. LEAF accepts native, Skyline, and El-MAVEN column names.

Click **Validate** after parsing. Invalid formulas, missing required values, and adducts that conflict with an explicitly selected polarity block the run.

→ [Compound-list fields and validation](/workflow/prepare-data)

## Input controls

| Control | Default | Purpose |
|---|---|---|
| **Polarity** | Auto | Detect from the folder name, adducts, or scan metadata; **Pos** and **Neg** force a value. |
| **Mass Tolerance** | 5 ppm | Set the m/z extraction tolerance. |
| **Align** | Auto | Enable per-block RT alignment when the sample sheet has multiple batch, matrix, or tissue blocks. |
| **MS² spectra** | On | Extract DDA spectra with MS1 chromatograms. |
| **Skip blanks** | On | Drop filenames containing `blank` before reading. |
| **Organize names** | On | Remove common filename prefixes and suffixes from sample labels. |

## Engine

| Engine | Purpose |
|---|---|
| **CWT** *(default)* | Wavelet-ridge peak detection |
| **Prom.** | MAD-threshold prominence detection |
| **v2d** | Cross-sample coherence; requires sample metadata |
| **Off** | Extract EICs without peak picking or scoring |

**RT Window** defaults to 0.3 minutes. Under **Advanced**, choose **Reference-guided** to anchor searches on the compound-list RT or **De novo** to detect RT from the data. Scoring thresholds and instrument-specific intensity gates are also available there.

## Sample metadata

The **Sample Metadata** tab is available with the v2d engine. Upload a CSV/TSV sheet or build factors from filenames. The sheet needs a `file` column and may include `factor:<name>` columns plus `blank_role`.

Metadata is required for v2d and for automatic block alignment. It is not stored in extraction presets.

## Presets

The **Presets** tab stores reusable extraction setups in LEAF's preset database.

### Save the current setup

1. Configure the input controls, compound list, and tracing groups.
2. Open **Presets** and select **Save current as preset**.
3. Enter a unique name and optional description.
4. Choose visibility when sharing is available:
   - **Private** — only you
   - **Shared** — selected collaborators have read-only access
   - **Lab** — visible to every lab user

A targeted preset stores all extraction parameters, the compound list, and tracing groups. Sample metadata remains with the experiment and is not included.

### Find and load a preset

In standalone LEAF, search your private presets by name and filter by pipeline: **Targeted**, **v3d**, or **ROI**. When sharing is available, **Private**, **Shared**, and **Lab** filters narrow the list by visibility. Select a preset to review its parameters and bundled content.

**Load preset** shows a diff before replacing the open setup. Choose **Save current first** when the current settings must be retained. After loading, the confirmation bar provides one-step **Undo**.

A preset from another pipeline cannot load into the current mode. **Switch to … and load** changes modes. Switching between targeted and untargeted preserves the setup in the mode you leave; switching between v3d and ROI replaces the current untargeted setup, which one-step **Undo** can restore.

### Maintain presets

Owners can rename, change visibility, manage collaborators, update the stored snapshot from the current setup, or delete a preset. Non-owners can load and edit the applied setup, but cannot modify the stored preset; **Save as copy** creates a private copy owned by the current user.

Presets saved with the 0.7 run-config vocabulary may be unreadable in 0.8. Recreate them from a current setup or generated 0.8 config.

## Isotope tracing

Define tracer groups before starting a labeling experiment. LEAF validates group assignments and formula-based channels.

→ [Configure stable-isotope tracing](/workflow/tracing)

## Start and monitor processing

The start button becomes available when the input source and compound list are valid. Click it, then open **Jobs** to follow the run.

| State | Meaning |
|---|---|
| **Queued** | Waiting for a worker slot |
| **Running** | Processing; stage and percentage update live |
| **Completed** | Ready to download or open |
| **Failed** | Open the job to read its error and warnings |

Choose **Open** on a completed targeted job to load **Analysis**.

::: details Run the same pipeline from the CLI

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --polarity neg \
  --ppm 5 \
  --engine cwt \
  --rt-window 0.3
```

→ [`leaf targeted` reference](/scripting/cli/targeted)

:::

## Next step

→ [Analyze targeted results](/workflow/analyze)
