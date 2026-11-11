import { html } from "./view.js";
import { colorOf, times } from "./data.js";
import { finePointer } from "./ui.js";

export function table(models, sort) {
	const rows = [...models].sort((a, b) => {
		const av = sort.key === "model" ? a.short : a[sort.key];
		const bv = sort.key === "model" ? b.short : b[sort.key];
		return sort.dir * (typeof av === "string" ? av.localeCompare(bv) : av - bv);
	}).map(model => {
		const pct = Math.max(0, Math.min(100, model.y)).toFixed(1);
		return html`<tr>
			<td class="rank">${model.rank}</td>
			<td class="model">${model.short} <span class="author">${model.author}</span></td>
			<td class="bar"><span class="meter" data-pct="${pct}" aria-hidden="true"><span class="meter-fill" style="width:${pct}%;background:${colorOf(model.author)}"></span><span class="meter-ghost"></span></span></td>
			<td class="num">${model.y.toFixed(1)}</td>
			<td class="num">${times(model.cost)}</td>
			<td class="num">${times(model.tokens)}</td>
		</tr>`;
	});
	const ariaSort = key => sort.key === key
		? (sort.dir > 0 ? "ascending" : "descending")
		: "none";
	return html`<table aria-label="Model rankings">
		<thead><tr>
			<th class="rank" scope="col" aria-sort="${ariaSort("rank")}"><button data-sort="rank">#</button></th>
			<th scope="col" aria-sort="${ariaSort("model")}"><button data-sort="model">Model</button></th>
			<th class="bar" scope="col"><span class="visually-hidden">Index bar</span></th>
			<th class="num" scope="col" aria-sort="${ariaSort("y")}"><button data-sort="y">Index</button></th>
			<th class="num" scope="col" aria-sort="${ariaSort("cost")}"><button data-sort="cost">Cost</button></th>
			<th class="num" scope="col" aria-sort="${ariaSort("tokens")}"><button data-sort="tokens">Tokens</button></th>
		</tr></thead>
		<tbody>${rows}</tbody>
	</table>`;
}

export function resetTable(host) {
	host.classList.remove("has-ghost");
	for (const ghost of host.querySelectorAll(".meter-ghost")) {
		ghost.style.width = "0";
		ghost.classList.remove("is-under");
	}
}

export function bindTable(host, onSort) {
	host.addEventListener("click", event => {
		const button = event.target.closest("[data-sort]");
		if (button) onSort(button.dataset.sort);
	});
	host.addEventListener("pointermove", event => {
		if (!finePointer.matches || event.pointerType === "touch") return;
		if (!event.target.closest("td.bar")) {
			resetTable(host);
			return;
		}
		const meter = event.target.closest(".meter");
		if (!meter) return;
		const width = +meter.dataset.pct;
		host.classList.add("has-ghost");
		for (const item of host.querySelectorAll(".meter")) {
			const ghost = item.querySelector(".meter-ghost");
			if (!ghost) continue;
			const self = item === meter;
			ghost.style.width = self ? "0" : `${width}%`;
			ghost.classList.toggle("is-under", !self && width > +item.dataset.pct);
		}
	});
	host.addEventListener("pointerleave", () => resetTable(host));
}
