# SEED — Spectral Extraction & Encoding Driver

LEAF reads Thermo `.raw` files through **SEED**, a Rust library bundled inside the LEAF wheel. On macOS and Linux, SEED is the only available reader. On Windows, LEAF can also use Thermo's official .NET RawFileReader (the `dotnet` backend); SEED is still the default unless you opt in.

## Why SEED matters

| | SEED (`rust` backend) | Thermo .NET (`dotnet` backend) |
|---|---|---|
| Platforms | macOS, Linux, Windows | Windows only at runtime |
| .NET 8 SDK required | No | Yes |
| Default on macOS / Linux | Yes | (unavailable) |
| Source | Rust crate, [oxion-core](https://github.com/EstrellaXD/oxion-core) (the historical repo name) | Thermo Fisher Scientific |

You usually don't have to think about the backend — LEAF picks `rust` automatically on macOS / Linux. The choice only matters on Windows, where `--backend dotnet` is occasionally needed for files SEED cannot decode (rare, instrument-firmware-specific).

## Selecting the backend

From the CLI:

```bash
leaf targeted ./samples ./compounds.csv --backend rust     # force SEED
leaf targeted ./samples ./compounds.csv --backend dotnet   # force Thermo .NET (Windows only)
leaf targeted ./samples ./compounds.csv --backend auto     # default
```

From the web UI: **Settings → Advanced → Backend**.

## Brand note

SEED is the rebrand of the project formerly known as **oxion**. The repository name `EstrellaXD/oxion-core` is retained for legacy reasons; the brand and the public crate names (`seed`, `seed-cli`, `seed-py`) are SEED end-to-end.

## Reporting RAW files SEED cannot read

If a `.raw` file fails to load with the `rust` backend:

1. Confirm Thermo's Xcalibur can open the file.
2. On Windows, retry with `--backend dotnet`.
3. If neither works, [open a LEAF issue](https://github.com/MorscherLab/LEAF/issues) with the LEAF version, the instrument model, and the firmware version.
