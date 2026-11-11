import { html } from "./view.js";
import { colorOf, mean, shade, times } from "./data.js";
import { boxOf, finePointer, overlaps } from "./ui.js";

const WIDTH = 680;
const HEIGHT = 424;
const FONT_SIZE = 12;
const RADIUS = 4.5;
const PLOT = { left: 48, right: WIDTH - 16, top: 26, bottom: HEIGHT - 40 };
const round = value => +value.toFixed(1);

export const frontier = (points, key) =>
	points.filter(point => !points.some(other =>
		other[key] <= point[key] && other.y >= point.y &&
		(other[key] < point[key] || other.y > point.y)
	));

export function placeLabels(items, obstacles) {
	const merge = FONT_SIZE * 1.35;
	const line = FONT_SIZE * 1.35;
	const taken = [];
	const out = [];
	const hit = (a, b, pad) =>
		a[0] < b[2] + pad && a[2] + pad > b[0] && a[1] < b[3] + pad && a[3] + pad > b[1];
	const width = text => text.length * FONT_SIZE * 0.68;
	const fit = (x0, w) =>
		Math.max(PLOT.left + 6 - x0, Math.min(0, PLOT.right - 6 - x0 - w));
	const penalty = box => {
		let score = box[1] < PLOT.top - 20 || box[3] > PLOT.bottom - 4 ? 4000 : 0;
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
			const blocks = items.map(p => [p.px - RADIUS - 3, p.py - RADIUS - 3, p.px + RADIUS + 3, p.py + RADIUS + 3]);
			const dxs = [FONT_SIZE * 1.45, FONT_SIZE * 2.35, FONT_SIZE * 3.45];
			const oys = [0, -FONT_SIZE * 1.45, FONT_SIZE * 1.45, -FONT_SIZE * 2.9, FONT_SIZE * 2.9];
			for (const side of ["start", "end"]) {
				for (const dx of dxs) {
					for (const oy of oys) {
						let score = dx * 0.05 + Math.abs(oy) * 0.05;
						const placed = [];
						order.forEach((i, r) => {
							const item = items[i];
							const w = width(item.text);
							const y = cy + oy + (r - (order.length - 1) / 2) * line + FONT_SIZE * 0.3;
							const x = cx + (side === "start" ? dx : -dx);
							const x0 = side === "start" ? x : x - w;
							const shift = fit(x0, w);
							const box = [x0 + shift, y - FONT_SIZE * 0.78, x0 + shift + w, y + FONT_SIZE * 0.24];
							const lead = [
								side === "start" ? box[0] - 3 : box[2] + 3,
								y - FONT_SIZE * 0.28,
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
			const gap = (RADIUS + 8) * k;
			const diagonal = gap * 0.78;
			const h = FONT_SIZE * 0.34;
			const v = FONT_SIZE * 0.6;
			for (const [dx, dy, anchor] of [
				[gap, h, "start"],
				[-gap, h, "end"],
				[0, -gap - 3, "middle"],
				[0, gap + FONT_SIZE * 0.78, "middle"],
				[diagonal, -diagonal, "start"],
				[diagonal, diagonal + v, "start"],
				[-diagonal, -diagonal, "end"],
				[-diagonal, diagonal + v, "end"],
			]) {
				const x = item.px + dx;
				const y = item.py + dy;
				const x0 = anchor === "start" ? x : anchor === "end" ? x - w : x - w / 2;
				const shift = fit(x0, w);
				const box = [x0 + shift, y - FONT_SIZE * 0.78, x0 + shift + w, y + FONT_SIZE * 0.24];
				const score = tries++ * 0.35 + Math.abs(shift) * 0.35 + penalty(box);
				if (score < best.score) best = { score, x: x + shift, y, a: anchor, box };
			}
		}
		taken.push(best.box);
		out[n] = { ...item, ...best };
	});
	return out;
}

export function chart(models, metric, dark) {
	const points = models.map(model => ({ ...model, x: model[metric] }));
	const xs = points.map(point => point.x);
	const ys = points.map(point => point.y);
	const t0 = Math.log10(Math.min(...xs) * 0.9);
	const t1 = Math.log10(Math.max(...xs) * 1.1);
	const y0 = Math.floor(Math.min(...ys) / 10) * 10;
	const y1 = Math.ceil(Math.max(...ys) / 10) * 10;
	const X = value => PLOT.left + (t1 - Math.log10(value)) / (t1 - t0) * (PLOT.right - PLOT.left);
	const Y = value => PLOT.bottom - (value - y0) / (y1 - y0) * (PLOT.bottom - PLOT.top);
	const xHi = Math.floor(Math.log2(10 ** t1));
	const xLo = Math.ceil(Math.log2(10 ** t0));
	const allXTicks = [...Array(Math.max(0, xHi - xLo + 1))]
		.map((_, i) => 2 ** (xHi - i));
	const xTicks = allXTicks.length % 2
		? allXTicks.filter((_, i) => i % 2 === 0)
		: allXTicks;
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
			[X(point.x) - RADIUS - 3, Y(point.y) - RADIUS - 3,
				X(point.x) + RADIUS + 3, Y(point.y) + RADIUS + 3],
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
	);
	return html`<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" role="img" aria-label="Performance versus relative ${metric}. Higher is better; right is ${metric === "cost" ? "cheaper" : "leaner"}.">
		${yTicks.map(value =>
			html`<line class="grid" x1="${PLOT.left}" y1="${round(Y(value))}" x2="${PLOT.right}" y2="${round(Y(value))}"/>`
		)}
		${xTicks.map(value =>
			html`<line class="grid" x1="${round(X(value))}" y1="${PLOT.top}" x2="${round(X(value))}" y2="${PLOT.bottom}"/>`
		)}
		${yTicks.map(value =>
			html`<text class="tick" x="${PLOT.left - 7}" y="${round(Y(value)) + 4}" text-anchor="end">${value}</text>`
		)}
		${xTicks.map(value =>
			html`<text class="tick" x="${round(X(value))}" y="${PLOT.bottom + 16}" text-anchor="middle">${value}×</text>`
		)}
		${stairs.length > 1
			? html`<polyline class="front" points="${stairs.map(([x, y]) => `${round(x)},${round(y)}`).join(" ")}"/>`
			: ""}
		<g class="crosshairs" aria-hidden="true">
			<line class="crosshair crosshair-x" x1="0" y1="${PLOT.top}" x2="0" y2="${PLOT.bottom}" style="transform:translate(${PLOT.left}px,0)"/>
			<line class="crosshair crosshair-y" x1="${PLOT.left}" y1="0" x2="${PLOT.right}" y2="0" style="transform:translate(0,${PLOT.top}px)"/>
			<text class="edge edge-x" x="0" y="${PLOT.bottom + 16}" text-anchor="middle" style="transform:translate(${PLOT.left}px,0)"></text>
			<text class="edge edge-y" x="${PLOT.left - 7}" y="0" text-anchor="end" style="transform:translate(0,${PLOT.top}px)"></text>
		</g>
		${labels.map((label, i) => label.leader
			? html`<line class="leader" data-key="${i}" x1="${round(label.px)}" y1="${round(label.py)}" x2="${round(label.leader[0])}" y2="${round(label.leader[1])}" stroke="${colorOf(label.author)}" stroke-width="1.25"/>`
			: ""
		)}
		${points.map((point, i) =>
			html`<circle class="dot" data-key="${i}" cx="${round(X(point.x))}" cy="${round(Y(point.y))}" r="${RADIUS}" fill="${colorOf(point.author)}" data-index="${point.y.toFixed(1)}" data-cost="${times(point.cost)}" data-tokens="${times(point.tokens)}" aria-label="${point.short}: index ${point.y.toFixed(1)}, ${times(point[metric])} ${metric}"></circle>`
		)}
		${labels.map((label, i) =>
			html`<text class="label" data-key="${i}" x="${round(label.x)}" y="${round(label.y)}" text-anchor="${label.a}" fill="${shade(colorOf(label.author), dark ? 0.35 : -0.3)}">${label.text}</text>`
		)}
	</svg>`;
}

let tickFrame = 0;
export function resetChart(host) {
	cancelAnimationFrame(tickFrame);
	host.classList.remove("snapping");
	const svg = host.querySelector("svg");
	if (!svg) return;
	const vertical = svg.querySelector(".crosshair-x");
	const horizontal = svg.querySelector(".crosshair-y");
	const edgeX = svg.querySelector(".edge-x");
	const edgeY = svg.querySelector(".edge-y");
	if (vertical) vertical.style.transform = `translate(${PLOT.left}px,0)`;
	if (horizontal) horizontal.style.transform = `translate(0,${PLOT.top}px)`;
	if (edgeX) {
		edgeX.style.transform = `translate(${PLOT.left}px,0)`;
		edgeX.textContent = "";
		edgeX.style.fill = "";
	}
	if (edgeY) {
		edgeY.style.transform = `translate(0,${PLOT.top}px)`;
		edgeY.textContent = "";
		edgeY.style.fill = "";
	}
	for (const element of svg.querySelectorAll(".snapped")) element.classList.remove("snapped");
	for (const tick of svg.querySelectorAll(".tick")) tick.style.visibility = "";
}
export function bindChart(host, getMetric) {
	host.addEventListener("pointermove", event => {
		if (!finePointer.matches || event.pointerType === "touch") return;
		const svg = host.querySelector("svg");
		const vertical = svg?.querySelector(".crosshair-x");
		const horizontal = svg?.querySelector(".crosshair-y");
		const edgeX = svg?.querySelector(".edge-x");
		const edgeY = svg?.querySelector(".edge-y");
		const dots = svg?.querySelectorAll(".dot");
		if (!vertical || !horizontal || !edgeX || !edgeY || !dots?.length) return;
		const point = svg.createSVGPoint();
		point.x = event.clientX;
		point.y = event.clientY;
		const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
		let nearest = null;
		let distance = Infinity;
		for (const dot of dots) {
			const dx = +dot.getAttribute("cx") - x;
			const dy = +dot.getAttribute("cy") - y;
			const squared = dx * dx + dy * dy;
			if (squared < distance) {
				distance = squared;
				nearest = dot;
			}
		}
		if (!nearest) return;
		const cx = +nearest.getAttribute("cx");
		const cy = +nearest.getAttribute("cy");
		vertical.style.transform = `translate(${cx}px,0)`;
		horizontal.style.transform = `translate(0,${cy}px)`;
		edgeX.style.transform = `translate(${cx}px,0)`;
		edgeX.textContent = nearest.dataset[getMetric()];
		edgeY.style.transform = `translate(0,${cy + 4}px)`;
		edgeY.textContent = nearest.dataset.index;
		const color = nearest.getAttribute("fill");
		edgeX.style.fill = color;
		edgeY.style.fill = color;
		host.classList.add("snapping");
		const snapped = svg.querySelector(".dot.snapped");
		if (snapped !== nearest) {
			snapped?.classList.remove("snapped");
			nearest.classList.add("snapped");
			for (const element of svg.querySelectorAll(".label.snapped, .leader.snapped")) {
				element.classList.remove("snapped");
			}
			const key = nearest.dataset.key;
			for (const element of svg.querySelectorAll(`.label[data-key="${key}"], .leader[data-key="${key}"]`)) {
				element.classList.add("snapped");
			}
		}
		cancelAnimationFrame(tickFrame);
		tickFrame = requestAnimationFrame(() => {
			const edges = [boxOf(edgeX, cx, 0), boxOf(edgeY, 0, cy + 4)];
			for (const tick of svg.querySelectorAll(".tick")) {
				const box = boxOf(tick, 0, 0);
				const covered = edges.some(edge => overlaps(box, edge));
				tick.style.visibility = covered ? "hidden" : "";
			}
		});
	});
	host.addEventListener("pointerleave", () => resetChart(host));
}
