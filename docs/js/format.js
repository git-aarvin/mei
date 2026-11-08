export const pct = v => `${(v * 100).toFixed(1)}%`;
export const usd = v => `$${v >= 100 ? v.toFixed(0) : v.toFixed(2)}`;
export const times = v => `${+v.toPrecision(2)}×`;
export const tok = v =>
	v == null ? "n/a" : v >= 1e6 ? `${+(v / 1e6).toPrecision(3)}M` : `${Math.round(v / 1e3)}k`;
export const FMT = { pass: pct, cost: usd, tokens: tok };
// Axis ticks for a bar chart that starts at zero.
export function ticks(max) {
	const raw = max / 4, p = 10 ** Math.floor(Math.log10(raw)),
		step = [1, 2, 2.5, 5, 10].map(k => k * p).find(s => s >= raw);
	return Array.from({ length: Math.floor(max / step + 1e-9) + 1 }, (_, i) => i * step);
}
