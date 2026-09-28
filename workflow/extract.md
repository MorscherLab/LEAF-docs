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
| **Organize names** | On | Under **Advanced**; remove common filename prefixes and suffixes from sample labels. |

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

The **Presets** tab saves the current extraction setup under a name and loads saved setups back. A targeted preset stores all extraction parameters, the compound list, and tracing groups; sample metadata is not included. **Load preset** shows a diff before replacing the open setup, and **Undo** restores the previous setup.

→ [Save, load, and share presets](/workflow/presets)

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
