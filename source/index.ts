#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url),
	__dirname = path.dirname(__filename),
	DATA_DIR = path.join(__dirname, `json`),
	DEFAULT_OUTPUT = path.join(__dirname, `model-performance-cost.svg`),
	FILE_TO_BENCH = {
		"cursor.jsonc": `cursor`,
		"frontier.jsonc": `frontier`,
		"migration.jsonc": `code-migration`,
		"informatics.jsonc": `ioi`,
		"program.jsonc": `programbench`,
		"terminal.jsonc": `terminal-vals`,
		"brownfield.jsonc": `vcb-1-100`,
		"greenfield.jsonc": `vibe-code`,
	} as const,
	BENCH_TO_FAMILY = {
		cursor: `CursorBench`,
		frontier: `FrontierCode`,
		"code-migration": `Code Migration`,
		ioi: `IOI`,
		programbench: `ProgramBench`,
		"terminal-vals": `Terminal-Bench`,
		"vcb-1-100": `Vibe Code`,
		"vibe-code": `Vibe Code`,
	} as const,
	ORG_COLORS = {
		Anthropic: `#c66e53`,
		OpenAI: `#40947d`,
		Google: `#c28b3f`,
		xAI: `#6659b5`,
		DeepSeek: `#4e70a8`,
		Meta: `#35949c`,
	} as const,
	LOGOS = {
		Anthropic: [
			`M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z`,
		],
		OpenAI: [
			`M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z`,
		],
		Google: [
			`M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245z`,
			`M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 01-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23z`,
			`M5.84 14.175A6.65 6.65 0 015.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.831 10.831 0 001 12c0 1.772.436 3.447 1.197 4.938l3.642-2.763z`,
			`M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 016.398-4.572z`,
		],
		xAI: [
			`M6.469 8.776L16.512 23h-4.464L2.005 8.776H6.47zm-.004 7.9l2.233 3.164L6.467 23H2l4.465-6.324zM22 2.582V23h-3.659V7.764L22 2.582zM22 1l-9.952 14.095-2.233-3.163L17.533 1H22z`,
		],
		DeepSeek: [
			`M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z`,
		],
		Meta: [
			`M6.897 4c1.915 0 3.516.932 5.43 3.376l.282-.373c.19-.246.383-.484.58-.71l.313-.35C14.588 4.788 15.792 4 17.225 4c1.273 0 2.469.557 3.491 1.516l.218.213c1.73 1.765 2.917 4.71 3.053 8.026l.011.392.002.25c0 1.501-.28 2.759-.818 3.7l-.14.23-.108.153c-.301.42-.664.758-1.086 1.009l-.265.142-.087.04a3.493 3.493 0 01-.302.118 4.117 4.117 0 01-1.33.208c-.524 0-.996-.067-1.438-.215-.614-.204-1.163-.56-1.726-1.116l-.227-.235c-.753-.812-1.534-1.976-2.493-3.586l-1.43-2.41-.544-.895-1.766 3.13-.343.592C7.597 19.156 6.227 20 4.356 20c-1.21 0-2.205-.42-2.936-1.182l-.168-.184c-.484-.573-.837-1.311-1.043-2.189l-.067-.32a8.69 8.69 0 01-.136-1.288L0 14.468c.002-.745.06-1.49.174-2.23l.1-.573c.298-1.53.828-2.958 1.536-4.157l.209-.34c1.177-1.83 2.789-3.053 4.615-3.16L6.897 4zm-.033 2.615l-.201.01c-.83.083-1.606.673-2.252 1.577l-.138.199-.01.018c-.67 1.017-1.185 2.378-1.456 3.845l-.004.022a12.591 12.591 0 00-.207 2.254l.002.188c.004.18.017.36.04.54l.043.291c.092.503.257.908.486 1.208l.117.137c.303.323.698.492 1.17.492 1.1 0 1.796-.676 3.696-3.641l2.175-3.4.454-.701-.139-.198C9.11 7.3 8.084 6.616 6.864 6.616zm10.196-.552l-.176.007c-.635.048-1.223.359-1.82.933l-.196.198c-.439.462-.887 1.064-1.367 1.807l.266.398c.18.274.362.56.55.858l.293.475 1.396 2.335.695 1.114c.583.926 1.03 1.6 1.408 2.082l.213.262c.282.326.529.54.777.673l.102.05c.227.1.457.138.718.138.176.002.35-.023.518-.073.338-.104.61-.32.813-.637l.095-.163.077-.162c.194-.459.29-1.06.29-1.785l-.006-.449c-.08-2.871-.938-5.372-2.2-6.798l-.176-.189c-.67-.683-1.444-1.074-2.27-1.074z`,
		],
	} as const,
	SHORT_NAMES: Record<string, string> = {
		"Claude Opus 5.5": `Opus 5.5`,
		"Claude Fable 5.1": `Fable 5.1`,
		"Claude Sonnet 5.5": `Sonnet 5.5`,
		"Claude Haiku 5.5": `Haiku 5.5`,
		"Gemini Carbon 4": `Carbon 4`,
		"Gemini Argon 4": `Argon 4`,
		"GPT Astra 6": `Astra 6`,
		"GPT Sol 6.1": `Sol 6.1`,
		"GPT Luna 6": `Luna 6`,
		"Grok Grok 4.7": `Grok 4.7`,
	} as const,
	CHART = {
		width: 1100,
		height: 743,
		plot: { left: 90, right: 1050, top: 50, bottom: 600 },
		markerRadius: 5,
		labelSize: 18,
		xTicks: [4, 2, 1, .5, .25, .1],
		costPower: .5,
	} as const;
