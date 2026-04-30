# Glossary

A short reference for the LC-MS terms you'll see in LEAF, written for someone who isn't a mass spectrometrist.

## A

**Adduct**
The ion form a molecule takes during ionization. `M-H` means the molecule lost a proton (negative mode); `M+H` means it gained one (positive mode); `M+Na` means it picked up a sodium. The adduct determines the m/z LEAF looks for.

**Alignment**
Adjusting retention times across samples so the same compound peaks at the same RT in every sample. LEAF aligns automatically during peak picking.

**Apex**
The highest point of a chromatographic peak. "Area Top" pick mode uses the apex intensity.

## C

**Chromatogram**
A plot of signal intensity vs time. The "EIC" (extracted ion chromatogram) shows the signal for one specific m/z over the LC run.

## D

**Detection rate**
Percentage of samples in which a compound was detected above the threshold. LEAF flags compounds with detection rate < 20% as "Poor".

## E

**EIC** (Extracted Ion Chromatogram)
The chromatogram for a single m/z (or a narrow m/z window). LEAF builds an EIC for every compound × sample combination.

## F

**Feature** (untargeted)
A peak detected without prior knowledge — characterized by its m/z and retention time, but no name yet. The Untargeted view is a list of features.

**Formula**
Molecular formula of a compound, like `C6H12O6` for glucose. LEAF uses it to compute the exact mass.

## I

**Integration**
Calculating the area under a peak. Two modes:
- **Area Top** — peak height at the apex
- **Area Sum** — total integrated area across the peak boundary

**Isotopologue**
Same molecule, different number of heavy isotopes. M+0 is the unlabeled form; M+1 has one extra mass unit (one ¹³C, ¹⁵N, etc.); M+2 has two; and so on.

**Isotope tracing**
An experiment where you feed cells/tissues a labeled substrate (e.g., ¹³C-glucose) and measure how the label propagates through metabolism. LEAF measures isotopologue distributions per metabolite.

## L

**LC-MS** (Liquid Chromatography–Mass Spectrometry)
The two-step technique LEAF processes data from. LC separates compounds in time; MS measures their mass.

**LOD** (Limit of Detection)
Minimum signal level required for a peak to count as "detected". Configurable in the Extract page (default 100,000).

## M

**Mass tolerance**
How far an observed m/z can deviate from the expected m/z and still be considered the same compound. Expressed in **ppm** (parts per million). Lower = stricter. 5 ppm is a typical default.

**Metabolomics**
Measuring small-molecule metabolites in biological samples. LEAF is built specifically for this use case.

**MINT**
The Morscher Lab's internal data platform. LEAF runs as a plugin under MINT in the hosted lab version. (Acronym originally stood for the lab database; rebranded 2026.)

**MS1**
First-stage mass spectrometry — measures the parent ion's m/z. LEAF works primarily with MS1 data.

**MS2**
Second-stage MS — fragments the parent ion and measures the fragments. Used for compound identification. LEAF supports MS2 spectral matching against mzVault libraries.

**m/z** (mass-to-charge ratio)
What a mass spectrometer actually measures. For singly-charged ions (the common case in metabolomics), m/z ≈ mass.

**.msd file**
LEAF's native bundle for **targeted** analysis results. Contains intensities, peaks, quality scores, parameters. zstd-compressed Arrow/Parquet.

**mzVault**
A SQLite-based spectral library format from Thermo. Used for MS2 identification.

## P

**Peak picking**
Detecting where peaks start and end in a chromatogram, and characterizing their shape. LEAF offers methods v1 (basic), v2 (smoothed), v4 (advanced — recommended).

**Polarity**
Mass-spectrometer mode — POS (positive) detects positively-charged ions; NEG (negative) detects negatively-charged. Must match your acquisition method.

**ppm** (parts per million)
Unit for mass tolerance. 5 ppm at m/z 200 = 0.001 Da. Lower ppm = stricter matching.

## Q

**Quality verdict**
LEAF's per-compound assessment. **Good** (use it), **Warning** (review it), **Poor** (probably exclude).

## R

**RAW file**
Thermo Fisher's native LC-MS file format (`.raw`). The input to every LEAF workflow.

**RetentionTime / RT**
When a compound elutes from the LC column, in minutes. LEAF uses the expected RT to know where to look for each metabolite.

**RT alignment**
Compensating for small RT shifts between samples (column aging, temperature drift, etc.). Done automatically during extraction.

## S

**SEM** (Standard Error of the Mean)
Error bars in the isotopologue chart show mean ± SEM per sample group.

**SNR** (Signal-to-Noise Ratio)
How strong a peak is relative to the baseline noise. Higher = more confident the peak is real. Configurable threshold on the Extract page.

## T

**Targeted analysis**
Quantifying a known list of compounds. Requires a metabolite CSV. Fast and reproducible.

## U

**Untargeted analysis**
Discovering features without a prior list. Slower, gives you a triage table to find candidates.

**.usd file**
LEAF's native bundle for **untargeted** results. Same format family as `.msd` but contains feature data instead of compound data.
