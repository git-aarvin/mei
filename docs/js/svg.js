import { html } from "./vendor/view.js";

// View parses each template on its own, so a bare <g> or <circle> would land in the HTML
// namespace and never render. Wrapping fragments in a nested <svg> keeps them SVG; with
// overflow visible and no viewBox it shares the parent's coordinates exactly.
const wrapped = new WeakMap();
export const svg = (strings, ...values) => {
	let s = wrapped.get(strings);
	if (!s) {
		s = [...strings];
		s[0] = `<svg class="frag" overflow="visible">${s[0]}`;
		s[s.length - 1] += "</svg>";
		wrapped.set(strings, s);
	}
	return html(s, ...values);
};
