"use client";

import { Copy, ExternalLink, X } from "lucide-react";
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
import { GithubIcon as Github } from "@/components/icons/github";
import { projects } from "@/lib/data";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/utils";

export function ProjectModal() {
  const selectedSlug = usePortfolioStore((state) => state.selectedProject);
  const openProject = usePortfolioStore((state) => state.openProject);
  const project =
    projects.find((item) => item.slug === selectedSlug) ?? null;

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
        if (!open) openProject(null);
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
                <span className="truncate">cat {project.command}README.md</span>
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
                <span aria-hidden="true" className="text-term-green">
                  _
                </span>
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
                {project.outcome ? (
                  <Block title="the outcome">
                    <p className="text-term-green/90">{project.outcome}</p>
                  </Block>
                ) : null}
                {project.metrics?.length ? (
                  <Block title="metrics">
                    <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="bg-card px-3 py-2">
                          <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
                            {metric.label}
                          </div>
                          <div className="mt-1 text-[11px] text-foreground">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Block>
                ) : null}
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

function Block({ title, children }: { title: string; children: React.ReactNode }) {
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