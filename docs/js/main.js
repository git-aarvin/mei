const FILES = [
	["cursor.jsonc", "CursorBench"],
	["frontier.jsonc", "FrontierCode"],
	["migration.jsonc", "Code Migration"],
	["informatics.jsonc", "IOI"],
	["program.jsonc", "ProgramBench"],
	["terminal.jsonc", "Terminal-Bench"],
	["brownfield.jsonc", "Vibe Code"],
	["greenfield.jsonc", "Vibe Code"],
];
const BASES = [
	"../source/json/",
	"https://raw.githubusercontent.com/git-aarvin/mei/refs/heads/main/source/json/",
];
const COLORS = {
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
const SHORT = {
	"Claude Opus 5.5": "Opus 5.5",
	"Claude Fable 5.1": "Fable 5.1",
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
const DEFAULT_DIR = { rank: 1, model: 1, y: -1, cost: 1, tokens: 1 };
const strip = text =>
	text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/,(\s*[}\]])/g, "$1");
const esc = value =>
	String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const times = value => `${+value.toPrecision(2)}×`;
const colorOf = author => COLORS[author] ?? "#999";
const mean = values => {
	const finite = values.filter(Number.isFinite);
	return finite.reduce((a, b) => a + b, 0) / finite.length;
};
const std = values => {
	const m = mean(values);
	return Math.sqrt(mean(values.map(value => (value - m) ** 2)));
};
const median = values => {
	const sorted = [...values].sort((a, b) => a - b);
	const mid = sorted.length >> 1;
	return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};
function modelEffects(matrix) {
	let model = matrix.map(() => 0);
	let benchmark = matrix[0].map(() => 0);
	for (let i = 0; i < 500; i++) {
		benchmark = benchmark.map((_, j) => mean(matrix.map((row, k) => row[j] - model[k])));
		model = matrix.map(row => mean(row.map((value, j) => value - benchmark[j])));
	}
	return benchmark.map(value => value - mean(benchmark));
}
const nameOf = row =>
	row.label ?? `${row.model} ${row.family} ${row.author === "Meta" ? "" : row.series}`
		.replace(/\s+/g, " ").trim();
