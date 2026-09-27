// Ader Studio × Urbetrack — motion timeline. Every frame is a pure function of t (seconds).
const DUR = 38;
const $ = (id) => document.getElementById(id);

// ─── easing / helpers ────────────────────────────────────────────
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const E = {
  lin: (x) => x,
  outCubic: (x) => 1 - Math.pow(1 - x, 3),
  inCubic: (x) => x * x * x,
  inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  inOutQuart: (x) => (x < 0.5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2),
  outQuint: (x) => 1 - Math.pow(1 - x, 5),
  outExpo: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inExpo: (x) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10)),
  inOutExpo: (x) => (x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2),
  outBack: (x, s = 1.9) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
  inOutSine: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
};
const P = (t, a, b) => clamp((t - a) / (b - a));
const tw = (t, a, b, from, to, ease = E.outExpo) => from + (to - from) * ease(P(t, a, b));
const lerp = (a, b, k) => a + (b - a) * k;
// Damped spring 0→1 (overshoots), x = seconds since start.
const spring = (x, f = 2.2, d = 6.5) => (x <= 0 ? 0 : 1 - Math.exp(-d * x) * Math.cos(2 * Math.PI * f * x));
const pulse = (t, period = 0.5, k = 9) => Math.exp(-k * (((t % period) + period) % period));
const show = (el, on) => { el.style.visibility = on ? 'visible' : 'hidden'; };
const css = (el, o) => { for (const k in o) el.style[k] = o[k]; };
const mixHex = (a, b, k) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(lerp(v, pb[i], k))).join(',')})`;
};
// Slide-up text reveal inside a .mask: in at a, out at b (optional).
function reveal(el, t, a, b = 1e9, dur = 0.55) {
  const inner = el.firstElementChild;
  const yin = tw(t, a, a + dur, 110, 0, E.outExpo);
  const yout = tw(t, b, b + 0.35, 0, -110, E.inCubic);
  inner.style.transform = `translateY(${t < b ? yin : yout}%)`;
}
function setBlur(axis, amount) {
  $(axis === 'x' ? 'mbxb' : 'mbyb').setAttribute('stdDeviation', axis === 'x' ? `${amount.toFixed(2)} 0` : `0 ${amount.toFixed(2)}`);
}

// ─── build repeated DOM ──────────────────────────────────────────
const PIN_SVG = '<svg viewBox="0 0 24 32"><path fill="#FB7806" d="M12 31 C7 22 2 17 2 11 A10 10 0 1 1 22 11 C22 17 17 22 12 31 Z"/><circle fill="#fff" cx="12" cy="11" r="3.8"/></svg>';
const ROOMS13 = [[46.9, 33.6], [14.7, 33.6], [14.8, 55.6], [14.5, 70.5], [14.5, 85.6], [43.3, 86.4], [66.5, 86.4], [85.2, 86.4], [79.7, 40.2], [87.0, 28.2]];
const NSL = 10;
(function build() {
  const sl = $('s1slices');
  for (let i = 0; i < NSL; i++) {
    const d = document.createElement('div');
    d.className = 'sl';
    d.innerHTML = '<img src="assets/dem-13.jpg">';
    sl.appendChild(d);
  }
  const pins = $('s1pins');
  ROOMS13.forEach(([x, y]) => {
    const r = document.createElement('div'); r.className = 'ripple'; r.style.left = x + '%'; r.style.top = (y - 3.2) + '%'; pins.appendChild(r);
    const p = document.createElement('div'); p.className = 'pin'; p.innerHTML = PIN_SVG; p.style.left = x + '%'; p.style.top = (y - 3.2) + '%'; pins.appendChild(p);
  });
  const dots = $('c2dots'); for (let i = 0; i < 30; i++) dots.appendChild(document.createElement('i'));
  const panes = $('c3panes'); for (let i = 0; i < 24; i++) panes.appendChild(document.createElement('i'));
  const wall = $('s7wall');
  for (let i = 1; i <= 48; i++) {
    const s = document.createElement('div'); s.className = 'sh';
    s.innerHTML = `<img src="assets/doc-${String(i).padStart(2, '0')}.jpg">`;
    wall.appendChild(s);
  }
  const g = $('s8ghosts');
  const d = $('s8needle').innerHTML;
  for (let i = 0; i < 5; i++) { const e = document.createElementNS('http://www.w3.org/2000/svg', 'g'); e.innerHTML = d; g.appendChild(e); }
  $('c1path').setAttribute('pathLength', '1');
})();

// ─── grain ───────────────────────────────────────────────────────
const gctx = $('grain').getContext('2d');
const gimg = gctx.createImageData(540, 960);
function grain(t) {
  let seed = (Math.floor(t * 30) * 9301 + 49297) % 233280;
  const d = gimg.data;
  for (let i = 0; i < d.length; i += 4) {
    seed = (seed * 9301 + 49297) % 233280;
    const v = 128 + ((seed / 233280) - 0.5) * 255;
    d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
  }
  gctx.putImageData(gimg, 0, 0);
}

// ─── scenes ──────────────────────────────────────────────────────
const S = { s1: $('s1'), s3: $('s3'), s4: $('s4'), s5: $('s5'), s6: $('s6'), s7: $('s7'), s8: $('s8') };
const PIN_X = 110 + 0.469 * 860, PIN_Y = 540 + (0.336 - 0.032) * 1103; // "Puestos operativos"

// S1 camera: fast pull-back, slow push, then dive into the pin.
function cam1(t) {
  const pull = tw(t, 0, 1.3, 1.55, 1.0, E.outExpo);
  const push = tw(t, 1.5, 4.0, 1.0, 1.1, E.inOutCubic);
  const dive = tw(t, 3.5, 4.05, 1, 9, E.inExpo);
  const k = E.inOutCubic(P(t, 3.45, 3.95));
  const Sx = pull * push * dive;
  const rot = tw(t, 0, 1.3, -6, 0, E.outExpo);
  const Tx = -Sx * (PIN_X - 540) * k, Ty = -Sx * (PIN_Y - 960) * k;
  // screen position of the pin (rotation is ~0 by then)
  return { Sx, rot, Tx, Ty, px: 540 + Sx * (PIN_X - 540) + Tx, py: 960 + Sx * (PIN_Y - 960) + Ty };
}
function s1(t) {
  show(S.s1, t < 4.1);
  if (t >= 4.1) return;
  const { Sx, rot, Tx, Ty } = cam1(t);
  $('s1cam').style.transform = `translate(${Tx}px,${Ty}px) scale(${Sx}) rotate(${rot}deg)`;
  // demolition slices peel away
  const slices = $('s1slices').children;
  const h = 1103 / NSL;
  for (let i = 0; i < NSL; i++) {
    const s = slices[i];
    s.style.top = `${i * h}px`; s.style.height = `${h + 1}px`;
    s.firstChild.style.top = `${-i * h}px`;
    const a = 1.45 + i * 0.028;
    const x = (i % 2 ? 1 : -1) * 1150 * E.inOutQuart(P(t, a, a + 0.42));
    s.style.transform = `translateX(${x}px)`;
  }
  // red walls breathe on the beat, then burst
  const red = $('s1red');
  const beat = t < 1.45 ? 0.45 + 0.55 * pulse(t, 0.5, 7) : 0;
  const burst = P(t, 1.38, 1.62);
  red.style.opacity = t < 1.38 ? beat : 1 - burst;
  red.style.transform = `scale(${1 + 0.12 * E.outCubic(burst)})`;
  red.style.filter = `drop-shadow(0 0 ${8 + 18 * beat}px rgba(229,32,42,${0.55 * beat}))`;
  // pins drop in on the groove
  const pins = $('s1pins').children;
  for (let i = 0; i < ROOMS13.length; i++) {
    const a = 2.15 + i * 0.1;
    const rp = pins[i * 2], pn = pins[i * 2 + 1];
    const e = P(t, a, a + 0.45);
    pn.style.opacity = e > 0 ? 1 : 0;
    pn.style.transform = `translateY(${(1 - E.outBack(e, 2.4)) * -120}px) scale(${lerp(0.4, 1, E.outCubic(e))})`;
    const r = P(t, a + 0.18, a + 0.7);
    rp.style.opacity = r > 0 && r < 1 ? 1 - r : 0;
    rp.style.transform = `scale(${1 + 5 * E.outCubic(r)})`;
  }
  // type
  const w1 = $('s1t1').children, w2 = $('s1t2').children;
  for (let i = 0; i < 2; i++) {
    const a = 0.05 + i * 0.14;
    const yin = tw(t, a, a + 0.5, 140, 0, E.outExpo), out = E.inCubic(P(t, 1.36, 1.56));
    css(w1[i], { transform: `translateY(${yin - out * 160}px)`, opacity: Math.min(P(t, a, a + 0.15), 1 - out) });
    const b = 1.62 + i * 0.12;
    const yin2 = tw(t, b, b + 0.5, 140, 0, E.outExpo), out2 = E.inCubic(P(t, 3.4, 3.62));
    css(w2[i], { transform: `translateY(${yin2 - out2 * 160}px)`, opacity: Math.min(P(t, b, b + 0.15), 1 - out2) });
  }
  $('s1sub').style.opacity = Math.min(P(t, 0.3, 0.6), 1 - P(t, 3.3, 3.5));
  $('s1code').textContent = t < 1.5 ? '00 / DEMOLICIÓN' : '01 / ARQUITECTURA';
  $('s1foot').textContent = t < 1.5 ? 'URB_P13_DEM_01' : 'URB_P13_ARQ_01';
}

function s3(t) {
  show(S.s3, t >= 3.62 && t < 8.05);
  if (t < 3.62 || t >= 8.05) return;
  const R = tw(t, 3.66, 4.08, 0, 2300, E.inCubic);
  const c = cam1(Math.min(t, 4.05));
  S.s3.style.clipPath = t < 4.08 ? `circle(${R}px at ${c.px}px ${c.py - 40}px)` : 'none';
  const sc = tw(t, 3.8, 4.6, 1.3, 1, E.outExpo) * tw(t, 4.6, 8, 1, 1.04, E.lin);
  $('s3mark').style.transform = `scale(${sc}) rotate(${tw(t, 3.8, 4.8, -8, 0, E.outExpo)}deg)`;
  $('s3u').style.strokeDashoffset = 560 * (1 - E.outCubic(P(t, 3.95, 4.85)));
  const pe = P(t, 4.5, 5.0);
  const pin = $('s3pin');
  pin.style.opacity = pe > 0 ? 1 : 0;
  pin.style.transform = `translateY(${(1 - E.outBack(pe, 2.2)) * -300}px)`;
  const w = P(t, 4.9, 5.6);
  const wave = $('s3wave');
  wave.setAttribute('r', 10 + 190 * E.outCubic(w));
  wave.style.opacity = w > 0 && w < 1 ? 1 - w : 0;
  $('s3ring').style.transform = `rotate(${t * 20}deg)`;
  reveal($('s3title'), t, 5.0, 7.55);
  reveal($('s3sub'), t, 5.2, 7.55);
  reveal($('s3addr'), t, 5.4, 7.55);
  const nums = $('s3nums').children;
  for (let i = 0; i < 3; i++) {
    const a = 6.0 + i * 0.5;
    const e = P(t, a, a + 0.4);
    const hit = t >= a ? Math.exp(-5 * (t - a)) : 0;
    const allOn = P(t, 7.25, 7.45);
    css(nums[i], {
      opacity: e > 0 ? Math.min(1, e * 3) : 0,
      transform: `scale(${lerp(1.9, 1, E.outExpo(e))}) translateY(${-160 * E.inExpo(P(t, 7.5, 7.8))}px)`,
      color: mixHex('#A695C1', '#FFFFFF', Math.max(hit, allOn)),
    });
  }
  const sh = $('s3shutter').children;
  for (let i = 0; i < sh.length; i++) {
    const a = 7.55 + i * 0.05;
    sh[i].style.transform = `translateY(${-100 + 100 * E.inOutQuart(P(t, a, a + 0.38))}%)`;
  }
}

const FLOOR_H = 572;
function s4(t) {
  show(S.s4, t >= 7.95 && t < 14.05);
  if (t < 7.95 || t >= 14.05) return;
  reveal($('s4title').children[0], t, 8.1, 13.4);
  reveal($('s4title').children[1], t, 8.25, 13.45);
  const ex = E.inOutCubic(P(t, 9.75, 10.75));
  const ids = ['13', '12', '11'];
  const compact = [905, 1065, 1225], exploded = [760, 1100, 1440];
  const enter = [9.0, 8.5, 8.0];
  let active = -1;
  if (t >= 11.0 && t < 13.0) active = t < 11.65 ? 0 : t < 12.3 ? 1 : 2;
  ids.forEach((id, i) => {
    const f = $('f' + id);
    const e = P(t, enter[i], enter[i] + 0.75);
    const y = lerp(compact[i], exploded[i], ex) - FLOOR_H / 2;
    const inY = (1 - E.outExpo(e)) * 1500;
    const out = E.inExpo(P(t, 13.4 + i * 0.06, 13.85 + i * 0.06));
    const drift = (i - 1) * 14 * Math.sin(t * 0.9);
    f.style.top = y + 'px';
    f.style.transform = `translate(${drift}px, ${inY - out * 1900}px) rotate(${(1 - E.outExpo(e)) * 7}deg) scale(${lerp(0.88, 1, E.outExpo(e))})`;
    f.style.opacity = e > 0 ? 1 : 0;
    const dim = active >= 0 && active !== i;
    f.style.filter = dim ? 'grayscale(0.9) opacity(0.35)' : 'none';
    f.style.zIndex = 3 - i;
    const l = $('l' + id);
    const la = 10.85 + i * 0.4;
    const le = P(t, la, la + 0.5);
    l.style.top = (y + 20) + 'px';
    css(l, {
      opacity: Math.min(E.outCubic(le), 1 - P(t, 13.35, 13.55)),
      transform: `translate(${(1 - E.outExpo(le)) * -80}px, ${-out * 1900}px)`,
      zIndex: 10,
    });
    l.querySelector('b').style.color = active === i ? '#FB7806' : '#663B8E';
  });
  $('s4cam').style.transform = `scale(${tw(t, 8, 13.5, 1, 1.05, E.lin)}) rotate(${tw(t, 8, 13.5, -1.2, 1.2, E.inOutSine)}deg)`;
}

// Strip position (px) for S5 + S6 entrance; used for motion blur too.
function stripX(t) {
  return -1080 * (E.inOutQuart(P(t, 15.55, 15.9)) + E.inOutQuart(P(t, 17.35, 17.7)) + E.inOutQuart(P(t, 18.8, 19.12)));
}
function s5(t) {
  show(S.s5, t >= 13.5 && t < 19.15);
  if (t < 13.5 || t >= 19.15) return;
  const rise = E.inOutQuart(P(t, 13.55, 14.0));
  S.s5.style.clipPath = `inset(${(1 - rise) * 100}% 0 0 0)`;
  const x = stripX(t);
  const v = Math.abs(stripX(t + 1 / 120) - stripX(t - 1 / 120)) * 60;
  setBlur('x', Math.min(60, v / 220));
  $('s5strip').style.transform = `translateX(${x}px)`;
  $('s5strip').style.filter = v > 30 ? 'url(#mbx)' : 'none';
  // card 1
  const c1 = $('c1');
  $('c1n').textContent = Math.round(300 * E.outExpo(P(t, 14.0, 14.95)));
  const b1 = c1.querySelector('.big');
  css(b1, { transform: `translateY(${tw(t, 13.9, 14.5, 120, 0)}px)`, opacity: P(t, 13.9, 14.1) });
  css(c1.querySelector('.lbl'), { transform: `translateY(${tw(t, 14.15, 14.7, 80, 0)}px)`, opacity: P(t, 14.15, 14.3) });
  css(c1.querySelector('.lbl2'), { transform: `translateY(${tw(t, 14.3, 14.85, 60, 0)}px)`, opacity: P(t, 14.3, 14.45) });
  $('c1path').style.strokeDashoffset = 1 - E.inOutCubic(P(t, 14.0, 15.0));
  // card 2
  const dots = $('c2dots').children;
  for (let i = 0; i < 30; i++) {
    const a = 15.85 + i * 0.022;
    const e = P(t, a, a + 0.3);
    dots[i].style.transform = `scale(${E.outBack(e, 3)})`;
    dots[i].style.background = i % 10 === 9 && t > 16.6 ? '#FB7806' : '#E8E4EC';
  }
  // card 3
  const panes = $('c3panes').children;
  for (let i = 0; i < 24; i++) {
    const a = 17.65 + i * 0.018;
    panes[i].style.transform = `scaleY(${E.outExpo(P(t, a, a + 0.4))})`;
  }
}

function s6(t) {
  show(S.s6, t >= 18.8 && t < 26.25);
  if (t < 18.8 || t >= 26.25) return;
  const enter = E.inOutQuart(P(t, 18.8, 19.12));
  const exitY = E.inOutQuart(P(t, 25.85, 26.2));
  S.s6.style.transform = `translate(${(1 - enter) * 1080}px, ${-exitY * 600}px)`;
  S.s6.style.filter = t < 19.12 ? 'url(#mbx)' : 'none';
  $('s6cam').style.transform = `translateY(${tw(t, 19.0, 21.7, 60, -560, E.inOutCubic)}px) scale(${tw(t, 19, 21.7, 1, 1.05, E.lin)})`;
  ['ca', 'cl', 'cb'].forEach((id, i) => {
    const el = $(id);
    const tops = [560, 1163, 1594];
    el.style.top = tops[i] + 'px';
    const a = 18.95 + i * 0.12;
    css(el, { transform: `translateX(${tw(t, a, a + 0.7, 260, 0)}px)`, opacity: P(t, a, a + 0.2) });
  });
  reveal($('s6t1'), t, 19.12, 21.3);
  // render shots with violet bar sweeps
  const sweeps = [21.45, 22.95, 24.45];
  const shots = ['r1', 'r2', 'r3'];
  const imgW = [1920 * 1448 / 1086, 1920 * 1672 / 941, 1920 * 1390 / 1132];
  const pan = [[-150, -1150], [-500, -1900], [-250, -1050]];
  let barX = 1200;
  shots.forEach((id, i) => {
    const el = $(id);
    const a = sweeps[i];
    const e = E.inOutQuart(P(t, a, a + 0.42));
    const bx = lerp(1080, -70, e);
    if (t >= a && t < a + 0.42) barX = bx;
    const visible = t >= a;
    el.style.visibility = visible ? 'visible' : 'hidden';
    el.style.clipPath = `inset(0 0 0 ${Math.max(0, bx + 70)}px)`;
    const img = el.querySelector('img');
    const end = i < 2 ? sweeps[i + 1] + 0.5 : 26.3;
    const k = E.inOutSine(P(t, a, end));
    const sc = lerp(1.1, 1.0, E.outCubic(P(t, a, end)));
    img.style.width = imgW[i] + 'px';
    img.style.transform = `translateX(${lerp(pan[i][0], pan[i][1], k)}px) scale(${sc})`;
    img.style.transformOrigin = '50% 50%';
    const tg = el.querySelector('.tag');
    css(tg, { opacity: P(t, a + 0.3, a + 0.5), transform: `translateY(${tw(t, a + 0.3, a + 0.8, 40, 0)}px)` });
  });
  $('s6bar').style.transform = `translateX(${barX}px)`;
  reveal($('s6t2'), t, 21.72, 22.95);
}

function s7(t) {
  show(S.s7, t >= 25.85 && t < 31.1);
  if (t < 25.85 || t >= 31.1) return;
  const enter = E.inOutQuart(P(t, 25.85, 26.2));
  S.s7.style.transform = `translateY(${(1 - enter) * 1920}px)`;
  S.s7.style.background = mixHex('#E8E4EC', '#F6F4EF', P(t, 30.5, 30.95));
  // wall of 48 sheets
  const wall = $('s7wall');
  const wy = tw(t, 25.9, 29.5, 1400, -600, E.outCubic);
  wall.style.transform = `translateY(${wy}px) rotateX(40deg) rotateZ(-14deg)`;
  const shs = wall.children;
  for (let i = 0; i < 48; i++) {
    const a = 26.0 + i * 0.022;
    const e = P(t, a, a + 0.35);
    css(shs[i], { opacity: e, transform: `scale(${lerp(0.4, 1, E.outBack(e, 1.6))})` });
  }
  const wallDim = P(t, 28.3, 28.8);
  $('s7wallWrap').style.opacity = 1 - 0.7 * wallDim - 0.3 * P(t, 30.3, 30.6);
  $('s7wallWrap').style.filter = `blur(${8 * wallDim}px)`;
  const n = Math.max(1, Math.round(48 * E.outCubic(P(t, 26.15, 27.55))));
  $('s7n').textContent = String(n).padStart(2, '0');
  const cOut = E.inCubic(P(t, 28.3, 28.55));
  css($('s7count'), { transform: `translateY(${tw(t, 26.1, 26.6, 140, 0) - cOut * 300}px)`, opacity: Math.min(P(t, 26.1, 26.25), 1 - cOut) });
  reveal($('s7lab'), t, 26.45, 28.3);
  reveal($('s7sub'), t, 26.75, 28.3);
  $('s7fade').style.opacity = 1 - wallDim;
  // material collage
  const pos = [[70, 700, -6], [590, 640, 5], [330, 930, -3], [80, 1200, 4], [600, 1150, -5], [360, 1440, 2]];
  const collapse = E.inExpo(P(t, 30.4, 30.9));
  for (let i = 0; i < 6; i++) {
    const el = $('m' + (i + 1));
    const a = 28.5 + i * 0.2;
    const s = spring(t - a, 1.6, 7);
    const [x, y, r] = pos[i];
    const cx = lerp(x, 540 - 210, collapse), cy = lerp(y, 960 - 210, collapse);
    css(el, {
      left: cx + 'px', top: cy + 'px',
      opacity: t >= a ? 1 : 0,
      transform: `translateY(${(1 - s) * -1400}px) rotate(${r + (1 - s) * 25}deg) scale(${1 - collapse * 0.97})`,
      zIndex: 10 + i,
    });
  }
  reveal($('s7matT'), t, 28.65, 30.35);
  reveal($('s7matT2'), t, 28.8, 30.4);
  const dot = P(t, 30.75, 30.95);
  $('s7dot').style.transform = `scale(${E.outBack(dot, 3)})`;
  $('s7dot').style.opacity = dot > 0 ? 1 : 0;
}

const needleAngle = (t) => {
  const x = t - 31.15;
  if (x < 0) return 1170;
  const settle = 90 + 1080 * Math.exp(-2.4 * x) * Math.cos(2 * Math.PI * 0.5 * x);
  return lerp(settle, 0, E.inOutCubic(P(t, 34.35, 34.85)));
};
function s8(t) {
  show(S.s8, t >= 30.95);
  if (t < 30.95) return;
  const ringIn = P(t, 30.98, 31.45);
  const logoMove = E.outExpo(P(t, 35.0, 35.7));
  const breathe = tw(t, 35.7, 38, 1, 1.025, E.lin);
  $('s8logoWrap').style.transform = `translateY(${-240 * logoMove}px) scale(${lerp(1, 0.6, logoMove) * breathe})`;
  $('s8mark').style.transform = `scale(${lerp(0.05, 1, E.outBack(ringIn, 1.7))})`;
  $('s8ring').style.stroke = mixHex('#663B8E', '#1A1917', P(t, 31.0, 31.4));
  const ni = E.outBack(P(t, 31.15, 31.45), 2);
  const ang = needleAngle(t);
  const cross = P(t, 34.75, 35.05);
  const nd = $('s8needle');
  nd.setAttribute('transform', `rotate(${ang}) scale(${ni})`);
  nd.style.opacity = 1 - cross;
  $('s8ring').style.opacity = 1 - cross;
  const gh = $('s8ghosts').children;
  const speed = Math.abs(needleAngle(t) - needleAngle(t - 1 / 60));
  for (let i = 0; i < gh.length; i++) {
    gh[i].setAttribute('transform', `rotate(${needleAngle(t - (i + 1) * 0.012)}) scale(${ni})`);
    gh[i].style.opacity = Math.min(0.14, speed / 200) * (1 - cross);
  }
  $('s8full').style.opacity = cross;
  reveal($('s8t1'), t, 32.05, 34.4);
  reveal($('s8t2'), t, 32.3, 34.45);
  reveal($('s8name'), t, 35.25);
  reveal($('s8desc'), t, 35.45);
  $('s8rule').style.transform = `scaleX(${E.outExpo(P(t, 35.6, 36.2))})`;
  reveal($('s8case'), t, 35.7);
  const c = P(t, 35.9, 36.5);
  css($('s8cta'), { opacity: E.outCubic(c), transform: `translate(-50%, ${(1 - E.outExpo(c)) * 60}px)` });
}

function flash(t) {
  const hits = [[1.48, 0.45], [4.05, 0.25], [31.0, 0.35]];
  let o = 0;
  for (const [a, amt] of hits) if (t >= a) o = Math.max(o, amt * Math.exp(-14 * (t - a)));
  $('flash').style.opacity = o;
}

window.renderAt = function (t) {
  setBlur('x', 0);
  s1(t); s3(t); s4(t); s5(t); s6(t); s7(t); s8(t);
  flash(t);
  grain(t);
};
window.DUR = DUR;
window.ready = Promise.all([
  document.fonts.ready,
  ...Array.from(document.images).map((im) => (im.complete ? im.decode().catch(() => {}) : new Promise((r) => { im.onload = im.onerror = r; }))),
]).then(() => { window.renderAt(0); return true; });
