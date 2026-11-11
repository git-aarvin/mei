export const FILES = [
	["cursor.jsonc", "CursorBench"],
	["frontier.jsonc", "FrontierCode"],
	["migration.jsonc", "Code Migration"],
	["informatics.jsonc", "IOI"],
	["program.jsonc", "ProgramBench"],
	["terminal.jsonc", "Terminal-Bench"],
	["brownfield.jsonc", "Vibe Code"],
	["greenfield.jsonc", "Vibe Code"],
];
export const BENCHMARKS = [...new Set(FILES.map(([, family]) => family))];
export const BASES = [
	"../source/json/",
	"https://raw.githubusercontent.com/git-aarvin/mei/refs/heads/main/source/json/",
];
export const COLORS = {
	Anthropic: "#c66e53",
	OpenAI: "#40947d",
	Google: "#c28b3f",
	xAI: "#6659b5",
	DeepSeek: "#4e70a8",
	Meta: "#35949c",
	Moonshot: "#6b7785",
	"Z.ai": "#a8508f",
	Xiaomi: "#dc7a30",
	Reflection: "#7f9a3c",
};
export const SHORT = {
	"Claude Opus 5.5": "Opus 5.5",
	"Claude Fable 5.2": "Fable 5.2",
	"Claude Sonnet 5.5": "Sonnet 5.5",
	"Claude Haiku 5.5": "Haiku 5.5",
	"Gemini Carbon 4": "4 Carbon",
	"Gemini Argon 4": "4 Argon",
	"Flash V4.1 1017": "V4.1 Flash",
	"GPT Astra 6": "6 Astra",
	"GPT Sol 6.1": "6.1 Sol",
	"GPT Luna 6": "6 Luna",
	"GLM Flash 5.3": "5.3 Flash",
	"Kimi Pro K3.1": "K3.1 Pro",
	"MiMo Flash V2.6": "V2.6-Flash",
	"MiMo Pro V2.6": "V2.6-Pro",
};
export const DEFAULT_DIR = { rank: 1, model: 1, y: -1, cost: 1, tokens: 1 };

export const strip = text =>
	text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/,(\s*[}\]])/g, "$1");
export const times = value => `${+value.toPrecision(2)}×`;
export const colorOf = author => COLORS[author] ?? "#999";
export const shade = (hex, factor) => {
	const value = parseInt(hex.slice(1), 16);
	return `#${[value >> 16, (value >> 8) & 255, value & 255]
		.map(channel =>
			Math.max(0, Math.min(255, Math.round(channel * (1 + factor))))
				.toString(16).padStart(2, "0")
		)
		.join("")}`;
};
export const mean = values => {
	const finite = values.filter(Number.isFinite);
	return finite.reduce((a, b) => a + b, 0) / finite.length;
};
export const std = values => {
	const m = mean(values);
	return Math.sqrt(mean(values.map(value => (value - m) ** 2)));
};
export const median = values => {
	const sorted = [...values].sort((a, b) => a - b);
	const mid = sorted.length >> 1;
	return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};
export function modelEffects(matrix) {
	let model = matrix.map(() => 0);
	let benchmark = matrix[0].map(() => 0);
	for (let i = 0; i < 500; i++) {
		benchmark = benchmark.map((_, j) => mean(matrix.map((row, k) => row[j] - model[k])));
		model = matrix.map(row => mean(row.map((value, j) => value - benchmark[j])));
	}
	return benchmark.map(value => value - mean(benchmark));
}
export const nameOf = row =>
	row.label ?? `${row.model} ${row.family} ${row.author === "Meta" ? "" : row.series}`
		.replace(/\s+/g, " ").trim();
export const shortName = point => {
	const name = SHORT[point.name] ?? point.name;
	return name.replace(/\b(?:Muse|1017)\b/gi, "").replace(/\s+/g, " ").trim();
};
export async function get(file) {
	for (const base of BASES) {
		try {
			const response = await fetch(base + file);
			if (!response.ok) continue;
			return JSON.parse(strip(await response.text()));
		} catch {
		}
	}
	throw new Error(`Could not load ${file}`);
}
export const load = () =>
	Promise.all(FILES.map(async ([file, family]) => ({ family, rows: await get(file) })));
/** One entry per model: `y` is the index (50 = average), cost/tokens are relative (1 = typical). */
export function computeModels(data) {
	const cells = new Map();
	const author = new Map();
	for (const { family, rows } of data) {
		const scoreMean = mean(rows.map(row => row.pass));
		const scoreStd = std(rows.map(row => row.pass));
		const costMedian = median(rows.map(row => Math.log10(row.cost)));
		const tokenMedian = median(rows.map(row => Math.log10(row.tokens)));
		for (const row of rows) {
			const name = nameOf(row);
			const key = `${family}\0${name}`;
			if (!cells.has(key)) cells.set(key, { perf: [], cost: [], tokens: [] });
			const cell = cells.get(key);
			author.set(name, row.author);
			cell.perf.push((row.pass - scoreMean) / scoreStd);
			cell.cost.push(Math.log10(row.cost) - costMedian);
			cell.tokens.push(Math.log10(row.tokens) - tokenMedian);
		}
	}
	const names = [...author.keys()].sort();
	const fit = field => modelEffects(BENCHMARKS.map(family =>
		names.map(name => {
			const cell = cells.get(`${family}\0${name}`);
			return cell ? mean(cell[field]) : NaN;
		})
	));
	const perf = fit("perf");
	const cost = fit("cost");
	const tokens = fit("tokens");
	const perfStd = std(perf);
	const bench = names.map(name => {
		const scores = {};
		for (const family of BENCHMARKS) {
			const cell = cells.get(`${family}\0${name}`);
			if (cell) scores[family] = mean(cell.perf);
		}
		return scores;
	});
	return names.map((name, i) => {
		const model = {
			name,
			author: author.get(name),
			y: 50 + 10 * perf[i] / perfStd,
			cost: 10 ** cost[i],
			tokens: 10 ** tokens[i],
			bench: bench[i],
		};
		model.short = shortName(model);
		return model;
	}).sort((a, b) => b.y - a.y).map((model, i) => ({ ...model, rank: i + 1 }));
}
