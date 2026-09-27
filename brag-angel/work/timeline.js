// Ader Studio × Casa Angel — motion timeline. Every frame is a pure function of t (seconds).
const DUR = 36;
const $ = (id) => document.getElementById(id);

// ─── easing / helpers ────────────────────────────────────────────
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const E = {
  lin: (x) => x,
  outCubic: (x) => 1 - Math.pow(1 - x, 3),
  inCubic: (x) => x * x * x,
  inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  inOutQuart: (x) => (x < 0.5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2),
  outExpo: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  inExpo: (x) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10)),
  outBack: (x, s = 1.9) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
  inOutSine: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
};
const P = (t, a, b) => clamp((t - a) / (b - a));
const tw = (t, a, b, from, to, ease = E.outExpo) => from + (to - from) * ease(P(t, a, b));
const lerp = (a, b, k) => a + (b - a) * k;
const show = (el, on) => { el.style.visibility = on ? 'visible' : 'hidden'; };
const css = (el, o) => { for (const k in o) el.style[k] = o[k]; };
const pw = (x, pts) => { // piecewise-linear map
  if (x <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) if (x <= pts[i][0]) {
    const [a, va] = pts[i - 1], [b, vb] = pts[i];
    return va + (vb - va) * (x - a) / (b - a);
  }
  return pts[pts.length - 1][1];
};
function reveal(el, t, a, b = 1e9, dur = 0.55) {
  const inner = el.firstElementChild;
  const yin = tw(t, a, a + dur, 110, 0, E.outExpo);
  const yout = tw(t, b, b + 0.35, 0, -110, E.inCubic);
  inner.style.transform = `translateY(${t < b ? yin : yout}%)`;
}

// ─── image sequences (videos rendered frame-exact) ───────────────
const pending = [];
function seq(img, dir, count, fps, vt) {
  const n = clamp(Math.floor(vt * fps), 0, count - 1) + 1;
  const src = `assets/${dir}/${String(n).padStart(4, '0')}.jpg`;
  if (img.dataset.src !== src) {
    img.dataset.src = src;
    img.src = src;
    pending.push(img.decode().catch(() => {}));
  }
}

// ─── static DOM ──────────────────────────────────────────────────
const STAGES = [
  { a: 2.5, n: '01', title: 'TERRENO', desc: 'Relevamiento del terreno: límites, dimensiones y condicionantes del sitio.' },
  { a: 4.5, n: '02', title: 'GRILLA Y TRAZADO', desc: 'Una grilla que ordena el trazado y las proporciones.' },
  { a: 6.5, n: '03', title: 'ANÁLISIS CON IA', desc: 'El plano del terreno, estudiado con inteligencia artificial para explorar alternativas.' },
  { a: 8.5, n: '04', title: 'COMPOSICIÓN', desc: 'La composición volumétrica surge de los datos del sitio y del programa.' },
  { a: 10.0, n: '05', title: 'MORFOLOGÍA', desc: 'La forma emerge de la síntesis del proceso.' },
  { a: 11.5, n: '06', title: 'PLANTA BAJA', desc: 'Distribución funcional y relaciones espaciales finales.' },
];
const S2_END = 13.5;
const LAYERS = [
  { a: 13.75, title: 'ESTRUCTURA', sub: 'Muros portantes de hormigón armado.' },
  { a: 14.75, title: 'CERRAMIENTOS', sub: 'Construcción en seco y aventanamientos de piso a techo.' },
  { a: 15.75, title: 'ARQUITECTURA', sub: 'Configuración espacial y relaciones funcionales.' },
  { a: 16.75, title: 'INSTALACIONES', sub: 'Sanitarias, cloacales y termomecánicas, coordinadas.' },
];
(function build() {
  const tr = $('s2numTrack');
  STAGES.forEach((s) => { const d = document.createElement('div'); d.textContent = s.n; tr.appendChild(d); });
  const rail = $('s2rail');
  STAGES.forEach(() => { const i = document.createElement('i'); i.appendChild(document.createElement('b')); rail.appendChild(i); });
  const g = $('linesG');
  for (let i = 0; i < 6; i++) g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
  const gh = $('s6ghosts'), d = $('s6needle').innerHTML;
  for (let i = 0; i < 5; i++) { const e = document.createElementNS('http://www.w3.org/2000/svg', 'g'); e.innerHTML = d; gh.appendChild(e); }
})();

