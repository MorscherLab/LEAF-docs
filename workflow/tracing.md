# Isotope Tracing

For stable-isotope labeling experiments (¹³C, ¹⁵N, ²H, ¹⁸O, ³⁴S), LEAF extracts and quantifies isotopologue distributions (M+0, M+1, M+2, ...) alongside the parent compound.

> [Screenshot: Tracing Editor on the Extract page with default 13C offsets]

## Set up tracing

The **Tracing Editor** panel sits on the right side of the Extract page. By default, it is configured for ¹³C tracing (M+1 and M+2):

| Isotopologue | Mass offset (Da) | Description |
|--------------|------------------|-------------|
| M+1 | 1.003355 | One ¹³C incorporation |
| M+2 | 2.006710 | Two ¹³C incorporations |

To add additional isotopologues, click **Add Tracer** and set the isotope count.

## Supported isotopes

| Isotope | Symbol | Mass shift per atom |
|---------|--------|---------------------|
| Carbon-13 | ¹³C | 1.003355 Da |
| Nitrogen-15 | ¹⁵N | 0.997035 Da |
| Oxygen-18 | ¹⁸O | 2.004244 Da |
| Sulfur-34 | ³⁴S | 1.995796 Da |
| Deuterium | ²H | 1.006277 Da |

Multiple isotope types can be represented in one experiment. For example, a ¹³C₅¹⁵N glutamate tracer requires both carbon and nitrogen counts.

## Common configurations

### Standard ¹³C-glucose tracing

The default M+1 and M+2 are usually enough.

### Fully labeled substrates (e.g., U-¹³C₆-glucose)

Add tracers up to M+6 for glucose, or to the carbon count of the labeled substrate.

### Multiple tracers in one experiment

Add a separate tracer entry per labeling pattern. The Tracing Editor handles them independently.

## Save and reuse tracing configs

| Button | Effect |
|--------|--------|
| **Export** | Save the current tracing setup as a JSON file |
| **Import** | Load a saved JSON config |
| **Reset to default** | Revert to the M+1 / M+2 ¹³C defaults |

The exported JSON file records the isotope setup and can be reused in later runs.

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

- **Absolute intensity** — raw peak heights, suitable for comparing total pool size.
- **Percentage** — fractional labeling, suitable for comparing isotope incorporation between conditions.

When sample grouping is enabled, bars show **mean ± SEM per group**.

## Natural-abundance correction

LEAF can apply natural-abundance correction to targeted tracing results after extraction. Correction is configured per analysis and stored inside the `.msd` archive as a `correction_config.json` sidecar.

In the web UI:

1. Open the isotopologue bar chart gear popover, or the export panel.
2. Click **Configure tracers…**.
3. Add each tracer element and purity, for example `13C` at `0.99`.
4. Enable correction separately for the bar plot preview or for CSV export.

The bar plot falls back to raw values with an inline note if correction is enabled before a tracer is configured. Corrected CSV export requires a tracer config.

Current correction support:

| Supported | Notes |
|-----------|-------|
| Tracer elements | C, H, N |
| Mode | High-resolution correction |
| Labeling model | Uniform labeling for all atoms of the configured tracer element |

Not covered by the current correction surface: O / S multi-heavy-isotope correction, low-resolution correction, and position-specific labeling.

## Tips

- **Validate the CSV before extraction** — formula errors invalidate isotope mass calculations
- **Use 5 ppm mass tolerance or tighter** — heavier isotopologues are close in mass and a wide window may include unrelated signal
- **Account for natural abundance** — unlabeled samples exhibit M+1 contributions of approximately 1.1% per carbon from natural ¹³C. Use LEAF's correction toggle for supported C / H / N tracer experiments; use a specialized downstream tool when the experimental design falls outside that support.

## Export tracing data

In the export dialog, ensure **Include isotopologues** is on. The CSV gets one row per (compound × isotopologue × sample). The `.msd` always includes them when present. See [Export](/workflow/export).

::: details Also from a script
The Tracing Editor exports a JSON config that the CLI accepts directly:

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --polarity NEG --tracing-path ./tracing-13C.json
```

For corrected CSV output:

```bash
leaf targeted ./samples ./compounds.csv ./outputs \
  --polarity NEG --tracing-path ./tracing-13C.json \
  --correct --tracer 13C:0.99
```

→ [`leaf targeted` reference](/scripting/cli/targeted)
Or in Python: [Recipe 4 — Tracing in a script](/scripting/python/recipes#recipe-4-tracing-in-a-script)
:::

## Next step

→ [Export targeted results](/workflow/export)
