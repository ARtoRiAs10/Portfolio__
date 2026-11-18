"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [time, setTime] = useState("--:--");
  const [year, setYear] = useState("2026");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setYear(String(now.getFullYear()));
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="border-t border-border px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-[9px] text-term-dim sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} <span className="text-foreground/80">gaurav kumar</span>
        </span>
        <span>next.js + shadcn/ui · no templates</span>
        <span className="flex flex-wrap items-center gap-3">
          <span>
            local time <span className="text-term-green">{time}</span>
          </span>
          <a href="#top" className="transition-colors hover:text-term-green">
            back to top ↑
          </a>
        </span>
      </div>
    </footer>
  );
}