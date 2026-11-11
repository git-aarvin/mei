import { html } from "./view.js";
import { BENCHMARKS, colorOf } from "./data.js";
import { finePointer } from "./ui.js";

const COMPARE_COLORS = ["#3b6fd4", "#2f9e6e", "#d9843b", "#9b5de5", "#d94f70", "#4aa3c7"];
const comparePalette = names =>
	names.map((_, index) => COMPARE_COLORS[index % COMPARE_COLORS.length]);

export const compareSelected = (models, names) => {
	const colors = comparePalette(names);
	return names.map((name, index) => ({
		model: models.find(model => model.name === name),
		color: colors[index],
	}));
};

export function controls(models, names) {
	const selected = compareSelected(models, names);
	const picks = selected.map(({ model, color }, index) => {
		const name = names.length > 1
			? html`<button type="button" class="compare-name" data-remove="${index}" aria-label="Remove ${model.short}">${model.short}</button>`
			: html`<span class="compare-name">${model.short}</span>`;
		const last = index === selected.length - 1;
		const afterComma = index > 0 && !(last && names.length >= 6);
		return html`<span class="compare-pick${names.length > 1 ? " removable" : ""}${afterComma ? " after-comma" : ""}"><span class="swatch" style="--dot:${color}"></span>${name}</span>`;
	});
	const add = names.length < 6
		? html`<span class="compare-add-wrap"><span class="compare-add-label" aria-hidden="true">…</span><select class="compare-add" aria-label="Add a model to the comparison"><option class="compare-add-placeholder" value="" selected disabled>…</option>${models
			.filter(option => !names.includes(option.name))
			.map(option => html`<option value="${option.name}"><span class="option-dot" style="--dot:${colorOf(option.author)}"></span>${option.short}</option>`)}</select></span>`
		: "";
	let sentence;
	if (!add) {
		sentence = [
			...picks.slice(0, -1).flatMap((pick, index) => index ? [", ", pick] : [pick]),
			", and ",
			picks.at(-1),
			".",
		];
	} else if (picks.length === 1) {
		sentence = [picks[0], " and", add];
	} else {
		sentence = [
			...picks.flatMap((pick, index) => index ? [", ", pick] : [pick]),
			", and",
			add,
		];
	}
	return html`<span class="compare-lead">Comparing</span> ${sentence}`;
}

export function radar(selected) {
	const width = 680;
	const height = 520;
	const cx = width / 2;
	const cy = height / 2 + 4;
	const radius = 174;
	const count = BENCHMARKS.length;
	const angle = index => -Math.PI / 2 + index * 2 * Math.PI / count;
	const round = value => +value.toFixed(1);
	const at = (index, value) => {
		const a = angle(index);
		const r = radius * value / 100;
		return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
	};
	const ring = value => BENCHMARKS
		.map((_, index) => at(index, value).map(round).join(","))
		.join(" ");
	const rings = [20, 40, 60, 80, 100].map(value =>
		html`<polygon class="ring" points="${ring(value)}"/>`
	);
	const axes = BENCHMARKS.map((_, index) => {
		const [x, y] = at(index, 100);
		return html`<line class="axis" x1="${round(cx)}" y1="${round(cy)}" x2="${round(x)}" y2="${round(y)}"/>`;
	});
	const ringLabels = [25, 50, 75, 100].map(value => {
		const [x, y] = at(0, value);
		return html`<text class="ring-label" x="${round(x + 5)}" y="${round(y + 3)}">${value}</text>`;
	});
	const labels = BENCHMARKS.map((benchmark, index) => {
		const a = angle(index);
		const x = cx + Math.cos(a) * (radius + 24);
		const y = cy + Math.sin(a) * (radius + 24) + 4;
		const anchor = Math.cos(a) > 0.25 ? "start" : Math.cos(a) < -0.25 ? "end" : "middle";
		return html`<text class="axis-label" data-axis="${index}" x="${round(x)}" y="${round(y)}" text-anchor="${anchor}">${benchmark}</text>`;
	});
	const shapes = Array.from({ length: 6 }, (_, modelIndex) => {
		const { model, color } = selected[modelIndex] ?? {};
		const available = model ? BENCHMARKS.map((benchmark, index) => {
			const z = model.bench[benchmark];
			return Number.isFinite(z)
				? { benchmark, index, value: Math.max(0, Math.min(100, 50 + 18 * z)) }
				: null;
		}).filter(Boolean) : [];
		const fill = available.length > 2
			? html`<polygon class="shape-fill" points="${available.map(({ index, value }) => at(index, value).map(round).join(",")).join(" ")}" fill="${color}" fill-opacity="0.1"/>`
			: "";
		const lines = available.map((point, index) => {
			if (available.length < 2 || (available.length === 2 && index === 1)) return "";
			const next = available[(index + 1) % available.length];
			const gap = (next.index - point.index + count) % count;
			const [x1, y1] = at(point.index, point.value);
			const [x2, y2] = at(next.index, next.value);
			return html`<line class="shape-line${gap > 1 ? " shape-gap" : ""}" x1="${round(x1)}" y1="${round(y1)}" x2="${round(x2)}" y2="${round(y2)}" stroke="${color}"/>`;
		});
		const vertices = available.map(({ benchmark, index, value }) => {
			const [x, y] = at(index, value);
			return html`<circle class="vertex" data-axis="${index}" data-x="${round(x)}" data-y="${round(y)}" data-benchmark="${benchmark}" data-value="${round(value)}" cx="${round(x)}" cy="${round(y)}" r="3.5" fill="${color}"/>`;
		});
		return html`<g data-model="${modelIndex}">${fill}${lines}${vertices}</g>`;
	});
	const names = selected.map(({ model }) => model.short).join(", ");
	return html`<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Performance by benchmark for ${names}" data-cx="${cx}" data-cy="${cy}" data-radius="${radius}" data-count="${count}">
		${rings}${axes}${ringLabels}${labels}
		<g class="shapes">${shapes}</g>
		<g class="snap-guides" aria-hidden="true">
			<text class="snap-label" text-anchor="middle"></text>
		</g>
	</svg>`;
}

