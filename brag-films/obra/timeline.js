// OBRA — Ader Studio. 20 s seamless loop. Every frame is a pure function of t (seconds).
// Two compositions from one timeline: ?f=h (1920×1080, default) and ?f=v (1080×1920).
const DUR = 20;
const V = new URLSearchParams(location.search).get('f') === 'v';
const W = V ? 1080 : 1920, H = V ? 1920 : 1080;
const $ = (id) => document.getElementById(id);

// ─── easing ──────────────────────────────────────────────────────
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (s) => ((ax * s + bx) * s + cx) * s;
  const Y = (s) => ((ay * s + by) * s + cy) * s;
  const dX = (s) => (3 * ax * s + 2 * bx) * s + cx;
  return (x) => {
    if (x <= 0) return 0; if (x >= 1) return 1;
    let s = x;
    for (let i = 0; i < 8; i++) { const e = X(s) - x; const d = dX(s); if (Math.abs(e) < 1e-6) break; if (Math.abs(d) < 1e-6) break; s -= e / d; }
    if (s < 0 || s > 1 || Math.abs(X(s) - x) > 1e-4) { let lo = 0, hi = 1; s = x; for (let i = 0; i < 30; i++) { if (X(s) < x) lo = s; else hi = s; s = (lo + hi) / 2; } }
    return Y(s);
  };
}
const M = bezier(0.77, 0, 0.18, 1);   // masks / wipes (site)
const O = bezier(0.22, 1, 0.36, 1);   // entrances (site)
const S = (x) => x * x * (3 - 2 * x); // smoothstep for opacity
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const P = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, k) => a + (b - a) * k;
const css = (el, o) => { for (const k in o) el.style[k] = o[k]; };
const vis = (el, on) => { el.style.display = on ? '' : 'none'; };
const px = (v) => `${v.toFixed(2)}px`;

// ─── layout ──────────────────────────────────────────────────────
const L = V ? {
  plan: { s: 960 / 1460, ox: 60, oy: 700 },
  tickX: 80, hookEnd: 1000,
  corte: { x: 60, w: 960 },
  win: { x: 0, y: 600, w: 1080, h: 1040 },
  text: { left: 80, eb: [262, 20], l1: [292, 132], l2: [424, 132] },
  cDark: false,
  axo: { w: 780, x: 220, cy: 1110, sp0: 290, sp1: 180 },
  flr: { size: 18, line: 28 },
  frame: { x: 80, y: 640, w: 920, h: 518 },
  fadu: { eb: [262, 20], e1: [292, 120], e2: [414, 120], yr: [1236, 200], sb: [1470, 30] },
  cmp: { cx: 540, cy: 760, k: 2.2 },
  n: { n1: [1066, 124], n1b: [1190, 124], n2: [1314, 124] },
  cap: { top: 1772, size: 22, b: 17 },
} : {
  plan: { s: 1180 / 1460, ox: 660, oy: 120 },
  tickX: 80, hookEnd: 1840,
  corte: { x: 660, w: 1180 },
  win: { x: 0, y: 0, w: 1920, h: 1080 },
  text: { left: 80, eb: [398, 17], l1: [426, 124], l2: [550, 124] },
  cDark: true, cText: { eb: [676, 17], l1: [704, 124], l2: [828, 124] },
  axo: { w: 820, x: 980, cy: 540, sp0: 270, sp1: 170 },
  flr: { size: 15, line: 44 },
  frame: { x: 720, y: 225, w: 1120, h: 630 },
  fadu: { eb: [268, 17], yr: [296, 150], e1: [476, 96], e2: [572, 96], sb: [694, 24] },
  cmp: { cx: 960, cy: 380, k: 1.9 },
  n: { n1: [640, 104], n2: [752, 104] },
  cap: { top: 1006, size: 17, b: 13 },
};
const PL = L.plan;
const toSx = (x) => PL.ox + PL.s * (x - 100);
const toSy = (y) => PL.oy + PL.s * (y - 40);
const toPy = (Y) => (Y - PL.oy) / PL.s + 40;
const ROW = 731.2;                       // grid row that the first line becomes (plan px)
const rowY = toSy(ROW);
const GX0 = 156.7, GX1 = 1479.6, GY0 = 179.7, GY1 = 951.8;
const CW = L.corte.w, CH = CW * 1030 / 2400;
const CT = V ? (PL.oy + PL.s * 1040 / 2 - CH / 2) : (540 - CH / 2);
const G = CT + 866 * CH / 1030;          // ground line of the section, screen px
const WIN = L.win;
const FR = L.frame;
const WH = FR.w * 600 / 1770;            // Weimar strip height at frame width
const CMP = L.cmp;
const NL = 157.3 * CMP.k;                // needle length, screen px
const NX = 0.25 * CMP.k;                 // needle centre offset
const TICK = [L.tickX, rowY, L.tickX + 28, rowY];

