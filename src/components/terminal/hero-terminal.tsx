"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TerminalShell } from "@/components/cli/TerminalShell";
import { Typewriter } from "@/components/terminal/typewriter";
import { projects, stats } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { EASE } from "@/lib/motion";

const asciiGk = ` ██████╗ ██╗  ██╗
██╔════╝ ██║ ██╔╝
██║  ███╗█████╔╝
██║   ██║██╔═██╗
╚██████╔╝██║  ██╗
 ╚═════╝ ╚═╝  ╚═╝`;

export function HeroTerminal() {
  const reducedMotion = useReducedMotion();
  const openProject = usePortfolioStore((state) => state.openProject);

  const header = (
    <div>
      <div className="text-[9px] tracking-[0.22em] text-term-dim uppercase">
        {"// portfolio v1.0 — dual-mode"}
      </div>
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl tracking-tight sm:text-5xl">
            Gaurav Kumar
            <span aria-hidden="true" className="text-term-green">
              _
            </span>
          </h1>
          <p className="mt-1.5 text-xs text-term-green sm:text-sm">
            &gt; full-stack &amp; AI engineer
          </p>
        </div>
        <div className="hidden text-right text-[9px] leading-relaxed text-term-dim sm:block">
          <div>os: remote</div>
          <div>shell: zsh</div>
          <div>uptime: shipping</div>
        </div>
      </div>

      <p className="mt-5 text-base text-foreground/85 sm:text-lg">
        <span className="mr-2 text-term-green">❯</span>
        <Typewriter
          text="I build software that feels inevitable."
          speed={28}
          startDelay={450}
        />
      </p>
      <p className="mt-2 max-w-xl text-[11px] leading-relaxed text-term-dim sm:text-xs">
        {siteConfig.positioning} Click a chip or type a command — the 3D world
        and the site stay in sync.
      </p>
    </div>
  );

  const aside = (
    <div className="rounded-sm border border-border bg-black/20 p-4">
      <pre
        aria-hidden="true"
        className="ascii glow-green text-[8px] text-term-green sm:text-[9px]"
      >
        {asciiGk}
      </pre>
      <div className="mt-4 space-y-1.5 text-[11px]">
        <InfoRow label="role" value="full-stack / ai" />
        <InfoRow label="focus" value="saas · realtime · infra" />
        <InfoRow label="stack" value="ts · py · go" />
        <InfoRow label="mode" value="3d + fast" />
        <InfoRow label="status" value="open for work" accent />
      </div>
      <div className="mt-4 border-t border-border pt-3">
        <div className="text-[9px] tracking-[0.16em] text-term-dim uppercase">
          pinned
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {projects
            .filter((project) => project.pinned)
            .map((project) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => openProject(project.slug)}
                className="border border-border px-1.5 py-1 text-[9px] text-muted-foreground transition-colors hover:border-term-green/50 hover:text-term-green"
              >
                {project.name}
              </button>
            ))}
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3">
        <div className="grid grid-cols-2 gap-2 text-[9px]">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-term-green">{stat.value}</div>
              <div className="text-term-dim">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 text-[9px] leading-relaxed text-term-dim">
        <span className="text-term-green">$</span> every command has a clickable
        chip. no typing required.
      </div>
    </div>
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-8"
    >
      <div
        className="grid-bg pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: EASE }}
        >
          <TerminalShell header={header} aside={aside} />
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({
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
      <span className={accent ? "text-term-green" : "text-foreground/80"}>
        {value}
      </span>
    </div>
  );
}