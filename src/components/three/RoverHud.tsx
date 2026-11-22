"use client";

import { useRoverStore } from "@/store/useRoverStore";
import { useGameStore } from "@/store/useGameStore";
import { cn } from "@/lib/utils";

export function RoverHud() {
  const speed = useRoverStore((state) => state.speed);
  const braking = useRoverStore((state) => state.braking);
  const headlights = useRoverStore((state) => state.headlights);
  const boosting = useRoverStore((state) => state.boosting);
  const score = useGameStore((state) => state.score);
  const total = useGameStore((state) => state.total);

  const kmh = Math.round(speed * 3.6);
  const speedPercent = Math.min(100, (speed / 11) * 100);

  return (
    <div className="absolute top-32 right-3 z-40 hidden w-44 border border-border bg-background/80 p-2.5 backdrop-blur sm:block">
      <div className="flex items-center justify-between text-[8px] tracking-[0.16em] text-term-dim uppercase">
        <span>rover</span>
        <span data-testid="rover-state" className={cn(boosting && "text-term-amber")}>
          {boosting ? "boost" : braking ? "brake" : "idle"}
        </span>
      </div>

      <div className="mt-1 flex items-baseline justify-between">
        <span data-testid="rover-speed" className="text-xl text-term-green">{kmh}</span>
        <span className="text-[8px] text-term-dim">km/h</span>
      </div>

      <div className="mt-1 h-1 w-full bg-border">
        <div
          className={cn(
            "h-full transition-[width] duration-150",
            boosting ? "bg-term-amber" : braking ? "bg-term-red" : "bg-term-green",
          )}
          style={{ width: `${speedPercent}%` }}
        />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1 text-[7px] tracking-[0.12em] uppercase">
        <div className="flex items-center justify-between border border-border px-1.5 py-1">
          <span className="text-term-dim">lights</span>
          <span data-testid="rover-lights" className={headlights ? "text-term-amber" : "text-term-dim"}>
            {headlights ? "on" : "off"}
          </span>
        </div>
        <div className="flex items-center justify-between border border-border px-1.5 py-1">
          <span className="text-term-dim">rings</span>
          <span data-testid="rover-score" className="text-term-cyan">
            {score}/{total}
          </span>
        </div>
      </div>

      <div className="mt-1.5 text-[7px] leading-relaxed text-term-dim">
        space brake · shift boost · l lights · h horn · r reset
      </div>
    </div>
  );
}