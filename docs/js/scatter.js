import { html } from "./vendor/view.js";
import { svg } from "./svg.js";
import { COLORS, LOGOS } from "./config.js";
import { shade } from "./stats.js";
import { placeLabels } from "./labels.js";
import { frontier } from "./model.js";
import { times } from "./format.js";

const num = v => Number(v.toFixed(2));
let memo = { key: "" };

// Same geometry as the README chart (log x axis reversed so cheaper is to the right),
// but sized to the container. Axes use every model; the frontier and labels use the visible ones.
function geometry(models, metric, labs, w) {
	const key = [metric, [...labs].sort(), w, models.length].join("|");
	if (memo.key === key) return memo.val;
	const small = w < 640, H = Math.round(w * (small ? 1 : .62)),
		FONT = small ? 13 : 18, R = small ? 4 : 5,
		P = { left: small ? 44 : 90, right: w - (small ? 18 : 50), top: 56, bottom: H - (small ? 84 : 88) },
		all = models.map(p => ({ ...p, x: p[metric] })),
		xs = all.map(p => p.x), ys = all.map(p => p.y),
		t0 = Math.log10(Math.min(...xs) * .9), t1 = Math.log10(Math.max(...xs) * 1.1),
		y0 = Math.floor(Math.min(...ys) / 10) * 10, y1 = Math.ceil(Math.max(...ys) / 10) * 10,
		X = v => num(P.left + (t1 - Math.log10(v)) / (t1 - t0) * (P.right - P.left)),
		Y = v => num(P.bottom - (v - y0) / (y1 - y0) * (P.bottom - P.top)),
		pts = all.filter(p => !labs.size || labs.has(p.author)),
		xt = [...Array(9)].map((_, i) => 2 ** (4 - i)).filter(v => v >= Math.max(.1, 10 ** t0) && v <= 10 ** t1),
		yt = [...Array((y1 - y0) / 10 + 1)].map((_, i) => y0 + i * 10),
		front = frontier(pts, "x").sort((a, b) => b.x - a.x).map(p => [X(p.x), Y(p.y)]),
		stairs = front.flatMap(([x, y], i) => i ? [[front[i - 1][0], y], [x, y]] : [[x, y]]),
		obstacles = [
			...pts.map(p => [[X(p.x) - R - 3, Y(p.y) - R - 3, X(p.x) + R + 3, Y(p.y) + R + 3], 1800]),
			...stairs.slice(1).map((s, i) => {
				const a = stairs[i];
				return [[Math.min(a[0], s[0]) - 2, Math.min(a[1], s[1]) - 2,
					Math.max(a[0], s[0]) + 2, Math.max(a[1], s[1]) + 2], 120];
			}),
		],
		labels = placeLabels(
			pts.map(p => ({ px: X(p.x), py: Y(p.y), text: p.short, author: p.author, score: p.y })),
			obstacles, { P, R, FONT },
		),
		xe = xt.map(X);
	memo = { key, val: { W: w, H, P, R, X, Y, pts, xt, yt, stairs, labels, ax: P.left - 14, ay: P.bottom + 14,
		x0: Math.min(...xe), x1: Math.max(...xe), y0, y1 } };
	return memo.val;
}

export const legend = ({ models, labs }, act) => {
	const orgs = Object.keys(COLORS).filter(o => models.some(m => m.author === o));
	return html`<div class="legend" role="group" aria-label="Filter by lab">
		${orgs.map(o => html`<button class="lab ${labs.has(o) ? "on" : ""}" title="${o}"
			aria-label="${o}" aria-pressed="${labs.has(o) ? "true" : "false"}"
			onclick="${() => act.lab(o)}">
			<svg viewBox="0 0 24 24" fill="${shade(COLORS[o], -.2)}" fill-rule="evenodd" aria-hidden="true">${
				LOGOS[o].map(d => svg`<path d="${d}"/>`)}</svg>
		</button>`)}
		<button class="clear" onclick="${() => act.lab(null)}" hidden="${!labs.size}">Show all</button>
	</div>`;
};

export const scatter = ({ models, metric, labs, hover, selected, tip, width }, act) => {
	const g = geometry(models, metric, labs, width), { P, X, Y, ax, ay } = g,
		m = tip && models.find(p => p.name === tip.name),
		title = metric === "cost" ? "Cost" : "Tokens";
	return html`<div class="plot">
		<svg class="${hover ? "chart dim" : "chart"}" viewBox="0 0 ${g.W} ${g.H}" role="group"
			aria-label="Performance versus relative ${metric}, one dot per model">
			${g.yt.map(v => svg`<line class="g" x1="${ax}" y1="${Y(v)}" x2="${P.right}" y2="${Y(v)}"/>`)}
			${g.xt.map(v => svg`<line class="g" x1="${X(v)}" y1="${P.top}" x2="${X(v)}" y2="${ay}"/>`)}
			<path d="M${ax} ${Y(g.y1)}V${Y(g.y0)}M${g.x0} ${ay}H${g.x1}" class="axis"/>
			${g.yt.map(v => svg`<text class="t" x="${ax - 8}" y="${Y(v) + 5}" text-anchor="end">${v}</text>`)}
			${g.xt.map(v => svg`<text class="t" x="${X(v)}" y="${ay + 24}" text-anchor="middle">${v}×</text>`)}
			<text class="k" x="${ax}" y="${P.top - 28}">Performance</text>
			<text class="k" x="${P.right}" y="${ay + 54}" text-anchor="end">${title} ↘</text>
			<polyline class="front" points="${g.stairs.join(" ")}"/>
			${g.labels.filter(l => l.leader).map(l => svg`<line class="lead" x1="${l.px}" y1="${l.py}"
				x2="${num(l.leader[0])}" y2="${num(l.leader[1])}" stroke="${COLORS[l.author]}"/>`)}
			${g.pts.map(p => svg`<circle class="${"dot" + (hover === p.name ? " on" : "") + (selected === p.name ? " sel" : "")}" cx="${X(p.x)}" cy="${Y(p.y)}"
				r="${g.R}" fill="${COLORS[p.author]}" tabindex="0" role="img"
				aria-label="${p.name}: index ${p.y.toFixed(1)}, ${times(p.x)} ${metric}"
				onmouseenter="${e => act.over(p.name, e.currentTarget)}" onfocus="${e => act.over(p.name, e.currentTarget)}"
				onclick="${() => act.select(p.name)}" onmouseleave="${() => act.over(null)}" onblur="${() => act.over(null)}"/>`)}
			${g.labels.map((l, i) => svg`<g class="${hover && hover !== g.pts[i].name ? "name faded" : "name"}"
				aria-hidden="true"><text class="h" x="${num(l.x)}" y="${num(l.y)}" text-anchor="${l.a}">${l.text}</text>
				<text class="l" x="${num(l.x)}" y="${num(l.y)}" text-anchor="${l.a}"
				style="fill:${shade(COLORS[l.author], -.3)}">${l.text}</text></g>`)}
		</svg>
		${m && html`<div class="tip" style="left:${Math.max(110, Math.min(width - 110, tip.left))}px;top:${tip.top}px">
			<strong>${m.name}</strong><span class="by">${m.author}</span>
			<dl><dt>Index</dt><dd>${m.y.toFixed(1)}</dd><dt>Rank</dt><dd>${m.rank} of ${models.length}</dd>
			<dt>Cost</dt><dd>${times(m.cost)}</dd><dt>Tokens</dt><dd>${times(m.tokens)}</dd></dl></div>`}
	</div>`;
};
