let audioCtx: AudioContext | null = null;
let soundMuted = false;
let bgmPlaying = false;
let bgmTimer: ReturnType<typeof setInterval> | null = null;
let bgmMasterGain: GainNode | null = null;
let stepIndex = 0;

type BgmListener = (playing: boolean) => void;
const listeners = new Set<BgmListener>();

export function subscribeBgmState(fn: BgmListener): () => void {
  listeners.add(fn);
  fn(bgmPlaying && !soundMuted);
  return () => {
    listeners.delete(fn);
  };
}

function notifyListeners() {
  const active = bgmPlaying && !soundMuted && !!audioCtx && audioCtx.state === 'running';
  listeners.forEach((fn) => fn(active));
}

function getOrCreateAudioContext(): AudioContext | null {
  if (audioCtx) return audioCtx;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  audioCtx = new Ctx();
  audioCtx.addEventListener('statechange', () => {
    notifyListeners();
  });
  return audioCtx;
}

function ensureMasterBus(ctx: AudioContext): GainNode {
  if (bgmMasterGain) return bgmMasterGain;

  const master = ctx.createGain();
  master.gain.setValueAtTime(soundMuted ? 0.0001 : 0.24, ctx.currentTime);

  // Warm Studio Ghibli stereo echo / meadow reverb network
  const dryGain = ctx.createGain();
  dryGain.gain.value = 0.75;

  const delayL = ctx.createDelay(1.0);
  delayL.delayTime.value = 0.34;
  const delayR = ctx.createDelay(1.0);
  delayR.delayTime.value = 0.51;

  const fbGain = ctx.createGain();
  fbGain.gain.value = 0.36;

  const toneFilter = ctx.createBiquadFilter();
  toneFilter.type = 'lowpass';
  toneFilter.frequency.value = 1850;

  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.38;

  master.connect(dryGain);
  dryGain.connect(ctx.destination);

  master.connect(toneFilter);
  toneFilter.connect(delayL);
  delayL.connect(delayR);
  delayR.connect(fbGain);
  fbGain.connect(toneFilter);

  delayL.connect(wetGain);
  delayR.connect(wetGain);
  wetGain.connect(ctx.destination);

  bgmMasterGain = master;
  return master;
}

// Studio Ghibli inspired chord progression: Fmaj9 -> G6 -> Em7 -> Am9
const GHIBLI_CHORDS = [
  {
    pad: [174.61, 220.0, 261.63, 329.63], // F3, A3, C4, E4
    melody: [523.25, 659.25, 587.33, 523.25, 440.0, 523.25, 659.25, 783.99],
  },
  {
    pad: [196.0, 246.94, 293.66, 392.0], // G3, B3, D4, G4
    melody: [659.25, 587.33, 493.88, 587.33, 659.25, 783.99, 880.0, 783.99],
  },
  {
    pad: [164.81, 196.0, 246.94, 293.66], // E3, G3, B3, D4
    melody: [587.33, 523.25, 493.88, 392.0, 493.88, 523.25, 587.33, 659.25],
  },
  {
    pad: [220.0, 261.63, 329.63, 392.0], // A3, C4, E4, G4
    melody: [523.25, 440.0, 392.0, 440.0, 523.25, 587.33, 523.25, 440.0],
  },
];

function playWarmPadChord(ctx: AudioContext, dest: AudioNode, freqs: number[], duration = 4.2) {
  const now = ctx.currentTime;
  freqs.forEach((f, idx) => {
    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    sub.type = 'triangle';
    osc.frequency.setValueAtTime(f, now);
    sub.frequency.setValueAtTime(f * 1.002, now); // subtle warm chorus detune

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(680 + idx * 120, now);

    const peak = 0.038 / Math.sqrt(freqs.length);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + 1.1);
    gain.gain.setValueAtTime(peak, now + duration - 1.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    sub.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start(now);
    sub.start(now);
    osc.stop(now + duration + 0.05);
    sub.stop(now + duration + 0.05);
  });
}

