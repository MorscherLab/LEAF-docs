# Python Package Overview

In addition to the web interface, LEAF can be used as a Python package for scripted analyses, batch processing pipelines, and integration into existing computational workflows.

::: warning Scope
This page documents the user-facing Python entry points relevant to scripted analysis. The full developer API — internal data structures, plugin interfaces, and extension points — is documented in the [LEAF repository](https://github.com/MorscherLab/LEAF/tree/main/docs) and is outside the scope of this manual.
:::

## When to use the package vs the UI

| Use the web UI when... | Use the Python package when... |
|------------------------|--------------------------------|
| Performing exploratory or interactive analysis | Running batch analyses on many datasets with shared parameters |
| Reviewing peak quality and adjusting integrations manually | Reproducing an analysis as part of a manuscript or pipeline |
| Producing visualizations for inspection | Integrating LEAF results with downstream Python tools (pandas, scikit-learn, etc.) |
| One-off or ad hoc work | Embedding LEAF in a multi-step workflow (Snakemake, Nextflow, custom scripts) |

The two interfaces operate on the same underlying file formats: a `.msd` produced by the UI can be loaded by the Python package, and vice versa.

## Installation

The Python package is installed by the same wheel that provides the `leaf` command-line tool. See [Install on desktop](/get-started/install-desktop) for installation instructions.

To verify the package is importable:

```python
import leaf
print(leaf.__version__)
```

## Public surface

The package re-exports four classes intended for scripted use:

```python
from leaf.analyzer import Samples, Analyzer, PeakPicking, QCReport
```

| Name | Role |
|------|------|
| `Samples` | Central data container — sparse intensity tensors, sample/metabolite indices, peak dictionary. The result of every extraction. Persisted via `Samples.load(path)` / `samples.save(path)`. |
| `Analyzer` | RAW / mzML extraction. Constructor takes a folder or file list plus a metabolite CSV; `extract_metabolites(...)` returns a `Samples`. |
| `PeakPicking` | Peak detection on an existing `Samples`. Constructor takes the `Samples`; `run(...)` returns a quantification DataFrame. |
| `QCReport` | EQC / IQC sample analysis (separate from the per-compound verdicts produced by `leaf.analyzer.score`). |

For per-compound quality verdicts (good / warning / poor — the same colours the web UI shows), use the orchestrator in `leaf.analyzer.score`:

```python
from leaf.analyzer.score import score_dataset, ScoringConfig
```

::: info Public surface
The names above are stable as of LEAF 0.5; signatures and module paths may change before 1.0. The formal class reference (parameters, return types, methods) lives upstream in [LEAF's developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api). This manual covers usage patterns only — see [Quickstart](/python/quickstart) for runnable examples.
:::

## Next

→ [Quickstart](/python/quickstart) — runnable scripted-analysis recipes
