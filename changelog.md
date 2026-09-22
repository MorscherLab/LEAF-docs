---
title: Changelog
---

# Changelog

LEAF follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Stable releases ship platform wheels; MINT deployments use the `.mint` plugin bundle.

## Latest releases

→ [GitHub Releases](https://github.com/MorscherLab/LEAF/releases) — downloadable wheels and full notes per version.

→ [Full CHANGELOG](https://github.com/MorscherLab/LEAF/blob/main/CHANGELOG.md) — every change, every version.

## Current documentation snapshot

This manual documents LEAF `0.8.6`, including the [Results export workflow](/workflow/export) and [command-line export reference](/scripting/cli/export). Release details remain in the upstream changelog.

The installation guide reflects the separate macOS and Windows wheel builds introduced in 0.8.4. Multi-element natural-abundance correction is under development and is not part of the 0.8.6 instructions.

## How LEAF versions work

- **Major** (`1.x.x`) — major compatibility changes
- **Minor** (`0.8.x`) — features and, before 1.0, possible breaking changes
- **Patch** (`0.8.0` → `0.8.1`) — compatible fixes

LEAF 0.8 reads `.msd` schema 5 or newer and `.usd` schema 9 or newer. Newer archives may require a newer LEAF version.

## Need help upgrading?

If a release introduces a regression, please [open an issue](https://github.com/MorscherLab/LEAF/issues). Regressions are tracked as bugs.
