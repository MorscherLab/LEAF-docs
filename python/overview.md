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

## Import surface

<!-- TODO: Replace with the authoritative public import surface once the
     stable API is finalised. The names below are placeholders and must be
     confirmed against the LEAF repository before being relied upon.

     Suggested sections to populate:
     - Top-level functions for batch extraction
     - Reading and writing .msd / .usd archives
     - Accessing intensity matrices, peaks, and quality verdicts as
       pandas DataFrames or numpy arrays
     - Configuring extraction parameters programmatically
-->

The public Python API is being stabilised. Until this section is filled in, treat the [LEAF repository documentation](https://github.com/MorscherLab/LEAF/tree/main/docs) as the authoritative reference for import paths and function signatures.

## Next

→ [Quickstart](/python/quickstart) — a minimal scripted-analysis example
