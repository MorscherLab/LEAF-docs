---
title: Changelog
---

# Changelog

LEAF follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Every release ships a single Python wheel per platform.

## Latest releases

→ [GitHub Releases](https://github.com/MorscherLab/LEAF/releases) — downloadable wheels and full notes per version.

→ [Full CHANGELOG](https://github.com/MorscherLab/LEAF/blob/main/CHANGELOG.md) — every change, every version.

## Current documentation snapshot

This manual is synced with the local LEAF `0.5-dev` checkout after `v0.5.0-beta.8`. User-facing updates now covered here:

- **`leaf update` resolves from GitHub Releases.** Running `leaf update` automatically finds the latest compatible wheel for your platform. Supports `--github-release`, `--github-token`, and `--dry-run`.
- **Reader backend gating.** LEAF now validates that the selected reader backend (SEED or .NET RawFileReader) is available before starting extraction. The web UI disables unavailable backends, and `leaf doctor` shows per-backend status.
- **MS² extraction auto-routes to SEED.** Enabling MS² now forces the Rust backend because the .NET reader does not provide the MS² extraction surface.
- **Progressive Web App.** The LEAF Web UI can be installed as a standalone desktop app from Chrome or Edge.
- **Plugin bundles use `.mint` format.** Release bundles are now `leaf-webui-bundle-*.mint` (previously `.mld`).
- CLI setup and file commands: `leaf doctor`, `leaf validate`, `leaf init`, `leaf inspect`, `leaf update`, and `leaf convert`.
- Natural-abundance correction for targeted tracing in the web UI and `leaf targeted --correct --tracer ...`.
- MINT terminology updates, while hosted MINT deployment remains under development for general users.

## How LEAF versions work

- **Major** (`1.x.x`) — breaking changes to the API or file formats
- **Minor** (`0.5.x`) — new features that don't break existing data
- **Patch** (`0.5.0` → `0.5.1`) — bug fixes only

`.msd` and `.usd` files written by an older minor version always reopen in newer versions of the same major. Files written by a newer major version may not open in older clients.

## Need help upgrading?

If a release breaks something you depend on, please [open an issue](https://github.com/MorscherLab/LEAF/issues) — we treat regressions as bugs.
