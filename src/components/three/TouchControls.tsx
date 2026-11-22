"use client";

import { Lightbulb, Octagon, Zap } from "lucide-react";
import { useRoverStore } from "@/store/useRoverStore";
import { cn } from "@/lib/utils";

export function TouchControls() {
  const setBrake = useRoverStore((state) => state.setBrake);
  const setBoost = useRoverStore((state) => state.setBoost);
  const headlights = useRoverStore((state) => state.headlights);
  const toggleHeadlights = useRoverStore((state) => state.toggleHeadlights);

  return (
    <div className="absolute right-3 bottom-32 z-40 flex flex-col gap-1.5 md:hidden">
      <button
        type="button"
        onPointerDown={(event) => {
          event.preventDefault();
          setBrake(true);
        }}
        onPointerUp={() => setBrake(false)}
        onPointerLeave={() => setBrake(false)}
        onPointerCancel={() => setBrake(false)}
        className="grid size-12 touch-none place-items-center rounded-full border border-term-red/40 bg-background/70 text-term-red backdrop-blur active:bg-term-red/20"
        aria-label="Brake"
      >
        <Octagon className="size-5" />
      </button>
      <button
        type="button"
        onPointerDown={(event) => {
          event.preventDefault();
          setBoost(true);
        }}
        onPointerUp={() => setBoost(false)}
        onPointerLeave={() => setBoost(false)}
        onPointerCancel={() => setBoost(false)}
        className="grid size-12 touch-none place-items-center rounded-full border border-term-amber/40 bg-background/70 text-term-amber backdrop-blur active:bg-term-amber/20"
        aria-label="Boost"
      >
        <Zap className="size-5" />
      </button>
      <button
        type="button"
        onClick={toggleHeadlights}
        className={cn(
          "grid size-12 place-items-center rounded-full border backdrop-blur",
          headlights
            ? "border-term-amber/60 bg-term-amber/15 text-term-amber"
            : "border-border bg-background/70 text-term-dim",
        )}
        aria-label="Toggle headlights"
        aria-pressed={headlights}
      >
        <Lightbulb className="size-5" />
      </button>
    </div>
  );
}