// ─── grain + lines ───────────────────────────────────────────────
const gctx = $('grain').getContext('2d');
const gimg = gctx.createImageData(540, 960);
function grain(t) {
  let seed = (Math.floor(t * 30) * 9301 + 49297) % 233280;
  const d = gimg.data;
  for (let i = 0; i < d.length; i += 4) {
    seed = (seed * 9301 + 49297) % 233280;
    d[i] = d[i + 1] = d[i + 2] = 128 + ((seed / 233280) - 0.5) * 255; d[i + 3] = 255;
  }
  gctx.putImageData(gimg, 0, 0);
}
function lines(t) {
  const ps = $('linesG').children;
  for (let i = 0; i < ps.length; i++) {
    const y0 = 180 + i * 300, ph = t * (0.35 + i * 0.05) + i;
    let d = `M-100,${y0}`;
    for (let x = -100; x <= 1180; x += 40) d += ` L${x},${(y0 + 70 * Math.sin(x / 190 + ph) + 30 * Math.sin(x / 83 - ph * 1.3)).toFixed(1)}`;
    ps[i].setAttribute('d', d);
  }
}

// ─── S1 · hook ───────────────────────────────────────────────────
function s1(t) {
  show($('s1'), t < 3.4);
  if (t >= 3.4) return;
  $('s1').style.zIndex = 10;
  const paper = E.inOutQuart(P(t, 2.28, 2.55));
  // video: night with the car, then a fast rewind to the day
  const vt = t < 1.25 ? lerp(3.7, 5.05, t / 1.25) : lerp(5.05, 0, E.inOutCubic(P(t, 1.25, 2.35)));
  seq($('s1img'), 'rv', 122, 24, vt);
  const rew = P(t, 1.25, 2.35);
  const shake = rew > 0 && rew < 1 ? Math.sin(t * 90) * 6 * Math.sin(Math.PI * rew) : 0;
  const sc = tw(t, 0, 1.25, 1.18, 1.04, E.outCubic) + 0.12 * Math.sin(Math.PI * rew);
  const img = $('s1img');
  img.style.transform = `translate(calc(-50% + ${shake}px), ${-shake}px) scale(${sc})`;
  img.style.filter = `saturate(${1 - 0.8 * Math.sin(Math.PI * rew)}) blur(${2.5 * Math.sin(Math.PI * rew)}px)`;
  $('s1frame').style.clipPath = `inset(${tw(t, 0, 0.5, 50, 0)}% 0 ${tw(t, 0, 0.5, 50, 0)}% 0)`;
  $('s1frame').style.visibility = t < 2.55 ? 'visible' : 'hidden';
  $('s1').style.background = t < 2.55 ? '#1A1917' : 'transparent';
  reveal($('s1t1'), t, 0.2, 2.0);
  const pp = $('s1paper');
  pp.style.transform = `scaleY(${paper})`;
  pp.style.visibility = t < 2.55 ? 'visible' : 'hidden';
  reveal($('s1t2'), t, 2.45, 3.1);
}

