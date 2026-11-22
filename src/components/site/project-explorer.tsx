"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TerminalWindow } from "@/components/terminal/window";
import { FloatingProjectPreview } from "@/components/site/floating-project-preview";
import { SectionHeader } from "@/components/site/section-header";
import {
  categoryFilters,
  projects,
  type FilterKey,
  type Project,
} from "@/lib/data";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/utils";

export function ProjectExplorer() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [preview, setPreview] = useState<Project | null>(null);
  const openProject = usePortfolioStore((state) => state.openProject);
  const reducedMotion = useReducedMotion();
  const finePointer = useRef(false);

  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const springX = useSpring(previewX, { stiffness: 260, damping: 26, mass: 0.3 });
  const springY = useSpring(previewY, { stiffness: 260, damping: 26, mass: 0.3 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      finePointer.current = query.matches;
      if (!query.matches) setPreview(null);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const hide = () => setPreview(null);
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  const movePreview = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!finePointer.current || reducedMotion) return;
    const width = 300;
    const height = 210;
    const offset = 20;
    let x = event.clientX + offset;
    let y = event.clientY + offset;
    if (x + width > window.innerWidth - 16) x = event.clientX - width - offset;
    if (y + height > window.innerHeight - 16) y = event.clientY - height - offset;
    previewX.set(Math.max(16, Math.min(x, window.innerWidth - width - 16)));
    previewY.set(Math.max(16, Math.min(y, window.innerHeight - height - 16)));
  };

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "pinned") return projects.filter((project) => project.pinned);
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          command="ls ./projects"
          title="Selected work, listed like a filesystem."
          description="Fifteen builds across AI, full-stack products, real-time systems, and infrastructure. Pinned repositories are marked; every row opens the README."
          accent="15 entries"
        />

        <TerminalWindow
          title="~/projects — ls -la"
          actions={<span className="hidden sm:inline">{filtered.length} entries</span>}
        >
          <div className="p-3 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-[10px] text-muted-foreground sm:text-[11px]">
                <span className="text-term-green">gaurav@portfolio</span>
                <span className="text-term-dim">:</span>
                <span className="text-term-cyan">~</span>
                <span className="text-term-dim">$ </span>
                ls -la ./projects --sort=impact
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categoryFilters.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setFilter(item.key)}
                    aria-pressed={filter === item.key}
                    className={cn(
                      "border px-2 py-1 text-[9px] transition-all hover:-translate-y-px sm:text-[10px]",
                      filter === item.key
                        ? "border-term-green bg-term-green/10 text-term-green"
                        : "border-border text-muted-foreground hover:border-term-green/40 hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <span className="ml-1.5 text-[8px] opacity-60">
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3 flex flex-wrap items-center gap-1.5 border-b border-border pb-3">
              <span className="mr-1 text-[8px] tracking-[0.16em] text-term-dim uppercase">
                pinned
              </span>
              {projects
                .filter((project) => project.pinned)
                .map((project) => (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => openProject(project.slug)}
                    className="border border-term-amber/25 px-2 py-1 text-[9px] text-term-amber transition-all hover:-translate-y-0.5 hover:border-term-amber/60 hover:bg-term-amber/10"
                  >
                    {project.command}
                    {typeof project.stars === "number" ? (
                      <span className="ml-1 text-term-dim">★{project.stars}</span>
                    ) : null}
                  </button>
                ))}
            </div>

            <div className="hidden grid-cols-[2.2rem_1fr_5.5rem_4.5rem_3rem_1rem] gap-3 border-b border-border px-3 py-2 text-[8px] tracking-[0.16em] text-term-dim uppercase sm:grid">
              <span>type</span>
              <span>name / description</span>
              <span>domain</span>
              <span>modified</span>
              <span>size</span>
              <span />
            </div>

            <div
              className="min-h-20"
              onPointerMove={movePreview}
              onPointerLeave={() => setPreview(null)}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.button
                    layout
                    key={project.slug}
                    type="button"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.18,
                      delay: reducedMotion ? 0 : Math.min(index * 0.015, 0.12),
                    }}
                    onClick={() => openProject(project.slug)}
                    onPointerEnter={() => {
                      if (finePointer.current && !reducedMotion) setPreview(project);
                    }}
                    onPointerLeave={() => setPreview(null)}
                    className="project-row group grid w-full grid-cols-[2.2rem_1fr_1.75rem] items-center gap-3 border-b border-border px-3 py-3 text-left sm:grid-cols-[2.2rem_1fr_5.5rem_4.5rem_3rem_1.75rem]"
                  >
                    <span className="text-[9px] text-term-dim transition-all group-hover:scale-110 group-hover:text-term-green">
                      {project.glyph}
                    </span>
                    <span className="min-w-0 transition-transform group-hover:translate-x-0.5">
                      <span className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[13px] text-foreground transition-colors group-hover:text-term-green">
                          {project.command}
                        </span>
                        {project.pinned ? (
                          <Badge
                            variant="outline"
                            className="h-4 rounded-none border-term-amber/40 px-1 text-[8px] text-term-amber"
                          >
                            pinned
                          </Badge>
                        ) : null}
                        {project.featured ? (
                          <Badge
                            variant="outline"
                            className="h-4 rounded-none border-term-cyan/40 px-1 text-[8px] text-term-cyan"
                          >
                            featured
                          </Badge>
                        ) : null}
                        {project.collab ? (
                          <span className="text-[8px] text-term-amber">
                            collab
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-muted-foreground transition-colors group-hover:text-foreground/80 sm:text-[11px]">
                        {project.tagline}
                      </span>
                    </span>
                    <span className="hidden text-[10px] text-term-dim transition-colors group-hover:text-term-green/70 sm:block">
                      {project.categoryLabel}
                    </span>
                    <span className="hidden text-[10px] text-term-dim transition-colors group-hover:text-term-green/70 sm:block">
                      {project.modified}
                    </span>
                    <span className="hidden text-[10px] text-term-dim transition-colors group-hover:text-term-green/70 sm:block">
                      {project.size}
                    </span>
                    <span className="grid size-6 place-items-center rounded-full border border-border text-[10px] text-term-dim transition-all group-hover:translate-x-0.5 group-hover:border-term-green group-hover:bg-term-green group-hover:text-primary-foreground">
                      →
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 ? (
              <div className="py-10 text-center text-[11px] text-term-dim">
                no entries found.
              </div>
            ) : null}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[9px] text-term-dim">
              <span>[click a row to cat the README]</span>
              <span className="hidden sm:inline">
                pinned = github profile · featured = flagship build
              </span>
            </div>
          </div>
        </TerminalWindow>

        <FloatingProjectPreview project={preview} x={springX} y={springY} />
      </div>
    </section>
  );
}
