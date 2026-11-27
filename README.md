# LEAF Docs

The user-facing documentation site for [LEAF](https://github.com/MorscherLab/LEAF), the LC-MS Extensible Analysis Framework. Built with [VitePress](https://vitepress.dev/), deployed to **leaf-docs.morscherlab.org** via GitHub Pages.

This repository contains the user manual: install, targeted workflow walkthroughs, scripting references, SEED reader docs, UI tour, FAQ, glossary, team, and changelog links. Untargeted and implementation/API reference pages are intentionally hidden from the built site. For developer-facing technical docs (full Python API, plugin architecture, frontend internals), see the [LEAF repository](https://github.com/MorscherLab/LEAF/tree/main/docs).

## Layout

```
LEAF-docs/
  package.json          # vitepress (pnpm via Vite+)
  pnpm-workspace.yaml   # Vite+ catalog and vite override
  vite.config.ts        # Vite+ fmt and lint settings
  index.md              # home page
  changelog.md          # links to GitHub releases
  get-started/
    install-mint.md
    install-cli.md
    install-desktop.md
    quickstart.md
  workflow/
    prepare-data.md
    extract.md
    analyze.md
    visualize.md
    tracing.md
    export.md
  scripting/
    index.md
    cli/
    python/
    reader.md
  seed/
    index.md
    cli.md
    changelog.md
  reference/
    ui-tour.md
    troubleshooting.md
    faq.md
    glossary.md
  .vitepress/
    config.ts           # nav, sidebar, theme, search, edit links
    theme/              # LEAF brand CSS + diagram zoom helper
    public/
      CNAME             # leaf-docs.morscherlab.org
      leaf-icon.png     # site icon (master in MorscherLab/LEAF/assets/)
  .github/workflows/
    deploy.yml          # build + GitHub Pages on push to main
```

## Local development

Install [D2](https://d2lang.com/tour/install/) and [Vite+](https://viteplus.dev/) (`vp`) before building; VitePress renders `d2` code fences into inline SVG diagrams at build time.

```bash
vp install
vp run dev      # http://localhost:17173/
vp run build    # outputs to .vitepress/dist/
vp run preview  # serve the built site
vp check        # format, lint, and type checks
```

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which installs dependencies, installs D2, builds the site, builds the `archive/v0.5` branch into `/v0.5/`, and publishes to GitHub Pages. The CNAME file ships in the build artifact. After a change on `archive/v0.5`, run the workflow manually (`gh workflow run deploy.yml --ref main`).

**One-time DNS setup**:

1. Add a CNAME record `leaf-docs.morscherlab.org` → `morscherlab.github.io` at your DNS provider.
2. In the repo's GitHub Pages settings: Source = "GitHub Actions", custom domain = `leaf-docs.morscherlab.org`, enable "Enforce HTTPS".

## Adding a page

1. Create a new `.md` file under the matching content directory.
2. Add an entry to the relevant `sidebar` group in `.vitepress/config.ts`.
3. Optionally link to it from the home page or other pages.

## Contributing

Documentation updates are managed by the maintainers. Coordinate changes with the Morscher Lab before publishing.

## License

Documentation under the same license as LEAF (see the LEAF repository).
