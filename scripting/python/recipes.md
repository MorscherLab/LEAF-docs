# Python Recipes

These examples use the LEAF 0.8 public surface. Pin the release wheel used for a reproducible analysis.

## Run a targeted analysis

`Targeted` exposes the same front-panel controls as `leaf targeted`:

```python
from leaf import Targeted

samples = Targeted(
    polarity="neg",
    ppm=5,
    engine="cwt",
    rt_window=0.3,
).run(
    "./samples",
    "./compounds.csv",
    output="./outputs",
)
```

`output=None` keeps the result in memory. Supplying a directory writes the same archive and tables as the CLI.

## Use a generated TOML config

Generate the file with `leaf targeted --init-config targeted.toml`, then load it:

```python
from leaf import Targeted

run = Targeted.from_toml("targeted.toml", ms2=False)
run.config.scoring.snr_threshold = 5
samples = run.run("./samples", "./compounds.csv", output="./outputs")
```

The `config` property is typed and is validated again when `run()` starts.

## Step-wise extraction and peak picking

```python
from leaf.analyzer import PeakPicker, TargetedExtractor

extractor = TargetedExtractor(
    file_path="./samples",
    metabolite_list_path="./compounds.csv",
    organize_name=True,
    skip_blank=True,
)

samples = extractor.extract(
    polarity="NEG",
    tolerance=5,
    extract_ms2=True,
)

picker = PeakPicker(samples, intensity_threshold=1e5)
quantification = picker.pick(
    method="cwt",
    rt_window=0.3,
    quantify_method="apex_mean",
    rt_mode="reference_guided",
)

print(quantification.head())
samples.save("analysis.msd")
```

## Reopen and score a result

```python
from leaf.analyzer import TargetedExperiment, score_experiment
from leaf.analyzer.score import ScoringConfig

samples = TargetedExperiment.load("analysis.msd")
result = score_experiment(samples, ScoringConfig())

print(result)
samples.save("analysis-scored.msd")
```

## Tracing

The high-level run object uses the same typed config as the CLI:

```python
from leaf import Targeted

run = Targeted.from_toml("tracing.toml")
run.config.extraction.tracing = {
    "M+1": 1.003355,
    "M+2": 2.006710,
}
run.config.result.correction.enabled = True
run.config.result.correction.tracer = ["13C:0.99"]

samples = run.run("./samples", "./compounds.csv", output="./outputs")
```

See [Stable-isotope tracing](/workflow/tracing) and [Run configuration](/scripting/cli/configuration).

## Next

→ [LEAF developer documentation](https://github.com/MorscherLab/LEAF/tree/main/docs/leaf/api)
