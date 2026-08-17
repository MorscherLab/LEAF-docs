# Configuration

LEAF reads configuration from five sources, in increasing order of precedence:

1. **Built-in defaults** — used when no other source overrides them.
2. **`config.json`** — written by the **Settings** dialog in the web UI. The file lives in LEAF's data directory.
3. **`.env` file** — picked up automatically from the current working directory.
4. **Environment variables** — `LEAF_`-prefixed; the highest priority.
5. **Command-line flags** — passed to `leaf webui` (see [`leaf webui`](/scripting/cli/webui)) or `leaf targeted`. Flags override everything for that invocation.

For most users, the Settings dialog covers runtime and processing defaults. Env vars and `config.json` provide server, storage, and headless-deployment settings that are not exposed in the current dialog.

## Settings dialog

Open the gear icon in the top action bar of the web UI.

| Tab | What it controls |
|---|---|
| **Plugin** | RAW-file path, concurrent jobs, and SEED I/O defaults |
| **Peak Picking** | Targeted peak-detection defaults |
| **Untargeted** | Advanced untargeted-processing defaults |
| **Volume3D** | Advanced Volume3D defaults |
| **MS²** | Spectral-matching defaults |
| **Appearance** | Theme, colour palette, and table density |

![Current LEAF Settings dialog showing the Plugin runtime controls](/screenshots/reference/settings-plugin.jpg)

Changes apply to subsequent jobs. Running jobs are not affected.

## Environment variables

LEAF picks up env vars prefixed with `LEAF_`. Nested config keys use a double-underscore separator. Examples:

```bash
# Server
export LEAF_SERVER__HOST=127.0.0.1
export LEAF_SERVER__PORT=18008

# Storage — switch to S3
export LEAF_STORAGE__BACKEND=s3
export LEAF_STORAGE__S3__BUCKET=leaf-results
export LEAF_STORAGE__S3__PREFIX=lab-a/
export LEAF_STORAGE__S3__REGION=eu-central-1
export LEAF_STORAGE__S3__ENDPOINT_URL=https://s3.example.org
export LEAF_STORAGE__S3__ACCESS_KEY_ID=AKIAEXAMPLE
export LEAF_STORAGE__S3__SECRET_ACCESS_KEY=secret123

# Logging
export LEAF_LOG_LEVEL=INFO
```

A `.env` file in the working directory is read automatically with the same key names (no `export`).

## `config.json`

The Settings dialog persists every change to a `config.json` file. The same file can be hand-edited or shipped with a deployment. Schema (defaults shown):

```json
{
  "deploy_mode": "local",
  "server": { "host": "127.0.0.1", "port": 18008 },
  "extraction": { "max_concurrent_jobs": 2 },
  "storage": {
    "backend": "local",
    "local": { "results_path": "./Data/results" },
    "s3": {
      "endpoint_url": "",
      "bucket": "",
      "prefix": "results/",
      "region": "eu-central-1",
      "access_key_id": "",
      "secret_access_key": ""
    }
  },
  "log_level": "INFO"
}
```

Only override keys need to be present. Missing keys fall back to defaults.

## Storage backend

LEAF persists `.msd` targeted analysis archives through one of two storage backends. LC-MS input files are read directly from the filesystem regardless of backend; only the result archive uses the storage backend.

### `local` (default)

Stores `.msd` files under a local directory.

| Field | Default | Description |
|-------|---------|-------------|
| `local.results_path` | `./Data/results` | Filesystem path where archives are written. Relative paths resolve against the LEAF working directory. |

Path-traversal protection is enforced — keys that escape the configured directory are rejected.

### `s3` — S3-compatible object storage

Stores `.msd` files in any S3-compatible bucket: AWS S3, MinIO, Ceph RGW, or any other endpoint that speaks the S3 API. Configure this backend in `config.json` or with `LEAF_STORAGE__*` environment variables.

| Field | Default | Description |
|-------|---------|-------------|
| `s3.endpoint_url` | _(empty — uses AWS)_ | Custom endpoint for non-AWS providers. Leave blank for AWS S3. |
| `s3.bucket` | _(empty)_ | Bucket name. Required. |
| `s3.prefix` | `results/` | Key prefix within the bucket. Use to host multiple deployments in one bucket (e.g. `lab-a/`, `lab-b/`). |
| `s3.region` | `eu-central-1` | AWS region. Many S3-compatible providers also require this even when irrelevant. |
| `s3.access_key_id` | _(empty)_ | Access key. Prefer an environment variable when possible. |
| `s3.secret_access_key` | _(empty)_ | Secret key. Stored alongside the access key. |

::: tip Non-AWS endpoints
LEAF disables payload signing and per-request checksums when an `endpoint_url` is set, to stay compatible with MinIO and Ceph RGW deployments. AWS S3 itself doesn't need these tweaks and works without `endpoint_url`.
:::

### What gets stored

Only `.msd` result archives are written through the documented storage backend. The list endpoint filters by extension, so other files in the bucket or directory are ignored.

What stays on the local filesystem regardless of backend:

- LC-MS input files (selected in LEAF; never copied)
- Per-job intermediate state (in-memory + temp files; cleaned up after a job completes)
- The built-in compound list cache and parsed input-file cache

## Backend selection

LEAF reads targeted inputs through the selected reader backend. Selection is per-run via the `--backend` flag on `leaf targeted`, or from **Extract → Advanced** in the web UI.

| Backend | When used | Source |
|---------|-----------|--------|
| `auto` (default) | macOS / Linux: SEED. Windows: `dotnet` for `.raw`, SEED for `.mzml` / `.mzml.gz`. | — |
| `rust` | Bundled SEED reader; no .NET required. | [SEED](/scripting/reader) |
| `dotnet` | Thermo .NET RawFileReader for Thermo `.raw`; requires .NET 8 runtime on x64. | Thermo Fisher |

### Backend availability gating

LEAF validates that the requested backend is available before starting extraction. If a backend is missing (e.g. SEED not installed, or .NET 8 not present), the CLI exits with a descriptive error and the web UI disables that backend in the selector. Run `leaf doctor` to see the status of each backend.

When MS² extraction is enabled, LEAF automatically routes to the SEED (Rust) backend because the .NET RawFileReader path does not provide the MS² extraction surface. This applies to both the web UI and `leaf targeted --extract-ms2`.

Switching backends does not modify saved results.

## Next

→ [Python package overview](/scripting/python/overview) — using LEAF programmatically
