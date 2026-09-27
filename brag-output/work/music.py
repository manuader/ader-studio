"""Original soundtrack for the Ader × Urbetrack reel. 120 BPM, A minor, 38 s.
Music and SFX are written as one piece: same key, same room (shared reverb), SFX tucked under the groove."""
import numpy as np, wave

SR = 48000
DUR = 38.0
N = int(SR * DUR)
T = np.arange(N) / SR
BEAT = 0.5
rng = np.random.default_rng(7)

def z(): return np.zeros(N)
def hz(note):  # midi -> Hz
    return 440.0 * 2 ** ((note - 69) / 12)
def env_ad(n, a, d):
    a = max(1, int(a * SR)); x = np.ones(n)
    x[:a] = np.linspace(0, 1, a)
    x[a:] = np.exp(-np.arange(n - a) / (d * SR))
    return x
def place(buf, sig, t0, gain=1.0):
    i = int(t0 * SR)
    if i >= N: return
    j = min(N, i + len(sig)); buf[i:j] += sig[: j - i] * gain
def lp(x, fc):  # one-pole low-pass
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); s = 0.0
    for k in range(len(x)): s = (1 - a) * x[k] + a * s; y[k] = s
    return y
def lp_fast(x, fc, passes=2):
    from scipy.signal import lfilter
    a = np.exp(-2 * np.pi * fc / SR)
    y = x
    for _ in range(passes): y = lfilter([1 - a], [1, -a], y)
    return y
def hp_fast(x, fc): return x - lp_fast(x, fc, 1)
def noise(n): return rng.standard_normal(n)

# ─── song structure ─────────────────────────────────────────────
CHORDS = {  # midi notes (A minor: Am F C G)
    'Am': [57, 60, 64], 'F': [53, 57, 60], 'C': [48, 55, 60, 64], 'G': [55, 59, 62],
}
ROOT = {'Am': 45, 'F': 41, 'C': 48, 'G': 43}
PROG = ['Am', 'F', 'C', 'G']
def chord_at(t):
    if t >= 31.0: return 'Am' if t < 35.0 else 'F'
    return PROG[int(t // 4) % 4]

KICKS = [k * BEAT for k in range(int(4.0 / BEAT), int(30.5 / BEAT))]
KICKS = [k for k in KICKS if not (13.5 <= k < 14.0 or 18.75 <= k < 19.0 or 29.5 <= k < 30.5)]

# sidechain envelope from kicks
side = np.ones(N)
for k in KICKS:
    i = int(k * SR); n = int(0.42 * SR)
    seg = 1 - 0.62 * np.exp(-np.arange(n) / (0.09 * SR))
    j = min(N, i + n); side[i:j] = np.minimum(side[i:j], seg[: j - i])

# ─── instruments ────────────────────────────────────────────────
def kick(gain=1.0, length=0.45):
    n = int(length * SR); tt = np.arange(n) / SR
    f = 44 + 120 * np.exp(-tt / 0.035)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-tt / 0.16)
    click = noise(n) * np.exp(-tt / 0.003) * 0.25
    return np.tanh((body + click) * 1.6) * gain

def clap():
    n = int(0.3 * SR); tt = np.arange(n) / SR
    e = np.zeros(n)
    for off in (0, 0.009, 0.018):
        i = int(off * SR); e[i:] += np.exp(-(tt[: n - i]) / 0.012)
    e += 0.35 * np.exp(-tt / 0.09)
    return hp_fast(noise(n), 900) * e * 0.5

def hat(open_=False):
    n = int((0.16 if open_ else 0.05) * SR); tt = np.arange(n) / SR
    return hp_fast(noise(n), 7000) * np.exp(-tt / (0.05 if open_ else 0.012))

def pluck(note, dur=0.3, bright=6):
    n = int(dur * SR); tt = np.arange(n) / SR; f = hz(note)
    s = sum(np.sin(2 * np.pi * f * h * tt) / h * np.exp(-h / bright) for h in range(1, 9))
    return s * env_ad(n, 0.002, 0.11)

def bell(note, dur=3.0):
    n = int(dur * SR); tt = np.arange(n) / SR; f = hz(note)
    parts = [(1, 1, 1.4), (2.0, 0.45, 0.9), (3.01, 0.25, 0.6), (4.2, 0.12, 0.35), (5.43, 0.08, 0.2)]
    return sum(a * np.sin(2 * np.pi * f * r * tt) * np.exp(-tt / d) for r, a, d in parts) * env_ad(n, 0.004, 10)

def boom(gain=1.0, length=1.8):
    n = int(length * SR); tt = np.arange(n) / SR
    f = 30 + 55 * np.exp(-tt / 0.12)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.55)
    crash = lp_fast(noise(n), 3500) * np.exp(-tt / 0.35) * 0.35
    return np.tanh((s + crash) * 1.3) * gain

