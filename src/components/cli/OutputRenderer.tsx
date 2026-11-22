"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TerminalLine } from "@/components/cli/terminal-types";

const toneClass: Record<
  Exclude<TerminalLine["kind"], "cmd" | "projects">,
  string
> = {
  out: "text-foreground/80",
  ok: "text-term-green",
  dim: "text-term-dim",
  accent: "text-term-amber",
  error: "text-term-red",
};

export function OutputRenderer({
  line,
  onOpenProject,
  duration = 0.18,
}: {
  line: TerminalLine;
  onOpenProject: (slug: string) => void;
  duration?: number;
}) {
  if (line.kind === "cmd") {
    return (
      <div className="text-foreground">
        <span className="text-term-green">gaurav@portfolio</span>
        <span className="text-term-dim">:</span>
        <span className="text-term-cyan">~</span>
        <span className="text-term-dim">$ </span>
        {line.text}
      </div>
    );
  }

  if (line.kind === "projects") {
    return (
      <div className="mt-1 space-y-0.5">
        {(line.items ?? []).map((project) => (
          <motion.button
            layout
            key={project.slug}
            type="button"
            onClick={() => onOpenProject(project.slug)}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration }}
            className="group flex w-full items-center gap-2 py-0.5 text-left transition-colors hover:text-term-green"
          >
            <span className="hidden shrink-0 text-term-dim sm:inline">
              drwxr-xr-x
            </span>
            <span className="shrink-0 text-term-cyan">{project.command}</span>
            <span className="truncate text-muted-foreground group-hover:text-foreground/80">
              {project.tagline}
            </span>
            {project.pinned ? (
              <span className="ml-auto shrink-0 border border-term-amber/30 px-1 py-0.5 text-[8px] text-term-amber">
                pinned
              </span>
            ) : null}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("break-words", toneClass[line.kind])}>
      {line.text}
    </div>
  );
}