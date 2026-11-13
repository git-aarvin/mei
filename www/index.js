const box = (element, across, down) => {
	const rect = element.getBBox();
	return [rect.x + across, rect.y + down, rect.x + rect.width + across, rect.y + rect.height + down];
};
const touches = (first, second) => first[0] < second[2] + 4 && first[2] > second[0] - 4 && first[1] < second[3] + 2 && first[3] > second[1] - 2;
const rounded = value => +value.toFixed(1);
const barPath = (left, top, width, height, radius) => {
	const r = Math.min(radius, width);
	return `M${rounded(left)} ${rounded(top)}H${rounded(left + width - r)}Q${rounded(left + width)} ${rounded(top)} ${rounded(left + width)} ${rounded(top + r)}V${rounded(top + height - r)}Q${rounded(left + width)} ${rounded(top + height)} ${rounded(left + width - r)} ${rounded(top + height)}H${rounded(left)}Z`;
};
for (const chart of document.querySelectorAll(`.chart`)) {
	const dots = [...chart.querySelectorAll(`.dot`)], ticks = [...chart.querySelectorAll(`.tick`)], across = chart.querySelector(`.across`), down = chart.querySelector(`.down`);
	if (!dots.length) continue;
	let frame;
	chart.onpointermove = event => {
		if (event.pointerType !== `mouse`) return;
		const spot = new DOMPoint(event.clientX, event.clientY).matrixTransform(chart.getScreenCTM().inverse());
		let nearest, distance = Infinity;
		for (const dot of dots) {
			const gap = Math.hypot(dot.cx.baseVal.value - spot.x, dot.cy.baseVal.value - spot.y);
			if (gap < distance) [nearest, distance] = [dot, gap];
		}
		const horizontal = nearest.cx.baseVal.value, vertical = nearest.cy.baseVal.value;
		chart.style.setProperty(`--across`, `${horizontal}px`);
		chart.style.setProperty(`--down`, `${vertical}px`);
		chart.dataset.lab = nearest.dataset.lab;
		across.textContent = nearest.dataset.edge;
		down.textContent = nearest.dataset.score;
		chart.classList.add(`snapping`);
		for (const element of chart.querySelectorAll(`[data-key]`)) element.classList.toggle(`snapped`, element.dataset.key === nearest.dataset.key);
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			const edges = [box(across, horizontal, 0), box(down, 0, vertical)];
			for (const tick of ticks) tick.style.visibility = edges.some(edge => touches(box(tick, 0, 0), edge)) ? `hidden` : ``;
		});
	};
	chart.onpointerleave = () => {
		cancelAnimationFrame(frame);
		chart.classList.remove(`snapping`);
		chart.style.removeProperty(`--across`);
		chart.style.removeProperty(`--down`);
		delete chart.dataset.lab;
		across.textContent = down.textContent = ``;
		for (const element of chart.querySelectorAll(`.snapped`)) element.classList.remove(`snapped`);
		for (const tick of ticks) tick.style.visibility = ``;
	};
}
for (const chart of document.querySelectorAll(`.bars .chart`)) {
	const references = [...chart.querySelectorAll(`.reference`)], values = [...chart.querySelectorAll(`.value`)];
	const ghosts = references.map(reference => ({
		reference,
		left: +reference.dataset.left,
		top: +reference.dataset.top,
		height: +reference.dataset.height,
		radius: +reference.dataset.radius,
		width: 0,
		from: 0,
		target: 0,
	}));
	let active, frame, start;
	const draw = () => {
		for (const ghost of ghosts) {
			if (ghost.width < .05) ghost.reference.removeAttribute(`d`);
			else ghost.reference.setAttribute(`d`, barPath(ghost.left, ghost.top, ghost.width, ghost.height, ghost.radius));
		}
	};
	const step = now => {
		const progress = Math.min(1, (now - start) / 160), eased = 1 - (1 - progress) ** 3;
		for (const ghost of ghosts) ghost.width = ghost.from + (ghost.target - ghost.from) * eased;
		draw();
		frame = progress < 1 ? requestAnimationFrame(step) : 0;
	};
	const retarget = () => {
		for (const ghost of ghosts) ghost.from = ghost.width;
		start = performance.now();
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(step);
	};
	const clear = () => {
		active = undefined;
		chart.classList.remove(`referencing`);
		for (const ghost of ghosts) ghost.target = 0;
		for (const value of values) value.classList.remove(`snapped`);
		retarget();
	};
	chart.onpointermove = event => {
		if (event.pointerType !== `mouse`) return;
		const bar = event.target.closest(`.bar`);
		if (!bar || bar.dataset.key === active) return;
		active = bar.dataset.key;
		const width = +bar.dataset.width;
		chart.classList.add(`referencing`);
		for (const ghost of ghosts) ghost.target = ghost.reference.dataset.key === active ? 0 : width;
		for (const value of values) value.classList.toggle(`snapped`, value.dataset.key === active);
		retarget();
	};
	chart.onpointerleave = clear;
}
const table = document.querySelector(`table`), body = table.tBodies[0], meters = [...table.querySelectorAll(`.meter`)];
table.onclick = event => {
	const header = event.target.closest(`th`);
	if (!header || !event.target.closest(`button`)) return;
	const state = header.getAttribute(`aria-sort`), next = state === `ascending` ? `descending` : state === `descending` ? `ascending` : header.dataset.first ?? `ascending`,
		value = row => row.cells[header.cellIndex].dataset.value,
		direction = next === `ascending` ? 1 : -1;
	for (const other of table.querySelectorAll(`th[aria-sort]`)) other.setAttribute(`aria-sort`, `none`);
	header.setAttribute(`aria-sort`, next);
	body.append(...[...body.rows].sort((first, second) => direction * (isNaN(value(first)) ? value(first).localeCompare(value(second)) : value(first) - value(second))));
};
table.onpointerover = event => {
	if (event.pointerType !== `mouse`) return;
	const cell = event.target.closest(`td.bar`);
	table.classList.toggle(`ghosting`, Boolean(cell));
	if (!cell) return;
	table.style.setProperty(`--width`, `${cell.dataset.value}%`);
	for (const meter of meters) meter.classList.toggle(`under`, +cell.dataset.value > +meter.parentNode.dataset.value);
};
table.onpointerleave = () => table.classList.remove(`ghosting`);
const compare = document.querySelector(`.compare`), svg = compare.querySelector(`.radar`), select = compare.querySelector(`select`), add = compare.querySelector(`.add`),
	chosen = compare.querySelector(`.chosen`), spare = compare.querySelector(`.picks .spare`), shapes = svg.querySelector(`.shapes`), idle = svg.querySelector(`.spare`),
	pairs = new Map([...chosen.children, ...spare.children].map((pick, index) => [pick, [...shapes.children, ...idle.children][index]]));
