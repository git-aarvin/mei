Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

**This index is far from perfect, and work is underway to improve it.** Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 20 models, from top to bottom highest to lowest: 4 Neon 68.1; Fable 5.2 66.3; 6.2 Astra 62.0; Opus 5.5 60.8; 4 Carbon 60.6; Sonnet 5.5 57.9; 4 Hydrogen 56.5; 6.2 Sol 56.0; 4-Max 49.2; K3.1 Pro 47.6; Wonder Full 46.6; Wonder 46.3; 6.1 Terra 44.7; V4.1 Flash 44.5; Haiku 5.5 43.4; Grok 4.7 41.7; GLM 5.3 39.5; Hy4 37.3; V2.6-Pro 36.7; 6 Luna 34.4.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 20 models, from top to bottom lowest to highest: 6 Luna 0.063×; V2.6-Pro 0.12×; V4.1 Flash 0.12×; Hy4 0.32×; 6.2 Sol 0.36×; Haiku 5.5 0.41×; 6.1 Terra 0.82×; K3.1 Pro 1.1×; 4 Hydrogen 1.1×; Wonder 1.3×; Wonder Full 1.4×; 6.2 Astra 1.5×; 4 Neon 1.6×; 4 Carbon 1.7×; GLM 5.3 2×; Sonnet 5.5 3×; Grok 4.7 3.4×; Opus 5.5 3.6×; Fable 5.2 5.9×; 4-Max 7.1×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 20 models, from top to bottom lowest to highest: 6.2 Astra 0.31×; 6.2 Sol 0.31×; Wonder Full 0.5×; Wonder 0.62×; 6 Luna 0.64×; K3.1 Pro 0.74×; Grok 4.7 0.8×; 4 Neon 0.83×; 4 Carbon 0.88×; V2.6-Pro 0.9×; 4 Hydrogen 1×; Hy4 1.2×; 4-Max 1.2×; GLM 5.3 1.5×; V4.1 Flash 1.5×; Haiku 5.5 1.7×; 6.1 Terra 1.7×; Opus 5.5 2×; Fable 5.2 2.1×; Sonnet 5.5 3.4×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 20 models, from highest to lowest performance, as name, score, cost: 4 Neon, 68.1, 1.6×; Fable 5.2, 66.3, 5.9×; 6.2 Astra, 62.0, 1.5×; Opus 5.5, 60.8, 3.6×; 4 Carbon, 60.6, 1.7×; Sonnet 5.5, 57.9, 3×; 4 Hydrogen, 56.5, 1.1×; 6.2 Sol, 56.0, 0.36×; 4-Max, 49.2, 7.1×; K3.1 Pro, 47.6, 1.1×; Wonder Full, 46.6, 1.4×; Wonder, 46.3, 1.3×; 6.1 Terra, 44.7, 0.82×; V4.1 Flash, 44.5, 0.12×; Haiku 5.5, 43.4, 0.41×; Grok 4.7, 41.7, 3.4×; GLM 5.3, 39.5, 2×; Hy4, 37.3, 0.32×; V2.6-Pro, 36.7, 0.12×; 6 Luna, 34.4, 0.063×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 20 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 68.1, 0.83×; Fable 5.2, 66.3, 2.1×; 6.2 Astra, 62.0, 0.31×; Opus 5.5, 60.8, 2×; 4 Carbon, 60.6, 0.88×; Sonnet 5.5, 57.9, 3.4×; 4 Hydrogen, 56.5, 1×; 6.2 Sol, 56.0, 0.31×; 4-Max, 49.2, 1.2×; K3.1 Pro, 47.6, 0.74×; Wonder Full, 46.6, 0.5×; Wonder, 46.3, 0.62×; 6.1 Terra, 44.7, 1.7×; V4.1 Flash, 44.5, 1.5×; Haiku 5.5, 43.4, 1.7×; Grok 4.7, 41.7, 0.8×; GLM 5.3, 39.5, 1.5×; Hy4, 37.3, 1.2×; V2.6-Pro, 36.7, 0.9×; 6 Luna, 34.4, 0.64×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org) and [Vals AI](https://vals.ai)._
