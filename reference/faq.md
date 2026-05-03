# Frequently Asked Questions

## What does LEAF do?

LEAF processes LC-MS files, extracts ion chromatograms, detects peaks, assigns quality verdicts, and produces interactive visualizations. Targeted analysis accepts Thermo `.raw`, `.mzml`, and `.mzml.gz` files; untargeted analysis currently expects Thermo `.raw` folders. Results export as `.msd` / `.usd` archives or flat `.csv` tables.

## Who is LEAF for?

Researchers running LC-MS metabolomics, including:

- Users who prefer a graphical interface over a scripting environment
- Routine targeted panels in a lab setting
- ¹³C, ¹⁵N, ²H, ¹⁸O, or ³⁴S tracing experiments
- Untargeted feature discovery and triage

No Python, R, or command-line experience is required to operate LEAF.

## How does LEAF relate to Xcalibur, Skyline, MZmine, and El-MAVEN?

LEAF is intended to complement, not replace, established tools. Xcalibur remains the reference for raw-data inspection on Thermo instruments; Skyline provides extensive manual curation features for targeted proteomics and metabolomics; MZmine and El-MAVEN cover overlapping but distinct workflows. LEAF's scope is batch targeted quantification, untargeted feature extraction, isotope tracing, and integrated visualization within a single browser-based interface.

## Where does my data go?

**Desktop install:** LEAF binds to `127.0.0.1` (loopback only) and makes no outbound network requests. RAW files and processed data remain on the local filesystem.

**Hosted (MINT):** under development. When enabled, data will reside on the lab server and access will be governed by MINT controls. For current use, local installs keep RAW files and processed data on the local filesystem.

## Can I use LEAF on a non-Thermo instrument?

For targeted analysis, yes if you export mzML. LEAF targeted runs accept `.mzml` and `.mzml.gz` in addition to Thermo `.raw`. The SEED reader has broader vendor-reader work, but this manual documents the current LEAF app surface: targeted folder runs accept `.raw` or mzML-family files, and untargeted runs currently expect Thermo `.raw` folders.

## How big a dataset can LEAF handle?

It depends on file size, storage speed, backend, compound count, and whether peak picking / MS2 extraction are enabled. As a rule of thumb, targeted runs scale mostly with the number of compounds and samples; untargeted runs take longer because LEAF searches the full m/z and retention-time range.

For a rough check, start with a small folder and watch the floating progress button. If a modest targeted run takes much longer than expected, see [Troubleshooting](/reference/troubleshooting#extraction).

For very large datasets (1000+ samples), use the Rust backend (Settings → Advanced) and run on a machine with 32 GB+ RAM.

## What's the difference between `.msd` and `.usd`?

| | `.msd` | `.usd` |
|---|---|---|
| Stores | Targeted analysis results | Untargeted analysis results |
| Indexed by | Compound name | Feature ID (m/z + RT) |
| Reopens to | Peak Picking view | Untargeted view |

Both are zstd-compressed Arrow/Parquet bundles — they're a single file but contain multiple structured tables.

## Can I share my analysis with a collaborator?

Yes — send them the `.msd` file. As long as they have LEAF installed (any version with the same major number), they can open it and see the same charts, parameters, and quality scores you saw. No setup, no re-extraction.

## Does LEAF do natural-abundance correction for tracing?

Yes, for the current targeted tracing surface. In Peak Picking, configure tracer purity from the isotopologue-bar gear popover or the export panel, then enable natural-abundance correction for the bar plot or corrected CSV export. The command line supports the same path with `leaf targeted --correct --tracer 13C:0.99`.

Current correction support is intentionally narrow: high-resolution correction for tracer elements C, H, and N. Position-specific tracers, low-resolution correction, and multi-heavy-isotope elements such as O and S are not part of the v1 correction path.

## Can LEAF identify unknown features in untargeted mode?

LEAF gives you m/z and RT, not a name. Identification needs:

- A spectral library search (e.g., HMDB, METLIN, MoNA)
- An MS2 spectrum + library matching (LEAF supports this against mzVault libraries — see the [LEAF developer docs](https://github.com/MorscherLab/LEAF/blob/main/docs/leaf/api/ms2.md))
- A pure standard run on the same instrument

## How do I update LEAF?

```bash
leaf update --dry-run
leaf update
```

`leaf update` resolves the latest compatible wheel from [GitHub Releases](https://github.com/MorscherLab/LEAF/releases) for your platform and Python version. Use `--dry-run` to preview the resolved wheel before installing. For a specific release or local wheel:

```bash
leaf update --github-release v0.5.0-beta.8
leaf update --package ./leaf-0.5.0-beta.8-*.whl
```

## Can I access the source code?

Not yet. LEAF is currently developed by the Morscher Lab and distributed through approved release channels. Public source release is planned for a later stage.

## How do I cite LEAF in a paper?

A citable preprint / DOI is forthcoming. For now, cite the LEAF version you used and acknowledge the Morscher Lab.

## Where can I report bugs or request features?

Contact the Morscher Lab or your local LEAF administrator. Include your LEAF version, operating system, and the steps needed to reproduce the issue.