// ─── build ───────────────────────────────────────────────────────
const stage = $('stage');
css(stage, { width: px(W), height: px(H) });
document.documentElement.style.width = px(W); document.documentElement.style.height = px(H);
$('plan').style.transform = `translate(${px(PL.ox - PL.s * 100)}, ${px(PL.oy - PL.s * 40)}) scale(${PL.s})`;
const ink = $('ink');
ink.setAttribute('width', W); ink.setAttribute('height', H); ink.setAttribute('viewBox', `0 0 ${W} ${H}`);
$('ln').setAttribute('stroke-width', 1.5); $('cut').setAttribute('stroke-width', 1.5);
$('wipeLn').setAttribute('x1', 100); $('wipeLn').setAttribute('x2', 1560);
const SVGNS = 'http://www.w3.org/2000/svg';
const gridLines = [];
for (let j = -1; j <= 6; j++) { const l = document.createElementNS(SVGNS, 'line'); l.dataset.h = 1; l.dataset.v = 290 + 110.3 * j; l.dataset.o = Math.abs(j - 4); $('gridG').appendChild(l); gridLines.push(l); }
for (let k = -1; k <= 11; k++) { const l = document.createElementNS(SVGNS, 'line'); l.dataset.h = 0; l.dataset.v = 267 + 110.3 * k; l.dataset.o = Math.abs(k - 5); $('gridG').appendChild(l); gridLines.push(l); }
css($('corte'), { left: px(L.corte.x), top: px(CT), width: px(CW), height: px(CH) });

function place(id, [top, size], left = L.text.left, color) {
  const el = $(id);
  css(el, { left: px(left), top: px(top), fontSize: px(size) });
  if (color) el.style.color = color;
}
const T = L.text;
place('p0', T.eb); place('p1', T.l1); place('p2', T.l2);
const CT3 = L.cDark ? L.cText : T; const cCol = L.cDark ? '#FAFAF7' : null;
place('c0', CT3.eb, T.left, L.cDark ? 'rgba(250,250,247,.78)' : null); place('c1', CT3.l1, T.left, cCol); place('c2', CT3.l2, T.left, cCol);
place('u0', T.eb); place('u1', T.l1); place('u2', T.l2);
const F = L.fadu;
place('e0', F.eb); place('e1', F.e1); place('e2', F.e2); place('yr', F.yr); place('sb', F.sb);
['n1', 'n1b', 'n2'].forEach((id) => { const el = $(id); if (!L.n[id]) { el.style.display = 'none'; return; } css(el, { left: '0px', width: px(W) }); place(id, L.n[id], 0); el.style.width = px(W); });
if (V) $('n1').firstElementChild.textContent = 'TODOS LOS';

// odometers
const YEARS = ['2020', '2021', '2022', '2023', '2024'];
const SUBS = ['Diseño I', 'Diseño II', 'Diseño III', 'Diseño IV', 'Proyecto Arquitectónico', 'Digital Realms: Photogrammetry'];
const yrLH = F.yr[1] * 1.0, sbLH = F.sb[1] * 1.4;
YEARS.forEach((y) => { const d = document.createElement('div'); d.textContent = y; css(d, { height: px(yrLH), lineHeight: px(yrLH) }); $('yrT').appendChild(d); });
SUBS.forEach((y) => { const d = document.createElement('div'); d.textContent = y; css(d, { height: px(sbLH), lineHeight: px(sbLH) }); $('sbT').appendChild(d); });
css($('yr'), { height: px(yrLH * 1.02) }); css($('sb'), { height: px(sbLH) });

