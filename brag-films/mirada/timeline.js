// Ader Studio — MIRADA. 16 s silent loop for the /fotografia hero.
// Every frame is a pure function of t (seconds). ?f=h (1920×1080) | ?f=v (1080×1920)
const DUR = 16;
const Q = new URLSearchParams(location.search);
const V = Q.get('f') === 'v';
const BASE = Q.get('base') || '../../public/images/fotografia/';
document.body.className = V ? 'v' : 'h';
const SW = V ? 1080 : 1920, SH = V ? 1920 : 1080;
const $ = (id) => document.getElementById(id);

// ─── easing ──────────────────────────────────────────────────────
function bez(x1, y1, x2, y2) { // CSS cubic-bezier
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (s) => ((ax * s + bx) * s + cx) * s, Y = (s) => ((ay * s + by) * s + cy) * s;
  const dX = (s) => (3 * ax * s + 2 * bx) * s + cx;
  return (x) => {
    if (x <= 0) return 0; if (x >= 1) return 1;
    let s = x;
    for (let i = 0; i < 8; i++) { const e = X(s) - x, d = dX(s); if (Math.abs(e) < 1e-6 || Math.abs(d) < 1e-6) break; s -= e / d; }
    let lo = 0, hi = 1; if (Math.abs(X(s) - x) > 1e-5) { s = x; for (let i = 0; i < 30; i++) { if (X(s) < x) lo = s; else hi = s; s = (lo + hi) / 2; } }
    return Y(s);
  };
}
const EIN = bez(0.22, 1, 0.36, 1);   // site entrance
const EMASK = bez(0.77, 0, 0.18, 1); // site masks / wipes
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const P = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, k) => a + (b - a) * k;
const pw = (x, pts) => {
  if (x <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) {
    const [a, va] = pts[i - 1], [b, vb] = pts[i];
    return va + (vb - va) * (x - a) / (b - a);
  }
  return pts[pts.length - 1][1];
};
const R = (x, y, w, h) => ({ x, y, w, h });
const lerpR = (a, b, k) => R(lerp(a.x, b.x, k), lerp(a.y, b.y, k), lerp(a.w, b.w, k), lerp(a.h, b.h, k));

// ─── layout ──────────────────────────────────────────────────────
const L0 = V
  ? { W: 316, H: 421, gap: 18, x0: 48, y0: 700, FULL: R(0, 200, 1080, 1440), mark: { o: 10, a: 16 }, vf: { i: 36, a: 26 } }
  : { W: 510, H: 680, gap: 48, x0: 147, y0: 140, FULL: R(0, 0, 1920, 1080), mark: { o: 14, a: 22 }, vf: { i: 44, a: 32 } };
// 16:9: a row triptych. 9:16: the same three windows hung as a zigzag (salon hang), twice the size.
const TL = V ? R(60, 160, 466, 621) : R(L0.x0, L0.y0, L0.W, L0.H);
const TC = V ? R(554, 510, 466, 621) : R(L0.x0 + L0.W + L0.gap, L0.y0, L0.W, L0.H);
const TR = V ? R(60, 860, 466, 621) : R(L0.x0 + 2 * (L0.W + L0.gap), L0.y0, L0.W, L0.H);
const FULL = L0.FULL;

// ─── material (literal series titles from fotografia.ts) ─────────
const ph = (s, n) => `${BASE}${s}/${s}-${String(n).padStart(2, '0')}.webp`;
const PHOTOS = {
  al1: { src: ph('alemania', 1), w: 1800, h: 2400 },
  es2: { src: ph('espana', 2), w: 1800, h: 2400 },
  ar1: { src: ph('argentina', 1), w: 1800, h: 2400 },
  es1: { src: ph('espana', 1), w: 1800, h: 2400 }, // heroPhoto
};
const RHYTHM = [ // eight series not yet seen → 04…11
  { k: 'mo1', src: ph('monaco', 1), name: 'Mónaco' },
  { k: 'it1', src: ph('italia', 1), name: 'Italia' },
  { k: 'du2', src: ph('dubai', 2), name: 'Dubái' },
  { k: 'au2', src: ph('austria', 2), name: 'Austria', w: 1799 },
  { k: 'ur1', src: ph('uruguay', 1), name: 'Uruguay' },
  { k: 'ta1', src: ph('tailandia', 1), name: 'Tailandia' },
  { k: 'rc3', src: ph('republica-checa', 3), name: 'República Checa' },
  { k: 'us2', src: ph('usa', 2), name: 'USA' },
];
RHYTHM.forEach((r) => (PHOTOS[r.k] = { src: r.src, w: r.w || 1800, h: 2400 }));
const CUT0 = 7.65, DT = (12 - CUT0) / RHYTHM.length;

