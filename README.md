Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.

---

Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).

Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.

---

**Performance:**

[![Horizontal bar chart of performance score for 25 models, from top to bottom highest to lowest: 4 Neon 68.3; 6.2 Astra 67.3; Fable 5.2 66.6; Opus 5.5 61.5; 6.2 Sol 60.9; 4 Carbon 59.6; Sonnet 5.5 58.8; 4 Hydrogen 56.5; 4-Max 52.5; 6.1 Terra 52.4; Wonder 50.4; K3.1 Pro 50.0; Wonder Full 49.7; V4.1 Flash 46.7; Haiku 5.5 45.6; Ember 45.2; Grok 4.7 44.7; Hy4 43.9; GLM 5.3 43.1; V2.6-Pro 41.1; Inkling 2 Small 40.1; M3.1 Flash 38.4; 6 Luna 37.4; Large 4 36.8; Inkling 2 Mini 32.6.](https://git-aarvin.github.io/mei/bar/index.svg)](https://git-aarvin.github.io/mei/bar/index.svg)

**Cost:**

[![Horizontal bar chart of relative cost for 25 models, from top to bottom lowest to highest: Ember 0.062×; 6 Luna 0.065×; V2.6-Pro 0.15×; V4.1 Flash 0.15×; M3.1 Flash 0.27×; Hy4 0.49×; Haiku 5.5 0.53×; Inkling 2 Small 0.54×; 6.2 Sol 0.55×; Inkling 2 Mini 0.75×; 6.1 Terra 0.81×; Large 4 1.1×; K3.1 Pro 1.4×; 4 Hydrogen 1.6×; Wonder Full 2.1×; 4 Neon 2.1×; 6.2 Astra 2.1×; GLM 5.3 2.3×; Wonder 2.3×; 4 Carbon 2.5×; Sonnet 5.5 3.2×; Grok 4.7 4.2×; Opus 5.5 4.2×; Fable 5.2 5.8×; 4-Max 9.8×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/cost.svg)](https://git-aarvin.github.io/mei/bar/cost.svg)

**Tokens:**

[![Horizontal bar chart of relative token usage for 25 models, from top to bottom lowest to highest: 6.2 Sol 0.28×; 6.2 Astra 0.35×; 6 Luna 0.49×; K3.1 Pro 0.58×; Wonder Full 0.65×; Ember 0.69×; Grok 4.7 0.72×; Wonder 0.75×; 4 Neon 0.76×; V2.6-Pro 0.8×; 4 Carbon 0.86×; Large 4 0.88×; Hy4 0.96×; 4 Hydrogen 0.98×; 6.1 Terra 1.1×; 4-Max 1.2×; V4.1 Flash 1.2×; Fable 5.2 1.3×; GLM 5.3 1.3×; Opus 5.5 1.5×; Haiku 5.5 1.6×; M3.1 Flash 2.3×; Sonnet 5.5 2.5×; Inkling 2 Small 2.6×; Inkling 2 Mini 3.8×. The horizontal axis is logarithmic.](https://git-aarvin.github.io/mei/bar/tokens.svg)](https://git-aarvin.github.io/mei/bar/tokens.svg)

**Performance versus cost:**

[![Scatter plot of performance score (vertical axis) against relative cost (horizontal axis, logarithmic, lower to the right) for 25 models, from highest to lowest performance, as name, score, cost: 4 Neon, 68.3, 2.1×; 6.2 Astra, 67.3, 2.1×; Fable 5.2, 66.6, 5.8×; Opus 5.5, 61.5, 4.2×; 6.2 Sol, 60.9, 0.55×; 4 Carbon, 59.6, 2.5×; Sonnet 5.5, 58.8, 3.2×; 4 Hydrogen, 56.5, 1.6×; 4-Max, 52.5, 9.8×; 6.1 Terra, 52.4, 0.81×; Wonder, 50.4, 2.3×; K3.1 Pro, 50.0, 1.4×; Wonder Full, 49.7, 2.1×; V4.1 Flash, 46.7, 0.15×; Haiku 5.5, 45.6, 0.53×; Ember, 45.2, 0.062×; Grok 4.7, 44.7, 4.2×; Hy4, 43.9, 0.49×; GLM 5.3, 43.1, 2.3×; V2.6-Pro, 41.1, 0.15×; Inkling 2 Small, 40.1, 0.54×; M3.1 Flash, 38.4, 0.27×; 6 Luna, 37.4, 0.065×; Large 4, 36.8, 1.1×; Inkling 2 Mini, 32.6, 0.75×.](https://git-aarvin.github.io/mei/scatter/cost.svg)](https://git-aarvin.github.io/mei/scatter/cost.svg)

**Performance versus tokens:**

[![Scatter plot of performance score (vertical axis) against relative token usage (horizontal axis, logarithmic, lower to the right) for 25 models, from highest to lowest performance, as name, score, tokens: 4 Neon, 68.3, 0.76×; 6.2 Astra, 67.3, 0.35×; Fable 5.2, 66.6, 1.3×; Opus 5.5, 61.5, 1.5×; 6.2 Sol, 60.9, 0.28×; 4 Carbon, 59.6, 0.86×; Sonnet 5.5, 58.8, 2.5×; 4 Hydrogen, 56.5, 0.98×; 4-Max, 52.5, 1.2×; 6.1 Terra, 52.4, 1.1×; Wonder, 50.4, 0.75×; K3.1 Pro, 50.0, 0.58×; Wonder Full, 49.7, 0.65×; V4.1 Flash, 46.7, 1.2×; Haiku 5.5, 45.6, 1.6×; Ember, 45.2, 0.69×; Grok 4.7, 44.7, 0.72×; Hy4, 43.9, 0.96×; GLM 5.3, 43.1, 1.3×; V2.6-Pro, 41.1, 0.8×; Inkling 2 Small, 40.1, 2.6×; M3.1 Flash, 38.4, 2.3×; 6 Luna, 37.4, 0.49×; Large 4, 36.8, 0.88×; Inkling 2 Mini, 32.6, 3.8×.](https://git-aarvin.github.io/mei/scatter/tokens.svg)](https://git-aarvin.github.io/mei/scatter/tokens.svg)

---

_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._
