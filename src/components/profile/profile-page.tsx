"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { GithubIcon as Github } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TerminalWindow } from "@/components/terminal/window";
import { SectionHeader } from "@/components/site/section-header";
import { FloatingProjectPreview } from "@/components/site/floating-project-preview";
import { projects, skillGroups, type Project } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const email = "gauravkum2002@gmail.com";

const profileStats = [
  { label: "public repos", value: "105" },
  { label: "pinned builds", value: "06" },
  { label: "featured projects", value: "15" },
  { label: "shipping since", value: "2024" },
];

const pinned = projects.filter((project) => project.pinned);
const advanced = projects.filter((project) => !project.pinned);

export function ProfilePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ProfileNav />
      <main id="main">
        <ProfileHero />
        <ProfileStats />
        <PinnedSection />
        <AdvancedSection />
        <StackSection />
        <ContactSection />
      </main>
      <ProfileFooter />
    </div>
  );
}

function ProfileNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 text-[10px] tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-term-green"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          portfolio
        </Link>
        <div className="flex items-center gap-2 text-[10px] text-term-dim">
          <span className="hidden sm:inline">github.com/</span>
          <span className="text-term-green">ARtoRiAs10</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/ARtoRiAs10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
              "border border-border text-muted-foreground hover:text-term-green",
            )}
          >
            <Github className="size-3.5" />
          </a>
          <Magnetic strength={0.22} max={6}>
            <a
              href={`mailto:${email}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "border-term-green/30 text-[10px] text-term-green hover:border-term-green hover:bg-term-green/10 hover:text-term-green",
              )}
            >
              email
            </a>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}

function ProfileHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const terminalY = useTransform(scrollYProgress, [0, 1], [0, 64]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 lg:px-8"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: reducedMotion ? 0 : gridY }}
        className="grid-bg pointer-events-none absolute inset-0 opacity-60"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: reducedMotion ? 0 : glowY }}
        className="pointer-events-none absolute -top-48 right-[-12%] size-[560px] rounded-full bg-[radial-gradient(circle,rgba(124,255,178,0.12),transparent_62%)] blur-2xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE }}
        >
          <div className="inline-flex items-center gap-2 border border-term-green/30 bg-term-green/5 px-2.5 py-1.5 text-[9px] tracking-[0.14em] text-term-green uppercase">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-term-green opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-term-green" />
            </span>
            open for select projects
          </div>

          <h1 className="mt-5 text-4xl tracking-tight sm:text-6xl">
            Gaurav Kumar
            <span className="text-term-green">_</span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-term-cyan sm:text-sm">
            <span>@ARtoRiAs10</span>
            <span className="text-term-dim">/</span>
            <span className="text-term-green">full-stack &amp; AI engineer</span>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            I build software that feels inevitable. Full-stack engineer working
            across AI-native products, real-time platforms, and developer
            infrastructure — from the first architecture sketch to production.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Magnetic strength={0.22} max={6}>
              <a
                href="https://github.com/ARtoRiAs10"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "rounded-none bg-term-green text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-term-green/80 hover:shadow-[0_10px_30px_rgba(124,255,178,0.14)]",
                )}
              >
                github
                <Github className="size-3.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.22} max={6}>
              <a
                href={`mailto:${email}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-none border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-term-green/50 hover:text-term-green",
                )}
              >
                email
                <Mail className="size-3.5" />
              </a>
            </Magnetic>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-none text-term-dim transition-all duration-300 hover:-translate-y-0.5 hover:text-term-green",
              )}
            >
              portfolio
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
            <HeroFact icon={<MapPin className="size-3" />} label="based" value="remote / worldwide" />
            <HeroFact icon={<Terminal className="size-3" />} label="focus" value="ai · saas · infra" />
            <HeroFact icon={<Zap className="size-3" />} label="response" value="< 24h" />
          </div>
        </motion.div>

        <motion.div
          style={{ y: reducedMotion ? 0 : terminalY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: EASE }}
        >
          <TerminalWindow
            title="gaurav@github: ~ — zsh"
            actions={
              <>
                <span className="hidden sm:inline">● open</span>
                <span className="sm:hidden">●</span>
              </>
            }
          >
            <div className="p-4 sm:p-5">
              <div className="text-[10px] text-muted-foreground">
                <span className="text-term-green">gaurav@github</span>
                <span className="text-term-dim">:~$ </span>
                whoami
              </div>
              <div className="mt-1 text-sm text-foreground">
                gaurav kumar — full-stack &amp; ai engineer
              </div>

              <div className="mt-4 border-t border-border pt-3 text-[10px] text-muted-foreground">
                <span className="text-term-green">gaurav@github</span>
                <span className="text-term-dim">:~$ </span>
                cat pinned.json
              </div>
              <div className="mt-2 grid grid-cols-1 gap-1 text-[10px] sm:grid-cols-2">
                {pinned.map((project) => (
                  <div key={project.slug} className="flex min-w-0 items-baseline gap-1.5">
                    <span className="text-term-green">●</span>
                    <span className="text-foreground/85">{project.name}</span>
                    <span className="truncate text-term-dim">
                      — {project.categoryLabel}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-3 text-[10px]">
                <div className="text-muted-foreground">
                  <span className="text-term-green">gaurav@github</span>
                  <span className="text-term-dim">:~$ </span>
                  ./contact.sh
                </div>
                <div className="mt-1 text-term-green">→ {email}</div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-term-dim">
                <span className="text-term-green">❯</span>
                <span className="cursor-blink text-term-green">▊</span>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}

function HeroFact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-card px-3 py-3">
      <div className="flex items-center gap-1.5 text-[8px] tracking-[0.14em] text-term-dim uppercase">
        <span className="text-term-green">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-[11px] text-foreground/85">{value}</div>
    </div>
  );
}