// ─── build DOM ───────────────────────────────────────────────────
const layers = {};
function addLayer(win, key) {
  const d = document.createElement('div');
  d.style.cssText = 'position:absolute;inset:0;overflow:hidden;display:none';
  const im = document.createElement('img');
  im.src = PHOTOS[key].src;
  im.style.width = PHOTOS[key].w + 'px'; im.style.height = PHOTOS[key].h + 'px';
  d.appendChild(im); win.appendChild(d);
  layers[key] = { d, im, p: PHOTOS[key] };
}
addLayer($('wL'), 'al1');
addLayer($('wR'), 'ar1');
addLayer($('wC'), 'es2');
RHYTHM.forEach((r) => addLayer($('wC'), r.k));
addLayer($('wC'), 'es1');
const SVGNS = 'http://www.w3.org/2000/svg';
const markPaths = {};
['L', 'C', 'R'].forEach((k) => { const p = document.createElementNS(SVGNS, 'path'); p.setAttribute('class', 'ink'); p.style.cssText = 'fill:none;stroke:#1A1917;stroke-width:1.5'; $('marks').appendChild(p); markPaths[k] = p; });
$('marks').setAttribute('viewBox', `0 0 ${SW} ${SH}`);
for (let i = 0; i < 11; i++) $('ticks').appendChild(document.createElement('i'));
const ticks = Array.from($('ticks').children);

// static text positions
const pos = (el, x, y, extra = {}) => { el.style.left = x + 'px'; el.style.top = y + 'px'; Object.assign(el.style, extra); };
const posR = (el, xr, y) => { el.style.right = (SW - xr) + 'px'; el.style.top = y + 'px'; };
const labY = TL.y + TL.h + (V ? 18 : 26);
const under = (r) => r.y + r.h + (V ? 18 : 26);
pos($('labL'), TL.x, under(TL)); pos($('labC'), TC.x, under(TC)); pos($('labR'), TR.x, under(TR));
if (V) {
  pos($('t1'), 64, 272); pos($('t2'), 66, 272 + 150 * 0.92 + 4);
  pos($('cap'), 64, 1690);
  pos($('rName'), 64, 1700); $('rSerie').style.display = 'none';
  posR($('rCount'), 1016, 1700 + 96 * 1.08 - 96 * 1.05);
  pos($('e1'), TR.x - 4, 1544); pos($('e2'), TR.x, 1544 + 104 * 1.02);
} else {
  pos($('t1'), 92, 92); pos($('t2'), 96, 92 + 168 * 0.92 + 6);
  posR($('cap'), 1920 - 92, 112);
  const nameTop = TC.y + TC.h - 104 * 1.08 + 10;
  pos($('rName'), TL.x - 4, nameTop); pos($('rSerie'), TL.x, nameTop - 30);
  posR($('rCount'), TR.x + TR.w, TC.y - 14);
  pos($('e1'), TL.x, labY - 6); pos($('e2'), TL.x + 2, labY - 6 + 72 * 1.02);
}

