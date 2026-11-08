import { FILES } from "./config.js";
import { mean, std, median, modelEffects } from "./stats.js";
import { label } from "./labels.js";

const nameOf = r =>
	r.label ?? `${r.model} ${r.family} ${r.author === "Meta" ? "" : r.series}`.replace(/\s+/g, " ").trim();

/** One entry per model: `y` is the index (50 = average), `cost`/`tokens` are relative (1 = typical). */
export function models(data) {
	const cells = new Map(), author = new Map();
	for (const { family, rows } of data) {
		const mu = mean(rows.map(r => r.pass)), sd = std(rows.map(r => r.pass)),
			mc = median(rows.map(r => Math.log10(r.cost))),
			mt = median(rows.map(r => Math.log10(r.tokens)));
		for (const r of rows) {
			const name = nameOf(r), key = `${family}\0${name}`;
			if (!cells.has(key)) cells.set(key, { perf: [], cost: [], tokens: [] });
			const c = cells.get(key);
			author.set(name, r.author);
			c.perf.push((r.pass - mu) / sd);
			c.cost.push(Math.log10(r.cost) - mc);
			c.tokens.push(Math.log10(r.tokens) - mt);
		}
	}
	const fams = [...new Set(FILES.map(f => f[1]))], names = [...author.keys()].sort(),
		fit = f => modelEffects(fams.map(fam => names.map(m => {
			const c = cells.get(`${fam}\0${m}`);
			return c ? mean(c[f]) : NaN;
		}))),
		perf = fit("perf"), cost = fit("cost"), tokens = fit("tokens"), sd = std(perf);
	return names.map((name, i) => {
		const m = {
			name, author: author.get(name), y: 50 + 10 * perf[i] / sd,
			cost: 10 ** cost[i], tokens: 10 ** tokens[i],
			n: fams.filter(f => cells.has(`${f}\0${name}`)).length, families: fams.length,
			z: Object.fromEntries(fams.map(f => [f, cells.has(`${f}\0${name}`) ? mean(cells.get(`${f}\0${name}`).perf) : null])),
		};
		return m.short = label(m), m;
	}).sort((a, b) => b.y - a.y).map((m, i) => ({ ...m, rank: i + 1 }));
}

/** Raw per-benchmark results, one tab per source file. */
export const benchmarks = data =>
	data.map(({ file, family, rows, note }) => ({
		family,
		title: data.filter(d => d.family === family).length > 1
			? `${family} (${file.replace(".jsonc", "")})` : family,
		note,
		rows: rows.map(r => {
			const m = { name: nameOf(r), author: r.author };
			return { ...m, short: label(m), pass: r.pass, cost: r.cost, tokens: r.tokens };
		}),
	}));

/** Models that no other visible model beats on both `key` (lower is better) and score. */
export const frontier = (pts, key) =>
	pts.filter(p => !pts.some(q => q[key] <= p[key] && q.y >= p.y && (q[key] < p[key] || q.y > p.y)));