function ProfileStats() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
        {profileStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0 : 0.35,
              delay: reducedMotion ? 0 : index * 0.05,
              ease: EASE,
            }}
            className={cn(
              "border-border px-4 py-4",
              index < profileStats.length - 1 && "border-r",
              index < 2 && "border-b sm:border-b-0",
            )}
          >
            <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
              {stat.label}
            </div>
            <div className="mt-1 text-xl text-term-green">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PinnedSection() {
  return (
    <section id="pinned" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          command="cat pinned.json"
          title="Pinned builds."
          description="The repositories pinned to my GitHub profile — real-time collaboration, gamified learning, AI study tools, deployment infrastructure, computer vision, and AI music."
          accent="6 entries"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pinned.map((project, index) => (
            <PinnedCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PinnedCard({ project, index }: { project: Project; index: number }) {
  const reducedMotion = useReducedMotion();
  const href = project.live ?? project.repo;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        delay: reducedMotion ? 0 : Math.min(index * 0.05, 0.2),
        ease: EASE,
      }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      className="group flex flex-col border border-border bg-card p-4 transition-all duration-300 hover:border-term-green/50 hover:bg-term-green/[0.025] hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="grid size-8 place-items-center border border-border text-[9px] text-term-green transition-all group-hover:scale-105 group-hover:border-term-green/50 group-hover:bg-term-green/10">
          {project.glyph}
        </span>
        <div className="flex flex-wrap justify-end gap-1">
          {project.pinned ? (
            <Badge
              variant="outline"
              className="h-4 rounded-none border-term-amber/40 px-1.5 text-[8px] text-term-amber"
            >
              pinned
            </Badge>
          ) : null}
          {project.collab ? (
            <Badge
              variant="outline"
              className="h-4 rounded-none border-term-cyan/40 px-1.5 text-[8px] text-term-cyan"
            >
              collab
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-base text-foreground transition-colors group-hover:text-term-green">{project.name}</span>
        {typeof project.stars === "number" ? (
          <span className="text-[9px] text-term-dim">★ {project.stars}</span>
        ) : null}
      </div>
      <p className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
        {project.tagline}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {project.stack.slice(0, 3).map((item) => (
          <span
            key={item}
            className="border border-border px-1.5 py-0.5 text-[8px] text-muted-foreground transition-colors group-hover:border-term-green/30 group-hover:text-foreground/80"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[8px] tracking-[0.14em] text-term-dim uppercase transition-colors group-hover:text-term-green">
        <span>{project.live ? "live demo" : "source"}</span>
        <span className="grid size-5 place-items-center rounded-full border border-border transition-all group-hover:border-term-green group-hover:bg-term-green group-hover:text-primary-foreground">
          <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  );
}

function AdvancedSection() {
  const reducedMotion = useReducedMotion();
  const [preview, setPreview] = useState<Project | null>(null);
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const springX = useSpring(previewX, {
    stiffness: 260,
    damping: 26,
    mass: 0.3,
  });
  const springY = useSpring(previewY, {
    stiffness: 260,
    damping: 26,
    mass: 0.3,
  });

  const movePreview = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      reducedMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const width = 300;
    const height = 210;
    const offset = 20;
    let x = event.clientX + offset;
    let y = event.clientY + offset;
    if (x + width > window.innerWidth - 16) {
      x = event.clientX - width - offset;
    }
    if (y + height > window.innerHeight - 16) {
      y = event.clientY - height - offset;
    }
    previewX.set(Math.max(16, Math.min(x, window.innerWidth - width - 16)));
    previewY.set(Math.max(16, Math.min(y, window.innerHeight - height - 16)));
  };

  useEffect(() => {
    const hide = () => setPreview(null);
    window.addEventListener("scroll", hide, { passive: true });
    return () => window.removeEventListener("scroll", hide);
  }, []);

  return (
    <section
      id="advanced"
      className="scroll-mt-16 bg-card/20 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          command="ls advanced/"
          title="Advanced builds."
          description="Systems and products that go beyond CRUD: distributed queues, quantitative research, real-time collaboration, deployment infrastructure, and more."
          accent={`${advanced.length} entries`}
        />

        <TerminalWindow
          title="~/advanced — ls -la"
          actions={<span className="hidden sm:inline">hover to preview</span>}
        >
          <div
            className="p-3 sm:p-5"
            onPointerMove={movePreview}
            onPointerLeave={() => setPreview(null)}
          >
            <div className="hidden grid-cols-[2.2rem_1fr_5.5rem_1rem] gap-3 border-b border-border px-3 py-2 text-[8px] tracking-[0.16em] text-term-dim uppercase sm:grid">
              <span>type</span>
              <span>name / description</span>
              <span>domain</span>
              <span />
            </div>
            {advanced.map((project, index) => (
              <motion.a
                key={project.slug}
                href={project.live ?? project.repo}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reducedMotion ? 0 : 0.3,
                  delay: reducedMotion ? 0 : Math.min(index * 0.02, 0.12),
                  ease: EASE,
                }}
                onPointerEnter={() => setPreview(project)}
                onPointerLeave={() => setPreview(null)}
                className="project-row group grid grid-cols-[2.2rem_1fr_1.75rem] items-center gap-3 border-b border-border px-3 py-3 sm:grid-cols-[2.2rem_1fr_5.5rem_1.75rem]"
              >
                <span className="text-[9px] text-term-dim transition-all group-hover:scale-110 group-hover:text-term-green">
                  {project.glyph}
                </span>
                <span className="min-w-0 transition-transform group-hover:translate-x-0.5">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[13px] text-foreground transition-colors group-hover:text-term-green">
                      {project.command}
                    </span>
                    {project.featured ? (
                      <span className="text-[8px] text-term-cyan">featured</span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] text-muted-foreground transition-colors group-hover:text-foreground/80">
                    {project.tagline}
                  </span>
                </span>
                <span className="hidden text-[10px] text-term-dim transition-colors group-hover:text-term-green/70 sm:block">
                  {project.categoryLabel}
                </span>
                <span className="grid size-6 place-items-center rounded-full border border-border text-[10px] text-term-dim transition-all group-hover:translate-x-0.5 group-hover:border-term-green group-hover:bg-term-green group-hover:text-primary-foreground">
                  →
                </span>
              </motion.a>
            ))}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[9px] text-term-dim">
              <span>[hover a row to preview · click to open]</span>
              <span className="hidden sm:inline">
                featured = flagship build
              </span>
            </div>
          </div>
        </TerminalWindow>

        <FloatingProjectPreview
          project={preview}
          x={springX}
          y={springY}
        />
      </div>
    </section>
  );
}

function StackSection() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="stack" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          command="cat stack.json"
          title="The stack."
          description="Typed end-to-end, boring where it counts, and fast where users feel it. These are the tools I reach for when the goal is a real product."
          accent={`${skillGroups.length} groups`}
        />
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.file}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: reducedMotion ? 0 : 0.35,
                delay: reducedMotion ? 0 : index * 0.04,
                ease: EASE,
              }}
              className="bg-card p-4"
            >
              <div className="text-[9px] tracking-[0.16em] text-term-green uppercase">
                {group.file}
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border border-border px-1.5 py-1 text-[9px] text-muted-foreground transition-all hover:-translate-y-px hover:border-term-green/40 hover:text-term-green"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[9px] text-term-dim">
          <Sparkles className="size-3 text-term-green" />
          currently exploring: agentic workflows · local-first AI · design
          engineering
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const reducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied", { description: email });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="04"
          command="./contact.sh"
          title="Let's build something."
          description="Tell me what you're working on — the rough version is fine. I reply within 24 hours with honest thoughts on scope, approach, and fit."
          accent="open"
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: EASE }}
        >
          <TerminalWindow
            title="~/contact — ./contact.sh"
            actions={
              <>
                <span className="hidden sm:inline">● open</span>
                <span className="sm:hidden">●</span>
              </>
            }
          >
            <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="text-[10px] text-muted-foreground">
                  <span className="text-term-green">gaurav@github</span>
                  <span className="text-term-dim">:~$ </span>
                  ./contact.sh --now
                </div>
                <div className="mt-4 space-y-1 text-[10px]">
                  <div className="text-term-green">[ok] channel open</div>
                  <div className="text-term-green">[ok] response &lt; 24h</div>
                  <div className="text-term-dim">[ok] remote / worldwide</div>
                </div>

                <div className="mt-6 border border-border bg-black/20 p-3">
                  <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
                    email
                  </div>
                  <a
                    href={`mailto:${email}?subject=Project%20inquiry`}
                    className="mt-1 block truncate text-sm text-term-green hover:underline sm:text-base"
                  >
                    {email}
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Magnetic strength={0.22} max={6}>
                    <a
                      href={`mailto:${email}?subject=Project%20inquiry`}
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "rounded-none bg-term-green text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-term-green/80 hover:shadow-[0_10px_30px_rgba(124,255,178,0.14)]",
                      )}
                    >
                      email me
                      <Mail className="size-3.5" />
                    </a>
                  </Magnetic>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-none border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-term-green/50 hover:text-term-green",
                    )}
                  >
                    {copied ? "copied" : "copy email"}
                    {copied ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                  <a
                    href="https://github.com/ARtoRiAs10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "rounded-none text-term-dim transition-all duration-300 hover:-translate-y-0.5 hover:text-term-green",
                    )}
                  >
                    github
                    <Github className="size-3.5" />
                  </a>
                </div>
              </div>

              <aside className="border border-border bg-black/20 p-4">
                <div className="text-[9px] tracking-[0.16em] text-term-dim uppercase">
                  contact.log
                </div>
                <div className="mt-3 space-y-2 text-[10px]">
                  <ContactRow label="status" value="open for select projects" accent />
                  <ContactRow label="based" value="remote / worldwide" />
                  <ContactRow label="response" value="< 24h" />
                  <ContactRow label="timezone" value="flexible" />
                </div>
                <div className="mt-4 border-t border-border pt-3 text-[9px] leading-relaxed text-term-dim">
                  <span className="text-term-green">$</span> no agencies, no
                  handoffs, no mystery invoices.
                </div>
              </aside>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-term-dim">{label}</span>
      <span
        className={cn(
          "text-right",
          accent ? "text-term-green" : "text-foreground/80",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function ProfileFooter() {
  return (
    <footer className="border-t border-border px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-[9px] text-term-dim sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-term-green"
        >
          <ArrowLeft className="size-3" />
          back to portfolio
        </Link>
        <span>github.com/ARtoRiAs10 · {email}</span>
        <span>© {new Date().getFullYear()} Gaurav Kumar</span>
      </div>
    </footer>
  );
}