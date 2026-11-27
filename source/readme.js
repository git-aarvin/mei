import { times } from "./index.js";
const base = `https://git-aarvin.github.io/mei/`;
const names = { cost: `relative cost`, tokens: `relative token usage` };
const value = (model, metric) => times(model[metric]);
const join = items => items.join(`; `);
const scatter = (list, metric) =>
	`Scatter plot of capability score (vertical axis) against ${names[metric]} (horizontal axis, logarithmic, lower to the right) for ${list.length} models, from highest to lowest capability, as name, score, ${metric === `cost` ? `cost` : `tokens`}: ${join([...list].sort((first, second) => first.rank - second.rank).map(model => `${model.short}, ${model.score.toFixed(1)}, ${value(model, metric)}`))}.`;
const figure = (label, path, alt) => `**${label}:**\n\n[![${alt}](${base}${path})](${base}${path})`;
export const readme = list => [
	`Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical capability on engineering tasks.`,
	`---`,
	figure(`Capability versus cost`, `scatter/cost.svg`, scatter(list, `cost`)),
	figure(`Capability versus tokens`, `scatter/tokens.svg`, scatter(list, `tokens`)),
	`---`,
	`Each benchmark's scores are standardized, then every model's capability is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).\n\nModels are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.`,
	`---`,
	`_Calculated from data attributed to [Abundant](https://www.abundant.ai), [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org), [Mercor](https://www.mercor.com), [Proximal](https://www.proximal.ai), [Ramp Labs](https://labs.ramp.com), [Scale Labs](https://labs.scale.com), [Specific Labs](https://withspecific.com) and [Vals AI](https://vals.ai)._`,
].join(`\n\n`) + `\n`;
