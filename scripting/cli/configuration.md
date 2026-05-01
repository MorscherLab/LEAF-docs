# Configuration

LEAF reads configuration from four sources, in increasing order of precedence:

1. **Built-in defaults** — used when no other source overrides them.
2. **`config.json`** — written by the **Settings** dialog in the web UI. The file lives in LEAF's data directory.
3. **`.env` file** — picked up automatically from the current working directory.
4. **Environment variables** — `LEAF_`-prefixed; the highest priority.
5. **Command-line flags** — passed to `leaf webui` (see [`leaf webui`](/scripting/cli/webui)) or to `leaf targeted` / `leaf untargeted`. Flags override everything for that one invocation.

For most users, the Settings dialog is the only configuration interface required. Env vars and `config.json` exist for headless deployments (MINT plugin, Docker, S3-backed setups).

## Settings dialog

Open the gear icon in the top action bar of the web UI. Three tabs:

| Tab | Section | What it controls |
|-----|---------|------------------|
| **Storage** | Backend | `local` filesystem or `s3`-compatible object storage. See [Storage backend](#storage-backend). |
| **Storage** | Local path / S3 fields | Form fields for the active backend |
| **Display** | Theme | Light or dark colour scheme for the UI. |
| **Display** | Chart defaults | Default colormaps and normalization choices applied to new visualizations. |
| **Advanced** | Backend | `auto`, `rust` (SEED), or `dotnet` (Windows). See [Backend selection](#backend-selection). |
| **Advanced** | Worker count | Number of parallel workers used during extraction. Default scales with available CPU cores. |

> [Screenshot: Settings → Storage tab with the local / S3 backend toggle]

Changes apply to subsequent jobs. Running jobs are not affected. The **Storage** tab supports a hot backend swap — switching from local to S3 (or vice versa) doesn't require a restart.

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

Only the keys you want to override need to be present. Missing keys fall back to defaults.

## Storage backend

LEAF persists `.msd` and `.usd` analysis archives through one of two storage backends. RAW input files are read directly from the filesystem regardless of backend — only the results bundle uses the storage backend.

### `local` (default)

Stores `.msd` files under a local directory.

| Field | Default | Description |
|-------|---------|-------------|
| `local.results_path` | `./Data/results` | Filesystem path where archives are written. Relative paths resolve against the LEAF working directory. |

Path-traversal protection is enforced — keys that escape the configured directory are rejected.

### `s3` — S3-compatible object storage

Stores `.msd` files in any S3-compatible bucket: AWS S3, MinIO, Ceph RGW, or any other endpoint that speaks the S3 API. Set up by switching the backend in **Settings → Storage** or via env vars.

| Field | Default | Description |
|-------|---------|-------------|
| `s3.endpoint_url` | _(empty — uses AWS)_ | Custom endpoint for non-AWS providers. Leave blank for AWS S3. |
| `s3.bucket` | _(empty)_ | Bucket name. Required. |
| `s3.prefix` | `results/` | Key prefix within the bucket. Use to host multiple deployments in one bucket (e.g. `lab-a/`, `lab-b/`). |
| `s3.region` | `eu-central-1` | AWS region. Many S3-compatible providers also require this even when irrelevant. |
| `s3.access_key_id` | _(empty)_ | Access key. Stored in `config.json` if set via the UI. |
| `s3.secret_access_key` | _(empty)_ | Secret key. Stored alongside the access key. |

::: tip Non-AWS endpoints
LEAF disables payload signing and per-request checksums when an `endpoint_url` is set, to stay compatible with MinIO and Ceph RGW deployments. AWS S3 itself doesn't need these tweaks and works without `endpoint_url`.
:::

### Testing the connection

The Settings → Storage tab has a **Test connection** button that performs a `list_objects_v2` against the configured bucket and prefix. Use it to confirm credentials and permissions before saving.

### What gets stored

Only `.msd` (targeted) and `.usd` (untargeted) result archives are written through the storage backend. The list endpoint filters by extension, so other files in the bucket / directory are ignored.

What stays on the local filesystem regardless of backend:

- RAW input files (you point LEAF at them; they're never copied)
- Per-job intermediate state (in-memory + temp files; cleaned up after a job completes)
- The built-in compound list cache and parsed-RAW cache

## Backend selection

LEAF reads RAW files through one of three reader backends. Selection is per-run via the `--backend` flag on `leaf targeted` / `leaf untargeted`, or per-installation via the **Settings → Advanced** dialog in the web UI.

| Backend | When used | Source |
|---------|-----------|--------|
| `auto` (default) | Picks the best backend for the current platform: `dotnet` on Windows, `rust` (SEED) elsewhere | — |
| `rust` | Bundled SEED reader (Rust); no .NET required | [SEED](/scripting/reader) |
| `dotnet` | Thermo .NET RawFileReader; requires .NET 8 runtime on Windows | Thermo Fisher |

Switching backends does not modify saved results.

## Next

→ [Python package overview](/scripting/python/overview) — using LEAF programmatically
