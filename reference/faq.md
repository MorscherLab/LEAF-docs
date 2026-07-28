# Frequently Asked Questions

## What does LEAF do?

LEAF processes targeted LC-MS metabolomics data. It extracts ion chromatograms from a compound list, performs peak picking, assigns quality verdicts, supports isotope-tracing review, and produces interactive visualizations. Targeted analyses accept Thermo `.raw`, `.mzml`, and `.mzml.gz` files in the current user-facing workflow. Complete sessions export as `.msd` archives; targeted tables download as ZIP files containing CSV output.

## Who is LEAF for?

Researchers running LC-MS metabolomics, including:

- Users who prefer a graphical interface over a scripting environment
- Routine targeted panels in a lab setting
- ¹³C, ¹⁵N, ²H, or ¹⁸O tracing experiments

No Python, R, or command-line experience is required to operate LEAF.

## How does LEAF relate to Xcalibur, Skyline, MZmine, and El-MAVEN?

LEAF is intended to complement, not replace, established tools. Xcalibur remains the reference for raw-data inspection on Thermo instruments; Skyline provides extensive manual curation features for targeted proteomics and metabolomics; MZmine and El-MAVEN cover overlapping workflows. LEAF's documented scope in this manual is batch targeted quantification, isotope tracing, quality review, and integrated visualization within a single browser-based interface.

## Where are input and processed data stored?

**Desktop install:** LEAF binds to `127.0.0.1` (loopback only) and makes no outbound network requests. RAW files and processed data remain on the local filesystem.

**Hosted (MINT):** RAW inputs and saved analysis artifacts remain on the lab server. MINT controls experiment access and the server folders exposed to LEAF.

## Can I use LEAF on a non-Thermo instrument?

Yes, if the instrument data are exported as mzML. LEAF targeted runs accept `.mzml` and `.mzml.gz` in addition to Thermo `.raw`. The SEED reader has broader vendor-reader work, but this manual documents the current user-facing targeted workflow.

## How big a dataset can LEAF handle?

It depends on file size, storage speed, reader backend, compound count, and whether MS² extraction is enabled. Targeted runs scale mainly with the number of compounds and samples.

For a rough check, start with a small folder and watch the floating progress button. If a modest targeted run takes much longer than expected, see [Troubleshooting](/reference/troubleshooting#extraction).

For very large datasets (1000+ samples), use the Rust backend (Settings → Advanced) and run on a machine with 32 GB+ RAM.

## What is an `.msd` file?

An `.msd` file is LEAF's native targeted result archive. It stores the processed dataset, selected peaks, quality information, isotope-tracing data when present, and run parameters in one self-contained file. Dragging the archive into LEAF reopens the Analysis workspace with the session restored.

## How are analyses shared with collaborators?

The `.msd` archive is the sharing format. A collaborator with a LEAF installation using the same major version can open the archive and view the stored charts, parameters, peaks, and quality scores without re-extraction.

## Does LEAF do natural-abundance correction for tracing?

Yes. In a targeted analysis, open the isotopologue chart settings or **Results**, configure the tracer element and purity, then enable natural-abundance correction. Corrected tables download from **Results** as a ZIP containing CSV output.

LEAF 0.7 supports high-resolution correction for uniformly labeled C, H, and N tracers. Position-specific tracers and ¹⁸O correction require a downstream method.

## How do I update LEAF?

```bash
leaf update --dry-run
leaf update
```

`leaf update` resolves the latest compatible wheel from [GitHub Releases](https://github.com/MorscherLab/LEAF/releases) for the current operating system and Python version. Use `--dry-run` to preview the resolved wheel before installing. For a specific release or local wheel:

```bash
leaf update --github-release v0.5.7
leaf update --package ./leaf-0.5.7-*.whl
```

## Can I access the source code?

Yes. The source code is available in the [MorscherLab/LEAF](https://github.com/MorscherLab/LEAF) repository, and this manual is maintained in [MorscherLab/LEAF-docs](https://github.com/MorscherLab/LEAF-docs).

## How do I cite LEAF in a paper?

A citable preprint / DOI is forthcoming. Until then, cite the LEAF version used in the analysis and acknowledge the Morscher Lab.

## Where can I report bugs or request features?

Contact the Morscher Lab or the local LEAF administrator. Include the LEAF version, operating system, and steps required to reproduce the issue.
