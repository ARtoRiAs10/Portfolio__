"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  showCursor?: boolean;
};

export function Typewriter({
  text,
  speed = 32,
  startDelay = 350,
  className,
  showCursor = true,
}: TypewriterProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const frame = requestAnimationFrame(() => setValue(text));
      return () => cancelAnimationFrame(frame);
    }

    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setValue(text.slice(0, index));
        if (index >= text.length && interval) {
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={cn("inline", className)}>
      {value}
      {showCursor ? (
        <span className="cursor-blink ml-0.5 inline-block text-term-green" aria-hidden="true">
          ▊
        </span>
      ) : null}
    </span>
  );
}