# Scripting

LEAF can be driven without the web UI in two ways:

| If you want to... | Use |
|---|---|
| Drive analyses from a terminal — schedule, batch, integrate with shell pipelines | The [`leaf` command-line interface](/scripting/cli/overview) |
| Embed LEAF in Python pipelines (Snakemake, Nextflow, custom scripts, notebooks) | The [`leaf` Python package](/scripting/python/overview) |

Both interfaces operate on the same file formats as the web UI: a `.msd` produced by the UI loads in a script, and vice versa.

## When to script vs use the UI

| Use the web UI when... | Script LEAF when... |
|---|---|
| Performing exploratory or interactive analysis | Running batch analyses on many datasets with shared parameters |
| Reviewing peak quality and adjusting integrations manually | Reproducing an analysis as part of a manuscript or pipeline |
| Producing visualizations for inspection | Integrating LEAF results with downstream Python tools (pandas, scikit-learn, etc.) |
| One-off or ad hoc work | Embedding LEAF in a multi-step workflow |

## Where to start

- [`leaf webui`](/scripting/cli/webui) — start the web UI from a terminal (most common)
- [`leaf targeted`](/scripting/cli/targeted) — targeted extraction headless
- [`leaf untargeted`](/scripting/cli/untargeted) — untargeted feature discovery headless
- [`leaf watch`](/scripting/cli/watch) — auto-extract new RAW files as they land in a folder
- [Python recipes](/scripting/python/recipes) — common scripted-analysis tasks
- [SEED](/scripting/reader) — the Rust reader powering LEAF on macOS / Linux
