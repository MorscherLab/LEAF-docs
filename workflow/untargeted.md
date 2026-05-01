# Untargeted Analysis

Untargeted mode performs feature detection on RAW files **without** requiring a predefined metabolite list. LEAF detects peaks across the full m/z and retention-time range, aligns features across samples, and produces a feature table for downstream filtering and identification.

> [Screenshot: Untargeted view showing feature table and EIC chart]

## When to use it

| Untargeted is appropriate when... | Targeted is appropriate when... |
|-----------------------------------|---------------------------------|
| The compound composition of the sample is not known | A defined panel of compounds is to be quantified |
| The objective is discovery of unknown metabolites | The objective is monitoring of specific pathways |
| A survey-level comparison between groups is required | Quantitative comparisons of named compounds are required |

The two modes can be combined: untargeted analysis to identify candidate features, followed by targeted analysis once those features are characterized.

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

After completion, click **Open** in the jobs panel. The **Untargeted view** loads.

## Layout

| Panel | What it shows |
|-------|---------------|
| **Feature table** | Every detected feature with m/z, RT, detection rate, intensity stats |
| **EIC chart** | Chromatogram for the selected feature across samples |
| **Alignment panel** | RT alignment quality across samples |
| **Gap-group panel** | Features that should align but don't — flagged for review |
| **Stats panel** | Per-feature group comparisons (fold change, p-value) |
| **Results panel** | Filter, sort, and tag features for export |

## Triage workflow

1. **Filter** the feature table by detection rate (e.g., retain only features present in >50% of samples)
2. **Sort** by intensity or by between-group fold-change to identify candidate features
3. **Inspect** the EIC chart to assess peak shape, signal-to-noise ratio, and reproducibility across samples
4. **Tag** candidate features with flags or notes
5. **Export** the tagged feature set as a CSV; the same CSV can be re-imported as a targeted compound list for subsequent quantification

## Identify features

LEAF doesn't identify features for you — it gives you m/z and RT. To get a name, search:

- A spectral library (e.g., HMDB, METLIN, MoNA)
- An MS2 spectrum from the same sample (LEAF supports MS2 matching against mzVault libraries — see the [LEAF developer docs](https://github.com/MorscherLab/LEAF/blob/main/docs/leaf/api/ms2.md))
- A pure standard run on the same instrument

When you have a name, add the feature to a targeted CSV for the next batch of samples.

## Export

Untargeted exports save as **`.usd`** files — same format family as `.msd`, but with feature data instead of compound data. The export dialog also offers per-feature CSVs.

→ [Export details](/workflow/export)

## Next step

→ [UI tour](/reference/ui-tour) — every panel and button explained
