Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 24 models, from top to bottom highest to lowest: 4 Neon 68.7; Fable 5.2 67.2; 6.2 Astra 67.1; Opus 5.5 61.9; 6.2 Sol 59.8; Sonnet 5.5 59.6; 4 Carbon 58.4; 4 Hydrogen 55.1; 4-Max 52.0; Wonder 50.1; 6.1 Terra 49.7; Wonder Full 49.5; K3.1 Pro 49.4; Ember 46.9; V4.1 Flash 45.4; Haiku 5.5 44.6; Grok 4.7 43.2; GLM 5.3 42.2; Hy4 41.4; Inkling 2 Small 39.2; V2.6-Pro 39.1; 6 Luna 37.1; M3.1 Flash 36.8; Large 4 35.5.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 24 models, from top to bottom lowest to highest: Ember 0.044×; 6 Luna 0.067×; V4.1 Flash 0.15×; V2.6-Pro 0.15×; M3.1 Flash 0.26×; Hy4 0.4×; 6.2 Sol 0.46×; Inkling 2 Small 0.54×; Haiku 5.5 0.58×; 6.1 Terra 1×; Large 4 1×; K3.1 Pro 1.4×; 4 Hydrogen 1.5×; 6.2 Astra 1.9×; 4 Neon 2.1×; Wonder 2.2×; Wonder Full 2.2×; 4 Carbon 2.3×; GLM 5.3 2.4×; Sonnet 5.5 3.7×; Opus 5.5 4.5×; Grok 4.7 4.6×; Fable 5.2 6.2×; 4-Max 9.5×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 24 models, from top to bottom lowest to highest: 6.2 Sol 0.28×; 6.2 Astra 0.38×; 6 Luna 0.49×; Ember 0.52×; K3.1 Pro 0.66×; Wonder Full 0.7×; Grok 4.7 0.76×; 4 Carbon 0.77×; 4 Neon 0.8×; Wonder 0.81×; V2.6-Pro 0.86×; Large 4 0.93×; 4 Hydrogen 0.93×; Hy4 1.1×; 4-Max 1.2×; GLM 5.3 1.3×; V4.1 Flash 1.3×; Fable 5.2 1.4×; 6.1 Terra 1.6×; Opus 5.5 1.6×; Haiku 5.5 1.7×; M3.1 Flash 2.4×; Inkling 2 Small 2.8×; Sonnet 5.5 3.2×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 24 models, from highest to lowest performance, as name, score, cost: 4 Neon, 68.7, 2.1×; Fable 5.2, 67.2, 6.2×; 6.2 Astra, 67.1, 1.9×; Opus 5.5, 61.9, 4.5×; 6.2 Sol, 59.8, 0.46×; Sonnet 5.5, 59.6, 3.7×; 4 Carbon, 58.4, 2.3×; 4 Hydrogen, 55.1, 1.5×; 4-Max, 52.0, 9.5×; Wonder, 50.1, 2.2×; 6.1 Terra, 49.7, 1×; Wonder Full, 49.5, 2.2×; K3.1 Pro, 49.4, 1.4×; Ember, 46.9, 0.044×; V4.1 Flash, 45.4, 0.15×; Haiku 5.5, 44.6, 0.58×; Grok 4.7, 43.2, 4.6×; GLM 5.3, 42.2, 2.4×; Hy4, 41.4, 0.4×; Inkling 2 Small, 39.2, 0.54×; V2.6-Pro, 39.1, 0.15×; 6 Luna, 37.1, 0.067×; M3.1 Flash, 36.8, 0.26×; Large 4, 35.5, 1×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 24 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 68.7, 0.8×; Fable 5.2, 67.2, 1.4×; 6.2 Astra, 67.1, 0.38×; Opus 5.5, 61.9, 1.6×; 6.2 Sol, 59.8, 0.28×; Sonnet 5.5, 59.6, 3.2×; 4 Carbon, 58.4, 0.77×; 4 Hydrogen, 55.1, 0.93×; 4-Max, 52.0, 1.2×; Wonder, 50.1, 0.81×; 6.1 Terra, 49.7, 1.6×; Wonder Full, 49.5, 0.7×; K3.1 Pro, 49.4, 0.66×; Ember, 46.9, 0.52×; V4.1 Flash, 45.4, 1.3×; Haiku 5.5, 44.6, 1.7×; Grok 4.7, 43.2, 0.76×; GLM 5.3, 42.2, 1.3×; Hy4, 41.4, 1.1×; Inkling 2 Small, 39.2, 2.8×; V2.6-Pro, 39.1, 0.86×; 6 Luna, 37.1, 0.49×; M3.1 Flash, 36.8, 2.4×; Large 4, 35.5, 0.93×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Scale Labs](https://labs.scale.com) and [Vals AI](https://vals.ai)._
