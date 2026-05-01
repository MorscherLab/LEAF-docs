# Isotope Tracing

For stable-isotope labeling experiments (¹³C, ¹⁵N, ²H, ¹⁸O, ³⁴S), LEAF can extract and quantify isotopologue distributions — the M+0, M+1, M+2, ... peaks — alongside the parent compound.

> [Screenshot: Tracing Editor on the Extract page with default 13C offsets]

## Set up tracing

The **Tracing Editor** panel sits on the right side of the Extract page, below the parameters sidebar. By default it's pre-configured for ¹³C tracing (M+1 and M+2):

| Isotopologue | Mass offset (Da) | Description |
|--------------|------------------|-------------|
| M+1 | 1.003355 | One ¹³C incorporation |
| M+2 | 2.006710 | Two ¹³C incorporations |

To add more isotopologues, click **Add Tracer** and adjust the isotope counts.

## Supported isotopes

| Isotope | Symbol | Mass shift per atom |
|---------|--------|---------------------|
| Carbon-13 | ¹³C | 1.003355 Da |
| Nitrogen-15 | ¹⁵N | 0.997035 Da |
| Oxygen-18 | ¹⁸O | 2.004244 Da |
| Sulfur-34 | ³⁴S | 1.995796 Da |
| Deuterium | ²H | 1.006277 Da |

You can mix isotopes within a single experiment — e.g., a ¹³C₅¹⁵N glutamate tracer needs both isotopes counted.

## Common configurations

### Standard ¹³C-glucose tracing

The default M+1 and M+2 are usually enough.

### Fully labeled substrates (e.g., U-¹³C₆-glucose)

Add tracers up to M+6 for glucose, or however many carbons your substrate has.

### Multiple tracers in one experiment

Add a separate tracer entry per labeling pattern. The Tracing Editor handles them independently.

## Save and reuse tracing configs

| Button | Effect |
|--------|--------|
| **Export** | Save the current tracing setup as a JSON file |
| **Import** | Load a saved JSON config |
| **Reset to default** | Revert to the M+1 / M+2 ¹³C defaults |

Sharing the JSON file with a collaborator means they can run the exact same isotope setup without re-entering anything.

## Read isotopologue distributions

After extraction, the **Isotopologue Bar Chart** (bottom-left panel of the [Peak Picking view](/workflow/analyze#isotopologue-bars-bottom-left-panel)) shows the distribution per metabolite.

> [Screenshot: isotopologue bar chart in percentage mode with grouped samples]

| Color | Isotopologue |
|-------|--------------|
| Blue | M+0 (unlabeled parent) |
| Green | M+1 |
| Amber | M+2 |
| Rose | M+3 |
| Purple | M+4+ |

### Absolute vs percentage

- **Absolute intensity** — raw peak heights. Useful for comparing total pool sizes.
- **Percentage** — fractional labeling (what % of the metabolite pool carries each isotopologue). Useful for comparing labeling between conditions.

When sample grouping is on, bars show **mean ± SEM per group** — the standard way to present tracing data.

## Tips

- **Validate your CSV first** — formula errors break isotope mass calculations
- **Use 5 ppm mass tolerance or tighter** — heavier isotopologues are close in mass and a wide window picks up noise
- **Account for natural abundance** — unlabeled samples exhibit M+1 contributions of approximately 1.1% per carbon from natural ¹³C. LEAF does not currently apply natural-abundance correction; this should be performed downstream when required (e.g., with [IsoCorrectoR](https://genomic.uni-saarland.de/projects/IsoCorrectoR/) or [accucor](https://github.com/XiaoyangSu/AccuCor)).

## Export tracing data

In the export dialog, ensure **Include isotopologues** is on. The CSV gets one row per (compound × isotopologue × sample). The `.msd` always includes them when present. See [Export](/workflow/export).

## Next step

→ [Untargeted feature discovery](/workflow/untargeted) — for hypothesis-free analyses