// ─── helpers ─────────────────────────────────────────────────────
function place(el, r) { el.style.transform = `translate(${r.x}px,${r.y}px)`; el.style.width = r.w + 'px'; el.style.height = r.h + 'px'; }
function fit(key, r, k, fy, fx = 0.5) { // cover-fit a photo inside a window of size r, with pan focus fy
  const L = layers[key], p = L.p;
  const s = Math.max(r.w / p.w, r.h / p.h) * k;
  const W = p.w * s, H = p.h * s;
  L.im.style.transform = `translate(${-(W - r.w) * fx}px,${-(H - r.h) * fy}px) scale(${s})`;
}
function only(win, keys) { for (const k in layers) if (layers[k].d.parentNode === win) layers[k].d.style.display = keys.includes(k) ? 'block' : 'none'; }
function wclip(el, top, bot) { el.style.clipPath = `inset(${(top * 100).toFixed(3)}% 0 ${(bot * 100).toFixed(3)}% 0)`; }
function lineIn(el, t, a, b = 1e9, din = 0.8, dout = 0.42) { // masked line: rise in, lift out
  const inner = el.firstElementChild;
  const y = t < b ? 106 * (1 - EIN(P(t, a, a + din))) : -106 * EMASK(P(t, b, b + dout));
  inner.style.transform = `translateY(${y.toFixed(3)}%)`;
  el.style.visibility = (t < a || t > b + dout) ? 'hidden' : 'visible';
}
function marksFor(r, o, a) {
  const x0 = r.x - o, y0 = r.y - o, x1 = r.x + r.w + o, y1 = r.y + r.h + o;
  return `M${x0} ${y0 + a}V${y0}H${x0 + a}M${x1 - a} ${y0}H${x1}V${y0 + a}M${x1} ${y1 - a}V${y1}H${x1 - a}M${x0 + a} ${y1}H${x0}V${y1 - a}`;
}
// window visibility: open = bottom→top reveal, close = continues upward
function openClose(t, open, close, dOpen = 0.95, dClose = 0.62) {
  return [1 - EMASK(P(t, open, open + dOpen)), EMASK(P(t, close, close + dClose))];
}
function roll(elA, elB, t, list) { // hard-cut label roll: previous lifts out, current rises in
  const k = clamp(Math.floor((t - CUT0) / DT), 0, list.length - 1);
  const e = t < CUT0 ? 0 : EIN(P(t - (CUT0 + k * DT), 0, 0.42));
  elA.textContent = k > 0 ? list[k - 1] : ''; elB.textContent = list[k];
  elA.style.fontSize = FS[elA.textContent] || ''; elB.style.fontSize = FS[elB.textContent] || '';
  const out = EMASK(P(t, 11.9, 12.2));
  elA.style.transform = `translateY(${(-106 * e).toFixed(3)}%)`;
  elB.style.transform = `translateY(${(106 * (1 - e) - 106 * out).toFixed(3)}%)`;
}

// series names wider than the slot shrink to fit (measured once fonts are in)
const FS = {};
function measureNames() {
  const maxW = V ? 1080 - 128 - 250 : TL.w;
  const probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap';
  $('rName').appendChild(probe);
  const base = parseFloat(getComputedStyle($('rName')).fontSize);
  RHYTHM.forEach((r) => { probe.textContent = r.name; const w = probe.getBoundingClientRect().width; if (w > maxW) FS[r.name] = (base * maxW / w).toFixed(2) + 'px'; });
  probe.remove();
}

