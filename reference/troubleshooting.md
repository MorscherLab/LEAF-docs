# Troubleshooting

Use this page to diagnose common installation, input, extraction, and export problems. If the problem is not listed, [open an issue](https://github.com/MorscherLab/LEAF/issues) with the steps required to reproduce it.

## Install / launch

| Problem | Cause | Fix |
|---------|-------|-----|
| `command not found: leaf` | Install location not on PATH | `uv tool update-shell` (uv) or add `~/.local/bin` to PATH (pip) |
| Unsure whether LEAF installed correctly | Missing package, native extension, reader backend, or Web UI bundle | Run `leaf doctor`; add `--strict` when optional checks should fail setup scripts |
| Port 18008 already in use | Another process is on the port | `leaf webui run --port 18009` |
| `pythonnet` errors on Windows | Missing .NET 8.0 | Install [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) |
| Browser shows "Cannot connect" | LEAF crashed or terminal closed | Re-run `leaf webui run`; check the terminal for errors |
| LEAF starts but has no logo, styles, or current controls | Browser has an old application shell | Follow [Browser refresh and cache](#browser-refresh-and-cache) |

## Browser refresh and cache

LEAF 0.7 checks for a newer deployed version when you return to an open tab. If **LEAF update available** appears in the lower-left corner, click **Reload**.

A normal reload should obtain the current application shell. If the page remains stale, blank, or partly styled, force the browser to bypass its cached copy:

| Browser | macOS | Windows |
|---|---|---|
| Chrome | **⌘⇧R** | **Ctrl+Shift+R** or **Ctrl+F5** |
| Edge | **⌘⇧R** | **Ctrl+Shift+R** or **Ctrl+F5** |
| Firefox | **⌘⇧R** | **Ctrl+Shift+R** or **Ctrl+F5** |
| Safari | **⌥⌘R** — Reload Page From Origin | Not available |

Use the shortcut while the LEAF page is the active tab.

### Clear site data if a forced refresh is not enough

::: warning MINT sign-in
Clearing site data removes the MINT session for that site and may sign you out. Save any unsaved LEAF work first.
:::

**Chrome or Edge**

1. Open Developer Tools: **⌥⌘I** on macOS or **Ctrl+Shift+I** on Windows.
2. Open **Application → Storage**.
3. Click **Clear site data**.
4. Under **Application → Service Workers**, click **Unregister** if an old LEAF worker is listed.
5. Close Developer Tools, reload the page, and sign in again if required.

**Firefox**

1. Open **Settings → Privacy & Security**.
2. Under **Cookies and Site Data**, click **Manage Data**.
3. Search for the MINT or LEAF host, select it, and click **Remove Selected**.
4. Reload the page and sign in again.

**Safari**

1. Open **Safari → Settings → Advanced** and enable **Show features for web developers** if the **Develop** menu is hidden.
2. Choose **Develop → Empty Caches**, or press **⌥⌘E**.
3. Reload with **⌥⌘R**.

LEAF 0.7 no longer installs a PWA service worker. The unregister step is only needed when a browser retains a worker from an older LEAF release.

## Input files

| Problem | Cause | Fix |
|---------|-------|-----|
| RAW file fails to load | Unsupported instrument firmware | Try opening the file in Thermo Xcalibur first; if it works there, [report it](https://github.com/MorscherLab/LEAF/issues) |
| "No samples found in folder" | Folder has no supported input files, or files mix formats | Use `.raw`, `.mzml`, or `.mzml.gz` and keep one format per run. |
| Sample names look unexpected | Auto-name extraction parsed the filename incorrectly | Toggle "Organize names" off to use the raw filename |
| Blank files included anyway | "Skip blanks" only matches the word "blank" | Rename blank files to include "blank", or untoggle "Skip blanks" and remove them after extraction |
| RAW file fails to load on macOS / Linux | SEED reader hit an unsupported instrument firmware | Switch to a Windows machine and try the `dotnet` backend (`leaf targeted ./samples ./compounds.csv ./outputs --backend dotnet`); if it still fails, [report it](https://github.com/MorscherLab/LEAF/issues) |
| Unsure whether a CSV / folder is valid | Input preflight not run yet | `leaf validate ./compounds.csv ./raw-folder`; add `--strict` to treat warnings as failures |

## Compound list

| Problem | Cause | Fix |
|---------|-------|-----|
| "Missing column: Metabolite" | CSV header does not match a recognized compound-name field | Use one of: `Metabolite`, `Compound`, `Name` |
| Compounds show as "invalid formula" | Formula has a typo or unsupported element | Check the formula syntax (e.g., `C6H12O6`, not `C₆H₁₂O₆`); only standard atoms allowed |
| **Start Processing** stays disabled | The list has not passed validation, or an adduct conflicts with the selected polarity | Click **Validate**, correct every highlighted formula, and use negative-mode adducts with **Neg** or positive-mode adducts with **Pos** |
| All compounds say "no peaks detected" | Wrong polarity | Switch polarity (NEG ↔ POS) and re-run |
| Some compounds are detected and others are not | Mass tolerance is too tight or the expected RT is inaccurate | Loosen mass tolerance to 10 ppm; widen RT window to 1.0 min |

## Extraction

| Problem | Cause | Fix |
|---------|-------|-----|
| "backend is unavailable" error | The selected reader backend is not installed or not detected | Run `leaf doctor` to check backend status. For SEED: install the seed wheel. For .NET: install .NET 8 runtime. |
| Backend disabled in the web UI | LEAF detected that the backend cannot run on this system | Hover the disabled option for details; install the missing dependency or switch to an available backend |
| MS² extraction ignores backend choice | .NET RawFileReader does not support the MS² extraction surface | Expected behavior — MS² auto-routes to the SEED (Rust) backend |
| Extraction is unusually slow | Large dataset, slow storage, or non-default reader backend | Use the Rust backend in Settings → Advanced and keep input files on fast local or network storage |
| Out-of-memory crash | Too many samples in one batch | Process in smaller batches (50 files at a time) |
| Floating button stuck blue | Job hung — usually a corrupt RAW file | Cancel the job, remove the suspect file, re-run |
| Job fails silently | Disk full or write permissions issue | Check disk space and the configured Storage path |
| Job remains queued in MINT | The server's concurrent-job limit is in use | Leave the tab open or return later; the job starts when a worker becomes available |
| Local no-upload run stops during browser decoding | A selected file is unsupported or too large for browser memory | Use a smaller batch or select a server folder; local no-upload is intended for supported browser-decodable files |

## Peaks and quality

| Problem | Cause | Fix |
|---------|-------|-----|
| Many "Poor" verdicts | Mass tolerance too loose, picks up noise | Reduce mass tolerance to 5 ppm |
| Peaks at wrong RT | RT drift between samples | Increase RT Window to 1.0 min; or use RT alignment |
| EIC chart is empty | Selected sample has no signal for the compound | Check the compound's mass and adduct; try the m/z manually in Xcalibur |
| Automatic peak picking misses a visible peak | Peak picker is conservative for the current chromatogram | Widen the RT window, then manually drag-select on the EIC chart if needed |
| RT check shows huge outliers | Sample truly has different RT (different LC method?) | Verify the sample is from the same method as others |

## Visualizations

| Problem | Cause | Fix |
|---------|-------|-----|
| Volcano plot shows error | More or fewer than 2 sample groups | Group samples into exactly 2 groups in the sidebar |
| Heatmap is all one color | Forgot to normalize | Set Normalization to Z-score in the sidebar |
| PCA shows samples bunched | Few principal components explain little variance | Increase the number of PCs displayed; check sample QC first |
| Network is empty | Edge threshold too strict | Lower the edge threshold slider |

## Export

| Problem | Cause | Fix |
|---------|-------|-----|
| `.msd` file won't reopen | Saved with a much newer LEAF version | Update LEAF — see [GitHub Releases](https://github.com/MorscherLab/LEAF/releases) |
| Need to check what's inside a result archive | File came from another run or collaborator | `leaf inspect ./result.msd` |
| Export includes unwanted rows | The required filters were not applied in **Results** | Apply the sample, compound, or isotopologue filters before clicking **Download ZIP** |
| Export is missing isotopologues | Isotopologue filters excluded them | Reopen **Results**, include the required isotopologues, and download the ZIP again |
| CSV has scientific notation | Excel auto-converts large numbers | Open in a text editor or import as text in Excel |

## Hosted (MINT) mode

| Problem | Cause | Fix |
|---------|-------|-----|
| Files I expect are not listed | The administrator has not exposed the folder | Ask the administrator to add the folder to LEAF's allowed paths |
| Login loops back to the login page | Cookies are blocked | Allow cookies for the lab domain and reload |
| Server error during extraction | The lab server is out of disk space or memory | Report the failure to the lab administrator |
| Targeted result cannot be saved | No experiment is selected, or you lack artifact write access | Select the intended experiment in the LEAF top bar and confirm your experiment role |
| A recently deployed LEAF version looks unchanged | The tab still has an old application shell | Follow [Browser refresh and cache](#browser-refresh-and-cache) |

## Still stuck?

1. **Check the terminal** (desktop) or browser dev console (`F12` → Console) for error messages.
2. **Search [GitHub issues](https://github.com/MorscherLab/LEAF/issues)** for existing reports.
3. **Open a new issue** with: LEAF version (`leaf --version`), OS, reproduction steps, and the error message.
