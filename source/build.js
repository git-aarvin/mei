import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { renderAsync } from "@resvg/resvg-js";
import { load, models } from "./index.js";
import { encodePng } from "./png.js";
import { charts } from "./svg.js";
import { readme } from "./readme.js";
import { page } from "./www.js";
const root = new URL(`../www/`, import.meta.url);
const scale = 6.25;
const font = {
	defaultFontFamily: `DejaVu Sans`,
	fontFiles: [fileURLToPath(import.meta.resolve(`dejavu-fonts-ttf/ttf/DejaVuSans.ttf`))],
	loadSystemFonts: false,
};
const write = (path, data) => writeFile(new URL(path, root), data);
const rasterize = async ({ path, text }) => {
	const image = await renderAsync(text, {
		background: `#ffffff`,
		fitTo: { mode: `zoom`, value: scale },
		font,
	});
	return write(path.replace(/\.svg$/, `.png`), await encodePng(image));
};
const list = models(await load());
const [svg, html] = await Promise.all([charts(list), page(list)]);
await Promise.all([
	mkdir(new URL(`bar/`, root), { recursive: true }),
	mkdir(new URL(`scatter/`, root), { recursive: true }),
]);
await Promise.all([
	...svg.map(chart => write(chart.path, chart.text)),
	...svg.map(rasterize),
	write(`index.html`, html),
	writeFile(new URL(`../README.md`, import.meta.url), readme(list)),
]);