// renders: cover inside window
function cover(iw, ih, ww, wh, fx = 0.5, fy = 0.5) {
  const s = Math.max(ww / iw, wh / ih); const w = iw * s, h = ih * s;
  return { w, h, x: clamp(ww / 2 - fx * w, ww - w, 0), y: clamp(wh / 2 - fy * h, wh - h, 0) };
}
css($('render'), { left: px(WIN.x), top: px(WIN.y), width: px(WIN.w), height: px(WIN.h) });
if (!L.cDark) $('scrim').style.display = 'none';
const R1 = cover(1440, 1157, WIN.w, WIN.h, 0.5, V ? 0.5 : 0.56), R2 = cover(1440, 1169, WIN.w, WIN.h, 0.5, 0.5);
for (const [id, r] of [['r1', R1], ['r2', R2]]) css($(id), { width: px(r.w), height: px(r.h), left: px(r.x), top: px(r.y), transformOrigin: `${px(WIN.w / 2 - r.x)} ${px(WIN.h / 2 - r.y)}` });

// axos
const AXH = [676, 691, 699].map((h) => L.axo.w * h / 1100);
for (let i = 0; i < 3; i++) css($('ax' + i), { width: px(L.axo.w), height: px(AXH[i]), left: px(L.axo.x) });
for (let i = 0; i < 3; i++) {
  const f = $('fl' + i); css(f, { fontSize: px(L.flr.size) });
  css(f.querySelector('i'), { width: px(L.flr.line) });
}

// frame images: width-fit (all sources are ≤ 16:9), centred
const FRS = [[1863, 1112], [1920, 1167], [2400, 1622], [2400, 1619], [2400, 1350], [1770, 600]];
const frImgs = FRS.map(([w, h], i) => { const el = $('fr' + i); const s = FR.w / w; const d = { w: FR.w, h: h * s }; css(el, { width: px(d.w), height: px(d.h), left: '0px' }); return d; });

// mark
const MK = 200.46 * CMP.k;
css($('mark'), { width: px(MK), height: px(MK), left: px(CMP.cx - MK / 2), top: px(CMP.cy - MK / 2) });
const RC = 2 * Math.PI * 94;
$('ring').setAttribute('stroke-dasharray', `${RC} ${RC}`);
$('ring').setAttribute('transform', 'rotate(180)');

// captions (literal alt texts from the portfolio data)
const CAPS = [
  [1.95, 3.25, 'Casa Angel', 'Etapa 2 · Implantación en L sobre la grilla'],
  [3.4, 4.6, 'Casa Angel', 'Etapa 3 · Planta alta'],
  [4.75, 6.05, 'Casa Angel', 'Etapa 3 · Corte living'],
  [6.75, 7.95, 'Casa Angel', 'Etapa 4 · Fachada al patio entre pinos', true],
  [8.25, 9.1, 'Casa Angel', 'Etapa 4 · Galería elevada de madera en planta alta', true],
  [10.15, 11.9, 'Oficinas Urbetrack', 'Av. Rivadavia 4260 · Almagro, CABA'],
  [13.1, 15.3, 'FADU – UBA', '2020–2024 · Un proyecto por año'],
  [15.45, 15.85, 'Bauhaus-Universität Weimar', 'Gaussian Splat · Goethe’s Gartenhaus'],
];
const capEls = CAPS.map(([a, b, k, txt, dark]) => {
  const m = document.createElement('div'); m.className = 'cap' + (dark && L.cDark ? ' on-dark' : '');
  const d = document.createElement('div'); d.innerHTML = `<b>${k.toUpperCase()}</b>${txt}`;
  css(d, { fontSize: px(L.cap.size), lineHeight: 1.5 }); d.querySelector('b').style.fontSize = px(L.cap.b);
  m.appendChild(d); css(m, { left: px(L.text.left), top: px(L.cap.top) }); $('caps').appendChild(m);
  return { m, a, b };
});

// ─── helpers ─────────────────────────────────────────────────────
function reveal(el, t, a, b = 1e9, dIn = 0.9, dOut = 0.5) {
  const inner = el.firstElementChild;
  let y;
  if (t < b) y = 108 * (1 - O(P(t, a, a + dIn)));
  else y = -108 * M(P(t, b, b + dOut));
  inner.style.transform = `translate3d(0, ${y.toFixed(3)}%, 0)`;
  el.style.visibility = (t < a || t > b + dOut) ? 'hidden' : 'visible';
}
function setLine(el, x1, y1, x2, y2, o) {
  el.setAttribute('x1', x1.toFixed(2)); el.setAttribute('y1', y1.toFixed(2));
  el.setAttribute('x2', x2.toFixed(2)); el.setAttribute('y2', y2.toFixed(2));
  el.style.opacity = o; el.style.visibility = o > 0.001 ? 'visible' : 'hidden';
}
const inset = (t, r, b, l) => `inset(${px(Math.max(0, t))} ${px(Math.max(0, r))} ${px(Math.max(0, b))} ${px(Math.max(0, l))})`;

