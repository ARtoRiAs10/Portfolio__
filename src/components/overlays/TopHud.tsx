"use client";

import { Box, Gauge, Palette, Sparkles, Volume2, VolumeX } from "lucide-react";
import { THEMES, usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/utils";

export function TopHud() {
  const viewMode = usePortfolioStore((state) => state.viewMode);
  const setViewMode = usePortfolioStore((state) => state.setViewMode);
  const theme = usePortfolioStore((state) => state.theme);
  const setTheme = usePortfolioStore((state) => state.setTheme);
  const soundEnabled = usePortfolioStore((state) => state.soundEnabled);
  const toggleSound = usePortfolioStore((state) => state.toggleSound);
  const setPaletteOpen = usePortfolioStore((state) => state.setPaletteOpen);
  const setHireOpen = usePortfolioStore((state) => state.setHireOpen);

  const currentTheme = THEMES.find((item) => item.id === theme) ?? THEMES[0];
  const nextTheme = () => {
    const index = THEMES.findIndex((item) => item.id === theme);
    setTheme(THEMES[(index + 1) % THEMES.length].id);
  };

  return (
    <div className="fixed top-16 right-3 z-40 flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-0.5 border border-border bg-background/85 p-0.5 backdrop-blur">
        <div className="flex items-center p-0.5">
          <button
            type="button"
            onClick={() => setViewMode("fast")}
            aria-pressed={viewMode === "fast"}
            className={cn(
              "flex items-center gap-1 px-2 py-1 text-[8px] tracking-[0.12em] uppercase transition-colors",
              viewMode === "fast"
                ? "bg-term-green/10 text-term-green"
                : "text-term-dim hover:text-foreground",
            )}
            title="Fast mode — 2D site, 60fps"
          >
            <Gauge className="size-3" />
            fast
          </button>
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            aria-pressed={viewMode === "3d"}
            className={cn(
              "flex items-center gap-1 px-2 py-1 text-[8px] tracking-[0.12em] uppercase transition-colors",
              viewMode === "3d"
                ? "bg-term-green/10 text-term-green"
                : "text-term-dim hover:text-foreground",
            )}
            title="3D mode — WebGL world"
          >
            <Box className="size-3" />
            3d
          </button>
        </div>

        <span className="h-4 w-px bg-border" />

        <button
          type="button"
          onClick={nextTheme}
          className="hidden items-center gap-1 px-2 py-1 text-[8px] tracking-[0.1em] text-term-dim uppercase transition-colors hover:text-term-green sm:flex"
          title={`Theme: ${currentTheme.label} (${currentTheme.hint}) — click to cycle`}
        >
          <Palette className="size-3" />
          {currentTheme.label}
        </button>

        <button
          type="button"
          onClick={toggleSound}
          className="hidden px-2 py-1 text-term-dim transition-colors hover:text-term-green sm:block"
          title={soundEnabled ? "Mute sound" : "Enable sound"}
          aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
        >
          {soundEnabled ? (
            <Volume2 className="size-3" />
          ) : (
            <VolumeX className="size-3" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="px-2 py-1 text-[8px] tracking-[0.1em] text-term-dim uppercase transition-colors hover:text-term-green"
          title="Command palette (Ctrl/Cmd + K)"
        >
          ⌘k
        </button>
      </div>

      <button
        type="button"
        onClick={() => setHireOpen(true)}
        className="flex items-center gap-1 border border-term-green/30 bg-term-green/5 px-2.5 py-1 text-[9px] tracking-[0.12em] text-term-green uppercase backdrop-blur transition-colors hover:bg-term-green/10"
      >
        <Sparkles className="size-3" />
        hire me
      </button>
    </div>
  );
}