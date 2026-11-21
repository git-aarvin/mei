Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 27 models, from top to bottom highest to lowest: 4 Neon 68.2; 6.2 Astra 67.5; Fable 5.2 66.8; Opus 5.5 61.9; 6.2 Sol 61.3; 4 Carbon 60.1; Sonnet 5.5 59.3; 4 Hydrogen 57.3; 4-Max 53.5; 6.1 Terra 53.5; Wonder 51.5; K3.1 Pro 51.0; Wonder Full 50.8; V4.1 Flash 48.9; Ember 46.9; Haiku 5.5 46.9; Grok 4.7 46.0; Hy4 45.8; GLM 5.3 44.5; V2.6-Pro 42.5; Inkling 2 Small 41.8; M3.1 Flash 40.4; V2.6-Flash 39.6; 6 Luna 39.3; Large 4 39.0; Inkling 2 Mini 34.5; Hy4 Flash 31.2.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 27 models, from top to bottom lowest to highest: Hy4 Flash 0.035×; Ember 0.076×; 6 Luna 0.082×; V2.6-Flash 0.084×; V4.1 Flash 0.19×; V2.6-Pro 0.19×; M3.1 Flash 0.35×; Hy4 0.6×; Haiku 5.5 0.68×; Inkling 2 Small 0.68×; 6.2 Sol 0.69×; Inkling 2 Mini 0.96×; 6.1 Terra 1×; Large 4 1.3×; K3.1 Pro 1.7×; 4 Hydrogen 2×; 4 Neon 2.6×; Wonder Full 2.7×; 6.2 Astra 2.7×; GLM 5.3 2.9×; Wonder 3×; 4 Carbon 3.1×; Sonnet 5.5 4.1×; Grok 4.7 5.3×; Opus 5.5 5.4×; Fable 5.2 7.4×; 4-Max 12×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 27 models, from top to bottom lowest to highest: 6.2 Sol 0.28×; 6.2 Astra 0.36×; 6 Luna 0.49×; K3.1 Pro 0.57×; Wonder Full 0.66×; Ember 0.7×; Hy4 Flash 0.71×; Grok 4.7 0.73×; Wonder 0.75×; 4 Neon 0.77×; V2.6-Pro 0.82×; 4 Carbon 0.88×; Large 4 0.89×; Hy4 0.97×; 4 Hydrogen 0.99×; 6.1 Terra 1.1×; V2.6-Flash 1.1×; V4.1 Flash 1.2×; 4-Max 1.2×; Fable 5.2 1.3×; GLM 5.3 1.3×; Opus 5.5 1.5×; Haiku 5.5 1.6×; M3.1 Flash 2.5×; Sonnet 5.5 2.5×; Inkling 2 Small 2.6×; Inkling 2 Mini 3.9×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 27 models, from highest to lowest performance, as name, score, cost: 4 Neon, 68.2, 2.6×; 6.2 Astra, 67.5, 2.7×; Fable 5.2, 66.8, 7.4×; Opus 5.5, 61.9, 5.4×; 6.2 Sol, 61.3, 0.69×; 4 Carbon, 60.1, 3.1×; Sonnet 5.5, 59.3, 4.1×; 4 Hydrogen, 57.3, 2×; 4-Max, 53.5, 12×; 6.1 Terra, 53.5, 1×; Wonder, 51.5, 3×; K3.1 Pro, 51.0, 1.7×; Wonder Full, 50.8, 2.7×; V4.1 Flash, 48.9, 0.19×; Ember, 46.9, 0.076×; Haiku 5.5, 46.9, 0.68×; Grok 4.7, 46.0, 5.3×; Hy4, 45.8, 0.6×; GLM 5.3, 44.5, 2.9×; V2.6-Pro, 42.5, 0.19×; Inkling 2 Small, 41.8, 0.68×; M3.1 Flash, 40.4, 0.35×; V2.6-Flash, 39.6, 0.084×; 6 Luna, 39.3, 0.082×; Large 4, 39.0, 1.3×; Inkling 2 Mini, 34.5, 0.96×; Hy4 Flash, 31.2, 0.035×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 27 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 68.2, 0.77×; 6.2 Astra, 67.5, 0.36×; Fable 5.2, 66.8, 1.3×; Opus 5.5, 61.9, 1.5×; 6.2 Sol, 61.3, 0.28×; 4 Carbon, 60.1, 0.88×; Sonnet 5.5, 59.3, 2.5×; 4 Hydrogen, 57.3, 0.99×; 4-Max, 53.5, 1.2×; 6.1 Terra, 53.5, 1.1×; Wonder, 51.5, 0.75×; K3.1 Pro, 51.0, 0.57×; Wonder Full, 50.8, 0.66×; V4.1 Flash, 48.9, 1.2×; Ember, 46.9, 0.7×; Haiku 5.5, 46.9, 1.6×; Grok 4.7, 46.0, 0.73×; Hy4, 45.8, 0.97×; GLM 5.3, 44.5, 1.3×; V2.6-Pro, 42.5, 0.82×; Inkling 2 Small, 41.8, 2.6×; M3.1 Flash, 40.4, 2.5×; V2.6-Flash, 39.6, 1.1×; 6 Luna, 39.3, 0.49×; Large 4, 39.0, 0.89×; Inkling 2 Mini, 34.5, 3.9×; Hy4 Flash, 31.2, 0.71×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
