"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ExternalLink, Copy, X } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons/github";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { TerminalWindow } from "@/components/terminal/window";
import { FloatingProjectPreview } from "@/components/site/floating-project-preview";
import { SectionHeader } from "@/components/site/section-header";
import {
  categoryFilters,
  projects,
  type FilterKey,
  type Project,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProjectExplorer() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [preview, setPreview] = useState<Project | null>(null);
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

  useEffect(() => {
    const onOpen = (event: Event) => {
      const slug = (event as CustomEvent<string>).detail;
      const project = projects.find((item) => item.slug === slug);
      if (project) setSelected(project);
    };
    window.addEventListener("portfolio:open-project", onOpen);
    return () => window.removeEventListener("portfolio:open-project", onOpen);
  }, []);

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
                    onClick={() => setSelected(project)}
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
                    onClick={() => setSelected(project)}
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

        <ProjectDialog
          project={selected}
          onClose={() => setSelected(null)}
        />

        <FloatingProjectPreview project={preview} x={springX} y={springY} />
      </div>
    </section>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const copyCommand = async () => {
    if (!project) return;
    try {
      await navigator.clipboard.writeText(`open ${project.slug}`);
      toast.success("Command copied", {
        description: `open ${project.slug}`,
      });
    } catch {
      toast.error("Could not copy command");
    }
  };

  return (
    <Dialog
      open={Boolean(project)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[88vh] w-[calc(100%-1rem)] max-w-3xl gap-0 overflow-y-auto rounded-sm border-border bg-card p-0 sm:max-w-3xl"
      >
        {project ? (
          <>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur">
              <div className="flex min-w-0 items-center gap-2 text-[9px] tracking-[0.12em] text-term-dim uppercase">
                <span className="size-1.5 shrink-0 rounded-full bg-term-green" />
                <span className="truncate">
                  cat {project.command}README.md
                </span>
              </div>
              <DialogClose
                render={
                  <button
                    type="button"
                    aria-label="Close project"
                    className="grid size-7 place-items-center border border-border text-term-dim transition-colors hover:border-term-green/50 hover:text-term-green"
                  />
                }
              >
                <X className="size-3.5" />
              </DialogClose>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="outline"
                  className="rounded-none border-border text-[9px] text-muted-foreground"
                >
                  {project.categoryLabel}
                </Badge>
                {project.pinned ? (
                  <Badge
                    variant="outline"
                    className="rounded-none border-term-amber/40 text-[9px] text-term-amber"
                  >
                    pinned
                  </Badge>
                ) : null}
                {project.featured ? (
                  <Badge
                    variant="outline"
                    className="rounded-none border-term-cyan/40 text-[9px] text-term-cyan"
                  >
                    featured
                  </Badge>
                ) : null}
                {project.collab ? (
                  <Badge
                    variant="outline"
                    className="rounded-none border-term-amber/40 text-[9px] text-term-amber"
                  >
                    collaboration
                  </Badge>
                ) : null}
                {typeof project.stars === "number" ? (
                  <span className="ml-1 text-[9px] text-term-dim">
                    ★ {project.stars} on original
                  </span>
                ) : null}
              </div>

              <DialogTitle className="mt-3 text-2xl tracking-tight sm:text-4xl">
                {project.name}
                <span aria-hidden="true" className="text-term-green">_</span>
              </DialogTitle>
              <DialogDescription className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {project.tagline}
              </DialogDescription>

              <p className="mt-4 text-xs leading-relaxed text-foreground/75 sm:text-sm">
                {project.description}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
                <Fact label="role" value={project.role} />
                <Fact label="year" value={project.year} />
                <Fact label="domain" value={project.categoryLabel} />
              </div>

              <div className="mt-6 space-y-6">
                <Block title="the problem">
                  <p>{project.problem}</p>
                </Block>
                <Block title="what I built">
                  <p>{project.approach}</p>
                </Block>
                <Block title="highlights">
                  <ul className="space-y-1.5">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="text-term-green">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block title="stack">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-border px-2 py-1 text-[9px] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Block>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-2">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-none bg-term-green text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-term-green/80 hover:shadow-[0_10px_30px_rgba(124,255,178,0.14)]",
                    )}
                  >
                    live demo
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-none border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-term-green/50 hover:text-term-green",
                  )}
                >
                  source
                  <Github className="size-3.5" />
                </a>
                {project.upstream ? (
                  <a
                    href={project.upstream}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "rounded-none text-term-dim transition-all duration-300 hover:-translate-y-0.5 hover:text-term-green",
                    )}
                  >
                    original
                    <Github className="size-3.5" />
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={copyCommand}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "rounded-none text-term-dim transition-all duration-300 hover:-translate-y-0.5 hover:text-term-green",
                  )}
                >
                  copy command
                  <Copy className="size-3.5" />
                </button>
              </div>

              <div className="mt-6 border-t border-border pt-3 text-[9px] text-term-dim">
                <span className="text-term-green">gaurav@portfolio</span>
                <span>:~$ </span>
                open {project.slug}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-3 py-2.5">
      <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
        {label}
      </div>
      <div className="mt-1 text-[11px] text-foreground">{value}</div>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h3 className="text-[9px] tracking-[0.16em] text-term-green uppercase">
        {title}
      </h3>
      <div className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
        {children}
      </div>
    </section>
  );
}