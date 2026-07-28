# Isotope Tracing

LEAF can extract isotopologue distributions alongside each targeted compound. Configure tracing on **Extract**, then review and optionally correct the result in **Analysis**.

## Choose the isotopologues

The **Isotope Tracing** card starts with a default ¹³C list containing M+1 and M+2.

Use **Add Tracer** to add or edit individual isotopologues. LEAF 0.7 supports these tracer definitions:

| Isotope | Element | Mass shift per labeled atom |
|---|---|---|
| ¹³C | C | 1.003355 Da |
| ²H | H | 1.006277 Da |
| ¹⁵N | N | 0.997035 Da |
| ¹⁸O | O | 2.004245 Da |

Use **Export** to save a manual tracing list as JSON and **Import** to reuse one.

## Assign different tracing groups

Use **Add Group** when compounds need different tracer definitions.

- **Manual list** — define the isotopologues explicitly.
- **Auto from formula** — choose ¹³C, ²H, ¹⁵N, or ¹⁸O and let LEAF create M+1 through M+N from each compound formula.

Assign each compound to the required group. The preview shows how many isotopologue rows each formula will produce. A missing or invalid formula prevents formula-based expansion for that compound.

## Review the result

After extraction, open **Charts → Isotopologue** in the targeted **Analysis** workspace.

- **Absolute** shows measured intensities.
- **Percentage** shows each isotopologue as a fraction of the measured pool.
- Sample groups produce grouped summaries.

The natural-abundance indicator reports the expected background contribution when it is available.

## Apply natural-abundance correction

Open the isotopologue chart settings and enable **Correction**, or configure it from **Results** before export.

1. Click **Configure tracers**.
2. Add the tracer element: C, H, or N.
3. Enter the tracer purity.
4. Enable correction for the chart or export.

The correction in LEAF 0.7 assumes high-resolution data and uniform labeling of the selected element. It is not appropriate for position-specific tracers such as 1-¹³C glucose. Correction for ¹⁸O is not available.

The chart states whether corrected or raw values are being shown. If correction cannot be applied, LEAF keeps the raw values and reports the reason.

## Export tracing data

Open **Results**, apply the required compound and isotopologue filters, and choose **Wide** or **Long/Tidy**.

- Click **Download ZIP** for uncorrected CSV output.
- Enable **Natural-abundance correction**, configure the tracer, and click **Download Corrected ZIP** for corrected output.
- Save the complete `.msd` when you need to reopen the session with its tracing configuration.

→ [Export targeted results](/workflow/export)
