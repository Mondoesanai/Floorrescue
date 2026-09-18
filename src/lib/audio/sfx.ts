"use client";

// All cinematic clips play muted, full stop — see architecture decision in
// the build plan. Every sound the site makes is synthesized here with the
// Web Audio API instead of embedded clip audio: kept deliberately faint
// (low gain) but audible, and it only ever starts after a real user
// gesture, which also satisfies browser autoplay-with-sound restrictions.

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(context: AudioContext, seconds: number) {
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/** Air-movement whoosh for camera travel between scenes. */
export function playWhoosh(volume = 0.07) {
  const context = getContext();
  if (!context) return;
  const source = context.createBufferSource();
  source.buffer = noiseBuffer(context, 0.9);

  const filter = context.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 0.7;
  filter.frequency.setValueAtTime(300, context.currentTime);
  filter.frequency.linearRampToValueAtTime(2200, context.currentTime + 0.45);
  filter.frequency.linearRampToValueAtTime(500, context.currentTime + 0.9);

  const gain = context.createGain();
  gain.gain.setValueAtTime(0, context.currentTime);
  gain.gain.linearRampToValueAtTime(volume, context.currentTime + 0.15);
  gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.9);

  source.connect(filter).connect(gain).connect(context.destination);
  source.start();
  source.stop(context.currentTime + 0.9);
}

/** Soft mechanical/glass click — used for UI selection and door movement. */
export function playClick(volume = 0.05) {
  const context = getContext();
  if (!context) return;
  const osc = context.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(680, context.currentTime);
  osc.frequency.exponentialRampToValueAtTime(220, context.currentTime + 0.12);

  const gain = context.createGain();
  gain.gain.setValueAtTime(volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.14);

  osc.connect(gain).connect(context.destination);
  osc.start();
  osc.stop(context.currentTime + 0.15);
}

/** Low structural resolve tone for major state changes (e.g. landing on the final hero). */
export function playResolveChime(volume = 0.06) {
  const context = getContext();
  if (!context) return;
  [220, 330].forEach((freq, i) => {
    const osc = context.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const gain = context.createGain();
    const start = context.currentTime + i * 0.06;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.1);
    osc.connect(gain).connect(context.destination);
    osc.start(start);
    osc.stop(start + 1.2);
  });
}

/** Glass/mullion door swing sound for the door-entry transition. */
export function playDoorOpen(volume = 0.06) {
  const context = getContext();
  if (!context) return;
  const source = context.createBufferSource();
  source.buffer = noiseBuffer(context, 0.5);
  const filter = context.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 1200;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0, context.currentTime);
  gain.gain.linearRampToValueAtTime(volume, context.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.5);
  source.connect(filter).connect(gain).connect(context.destination);
  source.start();
  source.stop(context.currentTime + 0.5);
  playClick(volume * 0.6);
}

let ambientNodes: { osc: OscillatorNode; gain: GainNode } | null = null;

/** Extremely faint sustained hum for the idle garage sign — call once per mount. */
export function startAmbientHum(volume = 0.015) {
  const context = getContext();
  if (!context || ambientNodes) return;
  const osc = context.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 82;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0, context.currentTime);
  gain.gain.linearRampToValueAtTime(volume, context.currentTime + 1.2);
  osc.connect(gain).connect(context.destination);
  osc.start();
  ambientNodes = { osc, gain };
}

export function stopAmbientHum() {
  const context = getContext();
  if (!context || !ambientNodes) return;
  const { osc, gain } = ambientNodes;
  gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.6);
  osc.stop(context.currentTime + 0.7);
  ambientNodes = null;
}
