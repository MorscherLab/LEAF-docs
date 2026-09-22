# SEED — the LEAF reader

LEAF 0.8 reads supported mass-spectrometry inputs through the bundled SEED implementation in `leaf.core` on macOS, Windows, and Linux. The former `.NET RawFileReader` backend and `--backend` CLI option were removed.

Supported Web UI and CLI inputs include Thermo `.raw`, `.mzml`, and `.mzml.gz`. Shimadzu `.lcd` is supported for targeted MRM workflows with explicit transitions.

SEED has a separate user manual:

→ [SEED overview](/seed/)

→ [SEED command line](/seed/cli)

## If a file cannot be read

1. Confirm the file opens in the instrument vendor software.
2. Run `leaf inspect FILE` to reproduce the reader error without starting an analysis.
3. Run `leaf doctor` and record the LEAF and SEED status.
4. [Open a LEAF issue](https://github.com/MorscherLab/LEAF/issues) with the LEAF version, instrument model, firmware version, and error message.

Convert unsupported vendor formats to mzML with the vendor converter or ProteoWizard.
