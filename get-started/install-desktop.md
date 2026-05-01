---
title: Desktop app (in development)
description: A native desktop launcher for LEAF is in development. Until it ships, install via the wheel + CLI or in MINT.
---

# Desktop app

::: warning In development
A native desktop application that wraps LEAF behind a clickable icon — no terminal, no `pip` — is currently in development and not yet released.
:::

## What this will be

A small native launcher (Tauri-based) that bundles the LEAF backend and frontend behind a single executable. Open the app and the LEAF UI shows up — no terminal, no port to remember, no `Ctrl+C` to stop the server. It's intended for users who want LEAF on a personal laptop without engaging with Python tooling.

The desktop app shares the LEAF core with all other install paths: extraction parameters, `.msd` archives, scripted analysis, and the web UI all stay identical.

## Until it ships

Use one of the existing install paths:

- **[Install the wheel + CLI](/get-started/install-cli)** — local single-user install on macOS / Windows / Linux. The standalone installer (`bash install.sh` / `install.ps1`) is the closest current equivalent to the desktop app: it produces a single `leaf` launcher you run from a terminal.
- **[Install in MINT](/get-started/install-mint)** — for labs with a shared MINT server.

## Track progress

Watch the [LEAF releases page](https://github.com/MorscherLab/LEAF/releases) — the desktop app will land as a `.dmg` (macOS) and `.msi` (Windows) asset on a future release.

To file a feature request or vote on platform priorities, [open a LEAF issue](https://github.com/MorscherLab/LEAF/issues).
