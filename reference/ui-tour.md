# UI Tour

Every panel and button in LEAF, mapped. Use this when you can't find a setting or aren't sure what something does.

> [Screenshot: full LEAF window with regions labeled — top bar, sidebar, main content, floating action button]

## Top action bar

Always visible. Spans the full width.

| Element | What it does |
|---------|--------------|
| **LEAF logo** (left) | Returns to the home page |
| **View tabs** | Switch between Extract, Peak Picking, Untargeted, Visualize |
| **Visualize dropdown** | Open a statistical chart (PCA, heatmap, volcano, ...) |
| **Download button** | Open the export dialog (`.msd` / `.csv`) |
| **Settings gear** | Storage paths, theme, advanced options |

## Floating action button

Bottom-right corner. Appears whenever a job is running.

| Color | State | Click action |
|-------|-------|--------------|
| Blue + spinner | Job in progress | Open jobs panel for progress details |
| Green + checkmark | Job done | Open jobs panel — Download or Open results |
| Red + warning | Job failed | Open jobs panel for error details |

## Extract view

The landing page after loading. Use this to launch new analyses.

> [Screenshot: Extract view fully labeled]

| Region | Element | What it does |
|--------|---------|--------------|
| Top | Targeted / Untargeted toggle | Switch the page mode |
| Top-left | Folder selector | Pick the folder of LC-MS files |
| Center | Compound list editor | Upload, edit, validate the metabolite CSV (targeted only) |
| Right (top) | Parameters sidebar | Polarity, mass tolerance, RT window, peak picking, scoring |
| Right (bottom) | Tracing editor | Configure isotopologues |
| Bottom-right | Start Processing | Launch the run (turns blue when ready) |

## Peak Picking view (Charts tab)

Where you inspect targeted results. Loads after extraction or when you open a `.msd`.

> [Screenshot: Peak Picking view fully labeled]

| Region | Panel | What it does |
|--------|-------|--------------|
| Left sidebar | Sample selector | Toggle samples, group them, switch pick mode |
| Top-left | Metabolite table | Pick a compound — drives all other panels |
| Top-right | EIC chart | Chromatogram overlay across selected samples |
| Top-right (tab 2) | RT check | Manual vs auto-detected RT scatter + outlier table |
| Bottom-left | Isotopologue bars | M+0, M+1, ... distribution |
| Bottom-right | Quality info | Verdict (good/warning/poor) + warnings |

## Sample selector (left sidebar)

| Element | What it does |
|---------|--------------|
| Sample checkbox | Toggle whether the sample appears on charts |
| Lightning-bolt icon | Auto-group by sample-name prefix |
| Group color swatches | Show / change group colors |
| Pick mode toggle | Area Top (apex) ↔ Area Sum (integrated area) |

## Untargeted view

Loads after an untargeted extraction or when you open a `.usd`.

| Panel | What it does |
|-------|--------------|
| Feature table | Every detected feature with m/z, RT, detection rate |
| EIC chart | Chromatogram for the selected feature |
| Alignment panel | RT alignment quality across samples |
| Gap-group panel | Features that should align but don't |
| Stats panel | Per-feature group comparisons |
| Results panel | Filter, tag, export |

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
| **Download** | Open the export dialog with this job's data preselected |
| **Open** | Load the result into Peak Picking / Untargeted view |
| **Cancel** | Stop a running job |

## Settings (gear icon)

| Tab | Contains |
|-----|----------|
| **Storage** | Where LEAF saves intermediate files and results |
| **Display** | Theme (light/dark), chart defaults |
| **Advanced** | Backend selection (Rust / Python), worker count |

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `↑` / `↓` (in metabolite table) | Move to previous / next compound |
| `Cmd/Ctrl + F` | Focus search in tables |
| `Esc` | Close modals and dropdowns |

## Next

→ [Troubleshooting](/reference/troubleshooting) — when things don't work
→ [FAQ](/reference/faq) — quick answers
→ [Glossary](/reference/glossary) — what does "ppm" mean?
