# Python Recipes

Short, runnable recipes for common scripted targeted-analysis tasks. Each uses only public exports from `leaf.analyzer` (see [Public surface](/scripting/python/overview#public-surface)).

::: warning Stability
Names and signatures may change before LEAF 1.0. Install a specific release wheel, and record the exact LEAF version used, to keep scripts reproducible. The formal class reference lives in [LEAF's developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api).
:::

## Recipe 1 — Batch extraction from a folder

```python
from leaf.analyzer import Extractor

# Constructor takes the RAW folder + the compound CSV.
extractor = Extractor(
    file_path="./samples",
    metabolite_list_path="./compounds.csv",
    organize_name=True,    # auto-parse clean sample names from filenames
    skip_blank=True,       # ignore files with "blank" in the name
)

# Run extraction. Returns a Samples — the same container the web UI builds.
samples = extractor.extract_metabolites(
    polarity="NEG",
    tolerance=5,           # ppm
    backend="auto",        # 'rust' (SEED) on macOS/Linux, 'dotnet' on Windows
    extract_tic=True,
)

# Persist to a .msd archive
samples.save("analysis.msd")
```

The `.msd` reopens in the web UI by drag-and-drop; see [Reopening a .msd file](/workflow/export#reopening-a-msd-file).

## Recipe 2 — Reopen a `.msd` and re-run peak picking

```python
from leaf.analyzer import Samples, PeakPicking

# Load an existing analysis. classmethod returns a Samples.
samples = Samples.load("analysis.msd")

# PeakPicking takes the Samples in the constructor. run() returns a
# quantification DataFrame and mutates samples in place.
picker = PeakPicking(samples, intensity_threshold=1e5)
quant_df = picker.run(
    rt_window=0.3,
    quantify_method="area_top",
    rt_mode="reference",   # use expected RT from the CSV as anchor
)

# quant_df is a metabolite × sample pandas DataFrame
print(quant_df.head())

# Save the updated Samples back
samples.save("analysis-repicked.msd")
```

## Recipe 3 — Per-compound quality verdicts

The verdict colours the web UI shows (good / warning / poor) come from the scoring orchestrator, not from `QCReport` (which handles EQC/IQC samples instead).

```python
from leaf.analyzer import Samples
from leaf.analyzer.score import score_dataset, ScoringConfig

samples = Samples.load("analysis.msd")
score_dataset(samples, config=ScoringConfig())   # mutates samples in place

# Saved scores re-open in the web UI's Quality info panel
samples.save("analysis-scored.msd")
```

The `ScoringConfig` knobs (detection-rate threshold, RT-deviation tolerance, peak-shape minimum) are documented in [LEAF's developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api/scoring.md).

## Recipe 4 — Tracing in a script

Tracing is configured by passing the JSON dictionary produced by the web UI's Tracing Editor directly to `extract_metabolites`:

```python
import json
from leaf.analyzer import Extractor

with open("tracing-13C.json") as f:
    tracing = json.load(f)

extractor = Extractor(
    file_path="./samples",
    metabolite_list_path="./compounds.csv",
)
samples = extractor.extract_metabolites(
    polarity="NEG",
    tolerance=5,
    tracing=tracing,
)
samples.save("tracing-run.msd")
```

See [Isotope tracing](/workflow/tracing) for the JSON schema and [`leaf targeted --tracing-path`](/scripting/cli/targeted) for the equivalent CLI flag.

## Recipe 5 — Reading intensities and peaks out of a `Samples`

`Samples` exposes accessor methods rather than raw attributes; these accessors handle the sparse-tensor layout:

```python
from leaf.analyzer import Samples

samples = Samples.load("analysis.msd")

# Per-compound metadata as a pandas DataFrame
compounds_df = samples.compounds_list

# Intensities for one (sample, metabolite) pair
intensities = samples.get_intensities("WT_rep1", "Glucose")

# RT axis values matching the intensity columns
rt_axis = list(samples.rt_index.keys())

# Detected peak indices (RT positions) for that (sample, metabolite)
glucose_idx = samples.get_metabolite_index("Glucose", _type="first")
peak_rt_idxs = samples.peaks_dict.get((samples.sample_index["WT_rep1"], glucose_idx), [])
```

The exact accessor set is documented upstream — `Samples.get_data`, `Samples.get_area`, `Samples.get_batch_intensities` cover the common shapes; see the [model reference](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api/model.md).

## Reproducibility

Every `.msd` carries the parameters used during extraction. Pin the LEAF version and save input files, compound lists, and tracing JSON files alongside the archive to support reproducible analysis.

## Next

→ [LEAF developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs) — full class reference, plugin interfaces, internal modules