function playFeltPianoNote(ctx: AudioContext, dest: AudioNode, freq: number, dur = 1.35, vol = 0.055) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const harmonic = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'sine';
  harmonic.type = 'triangle';
  osc.frequency.setValueAtTime(freq, now);
  harmonic.frequency.setValueAtTime(freq * 2, now);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1600, now);
  filter.frequency.exponentialRampToValueAtTime(420, now + dur);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(vol, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  const harmGain = ctx.createGain();
  harmGain.gain.setValueAtTime(vol * 0.22, now);
  harmGain.gain.exponentialRampToValueAtTime(0.0001, now + dur * 0.45);

  osc.connect(filter);
  harmonic.connect(harmGain);
  harmGain.connect(filter);
  filter.connect(gain);
  gain.connect(dest);

  osc.start(now);
  harmonic.start(now);
  osc.stop(now + dur + 0.04);
  harmonic.stop(now + dur + 0.04);
}

function scheduleBgmBar() {
  if (soundMuted || !bgmPlaying) return;
  const ctx = getOrCreateAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const master = ensureMasterBus(ctx);
  const chordObj = GHIBLI_CHORDS[stepIndex % GHIBLI_CHORDS.length];
  stepIndex++;

  // Play warm underlying pad chord for 4.4s
  playWarmPadChord(ctx, master, chordObj.pad, 4.4);

  // Schedule gentle felt-piano / celesta notes across the 4-second bar
  chordObj.melody.forEach((noteFreq, i) => {
    // Skip an occasional beat for organic breathing room
    if (i === 3 || i === 7) {
      if (Math.random() < 0.35) return;
    }
    const delayMs = i * 500 + (Math.random() * 24 - 12);
    setTimeout(() => {
      if (!bgmPlaying || soundMuted || !audioCtx || audioCtx.state !== 'running') return;
      const vel = i % 2 === 0 ? 0.052 : 0.036;
      playFeltPianoNote(audioCtx, master, noteFreq, 1.45, vel);
    }, Math.max(0, delayMs));
  });
}

export async function startAmbientBgm(): Promise<boolean> {
  try {
    const ctx = getOrCreateAudioContext();
    if (!ctx) return false;

    soundMuted = false;
    bgmPlaying = true;
    const master = ensureMasterBus(ctx);
    master.gain.setTargetAtTime(0.24, ctx.currentTime, 0.15);

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (!bgmTimer) {
      scheduleBgmBar();
      bgmTimer = setInterval(scheduleBgmBar, 4000);
    }

    notifyListeners();
    return ctx.state === 'running';
  } catch {
    notifyListeners();
    return false;
  }
}

export function stopAmbientBgm() {
  soundMuted = true;
  bgmPlaying = false;
  if (bgmTimer) {
    clearInterval(bgmTimer);
    bgmTimer = null;
  }
  if (audioCtx && bgmMasterGain) {
    try {
      bgmMasterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.08);
    } catch {
      // ignore
    }
  }
  notifyListeners();
}

export function toggleAmbientBgm(): boolean {
  if (bgmPlaying && !soundMuted && audioCtx && audioCtx.state === 'running') {
    stopAmbientBgm();
    return false;
  } else {
    startAmbientBgm();
    return true;
  }
}

export function isAmbientBgmPlaying(): boolean {
  return bgmPlaying && !soundMuted && !!audioCtx && audioCtx.state === 'running';
}

export function playChime(freq = 523.25, dur = 0.36) {
  if (soundMuted) return;
  try {
    const ctx = getOrCreateAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    overtone.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    overtone.frequency.setValueAtTime(freq * 2, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.075, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + dur);
    osc.connect(gain);
    overtone.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    overtone.start(now);
    osc.stop(now + dur + 0.02);
    overtone.stop(now + dur + 0.02);
  } catch {
    // Ignore audio context restriction errors
  }
}

export function playGhibliMeadowArpeggio() {
  const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
  notes.forEach((n, idx) => {
    setTimeout(() => playChime(n, 0.55), idx * 95);
  });
}

export function copyEmailText() {
  const email = 'dzakiudin07@gmail.com';
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email);
    } else {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  } catch {
    // Ignore clipboard fallback errors
  }
}
