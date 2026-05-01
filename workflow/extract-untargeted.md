# Extract — Untargeted

Untargeted mode performs feature detection on Thermo `.raw` files **without** requiring a predefined metabolite list. LEAF detects peaks across the full m/z and retention-time range, aligns features across samples, and produces a feature table for downstream filtering and identification.

> [Screenshot: Extract page in Untargeted mode showing the parameters sidebar]

## When to use it

| Untargeted is appropriate when... | Targeted is appropriate when... |
|-----------------------------------|---------------------------------|
| The compound composition of the sample is not known | A defined panel of compounds is to be quantified |
| The objective is discovery of unknown metabolites | The objective is monitoring of specific pathways |
| A survey-level comparison between groups is required | Quantitative comparisons of named compounds are required |

The two modes can be combined: untargeted analysis to identify candidate features, then [targeted](/workflow/extract) extraction once those features are characterized.

## Switch to untargeted mode

On the [Extract page](/workflow/extract), click the **Targeted / Untargeted** toggle at the top. The compound list editor disappears (you don't need a CSV) and the parameters sidebar swaps in untargeted-specific options.

Use a folder of Thermo `.raw` files for untargeted runs. mzML input is supported in targeted extraction, but the current untargeted pipeline only scans `.raw` / `.RAW` files.

## Parameters

| Parameter | Default | What it does |
|-----------|---------|--------------|
| **Polarity** | NEG | Match your method's polarity |
| **Mass Tolerance** | 5 ppm | Tighter than targeted — affects feature alignment |
| **Min intensity** | 1000 | Drop features below this peak height |
| **Min scans** | 5 | Require a feature to persist across at least N scans |
| **RT tolerance** | 0.3 min | Match features across nearby retention times |

## Run the extraction

Click **Start Processing**. Progress shows in the same floating action button as targeted runs. Untargeted runs usually take longer than targeted runs because LEAF searches for features across the full m/z and retention-time range, not only the compounds in a list.

## Open the results

After completion, click **Open** in the jobs panel. The Untargeted view loads — see [Inspect features](/workflow/inspect-features).

::: details Also from a script
Headless equivalent of this page:

```bash
leaf untargeted ./samples \
  --polarity NEG --ppm 5 --min-scans 5
```

→ [`leaf untargeted` reference](/scripting/cli/untargeted)
:::

## Next step

→ [Inspect features](/workflow/inspect-features)