type Benchmark = typeof FILE_TO_BENCH[keyof typeof FILE_TO_BENCH];
type Family = typeof BENCH_TO_FAMILY[Benchmark];
type Organization = keyof typeof ORG_COLORS;
type AggregationMethod = `z` | `rank`;
type TextAnchor = `start` | `end` | `middle`;
interface RawBenchmarkRecord {
	label?: unknown;
	author?: unknown;
	model?: unknown;
	family?: unknown;
	series?: unknown;
	cost?: unknown;
	pass?: unknown;
}
interface BenchmarkRow {
	bench: Benchmark;
	fam: Family;
	model: string;
	author: Organization;
	cost: number;
	score: number;
	logCost: number;
	c: number;
	perf?: number;
}
interface ModelStats {
	perf: number;
	cost: number;
	nP: number;
}
interface BuildResult {
	stats: Record<string, ModelStats>;
	families: Family[];
	models: string[];
}
interface ModelPoint {
	n: string;
	author: Organization;
	x: number;
	y: number;
	k: number;
	lo: number;
	hi: number;
}
interface ComputedResult {
	rows: BenchmarkRow[];
	families: Family[];
	models: ModelPoint[];
	rankSpearman: number;
}
interface PointXY {
	x: number;
	y: number;
}
interface Box {
	x0: number;
	x1: number;
	y0: number;
	y1: number;
}
interface Obstacle extends Box {
	weight: number;
}
interface ChartItem {
	px: number;
	py: number;
	yLo: number;
	yHi: number;
	r: number;
	weight: number;
	text: string;
	color: string;
}
interface LabelPlacement {
	it: ChartItem;
	x: number;
	y: number;
	anchor: TextAnchor;
	box: Box;
	leader: boolean;
	penalty: number;
}
interface LabelOptions {
	bounds: { left: number; right: number; top: number; bottom: number };
	obstacles: Obstacle[];
	size: number;
}
interface SummaryModel {
	model: string;
	organization: Organization;
	performanceIndex: number;
	lower: number;
	upper: number;
	relativeCost: number;
	familiesCovered: number;
}
interface Summary {
	source: string;
	includedBenchmarkRows: number;
	modelCount: number;
	benchmarkFamilies: Family[];
	aggregation: string;
	uncertainty: string;
	rankSpearman: number;
	models: SummaryModel[];
	frontier: string[];
}
function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value == `object` && !!value && !Array.isArray(value);
}
function isOrganization(value: unknown): value is Organization {
	return typeof value == `string` && Object.hasOwn(ORG_COLORS, value);
}
function stripJsonc(source: string): string {
	let out = ``, i = 0;
	for (; i < source.length;) {
		let ch = source[i], next = source[i + 1];
		if (ch === `"`) {
			let j = i + 1;
			for (; j < source.length && source[j] !== `"`;) {
				j += source[j] === `\\` ? 2 : 1;
			}
			if (j >= source.length) {
				throw SyntaxError(`Unterminated string in JSONC input`);
			}
			out += source.slice(i, j + 1), i = j + 1;
		} else if (ch === `/` && next === `/`) {
			for (
				;
				i < source.length && source[i] !== `
`;
			) i++;
		} else if (ch === `/` && next === `*`) {
			let end = source.indexOf(`*/`, i + 2);
			if (end < 0) {
				throw SyntaxError(`Unterminated block comment in JSONC input`);
			}
			out += ` `, i = end + 2;
		} else {
			ch === `}` || ch === `]`
				? (out = out.replace(/,\s*$/, ``) + ch, i++)
				: (out += ch, i++);
		}
	}
	return out;
}
function parseJsonc<T = unknown>(source: string): T {
	return JSON.parse(stripJsonc(source));
}
const isFiniteNumber = Number.isFinite;
function mean(values: readonly number[]): number {
	let sum = 0, count = 0;
	for (let value of values) {
		isFiniteNumber(value) && (sum += value, count++);
	}
	return count ? sum / count : NaN;
}
function stdPop(values: readonly number[]): number {
	let m = mean(values);
	return Math.sqrt(
		mean(values.filter(isFiniteNumber).map(v => (v - m) ** 2)),
	);
}
function median(values: readonly number[]): number {
	if (!values.length) return NaN;
	let xs = [...values].sort((a, b) => a - b), mid = xs.length >> 1;
	return xs.length % 2 ? xs[mid] : (xs[mid - 1] + xs[mid]) / 2;
}
function averageRanks(values: readonly number[]): number[] {
	let sorted = values.map((v, i) => ({ v, i })).sort((a, b) =>
			a.v - b.v
		),
		ranks = Array(values.length);
	for (let i = 0; i < sorted.length;) {
		let j = i + 1;
		for (; j < sorted.length && sorted[j].v === sorted[i].v;) j++;
		for (let k = i; k < j; k++) ranks[sorted[k].i] = (i + 1 + j) / 2;
		i = j;
	}
	return ranks.map(r => r / values.length);
}
function pearson(a: readonly number[], b: readonly number[]): number {
	let ma = mean(a), mb = mean(b);
	return mean(a.map((v, i) => (v - ma) * (b[i] - mb)))
		/ (stdPop(a) * stdPop(b));
}
function spearman(a: readonly number[], b: readonly number[]): number {
	return pearson(averageRanks(a), averageRanks(b));
}
function groupBy<T, K>(
	items: readonly T[],
	keyFn: (item: T) => K,
): Map<K, T[]> {
	let groups = new Map();
	for (let item of items) {
		let key = keyFn(item);
		groups.has(key) || groups.set(key, []), groups.get(key).push(item);
	}
	return groups;
}
function additiveColumnEffects(matrix: readonly number[][]): number[] {
	let a = Array(matrix.length).fill(0),
		s = Array(matrix[0].length).fill(0);
	for (let iter = 0; iter < 1e3; iter++) {
		let prev = s;
		s = prev.map((_, j) => mean(matrix.map((row, i) => row[j] - a[i])));
		for (let i = 0; i < a.length; i++) {
			a[i] = mean(matrix[i].map((v, j) => v - s[j]));
		}
		let delta = Math.max(
			0,
			...s.map((v, j) => Math.abs(v - prev[j])).filter(isFiniteNumber),
		);
		if (iter && delta < 1e-12) break;
	}
	let shift = mean(s);
	return s.map(v => v - shift);
}
function modelName(row: RawBenchmarkRecord): string {
	if (row.label) return String(row.label);
	if (row.author === `Meta`) return `${row.model} ${row.family}`.trim();
	let series = String(row.series ?? ``).trim();
	return `${row.model} ${row.family} ${series}`.trim();
}
function loadRows(dataDir: string = DATA_DIR): BenchmarkRow[] {
	let rows: BenchmarkRow[] = [], seen = new Set<string>();
	for (
		let file of (Object.keys(FILE_TO_BENCH) as Array<
			keyof typeof FILE_TO_BENCH
		>).sort()
	) {
		let bench = FILE_TO_BENCH[file], fam = BENCH_TO_FAMILY[bench];
		if (!fam) {
			throw Error(
				`No benchmark family configured for ${bench} (${file})`,
			);
		}
		let filePath = path.join(dataDir, file), records: unknown;
		try {
			records = parseJsonc<unknown>(fs.readFileSync(filePath, `utf8`));
		} catch (err) {
			throw Error(
				`Could not read ${filePath}: ${
					err instanceof Error ? err.message : String(err)
				}`,
			);
		}
		if (!Array.isArray(records)) {
			throw Error(`${file}: expected a top-level array`);
		}
		for (let value of records as unknown[]) {
			if (!isRecord(value)) {
				throw Error(
					`Invalid record in ${file}: ${JSON.stringify(value)}`,
				);
			}
			let raw = value as RawBenchmarkRecord,
				cost = Number(raw.cost),
				score = Number(raw.pass);
			if (!(cost > 0) || !isFiniteNumber(score)) {
				throw Error(
					`Invalid record in ${file}: ${JSON.stringify(raw)}`,
				);
			}
			if (!isOrganization(raw.author)) {
				throw Error(`Unknown organization in ${file}: ${raw.author}`);
			}
			let model = modelName(raw), key = `${bench}\u0000${model}`;
			if (seen.has(key)) {
				throw Error(`Duplicate record for ${model} in ${file}`);
			}
			seen.add(key),
				rows.push({
					bench,
					fam,
					model,
					author: raw.author,
					cost,
					score,
					logCost: Math.log10(cost),
					c: 0,
				});
		}
	}
	for (let group of groupBy(rows, r => r.bench).values()) {
		let med = median(group.map(r => r.logCost));
		for (let row of group) row.c = row.logCost - med;
	}
	return rows;
}
function build(
	rows: readonly BenchmarkRow[],
	method: AggregationMethod = `z`,
): BuildResult {
	let transformed: Array<BenchmarkRow & { perf: number }> = [];
	for (let group of groupBy(rows, r => r.bench).values()) {
		let scores = group.map(r => r.score),
			average = mean(scores),
			deviation = stdPop(scores) || 1,
			perf = method === `z`
				? scores.map(score => (score - average) / deviation)
				: averageRanks(scores).map(rank => rank * 2 - 1);
		group.forEach((row, i) =>
			transformed.push({ ...row, perf: perf[i] })
		);
	}
	let groups = groupBy(transformed, r => `${r.fam}\u0000${r.model}`),
		families = [
			...new Set([...groups.values()].map(([row]) => row.fam)),
		].sort(),
		models = [
			...new Set([...groups.values()].map(([row]) => row.model)),
		].sort(),
		aggregates = new Map<string, { perf: number; cost: number }>(
			[...groups].map((
				[key, group],
			) => [key, {
				perf: mean(group.map(r => r.perf)),
				cost: mean(group.map(r => r.c)),
			}]),
		),
		table = (field: `perf` | `cost`): number[][] =>
			families.map(family =>
				models.map(model =>
					aggregates.get(`${family}\u0000${model}`)?.[field] ?? NaN
				)
			),
		P = table(`perf`),
		C = table(`cost`),
		pValues = additiveColumnEffects(P),
		cValues = additiveColumnEffects(C);
	return {
		stats: Object.fromEntries(
			models.map((
				model,
				i,
			) => [model, {
				perf: pValues[i],
				cost: cValues[i],
				nP: P.filter(row => isFiniteNumber(row[i])).length,
			}]),
		),
		families,
		models,
	};
}
function toIndex(
	perfByModel: Record<string, number>,
	models: readonly string[],
): Record<string, number> {
	let sd = stdPop(models.map(m => perfByModel[m])) || 1;
	return Object.fromEntries(
		models.map(m => [m, 50 + 10 * perfByModel[m] / sd]),
	);
}
function compute(rows: BenchmarkRow[] = loadRows()): ComputedResult {
	let built = build(rows, `z`),
		{ models, families } = built,
		authors = new Map<string, Organization>(
			rows.map(r => [r.model, r.author]),
		),
		index = toIndex(
			Object.fromEntries(models.map(m => [m, built.stats[m].perf])),
			models,
		),
		loo = families.map(fam => {
			let reduced = build(rows.filter(r => r.fam !== fam), `z`);
			return toIndex(
				Object.fromEntries(
					reduced.models.map(m => [m, reduced.stats[m].perf]),
				),
				reduced.models,
			);
		}),
		points: ModelPoint[] = models.map(model => {
			let values = loo.map(v => v[model]).filter(isFiniteNumber),
				author = authors.get(model);
			if (!author) {
				throw Error(`Missing organization for model ${model}`);
			}
			return {
				n: model,
				author,
				x: 10 ** built.stats[model].cost,
				y: index[model],
				k: built.stats[model].nP,
				lo: Math.min(...values),
				hi: Math.max(...values),
			};
		}).sort((a, b) => b.y - a.y),
		rankBuilt = build(rows, `rank`);
	return {
		rows,
		families,
		models: points,
		rankSpearman: spearman(
			models.map(m => built.stats[m].perf),
			models.map(m => rankBuilt.stats[m].perf),
		),
	};
}
function paretoFrontier(points: readonly ModelPoint[]): ModelPoint[] {
	return points.filter(p =>
		!points.some(q =>
			q.n !== p.n && q.x <= p.x && q.y >= p.y
			&& (q.x < p.x || q.y > p.y)
		)
	).sort((a, b) => b.x - a.x);
}
const esc = (s: string): string =>
		String(s).replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(
			/>/g,
			`&gt;`,
		).replace(/"/g, `&quot;`),
	num = (v: number): number => Number(v.toFixed(2));
function shade(hex: string, amount: number): string {
	let n = parseInt(hex.slice(1), 16);
	return `#`
		+ [n >> 16, n >> 8 & 255, n & 255].map(c =>
			Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount)
				.toString(16).padStart(2, `0`)
		).join(``);
}
function displayName(point: ModelPoint): string {
	return (SHORT_NAMES[point.n] ?? point.n).replace(
		RegExp(`^${point.author}\\s+`, `i`),
		``,
	);
}
const textWidth = (s: string, size: number): number =>
	s.length * size * .6;
