# Stable-Isotope Tracing

LEAF extracts a **Parent** channel and the configured isotopologue channels for each targeted compound. Set up tracing on **Extract**, review the distributions in **Analysis**, then export raw or natural-abundance-corrected values from **Results**.

## Worked path: uniformly labeled ¹³C

Use an **Auto from formula** group when each metabolite should be extracted from Parent through the maximum possible ¹³C label count.

1. Load a compound list that contains valid molecular formulas.
2. In the right-side **Isotope Tracing** panel, click **Add Group**.
3. Enter a name such as `U-13C`.
4. Select **Auto from formula**, choose **¹³C**, and click **Add**.
5. Assign the required compounds to `U-13C` in the compound table's **Group** column, or import the assignments in a `TracingGroup` CSV column.
6. Open the `U-13C` tab and check the formula preview before starting extraction.

![Stable-isotope tracing panel configured for a ¹³C experiment](/screenshots/targeted/targeted-tracing-setup.jpg)

For glucose with formula `C6H12O6`, the preview should report **Parent + M+1…M+6 (7 rows)**. A missing or invalid formula, or a formula with no atoms of the selected element, produces **Parent only**.

::: warning Check the formula preview
Formula-based expansion uses the elemental count in each compound formula. Confirm every **Parent only** warning before extraction; it usually indicates a missing formula, invalid formula, or a formula without the selected tracer element.
:::

## Assign compounds to a tracing group

The default group applies to every compound without a custom assignment. It extracts the default M+1 and M+2 channels.

### Assign in the compound table

After adding a custom group, a **Group** column appears in the compound table. Choose the group for each compound. Select **default** to return a compound to the default tracing list.

![Compound table assignments and the formula-based tracing preview](/screenshots/targeted/targeted-tracing-formula-group.jpg)

### Assign in the imported CSV

Add an optional `TracingGroup` column when assignments are already known:

```csv
Metabolite,Formula,RetentionTime,Adduct,TracingGroup
Glucose,C6H12O6,5.2,M-H,U-13C
Lactate,C3H6O3,3.1,M-H,U-13C
Citrate,C6H8O7,8.5,M-H,default
```

When an imported group name does not exist, LEAF creates it as **¹³C Auto from formula** and opens that group for review. Change its isotope or convert it to a manual list before extraction when the imported name represents another tracer design.

## Choose a group type

| Group type | Use it when | Result |
|---|---|---|
| **Auto from formula** | Every atom of one element is potentially labeled | Generates Parent and M+1 through M+N separately for each assigned formula |
| **Manual list** | You need a fixed subset, mixed-isotope channels, or custom labels | Uses the same explicitly defined channels for every compound assigned to the group |

### Auto from formula controls

| Control | How to use it |
|---|---|
| **Label isotope** | Choose ¹³C, ²H, ¹⁵N, or ¹⁸O when creating the group. |
| **Isotope** | Change the isotope for an existing formula-based group. Recheck every preview row after changing it. |
| **Preview** | Confirm the formula, generated channel range, and total rows for each assigned compound. |
| **Convert to manual list** | Replace the rule with a fixed list generated from the first assigned compound's formula. Check the resulting channels when assigned compounds have different formulas. |
| Group tab **×** | Remove the custom group. Compounds assigned to it return to the default group. |

### Manual-list controls

Each manual row shows its label, exact mass shift, and isotope composition.

| Control | How to use it |
|---|---|
| Isotope **− / +** | Set the number of ¹³C, ²H, ¹⁵N, and ¹⁸O atoms in the channel. The mass shift updates automatically. |
| Channel label | Keep the generated `M+n` label or enter a custom label. Use **Reset to auto-sync** to restore automatic naming. |
| Delete | Remove a channel from the list. At least one channel remains. |
| **Add Tracer** | Add the next unused `M+n` row, starting as a ¹³C channel. |
| **Fill from formula** | Generate channels from one assigned compound and isotope. **Replace** overwrites the list; **Append** adds channels after the existing rows. |
| **Reset to Default** | Restore M+1 and M+2 as ¹³C channels. |
| **Import** | Load a tracing-list JSON file. Invalid JSON is rejected. |
| **Export** | Save the current manual list as `isotope-tracing.json`. |

## Supported extraction isotopes

| Isotope | Formula element | Exact mass shift per labeled atom | Formula-based extraction | Built-in correction |
|---|---|---:|:---:|:---:|
| ¹³C | C | +1.003355 Da | ✓ | ✓ |
| ²H | H | +1.006277 Da | ✓ | ✓ |
| ¹⁵N | N | +0.997035 Da | ✓ | ✓ |
| ¹⁸O | O | +2.004245 Da | ✓ | — |

LEAF's channel labels count labeled atoms. For example, one ¹⁸O atom is shown as M+1 in the tracing editor even though its exact mass shift is approximately +2.004245 Da.

## Review isotopologue distributions

After extraction, open **Charts → Isotopologue** in the targeted **Analysis** workspace.

| Control | How to use it |
|---|---|
| **Abs** | Compare measured isotopologue intensities. |
| **%** | Show each channel as a percentage of the displayed isotopologue envelope for that sample. This is an isotopologue fraction, not per-atom enrichment. |
| **Group** | Summarize the bars using the sample groups defined in the left sidebar. |
| **Select All** | Restore all available isotopologue channels to the chart. |
| Channel checkboxes | Show or hide Parent, M+1, M+2, and higher channels. |
| **Natural** badge | Review the expected natural-abundance contribution when it is available. |

## Apply natural-abundance correction

Open the Isotopologue settings gear and select **Configure tracers…**, or open the same configuration from **Results**.

1. Add one tracer element: **C**, **H**, or **N**.
2. Enter purity as a fraction from `0.001` to `1`. For 99% tracer purity, enter `0.99`.
3. Click **Done**.
4. Enable **Correction** for the Isotopologue chart.
5. Enable **Natural-abundance correction** separately in **Results** when a corrected download is required.

![Tracer correction modal with element and purity controls](/screenshots/targeted/targeted-tracer-correction.jpg)

::: danger Correction scope
The current correction workflow requires high-resolution data and uniform labeling, where every atom of the selected element is potentially labelable. Configure one C, H, or N tracer element at a time. Position-specific tracers such as 1-¹³C glucose, multi-element tracer configurations, and ¹⁸O tracing require a validated downstream correction method.
:::

The chart reports the applied state:

| Status | Meaning | Action |
|---|---|---|
| **Natural-abundance corrected** | Correction was applied to the displayed compound | Review the corrected distribution |
| **Configure tracer…** | Correction is enabled without a tracer definition | Add the tracer element and purity |
| **Correction not applied — raw values shown** | The formula or tracer configuration is unsupported | Fix the formula/configuration or use raw values with downstream correction |

The tracer configuration is shared, but the chart and export correction switches are independent. Turning correction on for the chart does not enable corrected export.

## Export tracing data

Open **Results** and set the required samples, metabolites, isotopologues, and number format.

- Leave **Natural-abundance correction** off and click **Download ZIP** for measured values.
- Configure one supported tracer, enable correction, and click **Download Corrected ZIP** for corrected values.
- Choose **Wide** for one sample per column or **Long/Tidy** for one measurement per row.
- Save the complete `.msd` to preserve the tracing setup with the analysis session.

Keep the uncorrected export with the corrected table so the measured distribution remains available for validation.

→ [Prepare a compound list with tracing assignments](/workflow/prepare-data#for-isotope-tracing)

→ [Analyze targeted results](/workflow/analyze#inspect-isotopologues)

→ [Export targeted results](/workflow/export)
