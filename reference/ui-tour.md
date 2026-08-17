# UI Tour

This page maps the visible controls in the targeted LEAF workflow.

![LEAF window with the main interface regions numbered](/screenshots/reference/ui-tour-overview-annotated.svg)

Callouts: **1** top action bar, **2** setup sidebar, **3** Extract workspace, **4** Jobs button.

## Top action bar

Always visible. Spans the full width.

| Element | What it does |
|---------|--------------|
| **LEAF logo** (left) | Returns to the home page |
| **Page selector** | Switch between Extract, Quick Check, and Analysis |
| **Visualize dropdown** | Open a statistical chart from a targeted analysis |
| **Download button** | Save the active targeted analysis as `.msd` |
| **Settings gear** | Runtime paths, processing defaults, and appearance |

## Floating action button

Bottom-right corner. Appears whenever a job is running.

| Color | State | Click action |
|-------|-------|--------------|
| Blue + spinner | Job in progress | Open jobs panel for progress details |
| Green + checkmark | Job done | Open jobs panel — Download or Open results |
| Red + warning | Job failed | Open jobs panel for error details |

## Extract view

The landing page after loading. Use this to launch new analyses.

![LEAF Extract view with the main setup regions numbered](/screenshots/reference/extract-view-annotated.svg)

| Callout | Region | Element | What it does |
|---:|---|---|---|
| 1 | Left sidebar | Data source and parameters | Select LC-MS files and configure extraction |
| 2 | Center | Compound List / Sample Metadata | Upload, edit, and validate inputs |
| 3 | Right | Isotope Tracing | Configure isotopologues |
| 4 | Left sidebar footer | Start Processing | Launch the run when the inputs are valid |
| 5 | Bottom-right | Jobs | Review queued, active, completed, and failed jobs |

## Analysis workspace (Charts)

Interface for inspecting targeted results. Loads after extraction or when a `.msd` archive is opened.

![Targeted analysis workspace showing chromatograms and quality results](/screenshots/targeted/targeted-analysis-charts.jpg)

| Region | Panel | What it does |
|--------|-------|--------------|
| Left sidebar | Sample selector | Toggle samples, group them, switch pick mode |
| Top-left | Metabolite table | Pick a compound — drives all other panels |
| Top-right | EIC chart | Chromatogram overlay, Per-sample integration, RT alignment, view controls, and chart settings |
| Top-right (tab 2) | RT check | Retention-time summary, correlation, mean difference, and outliers |
| Top-right (tab 3) | TIC overlay | Linear or log TIC comparison, with optional per-trace normalization |
| Bottom-left | Isotopologue bars | Parent, M+1, ... distribution |
| Bottom-right | Quality info | Verdict (good/warning/poor) + warnings |

→ [Detailed chart and Per-sample controls](/workflow/analyze)

## Sample selector (left sidebar)

| Element | What it does |
|---------|--------------|
| Sample checkbox | Toggle whether the sample appears on charts |
| Lightning-bolt icon | Auto-group by sample-name prefix |
| Group color swatches | Show / change group colors |
| Pick mode toggle | Apex (peak height) ↔ AUC (integrated area) |

## Results workspace

![Results table with quantification, filters, display, and export options](/screenshots/targeted/targeted-results-options.jpg)

| Region | What it does |
|---|---|
| Center table | Shows metabolite, formula, isotopologue, and sample values |
| Table footer | Changes page and rows per page |
| Quantification | Switches Apex / Area and filters to important compounds |
| Metabolites / Isotopologues | Selects the rows included in the table and export |
| Display | Sets scientific, decimal, or percentage values; precision; and empty isotopologues |
| Export | Selects Wide or Long/Tidy CSV and optional metadata |
| Spectra (MS²) | Selects MGF or MSP and optionally restricts export to matches |
| Natural-abundance correction | Configures the tracer and enables corrected export |

→ [Detailed Results and export controls](/workflow/export)

## Visualize views

Each chart has the same shell:

| Region | What it does |
|--------|--------------|
| Center | Plotly chart — interactive (zoom, hover, pan) |
| Right sidebar (collapsible) | Chart-specific settings (normalization, clustering, thresholds) |
| Top-right of chart | Plotly toolbar — download PNG, zoom, reset |

## Job panel (slide-out)

Click the floating action button to open. Lists every job from the current session.

| Element | What it does |
|---------|--------------|
| Job row | Status badge + sample count + filename |
| Progress bar | % complete (live during runs) |
| **Download** | Save the completed job result |
| **Open** | Load the result into Analysis |
| **Cancel** | Stop a running job |

## Settings (gear icon)

| Tab | Contains |
|-----|----------|
| **Plugin** | RAW-file path, job limits, and SEED I/O defaults |
| **Peak Picking** | Targeted peak-detection defaults |
| **Untargeted / Volume3D** | Advanced processing defaults |
| **MS²** | Spectral-matching defaults |
| **Appearance** | Theme, colour palette, and table density |

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `J` / `K` or `↓` / `↑` | Move to the next / previous compound; in Per-sample mode, move between selected samples |
| `S` | Enter or exit Per-sample integration |
| `Enter` | Merge the selected RT window |
| `Space` | Switch between Peak and Global chart view |
| `R` | Reset chart zoom |
| `H` / `L` | Pan the chart left / right |
| `Shift` + `L` / `Shift` + `H` | Zoom the chart in / out |
| `G` / `M` / `B` | Mark the compound good / medium / bad |
| `I` | Toggle the important marker |
| `Cmd/Ctrl + F` | Focus search in tables |
| `Esc` | Exit Per-sample mode or close the active overlay |

## Next

→ [Troubleshooting](/reference/troubleshooting) — common installation and analysis problems
→ [FAQ](/reference/faq) — quick answers
→ [Glossary](/reference/glossary) — what does "ppm" mean?