// ─── S1–S2 · line → grid → plan → section ────────────────────────
function planScene(t) {
  const on = t >= 1.1 && t < 6.95;
  vis($('plan'), on); vis($('corte'), on && t >= 4.95);
  if (!on) return;
  // grid lines grow out of the drawn row
  const go = 0.34 * (1 - S(P(t, 2.25, 2.85)));
  for (const l of gridLines) {
    const v = +l.dataset.v, o = +l.dataset.o;
    if (+l.dataset.h) {
      const k = O(P(t, 1.2 + o * 0.06, 2.0 + o * 0.06));
      const y = lerp(ROW, v, k);
      l.setAttribute('x1', GX0); l.setAttribute('x2', GX1); l.setAttribute('y1', y); l.setAttribute('y2', y);
      l.style.opacity = go * S(P(t, 1.2 + o * 0.06, 1.45 + o * 0.06));
    } else {
      const k = O(P(t, 1.3 + o * 0.04, 2.1 + o * 0.04));
      l.setAttribute('x1', v); l.setAttribute('x2', v); l.setAttribute('y1', lerp(ROW, GY0, k)); l.setAttribute('y2', lerp(ROW, GY1, k));
      l.style.opacity = go * S(P(t, 1.3 + o * 0.04, 1.5 + o * 0.04));
    }
  }
  // 02-02 sheet wipes in (left → right), then the upper plan wipes it away (bottom → top)
  const w = M(P(t, 1.6, 2.5));
  const wy = lerp(1080, 40, M(P(t, 2.6, 3.45)));
  $('pg').style.clipPath = inset(40, 2400 - (100 + 1460 * w), Math.max(68, 1148 - wy), 100);
  vis($('pg'), t >= 1.6 && wy > 41);
  const wl = $('wipeLn');
  wl.setAttribute('y1', wy); wl.setAttribute('y2', wy);
  const wp = P(t, 2.6, 3.45);
  wl.style.opacity = wp > 0 && wp < 1 ? Math.min(1, 6 * (1 - wp)) * Math.min(1, 12 * wp) : 0;
  // the plan folds into the section line
  const Gp = toPy(G);
  const c = M(P(t, 4.6, 5.1));
  const top = lerp(wy - 109, Gp - 109, c), bot = lerp(0, 1022 - Gp, c);
  $('pa').style.clipPath = inset(top, 0, bot, 0);
  vis($('pa'), t >= 2.6 && c < 1);
  // section rises from its ground line
  const q = M(P(t, 4.95, 5.65));
  const Gc = G - CT;
  $('corte').style.clipPath = inset(Gc * (1 - q), 0, (CH - Gc) * (1 - q), 0);
  $('corte').firstElementChild.style.transform = `scale(${lerp(1.012, 1, O(P(t, 4.95, 6.2)))})`;
}

// ─── S3 · renders ────────────────────────────────────────────────
function renderScene(t) {
  const on = t >= 6.1 && t < 9.85;
  vis($('render'), on);
  if (!on) return;
  const Gl = G - WIN.y;
  const p = M(P(t, 6.1, 6.95));
  const yc = WIN.h / 2, c = M(P(t, 9.3, 9.8));
  let top = Gl * (1 - p), bot = (WIN.h - Gl) * (1 - p);
  top = lerp(top, yc, c); bot = lerp(bot, WIN.h - yc, c);
  $('render').style.clipPath = inset(top, 0, bot, 0);
  const s1 = 1.075 - 0.035 * O(P(t, 6.1, 7.4)) + 0.03 * P(t, 7.0, 8.7);
  $('r1').style.transform = `scale(${s1.toFixed(5)})`;
  vis($('r1'), t < 8.75);
  const w = M(P(t, 7.95, 8.75));
  const s2 = 1.07 - 0.04 * O(P(t, 7.95, 9.0)) + 0.025 * P(t, 8.7, 9.8);
  $('r2').style.clipPath = inset(0, WIN.w * (1 - w), 0, 0);
  $('r2').style.transform = `scale(${s2.toFixed(5)})`;
  vis($('r2'), t >= 7.95);
}

