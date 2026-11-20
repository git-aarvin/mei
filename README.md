Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

**This index is far from perfect, and work is underway to improve it.** Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 19 models, from top to bottom highest to lowest: 4 Neon 68.5; Fable 5.2 66.0; 6.2 Astra 62.8; Opus 5.5 62.0; Sonnet 5.5 58.6; 4 Hydrogen 57.5; 6.2 Sol 56.4; 4-Max 49.2; K3.1 Pro 48.9; 6.1 Terra 47.4; Wonder Full 47.0; Wonder 46.1; V4.1 Flash 44.3; Haiku 5.5 43.5; Grok 4.7 42.1; GLM 5.3 41.1; Hy4 37.6; V2.6-Pro 35.8; 6 Luna 35.3.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 19 models, from top to bottom lowest to highest: 6 Luna 0.065×; V4.1 Flash 0.13×; V2.6-Pro 0.13×; Hy4 0.33×; 6.2 Sol 0.37×; Haiku 5.5 0.42×; 6.1 Terra 0.85×; 4 Hydrogen 1.1×; K3.1 Pro 1.2×; Wonder 1.3×; 6.2 Astra 1.4×; Wonder Full 1.5×; 4 Neon 1.7×; GLM 5.3 2.1×; Sonnet 5.5 3.2×; Grok 4.7 3.3×; Opus 5.5 3.6×; Fable 5.2 6.5×; 4-Max 7.8×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 19 models, from top to bottom lowest to highest: 6.2 Astra 0.3×; 6.2 Sol 0.31×; Wonder Full 0.5×; Wonder 0.62×; 6 Luna 0.64×; K3.1 Pro 0.74×; Grok 4.7 0.8×; 4 Neon 0.82×; V2.6-Pro 0.97×; 4 Hydrogen 0.98×; Hy4 1.1×; 4-Max 1.2×; V4.1 Flash 1.5×; GLM 5.3 1.6×; 6.1 Terra 1.7×; Haiku 5.5 1.7×; Opus 5.5 1.9×; Fable 5.2 2.1×; Sonnet 5.5 3.4×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 19 models, from highest to lowest performance, as name, score, cost: 4 Neon, 68.5, 1.7×; Fable 5.2, 66.0, 6.5×; 6.2 Astra, 62.8, 1.4×; Opus 5.5, 62.0, 3.6×; Sonnet 5.5, 58.6, 3.2×; 4 Hydrogen, 57.5, 1.1×; 6.2 Sol, 56.4, 0.37×; 4-Max, 49.2, 7.8×; K3.1 Pro, 48.9, 1.2×; 6.1 Terra, 47.4, 0.85×; Wonder Full, 47.0, 1.5×; Wonder, 46.1, 1.3×; V4.1 Flash, 44.3, 0.13×; Haiku 5.5, 43.5, 0.42×; Grok 4.7, 42.1, 3.3×; GLM 5.3, 41.1, 2.1×; Hy4, 37.6, 0.33×; V2.6-Pro, 35.8, 0.13×; 6 Luna, 35.3, 0.065×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 19 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 68.5, 0.82×; Fable 5.2, 66.0, 2.1×; 6.2 Astra, 62.8, 0.3×; Opus 5.5, 62.0, 1.9×; Sonnet 5.5, 58.6, 3.4×; 4 Hydrogen, 57.5, 0.98×; 6.2 Sol, 56.4, 0.31×; 4-Max, 49.2, 1.2×; K3.1 Pro, 48.9, 0.74×; 6.1 Terra, 47.4, 1.7×; Wonder Full, 47.0, 0.5×; Wonder, 46.1, 0.62×; V4.1 Flash, 44.3, 1.5×; Haiku 5.5, 43.5, 1.7×; Grok 4.7, 42.1, 0.8×; GLM 5.3, 41.1, 1.6×; Hy4, 37.6, 1.1×; V2.6-Pro, 35.8, 0.97×; 6 Luna, 35.3, 0.64×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org) and [Vals AI](https://vals.ai)._
