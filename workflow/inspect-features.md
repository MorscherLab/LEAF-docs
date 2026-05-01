# Inspect Features

After an [untargeted extraction](/workflow/extract-untargeted) completes, the Untargeted view is the primary interface for feature triage — filtering the feature table, inspecting peak shapes, and tagging candidates for follow-up.

> [Screenshot: Untargeted view showing feature table and EIC chart]

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
5. **Export** the tagged feature set as a CSV; the same CSV can be re-imported as a [targeted](/workflow/extract) compound list for subsequent quantification

## Identify features

LEAF doesn't identify features for you — it gives you m/z and RT. To get a name, search:

- A spectral library (e.g., HMDB, METLIN, MoNA)
- An MS2 spectrum from the same sample (LEAF supports MS2 matching against mzVault libraries — see the [LEAF developer docs](https://github.com/MorscherLab/LEAF/blob/main/docs/leaf/api/ms2.md))
- A pure standard run on the same instrument

When you have a name, add the feature to a targeted CSV for the next batch of samples.

## Next step

→ [Export](/workflow/export) — `.usd` and per-feature CSVs
