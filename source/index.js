export const files = {
	cursor: `CursorBench`,
	frontier: `FrontierCode`,
	swe: `FrontierSWE`,
	atlas: `SWE-Atlas`,
	migration: `Code Migration`,
	informatics: `IOI`,
	program: `ProgramBench`,
	terminal: `Terminal-Bench`,
	brownfield: `Vibe Code 1–100`,
	greenfield: `Vibe Code`,
	science: `Terminal-Bench-Science`,
	multimodal: `SWE-bench Multimodal`,
	world: `OpenWorldEngineer`,
	human: `HiL-Bench`,
	ramp: `Ramp SWE-Bench v2`,
	real: `Real-SWE 1.1`,
	marathon: `SWE Marathon 1.2`,
	aa3d: `AA-3D`,
	cyber: `CyberBench v1.1`,
	sre: `SRE Bench`,
	scicode: `SciCode`,
	rsi: `Vals RSI Index`,
};
export const sites = {
	CursorBench: `https://cursor.com/cursorbench`,
	FrontierCode: `https://cognition.com/frontiercode`,
	FrontierSWE: `https://www.frontierswe.com/`,
	"SWE-Atlas": `https://labs.scale.com/leaderboard/swe-atlas`,
	"Code Migration": `https://www.vals.ai/benchmarks/code-migration-v1-1`,
	IOI: `https://www.vals.ai/benchmarks/ioi`,
	ProgramBench: `https://programbench.com/`,
	"Terminal-Bench": `https://www.tbench.ai/`,
	"Vibe Code 1–100": `https://www.vals.ai/benchmarks/vcb-1-100-v1-1`,
	"Vibe Code": `https://www.vals.ai/benchmarks/vibe-code-v1-1-1`,
	"Terminal-Bench-Science": `https://www.vals.ai/benchmarks/terminal-bench-science`,
	"SWE-bench Multimodal": `https://www.vals.ai/benchmarks/swebench-multimodal`,
	OpenWorldEngineer: `https://openworldengineer.mercor.com/`,
	"HiL-Bench": `https://labs.scale.com/leaderboard/hil`,
	"Ramp SWE-Bench v2": `https://labs.ramp.com/swebench`,
	"Real-SWE 1.1": `https://withspecific.com/benchmarks/real-swe`,
	"SWE Marathon 1.2": `https://swe-marathon.org`,
	"AA-3D": `https://artificialanalysis.ai/evaluations/aa-3d`,
	"CyberBench v1.1": `https://www.vals.ai/benchmarks/cyber`,
	"SRE Bench": `https://www.vals.ai/benchmarks/srebench`,
	SciCode: `https://artificialanalysis.ai/evaluations/scicode`,
	"Vals RSI Index": `https://www.vals.ai/benchmarks/rsi_index`,
};
export const families = [...new Set(Object.values(files))];
export const palette = {
	Anthropic: `#c66e53`,
	OpenAI: `#40947d`,
	Google: `#c28b3f`,
	xAI: `#6659b5`,
	DeepSeek: `#4e70a8`,
	Meta: `#35949c`,
	Moonshot: `#6b7785`,
	"Z.ai": `#a8508f`,
	Xiaomi: `#dc7a30`,
	"Thinking Machines": `#4f8f58`,
};
const typical = models => Math.max(...models.map(model => model.score));
export const ranked = list => {
	const labs = [...new Set([...list].sort((first, second) => first.rank - second.rank).map(model => model.lab))],
		value = new Map(labs.map(lab => [lab, typical(list.filter(model => model.lab === lab))]));
	return labs.sort((first, second) => value.get(second) - value.get(first));
};
const muted = `#6b6b6b`;
export const color = lab => palette[lab] ?? muted;
const channel = value => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, `0`);
export const shade = (hex, factor) => `#${hex.slice(1).match(/../g).map(pair => channel(parseInt(pair, 16) * factor)).join(``)}`;
const short = {
	"Claude Opus 5.5": `Opus 5.5`,
	"Claude Fable 5.2": `Fable 5.2`,
	"Claude Sonnet 5.5": `Sonnet 5.5`,
	"Claude Haiku 5.5": `Haiku 5.5`,
	"Gemini Carbon 4": `4 Carbon`,
	"Gemini Hydrogen 4": `4 Hydrogen`,
	"Gemini Neon 4": `4 Neon`,
	"Flash V4.1 1017": `V4.1 Flash`,
	"GPT Astra 6.2": `6.2 Astra`,
	"GPT Sol 6.2": `6.2 Sol`,
	"GPT Terra 6.1": `6.1 Terra`,
	"GPT Luna 6": `6 Luna`,
	"Kimi Pro K3.1": `K3.1 Pro`,
	"MiMo Pro V2.6": `V2.6-Pro`,
	"MiMo Flash V2.6": `V2.6-Flash`,
	"Inkling Small 2": `Inkling 2 Small`,
};
const disk = () => import(`node:fs/promises`);
export const read = async path => (await disk()).readFile(new URL(path, import.meta.url), `utf8`);
const parse = text => JSON.parse(text.replace(/\/\*[\s\S]*?\*\//g, ``).replace(/,(\s*[}\]])/g, `$1`));
export const load = () => Promise.all(Object.entries(files).map(async ([file, family]) => ({ family, rows: parse(await read(`jsonc/${file}.jsonc`)) })));
const mean = values => {
	const finite = values.filter(Number.isFinite);
	return finite.reduce((total, value) => total + value, 0) / finite.length;
};
const spread = values => Math.sqrt(mean(values.map(value => (value - mean(values)) ** 2)));
const median = values => {
	const sorted = [...values].sort((first, second) => first - second), middle = sorted.length >> 1;
	return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const normal = values => values.map(value => (value - mean(values)) / spread(values));
const center = values => {
	const middle = median(values.filter(Number.isFinite));
	return values.map(value => Number.isFinite(value) ? value - middle : NaN);
};
const effects = matrix => {
	let offsets = matrix.map(() => 0), columns = matrix[0].map(() => 0);
	for (let round = 0; round < 500; round++) {
		columns = columns.map((previous, column) => mean(matrix.map((row, index) => row[column] - offsets[index])));
		offsets = matrix.map(row => mean(row.map((value, column) => value - columns[column])));
	}
	return columns.map(value => value - mean(columns));
};
const tidy = text => text.replace(/\s+/g, ` `).trim();
export const times = value => `${+value.toPrecision(2)}×`;
export const encode = text => text.replace(/[&<>"]/g, char => `&#${char.charCodeAt()};`);
export const models = data => {
	const cells = new Map(), owners = new Map();
	for (const { family, rows } of data) {
		const scaled = {
			score: normal(rows.map(row => row.score)),
			usd: center(rows.map(row => row.usd == null ? NaN : Math.log10(row.usd))),
			tokens: center(rows.map(row => row.tokens == null ? NaN : Math.log10(row.tokens))),
		};
		rows.forEach((row, index) => {
			const name = tidy(`${row.name} ${row.tier} ${row.lab === `Meta` ? `` : row.series}`), key = `${family}\0${name}`;
			if (!cells.has(key)) cells.set(key, { score: [], usd: [], tokens: [] });
			owners.set(name, row.lab);
			for (const field in scaled) cells.get(key)[field].push(scaled[field][index]);
		});
	}
	const names = [...owners.keys()].sort(),
		fit = field => effects(families.map(family => names.map(name => cells.has(`${family}\0${name}`) ? mean(cells.get(`${family}\0${name}`)[field]) : NaN))),
		score = fit(`score`), usd = fit(`usd`), tokens = fit(`tokens`), deviation = spread(score);
	return names.map((name, index) => {
		const lab = owners.get(name);
		const shortName = tidy((short[name] ?? name).replace(/\b(?:Muse|1017)\b/gi, ``));
		return {
			name,
			lab,
			short: shortName,
			score: 50 + 10 * score[index] / deviation,
			cost: 10 ** usd[index],
			tokens: 10 ** tokens[index],
			grades: Object.fromEntries(families.filter(family => cells.has(`${family}\0${name}`)).map(family => [family, mean(cells.get(`${family}\0${name}`).score)])),
		};
	}).sort((first, second) => second.score - first.score).map((model, index) => ({ ...model, rank: index + 1 }));
};
const place = (items, obstacles, { left, right, top, bottom, radius, font }) => {
	const taken = [], placed = [],
		hit = (first, second, pad) => first[0] < second[2] + pad && first[2] + pad > second[0] && first[1] < second[3] + pad && first[3] + pad > second[1],
		wide = text => text.length * font * .62,
		slide = (start, width) => Math.max(left + 6 - start, Math.min(0, right - 6 - start - width)),
		boxed = (start, base, width) => [start, base - font * .78, start + width, base + font * .24],
		penalty = box => {
			let score = box[1] < top - 20 || box[3] > bottom - 4 ? 4e3 : 0;
			for (const [obstacle, weight] of obstacles) if (hit(box, obstacle, 2)) score += weight;
			for (const other of taken) if (hit(box, other, 5)) score += 1600;
			return score;
		};
	items.forEach((item, index) => {
		const width = wide(item.text);
		let best = { score: Infinity }, tries = 0;
		for (const factor of [1, 1.25, 1.7, 2.5, 3.5, 4.7]) {
			const gap = (radius + 8) * factor, diagonal = gap * .78, level = font * .34, below = font * .6;
			for (const [across, down, anchor] of [
				[gap, level, `start`],
				[-gap, level, `end`],
				[0, -gap - 3, `middle`],
				[0, gap + font * .78, `middle`],
				[diagonal, -diagonal, `start`],
				[-diagonal, -diagonal, `end`],
				[diagonal, diagonal + below, `start`],
				[-diagonal, diagonal + below, `end`],
			]) {
				const column = item.dot[0] + across, base = item.dot[1] + down,
					start = anchor === `start` ? column : anchor === `end` ? column - width : column - width / 2,
					shift = slide(start, width),
					box = boxed(start + shift, base, width),
					score = factor * factor * 15 + tries++ * .5 + Math.abs(shift) * .35 + penalty(box);
				if (score < best.score) best = { score, at: [column + shift, base], anchor, box };
			}
		}
		taken.push(best.box);
		placed[index] = { ...item, ...best };
	});
	return placed;
};
export const scatter = (list, metric, geometry) => {
	const { left, right, top, bottom, radius, pad, gap, drop } = geometry,
		values = list.map(model => model[metric]), scores = list.map(model => model.score),
		least = Math.log10(Math.min(...values) * .9), most = Math.log10(Math.max(...values) * 1.1),
		floor = Math.floor(Math.min(...scores) / 10) * 10, ceiling = Math.ceil(Math.max(...scores) / 10) * 10,
		horizontal = value => left + (most - Math.log10(value)) / (most - least) * (right - left),
		vertical = value => bottom - (value - floor) / (ceiling - floor) * (bottom - top),
		locate = model => [horizontal(model[metric]), vertical(model.score)],
		upper = Math.floor(Math.log2(10 ** most)), lower = Math.ceil(Math.log2(10 ** least)),
		powers = Array.from({ length: Math.max(0, upper - lower + 1) }, (item, index) => 2 ** (upper - index)),
		columns = powers.length % 2 ? powers.filter((power, index) => index % 2 === 0) : powers,
		rows = Array.from({ length: (ceiling - floor) / 10 + 1 }, (item, index) => floor + index * 10),
		round = value => +value.toFixed(1),
		dots = list.map(locate),
		front = list.filter(model => !list.some(other => other[metric] <= model[metric] && other.score >= model.score && (other[metric] < model[metric] || other.score > model.score))).sort((first, second) => second[metric] - first[metric]).map(locate),
		stairs = front.flatMap((dot, index) => index ? [[front[index - 1][0], dot[1]], dot] : [dot]),
		obstacles = [
			...dots.map(dot => [[dot[0] - radius - 3, dot[1] - radius - 3, dot[0] + radius + 3, dot[1] + radius + 3], 1800]),
			...stairs.slice(1).map((step, index) => [[Math.min(stairs[index][0], step[0]) - 2, Math.min(stairs[index][1], step[1]) - 2, Math.max(stairs[index][0], step[0]) + 2, Math.max(stairs[index][1], step[1]) + 2], 20]),
		],
		labels = place(list.map((model, index) => ({ dot: dots[index], text: model.short, lab: model.lab, score: model.score })), obstacles, geometry),
		tag = (index, extra = ``) => `data-key="${index}" data-lab="${list[index].lab}"${extra}`;
	return {
		axis: `M${left - pad} ${round(vertical(ceiling))}V${round(vertical(floor))}M${round(Math.min(...columns.map(horizontal)))} ${bottom + pad}H${round(Math.max(...columns.map(horizontal)))}`,
		labs: ranked(list),
		markup: [
			...rows.map(value => `<line class="grid" x1="${left - pad}" y1="${round(vertical(value))}" x2="${right}" y2="${round(vertical(value))}"/>`),
			...columns.map(value => `<line class="grid" x1="${round(horizontal(value))}" y1="${top}" x2="${round(horizontal(value))}" y2="${bottom + pad}"/>`),
			...rows.map(value => `<text class="tick" x="${left - gap}" y="${round(vertical(value))}" text-anchor="end" dominant-baseline="central">${value}</text>`),
			...columns.map(value => `<text class="tick" x="${round(horizontal(value))}" y="${bottom + drop}" text-anchor="middle">${value}×</text>`),
			`<polyline class="front" points="${stairs.map(dot => dot.map(round)).join(` `)}"/>`,
			...list.map((model, index) => `<circle class="dot" ${tag(index, ` data-edge="${times(model[metric])}" data-score="${model.score.toFixed(1)}" fill="${color(model.lab)}"`)} cx="${round(dots[index][0])}" cy="${round(dots[index][1])}" r="${radius}"/>`),
			...labels.map((label, index) => `<text class="label" ${tag(index)} fill="${shade(color(list[index].lab), .7)}" x="${round(label.at[0])}" y="${round(label.at[1])}" text-anchor="${label.anchor}">${encode(label.text)}</text>`),
		].join(``),
	};
};
export const fill = (text, pieces) => text.replace(/<!--(\w+)-->[\s\S]*?<!--\/\1-->/g, (match, name) => name in pieces ? `<!--${name}-->${pieces[name]}<!--/${name}-->` : match);