// ─── S4 · Urbetrack ──────────────────────────────────────────────
function axoScene(t) {
  const on = t >= 9.7 && t < 12.65;
  vis($('axos'), on);
  for (let i = 0; i < 3; i++) vis($('fl' + i), false);
  if (!on) return;
  const A = L.axo;
  const sp = lerp(A.sp0, A.sp1, O(P(t, 9.8, 11.7)));
  for (let i = 0; i < 3; i++) {
    const el = $('ax' + i), h = AXH[i];
    const a = 9.75 + i * 0.14;
    const r = M(P(t, a, a + 0.75));
    const x = M(P(t, 11.95 + (2 - i) * 0.09, 12.5 + (2 - i) * 0.09)); // exit: wipe up
    const cy = A.cy + (1 - i) * sp;
    const lift = 36 * (1 - O(P(t, a, a + 1.1)));
    const top = cy - h / 2 + lift;
    css(el, { top: px(top) });
    el.style.clipPath = inset(h * (1 - r), 0, h * x, 0);
    // floor label: sits in the empty upper-left corner of each drawing
    const f = $('fl' + i);
    const fa = 10.55 + i * 0.1;
    const fo = S(P(t, fa, fa + 0.5)) * (1 - S(P(t, 11.85, 12.1)));
    vis(f, fo > 0.001);
    f.style.opacity = fo;
    f.querySelector('i').style.transform = `scaleX(${O(P(t, fa, fa + 0.8))})`;
    const fw = f.offsetWidth;
    css(f, { left: px(A.x - 18 - fw), top: px(top + h * 0.34 - f.offsetHeight / 2), flexDirection: 'row-reverse' });
    f.querySelector('i').style.transformOrigin = '0 50%';
  }
}

// ─── S5 · FADU → Weimar ──────────────────────────────────────────
const FSTEP = [12.6, 13.25, 13.7, 14.15, 14.6, 15.4];
function frameScene(t) {
  const on = t >= 12.55 && t < 16.45;
  vis($('frame'), on);
  if (!on) return;
  const open = M(P(t, 12.6, 13.2));
  const morph = M(P(t, 15.0, 15.45));
  const close = M(P(t, 15.95, 16.4));
  const h = lerp(lerp(0, FR.h, open), 0, close) * 1 + 0;
  const hh = open < 1 ? h : lerp(lerp(FR.h, WH, morph), 0, close);
  const cy = FR.y + FR.h / 2;
  css($('frame'), { left: px(FR.x), top: px(cy - hh / 2), width: px(FR.w), height: px(hh) });
  for (let i = 0; i < 6; i++) {
    const el = $('fr' + i), d = frImgs[i];
    const s0 = FSTEP[i];
    const w = i === 0 ? 1 : M(P(t, s0, s0 + 0.45));
    const sc = lerp(1.06, 1, O(P(t, s0, s0 + 0.9)));
    css(el, { top: px(hh / 2 - d.h / 2), transform: `scale(${sc.toFixed(5)})`, clipPath: inset(0, FR.w * (1 - w), 0, 0) });
    const next = FSTEP[i + 1];
    vis(el, t >= s0 && !(next && t > next + 0.46));
  }
}

