# LEAF Docs — v0.5 archive

Frozen user manual for LEAF 0.5, published at <https://leaf-docs.morscherlab.org/v0.5/>. The current manual lives on the `main` branch.

The `main` branch deploy workflow builds this branch with `--base /v0.5/` and publishes it next to the current site. A push to this branch does not deploy. After a change here, run `gh workflow run deploy.yml --ref main`.

## Local build

Install [D2](https://d2lang.com/tour/install/) and [Vite+](https://viteplus.dev/) (`vp`).

```bash
vp install
vp exec vitepress build --base /v0.5/
```
