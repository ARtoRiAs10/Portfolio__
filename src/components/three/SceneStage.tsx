"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
import { Gamepad2, Gauge, RotateCcw, Terminal } from "lucide-react";
import { toast } from "sonner";
import { TerminalShell } from "@/components/cli/TerminalShell";
import { TouchJoystick } from "@/components/three/TouchJoystick";
import { TouchControls } from "@/components/three/TouchControls";
import { RoverHud } from "@/components/three/RoverHud";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useGameStore } from "@/store/useGameStore";
import { useRoverStore } from "@/store/useRoverStore";
import { cn } from "@/lib/utils";

const WorldCanvas = dynamic(
  () =>
    import("@/components/three/WorldCanvas").then(
      (module) => module.WorldCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full w-full place-items-center">
        <span className="text-[10px] tracking-[0.18em] text-term-green uppercase">
          loading world...
        </span>
      </div>
    ),
  },
);

class SceneErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid h-full w-full place-items-center px-6 text-center">
          <div>
            <div className="text-[10px] tracking-[0.18em] text-term-amber uppercase">
              webgl unavailable
            </div>
            <p className="mt-2 max-w-sm text-[11px] text-term-dim">
              This device could not start the 3D world. The fast site has every
              project, service, and contact link.
            </p>
            <button
              type="button"
              onClick={this.props.onError}
              className="mt-3 border border-term-green/40 px-2.5 py-1 text-[9px] tracking-[0.12em] text-term-green uppercase"
            >
              switch to fast mode
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function SceneStage() {
  const viewMode = usePortfolioStore((state) => state.viewMode);
  const setViewMode = usePortfolioStore((state) => state.setViewMode);
  const setActiveZone = usePortfolioStore((state) => state.setActiveZone);
  const terminalOpen = usePortfolioStore((state) => state.terminalOpen);
  const setTerminalOpen = usePortfolioStore((state) => state.setTerminalOpen);
  const [resetKey, setResetKey] = useState(0);
  const worldReady = useRoverStore((state) => state.ready);

  useEffect(() => {
    if (viewMode !== "3d" || !worldReady) return;
    let frame = 0;
    let frames = 0;
    let start = performance.now();
    let lowSeconds = 0;
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      frames += 1;
      if (now - start >= 1000) {
        const fps = (frames * 1000) / (now - start);
        if (fps < 24) lowSeconds += 1;
        else lowSeconds = 0;

        if (lowSeconds >= 3) {
          toast.info("3D is running slowly here — switched to fast mode.");
          setViewMode("fast");
          return;
        }
        frames = 0;
        start = now;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = 0;
    const startDelay = window.setTimeout(() => {
      start = performance.now();
      frame = requestAnimationFrame(tick);
    }, 1800);

    return () => {
      cancelled = true;
      window.clearTimeout(startDelay);
      cancelAnimationFrame(frame);
    };
  }, [viewMode, worldReady, setViewMode]);

  if (viewMode !== "3d") return null;

  return (
    <div className="fixed inset-0 z-30 bg-[#050806]">
      <SceneErrorBoundary onError={() => setViewMode("fast")}>
        <WorldCanvas resetKey={resetKey} />
      </SceneErrorBoundary>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/65"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute top-20 left-4 z-40 max-w-[16rem]">
        <div className="text-[9px] tracking-[0.18em] text-term-dim uppercase">
          world / tech island
        </div>
        <div className="mt-1 text-[11px] text-foreground">
          WASD / arrows to drive · drag to orbit
        </div>
        <div className="mt-0.5 text-[9px] text-term-dim">
          space brake · shift boost · l lights · h horn · r reset
        </div>
        <div className="mt-0.5 text-[9px] text-term-dim">
          click a monitor, block, kiosk, or beacon
        </div>
      </div>

      {!worldReady ? (
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 border border-term-amber/30 bg-background/70 px-3 py-1.5 text-[9px] tracking-[0.16em] text-term-amber uppercase backdrop-blur">
          initializing physics...
        </div>
      ) : null}

      {terminalOpen ? (
        <div className="absolute bottom-3 left-3 z-40 w-[calc(100%-1.5rem)] max-w-2xl">
          <TerminalShell
            variant="dock"
            title="gaurav@portfolio: ~ — 3d dock"
            boot={false}
            showHints={false}
            chips={["ls projects", "services", "estimate", "stats", "hire"]}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setTerminalOpen(true)}
          className="absolute bottom-3 left-3 z-40 flex items-center gap-1.5 border border-border bg-background/80 px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-term-green uppercase backdrop-blur"
        >
          <Terminal className="size-3" />
          terminal
        </button>
      )}

      <RoverHud />

      <div className="absolute right-3 bottom-3 z-40 flex flex-col items-end gap-1.5">
        <button
          type="button"
          onClick={() => {
            setActiveZone("game");
            useGameStore.getState().reset();
          }}
          className="flex items-center gap-1.5 border border-term-cyan/30 bg-term-cyan/5 px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-term-cyan uppercase backdrop-blur transition-colors hover:bg-term-cyan/10"
        >
          <Gamepad2 className="size-3" />
          game island
        </button>
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new Event("portfolio:rover-reset"));
          }}
          className="flex items-center gap-1.5 border border-border bg-background/80 px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-term-dim uppercase backdrop-blur transition-colors hover:border-term-amber/50 hover:text-term-amber"
        >
          <RotateCcw className="size-3" />
          reset rover
        </button>
        <button
          type="button"
          onClick={() => setResetKey((value) => value + 1)}
          className="flex items-center gap-1.5 border border-border bg-background/80 px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-term-dim uppercase backdrop-blur transition-colors hover:border-term-cyan/50 hover:text-term-cyan"
        >
          <RotateCcw className="size-3" />
          reset blocks
        </button>
        <button
          type="button"
          onClick={() => setViewMode("fast")}
          className={cn(
            "flex items-center gap-1.5 border border-term-green/30 bg-term-green/5 px-2.5 py-1.5 text-[9px] tracking-[0.12em] text-term-green uppercase backdrop-blur transition-colors hover:bg-term-green/10",
          )}
        >
          <Gauge className="size-3" />
          exit to fast mode
        </button>
        {!worldReady ? (
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 border border-term-amber/30 bg-background/70 px-3 py-1.5 text-[9px] tracking-[0.16em] text-term-amber uppercase backdrop-blur">
          initializing physics...
        </div>
      ) : null}

      {terminalOpen ? (
          <button
            type="button"
            onClick={() => setTerminalOpen(false)}
            className="border border-border bg-background/80 px-2.5 py-1 text-[8px] tracking-[0.12em] text-term-dim uppercase backdrop-blur transition-colors hover:text-foreground"
          >
            hide terminal
          </button>
        ) : null}
      </div>

      <TouchJoystick />
      <TouchControls />
    </div>
  );
}