// ─── S6 · compass → line → loop ──────────────────────────────────
function lineScene(t) {
  const ln = $('ln');
  if (t < 2.85) {
    // hook: tick → line across → it settles on the grid row
    const e = M(P(t, 0.2, 1.1));
    const s = M(P(t, 1.05, 1.8));
    const x1 = lerp(TICK[0], toSx(GX0), s);
    const x2 = lerp(lerp(TICK[2], L.hookEnd, e), toSx(GX1), s);
    setLine(ln, x1, rowY, x2, rowY, 1 - S(P(t, 2.2, 2.8)));
    return;
  }
  if (t >= 16.3) {
    const fx = FR.x, fy = FR.y + FR.h / 2, cx = CMP.cx + NX, cy = CMP.cy;
    const m = M(P(t, 16.4, 17.0));
    let a = [lerp(fx, cx - NL / 2, m), lerp(fy, cy, m), lerp(fx + FR.w, cx + NL / 2, m), lerp(fy, cy, m)];
    let o = S(P(t, 16.3, 16.38)) * (1 - S(P(t, 17.05, 17.25)));
    if (t >= 19.3) {
      const r = M(P(t, 19.5, 19.95));
      a = [lerp(cx - NL / 2, TICK[0], r), lerp(cy, TICK[1], r), lerp(cx + NL / 2, TICK[2], r), lerp(cy, TICK[3], r)];
      o = S(P(t, 19.36, 19.44));
    }
    setLine(ln, a[0], a[1], a[2], a[3], o);
    return;
  }
  setLine(ln, 0, 0, 0, 0, 0);
}
function cutScene(t) {
  const c = $('cut');
  if (t >= 4.25 && t < 5.8) {
    const x0 = L.corte.x;
    setLine(c, x0, G, x0 + CW * M(P(t, 4.25, 4.8)), G, 1 - S(P(t, 5.4, 5.8)));
  } else if (t >= 9.7 && t < 10.45) {
    const y = WIN.y + WIN.h / 2, r = M(P(t, 9.85, 10.4));
    setLine(c, lerp(WIN.x, WIN.x + WIN.w, r), y, WIN.x + WIN.w, y, S(P(t, 9.7, 9.8)));
  } else if (t >= 12.3 && t < 13.3) {
    const y = FR.y + FR.h / 2;
    setLine(c, FR.x, y, FR.x + FR.w * M(P(t, 12.3, 12.75)), y, 1 - S(P(t, 13.05, 13.3)));
  } else setLine(c, 0, 0, 0, 0, 0);
}
function compassScene(t) {
  const on = t >= 16.8 && t < 19.62;
  vis($('cmp'), on); vis($('mark'), on);
  if (!on) return;
  const m = S(P(t, 17.7, 18.0)) * (1 - S(P(t, 19.05, 19.3)));
  const ny = O(P(t, 16.9, 17.3)) * (1 - M(P(t, 19.3, 19.5)));
  const ringP = M(P(t, 16.95, 17.75)) * (1 - M(P(t, 19.15, 19.6)));
  const g = $('cmp');
  g.setAttribute('transform', `translate(${CMP.cx} ${CMP.cy}) scale(${CMP.k})`);
  g.style.opacity = 1 - m;
  $('needle').setAttribute('transform', `scale(1 ${Math.max(0.0001, ny).toFixed(4)})`);
  $('ring').setAttribute('stroke-dashoffset', (RC * (1 - ringP)).toFixed(2));
  vis($('ring'), ringP > 0.001 && m < 0.999);
  $('mark').style.opacity = m;
  $('mark').style.transform = `scale(${lerp(1.0, 1.012, P(t, 17.7, 19.05))})`;
}

// ─── type ────────────────────────────────────────────────────────
function typeScene(t) {
  reveal($('p0'), t, 2.95, 5.95); reveal($('p1'), t, 3.0, 5.98); reveal($('p2'), t, 3.15, 6.02);
  reveal($('c0'), t, 6.65, 9.05); reveal($('c1'), t, 6.7, 9.08); reveal($('c2'), t, 6.85, 9.12);
  reveal($('u0'), t, 10.05, 11.9); reveal($('u1'), t, 10.1, 11.93); reveal($('u2'), t, 10.25, 11.97);
  reveal($('e0'), t, 12.75, 15.8); reveal($('yr'), t, 12.8, 15.83); reveal($('e1'), t, 12.85, 15.86); reveal($('e2'), t, 13.0, 15.9); reveal($('sb'), t, 13.05, 15.92);
  let yi = 0; for (let k = 1; k <= 4; k++) yi += M(P(t, FSTEP[k], FSTEP[k] + 0.45));
  let si = yi + M(P(t, FSTEP[5], FSTEP[5] + 0.45));
  $('yrT').style.transform = `translateY(${px(-yi * yrLH)})`;
  $('sbT').style.transform = `translateY(${px(-si * sbLH)})`;
  reveal($('n1'), t, 17.15, 19.05); reveal($('n1b'), t, 17.25, 19.08); reveal($('n2'), t, 17.35, 19.1);
  for (const c of capEls) reveal(c.m, t, c.a, c.b, 0.7, 0.35);
}

window.renderAt = function (t) {
  t = ((t % DUR) + DUR) % DUR;
  planScene(t); renderScene(t); axoScene(t); frameScene(t);
  lineScene(t); cutScene(t); compassScene(t); typeScene(t);
  return Promise.resolve();
};
window.DUR = DUR; window.W = W; window.H = H;
window.ready = Promise.all([
  document.fonts.ready,
  ...Array.from(document.images).map((im) => im.decode().catch(() => {})),
]).then(() => Promise.all(['800 100px "Barlow Condensed"', 'italic 300 100px "Barlow Condensed"', '600 100px "Barlow Condensed"', '300 100px Barlow'].map((f) => document.fonts.load(f)))).then(() => { window.renderAt(0); return true; });
