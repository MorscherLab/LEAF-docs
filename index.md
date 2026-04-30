---
layout: home

hero:
  name: LEAF
  text: LC-MS metabolomics, web-first
  tagline: Upload your Thermo RAW files, drop a metabolite list, get publication-ready charts. No command line. No data leaves your machine.
  image:
    src: /leaf-icon.png
    alt: LEAF
  actions:
    - theme: brand
      text: Get Started
      link: /get-started/install-desktop
    - theme: alt
      text: First analysis (5 min)
      link: /get-started/quickstart
    - theme: alt
      text: Open MINT →
      link: https://mint.morscherlab.org

features:
  - icon: 🧪
    title: Targeted analysis
    details: Drop in a CSV of metabolites, point at a folder of RAW files, and LEAF extracts ion chromatograms, picks peaks, and scores quality automatically.
    link: /workflow/extract
    linkText: How it works

  - icon: 🔍
    title: Untargeted discovery
    details: No metabolite list? LEAF finds every feature in your data, aligns them across samples, and gives you a triage table to find what's interesting.
    link: /workflow/untargeted
    linkText: Untargeted workflow

  - icon: 🧬
    title: Isotope tracing
    details: Configure ¹³C, ¹⁵N, ²H, ¹⁸O, or ³⁴S labeling in two clicks. See per-isotopologue distributions with mean ± SEM grouping.
    link: /workflow/tracing
    linkText: Tracing setup

  - icon: 📊
    title: Built-in visualizations
    details: PCA, heatmaps, volcano plots, hierarchical clustering, correlation networks, KEGG pathways. All interactive Plotly charts.
    link: /workflow/visualize
    linkText: Chart catalog

  - icon: 💾
    title: One file, everything inside
    details: Save your full analysis — intensities, peaks, quality scores, parameters — as a single .msd file. Reopen anytime, share with anyone who has LEAF.
    link: /workflow/export
    linkText: Export formats

  - icon: 🔒
    title: Your data, your machine
    details: Desktop install runs entirely on 127.0.0.1. Files never leave your computer. Hosted at your lab? Auth is handled by your existing lab login.
    link: /get-started/install-desktop
    linkText: Install LEAF
---

<div style="max-width:920px;margin:64px auto 0;padding:24px;border-radius:12px;background:var(--vp-c-bg-soft);">

## Lab user? Open MINT

If your lab already runs LEAF on its MINT server, skip the install entirely.

<a href="https://mint.morscherlab.org" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px;padding:12px 28px;background:var(--vp-c-brand-1);color:white;border-radius:8px;text-decoration:none;font-weight:600;">Open MINT →</a>

<span style="display:block;margin-top:8px;font-size:14px;color:var(--vp-c-text-2);">No account? Ask your lab admin. The hosted version uses your existing lab credentials.</span>

</div>

<div style="max-width:920px;margin:32px auto 64px;padding:24px;border-radius:12px;border:1px solid var(--vp-c-divider);">

## Building on LEAF or contributing?

The user manual is here. For developer reference — Python API, plugin architecture, frontend internals — head to the [LEAF repository docs](https://github.com/MorscherLab/LEAF/tree/main/docs).

</div>