// ─── S2 · proceso ────────────────────────────────────────────────
function s2(t) {
  show($('s2'), t >= 2.5 && t < 13.95);
  if (t < 2.5 || t >= 13.95) return;
  const out = E.inOutQuart(P(t, 13.45, 13.9));
  $('s2').style.transform = `translateY(${-out * 1920}px)`;
  // process video mapped to the stages
  const vt = pw(t, [[2.5, 0], [4.5, 2.0], [6.5, 3.6], [8.5, 5.9], [10, 8.0], [11.5, 10.0], [13.5, 11.95]]);
  seq($('s2img'), 'tv', 360, 30, vt);
  let i = 0;
  for (let k = 0; k < STAGES.length; k++) if (t >= STAGES[k].a) i = k;
  const a = STAGES[i].a, b = i < STAGES.length - 1 ? STAGES[i + 1].a : S2_END;
  const bump = Math.exp(-6 * (t - a)) * (i === 0 ? 0 : 1);
  const cam = tw(t, 2.5, 13.5, 1.0, 1.12, E.lin) + 0.05 * bump;
  const drift = Math.sin(t * 0.7) * 14;
  css($('s2img'), {
    transform: `translate(${drift}px, ${tw(t, 2.5, 3.3, 260, 0)}px) scale(${cam}) rotate(${Math.sin(t * 0.45) * 1.2}deg)`,
    opacity: P(t, 2.5, 2.8),
  });
  // big number rolls to the current stage
  const textStart = 3.3;
  let y = 0;
  for (let k = 1; k < STAGES.length; k++) y += E.inOutQuart(P(t, STAGES[k].a - 0.18, STAGES[k].a + 0.22));
  const numIn = tw(t, textStart, textStart + 0.6, 420, 0);
  $('s2numTrack').style.transform = `translateY(${-400 * y + numIn}px)`;
  // title swaps on each stage
  const title = $('s2title').firstElementChild;
  title.textContent = STAGES[i].title;
  const ta = i === 0 ? textStart + 0.12 : a + 0.05;
  const yin = tw(t, ta, ta + 0.45, 110, 0), yout = tw(t, b - 0.22, b, 0, -110, E.inCubic);
  title.style.transform = `translateY(${t < b - 0.22 || i === STAGES.length - 1 ? yin : yout}%)`;
  const dsc = $('s2desc');
  dsc.textContent = STAGES[i].desc;
  const da = ta + 0.2;
  css(dsc, {
    opacity: Math.min(P(t, da, da + 0.3), i === STAGES.length - 1 ? 1 : 1 - P(t, b - 0.25, b - 0.05)),
    transform: `translateY(${tw(t, da, da + 0.5, 30, 0)}px)`,
  });
  // rail
  const bars = $('s2rail').children;
  for (let k = 0; k < bars.length; k++) {
    const ka = STAGES[k].a, kb = k < STAGES.length - 1 ? STAGES[k + 1].a : S2_END;
    bars[k].firstChild.style.transform = `scaleX(${P(t, ka, kb)})`;
  }
  $('s2rail').style.opacity = P(t, 3.3, 3.6);
  $('s2code').textContent = `${STAGES[i].n} / 06`;
}

// ─── S3 · BIM ────────────────────────────────────────────────────
const SH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function s3(t) {
  show($('s3'), t >= 13.45 && t < 19.75);
  if (t < 13.45 || t >= 19.75) return;
  const enter = E.inOutQuart(P(t, 13.45, 13.9));
  const exit = E.inOutQuart(P(t, 19.3, 19.7));
  $('s3').style.transform = `translateY(${(1 - enter) * 1920}px) translateX(${-exit * 1080}px)`;
  let li = -1;
  for (let k = 0; k < LAYERS.length; k++) if (t >= LAYERS[k].a) li = k;
  ['b1', 'b2', 'b3', 'b4'].forEach((id, k) => {
    const a = LAYERS[k].a;
    const e = P(t, a - 0.05, a + 0.3);
    const next = k < 3 ? P(t, LAYERS[k + 1].a - 0.05, LAYERS[k + 1].a + 0.25) : 0;
    css($(id), {
      opacity: k === 0 ? E.outCubic(e) : E.outCubic(e) * (1 - (k < 3 ? next : 0)),
      transform: `translateY(${(1 - E.outExpo(e)) * -60}px)`,
    });
    if (k < 3 && next > 0) $(id).style.opacity = 1 - next;
  });
  // camera punch on each layer, then orbit-like drift
  const hit = li >= 0 ? Math.exp(-7 * (t - LAYERS[li].a)) : 0;
  const zoomOut = tw(t, 17.4, 18.3, 1, 0.9, E.inOutCubic);
  $('s3cam').style.transform = `scale(${(tw(t, 13.6, 17.4, 0.94, 1.06, E.lin) + 0.05 * hit) * zoomOut}) rotate(${Math.sin(t * 0.8) * 1.5}deg)`;
  // BIM letters shuffle and lock
  const letters = $('s3big').children;
  for (let k = 0; k < 3; k++) {
    const lock = 14.1 + k * 0.18;
    letters[k].textContent = t >= lock ? 'BIM'[k] : SH[Math.floor(t * 30 + k * 7) % SH.length];
    css(letters[k], { opacity: P(t, 13.7, 13.85), transform: `translateY(${tw(t, 13.6, 14.1, 120, 0)}px)` });
  }
  // layer label
  if (li >= 0) {
    const L = LAYERS[li], nb = li < 3 ? LAYERS[li + 1].a : 99;
    $('s3ln').textContent = `0${li + 1}`;
    const tt = $('s3lt').firstElementChild;
    tt.textContent = L.title;
    const yin = tw(t, L.a, L.a + 0.4, 110, 0), yout = tw(t, nb - 0.15, nb, 0, -110, E.inCubic);
    tt.style.transform = `translateY(${t < nb - 0.15 ? yin : yout}%)`;
    const sub = $('s3ls');
    sub.textContent = L.sub;
    sub.style.opacity = Math.min(P(t, L.a + 0.15, L.a + 0.4), 1 - P(t, nb - 0.15, nb));
  }
  $('s3layer').style.opacity = 1 - P(t, 18.9, 19.2);
  const bars = $('s3bars').children;
  for (let k = 0; k < 4; k++) bars[k].style.background = t >= LAYERS[k].a ? '#1A1917' : '#E2DED6';
}

