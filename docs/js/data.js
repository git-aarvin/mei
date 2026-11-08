import { FILES } from "./config.js";

// Local copy first (serving the repo root), then the same raw URL the README images use.
const BASES = [
	"../source/json/",
	"https://raw.githubusercontent.com/git-aarvin/mei/refs/heads/main/source/json/",
];
const strip = t => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/,(\s*[}\]])/g, "$1");

async function get(file) {
	for (const base of BASES) {
		try {
			const res = await fetch(base + file);
			if (!res.ok) continue;
			const text = await res.text();
			return {
				rows: JSON.parse(strip(text)),
				note: (text.match(/\/\*([\s\S]*?)\*\//)?.[1] ?? "").replace(/\s+/g, " ").trim(),
			};
		} catch { /* try the next base */ }
	}
	throw new Error(`Could not load ${file}`);
}

export const load = () =>
	Promise.all(FILES.map(async ([file, family]) => ({ file, family, ...(await get(file)) })));
