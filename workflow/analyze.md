# Analyze Results

After extraction completes, the **Peak Picking** view is the primary interface for reviewing targeted results. It supports chromatogram inspection, sample comparison, quality-verdict review, and manual adjustment of peak regions when required.

> [Screenshot: full Peak Picking view with a metabolite selected]

## Open the view

Opening methods:

1. After an extraction finishes, click **Open** in the jobs panel
2. From any page, drag a previously-saved `.msd` file onto the window

## Layout

The view has a left sidebar and four central panels:

```
┌─────────────┬───────────────────────────────────┐
│ Sample      │  Metabolite Table  │  EIC Chart  │
│ Selector    ├───────────────────────────────────┤
│ (sidebar)   │  Isotopologues     │  Quality    │
└─────────────┴───────────────────────────────────┘
```

## Sample selector (left sidebar)

Lists every sample in the loaded dataset.

- **Checkboxes** — toggle which samples appear on the charts
- **Lightning-bolt button** — auto-group samples by name prefix (e.g., `WT_rep1`, `WT_rep2` → group `WT`)
- **Pick mode toggle** — switch between apex intensity and integrated peak area

> [Screenshot: sample selector with grouping applied]

## Metabolite table (top-left panel)

A scrollable list of every compound in the loaded dataset. Selecting a row loads that metabolite into the EIC chart, isotopologue bars, and quality info.

Columns include:

- **Verdict badge** (green / orange / red)
- **Compound name**
- **m/z** (observed)
- **RT** (median)
- **Detection rate** (% of samples)

Sort by clicking a column header. Filter by verdict using the dropdown at the top.

## EIC chart (top-right panel)

The EIC chart displays the selected metabolite across the selected samples.

- **Colored traces** — individual samples, or group-colored traces when grouping is enabled
- **Red dashed line** — expected retention time from the compound CSV
- **Red X markers** — auto-detected peaks
- **Drag to select** an RT range to manually define a peak region and see the recalculated areas

Adjacent **RT Check** tab shows retention-time deviation analysis:

- Scatter plot of manual vs. auto-detected RT values
- Summary cards: total compounds, outlier %, R² correlation, mean RT shift
- Sortable outlier table — click a row to jump to that metabolite's EIC

> [Screenshot: EIC chart with multiple sample traces and detected peak markers]

## Isotopologue bars (bottom-left panel)

Shows the isotope distribution (M+0, M+1, M+2, ...) for the selected metabolite.

- Toggle **grouped** vs **stacked** bar mode
- Toggle **absolute intensity** vs **percentage** display
- When grouping is on, bars show **mean ± SEM** per group
- Color-coded: M+0 (blue), M+1 (green), M+2 (amber), M+3 (rose), ...

For tracing experiments, switch to **Percentage** mode to see fractional labeling — useful for comparing labeling between conditions (e.g., WT vs KO).

→ [More on isotope tracing](/workflow/tracing)

## Quality info (bottom-right panel)

The verdict and warnings for the selected metabolite.

| Verdict | Color | Meaning | Action |
|---------|-------|---------|--------|
| **Good** | Green | Reliable peak with consistent shape and detection | Use in analysis |
| **Warning** | Orange | Usable but has caveats (co-elution, multiple peaks) | Review manually |
| **Poor** | Red | Unreliable (low detection, wrong RT, poor peak shape) | Exclude or investigate |

Warnings are listed below the verdict with severity badges (CRITICAL, WARNING, MINOR, INFO) and per-sample detail.

The scoring model is intended as a review aid rather than an automatic exclusion rule. Record manual review decisions when a compound is biologically important or when the chromatogram indicates a known method-specific behavior.

## Mark compounds for export

The verdict filter also affects export. Filter to **Good** before downloading when the downstream analysis should contain only compounds that passed review. See [Export](/workflow/export).

::: details Also from a script
Re-running peak picking on an existing `.msd` from Python:

```python
from leaf.analyzer import Samples, PeakPicking
samples = Samples.load("analysis.msd")
PeakPicking(samples).run()
samples.save("analysis.msd")
```

→ [Python recipes](/scripting/python/recipes)
:::

## Next step

→ [Visualize statistically](/workflow/visualize)
