Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 29 models, from top to bottom highest to lowest: Fable 5.2 67.2; 4 Neon 67.0; 6.2 Astra 66.0; Opus 5.5 62.8; 4 Carbon 61.6; 6.2 Sol 60.8; Sonnet 5.5 60.0; 4 Hydrogen 58.9; 6.1 Terra 55.4; 4-Max 54.8; Wonder Full 53.4; K3.1 Pro 52.4; Wonder 52.4; V4.1 Flash 50.0; Ember 48.5; Haiku 5.5 47.8; Hy4 47.4; Grok 4.7 46.8; GLM 5.3 46.0; Inkling 2 Small 43.6; V2.6-Pro 43.5; M3.1 Flash 43.3; V2.6-Flash 40.9; 6 Luna 40.6; Large 4 39.5; 5 Preview 38.1; Inkling 2 Mini 35.8; Hy4 Flash 34.8; Beam 1.0 30.9.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 29 models, from top to bottom lowest to highest: Hy4 Flash 0.025×; Ember 0.079×; 6 Luna 0.084×; V2.6-Flash 0.09×; V4.1 Flash 0.19×; V2.6-Pro 0.2×; Beam 1.0 0.26×; M3.1 Flash 0.37×; Hy4 0.6×; Haiku 5.5 0.71×; 6.2 Sol 0.75×; Inkling 2 Small 0.86×; Inkling 2 Mini 1×; 6.1 Terra 1×; 5 Preview 1.1×; Large 4 1.3×; K3.1 Pro 1.7×; 4 Hydrogen 2.2×; Wonder Full 2.6×; Wonder 3×; GLM 5.3 3×; 4 Neon 3.1×; 4 Carbon 3.5×; 6.2 Astra 3.7×; Sonnet 5.5 4.2×; Grok 4.7 5.5×; Opus 5.5 5.6×; Fable 5.2 7.7×; 4-Max 12×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 29 models, from top to bottom lowest to highest: Beam 1.0 0.27×; 6.2 Sol 0.3×; 6.2 Astra 0.4×; 6 Luna 0.5×; K3.1 Pro 0.6×; Wonder Full 0.68×; Ember 0.69×; Hy4 Flash 0.72×; Grok 4.7 0.76×; Wonder 0.78×; V2.6-Pro 0.84×; 4 Neon 0.84×; Large 4 0.89×; Hy4 0.99×; 4 Carbon 1×; 6.1 Terra 1.1×; 4 Hydrogen 1.1×; V2.6-Flash 1.1×; 4-Max 1.2×; V4.1 Flash 1.2×; Fable 5.2 1.4×; GLM 5.3 1.4×; Opus 5.5 1.5×; 5 Preview 1.6×; Haiku 5.5 1.6×; Inkling 2 Small 2.4×; Sonnet 5.5 2.4×; M3.1 Flash 2.6×; Inkling 2 Mini 4×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 29 models, from highest to lowest performance, as name, score, cost: Fable 5.2, 67.2, 7.7×; 4 Neon, 67.0, 3.1×; 6.2 Astra, 66.0, 3.7×; Opus 5.5, 62.8, 5.6×; 4 Carbon, 61.6, 3.5×; 6.2 Sol, 60.8, 0.75×; Sonnet 5.5, 60.0, 4.2×; 4 Hydrogen, 58.9, 2.2×; 6.1 Terra, 55.4, 1×; 4-Max, 54.8, 12×; Wonder Full, 53.4, 2.6×; K3.1 Pro, 52.4, 1.7×; Wonder, 52.4, 3×; V4.1 Flash, 50.0, 0.19×; Ember, 48.5, 0.079×; Haiku 5.5, 47.8, 0.71×; Hy4, 47.4, 0.6×; Grok 4.7, 46.8, 5.5×; GLM 5.3, 46.0, 3×; Inkling 2 Small, 43.6, 0.86×; V2.6-Pro, 43.5, 0.2×; M3.1 Flash, 43.3, 0.37×; V2.6-Flash, 40.9, 0.09×; 6 Luna, 40.6, 0.084×; Large 4, 39.5, 1.3×; 5 Preview, 38.1, 1.1×; Inkling 2 Mini, 35.8, 1×; Hy4 Flash, 34.8, 0.025×; Beam 1.0, 30.9, 0.26×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 29 models, from highest to lowest performance, as name, score, tokens: Fable 5.2, 67.2, 1.4×; 4 Neon, 67.0, 0.84×; 6.2 Astra, 66.0, 0.4×; Opus 5.5, 62.8, 1.5×; 4 Carbon, 61.6, 1×; 6.2 Sol, 60.8, 0.3×; Sonnet 5.5, 60.0, 2.4×; 4 Hydrogen, 58.9, 1.1×; 6.1 Terra, 55.4, 1.1×; 4-Max, 54.8, 1.2×; Wonder Full, 53.4, 0.68×; K3.1 Pro, 52.4, 0.6×; Wonder, 52.4, 0.78×; V4.1 Flash, 50.0, 1.2×; Ember, 48.5, 0.69×; Haiku 5.5, 47.8, 1.6×; Hy4, 47.4, 0.99×; Grok 4.7, 46.8, 0.76×; GLM 5.3, 46.0, 1.4×; Inkling 2 Small, 43.6, 2.4×; V2.6-Pro, 43.5, 0.84×; M3.1 Flash, 43.3, 2.6×; V2.6-Flash, 40.9, 1.1×; 6 Luna, 40.6, 0.5×; Large 4, 39.5, 0.89×; 5 Preview, 38.1, 1.6×; Inkling 2 Mini, 35.8, 4×; Hy4 Flash, 34.8, 0.72×; Beam 1.0, 30.9, 0.27×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
