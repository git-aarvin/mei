import { bar, encode, families, fill, load, models, read, scatter, times, write } from "./index.js";
const geometry = { left: 48, right: 664, top: 26, bottom: 384, radius: 4.5, font: 12, pad: 0, gap: 7, drop: 16 };
const barGeometry = { left: 104, right: 640, top: 26, bottom: 384, radius: 2, font: 12, pad: 0, gap: 8, drop: 16, reference: true, tooltip: false };
const list = models(await load()), chosen = list.slice(0, 2), spare = list.slice(2);
const bars = Object.fromEntries([`index`, `cost`, `tokens`].map(metric => [metric, bar(list, metric, barGeometry)]));
const middle = [340, 264], reach = 174, count = families.length;
const percent = value => Math.max(0, Math.min(100, value));
const round = value => +value.toFixed(1);
const angle = index => -Math.PI / 2 + index * 2 * Math.PI / count;
const polar = (index, radius) => [middle[0] + Math.cos(angle(index)) * radius, middle[1] + Math.sin(angle(index)) * radius];
const at = (index, value) => polar(index, reach * value / 100);
const anchor = (index, near, far) => Math.cos(angle(index)) > .25 ? near : Math.cos(angle(index)) < -.25 ? far : `middle`;
const row = model => `<tr><td class="rank" data-value="${model.rank}">${model.rank}</td><td class="model" data-value="${encode(model.short)}">${encode(model.short)} <span class="lab">${model.lab}</span></td><td class="bar" data-value="${round(percent(model.score))}"><span class="meter" aria-hidden="true"><span class="fill" data-lab="${model.lab}" style="width:${round(percent(model.score))}%"></span><span class="ghost"></span></span></td><td class="num" data-value="${model.score}">${model.score.toFixed(1)}</td><td class="num" data-value="${model.cost}">${times(model.cost)}</td><td class="num" data-value="${model.tokens}">${times(model.tokens)}</td></tr>`;
const pick = (model, slot) => `<span class="pick" data-name="${encode(model.name)}"${slot === undefined ? `` : ` data-slot="${slot}"`}><span class="swatch"></span><button type="button" aria-label="Remove ${encode(model.short)}">${encode(model.short)}</button></span>`;
const option = model => `<option value="${encode(model.name)}" data-lab="${model.lab}"${chosen.includes(model) ? ` hidden` : ``}><span class="bullet"></span>${encode(model.short)}</option>`;
const shape = (model, slot) => {
	const marks = families.flatMap((family, index) => Number.isFinite(model.grades[family]) ? [{ index, value: percent(50 + 18 * model.grades[family]) }] : []);
	return `<g class="shape"${slot === undefined ? `` : ` data-slot="${slot}"`}>${[
		marks.length > 2 ? `<polygon class="area" points="${marks.map(mark => at(mark.index, mark.value).map(round)).join(` `)}"/>` : ``,
		...marks.map((mark, index) => {
			if (marks.length < 2 || marks.length === 2 && index === 1) return ``;
			const next = marks[(index + 1) % marks.length], start = at(mark.index, mark.value).map(round), end = at(next.index, next.value).map(round);
			return `<line class="${(next.index - mark.index + count) % count > 1 ? `line gap` : `line`}" x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}"/>`;
		}),
		...marks.map(mark => {
			const spot = at(mark.index, mark.value).map(round), label = polar(mark.index, Math.max(0, reach * mark.value / 100 - 17)).map(round);
			return `<g class="point" data-axis="${mark.index}"><circle class="vertex" cx="${spot[0]}" cy="${spot[1]}" r="3.5"/><text class="value" x="${label[0]}" y="${round(label[1] + 4)}" text-anchor="${anchor(mark.index, `end`, `start`)}">${mark.value.toFixed(1)}</text></g>`;
		}),
	].join(``)}</g>`;
};
const frame = [
	...[20, 40, 60, 80, 100].map(value => `<polygon class="ring" points="${families.map((family, index) => at(index, value).map(round)).join(` `)}"/>`),
	...families.map((family, index) => `<line class="spoke" x1="${middle[0]}" y1="${middle[1]}" x2="${at(index, 100).map(round)[0]}" y2="${at(index, 100).map(round)[1]}"/>`),
	...[25, 50, 75, 100].map(value => `<text class="scale" x="${round(at(0, value)[0] + 5)}" y="${round(at(0, value)[1] + 3)}">${value}</text>`),
	...families.map((family, index) => `<text class="axis" data-axis="${index}" x="${round(polar(index, reach + 24)[0])}" y="${round(polar(index, reach + 24)[1] + 4)}" text-anchor="${anchor(index, `start`, `end`)}">${family}</text>`),
].join(``);
await write(`../www/index.html`, fill(await read(`../www/index.html`), {
	cost: scatter(list, `cost`, geometry).markup,
	tokens: scatter(list, `tokens`, geometry).markup,
	barIndex: `<path class="axis" d="${bars.index.axis}"/>${bars.index.markup}`,
	barCost: `<path class="axis" d="${bars.cost.axis}"/>${bars.cost.markup}`,
	barTokens: `<path class="axis" d="${bars.tokens.axis}"/>${bars.tokens.markup}`,
	rows: list.map(row).join(``),
	chosen: chosen.map(pick).join(``),
	options: list.map(option).join(``),
	others: spare.map(model => pick(model)).join(``),
	frame,
	active: chosen.map(shape).join(``),
	idle: spare.map(model => shape(model)).join(``),
}));
