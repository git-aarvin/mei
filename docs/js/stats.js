// Same maths as source/index.ts, so the page and the README charts agree.
export const mean = v => {
	const f = v.filter(Number.isFinite);
	return f.reduce((a, b) => a + b, 0) / f.length;
};
export const std = v => Math.sqrt(mean(v.map(x => (x - mean(v)) ** 2)));
export const median = v => {
	const s = [...v].sort((a, b) => a - b), m = s.length >> 1;
	return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
export const shade = (hex, k) => {
	const n = parseInt(hex.slice(1), 16);
	return "#" + [n >> 16, (n >> 8) & 255, n & 255]
		.map(c => Math.round(c * (1 + k)).toString(16).padStart(2, "0")).join("");
};
// Fits score = benchmark effect + model effect on a matrix with gaps (NaN).
export function modelEffects(m) {
	let a = m.map(() => 0), s = m[0].map(() => 0);
	for (let i = 0; i < 500; i++) {
		s = s.map((_, j) => mean(m.map((r, k) => r[j] - a[k])));
		a = m.map(r => mean(r.map((v, j) => v - s[j])));
	}
	return s.map(v => v - mean(s));
}
