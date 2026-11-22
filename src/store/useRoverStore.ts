"use client";

import { create } from "zustand";

type RoverState = {
  speed: number;
  braking: boolean;
  headlights: boolean;
  boosting: boolean;
  brake: boolean;
  boost: boolean;
  ready: boolean;
  setTelemetry: (telemetry: {
    speed: number;
    braking: boolean;
    headlights: boolean;
    boosting: boolean;
  }) => void;
  toggleHeadlights: () => void;
  setBrake: (brake: boolean) => void;
  setBoost: (boost: boolean) => void;
  setReady: (ready: boolean) => void;
};

export const useRoverStore = create<RoverState>((set) => ({
  speed: 0,
  braking: false,
  headlights: false,
  boosting: false,
  brake: false,
  boost: false,
  ready: false,
  setTelemetry: (telemetry) => set(telemetry),
  toggleHeadlights: () =>
    set((state) => ({ headlights: !state.headlights })),
  setBrake: (brake) => set({ brake }),
  setBoost: (boost) => set({ boost }),
  setReady: (ready) => set({ ready }),
}));