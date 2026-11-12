import { fill, load, models, read, scatter, write } from "./index.js";
const geometry = { left: 90, right: 1050, top: 50, bottom: 600, radius: 5, font: 18, pad: 14, gap: 22, drop: 38 };
const list = models(await load());
for (const metric of [`cost`, `tokens`]) {
	const { axis, labs, markup } = scatter(list, metric, geometry);
	await write(`${metric}.svg`, fill(await read(`${metric}.svg`), {
		axis: `<path class="axis" d="${axis}"/>`,
		legend: labs.map((lab, index) => `<use href="#${lab}" x="${geometry.right - 44 * (labs.length - index) + 22}" y="${geometry.top - 46}" width="22" height="22" data-lab="${lab}"><title>${lab}</title></use>`).join(``),
		plot: markup,
	}));
}
