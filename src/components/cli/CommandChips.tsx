"use client";

import { Sparkles } from "lucide-react";
import { quickCommands } from "@/data/commands";

export function CommandChips({
  onRun,
  commands = quickCommands,
  compact = false,
}: {
  onRun: (command: string) => void;
  commands?: string[];
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-1 flex items-center gap-1 text-[9px] tracking-[0.12em] text-term-dim uppercase">
        <Sparkles className="size-3" />
        try
      </span>
      {commands.map((command) => (
        <button
          key={command}
          type="button"
          onClick={() => onRun(command)}
          className={
            compact
              ? "border border-border px-1.5 py-0.5 text-[9px] text-muted-foreground transition-all hover:border-term-green/50 hover:bg-term-green/5 hover:text-term-green"
              : "border border-border px-2 py-1 text-[10px] text-muted-foreground transition-all hover:-translate-y-px hover:border-term-green/50 hover:bg-term-green/5 hover:text-term-green sm:text-[11px]"
          }
        >
          {command}
        </button>
      ))}
    </div>
  );
}