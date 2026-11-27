Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardized, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 21 models, from top to bottom highest to lowest: Fable 5.2 66.4; 6.2 Astra 65.1; 4 Neon 63.7; Opus 5.5 61.2; 6.2 Sol 60.2; 4 Carbon 58.6; Sonnet 5.5 58.0; 4 Hydrogen 55.3; 6.1 Terra 53.6; K3.1 Pro 49.1; Wonder Full 48.9; Wonder 48.0; V4.1 Flash 46.2; Haiku 5.5 43.6; Ember 42.7; Grok 4.7 42.5; GLM 5.3 42.0; Inkling 2 Small 39.4; V2.6-Pro 37.0; 6 Luna 35.2; V2.6-Flash 33.4.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 21 models, from top to bottom lowest to highest: Ember 0.067×; 6 Luna 0.071×; V2.6-Flash 0.076×; V4.1 Flash 0.16×; V2.6-Pro 0.17×; Haiku 5.5 0.6×; 6.2 Sol 0.63×; Inkling 2 Small 0.73×; 6.1 Terra 0.87×; K3.1 Pro 1.5×; 4 Hydrogen 1.8×; Wonder Full 2.2×; Wonder 2.5×; GLM 5.3 2.5×; 4 Neon 2.7×; 4 Carbon 2.9×; 6.2 Astra 3.1×; Sonnet 5.5 3.5×; Grok 4.7 4.6×; Opus 5.5 4.7×; Fable 5.2 6.4×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 21 models, from top to bottom lowest to highest: 6.2 Sol 0.32×; 6.2 Astra 0.42×; 6 Luna 0.53×; K3.1 Pro 0.63×; Wonder Full 0.72×; Ember 0.74×; Grok 4.7 0.8×; Wonder 0.82×; V2.6-Pro 0.89×; 4 Neon 0.91×; 4 Carbon 1.1×; 6.1 Terra 1.1×; 4 Hydrogen 1.2×; V2.6-Flash 1.2×; V4.1 Flash 1.3×; Fable 5.2 1.4×; GLM 5.3 1.5×; Opus 5.5 1.6×; Haiku 5.5 1.7×; Inkling 2 Small 2.5×; Sonnet 5.5 2.6×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 21 models, from highest to lowest performance, as name, score, cost: Fable 5.2, 66.4, 6.4×; 6.2 Astra, 65.1, 3.1×; 4 Neon, 63.7, 2.7×; Opus 5.5, 61.2, 4.7×; 6.2 Sol, 60.2, 0.63×; 4 Carbon, 58.6, 2.9×; Sonnet 5.5, 58.0, 3.5×; 4 Hydrogen, 55.3, 1.8×; 6.1 Terra, 53.6, 0.87×; K3.1 Pro, 49.1, 1.5×; Wonder Full, 48.9, 2.2×; Wonder, 48.0, 2.5×; V4.1 Flash, 46.2, 0.16×; Haiku 5.5, 43.6, 0.6×; Ember, 42.7, 0.067×; Grok 4.7, 42.5, 4.6×; GLM 5.3, 42.0, 2.5×; Inkling 2 Small, 39.4, 0.73×; V2.6-Pro, 37.0, 0.17×; 6 Luna, 35.2, 0.071×; V2.6-Flash, 33.4, 0.076×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 21 models, from highest to lowest performance, as name, score, tokens: Fable 5.2, 66.4, 1.4×; 6.2 Astra, 65.1, 0.42×; 4 Neon, 63.7, 0.91×; Opus 5.5, 61.2, 1.6×; 6.2 Sol, 60.2, 0.32×; 4 Carbon, 58.6, 1.1×; Sonnet 5.5, 58.0, 2.6×; 4 Hydrogen, 55.3, 1.2×; 6.1 Terra, 53.6, 1.1×; K3.1 Pro, 49.1, 0.63×; Wonder Full, 48.9, 0.72×; Wonder, 48.0, 0.82×; V4.1 Flash, 46.2, 1.3×; Haiku 5.5, 43.6, 1.7×; Ember, 42.7, 0.74×; Grok 4.7, 42.5, 0.8×; GLM 5.3, 42.0, 1.5×; Inkling 2 Small, 39.4, 2.5×; V2.6-Pro, 37.0, 0.89×; 6 Luna, 35.2, 0.53×; V2.6-Flash, 33.4, 1.2×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Abundant](https://www.abundant.ai), [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