const refresh = () => {
	const picks = [...chosen.children];
	picks.forEach((pick, slot) => {
		pick.dataset.slot = pairs.get(pick).dataset.slot = slot;
		pick.querySelector(`button`).disabled = picks.length < 2;
		shapes.append(pairs.get(pick));
	});
	add.hidden = picks.length > 5;
	for (const option of select.options) option.hidden = picks.some(pick => pick.dataset.name === option.value);
	select.value = ``;
	select.focus();
};
select.onchange = () => {
	const pick = [...spare.children].find(item => item.dataset.name === select.value);
	if (!pick) return;
	chosen.append(pick);
	refresh();
};
chosen.onclick = event => {
	const pick = event.target.closest(`.pick`);
	if (!pick || !event.target.closest(`button`) || chosen.children.length < 2) return;
	spare.append(pick);
	idle.append(pairs.get(pick));
	refresh();
};
svg.onpointermove = event => {
	if (event.pointerType !== `mouse`) return;
	const spot = new DOMPoint(event.clientX, event.clientY).matrixTransform(svg.getScreenCTM().inverse());
	let nearest, distance = Infinity;
	for (const point of shapes.querySelectorAll(`.point`)) {
		const vertex = point.firstElementChild, gap = Math.hypot(vertex.cx.baseVal.value - spot.x, vertex.cy.baseVal.value - spot.y);
		if (gap <= distance) [nearest, distance] = [point, gap];
	}
	if (!nearest) return;
	const shape = nearest.parentNode;
	if (shape !== shapes.lastElementChild) shapes.append(shape);
	svg.querySelector(`.snapped`)?.classList.remove(`snapped`);
	nearest.classList.add(`snapped`);
	svg.classList.add(`snapping`);
	svg.dataset.slot = shape.dataset.slot;
	for (const label of svg.querySelectorAll(`.axis`)) label.classList.toggle(`active`, label.dataset.axis === nearest.dataset.axis);
};
svg.onpointerleave = () => {
	svg.classList.remove(`snapping`);
	svg.querySelector(`.snapped`)?.classList.remove(`snapped`);
	svg.querySelector(`.axis.active`)?.classList.remove(`active`);
	delete svg.dataset.slot;
	for (const pick of chosen.children) shapes.append(pairs.get(pick));
};
