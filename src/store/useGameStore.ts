"use client";

import { create } from "zustand";

type GameState = {
  score: number;
  total: number;
  collected: string[];
  collect: (id: string) => void;
  reset: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  total: 8,
  collected: [],
  collect: (id) =>
    set((state) =>
      state.collected.includes(id)
        ? state
        : {
            score: state.score + 1,
            collected: [...state.collected, id],
          },
    ),
  reset: () => set({ score: 0, collected: [] }),
}));