def whoosh(length=0.45, up=True):
    n = int(length * SR); tt = np.arange(n) / SR
    x = noise(n)
    lo = lp_fast(x, 700); hi = lp_fast(x, 4000)
    k = tt / length if up else 1 - tt / length
    s = lo * (1 - k) + hi * k
    envl = np.sin(np.pi * np.clip(tt / length, 0, 1)) ** 2
    return s * envl

def riser(length):
    n = int(length * SR); tt = np.arange(n) / SR; k = tt / length
    x = noise(n)
    s = lp_fast(x, 400) * (1 - k) + lp_fast(x, 2500) * k * 0.7 + hp_fast(x, 5000) * k ** 3 * 0.5
    tone = np.sin(2 * np.pi * np.cumsum(220 + 660 * k ** 2) / SR) * 0.15
    return (s + tone) * k ** 2

def tick(note=93, gain=1.0):
    n = int(0.08 * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * hz(note) * tt) * np.exp(-tt / 0.012) * gain

# ─── buses ──────────────────────────────────────────────────────
drums, bass, pad, arp, fx, verb_send = z(), z(), z(), z(), z(), z()

for k in KICKS: place(drums, kick(), k, 0.8)
place(drums, kick(1.0, 0.8), 31.0, 1.0)
for b in np.arange(8.0, 30.0, 1.0):  # claps on 2 & 4
    if 13.5 <= b + 0.5 < 14.0 or 29.5 <= b + 0.5: continue
    place(drums, clap(), b + 0.5, 0.55); place(verb_send, clap(), b + 0.5, 0.25)
for b in np.arange(4.0, 30.5, BEAT):  # off-beat open hats
    place(drums, hat(True), b + 0.25, 0.4)
for b in np.arange(14.0, 29.5, 0.125):  # 16th closed hats
    acc = 0.24 if int(round(b / 0.125)) % 2 else 0.12
    place(drums, hat(False), b, acc)
for i in range(16):  # build snare roll into the drop at 31
    tt = 29.0 + i * (2.0 / 16) * (1 - i / 40)
    place(drums, clap(), tt, 0.12 + 0.3 * i / 16)
# hook: clock-like ticks on the beat
for b in np.arange(0, 4.0, BEAT): place(fx, tick(81, 0.5), b); place(verb_send, tick(81, 0.3), b)

# bass: off-beat eighths on the chord root
for b in np.arange(4.0, 30.5, BEAT):
    if 13.5 <= b < 14.0 or 29.5 <= b: continue
    t0 = b + 0.25
    r = ROOT[chord_at(t0)]
    n = int(0.24 * SR); tt = np.arange(n) / SR
    f = hz(r - 12 + 12)  # A1..
    s = np.tanh(1.8 * (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt))) * env_ad(n, 0.004, 0.16)
    place(bass, s, t0, 0.55)
# sustained sub under the hook and outro
for t0, t1, r in [(0.0, 4.0, 33), (31.0, 35.0, 33), (35.0, 38.0, 29)]:
    n = int((t1 - t0) * SR); tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * hz(r) * tt) * env_ad(n, 0.3, (t1 - t0) * 0.8)
    place(bass, s, t0, 0.18)

# pad: detuned additive saws, brightness follows the arrangement
def pad_block(t0, t1, notes, bright, gain):
    n = int((t1 - t0) * SR); tt = np.arange(n) / SR
    s = np.zeros(n)
    for m in notes:
        for det in (-0.12, 0.0, 0.11):
            f = hz(m) * 2 ** (det / 12)
            for h in range(1, 7):
                s += np.sin(2 * np.pi * f * h * tt + rng.uniform(0, 6.28)) / h * np.exp(-h / bright)
    fade = np.minimum(1, np.minimum(tt / 0.25, (t1 - t0 - tt) / 0.25))
    place(pad, s * fade / (len(notes) * 3), t0, gain)
for blk in range(0, 31, 4):
    t0 = float(blk); t1 = min(t0 + 4.0, 31.0)
    if t0 >= 31: break
    c = chord_at(t0 + 0.1)
    bright = 1.6 if t0 < 4 else 3.0 if t0 < 26 else 3.8
    pad_block(t0, t1 + 0.2, [n for n in CHORDS[c]] + [CHORDS[c][0] + 12], bright, 0.55)
pad_block(31.0, 35.2, [57, 60, 64, 71], 2.0, 0.6)       # Am add9
pad_block(35.0, 38.0, [53, 57, 60, 64, 67], 2.0, 0.6)   # Fmaj9 — resolves on the logo

# arp: 16ths of chord tones, from the floors scene on
seq = [0, 1, 2, 3, 2, 1, 2, 3]
for i, b in enumerate(np.arange(8.0, 29.5, 0.125)):
    if 13.5 <= b < 14.0: continue
    c = CHORDS[chord_at(b)]
    tones = [c[0] + 12, c[1] + 12, c[2] + 12, c[0] + 24]
    note = tones[seq[i % 8]]
    g = 0.16 if i % 4 == 0 else 0.1
    place(arp, pluck(note, 0.25, 4 if b < 19 else 7), b, g)
