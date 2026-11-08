import { html, make } from "./vendor/view.js";
import { load } from "./data.js";
import { models, benchmarks } from "./model.js";
import { legend, scatter } from "./scatter.js";
import { rankings } from "./rankings.js";
import { bars } from "./bars.js";
import { heatmap } from "./heatmap.js";
import { detail } from "./detail.js";
import { ABOUT } from "./about.js";

const host = document.getElementById("app"),
	state = {
		models: [], benchmarks: [], error: null, width: 1100,
		metric: "cost", labs: new Set(), hover: null, selected: null, tip: null,
		sort: { key: "y", dir: -1 }, bench: 0, measure: "pass",
	},
	render = () => make(host, App()),
	set = patch => (Object.assign(state, patch), render()),
	act = {
		metric: metric => set({ metric, tip: null }),
		lab: o => {
			if (o) state.labs.has(o) ? state.labs.delete(o) : state.labs.add(o);
			else state.labs.clear();
			set({ tip: null });
		},
		over: (hover, el) => {
			let tip = null;
			if (hover && el) {
				const a = el.getBoundingClientRect(), b = el.closest(".plot").getBoundingClientRect();
				tip = { name: hover, left: a.left - b.left + a.width / 2, top: a.top - b.top };
			}
			set({ hover, tip });
		},
		sort: (key, dir) => set({ sort: { key, dir: state.sort.key === key ? -state.sort.dir : dir } }),
		select: name => {
			set({ selected: state.selected === name ? null : name });
			const r = document.getElementById("model")?.getBoundingClientRect();
			r && (r.top < 0 || r.bottom > innerHeight) && document.getElementById("model").scrollIntoView(
				{ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
		},
		bench: bench => set({ bench }),
		measure: measure => set({ measure }),
	};

const Seg = (value, options, on) => html`<div class="seg" role="group">${options.map(([k, t]) =>
	html`<button class="${k === value ? "on" : ""}" aria-pressed="${k === value ? "true" : "false"}"
		onclick="${() => on(k)}">${t}</button>`)}</div>`;

const App = () => {
	if (state.error) return html`<p class="status">${state.error}</p>`;
	if (!state.models.length) return html`<p class="status">Loading results…</p>`;
	const n = state.models.length, k = state.benchmarks.length;
	return html`
		<section id="chart">
			<div class="tools">
				${Seg(state.metric, [["cost", "Cost"], ["tokens", "Tokens"]], act.metric)}
				${legend(state, act)}
			</div>
			${scatter(state, act)}
			<p class="caption">Up and to the right is better. The line joins models that no other model shown beats on both score and ${state.metric}.</p>
		</section>
		<section id="model">
			<h2>Model</h2>
			${detail(state, act)}
		</section>
		<section id="rankings">
			<h2>Rankings</h2>
			<p class="intro">${n} models, scored on a scale where 50 is the average and 10 points is one standard deviation. Cost and tokens are relative: 1× is typical, and lower is cheaper.</p>
			${rankings(state, act)}
		</section>
		<section id="heatmap">
			<h2>Across benchmarks</h2>
			<p class="intro">Each dot is one model on one benchmark. Size shows how far it sits from that benchmark's average. A solid dot is above average, a ring is below, and a dash means the model wasn't tested.</p>
			${heatmap(state, act)}
		</section>
		<section id="benchmarks">
			<h2>Benchmarks</h2>
			<p class="intro">The raw results behind the index, one benchmark at a time. Filters and highlights carry over from the chart above.</p>
			${bars(state, act)}
		</section>
		<section id="method">
			<h2>Method</h2>
			<div class="prose">
				<p>Each benchmark has its own scale, so Mei standardises first. A model's result becomes the number of standard deviations it sits above or below the average of the models tested on that benchmark.</p>
				<p>Models don't appear in every benchmark. Mei fits a single additive model, score = benchmark effect + model effect, across all the gaps, so a model isn't rewarded for skipping a hard benchmark. The model effects are rescaled so the average is 50 and one standard deviation is 10.</p>
				<p>Cost and tokens go through the same fit on a log scale, relative to each benchmark's median. A model at 2× uses about twice as much as is typical, and one at 0.5× about half. Vibe Code's greenfield and brownfield runs are standardised separately and averaged into one benchmark.</p>
			</div>
		</section>
		<section id="sources">
			<h2>Sources</h2>
			<p class="intro">Benchmark results are reproduced for aggregation and comparison. All benchmark data and methodology are attributed to the organisations below.</p>
			<ul class="sources">${state.benchmarks.map(b => html`<li><strong>${b.title}</strong>${ABOUT[b.family]} ${b.note}</li>`)}</ul>
		</section>`;
};

const fit = () => {
	const pad = innerWidth < 640 ? 16 : 24,
		width = Math.max(320, Math.min(1100, document.body.clientWidth - 2 * pad));
	width !== state.width && set({ width });
};
new ResizeObserver(fit).observe(document.body);
document.fonts?.ready.then(() => { state.models.length && render(); });
render();
load().then(data => set({ models: models(data), benchmarks: benchmarks(data), width: state.width }))
	.then(fit)
	.catch(e => set({ error: `${e.message}. Check your connection and reload.` }));
