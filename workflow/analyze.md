# Analyze Results

After extraction completes, the **Peak Picking** view is where you inspect each compound, check peak quality, and adjust integrations. This is the page you'll spend the most time on.

> [Screenshot: full Peak Picking view with a metabolite selected]

## Open the view

Two ways to get here:

1. After an extraction finishes, click **Open** in the jobs panel
2. From any page, drag a previously-saved `.msd` file onto the window

## Layout

The view has a left sidebar plus four central panels:

```
┌─────────────┬───────────────────────────────────┐
│ Sample      │  Metabolite Table  │  EIC Chart  │
│ Selector    ├───────────────────────────────────┤
│ (sidebar)   │  Isotopologues     │  Quality    │
└─────────────┴───────────────────────────────────┘
```

## Sample selector (left sidebar)

Lists every sample in your dataset.

- **Checkboxes** — toggle which samples appear on the charts
- **Lightning-bolt button** — auto-group samples by name prefix (e.g., `WT_rep1`, `WT_rep2` → group `WT`)
- **Pick mode toggle** — switch between **Area Top** (intensity at peak apex) and **Area Sum** (total area under curve)

> [Screenshot: sample selector with grouping applied]

## Metabolite table (top-left panel)

A scrollable list of every compound in your dataset. Click any row to load that metabolite into the EIC chart, isotopologue bars, and quality info.

Columns include:

- **Verdict badge** (green / orange / red)
- **Compound name**
- **m/z** (observed)
- **RT** (median)
- **Detection rate** (% of samples)

Sort by clicking a column header. Filter by verdict using the dropdown at the top.

## EIC chart (top-right panel)

The interactive chromatogram for the selected metabolite, overlaying every selected sample.

- **Colored traces** — individual samples (gradient from cyan to purple, or by group color when grouping is on)
- **Red dashed line** — expected retention time from your CSV
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

### Verdict criteria

| Criterion | Good | Warning | Poor |
|-----------|------|---------|------|
| Detection rate | ≥ 20% | — | < 20% |
| RT deviation | — | — | > 0.8 min |
| Peak shape score | ≥ 0.70 | — | < 0.50 |
| RT clusters | 1 group | ≥ 2 groups with spread > 0.1 min | — |
| Multi-peak samples | — | > 40 samples | — |

## Mark compounds for export

The verdict filter also drives export. If you want only the green compounds in your CSV/`.msd`, filter to **Good** before downloading. See [Export](/workflow/export).

## Next step

→ [Visualize statistically](/workflow/visualize)
