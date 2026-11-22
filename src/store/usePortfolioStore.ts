"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewMode = "fast" | "3d";

export type ZoneId =
  | "hero"
  | "projects"
  | "skills"
  | "services"
  | "contact"
  | "game"
  | "ai"
  | "data";

export type ThemeName = "matrix" | "mocha" | "cyber" | "minimal";

export const THEMES: { id: ThemeName; label: string; hint: string }[] = [
  { id: "matrix", label: "matrix", hint: "terminal green" },
  { id: "mocha", label: "mocha", hint: "warm coffee" },
  { id: "cyber", label: "cyber", hint: "neon cyan" },
  { id: "minimal", label: "minimal", hint: "paper light" },
];

type PortfolioStore = {
  viewMode: ViewMode;
  activeZone: ZoneId;
  theme: ThemeName;
  selectedProject: string | null;
  soundEnabled: boolean;
  paletteOpen: boolean;
  servicesOpen: boolean;
  estimatorOpen: boolean;
  hireOpen: boolean;
  terminalOpen: boolean;
  celebration: number;
  joystick: { x: number; y: number };
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  setActiveZone: (zone: ZoneId) => void;
  setTheme: (theme: ThemeName) => void;
  openProject: (slug: string | null) => void;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  setPaletteOpen: (open: boolean) => void;
  setServicesOpen: (open: boolean) => void;
  setEstimatorOpen: (open: boolean) => void;
  setHireOpen: (open: boolean) => void;
  setTerminalOpen: (open: boolean) => void;
  celebrate: () => void;
  setJoystick: (x: number, y: number) => void;
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      viewMode: "fast",
      activeZone: "hero",
      theme: "matrix",
      selectedProject: null,
      soundEnabled: false,
      paletteOpen: false,
      servicesOpen: false,
      estimatorOpen: false,
      hireOpen: false,
      terminalOpen: true,
      celebration: 0,
      joystick: { x: 0, y: 0 },

      setViewMode: (viewMode) => set({ viewMode }),
      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === "3d" ? "fast" : "3d",
        })),
      setActiveZone: (activeZone) => set({ activeZone }),
      setTheme: (theme) => set({ theme }),
      openProject: (selectedProject) => set({ selectedProject }),
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
      setServicesOpen: (servicesOpen) => set({ servicesOpen }),
      setEstimatorOpen: (estimatorOpen) => set({ estimatorOpen }),
      setHireOpen: (hireOpen) => set({ hireOpen }),
      setTerminalOpen: (terminalOpen) => set({ terminalOpen }),
      celebrate: () =>
        set((state) => ({ celebration: state.celebration + 1 })),
      setJoystick: (x, y) => set({ joystick: { x, y } }),
    }),
    {
      name: "portfolio-v1-store",
      partialize: (state) => ({
        viewMode: state.viewMode,
        theme: state.theme,
        soundEnabled: state.soundEnabled,
      }),
      skipHydration: true,
    },
  ),
);