// ─── render ──────────────────────────────────────────────────────
function render(t) {
  // growth of the centre window (0 = triptych slot, 1 = full frame)
  const gUp = EMASK(P(t, 3.4, 4.5));
  const gDn = V ? EMASK(P(t, 12.2, 13.1)) : EMASK(P(t, 6.75, 7.65));
  const g = gUp * (1 - gDn);
  const rC = lerpR(TC, FULL, g);
  place($('wL'), TL); place($('wR'), TR); place($('wC'), rC);

  // lateral windows
  const late = t > 8;
  const reL = V ? 12.6 : 12.2, reR = V ? 12.75 : 12.35;
  const [lTop, lBot] = late ? openClose(t, reL, 15.05, 0.95, 0.6) : openClose(t, 0.15, 3.0);
  const [rTop, rBot] = late ? openClose(t, reR, 15.35, 0.95, 0.6) : openClose(t, 0.65, 3.1);
  const [cTop, cBot] = openClose(t, 0.4, 15.2, 0.95, 0.6);
  wclip($('wL'), lTop, lBot); wclip($('wR'), rTop, rBot); wclip($('wC'), cTop, cBot);
  const settleK = (a) => 1.06 + 0.05 * (1 - EIN(P(t, a, a + 2.2)));
  const drift = late ? P(t, 12, 16) : P(t, 0, 3.8);
  const lA = late ? reL : 0.15, rA = late ? reR : 0.65;
  fit('al1', TL, settleK(lA), lerp(0.82, 0.3, drift));
  fit('ar1', TR, settleK(rA), lerp(0.78, 0.26, drift));
  only($('wL'), ['al1']); only($('wR'), ['ar1']);

  // centre window content
  const heroWipe = EMASK(P(t, 3.05, 3.8));
  if (t < CUT0) {
    const vis = heroWipe > 0 ? ['es2', 'es1'] : ['es2'];
    only($('wC'), heroWipe >= 1 ? ['es1'] : vis);
    fit('es2', rC, settleK(0.4), lerp(0.8, 0.28, P(t, 0, 3.8)));
    layers.es1.d.style.clipPath = `inset(${((1 - heroWipe) * 100).toFixed(3)}% 0 0 0)`;
    if (V) fit('es1', rC, lerp(1.05, 1.1, P(t, 3.4, 7.65)), pw(t, [[3.05, 0.62], [7.65, 0.3]]));
    else fit('es1', rC, 1.06, pw(t, [[3.05, 0.62], [4.5, 0.45], [6.75, 0.17], [7.65, 0.3]]));
  } else if (t < 12.2) { // the last cut (USA) holds a beat longer while its label lifts
    const k = clamp(Math.floor((t - CUT0) / DT), 0, RHYTHM.length - 1);
    const key = RHYTHM[k].k;
    only($('wC'), [key]);
    fit(key, rC, 1.06, lerp(0.72, 0.3, P(t, CUT0, 12.2)));
  } else {
    only($('wC'), ['es2']);
    layers.es2.d.style.clipPath = 'none';
    fit('es2', rC, V ? lerp(1.08, 1.06, EIN(P(t, 12.2, 13.2))) : 1.06, lerp(0.78, 0.28, P(t, 12, 16)));
  }

  // framing marks
  const m = L0.mark;
  const latVis = 1 - P(t, 3.0, 3.45) + P(t, V ? 12.5 : 12.05, V ? 12.9 : 12.45);
  markPaths.L.setAttribute('d', marksFor(TL, m.o, m.a));
  markPaths.R.setAttribute('d', marksFor(TR, m.o, m.a));
  markPaths.C.setAttribute('d', marksFor(rC, m.o, m.a));
  markPaths.L.style.opacity = markPaths.R.style.opacity = clamp(latVis);
  markPaths.C.style.opacity = clamp(1 - g * 3);
  const vf = L0.vf, gi = clamp((g - 0.85) / 0.15);
  const inner = R(rC.x + vf.i, rC.y + vf.i, rC.w - 2 * vf.i, rC.h - 2 * vf.i);
  $('mCream').setAttribute('d', gi > 0 ? marksFor(inner, 0, vf.a) : '');
  $('mCream').style.opacity = gi;
  $('mInk').setAttribute('d', '');

  // S1 museum labels
  lineIn($('labL'), t, 1.35, 2.8); lineIn($('labC'), t, 1.5, 2.85); lineIn($('labR'), t, 1.65, 2.9);

  // S2 title
  const tOut = V ? 6.95 : 6.4;
  lineIn($('t1'), t, 4.5, tOut, 0.9); lineIn($('t2'), t, 4.7, tOut + 0.06, 0.9); lineIn($('cap'), t, 5.0, tOut + (V ? 0.15 : 0), 0.8);

  // S3 rhythm
  roll($('rNameA'), $('rNameB'), t, RHYTHM.map((r) => r.name));
  roll($('rNumA'), $('rNumB'), t, RHYTHM.map((_, i) => String(i + 4).padStart(2, '0')));
  $('rName').style.visibility = $('rNum').style.visibility = (t > CUT0 - 0.01 && t < 12.25) ? 'visible' : 'hidden';
  lineIn($('rTot'), t, CUT0, 11.9, 0.6, 0.3);
  if (!V) lineIn($('rSerie'), t, CUT0 - 0.1, 11.88, 0.6, 0.3);

  // ticks (a ruler above the centre window): 1–3 with the labels, then one per cut
  let n = (t >= 1.35) + (t >= 1.5) + (t >= 1.65);
  if (t >= CUT0) n = 3 + clamp(Math.floor((t - CUT0) / DT) + 1, 0, 8);
  ticks.forEach((el, i) => el.classList.toggle('on', i < n));
  const tw = Math.min(rC.w, SW - 128);
  const tk = $('ticks');
  tk.style.width = tw + 'px'; tk.style.left = (rC.x + (rC.w - tw) / 2) + 'px'; tk.style.top = (rC.y - (V ? 30 : 34)) + 'px';
  const tv = P(t, 1.2, 1.6) * (1 - P(t, 15.0, 15.4));
  tk.style.opacity = (tv * (V ? 1 : clamp(1 - g * 3))).toFixed(3);

  // S4 closing
  lineIn($('e1'), t, 12.7, 15.0, 0.9); lineIn($('e2'), t, 12.85, 15.05, 0.9);
}

window.DUR = DUR;
window.renderAt = function (t) { render(((t % DUR) + DUR) % DUR); return Promise.resolve(); };
const FONTS = ['800 40px "Barlow Condensed"', 'italic 300 40px "Barlow Condensed"', '600 40px "Barlow Condensed"', '300 40px "Barlow"'];
window.ready = Promise.all([
  ...FONTS.map((f) => document.fonts.load(f, 'AÁÑÍ01')),
  ...Array.from(document.images).map((im) => im.decode().catch(() => { console.error('img fail ' + im.src); })),
]).then(() => { measureNames(); return window.renderAt(0); }).then(() => true);
