import { SHORT } from "./config.js";
import { mean } from "./stats.js";

// Label placement ported from source/index.ts, parametrised so it can follow the chart size.
export const label = (p) => (SHORT[p.name] ?? p.name).replace(RegExp(`^${p.author}\\s+`, `i`), ``).replace(/\b(?:Muse|1017)\b/gi, ``).replace(/\s+/g, ` `).trim();
export function placeLabels(items, obstacles, { P, R, FONT }) {
  const MERGE = 24, LINE = FONT * 1.35;
  let taken = [], out = [], hit = (a, b, pad) => a[0] < b[2] + pad && a[2] + pad > b[0] && a[1] < b[3] + pad && a[3] + pad > b[1], width = (t) => t.length * FONT * 0.68, fit = (x0, w) => Math.max(P.left + 6 - x0, Math.min(0, P.right - 6 - x0 - w)), penalty = (box) => {
    let s = box[1] < P.top - 20 || box[3] > P.bottom - 4 ? 4e3 : 0;
    for (let [o, weight] of obstacles) hit(box, o, 2) && (s += weight);
    for (let t of taken) hit(box, t, 5) && (s += 1600);
    return s;
  }, root = items.map((_, i) => i), find = (i) => root[i] === i ? i : root[i] = find(root[i]);
  items.forEach(
    (a, i) => items.forEach(
      (b, j) => j > i && a.author === b.author && Math.hypot(a.px - b.px, a.py - b.py) < MERGE && (root[find(j)] = find(i))
    )
  );
  items.forEach((_, n) => {
    if (out[n]) return;
    let group = items.map((_2, i) => i).filter((i) => find(i) === find(n));
    if (group.length > 1) {
      let order = group.sort(
        (a, b) => items[b].score - items[a].score || items[a].py - items[b].py
      ), cx = mean(order.map((i) => items[i].px)), cy = mean(order.map((i) => items[i].py)), best2 = { score: Infinity, placed: [] }, blocks = items.map((p) => [p.px - R - 3, p.py - R - 3, p.px + R + 3, p.py + R + 3]);
      for (let side of [`start`, `end`])
        for (let dx of [26, 42, 62])
          for (let oy of [0, -26, 26, -52, 52]) {
            let score = dx * 0.05 + Math.abs(oy) * 0.05, placed = [];
            order.forEach((i, r) => {
              let it2 = items[i], w2 = width(it2.text), y = cy + oy + (r - (order.length - 1) / 2) * LINE + FONT * 0.3, x = cx + (side === `start` ? dx : -dx), x0 = side === `start` ? x : x - w2, s = fit(x0, w2), box = [x0 + s, y - FONT * 0.78, x0 + s + w2, y + FONT * 0.24], lead = [
                side === `start` ? box[0] - 3 : box[2] + 3,
                y - FONT * 0.28
              ];
              score += penalty(box) + Math.abs(s) * 0.35;
              for (let t = 0.2; t <= 1; t += 0.1) {
                let lx = it2.px + (lead[0] - it2.px) * t, ly = it2.py + (lead[1] - it2.py) * t, pt = [lx, ly, lx, ly];
                blocks.forEach((b, k) => !group.includes(k) && hit(pt, b, 0) && (score += 900));
                taken.forEach((b) => hit(pt, b, 0) && (score += 400));
              }
              placed.push({ ...it2, x: x + s, y, a: side, box, leader: lead });
            });
            score < best2.score && (best2 = { score, placed });
          }
      order.forEach((i, r) => (out[i] = best2.placed[r], taken.push(best2.placed[r].box)));
      return;
    }
    let it = items[n], w = width(it.text), best = { score: Infinity, x: 0, y: 0, a: `start`, box: [0, 0, 0, 0] }, tries = 0;
    for (let k of [1, 1.7, 2.5, 3.5, 4.7]) {
      let g = (R + 8) * k, d = g * 0.78, h = FONT * 0.34, v = FONT * 0.6;
      for (let [dx, dy, a] of [
        [g, h, `start`],
        [-g, h, `end`],
        [0, -g - 3, `middle`],
        [0, g + FONT * 0.78, `middle`],
        [d, -d, `start`],
        [d, d + v, `start`],
        [-d, -d, `end`],
        [-d, d + v, `end`]
      ]) {
        let x = it.px + dx, y = it.py + dy, x0 = a === `start` ? x : a === `end` ? x - w : x - w / 2, s = fit(x0, w), box = [x0 + s, y - FONT * 0.78, x0 + s + w, y + FONT * 0.24], score = tries++ * 0.35 + Math.abs(s) * 0.35 + penalty(box);
        score < best.score && (best = { score, x: x + s, y, a, box });
      }
    }
    taken.push(best.box), out[n] = { ...it, ...best };
  });
  return out;
}
