import { html } from "./vendor/view.js";
import { svg } from "./svg.js";
import { COLORS } from "./config.js";
import { shade } from "./stats.js";
import { FMT, ticks } from "./format.js";
import { ABOUT } from "./about.js";

const MEASURES = [["pass", "Pass rate"], ["cost", "Cost"], ["tokens", "Tokens"]];

export const bars = ({ benchmarks, bench, measure, labs, hover, width }, act) => {
	const b = benchmarks[bench], f = FMT[measure], small = width < 640,
		rows = b.rows.filter(r => !labs.size || labs.has(r.author))
			.sort((a, c) => (c[measure] ?? -1) - (a[measure] ?? -1)),
		max = Math.max(...rows.map(r => r[measure] ?? 0)) || 1, rowH = small ? 28 : 32,
		L = small ? 84 : 130, R = small ? 64 : 80, top = 26, H = top + rows.length * rowH + 8,
		bw = v => v == null ? 0 : v / max * (width - L - R), tk = ticks(max);
	return html`<div class="bench">
		<div class="bar-controls">
			<div class="tabs" role="group" aria-label="Benchmark">${benchmarks.map((x, i) =>
				html`<button class="${i === bench ? "on" : ""}" aria-pressed="${i === bench ? "true" : "false"}"
					onclick="${() => act.bench(i)}">${x.title}</button>`)}</div>
			<div class="seg" role="group" aria-label="Measure">${MEASURES.map(([k, t]) =>
				html`<button class="${k === measure ? "on" : ""}" aria-pressed="${k === measure ? "true" : "false"}"
					onclick="${() => act.measure(k)}">${t}</button>`)}</div>
		</div>
		<svg class="${hover ? "chart dim" : "chart"}" viewBox="0 0 ${width} ${H}" role="group"
			aria-label="${b.title}: ${measure} by model">
			${tk.map(v => svg`<line class="g" x1="${L + bw(v)}" y1="${top - 8}" x2="${L + bw(v)}" y2="${H - 8}"/>`)}
			${tk.map(v => svg`<text class="t" x="${L + bw(v)}" y="${top - 12}" text-anchor="middle">${f(v)}</text>`)}
			${rows.map((r, i) => svg`<g class="${hover === r.name ? "row on" : "row"}"
				onmouseenter="${() => act.over(r.name)}" onmouseleave="${() => act.over(null)}">
				<rect class="hit" x="0" y="${top + i * rowH}" width="${width}" height="${rowH}"/>
				<text class="l" x="${L - 12}" y="${top + i * rowH + rowH / 2 + 5}" text-anchor="end"
					style="fill:${shade(COLORS[r.author], -.3)}">${r.short}</text>
				<rect class="bar" x="${L}" y="${top + i * rowH + 6}" height="${rowH - 12}" rx="2"
					style="width:${bw(r[measure])}px;fill:${COLORS[r.author]}"/>
				<text class="v" x="${L + bw(r[measure]) + 8}" y="${top + i * rowH + rowH / 2 + 5}">${f(r[measure])}</text></g>`)}
		</svg>
		<p class="about">${ABOUT[b.family]}</p>
		<p class="note">${b.note}</p>
	</div>`;
};