// ─── S4 · fachada ────────────────────────────────────────────────
const colorImg = new Image(); colorImg.src = 'assets/fcolor.jpg';
const s4ctx = $('s4canvas').getContext('2d');
const maskC = document.createElement('canvas'); maskC.width = 1920; maskC.height = 1440;
const mctx = maskC.getContext('2d');
function brushPath(k) { // 0..1 → canvas coords of the light brush
  return [960 + 760 * Math.sin(k * Math.PI * 2.2 - 1.2), 760 + 360 * Math.sin(k * Math.PI * 3.4 + 0.4)];
}
function s4(t) {
  show($('s4'), t >= 19.3 && t < 24.35);
  if (t < 19.3 || t >= 24.35) return;
  const enter = E.inOutQuart(P(t, 19.3, 19.7));
  const exit = E.inOutQuart(P(t, 23.9, 24.3));
  $('s4').style.transform = `translateX(${(1 - enter) * 1080}px) translateY(${-exit * 1920}px)`;
  reveal($('s4t1'), t, 19.55, 21.15);
  // the line drawing is traced left → right
  const tr = E.inOutCubic(P(t, 19.7, 20.9));
  const line = $('s4line');
  const lineOut = E.inOutQuart(P(t, 21.1, 21.45));
  css(line, {
    clipPath: `inset(0 ${(1 - tr) * 100}% 0 0)`,
    transform: `scale(${tw(t, 19.7, 21.4, 0.96, 1.04, E.lin) + lineOut * 0.2})`,
    opacity: 1 - lineOut,
  });
  // grey render wipes in, then a brush of light colours it
  const ph = $('s4photo');
  const open = E.inOutQuart(P(t, 21.2, 21.6));
  ph.style.clipPath = `inset(${(1 - open) * 50}% 0 ${(1 - open) * 50}% 0)`;
  ph.style.visibility = t >= 21.2 ? 'visible' : 'hidden';
  $('s4byn').style.transform = $('s4canvas').style.transform = `scale(${tw(t, 21.2, 24, 1.08, 1.0, E.outCubic)})`;
  if (colorImg.complete && t >= 21.5) {
    mctx.clearRect(0, 0, 1920, 1440);
    const prog = E.inOutSine(P(t, 21.6, 23.2));
    const steps = 90;
    for (let s = 0; s <= steps * prog; s++) {
      const k = s / steps;
      const [x, y] = brushPath(k);
      const r = 230 + 120 * Math.sin(k * 9);
      const g = mctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.6, 'rgba(0,0,0,.9)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      mctx.fillStyle = g; mctx.beginPath(); mctx.arc(x, y, r, 0, Math.PI * 2); mctx.fill();
    }
    const full = E.inOutCubic(P(t, 22.9, 23.5));
    if (full > 0) { mctx.globalAlpha = full; mctx.fillRect(0, 0, 1920, 1440); mctx.globalAlpha = 1; }
    s4ctx.globalCompositeOperation = 'source-over';
    s4ctx.clearRect(0, 0, 1920, 1440);
    s4ctx.drawImage(colorImg, 0, 0, 1920, 1440);
    s4ctx.globalCompositeOperation = 'destination-in';
    s4ctx.drawImage(maskC, 0, 0);
    s4ctx.globalCompositeOperation = 'source-over';
  } else s4ctx.clearRect(0, 0, 1920, 1440);
  reveal($('s4t2'), t, 22.1, 23.75);
}

