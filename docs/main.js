import { html, make } from "./view.js";
import { DEFAULT_DIR, computeModels, load } from "./data.js";
import { chart, bindChart, resetChart } from "./chart.js";
import { table, bindTable, resetTable } from "./table.js";
import { controls, radar, bindCompare, compareSelected, resetCompare } from "./compare.js";
import { darkScheme } from "./ui.js";

const chartEl = document.getElementById("chart");
const tableEl = document.getElementById("table");
const compareControlsEl = document.getElementById("compare-controls");
const compareChartEl = document.getElementById("compare-chart");
const metricButtons = [...document.querySelectorAll(".metric")];

let models = [];
let compareNames = [];
let metric = "cost";
let sort = { key: "y", dir: -1 };

function renderChart() {
	if (!models.length) return;
	make(chartEl, chart(models, metric, darkScheme.matches));
	resetChart(chartEl);
}
function renderTable() {
	make(tableEl, table(models, sort));
	resetTable(tableEl);
}
function renderCompare() {
	if (!models.length) return;
	compareNames = compareNames.filter(name => models.some(model => model.name === name));
	if (!compareNames.length) compareNames = [models[0].name];
	make(compareControlsEl, controls(models, compareNames));
	make(compareChartEl, radar(compareSelected(models, compareNames)));
	resetCompare(compareChartEl);
	const select = compareControlsEl.querySelector("select.compare-add");
	if (select) select.value = "";
}
function setMetric(next) {
	if (next === metric) return;
	metric = next;
	for (const button of metricButtons) {
		const on = button.dataset.metric === metric;
		button.classList.toggle("on", on);
		button.setAttribute("aria-pressed", String(on));
	}
	renderChart();
}
function setSort(key) {
	sort = {
		key,
		dir: sort.key === key ? -sort.dir : (DEFAULT_DIR[key] ?? 1),
	};
	renderTable();
	tableEl.querySelector(`[data-sort="${key}"]`)?.focus();
}
for (const button of metricButtons) {
	button.addEventListener("click", () => setMetric(button.dataset.metric));
}
bindChart(chartEl, () => metric);
bindTable(tableEl, setSort);
bindCompare({
	controls: compareControlsEl,
	chart: compareChartEl,
	add: name => {
		compareNames.push(name);
		renderCompare();
		compareControlsEl.querySelector("select.compare-add")?.focus();
	},
	remove: index => {
		compareNames.splice(index, 1);
		renderCompare();
		compareControlsEl.querySelector("select.compare-add")?.focus();
	},
});
darkScheme.addEventListener("change", () => {
	if (models.length) renderChart();
});
make(chartEl, html`<p class="note">Loading…</p>`);
load()
	.then(data => {
		models = computeModels(data);
		compareNames = models.slice(0, 2).map(model => model.name);
		renderTable();
		renderChart();
		renderCompare();
	})
	.catch(() => {
		make(chartEl, html`<p class="note">Could not load the data. <a href="https://github.com/git-aarvin/mei">View the source on GitHub</a>.</p>`);
	});
