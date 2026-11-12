export const files = {
	cursor: `CursorBench`,
	frontier: `FrontierCode`,
	migration: `Code Migration`,
	informatics: `IOI`,
	program: `ProgramBench`,
	terminal: `Terminal-Bench`,
	brownfield: `Vibe Code`,
	greenfield: `Vibe Code`,
};
export const families = [...new Set(Object.values(files))];
export const labs = [`Anthropic`, `DeepSeek`, `Google`, `Meta`, `Moonshot`, `OpenAI`, `Reflection`, `xAI`, `Xiaomi`, `Z.ai`];
const short = {
	"Claude Opus 5.5": `Opus 5.5`,
	"Claude Fable 5.2": `Fable 5.2`,
	"Claude Sonnet 5.5": `Sonnet 5.5`,
	"Claude Haiku 5.5": `Haiku 5.5`,
	"Gemini Carbon 4": `4 Carbon`,
	"Gemini Argon 4": `4 Argon`,
	"Flash V4.1 1017": `V4.1 Flash`,
	"GPT Astra 6": `6 Astra`,
	"GPT Sol 6.1": `6.1 Sol`,
	"GPT Luna 6": `6 Luna`,
	"GLM Flash 5.3": `5.3 Flash`,
	"Kimi Pro K3.1": `K3.1 Pro`,
	"MiMo Flash V2.6": `V2.6-Flash`,
	"MiMo Pro V2.6": `V2.6-Pro`,
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
export const times = value => `${+value.toPrecision(2)}×`;
export const encode = text => text.replace(/[&<>"]/g, char => `&#${char.charCodeAt()};`);
export const models = data => {
	const cells = new Map(), owners = new Map();
	for (const { family, rows } of data) {
		const scaled = {
			score: normal(rows.map(row => row.score)),
			usd: center(rows.map(row => Math.log10(row.usd))),
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
		lab: owners.get(name),
		short: tidy((short[name] ?? name).replace(/\b(?:Muse|1017)\b/gi, ``)),
		score: 50 + 10 * score[index] / deviation,
		cost: 10 ** usd[index],
		tokens: 10 ** tokens[index],
		grades: Object.fromEntries(families.filter(family => cells.has(`${family}\0${name}`)).map(family => [family, mean(cells.get(`${family}\0${name}`).score)])),
	})).sort((first, second) => second.score - first.score).map((model, index) => ({ ...model, rank: index + 1 }));
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
					score = tries++ * .35 + Math.abs(shift) * .35 + penalty(box);
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
			...stairs.slice(1).map((step, index) => [[Math.min(stairs[index][0], step[0]) - 2, Math.min(stairs[index][1], step[1]) - 2, Math.max(stairs[index][0], step[0]) + 2, Math.max(stairs[index][1], step[1]) + 2], 120]),
		],
		labels = place(list.map((model, index) => ({ dot: dots[index], text: model.short, lab: model.lab, score: model.score })), obstacles, geometry),
		tag = (index, extra = ``) => `data-key="${index}" data-lab="${list[index].lab}"${extra}`;
	return {
		axis: `M${left - pad} ${round(vertical(ceiling))}V${round(vertical(floor))}M${round(Math.min(...columns.map(horizontal)))} ${bottom + pad}H${round(Math.max(...columns.map(horizontal)))}`,
		labs: labs.filter(lab => list.some(model => model.lab === lab)),
		markup: [
			...rows.map(value => `<line class="grid" x1="${left - pad}" y1="${round(vertical(value))}" x2="${right}" y2="${round(vertical(value))}"/>`),
			...columns.map(value => `<line class="grid" x1="${round(horizontal(value))}" y1="${top}" x2="${round(horizontal(value))}" y2="${bottom + pad}"/>`),
			...rows.map(value => `<text class="tick" x="${left - gap}" y="${round(vertical(value))}" text-anchor="end" dominant-baseline="central">${value}</text>`),
			...columns.map(value => `<text class="tick" x="${round(horizontal(value))}" y="${bottom + drop}" text-anchor="middle">${value}×</text>`),
			`<polyline class="front" points="${stairs.map(dot => dot.map(round)).join(` `)}"/>`,
			...labels.map((label, index) => label.leader ? `<line class="leader" ${tag(index)} x1="${round(label.dot[0])}" y1="${round(label.dot[1])}" x2="${round(label.leader[0])}" y2="${round(label.leader[1])}"/>` : ``),
			...list.map((model, index) => `<circle class="dot" ${tag(index, ` data-edge="${times(model[metric])}" data-score="${model.score.toFixed(1)}"`)} cx="${round(dots[index][0])}" cy="${round(dots[index][1])}" r="${radius}"/>`),
			...labels.map((label, index) => `<text class="label" ${tag(index)} x="${round(label.at[0])}" y="${round(label.at[1])}" text-anchor="${label.anchor}">${encode(label.text)}</text>`),
		].join(``),
	};
};
export const fill = (text, pieces) => text.replace(/<!--(\w+)-->[\s\S]*?<!--\/\1-->/g, (match, name) => name in pieces ? `<!--${name}-->${pieces[name]}<!--/${name}-->` : match);
