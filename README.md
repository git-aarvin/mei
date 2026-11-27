Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical capability on engineering tasks.

---

**Capability versus cost:**

[![Scatter plot of capability score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 21 models, from highest to lowest capability, as name, score, cost: Fable 5.2, 67.6, 6.2×; 6.2 Astra, 65.0, 3.2×; 4 Neon, 64.2, 2.5×; Opus 5.5, 61.7, 4.4×; 6.2 Sol, 60.9, 0.63×; 4 Carbon, 58.4, 2.9×; Sonnet 5.5, 56.2, 3.1×; 4 Hydrogen, 55.6, 1.8×; 6.1 Terra, 50.7, 0.88×; K3.1 Pro, 50.7, 1.6×; Wonder Full, 50.2, 2.3×; Wonder, 48.7, 2.6×; V4.1 Flash, 44.3, 0.13×; Haiku 5.5, 43.0, 0.54×; Grok 4.7, 41.4, 4.6×; GLM 5.3, 41.3, 2.3×; Ember, 41.1, 0.15×; V2.6-Pro, 38.9, 0.14×; Inkling 2 Small, 38.6, 0.72×; 6 Luna, 36.3, 0.077×; V2.6-Flash, 35.4, 0.063×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Capability versus tokens:**

[![Scatter plot of capability score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 21 models, from highest to lowest capability, as name, score, tokens: Fable 5.2, 67.6, 1.4×; 6.2 Astra, 65.0, 0.42×; 4 Neon, 64.2, 0.9×; Opus 5.5, 61.7, 1.5×; 6.2 Sol, 60.9, 0.32×; 4 Carbon, 58.4, 1.1×; Sonnet 5.5, 56.2, 2.4×; 4 Hydrogen, 55.6, 1.1×; 6.1 Terra, 50.7, 1.1×; K3.1 Pro, 50.7, 0.75×; Wonder Full, 50.2, 0.77×; Wonder, 48.7, 0.87×; V4.1 Flash, 44.3, 1.2×; Haiku 5.5, 43.0, 1.6×; Grok 4.7, 41.4, 0.83×; GLM 5.3, 41.3, 1.4×; Ember, 41.1, 0.7×; V2.6-Pro, 38.9, 0.8×; Inkling 2 Small, 38.6, 2.9×; 6 Luna, 36.3, 0.59×; V2.6-Flash, 35.4, 1.2×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

Each benchmark's scores are standardized, then every model's capability is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

_Calculated from data attributed to [Abundant](https://www.abundant.ai), [Artificial Analysis](https://artificialanalysis.ai), [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
