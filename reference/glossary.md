# Glossary

A short reference for LC-MS terms used in the targeted LEAF workflow.

## A

**Adduct**
The ion form a molecule takes during ionization. `M-H` means the molecule lost a proton (negative mode); `M+H` means it gained one (positive mode); `M+Na` means it formed a sodium adduct. The adduct determines the m/z extracted by LEAF.

**Alignment**
Adjusting retention times across samples so the same compound peaks at the same RT in every sample. LEAF aligns automatically during peak picking.

**Apex**
The highest point of a chromatographic peak. LEAF calls this **Apex** in the quantitative Results controls.

## C

**Chromatogram**
A plot of signal intensity vs time. The "EIC" (extracted ion chromatogram) shows the signal for one specific m/z over the LC run.

## D

**Detection rate**
Percentage of samples in which a compound was detected above the configured threshold.

## E

**EIC** (Extracted Ion Chromatogram)
The chromatogram for a single m/z (or a narrow m/z window). LEAF builds an EIC for every compound × sample combination.

**Formula**
Molecular formula of a compound, like `C6H12O6` for glucose. LEAF uses it to compute the exact mass.

## I

**Integration**
Calculating signal from a peak. LEAF exposes two related choices:
- **Apex** — peak height at the maximum
- **Area** or **AUC** — integrated signal across the peak boundary

**Isotopologue**
Same molecule with a different stable-isotope composition. LEAF shows the unlabeled form as **Parent** and labels configured channels M+1, M+2, and so on by labeled-atom count. The exact mass shift depends on the isotope; one ¹⁸O atom shifts the mass by about +2.004245 Da.

**Isotope tracing**
An experiment in which a labeled substrate (e.g., ¹³C-glucose) is supplied to cells or tissues and label incorporation is measured across metabolism. LEAF measures isotopologue distributions per metabolite.

## L

**LC-MS** (Liquid Chromatography–Mass Spectrometry)
The two-step technique LEAF processes data from. LC separates compounds in time; MS measures their mass.

**LOD** (Limit of Detection)
Minimum signal level required for a peak to count as detected in quality scoring. In the Extract page, Auto derives the LOD from the intensity threshold.

**`leaf serve`** *(deprecated)*
Older docs and forum posts referenced `leaf serve` as the launch command. The actual entry point is `leaf webui run` (foreground) or `leaf webui start` (daemon). See [`leaf webui`](/scripting/cli/webui).

## M

**Mass tolerance**
How far an observed m/z can deviate from the expected m/z and still be considered the same compound. Expressed in **ppm** (parts per million). Lower = stricter. 5 ppm is a typical default.

**Metabolomics**
Measuring small-molecule metabolites in biological samples. LEAF is built specifically for this use case.

**MINT**
The Morscher Lab's data and analysis platform. LEAF can run as a MINT plugin in configured lab deployments, where experiments provide access and artifact context.

**MS1**
First-stage mass spectrometry — measures the parent ion's m/z. LEAF works primarily with MS1 data.

**MS2**
Second-stage MS — fragments the parent ion and measures the fragments. Targeted LEAF analyses can capture MS² spectra for review and match them against MSP or MGF libraries.

**m/z** (mass-to-charge ratio)
What a mass spectrometer actually measures. For singly-charged ions (the common case in metabolomics), m/z ≈ mass.

**.msd file**
LEAF's native bundle for **targeted** analysis results. Contains intensities, peaks, quality scores, parameters. zstd-compressed Arrow/Parquet.

**mzVault**
A SQLite-based spectral library format from Thermo. Used for MS2 identification.

## P

**Peak picking**
Detecting peak positions and boundaries in a chromatogram. LEAF 0.7 provides **Prominence**, **CWT**, and cross-sample **v2d** peak-picking methods.

**Polarity**
Mass-spectrometer mode — POS (positive) detects positively charged ions; NEG (negative) detects negatively charged ions. The setting must match the acquisition method.

**ppm** (parts per million)
Unit for mass tolerance. 5 ppm at m/z 200 = 0.001 Da. Lower ppm = stricter matching.

## Q

**Quality verdict**
LEAF's per-compound assessment. **Good** indicates a reliable signal, **Warning** indicates a result requiring review, and **Poor** indicates low confidence.

## R

**RAW file**
Thermo Fisher's native LC-MS file format (`.raw`). Targeted LEAF runs also accept `.mzml` and `.mzml.gz`.

**RetentionTime / RT**
When a compound elutes from the LC column, in minutes. LEAF uses the expected RT to know where to look for each metabolite.

**RT alignment**
Compensating for small RT shifts between samples (column aging, temperature drift, etc.). Done automatically during extraction.

## S

**SEED** (Spectral Extraction & Encoding Driver)
The Rust library LEAF uses to read `.raw` and mzML-family files, especially on macOS and Linux where it is the default reader backend. It replaces the legacy `oxion` codename. See [SEED](/scripting/reader).

**SEM** (Standard Error of the Mean)
Error bars in the isotopologue chart show mean ± SEM per sample group.

**SNR** (Signal-to-Noise Ratio)
Peak strength relative to baseline noise. Higher values indicate greater confidence that the peak is distinguishable from noise. Configurable threshold on the Extract page.

## T

**Targeted analysis**
Quantifying a known list of compounds. Requires a metabolite CSV. Fast and reproducible.
