Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 26 models, from top to bottom highest to lowest: 4 Neon 67.9; 6.2 Astra 67.0; Fable 5.2 66.5; Opus 5.5 61.6; 6.2 Sol 60.9; 4 Carbon 59.7; Sonnet 5.5 59.0; 4 Hydrogen 56.8; 4-Max 53.1; 6.1 Terra 53.1; Wonder 51.2; K3.1 Pro 50.7; Wonder Full 50.5; V4.1 Flash 47.6; Haiku 5.5 46.6; Ember 46.4; Grok 4.7 45.7; Hy4 45.2; GLM 5.3 44.2; V2.6-Pro 42.3; Inkling 2 Small 41.5; M3.1 Flash 40.3; 6 Luna 38.9; Large 4 38.5; Inkling 2 Mini 34.3; Hy Flash 4 30.3.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 26 models, from top to bottom lowest to highest: Hy Flash 4 0.033×; Ember 0.071×; 6 Luna 0.074×; V2.6-Pro 0.17×; V4.1 Flash 0.17×; M3.1 Flash 0.3×; Hy4 0.56×; Haiku 5.5 0.61×; Inkling 2 Small 0.62×; 6.2 Sol 0.63×; Inkling 2 Mini 0.86×; 6.1 Terra 0.93×; Large 4 1.2×; K3.1 Pro 1.6×; 4 Hydrogen 1.8×; Wonder Full 2.4×; 4 Neon 2.4×; 6.2 Astra 2.5×; GLM 5.3 2.6×; Wonder 2.7×; 4 Carbon 2.8×; Sonnet 5.5 3.7×; Grok 4.7 4.8×; Opus 5.5 4.9×; Fable 5.2 6.7×; 4-Max 11×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 26 models, from top to bottom lowest to highest: 6.2 Sol 0.28×; 6.2 Astra 0.36×; 6 Luna 0.49×; K3.1 Pro 0.58×; Wonder Full 0.66×; Ember 0.7×; Hy Flash 4 0.72×; Grok 4.7 0.73×; Wonder 0.76×; 4 Neon 0.77×; V2.6-Pro 0.81×; 4 Carbon 0.87×; Large 4 0.89×; Hy4 0.98×; 4 Hydrogen 1×; 6.1 Terra 1.1×; 4-Max 1.2×; V4.1 Flash 1.2×; Fable 5.2 1.3×; GLM 5.3 1.4×; Opus 5.5 1.5×; Haiku 5.5 1.6×; M3.1 Flash 2.4×; Sonnet 5.5 2.5×; Inkling 2 Small 2.6×; Inkling 2 Mini 3.9×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 26 models, from highest to lowest performance, as name, score, cost: 4 Neon, 67.9, 2.4×; 6.2 Astra, 67.0, 2.5×; Fable 5.2, 66.5, 6.7×; Opus 5.5, 61.6, 4.9×; 6.2 Sol, 60.9, 0.63×; 4 Carbon, 59.7, 2.8×; Sonnet 5.5, 59.0, 3.7×; 4 Hydrogen, 56.8, 1.8×; 4-Max, 53.1, 11×; 6.1 Terra, 53.1, 0.93×; Wonder, 51.2, 2.7×; K3.1 Pro, 50.7, 1.6×; Wonder Full, 50.5, 2.4×; V4.1 Flash, 47.6, 0.17×; Haiku 5.5, 46.6, 0.61×; Ember, 46.4, 0.071×; Grok 4.7, 45.7, 4.8×; Hy4, 45.2, 0.56×; GLM 5.3, 44.2, 2.6×; V2.6-Pro, 42.3, 0.17×; Inkling 2 Small, 41.5, 0.62×; M3.1 Flash, 40.3, 0.3×; 6 Luna, 38.9, 0.074×; Large 4, 38.5, 1.2×; Inkling 2 Mini, 34.3, 0.86×; Hy Flash 4, 30.3, 0.033×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 26 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 67.9, 0.77×; 6.2 Astra, 67.0, 0.36×; Fable 5.2, 66.5, 1.3×; Opus 5.5, 61.6, 1.5×; 6.2 Sol, 60.9, 0.28×; 4 Carbon, 59.7, 0.87×; Sonnet 5.5, 59.0, 2.5×; 4 Hydrogen, 56.8, 1×; 4-Max, 53.1, 1.2×; 6.1 Terra, 53.1, 1.1×; Wonder, 51.2, 0.76×; K3.1 Pro, 50.7, 0.58×; Wonder Full, 50.5, 0.66×; V4.1 Flash, 47.6, 1.2×; Haiku 5.5, 46.6, 1.6×; Ember, 46.4, 0.7×; Grok 4.7, 45.7, 0.73×; Hy4, 45.2, 0.98×; GLM 5.3, 44.2, 1.4×; V2.6-Pro, 42.3, 0.81×; Inkling 2 Small, 41.5, 2.6×; M3.1 Flash, 40.3, 2.4×; 6 Luna, 38.9, 0.49×; Large 4, 38.5, 0.89×; Inkling 2 Mini, 34.3, 3.9×; Hy Flash 4, 30.3, 0.72×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
