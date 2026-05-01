---
title: SEED Changelog
---

# SEED Changelog

::: info Public release status
The public release pipeline is currently dormant; releases are being built privately while SEED prepares its 0.x public relaunch. The `oxion` and `oxion-core` repository names share their release tags — both names appear in older release URLs.
:::

## Latest releases

→ [GitHub Releases](https://github.com/EstrellaXD/oxion/releases) — published binaries and notes once the public pipeline resumes.

→ [Full CHANGELOG](https://github.com/EstrellaXD/oxion-core/blob/main/CHANGELOG.md) — per-commit feature and fix log in the SEED repository.

## Performance log

SEED maintains a separate [`OPTIMIZATION.md`](https://github.com/EstrellaXD/oxion-core/blob/main/OPTIMIZATION.md) recording every release that ships a measured performance improvement — workload, before / after timings, and the change that produced the speedup. Use it when you need historical perf context, not feature notes.

## How SEED versions work

- **Major** (`1.x.x`) — breaking changes to the public API surface
- **Minor** (`0.x.y`) — new features that don't break existing callers
- **Patch** (`0.x.0` → `0.x.1`) — bug fixes only

The Rust crate, Python wheel, CLI binary, and GUI converter are versioned together — releasing as a single tag.

## Need help upgrading?

If a release breaks something you depend on, please [open an issue](https://github.com/MorscherLab/LEAF/issues) on the LEAF tracker — SEED's own issue tracker tracks the upstream repository (currently private). LEAF maintainers will route as needed.
