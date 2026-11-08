import { html } from "./vendor/view.js";
import { svg } from "./svg.js";
import { COLORS } from "./config.js";
import { shade } from "./stats.js";
import { pct } from "./format.js";

/** Dot matrix: models (rows, by index) against benchmarks (columns), sized by standardised score. */
export const heatmap = ({ models, labs, hover, selected, width }, act) => {
	const fams = Object.keys(models[0].z), rows = models.filter(m => !labs.size || labs.has(m.author)),
		small = width < 640, L = small ? 84 : 130, R = small ? 40 : 56, rowH = small ? 26 : 30,
		top = small ? 76 : 44, colW = (width - L - R) / fams.length, H = top + rows.length * rowH + 8,
		cx = j => L + colW * (j + .5), rmax = Math.min(colW / 2 - 4, rowH / 2 - 3),
		rad = z => Math.max(2.5, rmax * Math.sqrt(Math.min(Math.abs(z), 2) / 2));
	return html`<svg class="${hover ? "chart dim" : "chart"}" viewBox="0 0 ${width} ${H}" role="group"
		aria-label="Standardised score for each model on each benchmark">
		${fams.map((f, j) => svg`<text class="t" x="${cx(j)}" y="${top - 12}" text-anchor="${small ? "start" : "middle"}"
			transform="rotate(${small ? -40 : 0} ${cx(j)} ${top - 12})">${f}</text>`)}
		${rows.map((m, i) => svg`<g class="${"row" + (hover === m.name ? " on" : "") + (selected === m.name ? " sel" : "")}"
			tabindex="0" role="button" aria-label="${m.name}, index ${m.y.toFixed(1)}"
			onmouseenter="${() => act.over(m.name)}" onmouseleave="${() => act.over(null)}"
			onfocus="${() => act.over(m.name)}" onblur="${() => act.over(null)}"
			onclick="${() => act.select(m.name)}"
			onkeydown="${e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), act.select(m.name))}">
			<rect class="hit" x="0" y="${top + i * rowH}" width="${width}" height="${rowH}"/>
			<line class="g" x1="0" y1="${top + (i + 1) * rowH}" x2="${width}" y2="${top + (i + 1) * rowH}"/>
			<text class="l" x="${L - 12}" y="${top + i * rowH + rowH / 2 + 5}" text-anchor="end"
				style="fill:${shade(COLORS[m.author], -.3)}">${m.short}</text>
			${fams.map((f, j) => m.z[f] == null
				? svg`<line class="na" x1="${cx(j) - 5}" y1="${top + i * rowH + rowH / 2}" x2="${cx(j) + 5}" y2="${top + i * rowH + rowH / 2}"/>`
				: svg`<circle cx="${cx(j)}" cy="${top + i * rowH + rowH / 2}" r="${rad(m.z[f])}"
					fill="${m.z[f] >= 0 ? COLORS[m.author] : "#fff"}" stroke="${COLORS[m.author]}"
					stroke-width="${m.z[f] >= 0 ? 0 : 2}"><title>${m.name} on ${f}: ${m.z[f] >= 0 ? "+" : ""}${m.z[f].toFixed(2)} standard deviations</title></circle>`)}
			<text class="v" x="${width - R + 14}" y="${top + i * rowH + rowH / 2 + 5}">${m.y.toFixed(1)}</text></g>`)}
	</svg>`;
};
