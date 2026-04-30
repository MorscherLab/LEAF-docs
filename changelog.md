---
title: Changelog
---

# Changelog

LEAF follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Every release ships a single Python wheel per platform.

## Latest releases

→ [GitHub Releases](https://github.com/MorscherLab/LEAF/releases) — downloadable wheels and full notes per version.

→ [Full CHANGELOG](https://github.com/MorscherLab/LEAF/blob/main/CHANGELOG.md) — every change, every version.

## How LEAF versions work

- **Major** (`1.x.x`) — breaking changes to the API or file formats
- **Minor** (`0.5.x`) — new features that don't break existing data
- **Patch** (`0.5.0` → `0.5.1`) — bug fixes only

`.msd` and `.usd` files written by an older minor version always reopen in newer versions of the same major. Files written by a newer major version may not open in older clients.

## Need help upgrading?

If a release breaks something you depend on, please [open an issue](https://github.com/MorscherLab/LEAF/issues) — we treat regressions as bugs.
