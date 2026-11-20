Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 24 models, from top to bottom highest to lowest: 4 Neon 68.4; 6.2 Astra 67.1; Fable 5.2 66.7; Opus 5.5 61.5; 6.2 Sol 60.6; 4 Carbon 59.1; Sonnet 5.5 58.8; 4 Hydrogen 56.0; 4-Max 51.9; 6.1 Terra 51.7; Wonder 49.7; K3.1 Pro 49.4; Wonder Full 49.3; V4.1 Flash 45.9; Ember 44.4; Haiku 5.5 44.3; Grok 4.7 43.6; Hy4 42.8; GLM 5.3 42.0; Inkling 2 Small 39.3; V2.6-Pro 39.1; M3.1 Flash 37.1; 6 Luna 35.9; Large 4 35.7.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 24 models, from top to bottom lowest to highest: Ember 0.061×; 6 Luna 0.064×; V2.6-Pro 0.14×; V4.1 Flash 0.15×; M3.1 Flash 0.26×; Hy4 0.48×; Inkling 2 Small 0.53×; Haiku 5.5 0.53×; 6.2 Sol 0.54×; 6.1 Terra 0.8×; Large 4 1×; K3.1 Pro 1.4×; 4 Hydrogen 1.5×; 4 Neon 2.1×; Wonder Full 2.1×; 6.2 Astra 2.1×; GLM 5.3 2.3×; Wonder 2.3×; 4 Carbon 2.4×; Sonnet 5.5 3.2×; Grok 4.7 4.1×; Opus 5.5 4.2×; Fable 5.2 5.8×; 4-Max 9.5×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 24 models, from top to bottom lowest to highest: 6.2 Sol 0.3×; 6.2 Astra 0.37×; 6 Luna 0.52×; K3.1 Pro 0.62×; Wonder Full 0.69×; Ember 0.73×; Grok 4.7 0.77×; Wonder 0.79×; 4 Neon 0.8×; V2.6-Pro 0.85×; 4 Carbon 0.91×; Large 4 0.93×; Hy4 1×; 4 Hydrogen 1×; 6.1 Terra 1.1×; 4-Max 1.2×; V4.1 Flash 1.3×; Fable 5.2 1.4×; GLM 5.3 1.4×; Opus 5.5 1.5×; Haiku 5.5 1.6×; M3.1 Flash 2.4×; Sonnet 5.5 2.6×; Inkling 2 Small 2.7×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 24 models, from highest to lowest performance, as name, score, cost: 4 Neon, 68.4, 2.1×; 6.2 Astra, 67.1, 2.1×; Fable 5.2, 66.7, 5.8×; Opus 5.5, 61.5, 4.2×; 6.2 Sol, 60.6, 0.54×; 4 Carbon, 59.1, 2.4×; Sonnet 5.5, 58.8, 3.2×; 4 Hydrogen, 56.0, 1.5×; 4-Max, 51.9, 9.5×; 6.1 Terra, 51.7, 0.8×; Wonder, 49.7, 2.3×; K3.1 Pro, 49.4, 1.4×; Wonder Full, 49.3, 2.1×; V4.1 Flash, 45.9, 0.15×; Ember, 44.4, 0.061×; Haiku 5.5, 44.3, 0.53×; Grok 4.7, 43.6, 4.1×; Hy4, 42.8, 0.48×; GLM 5.3, 42.0, 2.3×; Inkling 2 Small, 39.3, 0.53×; V2.6-Pro, 39.1, 0.14×; M3.1 Flash, 37.1, 0.26×; 6 Luna, 35.9, 0.064×; Large 4, 35.7, 1×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 24 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 68.4, 0.8×; 6.2 Astra, 67.1, 0.37×; Fable 5.2, 66.7, 1.4×; Opus 5.5, 61.5, 1.5×; 6.2 Sol, 60.6, 0.3×; 4 Carbon, 59.1, 0.91×; Sonnet 5.5, 58.8, 2.6×; 4 Hydrogen, 56.0, 1×; 4-Max, 51.9, 1.2×; 6.1 Terra, 51.7, 1.1×; Wonder, 49.7, 0.79×; K3.1 Pro, 49.4, 0.62×; Wonder Full, 49.3, 0.69×; V4.1 Flash, 45.9, 1.3×; Ember, 44.4, 0.73×; Haiku 5.5, 44.3, 1.6×; Grok 4.7, 43.6, 0.77×; Hy4, 42.8, 1×; GLM 5.3, 42.0, 1.4×; Inkling 2 Small, 39.3, 2.7×; V2.6-Pro, 39.1, 0.85×; M3.1 Flash, 37.1, 2.4×; 6 Luna, 35.9, 0.52×; Large 4, 35.7, 0.93×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