function stairVertices(
	frontierPx: readonly PointXY[],
): Array<[number, number]> {
	return frontierPx.length
		? [
			[frontierPx[0].x, frontierPx[0].y],
			...frontierPx.slice(1).flatMap((
				p,
				i,
			) => [
				[frontierPx[i].x, p.y] as [number, number],
				[p.x, p.y] as [number, number],
			]),
		]
		: [];
}
function placeLabels(
	items: readonly ChartItem[],
	{ bounds, obstacles, size }: LabelOptions,
): LabelPlacement[] {
	let h = size,
		boxFor = (
			x: number,
			y: number,
			anchor: TextAnchor,
			w: number,
		): Box => {
			let x0 = anchor === `start`
				? x
				: anchor === `end`
				? x - w
				: x - w / 2;
			return { x0, x1: x0 + w, y0: y - h * .78, y1: y + h * .24 };
		},
		hit = (a: Box, b: Box, pad: number): boolean =>
			a.x0 < b.x1 + pad && a.x1 + pad > b.x0 && a.y0 < b.y1 + pad
			&& a.y1 + pad > b.y0,
		crowd = (it: ChartItem): number =>
			items.filter(o =>
				o !== it && Math.hypot(o.px - it.px, o.py - it.py) < 160
			).length,
		placed: LabelPlacement[] = [];
	for (let it of items.slice().sort((a, b) => crowd(b) - crowd(a))) {
		let w = textWidth(it.text, size),
			candidates: Array<[number, number, TextAnchor, boolean]> = [];
		for (let k of [1, 2.1, 3.2]) {
			let g = (it.r + 8) * k, d = g * .78, lead = k > 1;
			candidates.push(
				[it.px + g, it.py + h * .34, `start`, lead],
				[it.px - g, it.py + h * .34, `end`, lead],
				[it.px, it.py - g - 3, `middle`, lead],
				[it.px, it.py + g + h * .78, `middle`, lead],
				[it.px + d, it.py - d, `start`, lead],
				[it.px + d, it.py + d + h * .6, `start`, lead],
				[it.px - d, it.py - d, `end`, lead],
				[it.px - d, it.py + d + h * .6, `end`, lead],
			);
		}
		candidates.push(
			[it.px, it.yHi - 10, `middle`, !1],
			[it.px, it.yLo + 10 + h * .78, `middle`, !1],
		);
		let best: Omit<LabelPlacement, `it`> | null = null;
		for (let [i, [x, y, anchor, leader]] of candidates.entries()) {
			let box = boxFor(x, y, anchor, w), shift = 0;
			box.x0 < bounds.left
				? shift = bounds.left - box.x0
				: box.x1 > bounds.right && (shift = bounds.right - box.x1),
				shift
				&& (box = { ...box, x0: box.x0 + shift, x1: box.x1 + shift });
			let penalty = i * .5 + Math.abs(shift) * .5;
			(box.y0 < bounds.top || box.y1 > bounds.bottom)
				&& (penalty += 1e3);
			let dist = (o: ChartItem): number =>
					Math.hypot(
						Math.max(box.x0 - o.px, 0, o.px - box.x1),
						Math.max(box.y0 - o.py, 0, o.py - box.y1),
					),
				own = Math.hypot(
					Math.max(box.x0 - it.px, 0, it.px - box.x1),
					Math.max(box.y0 - it.yLo, 0, it.yHi - box.y1),
				);
			items.some(o => o !== it && dist(o) < own + 4)
				&& (penalty += 300);
			for (let o of obstacles) hit(box, o, 2) && (penalty += o.weight);
			for (let p of placed) hit(box, p.box, 5) && (penalty += 500);
			(!best || penalty < best.penalty)
				&& (best = { penalty, x: x + shift, y, anchor, box, leader });
		}
		best && placed.push({ it, ...best });
	}
	return placed;
}
function renderSvg(
	computed: ComputedResult,
	frontier: readonly ModelPoint[],
): string {
	let { width: W, height: H, plot, markerRadius: R, labelSize } = CHART,
		pts = computed.models,
		xMin = Math.min(...pts.map(p => p.x)) * .9,
		xMax = Math.max(...pts.map(p => p.x)) * 1.1,
		yMin = Math.floor(Math.min(...pts.map(p => p.lo)) / 10) * 10,
		yMax = Math.ceil(Math.max(...pts.map(p => p.hi)) / 10) * 10,
		costT = (v: number): number => v ** CHART.costPower,
		tMin = costT(xMin),
		tMax = costT(xMax),
		xScale = (v: number): number =>
			num(
				plot.left
					+ (tMax - costT(v)) / (tMax - tMin)
						* (plot.right - plot.left),
			),
		yScale = (v: number): number =>
			num(
				plot.bottom
					- (v - yMin) / (yMax - yMin) * (plot.bottom - plot.top),
			),
		tickXs = CHART.xTicks.filter(v => v <= xMax && v >= xMin),
		tickYs = Array.from(
			{ length: Math.floor((yMax - yMin) / 10) + 1 },
			(_, i) => yMin + i * 10,
		),
		items: ChartItem[] = pts.map(p => ({
			px: xScale(p.x),
			py: yScale(p.y),
			yLo: yScale(p.lo),
			yHi: yScale(p.hi),
			r: R,
			weight: 500,
			text: displayName(p),
			color: ORG_COLORS[p.author],
		})),
		stairs = stairVertices(
			frontier.map(p => ({ x: xScale(p.x), y: yScale(p.y) })),
		),
		obstacles: Obstacle[] = [];
	for (let it of items) {
		obstacles.push({
			x0: it.px - R - 3,
			x1: it.px + R + 3,
			y0: it.py - R - 3,
			y1: it.py + R + 3,
			weight: 400,
		}),
			obstacles.push({
				x0: it.px - 2,
				x1: it.px + 2,
				y0: it.yHi,
				y1: it.yLo,
				weight: 200,
			});
	}
	for (let i = 1; i < stairs.length; i++) {
		let [x1, y1] = stairs[i - 1], [x2, y2] = stairs[i];
		obstacles.push({
			x0: Math.min(x1, x2) - 2,
			x1: Math.max(x1, x2) + 2,
			y0: Math.min(y1, y2) - 2,
			y1: Math.max(y1, y2) + 2,
			weight: 150,
		});
	}
	let labels = placeLabels(items, {
			bounds: {
				left: plot.left + 6,
				right: plot.right - 6,
				top: plot.top - 20,
				bottom: plot.bottom - 4,
			},
			obstacles,
			size: labelSize,
		}),
		xEdges = [...pts.map(p => xScale(p.x)), ...tickXs.map(xScale)],
		yEdges = [
			...pts.map(p => yScale(p.lo)),
			...pts.map(p => yScale(p.hi)),
			...tickYs.map(yScale),
		],
		axisX = plot.left - 14,
		axisY = plot.bottom + 14,
		orgs = (Object.keys(ORG_COLORS) as Organization[]).filter(o =>
			pts.some(p => p.author === o)
		),
		svg = [
			`<?xml version="1.0" encoding="UTF-8"?>`,
			`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">`,
			`<title id="title">Model performance versus relative benchmark cost</title>`,
			`<desc id="desc">${pts.length} models, colored by lab. Higher is better performing; further right is cheaper. A thin line on each point shows the range of its index when each benchmark family is left out in turn. The stepped line joins models that no other model beats on both cost and performance.</desc>`,
			`<rect width="${W}" height="${H}" fill="#ffffff"/>`,
			`<g transform="translate(0 35)">`,
			`<style>
  text { font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; fill: #222; }
  .tick { font-size: 15px; fill: #777; }
  .axis-label { font-size: 15px; fill: #555; }
  .label { font-size: ${labelSize}px; }
  .halo { font-size: ${labelSize}px; fill: #ffffff; stroke: #ffffff; stroke-width: 6px; stroke-linejoin: round; }
  .grid { stroke: #e7e4d8; stroke-width: 1; }
</style>`,
		];
	for (let tick of tickYs) {
		let y = yScale(tick);
		svg.push(
			`<line class="grid" x1="${axisX}" y1="${y}" x2="${plot.right}" y2="${y}"/>`,
		);
	}
	for (let tick of tickXs) {
		let x = xScale(tick);
		svg.push(
			`<line class="grid" x1="${x}" y1="${plot.top}" x2="${x}" y2="${axisY}"/>`,
		);
	}
	svg.push(
		`<line x1="${axisX}" y1="${
			Math.min(...yEdges)
		}" x2="${axisX}" y2="${
			Math.max(...yEdges)
		}" stroke="#777" stroke-width="1"/>`,
		`<line x1="${Math.min(...xEdges)}" y1="${axisY}" x2="${
			Math.max(...xEdges)
		}" y2="${axisY}" stroke="#777" stroke-width="1"/>`,
	);
	for (let tick of tickYs) {
		svg.push(
			`<text class="tick" x="${axisX - 8}" y="${
				num(yScale(tick) + 5)
			}" text-anchor="end">${tick}</text>`,
		);
	}
	for (let tick of tickXs) {
		svg.push(
			`<text class="tick" x="${xScale(tick)}" y="${
				axisY + 24
			}" text-anchor="middle">${tick}×</text>`,
		);
	}
	svg.push(
		`<text class="axis-label" x="${axisX}" y="${
			plot.top - 28
		}">Performance</text>`,
		`<text class="axis-label" x="${plot.right}" y="${
			axisY + 54
		}" text-anchor="end">Cost <tspan font-size="1.35em" dy="0.03em">\u2198</tspan></text>`,
	);
	let kx = plot.right;
	for (let o of orgs.slice().reverse()) {
		kx -= 22,
			svg.push(
				`<g transform="translate(${num(kx)} ${plot.top - 46}) scale(${
					num(22 / 24)
				})" fill="${
					shade(ORG_COLORS[o], -.2)
				}" fill-rule="evenodd"><title>${esc(o)}</title>${
					LOGOS[o].map(d => `<path d="${d}"/>`).join(``)
				}</g>`,
			),
			kx -= 22;
	}
	stairs.length > 1
		&& svg.push(
			`<polyline points="${
				stairs.map(v => v.join(`,`)).join(` `)
			}" fill="none" stroke="#a3a398" stroke-width="1.25" stroke-linejoin="round"/>`,
		);
	for (let it of items) {
		let bar = (
			x1: number,
			y1: number,
			x2: number,
			y2: number,
		): string =>
			`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${it.color}" stroke-width="1.5" opacity="0.55"/>`;
		svg.push(
			bar(it.px, it.yHi, it.px, it.yLo),
			bar(num(it.px - 5), it.yHi, num(it.px + 5), it.yHi),
			bar(num(it.px - 5), it.yLo, num(it.px + 5), it.yLo),
		);
	}
	for (let l of labels.filter(l => l.leader)) {
		svg.push(
			`<line x1="${l.it.px}" y1="${l.it.py}" x2="${
				num((l.box.x0 + l.box.x1) / 2)
			}" y2="${
				num((l.box.y0 + l.box.y1) / 2)
			}" stroke="${l.it.color}" stroke-width="0.9" opacity="0.7"/>`,
		);
	}
	for (let it of items) {
		svg.push(
			`<circle cx="${it.px}" cy="${it.py}" r="${R}" fill="${it.color}"/>`,
		);
	}
	for (let l of labels) {
		let at = `x="${num(l.x)}" y="${
			num(l.y)
		}" text-anchor="${l.anchor}"`;
		svg.push(
			`<text class="halo" ${at}>${esc(l.it.text)}</text>`,
			`<text class="label" ${at} style="fill:${
				shade(l.it.color, -.3)
			}">${esc(l.it.text)}</text>`,
		);
	}
	return svg.push(`</g>`, `</svg>`),
		svg.join(`
`) + `
`;
}
const round = (v: number, d = 2): number => Number(v.toFixed(d));
function buildSummary(
	computed: ComputedResult,
	frontier: readonly ModelPoint[],
): Summary {
	return {
		source: `JSONC benchmark records in the ./json directory.`,
		includedBenchmarkRows: computed.rows.length,
		modelCount: computed.models.length,
		benchmarkFamilies: computed.families,
		aggregation:
			`Within-benchmark z-scores; log10 cost centered on benchmark median; additive family/model effects; index = 50 + 10 per performance SD.`,
		uncertainty:
			`Minimum and maximum index over leave-one-benchmark-family-out recalculations.`,
		rankSpearman: round(computed.rankSpearman, 3),
		models: computed.models.map(p => ({
			model: p.n,
			organization: p.author,
			performanceIndex: round(p.y),
			lower: round(p.lo),
			upper: round(p.hi),
			relativeCost: round(p.x, 3),
			familiesCovered: p.k,
		})),
		frontier: frontier.map(p => p.n),
	};
}
function main(argv: string[] = process.argv.slice(2)): void {
	if (argv.includes(`-h`) || argv.includes(`--help`)) {
		console.log(`Usage: node index.ts [output.svg]`);
		return;
	}
	let output = path.resolve(argv[0] || DEFAULT_OUTPUT);
	fs.mkdirSync(path.dirname(output), { recursive: !0 });
	let computed = compute(),
		frontier = paretoFrontier(computed.models),
		summary = buildSummary(computed, frontier);
	fs.writeFileSync(output, renderSvg(computed, frontier), `utf8`),
		fs.writeFileSync(
			path.join(
				path.dirname(output),
				`model-performance-cost-summary.json`,
			),
			JSON.stringify(summary, null, 2) + `
`,
			`utf8`,
		),
		console.log(JSON.stringify(
			{
				svg: output,
				benchmarkRows: summary.includedBenchmarkRows,
				modelCount: summary.modelCount,
				families: summary.benchmarkFamilies,
				models: summary.models.map(m => ({
					model: m.model,
					index: m.performanceIndex,
					lo: m.lower,
					hi: m.upper,
					relativeCost: m.relativeCost,
					familiesCovered: m.familiesCovered,
				})),
				frontier: summary.frontier,
				rankSpearman: summary.rankSpearman,
			},
			null,
			2,
		));
}
export {
	additiveColumnEffects,
	averageRanks,
	build,
	compute,
	loadRows,
	mean,
	median,
	paretoFrontier,
	parseJsonc,
	placeLabels,
	renderSvg,
	spearman,
	stairVertices,
	stdPop,
	stripJsonc,
};
export type {
	BenchmarkRow,
	BuildResult,
	ComputedResult,
	Family,
	ModelPoint,
	Organization,
	Summary,
};
if (
	process.argv[1] !== void 0
	&& path.resolve(process.argv[1]) === __filename
) {
	try {
		main();
	} catch (err: unknown) {
		console.error(
			`Error: ${err instanceof Error ? err.message : String(err)}`,
		), process.exitCode = 1;
	}
}
