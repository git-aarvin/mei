import { bar, fill, load, models, read, scatter, write } from "./index.js";
const scatterGeometry = { left: 90, right: 1050, top: 50, bottom: 600, radius: 5, font: 18, pad: 14, gap: 22, drop: 38 };
const barGeometry = { left: 200, right: 1010, top: 50, bottom: 640, radius: 3, font: 16, pad: 14, gap: 22, drop: 26 };
const key = (labs, { right, top }) => labs.map((lab, index) => `<use href="#${lab}" x="${right - 44 * (labs.length - index) + 22}" y="${top - 46}" width="22" height="22" data-lab="${lab}"><title>${lab}</title></use>`).join(``);
const list = models(await load());
for (const metric of [`cost`, `tokens`]) {
	const { axis, labs, markup } = scatter(list, metric, scatterGeometry);
	await write(`scatter/${metric}.svg`, fill(await read(`scatter/${metric}.svg`), {
		axis: `<path class="axis" d="${axis}"/>`,
		legend: key(labs, scatterGeometry),
		plot: markup,
	}));
}
for (const metric of [`cost`, `index`, `tokens`]) {
	const { axis, labs, markup } = bar(list, metric, barGeometry);
	await write(`bar/${metric}.svg`, fill(await read(`bar/${metric}.svg`), {
		axis: `<path class="axis" d="${axis}"/>`,
		legend: key(labs, barGeometry),
		plot: markup,
	}));
}
