# SEED — the LEAF reader backend

LEAF reads targeted `.raw`, `.mzml`, and `.mzml.gz` inputs through SEED on macOS and Linux (the `rust` backend in [`leaf --backend`](/scripting/cli/configuration#backend-selection)). On Windows, targeted `.raw` files default to Thermo's `dotnet` reader while mzML-family files use SEED.

SEED is a separate project with its own user manual:

→ [SEED — Overview](/seed/)
→ [Command line](/seed/cli) · [Python API](/seed/python-api) · [Rust API](/seed/rust-api)

## When the backend choice matters

- **macOS / Linux** — `auto` routes targeted inputs through SEED.
- **Windows** — `auto` uses `dotnet` for targeted `.raw` files and SEED for mzML-family files. Override to `rust` (`--backend rust` or **Settings → Advanced**) when you want SEED's parser for `.raw`; override to `dotnet` for Thermo files SEED cannot decode.

## Reporting RAW files SEED cannot read

1. Confirm Thermo's Xcalibur opens the file.
2. On Windows, retry with `--backend dotnet`.
3. If neither works, [open a LEAF issue](https://github.com/MorscherLab/LEAF/issues) with the LEAF version, the instrument model, and the firmware version.
