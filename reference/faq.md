# Frequently Asked Questions

## What does LEAF do?

LEAF processes Thermo Fisher RAW files from LC-MS instruments. It extracts ion chromatograms, detects peaks, scores their quality, and produces interactive visualizations. You can run targeted analysis (with a metabolite list) or untargeted discovery (no list needed). Results export as `.msd` bundles or flat `.csv` files.

## Who is LEAF for?

Anyone running LC-MS metabolomics, particularly:

- Bench scientists who want a UI instead of a Python notebook
- Lab techs running routine targeted panels
- Teams running ¹³C / ¹⁵N tracing experiments
- Untargeted feature-discovery work where you want a fast triage view

You don't need to know Python, R, or any command-line tools.

## Does LEAF replace Xcalibur, Skyline, MZmine, or El-MAVEN?

LEAF complements them. It's faster than Xcalibur for batch quantification, more user-friendly than Skyline for tracing, and offers a tighter UI than MZmine for routine analysis. For deep manual curation of every peak, dedicated tools like Skyline still win.

## Where does my data go?

**Desktop install:** Nowhere. LEAF binds to `127.0.0.1` (localhost only). No network requests leave your machine. Your RAW files, your processed data, all of it stays local.

**Hosted (MINT):** Data lives on the lab server. The same access controls that govern other lab tools govern LEAF. Ask your lab admin about specifics.

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
