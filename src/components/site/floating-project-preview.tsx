"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import type { Project } from "@/lib/data";

type FloatingProjectPreviewProps = {
  project: Project | null;
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export function FloatingProjectPreview({
  project,
  x,
  y,
}: FloatingProjectPreviewProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="project-hover-preview"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.16 }}
          style={{ x, y }}
          className="pointer-events-none fixed top-0 left-0 z-[60] hidden w-[300px] lg:block"
          aria-hidden="true"
        >
          <div className="border border-border bg-card/95 p-3 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-2 text-[8px] tracking-[0.14em] text-term-dim uppercase">
              <span className="truncate">cat {project.command}README.md</span>
              <span className="text-term-green">↵</span>
            </div>
            <div className="mt-2 flex items-start gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center border border-border text-[9px] text-term-green">
                {project.glyph}
              </span>
              <div className="min-w-0">
                <div className="text-sm text-foreground">{project.name}</div>
                <div className="mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
                  {project.tagline}
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {project.stack.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="border border-border px-1.5 py-0.5 text-[8px] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-[8px] text-term-dim">
              <span>{project.categoryLabel}</span>
              <span
                className={
                  project.pinned ? "text-term-amber" : "text-term-green"
                }
              >
                {project.pinned
                  ? "★ pinned"
                  : project.featured
                    ? "featured"
                    : "→ open"}
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}