export function resetCompare(host) {
	host.classList.remove("snapping");
	const svg = host.querySelector("svg");
	if (!svg) return;
	svg.querySelector(".vertex.snapped")?.classList.remove("snapped");
	for (const label of svg.querySelectorAll(".axis-label")) {
		label.classList.remove("active");
		label.style.fill = "";
	}
	const snap = svg.querySelector(".snap-label");
	if (snap) {
		snap.textContent = "";
		snap.style.fill = "";
	}
	const shapes = svg.querySelector(".shapes");
	if (!shapes) return;
	[...shapes.querySelectorAll(":scope > g[data-model]")]
		.sort((a, b) => Number(a.dataset.model) - Number(b.dataset.model))
		.forEach(group => shapes.appendChild(group));
}

export function bindCompare({ controls: controlsHost, chart, add, remove }) {
	controlsHost.addEventListener("change", event => {
		const select = event.target.closest("select.compare-add");
		if (!select || !select.value) return;
		add(select.value);
	});
	controlsHost.addEventListener("click", event => {
		const button = event.target.closest("[data-remove]");
		if (!button) return;
		remove(+button.dataset.remove);
	});
	chart.addEventListener("pointermove", event => {
		if (!finePointer.matches || event.pointerType === "touch") return;
		const svg = chart.querySelector("svg");
		const snapLabel = svg?.querySelector(".snap-label");
		const axisLabels = svg?.querySelectorAll(".axis-label");
		const vertices = svg?.querySelectorAll(".vertex");
		if (!svg || !snapLabel || !axisLabels?.length || !vertices?.length) return;
		const point = svg.createSVGPoint();
		point.x = event.clientX;
		point.y = event.clientY;
		const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse());
		let nearest = [];
		let distance = Infinity;
		for (const vertex of vertices) {
			const dx = +vertex.dataset.x - x;
			const dy = +vertex.dataset.y - y;
			const squared = dx * dx + dy * dy;
			if (squared < distance - 0.01) {
				distance = squared;
				nearest = [vertex];
			} else if (squared <= distance + 0.01) {
				nearest.push(vertex);
			}
		}
		if (!nearest.length) return;
		let chosen = nearest[0];
		if (nearest.length > 1) {
			const cx = +svg.dataset.cx;
			const cy = +svg.dataset.cy;
			const pointRadius = Math.hypot(+chosen.dataset.x - cx, +chosen.dataset.y - cy);
			const pointerRadius = Math.hypot(x - cx, y - cy);
			const ordered = nearest
				.map(vertex => ({ vertex, order: Number(vertex.closest("g[data-model]")?.dataset.model ?? 0) }))
				.sort((a, b) => a.order - b.order);
			chosen = pointerRadius < pointRadius ? ordered[0].vertex : ordered.at(-1).vertex;
		}
		const group = chosen.closest("g[data-model]");
		const shapes = svg.querySelector(".shapes");
		if (group && shapes && shapes.lastElementChild !== group) shapes.appendChild(group);
		const value = +chosen.dataset.value;
		const color = chosen.getAttribute("fill");
		const cx = +svg.dataset.cx;
		const cy = +svg.dataset.cy;
		const radius = +svg.dataset.radius;
		const count = +svg.dataset.count;
		const axis = Number(chosen.dataset.axis);
		const a = -Math.PI / 2 + axis * 2 * Math.PI / count;
		const labelRadius = Math.max(0, radius * value / 100 - 17);
		snapLabel.setAttribute("x", (cx + Math.cos(a) * labelRadius).toFixed(1));
		snapLabel.setAttribute("y", (cy + Math.sin(a) * labelRadius + 4).toFixed(1));
		snapLabel.setAttribute("text-anchor", Math.cos(a) > 0.25 ? "end" : Math.cos(a) < -0.25 ? "start" : "middle");
		snapLabel.textContent = value.toFixed(1);
		snapLabel.style.fill = color;
		for (const label of axisLabels) {
			const active = Number(label.dataset.axis) === axis;
			label.classList.toggle("active", active);
			label.style.fill = active ? color : "";
		}
		chart.classList.add("snapping");
		const snapped = svg.querySelector(".vertex.snapped");
		if (snapped !== chosen) {
			snapped?.classList.remove("snapped");
			chosen.classList.add("snapped");
		}
	});
	chart.addEventListener("pointerleave", () => resetCompare(chart));
}