const shortName = point => {
	const name = SHORT[point.name] ?? point.name;
	return name.replace(/\b(?:Muse|1017)\b/gi, "").replace(/\s+/g, " ").trim();
};
async function get(file) {
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
const load = () =>
	Promise.all(FILES.map(async ([file, family]) => ({ family, rows: await get(file) })));
/** One entry per model: `y` is the index (50 = average), cost/tokens are relative (1 = typical). */
function computeModels(data) {
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
	const families = [...new Set(FILES.map(([, family]) => family))];
	const names = [...author.keys()].sort();
	const fit = field => modelEffects(families.map(family =>
		names.map(name => {
			const cell = cells.get(`${family}\0${name}`);
			return cell ? mean(cell[field]) : NaN;
		})
	));
	const perf = fit("perf");
	const cost = fit("cost");
	const tokens = fit("tokens");
	const perfStd = std(perf);
	return names.map((name, i) => {
		const model = {
			name,
			author: author.get(name),
			y: 50 + 10 * perf[i] / perfStd,
			cost: 10 ** cost[i],
			tokens: 10 ** tokens[i],
		};
		model.short = shortName(model);
		return model;
	}).sort((a, b) => b.y - a.y).map((model, i) => ({ ...model, rank: i + 1 }));
}
const frontier = (points, key) =>
	points.filter(p => !points.some(q =>
		q[key] <= p[key] && q.y >= p.y && (q[key] < p[key] || q.y > p.y)
	));
function placeLabels(items, obstacles, plot, radius, fontSize) {
	const merge = fontSize * 1.35;
	const line = fontSize * 1.35;
	const taken = [];
	const out = [];
	const hit = (a, b, pad) =>
		a[0] < b[2] + pad && a[2] + pad > b[0] && a[1] < b[3] + pad && a[3] + pad > b[1];
	const width = text => text.length * fontSize * 0.68;
	const fit = (x0, w) =>
		Math.max(plot.left + 6 - x0, Math.min(0, plot.right - 6 - x0 - w));
	const penalty = box => {
		let score = box[1] < plot.top - 20 || box[3] > plot.bottom - 4 ? 4000 : 0;
		for (const [obstacle, weight] of obstacles) if (hit(box, obstacle, 2)) score += weight;
		for (const label of taken) if (hit(box, label, 5)) score += 1600;
		return score;
	};
	const root = items.map((_, i) => i);
	const find = i => root[i] === i ? i : (root[i] = find(root[i]));
	items.forEach((a, i) => {
		items.forEach((b, j) => {
			if (j > i && a.author === b.author && Math.hypot(a.px - b.px, a.py - b.py) < merge) {
				root[find(j)] = find(i);
			}
		});
	});
	items.forEach((_, n) => {
		if (out[n]) return;
		const group = items.map((_, i) => i).filter(i => find(i) === find(n));
		if (group.length > 1) {
			const order = group.sort((a, b) =>
				items[b].score - items[a].score || items[a].py - items[b].py
			);
			const cx = mean(order.map(i => items[i].px));
			const cy = mean(order.map(i => items[i].py));
			let best = { score: Infinity, placed: [] };
			const blocks = items.map(p => [p.px - radius - 3, p.py - radius - 3, p.px + radius + 3, p.py + radius + 3]);
			const dxs = [fontSize * 1.45, fontSize * 2.35, fontSize * 3.45];
			const oys = [0, -fontSize * 1.45, fontSize * 1.45, -fontSize * 2.9, fontSize * 2.9];
			for (const side of ["start", "end"]) {
				for (const dx of dxs) {
					for (const oy of oys) {
						let score = dx * 0.05 + Math.abs(oy) * 0.05;
						const placed = [];
						order.forEach((i, r) => {
							const item = items[i];
							const w = width(item.text);
							const y = cy + oy + (r - (order.length - 1) / 2) * line + fontSize * 0.3;
							const x = cx + (side === "start" ? dx : -dx);
							const x0 = side === "start" ? x : x - w;
							const shift = fit(x0, w);
							const box = [x0 + shift, y - fontSize * 0.78, x0 + shift + w, y + fontSize * 0.24];
							const lead = [
								side === "start" ? box[0] - 3 : box[2] + 3,
								y - fontSize * 0.28,
							];
							score += penalty(box) + Math.abs(shift) * 0.35;
							for (let t = 0.2; t <= 1; t += 0.1) {
								const lx = item.px + (lead[0] - item.px) * t;
								const ly = item.py + (lead[1] - item.py) * t;
								const point = [lx, ly, lx, ly];
								blocks.forEach((block, k) => {
									if (!group.includes(k) && hit(point, block, 0)) score += 900;
								});
								taken.forEach(block => {
									if (hit(point, block, 0)) score += 400;
								});
							}
							placed.push({ ...item, x: x + shift, y, a: side, box, leader: lead });
						});
						if (score < best.score) best = { score, placed };
					}
				}
			}
			order.forEach((i, r) => {
				out[i] = best.placed[r];
				taken.push(best.placed[r].box);
			});
			return;
		}
		const item = items[n];
		const w = width(item.text);
		let best = { score: Infinity, x: 0, y: 0, a: "start", box: [0, 0, 0, 0] };
		let tries = 0;
		for (const k of [1, 1.7, 2.5, 3.5, 4.7]) {
			const gap = (radius + 8) * k;
			const diagonal = gap * 0.78;
			const h = fontSize * 0.34;
			const v = fontSize * 0.6;
			for (const [dx, dy, anchor] of [
				[gap, h, "start"],
				[-gap, h, "end"],
				[0, -gap - 3, "middle"],
				[0, gap + fontSize * 0.78, "middle"],
				[diagonal, -diagonal, "start"],
				[diagonal, diagonal + v, "start"],
				[-diagonal, -diagonal, "end"],
				[-diagonal, diagonal + v, "end"],
			]) {
				const x = item.px + dx;
				const y = item.py + dy;
				const x0 = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2;
				const shift = fit(x0, w);
				const box = [x0 + shift, y - fontSize * 0.78, x0 + shift + w, y + fontSize * 0.24];
				const score = tries++ * 0.35 + Math.abs(shift) * 0.35 + penalty(box);
				if (score < best.score) best = { score, x: x + shift, y, a: anchor, box };
			}
		}
		taken.push(best.box);
		out[n] = { ...item, ...best };
	});
	return out;
}
const CHART_WIDTH = 680;
const CHART_HEIGHT = 424;
function svgChart(models, metric) {
	const width = CHART_WIDTH;
	const height = CHART_HEIGHT;
	const plot = {
		left: 48,
		right: width - 16,
		top: 26,
		bottom: height - 40,
	};
	const fontSize = 12;
	const radius = 4.5;
	const points = models.map(model => ({ ...model, x: model[metric] }));
	const xs = points.map(point => point.x);
	const ys = points.map(point => point.y);
	const t0 = Math.log10(Math.min(...xs) * 0.9);
	const t1 = Math.log10(Math.max(...xs) * 1.1);
	const y0 = Math.floor(Math.min(...ys) / 10) * 10;
	const y1 = Math.ceil(Math.max(...ys) / 10) * 10;
	const X = value => plot.left + (t1 - Math.log10(value)) / (t1 - t0) * (plot.right - plot.left);
	const Y = value => plot.bottom - (value - y0) / (y1 - y0) * (plot.bottom - plot.top);
	const round = value => +value.toFixed(1);
	const preferredTicks = metric === "cost"
		? [4, 2, 1, 0.5, 0.25, 0.1]
		: [2, 1, 0.5, 0.25];
	let xTicks = preferredTicks.filter(value => value >= 10 ** t0 && value <= 10 ** t1);
	if (xTicks.length < 2) {
		xTicks = [10 ** t1, 1, 10 ** t0]
			.filter(value => value >= 10 ** t0 && value <= 10 ** t1)
			.sort((a, b) => b - a);
	}
	const yTicks = [];
	for (let value = y0; value <= y1; value += 10) yTicks.push(value);
	const front = frontier(points, "x")
		.sort((a, b) => b.x - a.x)
		.map(point => [X(point.x), Y(point.y)]);
	const stairs = front.flatMap(([x, y], i) =>
		i ? [[front[i - 1][0], y], [x, y]] : [[x, y]]
	);
	const obstacles = [
		...points.map(point => [
			[X(point.x) - radius - 3, Y(point.y) - radius - 3,
				X(point.x) + radius + 3, Y(point.y) + radius + 3],
			1800,
		]),
		...stairs.slice(1).map((step, i) => {
			const previous = stairs[i];
			return [[
				Math.min(previous[0], step[0]) - 2,
				Math.min(previous[1], step[1]) - 2,
				Math.max(previous[0], step[0]) + 2,
				Math.max(previous[1], step[1]) + 2,
			], 120];
		}),
	];
	const labels = placeLabels(
		points.map(point => ({
			px: X(point.x),
			py: Y(point.y),
			text: point.short,
			author: point.author,
			score: point.y,
		})),
		obstacles,
		plot,
		radius,
		fontSize,
	);
	const out = [
		`<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Performance versus relative ${metric}. Higher is better; right is ${metric === "cost" ? "cheaper" : "leaner"}.">`,
		yTicks.map(value =>
			`<line class="grid" x1="${plot.left}" y1="${round(Y(value))}" x2="${plot.right}" y2="${round(Y(value))}"/>`
		).join(""),
		xTicks.map(value =>
			`<line class="grid" x1="${round(X(value))}" y1="${plot.top}" x2="${round(X(value))}" y2="${plot.bottom}"/>`
		).join(""),
		yTicks.map(value =>
			`<text class="tick" x="${plot.left - 7}" y="${round(Y(value)) + 4}" text-anchor="end">${value}</text>`
		).join(""),
		xTicks.map(value =>
			`<text class="tick" x="${round(X(value))}" y="${plot.bottom + 16}" text-anchor="middle">${value}×</text>`
		).join(""),
		stairs.length > 1
			? `<polyline class="front" points="${stairs.map(([x, y]) => `${round(x)},${round(y)}`).join(" ")}"/>`
			: "",
		labels.filter(label => label.leader).map(label =>
			`<line x1="${round(label.px)}" y1="${round(label.py)}" x2="${round(label.leader[0])}" y2="${round(label.leader[1])}" stroke="${colorOf(label.author)}" stroke-width="1.25"/>`
		).join(""),
		points.map(point =>
			`<circle class="dot" cx="${round(X(point.x))}" cy="${round(Y(point.y))}" r="${radius}" fill="${colorOf(point.author)}" aria-label="${esc(point.short)}: index ${point.y.toFixed(1)}, ${times(point[metric])} ${metric}"><title>Index ${point.y.toFixed(1)} · ${times(point[metric])} ${metric}</title></circle>`
		).join(""),
		labels.map(label =>
			`<text class="label" x="${round(label.x)}" y="${round(label.y)}" text-anchor="${label.a}">${esc(label.text)}</text>`
		).join(""),
		`</svg>`,
	];
	return out.join("");
}
function tableView(models, sort) {
	const rows = [...models].sort((a, b) => {
		const av = sort.key === "model" ? a.short : a[sort.key];
		const bv = sort.key === "model" ? b.short : b[sort.key];
		return sort.dir * (typeof av === "string" ? av.localeCompare(bv) : av - bv);
	}).map(model => `
		<tr>
			<td class="rank">${model.rank}</td>
			<td class="model"><i class="swatch" style="background:${colorOf(model.author)}"></i>${esc(model.short)} <span class="author">${esc(model.author)}</span></td>
			<td class="num">${model.y.toFixed(1)}</td>
			<td class="num">${times(model.cost)}</td>
			<td class="num">${times(model.tokens)}</td>
		</tr>`).join("");
	const ariaSort = key => sort.key === key
		? (sort.dir > 0 ? "ascending" : "descending")
		: "none";
	return `<table aria-label="Model rankings">
		<thead><tr>
			<th class="rank" scope="col" aria-sort="${ariaSort("rank")}"><button data-sort="rank">#</button></th>
			<th scope="col" aria-sort="${ariaSort("model")}"><button data-sort="model">Model</button></th>
			<th class="num" scope="col" aria-sort="${ariaSort("y")}"><button data-sort="y">Index</button></th>
			<th class="num" scope="col" aria-sort="${ariaSort("cost")}"><button data-sort="cost">Cost</button></th>
			<th class="num" scope="col" aria-sort="${ariaSort("tokens")}"><button data-sort="tokens">Tokens</button></th>
		</tr></thead>
		<tbody>${rows}</tbody>
	</table>`;
}
const chartEl = document.getElementById("chart");
const tableEl = document.getElementById("table");
const metricButtons = [...document.querySelectorAll(".metric")];
let models = [];
let metric = "cost";
let sort = { key: "y", dir: -1 };
function renderChart() {
	if (!models.length) return;
	chartEl.innerHTML = svgChart(models, metric);
}
function setMetric(next) {
	if (next === metric) return;
	metric = next;
	for (const button of metricButtons) {
		const on = button.dataset.metric === metric;
		button.classList.toggle("on", on);
		button.setAttribute("aria-pressed", String(on));
	}
	renderChart();
}
function setSort(key) {
	sort = {
		key,
		dir: sort.key === key ? -sort.dir : (DEFAULT_DIR[key] ?? 1),
	};
	tableEl.innerHTML = tableView(models, sort);
	tableEl.querySelector(`[data-sort="${key}"]`)?.focus();
}
for (const button of metricButtons) {
	button.addEventListener("click", () => setMetric(button.dataset.metric));
}
tableEl.addEventListener("click", event => {
	const button = event.target.closest("[data-sort]");
	if (button) setSort(button.dataset.sort);
});
chartEl.innerHTML = `<p class="note">Loading…</p>`;
load()
	.then(data => {
		models = computeModels(data);
		tableEl.innerHTML = tableView(models, sort);
		renderChart();
	})
	.catch(() => {
		chartEl.innerHTML = `<p class="note">Could not load the data. <a href="https://github.com/git-aarvin/mei">View the source on GitHub</a>.</p>`;
	});
