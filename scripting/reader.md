# SEED — the LEAF reader backend

LEAF reads RAW files through SEED on macOS and Linux (the `rust` backend in [`leaf --backend`](/scripting/cli/configuration#backend-selection)). On Windows, LEAF defaults to Thermo's `dotnet` reader and falls back to SEED on opt-in.

SEED is a separate project with its own user manual:

→ [SEED — Overview](/seed/)
→ [Command line](/seed/cli) · [Python API](/seed/python-api) · [Rust API](/seed/rust-api)

## When the backend choice matters

- **macOS / Linux** — there is no choice; SEED is the only reader.
- **Windows** — `auto` picks `dotnet` by default. Override to `rust` (`--backend rust` or **Settings → Advanced**) when you want SEED's parser; override to `dotnet` (the default) for files SEED cannot decode.

## Reporting RAW files SEED cannot read

1. Confirm Thermo's Xcalibur opens the file.
2. On Windows, retry with `--backend dotnet`.
3. If neither works, [open a LEAF issue](https://github.com/MorscherLab/LEAF/issues) with the LEAF version, the instrument model, and the firmware version.
