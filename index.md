---
layout: home

hero:
  name: LEAF
  text: LC-MS Extensible Analysis Framework
  tagline: High-performance LC-MS data processing for metabolomics — targeted extraction, untargeted feature detection, peak picking, quality scoring, isotope tracing, and statistical visualization.
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
  - icon: 🧪
    title: Targeted analysis
    details: Given a compound list and a folder of RAW files, LEAF extracts ion chromatograms, detects peaks, and assigns per-compound quality verdicts.
    link: /workflow/extract
    linkText: Extraction parameters

  - icon: 🔍
    title: Untargeted analysis
    details: Without a predefined compound list, LEAF detects features across samples, aligns them by m/z and retention time, and produces a feature table for downstream filtering and identification.
    link: /workflow/untargeted
    linkText: Untargeted workflow

  - icon: 🧬
    title: Isotope tracing
    details: Supports ¹³C, ¹⁵N, ²H, ¹⁸O, and ³⁴S labeling. Reports per-isotopologue intensities as absolute values or fractional labeling, summarized as mean ± SEM by group.
    link: /workflow/tracing
    linkText: Tracing setup

  - icon: 📊
    title: Statistical visualization
    details: PCA, heatmaps, volcano plots, hierarchical clustering, correlation networks, and KEGG pathway maps, rendered as interactive Plotly charts.
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
