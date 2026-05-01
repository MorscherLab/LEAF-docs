# Extract — Untargeted

Untargeted mode performs feature detection on RAW files **without** requiring a predefined metabolite list. LEAF detects peaks across the full m/z and retention-time range, aligns features across samples, and produces a feature table for downstream filtering and identification.

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

## Parameters

| Parameter | Default | What it does |
|-----------|---------|--------------|
| **Polarity** | NEG | Match your method's polarity |
| **Mass Tolerance** | 5 ppm | Tighter than targeted — affects feature alignment |
| **Min intensity** | 1e5 | Drop features below this peak height |
| **Min samples** | 2 | Require a feature to appear in at least N samples to keep it |
| **RT range** | full run | Optionally restrict to a part of the run |

## Run the extraction

Click **Start Processing**. Progress shows in the same floating action button as targeted runs. Untargeted runs typically take 2–5× longer than targeted because every peak has to be detected, not just the ones in your list.

## Open the results

After completion, click **Open** in the jobs panel. The Untargeted view loads — see [Inspect features](/workflow/inspect-features).

::: details Also from a script
Headless equivalent of this page:

```bash
leaf untargeted ./samples \
  --polarity NEG --tolerance 5 --min-samples 2
```

→ [`leaf untargeted` reference](/scripting/cli/untargeted)
:::

## Next step

→ [Inspect features](/workflow/inspect-features)
