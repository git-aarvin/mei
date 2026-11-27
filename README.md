Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardized, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 22 models, from top to bottom highest to lowest: Fable 5.2 66.3; 6.2 Astra 65.2; 4 Neon 63.8; Opus 5.5 61.2; 6.2 Sol 60.5; 4 Carbon 59.0; Sonnet 5.5 58.1; 4 Hydrogen 55.9; 6.1 Terra 54.3; K3.1 Pro 49.8; Wonder Full 49.7; Wonder 49.0; V4.1 Flash 47.2; Haiku 5.5 44.9; Ember 44.0; Grok 4.7 43.8; GLM 5.3 43.3; Inkling 2 Small 40.5; V2.6-Pro 39.2; 6 Luna 36.9; V2.6-Flash 36.0; Inkling 2 Mini 31.4.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 22 models, from top to bottom lowest to highest: Ember 0.067×; 6 Luna 0.071×; V2.6-Flash 0.076×; V4.1 Flash 0.16×; V2.6-Pro 0.17×; Haiku 5.5 0.6×; 6.2 Sol 0.64×; Inkling 2 Small 0.74×; Inkling 2 Mini 0.87×; 6.1 Terra 0.89×; K3.1 Pro 1.5×; 4 Hydrogen 1.9×; Wonder Full 2.2×; Wonder 2.5×; GLM 5.3 2.5×; 4 Neon 2.7×; 4 Carbon 2.9×; 6.2 Astra 3.1×; Sonnet 5.5 3.5×; Grok 4.7 4.6×; Opus 5.5 4.7×; Fable 5.2 6.5×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 22 models, from top to bottom lowest to highest: 6.2 Sol 0.3×; 6.2 Astra 0.39×; 6 Luna 0.49×; K3.1 Pro 0.59×; Wonder Full 0.67×; Ember 0.7×; Grok 4.7 0.75×; Wonder 0.76×; V2.6-Pro 0.83×; 4 Neon 0.85×; 4 Carbon 1×; 6.1 Terra 1.1×; 4 Hydrogen 1.1×; V2.6-Flash 1.1×; V4.1 Flash 1.2×; Fable 5.2 1.3×; GLM 5.3 1.4×; Opus 5.5 1.5×; Haiku 5.5 1.6×; Inkling 2 Small 2.4×; Sonnet 5.5 2.4×; Inkling 2 Mini 3.9×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 22 models, from highest to lowest performance, as name, score, cost: Fable 5.2, 66.3, 6.5×; 6.2 Astra, 65.2, 3.1×; 4 Neon, 63.8, 2.7×; Opus 5.5, 61.2, 4.7×; 6.2 Sol, 60.5, 0.64×; 4 Carbon, 59.0, 2.9×; Sonnet 5.5, 58.1, 3.5×; 4 Hydrogen, 55.9, 1.9×; 6.1 Terra, 54.3, 0.89×; K3.1 Pro, 49.8, 1.5×; Wonder Full, 49.7, 2.2×; Wonder, 49.0, 2.5×; V4.1 Flash, 47.2, 0.16×; Haiku 5.5, 44.9, 0.6×; Ember, 44.0, 0.067×; Grok 4.7, 43.8, 4.6×; GLM 5.3, 43.3, 2.5×; Inkling 2 Small, 40.5, 0.74×; V2.6-Pro, 39.2, 0.17×; 6 Luna, 36.9, 0.071×; V2.6-Flash, 36.0, 0.076×; Inkling 2 Mini, 31.4, 0.87×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 22 models, from highest to lowest performance, as name, score, tokens: Fable 5.2, 66.3, 1.3×; 6.2 Astra, 65.2, 0.39×; 4 Neon, 63.8, 0.85×; Opus 5.5, 61.2, 1.5×; 6.2 Sol, 60.5, 0.3×; 4 Carbon, 59.0, 1×; Sonnet 5.5, 58.1, 2.4×; 4 Hydrogen, 55.9, 1.1×; 6.1 Terra, 54.3, 1.1×; K3.1 Pro, 49.8, 0.59×; Wonder Full, 49.7, 0.67×; Wonder, 49.0, 0.76×; V4.1 Flash, 47.2, 1.2×; Haiku 5.5, 44.9, 1.6×; Ember, 44.0, 0.7×; Grok 4.7, 43.8, 0.75×; GLM 5.3, 43.3, 1.4×; Inkling 2 Small, 40.5, 2.4×; V2.6-Pro, 39.2, 0.83×; 6 Luna, 36.9, 0.49×; V2.6-Flash, 36.0, 1.1×; Inkling 2 Mini, 31.4, 3.9×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Abundant](https://www.abundant.ai), [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
