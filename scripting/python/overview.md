# Python Package Overview

LEAF can be used as a Python package for scripted targeted analyses, batch processing pipelines, and integration into existing computational workflows.

## When to use the package vs the UI

| Web UI recommended for | Python package recommended for |
|------------------------|--------------------------------|
| Performing exploratory or interactive analysis | Running batch analyses on many datasets with shared parameters |
| Reviewing peak quality and adjusting integrations manually | Reproducing an analysis as part of a manuscript or pipeline |
| Producing visualizations for inspection | Integrating LEAF results with downstream Python tools (pandas, scikit-learn, etc.) |
| One-off or ad hoc work | Embedding LEAF in a multi-step workflow (Snakemake, Nextflow, custom scripts) |

The two interfaces operate on the same underlying file formats: a `.msd` produced by the UI can be loaded by the Python package, and vice versa.

## Installation

The Python package is installed by the same wheel that provides the `leaf` command-line tool. See [Install the wheel + CLI](/get-started/install-cli) for installation instructions.

To verify the package is importable:

```python
from importlib.metadata import version

import leaf

print(version("leaf"))
```

## Public surface

Use the run objects for complete analyses and the step-wise classes for custom pipelines:

```python
from leaf import Targeted, Untargeted
from leaf.analyzer import TargetedExperiment, TargetedExtractor, PeakPicker, score_experiment
```

| Name | Role |
|------|------|
| `Targeted` | Complete targeted run with the same front-panel controls as `leaf targeted`. |
| `Untargeted` | Complete untargeted run with the same controls as `leaf untargeted`. |
| `TargetedExperiment` | Targeted result container; load and save `.msd` archives. |
| `TargetedExtractor` | Step-wise RAW, mzML, and LCD targeted extraction. |
| `PeakPicker` | Peak detection and quantification on a `TargetedExperiment`. |
| `score_experiment` | Score peaks and produce per-compound quality verdicts. |

For per-compound quality verdicts (good / warning / poor — the same colours the web UI shows), use the orchestrator in `leaf.analyzer.score`:

```python
from leaf.analyzer import score_experiment
```

::: info Public surface
The names above are the LEAF 0.8 public surface. Signatures may change before 1.0. The formal class reference lives upstream in [LEAF's developer docs](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api).
:::

## Next

→ [Recipes](/scripting/python/recipes) — common scripted-analysis tasks
