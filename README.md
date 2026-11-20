Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 20 models, from top to bottom highest to lowest: 4 Neon 67.4; Fable 5.2 65.9; 6.2 Astra 65.4; Opus 5.5 60.3; 6.2 Sol 57.9; Sonnet 5.5 57.8; 4 Carbon 57.2; 4 Hydrogen 53.9; 4-Max 49.1; Wonder 48.1; 6.1 Terra 47.8; K3.1 Pro 47.7; Wonder Full 47.4; V4.1 Flash 43.1; Haiku 5.5 42.5; Grok 4.7 40.9; GLM 5.3 39.9; Hy4 36.9; V2.6-Pro 36.6; 6 Luna 34.3.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 20 models, from top to bottom lowest to highest: 6 Luna 0.053×; V4.1 Flash 0.11×; V2.6-Pro 0.12×; Hy4 0.32×; 6.2 Sol 0.36×; Haiku 5.5 0.45×; 6.1 Terra 0.82×; K3.1 Pro 1.1×; 4 Hydrogen 1.1×; 6.2 Astra 1.5×; 4 Neon 1.6×; Wonder 1.7×; Wonder Full 1.7×; 4 Carbon 1.8×; GLM 5.3 1.9×; Sonnet 5.5 2.9×; Opus 5.5 3.5×; Grok 4.7 3.6×; Fable 5.2 4.8×; 4-Max 7.1×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 20 models, from top to bottom lowest to highest: 6.2 Sol 0.3×; 6.2 Astra 0.4×; 6 Luna 0.53×; K3.1 Pro 0.7×; Wonder Full 0.74×; 4 Carbon 0.81×; 4 Neon 0.81×; Grok 4.7 0.81×; Wonder 0.86×; V2.6-Pro 0.93×; 4 Hydrogen 0.97×; Hy4 1.1×; 4-Max 1.2×; V4.1 Flash 1.4×; GLM 5.3 1.4×; Fable 5.2 1.5×; 6.1 Terra 1.7×; Opus 5.5 1.7×; Haiku 5.5 1.8×; Sonnet 5.5 3.4×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 20 models, from highest to lowest performance, as name, score, cost: 4 Neon, 67.4, 1.6×; Fable 5.2, 65.9, 4.8×; 6.2 Astra, 65.4, 1.5×; Opus 5.5, 60.3, 3.5×; 6.2 Sol, 57.9, 0.36×; Sonnet 5.5, 57.8, 2.9×; 4 Carbon, 57.2, 1.8×; 4 Hydrogen, 53.9, 1.1×; 4-Max, 49.1, 7.1×; Wonder, 48.1, 1.7×; 6.1 Terra, 47.8, 0.82×; K3.1 Pro, 47.7, 1.1×; Wonder Full, 47.4, 1.7×; V4.1 Flash, 43.1, 0.11×; Haiku 5.5, 42.5, 0.45×; Grok 4.7, 40.9, 3.6×; GLM 5.3, 39.9, 1.9×; Hy4, 36.9, 0.32×; V2.6-Pro, 36.6, 0.12×; 6 Luna, 34.3, 0.053×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 20 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 67.4, 0.81×; Fable 5.2, 65.9, 1.5×; 6.2 Astra, 65.4, 0.4×; Opus 5.5, 60.3, 1.7×; 6.2 Sol, 57.9, 0.3×; Sonnet 5.5, 57.8, 3.4×; 4 Carbon, 57.2, 0.81×; 4 Hydrogen, 53.9, 0.97×; 4-Max, 49.1, 1.2×; Wonder, 48.1, 0.86×; 6.1 Terra, 47.8, 1.7×; K3.1 Pro, 47.7, 0.7×; Wonder Full, 47.4, 0.74×; V4.1 Flash, 43.1, 1.4×; Haiku 5.5, 42.5, 1.8×; Grok 4.7, 40.9, 0.81×; GLM 5.3, 39.9, 1.4×; Hy4, 36.9, 1.1×; V2.6-Pro, 36.6, 0.93×; 6 Luna, 34.3, 0.53×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Scale Labs](https://labs.scale.com) and [Vals AI](https://vals.ai)._