// ─── S5 · la casa ────────────────────────────────────────────────
function s5(t) {
  show($('s5'), t >= 23.9 && t < 30.2);
  if (t < 23.9 || t >= 30.2) return;
  const rise = E.inOutQuart(P(t, 23.9, 24.3));
  $('s5').style.clipPath = `inset(${(1 - rise) * 100}% 0 0 0)`;
  seq($('s5vid'), 'rv', 122, 24, pw(t, [[24.0, 0], [27.0, 5.05]]));
  $('s5vid').style.transform = `translateX(calc(-50% + ${tw(t, 24, 27.2, 260, -180, E.inOutSine)}px)) scale(${tw(t, 24, 27.2, 1.12, 1.0, E.outCubic)})`;
  const wipe = (id, a) => {
    const e = E.inOutQuart(P(t, a, a + 0.4));
    const el = $(id);
    el.style.clipPath = `inset(0 0 0 ${(1 - e) * 100}%)`;
    el.style.visibility = t >= a ? 'visible' : 'hidden';
    el.firstElementChild.style.transform = `translateX(${(1 - e) * 200}px) scale(${tw(t, a, a + 2.2, 1.14, 1.0, E.outCubic)})`;
  };
  wipe('s5b', 27.0);
  wipe('s5c', 28.45);
  reveal($('s5t1'), t, 24.45, 26.75);
  reveal($('s5t2'), t, 27.25, 28.3);
  reveal($('s5name'), t, 28.7, 29.75);
  reveal($('s5loc'), t, 28.9, 29.8);
}

// ─── S6 · norte ──────────────────────────────────────────────────
const needleAngle = (t) => {
  const x = t - 30.15;
  if (x < 0) return 1170;
  const settle = 90 + 1080 * Math.exp(-2.4 * x) * Math.cos(2 * Math.PI * 0.5 * x);
  return lerp(settle, 0, E.inOutCubic(P(t, 33.0, 33.45)));
};
function s6(t) {
  show($('s6'), t >= 29.95);
  if (t < 29.95) return;
  const ringIn = P(t, 30.0, 30.45);
  const logoMove = E.outExpo(P(t, 33.6, 34.3));
  $('s6logoWrap').style.transform = `translateY(${-240 * logoMove}px) scale(${lerp(1, 0.6, logoMove) * tw(t, 34.3, 36, 1, 1.02, E.lin)})`;
  $('s6mark').style.transform = `scale(${lerp(0.05, 1, E.outBack(ringIn, 1.7))})`;
  const ni = E.outBack(P(t, 30.15, 30.45), 2);
  const cross = P(t, 33.35, 33.65);
  const nd = $('s6needle');
  nd.setAttribute('transform', `rotate(${needleAngle(t)}) scale(${ni})`);
  nd.style.opacity = 1 - cross;
  $('s6ring').style.opacity = 1 - cross;
  const gh = $('s6ghosts').children;
  const speed = Math.abs(needleAngle(t) - needleAngle(t - 1 / 60));
  for (let i = 0; i < gh.length; i++) {
    gh[i].setAttribute('transform', `rotate(${needleAngle(t - (i + 1) * 0.012)}) scale(${ni})`);
    gh[i].style.opacity = Math.min(0.14, speed / 200) * (1 - cross);
  }
  $('s6full').style.opacity = cross;
  reveal($('s6t1'), t, 30.9, 33.0);
  reveal($('s6t2'), t, 31.15, 33.05);
  reveal($('s6name'), t, 33.85);
  reveal($('s6desc'), t, 34.05);
  $('s6rule').style.transform = `scaleX(${E.outExpo(P(t, 34.2, 34.8))})`;
  reveal($('s6case'), t, 34.3);
  const c = P(t, 34.5, 35.1);
  css($('s6cta'), { opacity: E.outCubic(c), transform: `translate(-50%, ${(1 - E.outExpo(c)) * 60}px)` });
}

function flash(t) {
  let o = 0;
  for (const [a, amt] of [[2.5, 0.35], [13.75, 0.18], [30.0, 0.3]]) if (t >= a) o = Math.max(o, amt * Math.exp(-14 * (t - a)));
  $('flash').style.opacity = o;
}

window.renderAt = function (t) {
  pending.length = 0;
  lines(t);
  s1(t); s2(t); s3(t); s4(t); s5(t); s6(t);
  flash(t);
  grain(t);
  return Promise.all(pending);
};
window.DUR = DUR;
window.ready = Promise.all([
  document.fonts.ready,
  new Promise((r) => { if (colorImg.complete) r(); else colorImg.onload = r; }),
  ...Array.from(document.images).filter((im) => im.getAttribute('src')).map((im) => (im.complete ? im.decode().catch(() => {}) : new Promise((r) => { im.onload = im.onerror = r; }))),
]).then(() => window.renderAt(0)).then(() => true);
