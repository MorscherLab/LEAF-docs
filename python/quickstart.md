# Python Quickstart

A minimal scripted-analysis example that mirrors the workflow described in [Run your first analysis](/get-started/quickstart), implemented through the Python package instead of the web interface.

::: warning Placeholder code
The code blocks below are scaffolds. Function names, parameter names, and module paths must be verified against the [LEAF repository documentation](https://github.com/MorscherLab/LEAF/tree/main/docs) before use. Sections marked <code>TODO</code> require input from the LEAF maintainers.
:::

## Prerequisites

The same inputs as the UI walkthrough:

1. A folder of Thermo `.raw` files
2. A CSV listing target metabolites (see [Prepare your data](/workflow/prepare-data) for the schema)

LEAF must be installed in the active Python environment ([Install on desktop](/get-started/install-desktop)).

## Outline of a scripted run

A typical batch script performs these steps:

1. Load the compound list (a CSV)
2. Configure extraction parameters (polarity, mass tolerance, RT window, peak picking, scoring)
3. Run extraction over a folder of RAW files
4. Inspect the resulting intensity matrix and quality verdicts
5. Write a `.msd` archive for downstream use

```python
# TODO: Replace placeholder imports and function names with the
# authoritative public API once the stable surface is documented.

import leaf  # noqa: F401

# 1. Load the compound list
# compounds = leaf.io.read_compound_list("compounds.csv")

# 2. Configure extraction parameters
# params = leaf.ExtractionParameters(
#     polarity="NEG",
#     mass_tolerance_ppm=5,
#     rt_window_min=0.5,
#     peak_picking="v4",
#     quality_scoring=True,
# )

# 3. Run extraction over a folder of RAW files
# result = leaf.extract(
#     raw_folder="./samples",
#     compounds=compounds,
#     parameters=params,
# )

# 4. Inspect results
# intensities = result.intensities          # pandas DataFrame
# verdicts = result.verdicts                # per-compound quality verdicts
# peaks = result.peaks                      # detected peak boundaries

# 5. Save a .msd archive
# result.write("analysis.msd")
```

## Loading an existing `.msd` archive

```python
# TODO: Confirm the public loader name and signature.

# bundle = leaf.io.read_msd("analysis.msd")
# intensities = bundle.intensities
# verdicts = bundle.verdicts
```

The same archive opens in the LEAF web UI by drag-and-drop, allowing UI-based review of a script-produced result without re-extraction.

## Untargeted analysis

The untargeted entry point follows the same pattern but does not require a compound list. Parameters specific to untargeted mode (minimum intensity, minimum-samples threshold, RT range) replace the targeted parameters; see [Untargeted analysis](/workflow/untargeted) for the parameter semantics.

```python
# TODO: Confirm the untargeted entry point.

# result = leaf.extract_untargeted(
#     raw_folder="./samples",
#     parameters=leaf.UntargetedParameters(
#         polarity="NEG",
#         mass_tolerance_ppm=5,
#         min_intensity=1e5,
#         min_samples=2,
#     ),
# )
# result.write("analysis.usd")
```

## Isotope tracing

Tracing is configured by extending the targeted parameters with an isotopologue specification. See [Isotope tracing](/workflow/tracing) for the underlying physics and the JSON config format used by the UI.

```python
# TODO: Confirm the tracing parameter object.

# params = leaf.ExtractionParameters(
#     polarity="NEG",
#     mass_tolerance_ppm=5,
#     tracing=leaf.TracingConfig(
#         isotopologues=[("13C", 1), ("13C", 2)],
#     ),
# )
```

## Reproducibility

The full set of parameters used during extraction is stored inside the resulting `.msd` archive (`parameters.json` within the bundle; see [Export](/workflow/export)). Inspecting that file is sufficient to reconstruct the exact run programmatically.

## Next

→ [LEAF repository documentation](https://github.com/MorscherLab/LEAF/tree/main/docs) — full developer reference, plugin interfaces, internal modules
