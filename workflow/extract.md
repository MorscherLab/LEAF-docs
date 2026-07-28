# Extract — Targeted

Use **Extract** to choose LC-MS inputs, load a compound list, configure the targeted run, and start processing.

For a minimal first run, follow [Hands-on Targeted Analysis](/get-started/quickstart). MINT users can follow the complete [Targeted Analysis in MINT](/get-started/mint-targeted).

![Targeted extraction setup with a validated compound list](/screenshots/targeted/targeted-extract-demo-list.jpg)

## Layout

The LEAF 0.7 targeted setup has three working areas:

| Area | Contents |
|---|---|
| **Left sidebar** | Data folder, acquisition settings, RT window, peak picking, instrument settings, and advanced reader controls |
| **Compound List / Sample Metadata** | Upload, edit, and validate compounds; optionally define sample factors |
| **Isotope Tracing** | Define tracer groups and assign compounds |

The **Start Processing** button is fixed at the bottom of the sidebar. The **Jobs** button in the lower-right corner reports queued, active, completed, and failed jobs.

## Select the input source

### Standalone LEAF

Open **Data Folder**, click the folder picker, and select the folder containing the LC-MS files. If the operating-system dialog does not open, paste the absolute path using the path-entry control.

### LEAF in MINT

Open **RAW Folders**, search for an administrator-exposed server folder, and select it. Refresh the list if a newly shared folder is absent.

### Analyze local files without uploading RAW data

The **Analyze local files (no upload)** action is available from the folder card. The browser decodes supported files and sends extracted chromatograms to LEAF instead of uploading the original files.

Use the regular server-folder path when you need MS² collection, very large files, or formats that the browser reader cannot decode.

## Upload the compound list

Drop a CSV or TSV onto **Compound List**, or click the upload area.

LEAF accepts:

- LEAF/RFA compound lists
- Skyline molecule or transition lists
- El-MAVEN compound databases and peak tables

After parsing, LEAF shows an editable table. Click **Validate** before starting.

LEAF 0.7 treats invalid formulas as blocking errors and highlights every affected row. The run is also blocked when a compound adduct conflicts with the selected polarity.

→ [Compound list formats and required fields](/workflow/prepare-data)

## Acquisition

| Parameter | Default | What it does |
|---|---|---|
| **Polarity** | Neg | Select **Neg** or **Pos** to match the acquisition |
| **Mass Tolerance** | 5 ppm | Sets the m/z extraction window |
| **Skip blanks** | On | Ignores inputs whose filename contains `blank` |

Changing polarity also changes the default adduct used for newly added compounds. Existing incompatible adducts must be corrected in the table.

## Parameters

| Parameter | Default | What it does |
|---|---|---|
| **RT Window** | 0.3 min | Searches ±0.3 minutes around the expected retention time |
| **Organize names** | On | Removes recognized acquisition prefixes when constructing sample names |
| **MS² capture** | On | Collects MS² spectra for later inspection and library matching |

MS² capture requires the SEED/Rust reader. LEAF selects that reader automatically when MS² is enabled.

## Peak picking

Peak picking is enabled by default.

| Method | Use |
|---|---|
| **Prominence** | MAD-threshold peak detection |
| **CWT** | Wavelet-ridge peak detection |
| **v2d** *(default)* | Cross-sample coherence detection |

The RT mode controls how the search is anchored:

| Mode | Behavior |
|---|---|
| **Reference-guided** *(default)* | Uses the retention time supplied in the compound list |
| **De novo** | Estimates the retention time from the data |

Use **Reference-guided** for a validated method. Use **De novo** when compound-list RTs are absent or only approximate.

## Sample metadata

When **v2d** is selected, the **Sample Metadata** tab is available next to **Compound List**.

Use it to:

- Upload a metadata CSV
- Auto-detect factors from filenames
- Add or remove factor columns
- Clear factors before replacing a design

Metadata rows can match the full filename or a unique token within it. Sample metadata is optional for a first run but is required for meaningful grouped visualizations.

## Instrument settings

Instrument settings are used by peak detection and quality scoring.

| Setting | Default | Purpose |
|---|---|---|
| **SNR Threshold** | 10 | Minimum signal-to-noise gate |
| **Intensity Threshold** | 100,000 | Peak-picker noise floor |
| **LOD (Scoring)** | Auto | Derived from the intensity threshold unless overridden |
| **Saturation Flag** | Auto | Flags, but does not automatically exclude, potentially saturated peaks |

Keep the defaults for the initial analysis. Adjust them only with instrument- and method-specific evidence.

→ [Quality verdicts and review reasons](/workflow/analyze#quality-information)

## Advanced

The reader backend is selected under **Advanced**:

| Backend | Notes |
|---|---|
| **SEED (Rust)** | Reads Thermo RAW and mzML-family inputs; required for MS² capture |
| **RawFileReader (.NET)** | Windows reference reader for Thermo RAW files |

The **Parallel Workers** control appears for the .NET reader. More workers increase memory use. LEAF shows an estimated-memory warning when the requested batch is likely to be expensive.

## Isotope tracing

For labeling experiments, define tracer groups in **Isotope Tracing** before starting. LEAF validates the assignments and blocks configurations that cannot be extracted.

→ [Configure isotope tracing](/workflow/tracing)

## Start and monitor processing

**Start Processing** becomes available when:

- An input source is selected
- At least one compound is loaded
- Compound validation succeeds
- Adducts match the selected polarity
- Tracing assignments have no blocking errors
- The required reader backend is available

Click **Start Processing**, then open **Jobs** to monitor the run.

| State | Meaning |
|---|---|
| **Queued** | Waiting for a MINT worker slot |
| **Running** | Processing; the percentage and current stage update live |
| **Completed** | Ready to download or open |
| **Failed** | Open the job for its error and warnings |

Choose **Open** on a completed targeted job to load it into **Analysis**.

::: details Run the targeted pipeline from the command line

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --polarity NEG \
  --tolerance 5 \
  --rt-window 0.3
```

→ [`leaf targeted` reference](/scripting/cli/targeted)

:::

## Next step

→ [Analyze targeted results](/workflow/analyze)
