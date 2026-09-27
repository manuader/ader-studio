"""Original soundtrack for the Ader × Casa Angel reel. 120 BPM, D major, 36 s.
Music and SFX are written as one piece: same key, same room (shared reverb), SFX tucked under the groove."""
import numpy as np, wave

SR = 48000
DUR = 36.0
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
CHORDS = {  # D major: D Bm G A
    'D': [62, 66, 69], 'Bm': [59, 62, 66], 'G': [55, 59, 62, 67], 'A': [57, 61, 64],
}
ROOT = {'D': 38, 'Bm': 35, 'G': 43, 'A': 45}
PROG = ['D', 'Bm', 'G', 'A']
def chord_at(t):
    if t >= 30.0: return 'D' if t < 33.5 else 'G'
    return PROG[int((t - 0.5) // 4) % 4] if t >= 0.5 else 'D'

def groove_on(k):  # where the four-on-the-floor kick plays
    return (8.5 <= k < 19.25) or (24.0 <= k < 29.5)
KICKS = [k * BEAT for k in range(int(4.5 / BEAT), int(29.5 / BEAT))]
KICKS = [k for k in KICKS if groove_on(k) or (4.5 <= k < 8.5 and (k - 4.5) % 1.0 == 0)]

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

for k in KICKS: place(drums, kick(), k, 0.78)
place(drums, kick(1.0, 0.8), 30.0, 1.0)
place(drums, kick(0.9, 0.6), 2.5, 0.9)
for b in np.arange(6.5, 29.5, 1.0):  # claps on 2 & 4
    tt0 = b + 0.5
    if 19.25 <= tt0 < 24.0 or tt0 >= 29.0: continue
    place(drums, clap(), tt0, 0.5); place(verb_send, clap(), tt0, 0.25)
for b in np.arange(2.5, 29.5, BEAT):  # off-beat open hats
    if 19.25 <= b < 23.5: continue
    place(drums, hat(True), b + 0.25, 0.32 if b < 8.5 else 0.42)
for b in np.arange(13.5, 29.0, 0.125):  # 16th closed hats in the high-energy parts
    if 19.25 <= b < 24.0: continue
    acc = 0.24 if int(round(b / 0.125)) % 2 else 0.12
    place(drums, hat(False), b, acc)
for i in range(16):  # roll into the compass at 30
    tt0 = 28.0 + i * (2.0 / 16) * (1 - i / 40)
    place(drums, clap(), tt0, 0.1 + 0.3 * i / 16)
# hook: clock ticks, then the rewind
for b in np.arange(0, 1.25, BEAT): place(fx, tick(74, 0.45), b); place(verb_send, tick(74, 0.3), b)
n = int(1.15 * SR); tt = np.arange(n) / SR
rew = np.sin(2 * np.pi * np.cumsum(880 * np.exp(-tt / 0.35) + 60) / SR) * 0.25 + lp_fast(noise(n), 1800) * 0.5
rew *= np.linspace(0.2, 1, n) ** 2
place(fx, rew, 1.25, 0.5); place(verb_send, rew, 1.25, 0.2)
for i in range(14):  # tape-like rewind ticks, accelerating
    place(fx, tick(86 - i, 0.25), 1.25 + 1.1 * (i / 14) ** 0.7)

# bass: off-beat eighths on the chord root (groove parts only)
for b in np.arange(4.5, 29.5, BEAT):
    if 19.25 <= b < 24.0: continue
    t0 = b + 0.25
    r = ROOT[chord_at(t0)]
    n = int(0.24 * SR); tt = np.arange(n) / SR
    f = hz(r)
    s_ = np.tanh(1.6 * (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt))) * env_ad(n, 0.004, 0.16)
    place(bass, s_, t0, 0.5 if b >= 8.5 else 0.3)
for t0, t1, r in [(0.0, 2.5, 38), (19.5, 24.0, 43), (30.0, 33.5, 38), (33.5, 36.0, 43)]:
    n = int((t1 - t0) * SR); tt = np.arange(n) / SR
    s_ = np.sin(2 * np.pi * hz(r - 12) * tt) * env_ad(n, 0.3, (t1 - t0) * 0.8)
    place(bass, s_, t0, 0.2)

# pad: detuned additive saws, brightness follows the arrangement
def pad_block(t0, t1, notes, bright, gain):
    n = int((t1 - t0) * SR); tt = np.arange(n) / SR
    s_ = np.zeros(n)
    for m in notes:
        for det in (-0.12, 0.0, 0.11):
            f = hz(m) * 2 ** (det / 12)
            for h in range(1, 7):
                s_ += np.sin(2 * np.pi * f * h * tt + rng.uniform(0, 6.28)) / h * np.exp(-h / bright)
    fade = np.minimum(1, np.minimum(tt / 0.3, (t1 - t0 - tt) / 0.3))
    place(pad, s_ * fade / (len(notes) * 3), t0, gain)
pad_block(0.0, 2.6, [50, 57, 62, 64], 1.2, 0.5)            # dark Dadd9 under the night render
edges = [2.5, 4.5, 6.5, 8.5, 10.5, 12.5, 14.5, 16.5, 18.5, 20.5, 22.5, 24.5, 26.5, 28.5, 30.0]
for i in range(len(edges) - 1):
    t0, t1 = edges[i], edges[i + 1]
    c = chord_at(t0 + 0.1)
    bright = 2.0 if t0 < 8.5 else 3.2
    pad_block(t0, t1 + 0.2, CHORDS[c] + [CHORDS[c][0] + 12], bright, 0.55)
pad_block(30.0, 33.7, [62, 66, 69, 76], 2.0, 0.6)          # Dadd9
pad_block(33.5, 36.0, [55, 59, 62, 66, 69], 2.0, 0.6)      # Gmaj9 — lands the logo

# piano-like plucks: 8ths through the process, 16ths from the BIM drop
seq = [0, 1, 2, 3, 2, 1, 2, 3]
for i, b in enumerate(np.arange(2.5, 29.5, 0.125)):
    six = (13.5 <= b < 19.25) or (24.0 <= b < 29.5)
    if not six and (i % 2): continue
    c = CHORDS[chord_at(b)]
    tones = [c[0] + 12, c[1] + 12, c[2] + 12, c[0] + 24]
    note = tones[seq[(i // (1 if six else 2)) % 8]]
    g = (0.15 if i % 4 == 0 else 0.09) * (0.8 if 19.25 <= b < 24 else 1)
    place(arp, pluck(note, 0.3, 3.5 if b < 13.5 else 6), b, g)
# bells: the "trace" break and the outro
for t0, nt in [(19.5, 81), (20.5, 78), (21.0, 74), (22.0, 76), (23.0, 78), (30.05, 78), (31.05, 74), (31.35, 76), (32.35, 81), (33.55, 83), (33.8, 78)]:
    place(arp, bell(nt, 3.0), t0, 0.2); place(verb_send, bell(nt, 3.0), t0, 0.25)

# fx: impacts, whooshes, risers, ticks — all in the same room
for t0, g in [(0.0, 0.7), (2.5, 0.9), (13.5, 0.6), (19.5, 0.4), (24.0, 0.7), (30.0, 1.0), (33.5, 0.45)]:
    b = boom(g); place(fx, b, t0, 0.7); place(verb_send, b, t0, 0.2)
for t0 in [2.3, 4.35, 6.35, 8.35, 9.85, 11.35, 13.35, 19.2, 21.1, 23.8, 26.4, 27.5, 28.6, 29.8]:
    w = whoosh(0.5); place(fx, w, t0, 0.33); place(verb_send, w, t0, 0.15)
place(fx, riser(1.8), 11.7, 0.35)
place(fx, riser(2.1), 21.9, 0.4)
place(fx, riser(1.8), 28.2, 0.45)
for k in range(3):  # BIM letters shuffle
    for i in range(8): place(fx, tick(90 + k * 2, 0.07), 13.7 + i * 0.05 + k * 0.03)
    place(fx, tick(86 + k * 3, 0.3), 14.1 + k * 0.18)
for k, a in enumerate([13.75, 14.75, 15.75, 16.75]):  # layer hits
    place(fx, kick(0.3, 0.25), a, 0.6); place(fx, tick([74, 78, 81, 86][k], 0.3), a)
# compass spin
n = int(1.6 * SR); tt = np.arange(n) / SR
spin = lp_fast(noise(n), 2500) * (0.5 + 0.5 * np.sin(2 * np.pi * (18 * np.exp(-tt / 0.6)) * tt)) * np.exp(-tt / 0.5)
place(fx, spin, 30.15, 0.3)
place(fx, tick(86, 0.4), 33.0)

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
