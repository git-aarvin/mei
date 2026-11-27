Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical capability on engineering tasks.

---

**Capability versus cost:**

[![Scatter plot of capability score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 21 models, from highest to lowest capability, as name, score, cost: Fable 5.2, 66.9, 6.4×; 6.2 Astra, 64.5, 3.3×; 4 Neon, 63.8, 2.5×; Opus 5.5, 61.8, 4.7×; 6.2 Sol, 60.5, 0.63×; Sonnet 5.5, 58.4, 3.4×; 4 Carbon, 58.2, 3×; 4 Hydrogen, 55.6, 1.8×; 6.1 Terra, 50.8, 0.87×; K3.1 Pro, 50.7, 1.6×; Wonder Full, 50.5, 2.4×; Wonder, 48.0, 2.7×; V4.1 Flash, 44.4, 0.14×; Haiku 5.5, 42.8, 0.54×; Ember, 42.5, 0.066×; Grok 4.7, 42.0, 4.7×; GLM 5.3, 41.6, 2.4×; V2.6-Pro, 38.8, 0.16×; Inkling 2 Small, 38.6, 0.73×; 6 Luna, 35.7, 0.079×; V2.6-Flash, 34.0, 0.071×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Capability versus tokens:**

[![Scatter plot of capability score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 21 models, from highest to lowest capability, as name, score, tokens: Fable 5.2, 66.9, 1.4×; 6.2 Astra, 64.5, 0.42×; 4 Neon, 63.8, 0.9×; Opus 5.5, 61.8, 1.5×; 6.2 Sol, 60.5, 0.32×; Sonnet 5.5, 58.4, 2.5×; 4 Carbon, 58.2, 1.1×; 4 Hydrogen, 55.6, 1.1×; 6.1 Terra, 50.8, 1.1×; K3.1 Pro, 50.7, 0.75×; Wonder Full, 50.5, 0.7×; Wonder, 48.0, 0.81×; V4.1 Flash, 44.4, 1.2×; Haiku 5.5, 42.8, 1.6×; Ember, 42.5, 0.74×; Grok 4.7, 42.0, 0.81×; GLM 5.3, 41.6, 1.5×; V2.6-Pro, 38.8, 0.85×; Inkling 2 Small, 38.6, 2.7×; 6 Luna, 35.7, 0.57×; V2.6-Flash, 34.0, 1.2×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

Each benchmark's scores are standardized, then every model's capability is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

_Calculated from data attributed to [Abundant](https://www.abundant.ai), [Artificial Analysis](https://artificialanalysis.ai), [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
