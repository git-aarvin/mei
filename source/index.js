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
	"Vibe Code": `https://www.vals.ai/benchmarks/vibe-code`,
	"Terminal-Bench-Science": `https://www.vals.ai/benchmarks/terminal-bench-science`,
	"SWE-bench Multimodal": `https://www.vals.ai/benchmarks/swebench-multimodal`,
	OpenWorldEngineer: `https://openworldengineer.mercor.com/`,
	"HiL-Bench": `https://labs.scale.com/leaderboard/hil`,
	"Ramp SWE-Bench v2": `https://labs.ramp.com/swebench`,
	"Real-SWE 1.1": `https://withspecific.com/benchmarks/real-swe`,
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
	Reflection: `#7f9a3c`,
	Alibaba: `#b84a62`,
	Tencent: `#3d7eb8`,
	Mistral: `#d46b27`,
	"Thinking Machines": `#4f8f58`,
	MiniMax: `#9e58b5`,
	StepFun: `#537d90`,
};
const typical = (models, field) => field === `score` ? Math.max(...models.map(model => model.score)) : Math.min(...models.map(model => model[field]));
export const ranked = (list, field = `score`) => {
	const labs = [...new Set([...list].sort((first, second) => first.rank - second.rank).map(model => model.lab))],
		value = new Map(labs.map(lab => [lab, typical(list.filter(model => model.lab === lab), field)]));
	return labs.sort((first, second) => field === `score` ? value.get(second) - value.get(first) : value.get(first) - value.get(second));
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
	"Qwen Max 4": `4-Max`,
	"Hy 4": `Hy4`,
	"Hy Flash 4": "Hy4 Flash",
	"Mistral Large 4": `Large 4`,
	"Inkling Mini 2": `Inkling 2 Mini`,
	"Inkling Small 2": `Inkling 2 Small`,
	"MiniMax Flash M3.1": `M3.1 Flash`,
};
const local = import.meta.url.startsWith(`file:`);
const disk = () => import(`node:fs/promises`);
export const read = async path => local ? (await disk()).readFile(new URL(path, import.meta.url), `utf8`) : (await fetch(new URL(path, import.meta.url))).text();
export const write = async (path, text) => local ? (await disk()).writeFile(new URL(path, import.meta.url), text) : console.log(path, text);
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
export const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, `-`).replace(/^-|-$/g, ``);
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
	return names.map((name, index) => ({
		name,
		slug: slug(name),
		lab: owners.get(name),
		short: tidy((short[name] ?? name).replace(/\b(?:Muse|1017)\b/gi, ``)),
		score: 50 + 10 * score[index] / deviation,
		cost: 10 ** usd[index],
		tokens: 10 ** tokens[index],
		grades: Object.fromEntries(families.filter(family => cells.has(`${family}\0${name}`)).map(family => [family, mean(cells.get(`${family}\0${name}`).score)])),
	})).sort((first, second) => second.score - first.score).map((model, index) => ({ ...model, rank: index + 1 }));
};
export const details = (data, list) => {
	const byModel = new Map(list.map(model => [model.name, []]));
	for (const { family, rows } of data) {
		const rankedRows = [...rows].sort((first, second) => second.score - first.score),
			midUsd = median(rows.map(row => row.usd).filter(Number.isFinite)),
			midTokens = median(rows.map(row => row.tokens).filter(Number.isFinite)),
			seen = new Map();
		rankedRows.forEach((row, index) => {
			const name = tidy(`${row.name} ${row.tier} ${row.lab === `Meta` ? `` : row.series}`);
			if (!seen.has(name)) seen.set(name, { scores: [], usds: [], tokens: [], bestRank: index + 1 });
			const entry = seen.get(name);
			entry.scores.push(row.score);
			if (row.usd != null) entry.usds.push(row.usd);
			if (row.tokens != null) entry.tokens.push(row.tokens);
		});
		for (const [name, entry] of seen) {
			const model = list.find(item => item.name === name);
			if (!model) continue;
			const usd = entry.usds.length ? mean(entry.usds) : null,
				tokens = entry.tokens.length ? mean(entry.tokens) : null;
			byModel.get(name).push({
				family,
				site: sites[family],
				rawScore: mean(entry.scores),
				normScore: Math.max(0, Math.min(100, 50 + 18 * model.grades[family])),
				rank: entry.bestRank,
				total: rankedRows.length,
				usd,
				tokens,
				relCost: usd != null && Number.isFinite(midUsd) ? usd / midUsd : null,
				relTokens: tokens != null && Number.isFinite(midTokens) ? tokens / midTokens : null,
			});
		}
	}
	return byModel;
};
const place = (items, obstacles, { left, right, top, bottom, radius, font }) => {
	const taken = [], placed = [], line = font * 1.35,
		hit = (first, second, pad) => first[0] < second[2] + pad && first[2] + pad > second[0] && first[1] < second[3] + pad && first[3] + pad > second[1],
		wide = text => text.length * font * .68,
		slide = (start, width) => Math.max(left + 6 - start, Math.min(0, right - 6 - start - width)),
		boxed = (start, base, width) => [start, base - font * .78, start + width, base + font * .24],
		penalty = box => {
			let score = box[1] < top - 20 || box[3] > bottom - 4 ? 4e3 : 0;
			for (const [obstacle, weight] of obstacles) if (hit(box, obstacle, 2)) score += weight;
			for (const other of taken) if (hit(box, other, 5)) score += 1600;
			return score;
		},
		root = items.map((item, index) => index),
		find = index => root[index] === index ? index : root[index] = find(root[index]);
	items.forEach((first, one) => items.forEach((second, two) => two > one && first.lab === second.lab && Math.hypot(first.dot[0] - second.dot[0], first.dot[1] - second.dot[1]) < line && (root[find(two)] = find(one))));
	items.forEach((item, index) => {
		if (placed[index]) return;
		const members = items.map((other, position) => position).filter(position => find(position) === find(index));
		if (members.length > 1) {
			const order = members.sort((first, second) => items[second].score - items[first].score || items[first].dot[1] - items[second].dot[1]),
				middle = [0, 1].map(axis => mean(order.map(position => items[position].dot[axis]))),
				blocks = items.map(other => [other.dot[0] - radius - 3, other.dot[1] - radius - 3, other.dot[0] + radius + 3, other.dot[1] + radius + 3]);
			let best = { score: Infinity, list: [] };
			for (const side of [`start`, `end`]) for (const reach of [1.45, 2.35, 3.45]) for (const lift of [0, -1.45, 1.45, -2.9, 2.9]) {
				let score = (reach + Math.abs(lift)) * font * .05;
				const list = order.map((position, rank) => {
					const entry = items[position], width = wide(entry.text),
						base = middle[1] + lift * font + (rank - (order.length - 1) / 2) * line + font * .3,
						anchor = middle[0] + (side === `start` ? reach : -reach) * font,
						start = side === `start` ? anchor : anchor - width,
						shift = slide(start, width),
						box = boxed(start + shift, base, width),
						lead = [side === `start` ? box[0] - 3 : box[2] + 3, base - font * .28];
					score += penalty(box) + Math.abs(shift) * .35;
					for (let step = .2; step <= 1; step += .1) {
						const spot = [entry.dot[0] + (lead[0] - entry.dot[0]) * step, entry.dot[1] + (lead[1] - entry.dot[1]) * step], mark = [...spot, ...spot];
						blocks.forEach((block, other) => !members.includes(other) && hit(mark, block, 0) && (score += 900));
						taken.forEach(block => hit(mark, block, 0) && (score += 400));
					}
					return { ...entry, at: [anchor + shift, base], anchor: side, box, leader: lead };
				});
				if (score < best.score) best = { score, list };
			}
			order.forEach((position, rank) => {
				placed[position] = best.list[rank];
				taken.push(best.list[rank].box);
			});
			return;
		}
		const width = wide(item.text);
		let best = { score: Infinity }, tries = 0;
		for (const factor of [1, 1.7, 2.5, 3.5, 4.7]) {
			const gap = (radius + 8) * factor, diagonal = gap * .78, level = font * .34, below = font * .6;
			for (const [across, down, anchor] of [
				[gap, level, `start`],
				[-gap, level, `end`],
				[0, -gap - 3, `middle`],
				[0, gap + font * .78, `middle`],
				[diagonal, -diagonal, `start`],
				[diagonal, diagonal + below, `start`],
				[-diagonal, -diagonal, `end`],
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
	const { left, right, top, bottom, radius, pad, gap, drop, links = false } = geometry,
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
			...labels.map((label, index) => label.leader ? `<line class="leader" ${tag(index)} stroke="${color(list[index].lab)}" x1="${round(label.dot[0])}" y1="${round(label.dot[1])}" x2="${round(label.leader[0])}" y2="${round(label.leader[1])}"/>` : ``),
			...list.map((model, index) => { const el = `<circle class="dot" ${tag(index, ` data-edge="${times(model[metric])}" data-score="${model.score.toFixed(1)}" fill="${color(model.lab)}"`)} cx="${round(dots[index][0])}" cy="${round(dots[index][1])}" r="${radius}"/>`; return links ? `<a href="models/${model.slug}.html" data-model-link="${model.slug}" aria-label="${encode(model.short)}" tabindex="-1">${el}</a>` : el; }),
			...labels.map((label, index) => { const el = `<text class="label" ${tag(index)} fill="${shade(color(list[index].lab), .7)}" x="${round(label.at[0])}" y="${round(label.at[1])}" text-anchor="${label.anchor}">${encode(label.text)}</text>`; return links ? `<a href="models/${list[index].slug}.html" data-model-link="${list[index].slug}" tabindex="-1">${el}</a>` : el; }),
		].join(``),
	};
};
export const bar = (list, metric, geometry) => {
	const { left, right, top, bottom, radius, gap, drop, reference, tooltip = true, links = false } = geometry,
		log = metric !== `index`,
		field = metric === `index` ? `score` : metric,
		rows = log ? [...list].sort((first, second) => first[field] - second[field]) : list,
		values = rows.map(model => model[field]),
		floor = log ? Math.log10(Math.min(...values) * .9) : Math.floor(Math.min(...values) / 10) * 10,
		ceiling = log ? Math.log10(Math.max(...values) * 1.1) : Math.ceil(Math.max(...values) / 10) * 10,
		horizontal = value => left + (log ? (Math.log10(value) - floor) / (ceiling - floor) : (value - floor) / (ceiling - floor)) * (right - left),
		step = (bottom - top) / rows.length,
		height = Math.min(step * .62, 22),
		center = index => top + step * (index + .5),
		upper = Math.floor(Math.log2(10 ** ceiling)), lower = Math.ceil(Math.log2(10 ** floor)),
		powers = Array.from({ length: Math.max(0, upper - lower + 1) }, (item, index) => 2 ** (upper - index)),
		columns = log ? (powers.length % 2 ? powers.filter((power, index) => index % 2 === 0) : powers) : Array.from({ length: (ceiling - floor) / 10 + 1 }, (item, index) => floor + index * 10),
		round = value => +value.toFixed(1),
		shape = (x, y, width, size) => {
			const r = Math.min(radius, width);
			return `M${round(x)} ${round(y)}H${round(x + width - r)}Q${round(x + width)} ${round(y)} ${round(x + width)} ${round(y + r)}V${round(y + size - r)}Q${round(x + width)} ${round(y + size)} ${round(x + width - r)} ${round(y + size)}H${round(x)}Z`;
		},
		readout = value => log ? times(value) : value.toFixed(1),
		tag = (index, extra = ``) => `data-key="${index}" data-lab="${rows[index].lab}"${extra}`;
	return {
		axis: `M${left} ${top}V${bottom}H${right}`,
		labs: ranked(list, field),
		markup: [
			...columns.map(value => `<line class="grid" x1="${round(horizontal(value))}" y1="${top}" x2="${round(horizontal(value))}" y2="${bottom}"/>`),
			...columns.map(value => `<text class="tick" x="${round(horizontal(value))}" y="${bottom + drop}" text-anchor="middle">${log ? `${value}×` : value}</text>`),
			...rows.map((model, index) => {
				const y = center(index), width = Math.max(2, horizontal(model[field]) - left), end = left + width;
				const title = tooltip ? `<title>${encode(model.short)}: ${readout(model[field])}</title>` : ``;
				const lbl = `<text class="label" ${tag(index)} x="${left - gap}" y="${round(y)}" text-anchor="end" dominant-baseline="central">${encode(model.short)}</text>`, barEl = `<path class="bar" ${tag(index, ` fill="${color(model.lab)}" data-width="${round(width)}"`)} d="${shape(left, y - height / 2, width, height)}">${title}</path>`; return (links ? `<a href="models/${model.slug}.html" data-model-link="${model.slug}" tabindex="-1">${lbl}${barEl}</a>` : `${lbl}${barEl}`) + `<text class="value" ${tag(index)} x="${round(end + 8)}" y="${round(y)}" dominant-baseline="central">${readout(model[field])}</text>`;
			}),
			...(reference ? rows.map((item, index) => {
				const y = center(index);
				return `<path class="reference" data-key="${index}" data-left="${left}" data-top="${round(y - height / 2)}" data-height="${round(height)}" data-radius="${radius}"/>`;
			}) : []),
		].join(``),
	};
};
export const fill = (text, pieces) => text.replace(/<!--(\w+)-->[\s\S]*?<!--\/\1-->/g, (match, name) => name in pieces ? `<!--${name}-->${pieces[name]}<!--/${name}-->` : match);
