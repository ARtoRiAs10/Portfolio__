"use client";

import { useRef, useState } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function TouchJoystick() {
  const base = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const [knob, setKnob] = useState({ x: 0, y: 0 });
  const setJoystick = usePortfolioStore((state) => state.setJoystick);

  const update = (clientX: number, clientY: number) => {
    const element = base.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = rect.width / 2;
    let x = (clientX - centerX) / radius;
    let y = (clientY - centerY) / radius;
    const length = Math.hypot(x, y);
    if (length > 1) {
      x /= length;
      y /= length;
    }
    setKnob({ x: x * 28, y: y * 28 });
    setJoystick(x, y);
  };

  const reset = () => {
    active.current = false;
    setKnob({ x: 0, y: 0 });
    setJoystick(0, 0);
  };

  return (
    <div className="absolute bottom-60 left-4 z-40 md:hidden">
      <div
        ref={base}
        onPointerDown={(event) => {
          active.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          update(event.clientX, event.clientY);
        }}
        onPointerMove={(event) => {
          if (!active.current) return;
          update(event.clientX, event.clientY);
        }}
        onPointerUp={reset}
        onPointerCancel={reset}
        onPointerLeave={() => {
          if (active.current) reset();
        }}
        className="relative grid size-24 touch-none place-items-center rounded-full border border-term-green/30 bg-background/60 backdrop-blur"
        aria-label="Touch joystick to drive the rover"
        role="application"
      >
        <span className="absolute text-[7px] tracking-[0.16em] text-term-dim uppercase">
          drive
        </span>
        <div
          className="pointer-events-none size-10 rounded-full border border-term-green/60 bg-term-green/20"
          style={{
            transform: `translate(${knob.x}px, ${knob.y}px)`,
          }}
        />
      </div>
    </div>
  );
}