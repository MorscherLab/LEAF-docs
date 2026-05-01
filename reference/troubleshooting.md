# Troubleshooting

If something isn't working, check here first. If your problem isn't listed, [open an issue](https://github.com/MorscherLab/LEAF/issues) with the steps to reproduce.

## Install / launch

| Problem | Cause | Fix |
|---------|-------|-----|
| `command not found: leaf` | Install location not on PATH | `uv tool update-shell` (uv) or add `~/.local/bin` to PATH (pip) |
| Port 18008 already in use | Another process is on the port | `leaf serve --port 18009` |
| `pythonnet` errors on Windows | Missing .NET 8.0 | Install [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) |
| Browser shows "Cannot connect" | LEAF crashed or terminal closed | Re-run `leaf serve`; check the terminal for errors |
| LEAF starts but no logo / styles | Browser cached an old build | Hard-refresh with **⌘⇧R** (Mac) or **Ctrl+Shift+R** (Win/Linux) |

## RAW files

| Problem | Cause | Fix |
|---------|-------|-----|
| RAW file fails to load | Unsupported instrument firmware | Try opening the file in Thermo Xcalibur first; if it works there, [report it](https://github.com/MorscherLab/LEAF/issues) |
| "No samples found in folder" | Folder has no `.raw` files, or files have a different extension | Check filenames; LEAF only reads `.raw` (case-sensitive on Linux) |
| Sample names look weird | Auto-name extraction got confused | Toggle "Organize names" off — uses raw filename instead |
| Blank files included anyway | "Skip blanks" only matches the word "blank" | Rename your blank files to include "blank", or untoggle "Skip blanks" and remove them after |

## Compound list

| Problem | Cause | Fix |
|---------|-------|-----|
| "Missing column: Metabolite" | CSV header doesn't match | Use one of: `Metabolite`, `Compound`, `Name` |
| Compounds show as "invalid formula" | Formula has a typo or unsupported element | Check the formula syntax (e.g., `C6H12O6`, not `C₆H₁₂O₆`); only standard atoms allowed |
| All compounds say "no peaks detected" | Wrong polarity | Switch polarity (NEG ↔ POS) and re-run |
| Some compounds detect, others don't | Mass tolerance too tight or RT off | Loosen mass tolerance to 10 ppm; widen RT window to 1.0 min |

## Extraction

| Problem | Cause | Fix |
|---------|-------|-----|
| Extraction is unusually slow | Large dataset processed with the Python backend | Switch to the Rust backend in Settings → Advanced |
| Out-of-memory crash | Too many samples in one batch | Process in smaller batches (50 files at a time) |
| Floating button stuck blue | Job hung — usually a corrupt RAW file | Cancel the job, remove the suspect file, re-run |
| Job fails silently | Disk full or write permissions issue | Check disk space and the configured Storage path |

## Peaks and quality

| Problem | Cause | Fix |
|---------|-------|-----|
| Many "Poor" verdicts | Mass tolerance too loose, picks up noise | Reduce mass tolerance to 5 ppm |
| Peaks at wrong RT | RT drift between samples | Increase RT Window to 1.0 min; or use RT alignment |
| EIC chart is empty | Selected sample has no signal for the compound | Check the compound's mass and adduct; try the m/z manually in Xcalibur |
| Auto-peaks miss the obvious peak | Peak picker conservative | Switch peak method from v4 → v2; or manually drag-select on the EIC chart |
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
| CSV missing isotopologues | "Include isotopologues" was off | Re-export with the option enabled |
| CSV has scientific notation | Excel auto-converts large numbers | Open in a text editor or import as text in Excel |

## Hosted (MINT) mode

| Problem | Cause | Fix |
|---------|-------|-----|
| "LEAF not visible" after MINT login | No access to the LEAF plugin | Ask your admin to grant the `leaf` plugin role |
| Files I expect aren't listed | Admin hasn't shared the folder | Ask admin to add the folder to LEAF's allowed paths |
| Login loops back to login page | Cookies blocked | Allow cookies for the lab domain; reload |
| "Server error" during extraction | Lab server out of disk or memory | Report to the lab administrator; the issue is server-side |

## Still stuck?

1. **Check the terminal** (desktop) or browser dev console (`F12` → Console) for error messages.
2. **Search [GitHub issues](https://github.com/MorscherLab/LEAF/issues)** — someone may have hit it before.
3. **Open a new issue** with: LEAF version (`leaf --version`), OS, the steps you took, and the error message.
