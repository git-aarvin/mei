Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 29 models, from top to bottom highest to lowest: 4 Neon 68.0; 6.2 Astra 67.9; Fable 5.2 67.0; Opus 5.5 62.4; 6.2 Sol 61.9; 4 Carbon 60.6; Sonnet 5.5 59.7; 4 Hydrogen 58.0; 6.1 Terra 55.0; 4-Max 54.7; Wonder 52.4; K3.1 Pro 52.0; Wonder Full 51.4; V4.1 Flash 49.8; Ember 48.5; Haiku 5.5 47.6; Hy4 47.6; Grok 4.7 46.7; GLM 5.3 45.7; V2.6-Pro 43.5; Inkling 2 Small 43.1; M3.1 Flash 43.0; Large 4 41.9; V2.6-Flash 41.0; 6 Luna 40.6; Step 5 Preview 38.1; Inkling 2 Mini 35.9; Hy4 Flash 34.9; Beam 1.0 31.1.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 29 models, from top to bottom lowest to highest: Hy4 Flash 0.036×; Ember 0.08×; 6 Luna 0.086×; V2.6-Flash 0.089×; V4.1 Flash 0.2×; V2.6-Pro 0.2×; Beam 1.0 0.27×; M3.1 Flash 0.36×; Hy4 0.63×; 6.2 Sol 0.71×; Haiku 5.5 0.71×; Inkling 2 Small 0.71×; Inkling 2 Mini 1×; 6.1 Terra 1×; Step 5 Preview 1.1×; Large 4 1.3×; K3.1 Pro 1.8×; 4 Hydrogen 2×; 4 Neon 2.7×; 6.2 Astra 2.8×; Wonder Full 2.8×; GLM 5.3 3.1×; Wonder 3.1×; 4 Carbon 3.3×; Sonnet 5.5 4.3×; Grok 4.7 5.6×; Opus 5.5 5.7×; Fable 5.2 7.8×; 4-Max 12×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 29 models, from top to bottom lowest to highest: Beam 1.0 0.27×; 6.2 Sol 0.28×; 6.2 Astra 0.38×; 6 Luna 0.51×; K3.1 Pro 0.6×; Wonder Full 0.69×; Ember 0.71×; Hy4 Flash 0.72×; Grok 4.7 0.77×; 4 Neon 0.79×; Wonder 0.79×; V2.6-Pro 0.84×; Large 4 0.9×; 4 Carbon 0.92×; Hy4 0.98×; 4 Hydrogen 1×; 6.1 Terra 1.1×; V2.6-Flash 1.1×; 4-Max 1.2×; V4.1 Flash 1.2×; Fable 5.2 1.4×; GLM 5.3 1.4×; Opus 5.5 1.5×; Step 5 Preview 1.6×; Haiku 5.5 1.6×; M3.1 Flash 2.5×; Sonnet 5.5 2.6×; Inkling 2 Small 2.7×; Inkling 2 Mini 4×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 29 models, from highest to lowest performance, as name, score, cost: 4 Neon, 68.0, 2.7×; 6.2 Astra, 67.9, 2.8×; Fable 5.2, 67.0, 7.8×; Opus 5.5, 62.4, 5.7×; 6.2 Sol, 61.9, 0.71×; 4 Carbon, 60.6, 3.3×; Sonnet 5.5, 59.7, 4.3×; 4 Hydrogen, 58.0, 2×; 6.1 Terra, 55.0, 1×; 4-Max, 54.7, 12×; Wonder, 52.4, 3.1×; K3.1 Pro, 52.0, 1.8×; Wonder Full, 51.4, 2.8×; V4.1 Flash, 49.8, 0.2×; Ember, 48.5, 0.08×; Haiku 5.5, 47.6, 0.71×; Hy4, 47.6, 0.63×; Grok 4.7, 46.7, 5.6×; GLM 5.3, 45.7, 3.1×; V2.6-Pro, 43.5, 0.2×; Inkling 2 Small, 43.1, 0.71×; M3.1 Flash, 43.0, 0.36×; Large 4, 41.9, 1.3×; V2.6-Flash, 41.0, 0.089×; 6 Luna, 40.6, 0.086×; Step 5 Preview, 38.1, 1.1×; Inkling 2 Mini, 35.9, 1×; Hy4 Flash, 34.9, 0.036×; Beam 1.0, 31.1, 0.27×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 29 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 68.0, 0.79×; 6.2 Astra, 67.9, 0.38×; Fable 5.2, 67.0, 1.4×; Opus 5.5, 62.4, 1.5×; 6.2 Sol, 61.9, 0.28×; 4 Carbon, 60.6, 0.92×; Sonnet 5.5, 59.7, 2.6×; 4 Hydrogen, 58.0, 1×; 6.1 Terra, 55.0, 1.1×; 4-Max, 54.7, 1.2×; Wonder, 52.4, 0.79×; K3.1 Pro, 52.0, 0.6×; Wonder Full, 51.4, 0.69×; V4.1 Flash, 49.8, 1.2×; Ember, 48.5, 0.71×; Haiku 5.5, 47.6, 1.6×; Hy4, 47.6, 0.98×; Grok 4.7, 46.7, 0.77×; GLM 5.3, 45.7, 1.4×; V2.6-Pro, 43.5, 0.84×; Inkling 2 Small, 43.1, 2.7×; M3.1 Flash, 43.0, 2.5×; Large 4, 41.9, 0.9×; V2.6-Flash, 41.0, 1.1×; 6 Luna, 40.6, 0.51×; Step 5 Preview, 38.1, 1.6×; Inkling 2 Mini, 35.9, 4×; Hy4 Flash, 34.9, 0.72×; Beam 1.0, 31.1, 0.27×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
