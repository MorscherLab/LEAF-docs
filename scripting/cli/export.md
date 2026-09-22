# Export from the command line

Use `leaf export` to prepare saved LEAF results for external annotation tools. For quantitative CSV tables, use [Results in the web interface](/workflow/export#export-the-quantitative-table).

## Choose an output

Start with a saved `.msd` containing MS² evidence. LEAF writes the input files; run the external annotation software separately.

| Command | Output | Use |
|---|---|---|
| `leaf export sirius` | A directory of `.ms` files and `manifest.json` | SIRIUS input, including MS1 isotope peaks when the original raw files are available |
| `leaf export mgf` | One `.mgf` file and an adjacent `.manifest.json` file | Tools accepting MGF spectra |
| `leaf export msp` | One `.msp` file and an adjacent `.manifest.json` file | Tools accepting MSP spectra |

```bash
leaf export sirius analysis.msd sirius-input/
leaf export mgf analysis.msd spectra.mgf
leaf export msp analysis.msd spectra.msp
```

Keep the manifest with its exported files. It maps exported record names back to the LEAF peaks for annotation import.

## Select replicate spectra

By default, targeted exports write one record per metabolite, choosing the replicate trace whose spectrum has the most signal. Use `--per-sample` to export one record per metabolite and sample instead:

```bash
leaf export mgf analysis.msd spectra-per-sample.mgf --per-sample
```

Use `--min-score` to exclude records below a quality-score threshold. No score threshold is applied by default.

## Locate raw files for SIRIUS

If the original raw files have moved, supply their directory:

```bash
leaf export sirius analysis.msd sirius-input/ --raw-dir /path/to/raw-files
```

SIRIUS export reads the MS1 isotope envelope from the raw acquisition. Without readable raw files, a targeted `.msd` export contains MS² evidence only. MGF and MSP do not include an MS1 isotope block and do not need `--raw-dir`.

## Check the export

Read the command's summary and exported-record count. If no records were written, check that extraction included MS² evidence and review any reported exclusions. Re-run extraction with MS² enabled if the archive contains none.

These commands also accept `.usd` archives. The `--differential` filter applies only to `.usd`; it is rejected for targeted `.msd` files. See the [upstream annotation reference](https://github.com/MorscherLab/LEAF/blob/main/docs/leaf/api/annotation.md) for that workflow and for importing external annotations with `leaf downstream annotate`.

```bash
leaf export --help
leaf export sirius --help
```

→ [Save and export results in the web interface](/workflow/export)
