import { times } from "./index.js";
const base = `https://git-aarvin.github.io/mei/`;
const names = { index: `performance score`, cost: `relative cost`, tokens: `relative token usage` };
const field = { index: `score`, cost: `cost`, tokens: `tokens` };
const value = (model, metric) => metric === `index` ? model.score.toFixed(1) : times(model[field[metric]]);
const join = items => items.join(`; `);
const bar = (list, metric) => {
	const rows = [...list].sort((first, second) => metric === `index` ? second.score - first.score : first[field[metric]] - second[field[metric]]);
	const order = metric === `index` ? `highest to lowest` : `lowest to highest`;
	const axis = metric === `index` ? `` : ` The horizontal axis is logarithmic.`;
	return `Horizontal bar chart of ${names[metric]} for ${list.length} models, from top to bottom ${order}: ${join(rows.map(model => `${model.short} ${value(model, metric)}`))}.${axis}`;
};
const scatter = (list, metric) =>
	`Scatter plot of performance score (vertical axis) against ${names[metric]} (horizontal axis, logarithmic, lower to the right) for ${list.length} models, from highest to lowest performance, as name, score, ${metric === `cost` ? `cost` : `tokens`}: ${join([...list].sort((first, second) => first.rank - second.rank).map(model => `${model.short}, ${model.score.toFixed(1)}, ${value(model, metric)}`))}.`;
const figure = (label, path, alt) => `**${label}:**\n\n[![${alt}](${base}${path})](${base}${path})`;
export const readme = list => [
	`Mei&mdash;or, the **M**odels **E**ngineering **I**ndex&mdash;calculates language models' practical performance on engineering tasks.`,
	`---`,
	`Each benchmark's scores are standardised, then every model's index is estimated by fitting a model effect and a benchmark effect together, so a model isn't rewarded for sitting only on easier benchmarks or penalised for missing some. The result is rescaled so the models average 50 with a standard deviation of 10. Cost and token use are fitted the same way on a log scale and shown relative to the typical model (1×).\n\n**This index is far from perfect, and work is underway to improve it.** Models are tested on different subsets of benchmarks, so some scores rest on far less evidence than others, and there are no error bars, so small gaps are not meaningful. Scores are relative to the models listed, so adding or removing models shifts them. Benchmarks are weighted equally regardless of size or reliability. Cost is the reported cost of each benchmark run, so it reflects prices at the time and each benchmark's setup, not what a model costs on your workload. Results are reproduced as published, not independently verified, and may be affected by contamination or tuning to the benchmarks. Benchmarks are only a proxy for real engineering work.`,
	`---`,
	figure(`Performance`, `bar/index.svg`, bar(list, `index`)),
	figure(`Cost`, `bar/cost.svg`, bar(list, `cost`)),
	figure(`Tokens`, `bar/tokens.svg`, bar(list, `tokens`)),
	figure(`Performance versus cost`, `scatter/cost.svg`, scatter(list, `cost`)),
	figure(`Performance versus tokens`, `scatter/tokens.svg`, scatter(list, `tokens`)),
	`---`,
	`_Calculated from data attributed to [Cognition](https://cognition.ai), [Cursor](https://cursor.com), the [Laude Institute](https://laude.org) and [Vals AI](https://vals.ai)._`,
].join(`\n\n`) + `\n`;
