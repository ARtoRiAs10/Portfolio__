"use client";

import { usePortfolioStore } from "@/store/usePortfolioStore";

let context: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  if (!context) context = new Ctor();
  if (context.state === "suspended") void context.resume();
  return context;
}

function tone({
  frequency,
  endFrequency,
  duration,
  volume,
  type = "sine",
  delay = 0,
}: {
  frequency: number;
  endFrequency?: number;
  duration: number;
  volume: number;
  type?: OscillatorType;
  delay?: number;
}) {
  const ctx = getContext();
  if (!ctx) return;
  const start = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  if (endFrequency) {
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(1, endFrequency),
      start + duration,
    );
  }

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

const enabled = () => usePortfolioStore.getState().soundEnabled;

export function playClick() {
  if (!enabled()) return;
  tone({
    frequency: 880,
    endFrequency: 660,
    duration: 0.045,
    volume: 0.018,
    type: "square",
  });
}

export function playWhoosh() {
  if (!enabled()) return;
  tone({
    frequency: 180,
    endFrequency: 620,
    duration: 0.32,
    volume: 0.022,
    type: "sawtooth",
  });
}

export function playThud() {
  if (!enabled()) return;
  tone({
    frequency: 110,
    endFrequency: 48,
    duration: 0.18,
    volume: 0.035,
    type: "sine",
  });
}

export function playSuccess() {
  if (!enabled()) return;
  tone({ frequency: 523.25, duration: 0.12, volume: 0.02, type: "triangle" });
  tone({
    frequency: 659.25,
    duration: 0.12,
    volume: 0.02,
    type: "triangle",
    delay: 0.09,
  });
  tone({
    frequency: 783.99,
    duration: 0.2,
    volume: 0.02,
    type: "triangle",
    delay: 0.18,
  });
}