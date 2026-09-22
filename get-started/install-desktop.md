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

- **[Install the wheel + CLI](/get-started/install-cli)** — current local installation for macOS, Windows, and Linux. The wheel includes the web interface, Rust extensions, and SEED reader.
- Configured MINT deployments provide a separate shared-server path managed by the hosting lab.

## Track progress

The [LEAF releases page](https://github.com/MorscherLab/LEAF/releases) will list the desktop app as a `.dmg` (macOS) and `.msi` (Windows) asset when it is released.

To file a feature request or vote on platform priorities, [open a LEAF issue](https://github.com/MorscherLab/LEAF/issues).
