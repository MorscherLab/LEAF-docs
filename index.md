---
layout: home

hero:
  name: LEAF
  text: LC-MS Extensible Analysis Framework
  tagline: A hyper-performanced LC-MS analysis platform that reads vendor RAW files directly (7 Vendors), with metadata enhanced both targeted and untargeted workflows, isotope tracing, and statistical analysis.
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
    - theme: alt
      text: MINT Docs
      link: https://mint-docs.morscherlab.org

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

  - icon: 💾
    title: Self-contained .msd archive
    details: A single .msd file stores intensities, detected peaks, quality scores, isotopologue distributions, and the parameters used during extraction. Reopens in any compatible LEAF version.
    link: /workflow/export
    linkText: Export formats

  - icon: 🔒
    title: Local-first execution
    details: The local install binds to 127.0.0.1 and makes no outbound network requests. The hosted version delegates authentication to the lab's existing MINT instance.
    link: /get-started/install-cli
    linkText: Installation
---

::: tip Hosted MINT access
If your lab operates a MINT server with LEAF installed, no local installation is required. The hosted version uses your lab credentials; contact your administrator to request access.

[MINT Docs](https://mint-docs.morscherlab.org) · [Install in MINT](/get-started/install-mint)
:::

::: info Developer documentation
This site is the user manual. For Python API reference, plugin architecture, and frontend internals, see the [LEAF repository documentation](https://github.com/MorscherLab/LEAF/tree/main/docs).
:::
