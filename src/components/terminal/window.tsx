import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TerminalWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  actions?: ReactNode;
  trafficLights?: boolean;
};

export function TerminalWindow({
  title,
  children,
  className,
  bodyClassName,
  actions,
  trafficLights = true,
}: TerminalWindowProps) {
  return (
    <div className={cn("terminal-window rounded-sm", className)}>
      <div className="terminal-bar flex h-9 items-center gap-3 px-3.5">
        {trafficLights ? (
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="traffic-light bg-[#ff5f56]" />
            <span className="traffic-light bg-[#ffbd2e]" />
            <span className="traffic-light bg-[#27c93f]" />
          </div>
        ) : (
          <span className="size-1.5 shrink-0 rounded-full bg-term-green" aria-hidden="true" />
        )}
        <div className="min-w-0 flex-1 truncate text-center text-[9px] tracking-[0.16em] text-term-dim uppercase">
          {title}
        </div>
        <div className="flex shrink-0 items-center gap-2 text-[9px] tracking-[0.1em] text-term-dim uppercase">
          {actions}
        </div>
      </div>
      <div className={cn("relative z-[1]", bodyClassName)}>{children}</div>
    </div>
  );
}