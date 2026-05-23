---
layout: home

hero:
  name: LEAF
  text: LC-MS Extensible Analysis Framework
  tagline: A user-facing LC-MS metabolomics workflow for targeted extraction, peak review, quality assessment, isotope tracing, and statistical visualization.
  image:
    src: /leaf-icon.png
    alt: LEAF
  actions:
    - theme: brand
      text: Get Started
      link: /get-started/install-cli
    - theme: alt
      text: Quickstart
      link: /get-started/quickstart

features:
  - title: Targeted quantification
    details: LEAF extracts ion chromatograms from a defined compound list, performs peak picking, and stores the complete analysis in a reproducible result archive.
    link: /workflow/extract
    linkText: Extraction parameters

  - title: Quality assessment
    details: Per-compound verdicts, chromatogram review, retention-time checks, and sample grouping support systematic review before statistical interpretation.
    link: /workflow/analyze
    linkText: Result review

  - title: Isotope tracing
    details: Stable-isotope labeling experiments can be configured during extraction and reviewed as absolute or fractional isotopologue distributions.
    link: /workflow/tracing
    linkText: Tracing setup

  - title: Statistical visualization
    details: PCA, heatmaps, volcano plots, hierarchical clustering, correlation networks, and pathway maps are generated from the processed targeted dataset.
    link: /workflow/visualize
    linkText: Chart reference
---

::: warning MINT integration under development
Hosted LEAF through MINT is not enabled for general use yet. Use the wheel + CLI install path for current analyses.

[Install the wheel + CLI](/get-started/install-cli) · [MINT status](/get-started/install-mint)
:::

::: info Developer documentation
This site is the user manual. For Python API reference, plugin architecture, and frontend internals, see the [LEAF repository documentation](https://github.com/MorscherLab/LEAF/tree/main/docs).
:::
