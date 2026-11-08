import { html } from "./vendor/view.js";
import { COLORS } from "./config.js";
import { times } from "./format.js";

const COLS = [
	["rank", "#", 1], ["name", "Model", 1], ["y", "Index", -1],
	["cost", "Cost", 1], ["tokens", "Tokens", 1], ["n", "Benchmarks", -1],
];

export const rankings = ({ models, labs, sort, hover, selected }, act) => {
	const rows = models.filter(m => !labs.size || labs.has(m.author)),
		lo = Math.floor(Math.min(...models.map(m => m.y)) / 10) * 10,
		hi = Math.ceil(Math.max(...models.map(m => m.y)) / 10) * 10;
	rows.sort((a, b) => sort.dir * (typeof a[sort.key] === "string"
		? a[sort.key].localeCompare(b[sort.key]) : a[sort.key] - b[sort.key]));
	return html`<div class="scroll"><table class="rank">
		<thead><tr>${COLS.map(([key, text, first]) => html`<th class="${key === "name" ? "" : "r"}"
			aria-sort="${sort.key === key ? (sort.dir > 0 ? "ascending" : "descending") : "none"}">
			<button onclick="${() => act.sort(key, first)}">${text}</button></th>`)}</tr></thead>
		<tbody>${rows.map(m => html`<tr class="${(hover === m.name ? "on " : "") + (selected === m.name ? "sel" : "")}"
			onmouseenter="${() => act.over(m.name)}" onmouseleave="${() => act.over(null)}">
			<td class="r dim">${m.rank}</td>
			<td><i class="swatch" style="background:${COLORS[m.author]}"></i><button class="pick" onclick="${() => act.select(m.name)}">${m.name}</button><span class="by">${m.author}</span></td>
			<td class="r ix"><span class="meter"><b style="width:${(m.y - lo) / (hi - lo) * 100}%;background:${COLORS[m.author]}"></b></span>${m.y.toFixed(1)}</td>
			<td class="r">${times(m.cost)}</td><td class="r">${times(m.tokens)}</td>
			<td class="r">${m.n} of ${m.families}</td></tr>`)}</tbody>
	</table></div>`;
};
