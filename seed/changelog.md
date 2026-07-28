---
title: SEED Changelog
---

# SEED Changelog

::: info Public release status
The public release pipeline is currently dormant; releases are being built privately while SEED prepares its 0.x public relaunch. The repository was renamed from `oxion-core` to `seed-core`; older release URLs using either name still resolve.
:::

## Latest releases

→ [GitHub Releases](https://github.com/EstrellaXD/oxion/releases) — published binaries and notes once the public pipeline resumes.

→ [Full CHANGELOG](https://github.com/EstrellaXD/seed-core/blob/main/CHANGELOG.md) — per-commit feature and fix log in the SEED repository.

## How SEED versions work

- **Major** (`1.x.x`) — breaking changes to the public API surface
- **Minor** (`0.x.y`) — new features that don't break existing callers
- **Patch** (`0.x.0` → `0.x.1`) — bug fixes only

The Rust crate, Python wheel, CLI binary, and GUI converter are versioned together — releasing as a single tag.

## Need help upgrading?

If a release introduces a regression, please [open an issue](https://github.com/MorscherLab/LEAF/issues) on the LEAF tracker. SEED's own issue tracker tracks the upstream repository (currently private), and LEAF maintainers will route reports as needed.