# outro bells: a small motif that lands the tagline and the logo
for t0, nt in [(31.05, 76), (32.05, 69), (32.35, 72), (33.35, 76), (35.05, 81), (35.3, 76)]:
    place(arp, bell(nt, 3.0), t0, 0.22); place(verb_send, bell(nt, 3.0), t0, 0.25)

# fx: impacts, whooshes, risers, ticks — all in the same room
for t0, g in [(0.0, 0.8), (1.48, 0.9), (4.05, 0.7), (8.0, 0.4), (14.0, 0.5), (19.1, 0.45), (26.2, 0.4), (31.0, 1.0), (35.0, 0.5)]:
    b = boom(g); place(fx, b, t0, 0.7); place(verb_send, b, t0, 0.2)
for t0 in [1.3, 3.55, 7.5, 13.4, 15.5, 17.3, 18.75, 21.42, 22.92, 24.42, 25.8, 30.4]:
    w = whoosh(0.5); place(fx, w, t0, 0.35); place(verb_send, w, t0, 0.15)
place(fx, riser(1.5), 2.5, 0.35)
place(fx, riser(2.0), 29.0, 0.45)
for i in range(10):  # pins (pentatonic in A)
    place(fx, tick([81, 84, 88, 93, 91, 88, 84, 86, 88, 93][i], 0.35), 2.15 + i * 0.1 + 0.3)
for i in range(18):  # 300 m² counter
    place(fx, tick(96, 0.12), 14.0 + 0.9 * (i / 18) ** 1.6)
for i in range(30):  # 30 dots
    place(fx, tick(88 + (i % 5) * 2, 0.08), 15.85 + i * 0.022 + 0.05)
for i in range(24):  # 24 glass panes
    place(fx, tick(100, 0.07), 17.65 + i * 0.018)
for i in range(24):  # sheet counter 01→48
    place(fx, tick(93, 0.1), 26.15 + 1.4 * (i / 24) ** 1.5)
for i in range(6):   # material drops
    place(fx, kick(0.25, 0.2), 28.5 + i * 0.2 + 0.12)
# compass spin: tremolo noise that decays into a click
n = int(1.6 * SR); tt = np.arange(n) / SR
spin = lp_fast(noise(n), 2500) * (0.5 + 0.5 * np.sin(2 * np.pi * (18 * np.exp(-tt / 0.6)) * tt)) * np.exp(-tt / 0.5)
place(fx, spin, 31.15, 0.3)
place(fx, tick(93, 0.4), 33.1)

# ─── room + mix ────────────────────────────────────────────────
def reverb(x, length=2.6, decay=0.9, seed=1):
    r = np.random.default_rng(seed); n = int(length * SR); tt = np.arange(n) / SR
    ir = r.standard_normal(n) * np.exp(-tt / decay)
    ir = lp_fast(ir, 6000, 1); ir[: int(0.02 * SR)] *= np.linspace(0, 1, int(0.02 * SR))
    ir /= np.sqrt(np.sum(ir ** 2))
    L = len(x) + n; F = 1 << (L - 1).bit_length()
    y = np.fft.irfft(np.fft.rfft(x, F) * np.fft.rfft(ir, F), F)[: len(x)]
    return y

pad *= side; bass *= side ** 0.8; arp *= 0.6 + 0.4 * side
verb_in = verb_send + 0.35 * pad + 0.4 * arp + 0.1 * fx
wetL = reverb(verb_in, seed=1); wetR = reverb(verb_in, seed=2)

# ping-pong delay on the arp (dotted eighth)
dly = int(0.375 * SR)
arpL = arp.copy(); arpR = arp.copy()
arpR[dly:] += 0.35 * arp[:-dly]; arpL[2 * dly:] += 0.22 * arp[: -2 * dly]

L = 0.9 * drums + 0.6 * bass + 0.6 * pad + 0.85 * arpL + 0.7 * fx + 0.3 * wetL
R = 0.9 * drums + 0.6 * bass + 0.6 * pad + 0.85 * arpR + 0.7 * fx + 0.3 * wetR
# gentle pan movement on the pad for width
L += 0.08 * pad * np.sin(2 * np.pi * 0.07 * T); R -= 0.08 * pad * np.sin(2 * np.pi * 0.07 * T)
# tame sub mud on the master
L = L - 0.35 * lp_fast(L, 55); R = R - 0.35 * lp_fast(R, 55)
# fade-out tail
fo = np.clip((DUR - T) / 1.2, 0, 1); L *= fo; R *= fo
mx = max(np.abs(L).max(), np.abs(R).max())
L, R = np.tanh(1.2 * L / mx) * 0.9, np.tanh(1.2 * R / mx) * 0.9
st = (np.stack([L, R], 1) * 32767).astype('<i2')
with wave.open('music.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', DUR)
