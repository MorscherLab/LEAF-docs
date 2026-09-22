# Setup and File Tools

## Command summary

| Command | Purpose |
|---|---|
| `leaf doctor` | Check Python, LEAF, native extensions, SEED, server dependencies, and Web UI assets. |
| `leaf validate` | Validate a compound list and optional data path before extraction. |
| `leaf init` | Create a starter targeted-run folder. |
| `leaf inspect` | Summarize an `.msd`, `.usd`, or supported acquisition file. |
| `leaf update` | Install a compatible LEAF release wheel. |

`leaf convert` was removed in 0.8. Use the instrument vendor converter or ProteoWizard when mzML conversion is required.

## Check an installation

```bash
leaf doctor
```

The report includes the LEAF version, Python version, `leaf.core`, SEED reader, FastAPI/Uvicorn, and bundled Web UI. Use strict mode when optional warnings should fail an installation check:

```bash
leaf doctor --strict
```

## Validate inputs before a run

```bash
leaf validate ./compounds.csv ./raw
```

This checks the compound-list schema and confirms that the data path contains supported inputs. Add `--strict` to treat warnings as failures:

```bash
leaf validate ./compounds.csv ./raw --strict
```

## Start a new run folder

```bash
leaf init ./leaf-run
```

The directory contains:

- `raw/`
- `results/`
- `metabolites.csv`
- `tracing-labels.json`
- `README.md`

Existing starter files are preserved unless `--force` is supplied.

## Inspect saved results

```bash
leaf inspect ./results/example.msd
leaf inspect ./results/example.usd
```

The summary reports the archive type, dimensions, result tables, quality information, and available MS² or annotation data. Acquisition files can also be inspected when SEED supports the format.

## Update LEAF

Preview the release source and selector:

```bash
leaf update --dry-run
```

Install the latest compatible release:

```bash
leaf update
```

Use a specific local wheel or pin a tag when required:

```bash
leaf update --package ./downloaded-leaf-wheel.whl
leaf update --github-release v0.8.0
```

| Option | Effect |
|---|---|
| `--dry-run` | Show the update source and release selector without installing. With `--package`, also print the concrete install command. |
| `--package PATH_OR_URL` | Install this wheel, URL, or package specifier instead of resolving a release. |
| `--github-release TAG` | Use `latest` or an exact tag. |
| `--github-repo OWNER/NAME` | Resolve releases from another repository. |
| `--github-token TOKEN` | Authenticate for a private release. Environment variables are also supported. |
| `--force-reinstall` | Reinstall when the selected version already matches. |

## Next

→ [`leaf targeted`](/scripting/cli/targeted)
