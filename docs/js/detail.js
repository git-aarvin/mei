import { html } from "./vendor/view.js";
import { svg } from "./svg.js";
import { COLORS } from "./config.js";
import { shade } from "./stats.js";
import { FMT, times } from "./format.js";

/** Profile of the selected model: standardised score per benchmark, then the raw results. */
export const detail = ({ models, benchmarks, selected, width }, act) => {
	const m = models.find(x => x.name === selected);
	if (!m) return html`<p class="intro">Select a model in the chart, rankings or heatmap to see how it did on each benchmark.</p>`;
	const fams = Object.keys(m.z), cw = Math.min(width, 640), L = width < 640 ? 100 : 140,
		rowH = 30, top = 28, H = top + fams.length * rowH + 8,
		x = z => L + (Math.max(-2, Math.min(2, z)) + 2) / 4 * (cw - L - 44), x0 = x(0),
		color = COLORS[m.author],
		res = benchmarks.flatMap(b => {
			const s = [...b.rows].sort((a, c) => c.pass - a.pass), i = s.findIndex(r => r.name === m.name);
			return i < 0 ? [] : [{ title: b.title, r: s[i], rank: i + 1, of: s.length }];
		});
	return html`<div class="detail">
		<div class="detail-head">
			<h3><i class="swatch" style="background:${color}"></i>${m.name}<span class="by">${m.author}</span></h3>
			<dl class="facts"><dt>Index</dt><dd>${m.y.toFixed(1)}</dd><dt>Rank</dt><dd>${m.rank} of ${models.length}</dd>
				<dt>Cost</dt><dd>${times(m.cost)}</dd><dt>Tokens</dt><dd>${times(m.tokens)}</dd></dl>
			<button class="clear" onclick="${() => act.select(m.name)}">Clear</button>
		</div>
		<svg class="chart" viewBox="0 0 ${cw} ${H}" role="group" aria-label="Standardised score per benchmark for ${m.name}">
			<text class="t" x="${x0}" y="${top - 12}" text-anchor="middle">average</text>
			<line class="axis" x1="${x0}" y1="${top - 6}" x2="${x0}" y2="${H - 8}"/>
			${fams.map((f, i) => svg`<g>
				<text class="l" x="${L - 12}" y="${top + i * rowH + rowH / 2 + 5}" text-anchor="end">${f}</text>
				<rect x="${m.z[f] == null ? x0 : Math.min(x0, x(m.z[f]))}" y="${top + i * rowH + 7}" height="${rowH - 14}" rx="2"
					width="${m.z[f] == null ? 0 : Math.abs(x(m.z[f]) - x0)}" fill="${color}" opacity="${m.z[f] < 0 ? .45 : 1}"/>
				<text class="v" y="${top + i * rowH + rowH / 2 + 5}" x="${m.z[f] == null || m.z[f] >= 0 ? x(m.z[f] ?? 0) + 8 : x(m.z[f]) - 8}"
					text-anchor="${m.z[f] == null || m.z[f] >= 0 ? "start" : "end"}">${m.z[f] == null ? "not tested" : (m.z[f] >= 0 ? "+" : "") + m.z[f].toFixed(2)}</text></g>`)}
		</svg>
		<div class="scroll"><table class="rank">
			<thead><tr><th>Benchmark</th><th class="r">Pass rate</th><th class="r">Place</th><th class="r">Cost</th><th class="r">Tokens</th></tr></thead>
			<tbody>${res.map(({ title, r, rank, of }) => html`<tr><td>${title}</td><td class="r">${FMT.pass(r.pass)}</td>
				<td class="r">${rank} of ${of}</td><td class="r">${FMT.cost(r.cost)}</td><td class="r">${FMT.tokens(r.tokens)}</td></tr>`)}</tbody>
		</table></div>
		<p class="note">Bars show standard deviations from each benchmark's average, as used for the index.</p>
	</div>`;
};
