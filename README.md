Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

**This index is far from perfect, and work is underway to improve it.** Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 20 models, from top to bottom highest to lowest: 4 Neon 68.0; Fable 5.2 65.3; 6.2 Astra 61.5; 4 Carbon 61.4; Opus 5.5 61.1; Sonnet 5.5 57.8; 4 Hydrogen 56.9; 6.2 Sol 55.9; 4-Max 49.0; K3.1 Pro 48.4; 6.1 Terra 47.0; Wonder Full 46.4; Wonder 45.5; V4.1 Flash 43.6; Haiku 5.5 42.9; Grok 4.7 41.3; GLM 5.3 40.4; Hy4 37.2; V2.6-Pro 35.3; 6 Luna 34.9.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 20 models, from top to bottom lowest to highest: 6 Luna 0.064×; V4.1 Flash 0.12×; V2.6-Pro 0.12×; Hy4 0.34×; 6.2 Sol 0.37×; Haiku 5.5 0.41×; 6.1 Terra 0.87×; 4 Hydrogen 1.1×; K3.1 Pro 1.1×; 6.2 Astra 1.3×; Wonder 1.3×; Wonder Full 1.5×; 4 Carbon 1.5×; 4 Neon 1.6×; GLM 5.3 2×; Grok 4.7 3.1×; Sonnet 5.5 3.1×; Opus 5.5 3.4×; Fable 5.2 6.4×; 4-Max 8.2×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 20 models, from top to bottom lowest to highest: 6.2 Astra 0.29×; 6.2 Sol 0.31×; Wonder Full 0.51×; Wonder 0.62×; 6 Luna 0.65×; K3.1 Pro 0.74×; Grok 4.7 0.8×; 4 Neon 0.83×; 4 Carbon 0.89×; V2.6-Pro 0.96×; 4 Hydrogen 1×; Hy4 1.2×; 4-Max 1.2×; V4.1 Flash 1.5×; GLM 5.3 1.5×; Haiku 5.5 1.7×; 6.1 Terra 1.7×; Opus 5.5 1.9×; Fable 5.2 2.1×; Sonnet 5.5 3.4×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 20 models, from highest to lowest performance, as name, score, cost: 4 Neon, 68.0, 1.6×; Fable 5.2, 65.3, 6.4×; 6.2 Astra, 61.5, 1.3×; 4 Carbon, 61.4, 1.5×; Opus 5.5, 61.1, 3.4×; Sonnet 5.5, 57.8, 3.1×; 4 Hydrogen, 56.9, 1.1×; 6.2 Sol, 55.9, 0.37×; 4-Max, 49.0, 8.2×; K3.1 Pro, 48.4, 1.1×; 6.1 Terra, 47.0, 0.87×; Wonder Full, 46.4, 1.5×; Wonder, 45.5, 1.3×; V4.1 Flash, 43.6, 0.12×; Haiku 5.5, 42.9, 0.41×; Grok 4.7, 41.3, 3.1×; GLM 5.3, 40.4, 2×; Hy4, 37.2, 0.34×; V2.6-Pro, 35.3, 0.12×; 6 Luna, 34.9, 0.064×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 20 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 68.0, 0.83×; Fable 5.2, 65.3, 2.1×; 6.2 Astra, 61.5, 0.29×; 4 Carbon, 61.4, 0.89×; Opus 5.5, 61.1, 1.9×; Sonnet 5.5, 57.8, 3.4×; 4 Hydrogen, 56.9, 1×; 6.2 Sol, 55.9, 0.31×; 4-Max, 49.0, 1.2×; K3.1 Pro, 48.4, 0.74×; 6.1 Terra, 47.0, 1.7×; Wonder Full, 46.4, 0.51×; Wonder, 45.5, 0.62×; V4.1 Flash, 43.6, 1.5×; Haiku 5.5, 42.9, 1.7×; Grok 4.7, 41.3, 0.8×; GLM 5.3, 40.4, 1.5×; Hy4, 37.2, 1.2×; V2.6-Pro, 35.3, 0.96×; 6 Luna, 34.9, 0.65×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org) and [Vals AI](https://vals.ai)._
