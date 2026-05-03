# Setup & File Tools

Recent LEAF builds include small utility commands for installation checks, input preflight, starter folders, result inspection, updates, and RAW conversion. They are useful before or after a web UI run, and in shared scripts where you want a fast failure before processing a large folder.

## Command summary

| Command | Use it for |
|---------|------------|
| `leaf doctor` | Check the installed LEAF package, Python version, native extensions, reader backend availability (SEED and .NET RawFileReader), optional Web UI assets. |
| `leaf validate` | Validate a metabolite CSV and optionally confirm that a data file or folder contains supported RAW / mzML inputs. |
| `leaf init` | Create a starter run folder with `raw/`, `results/`, `metabolites.csv`, and a tracing example. |
| `leaf inspect` | Print a compact summary of a saved `.msd` targeted archive or `.usd` untargeted archive. |
| `leaf update` | Upgrade LEAF inside the currently active Python environment, with a dry-run mode for checking the exact command first. |
| `leaf convert` | Convert a folder of Thermo RAW files to mzML through the bundled reader workflow. |

## Check an installation

```bash
leaf doctor
```

Use strict mode in setup scripts when optional components should also be treated as required:

```bash
leaf doctor --strict
```

`leaf doctor` reports warnings for optional pieces such as the Web UI bundle, SEED reader, or .NET RawFileReader, and fails when core requirements such as the `leaf` package or Python 3.12 are missing. Reader backend rows show the detected version (e.g. `reader:rust ok 0.10.2`) or a reason when unavailable (e.g. `.NET 8 runtime is not installed`).

## Validate inputs before a run

```bash
leaf validate ./compounds.csv ./raw
```

This checks that the compound list can be parsed and that the data path contains `.raw` or `.mzml` inputs. Add `--strict` if warnings should stop the run:

```bash
leaf validate ./compounds.csv ./raw --strict
```

## Start a new run folder

```bash
leaf init ./leaf-run
```

The starter folder includes:

- `raw/` — put LC-MS files here
- `results/` — suggested output folder
- `metabolites.csv` — small primary-metabolism example list
- `tracing-labels.json` — example tracing label config
- `README.md` — minimal command-line recipe

If the starter files already exist, LEAF skips them unless you pass `--force`.

## Inspect saved results

```bash
leaf inspect ./results/example.msd
leaf inspect ./results/example.usd
```

For `.msd` files, the summary includes sample count, compound count, RT points, result table presence, quality scores, MS² spectra, and MS² matches. For `.usd` files, it includes sample count, feature count, isotope groups, detection rate, quality score, and polarity.

## Update LEAF

By default, `leaf update` resolves the latest compatible wheel from [GitHub Releases](https://github.com/MorscherLab/LEAF/releases), matching your current platform and Python version:

```bash
leaf update
```

Preview the resolved wheel without installing:

```bash
leaf update --dry-run
```

For local release wheels or a specific release tag:

```bash
leaf update --package ./leaf-0.5.0-beta.8-*.whl
leaf update --github-release v0.5.0-beta.8
```

| Option | Effect |
|--------|--------|
| `--dry-run` | Print the resolved wheel and install command without running it. |
| `--package PATH_OR_URL` | Skip GitHub resolution; install this wheel directly. |
| `--github-release TAG` | Pin to a specific release tag (default: `latest`). |
| `--github-repo OWNER/NAME` | Resolve from a different repo (default: `MorscherLab/LEAF`). |
| `--github-token TOKEN` | Authenticate for private releases. Also reads `LEAF_UPDATE_GITHUB_TOKEN`, `GITHUB_TOKEN`, or `GH_TOKEN` from the environment. |
| `--force-reinstall` | Reinstall even if the resolved version matches the installed one. |

## Convert RAW to mzML

::: warning Requires .NET
`leaf convert` uses the .NET RawFileReader backend. It requires .NET 8 runtime and is available only on Windows x64 (or other x64 systems with .NET installed). LEAF validates backend availability before starting and exits with an error if .NET is missing.
:::

```bash
leaf convert ./raw ./mzml
```

Common options:

| Option | Effect |
|--------|--------|
| `--include-ms2` | Include MS² spectra in the mzML output. |
| `--filter-threshold INT` | Drop peaks below an intensity threshold. |
| `--include-blank` | Include files whose names contain "blank". |
| `--workers INT` | Set the number of parallel conversion workers. |

## Next

→ [`leaf targeted`](/scripting/cli/targeted) — run targeted extraction without the browser
→ [`leaf untargeted`](/scripting/cli/untargeted) — run untargeted feature detection without the browser
