---
title: Desktop app (in development)
description: A native desktop launcher for LEAF is in development. Until it ships, install via the wheel + CLI.
---

# Desktop app

::: warning In development
A native desktop application that wraps LEAF behind a clickable icon — no terminal, no `pip` — is currently in development and not yet released.
:::

## Planned behavior

A small native launcher (Tauri-based) will bundle the LEAF backend and frontend behind a single executable. Launching the app will open the LEAF UI without a terminal, a port number, or a `Ctrl+C` shutdown step. This path is intended for personal laptop installations that should not require manual Python package management.

The desktop app shares the LEAF core with all other install paths: extraction parameters, `.msd` archives, scripted analysis, and the web UI all stay identical.

## Current alternatives

Use one of the existing install paths:

- **[Install the wheel + CLI](/get-started/install-cli)** — local single-user install on macOS / Windows / Linux. The standalone installer (`bash install.sh` / `install.ps1`) is the closest current equivalent to the desktop app: it produces a single `leaf` launcher run from a terminal.
- **[Install in MINT](/get-started/install-mint)** — shared-server path for configured beta deployments.

## Track progress

The [LEAF releases page](https://github.com/MorscherLab/LEAF/releases) will list the desktop app as a `.dmg` (macOS) and `.msi` (Windows) asset when it is released.

To file a feature request or vote on platform priorities, [open a LEAF issue](https://github.com/MorscherLab/LEAF/issues).
