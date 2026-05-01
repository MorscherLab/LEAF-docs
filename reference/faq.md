# Frequently Asked Questions

## What does LEAF do?

LEAF processes Thermo Fisher RAW files from LC-MS instruments. It extracts ion chromatograms, detects peaks, assigns quality verdicts, and produces interactive visualizations. Both targeted analysis (with a metabolite list) and untargeted analysis (no list required) are supported. Results export as `.msd` archives or flat `.csv` tables.

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

**Hosted (MINT):** Data resides on the lab server. Access is governed by the same controls as other tools deployed within MINT. Consult your lab administrator for site-specific policies.

## Can I use LEAF on a non-Thermo instrument?

Not directly — LEAF reads `.raw` files, the Thermo native format. If you can convert your data to `.raw` (some instrument-control software supports this), LEAF will read it. Native support for Bruker/Sciex/Agilent formats isn't on the roadmap.

## How big a dataset can LEAF handle?

On a modern laptop:

- **Targeted, 200 compounds, 50 samples** — under a minute
- **Targeted, 500 compounds, 200 samples** — a few minutes
- **Untargeted, 50 samples** — 5–15 minutes (depends on data complexity)

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

Not currently. The isotopologue distributions you see are raw — they include both labeled isotopologues and the natural M+1, M+2 contributions from background ¹³C, ¹⁵N, etc. If your science requires correction, do it downstream (e.g., with [IsoCorrectoR](https://genomic.uni-saarland.de/projects/IsoCorrectoR/) or [accucor](https://github.com/XiaoyangSu/AccuCor)).

## Can LEAF identify unknown features in untargeted mode?

LEAF gives you m/z and RT, not a name. Identification needs:

- A spectral library search (e.g., HMDB, METLIN, MoNA)
- An MS2 spectrum + library matching (LEAF supports this against mzVault libraries — see the [LEAF developer docs](https://github.com/MorscherLab/LEAF/blob/main/docs/leaf/api/ms2.md))
- A pure standard run on the same instrument

## How do I update LEAF?

```bash
# uv
uv tool upgrade leaf

# pip
pip install --user --upgrade leaf

# pipx
pipx upgrade leaf
```

## Is LEAF open source?

Yes. The source lives at [github.com/MorscherLab/LEAF](https://github.com/MorscherLab/LEAF). Issues, pull requests, and questions are welcome.

## How do I cite LEAF in a paper?

A citable preprint / DOI is forthcoming. For now, please cite the GitHub repository and the LEAF version you used.

## Where can I report bugs or request features?

[GitHub issues](https://github.com/MorscherLab/LEAF/issues) — include your LEAF version, OS, and steps to reproduce.
