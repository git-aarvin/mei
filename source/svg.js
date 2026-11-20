import { bar, color, fill, read, scatter, shade } from "./index.js";
const scatterGeometry = { left: 90, right: 1050, top: 50, bottom: 600, radius: 5, font: 18, pad: 14, gap: 22, drop: 38 };
const barGeometry = { left: 200, right: 1010, top: 50, bottom: 640, radius: 3, font: 16, pad: 14, gap: 22, drop: 26 };
const key = (labs, { right, top }) => labs.map((lab, index) => `<use href="#${lab.replace(/\s+/g, `-`)}" x="${right - 44 * (labs.length - index) + 22}" y="${top - 46}" width="22" height="22" fill="${shade(color(lab), .8)}" data-lab="${lab}"><title>${lab}</title></use>`).join(``);
export const charts = async list => {
	const result = [];
	for (const metric of [`cost`, `tokens`]) {
		const { axis, labs, markup } = scatter(list, metric, scatterGeometry);
		result.push({
			path: `scatter/${metric}.svg`,
			text: fill(await read(`scatter/${metric}.svg`), {
				axis: `<path class="axis" d="${axis}"/>`,
				legend: key(labs, scatterGeometry),
				plot: markup,
			}),
		});
	}
	for (const metric of [`cost`, `index`, `tokens`]) {
		const { axis, labs, markup } = bar(list, metric, barGeometry);
		result.push({
			path: `bar/${metric}.svg`,
			text: fill(await read(`bar/${metric}.svg`), {
				axis: `<path class="axis" d="${axis}"/>`,
				legend: key(labs, barGeometry),
				plot: markup,
			}),
		});
	}
	return result;
};
