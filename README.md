# LEAF Docs

The user-facing documentation site for [LEAF](https://github.com/MorscherLab/LEAF), the LC-MS Extensible Analysis Framework. Built with [VitePress](https://vitepress.dev/), deployed to **leaf-docs.morscherlab.org** via GitHub Pages.

This repository contains only the user manual (install, workflow walkthroughs, UI tour, FAQ, glossary). For developer-facing technical docs (Python API, plugin architecture, frontend internals), see the [LEAF repository](https://github.com/MorscherLab/LEAF/tree/main/docs).

## Layout

```
LEAF-docs/
  package.json          # vitepress (Bun-managed)
  bunfig.toml           # forces hoisted node_modules
  index.md              # home page
  changelog.md          # links to GitHub releases
  get-started/
    install-desktop.md
    install-hosted.md
    quickstart.md
  workflow/
    prepare-data.md
    extract.md
    analyze.md
    visualize.md
    export.md
    tracing.md
    untargeted.md
  reference/
    ui-tour.md
    troubleshooting.md
    faq.md
    glossary.md
  .vitepress/
    config.ts           # nav, sidebar, theme, search, edit links
    theme/              # LEAF brand color overrides
    public/
      CNAME             # leaf-docs.morscherlab.org
      leaf-icon.png     # site icon (master in MorscherLab/LEAF/assets/)
  .github/workflows/
    deploy.yml          # build + GitHub Pages on push to main
```

## Local development

```bash
bun install
bun run dev      # http://localhost:17173/
bun run build    # outputs to .vitepress/dist/
bun run preview  # serve the built site
```

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes to GitHub Pages. The CNAME file ships in the build artifact.

**One-time DNS setup**:

1. Add a CNAME record `leaf-docs.morscherlab.org` → `morscherlab.github.io` at your DNS provider.
2. In the repo's GitHub Pages settings: Source = "GitHub Actions", custom domain = `leaf-docs.morscherlab.org`, enable "Enforce HTTPS".

## Adding a page

1. Create a new `.md` file under `get-started/`, `workflow/`, or `reference/`.
2. Add an entry to the relevant `sidebar` group in `.vitepress/config.ts`.
3. Optionally link to it from the home page or other pages.

## Contributing

Edits welcome — every page has an "Edit on GitHub" link in the footer that takes you straight to the source. Or open a PR.

## License

Documentation under the same license as LEAF (see the LEAF repository).
