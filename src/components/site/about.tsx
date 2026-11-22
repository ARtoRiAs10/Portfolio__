"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GithubIcon as Github } from "@/components/icons/github";
import { TerminalWindow } from "@/components/terminal/window";
import { SectionHeader } from "@/components/site/section-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const asciiGk = ` ██████╗ ██╗  ██╗
██╔════╝ ██║ ██╔╝
██║  ███╗█████╔╝
██║   ██║██╔═██╗
╚██████╔╝██║  ██╗
 ╚═════╝ ╚═╝  ╚═╝`;

const info = [
  ["os", "remote / worldwide"],
  ["shell", "zsh"],
  ["role", "full-stack & ai engineer"],
  ["focus", "saas · realtime · infra"],
  ["status", "open for select projects"],
  ["uptime", "shipping since 2024"],
];

const principles = [
  ["01", "Ship > perfect"],
  ["02", "Boring where it counts"],
  ["03", "Design is part of the product"],
  ["04", "Document the decisions"],
];

export function About() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="about" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          command="cat about.md"
          title="Engineer first. Product thinker always."
          description="I work across the stack and the whiteboard. Most of my favorite builds start with a constraint, not a framework."
        />

        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reducedMotion ? 0 : 0.45 }}
          >
            <TerminalWindow title="neofetch — gaurav@portfolio">
              <div className="p-4 sm:p-5">
                <pre aria-hidden="true" className="ascii glow-green text-[6px] text-term-green sm:text-[8px]">
                  {asciiGk}
                </pre>
                <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-[10px]">
                  {info.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <span className="text-term-dim">{label}</span>
                      <span
                        className={
                          label === "status"
                            ? "text-right text-term-green"
                            : "text-right text-foreground/80"
                        }
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href="https://github.com/ARtoRiAs10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "rounded-none border-border text-[10px] hover:border-term-green/50 hover:text-term-green",
                    )}
                  >
                    github
                    <Github className="size-3" />
                  </a>
                  <a
                    href="#contact"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "rounded-none text-[10px] text-term-dim hover:text-term-green",
                    )}
                  >
                    contact
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: 0.08 }}
          >
            <TerminalWindow
              title="~/about — cat about.md"
              actions={<span className="hidden sm:inline">markdown</span>}
            >
              <div className="p-4 sm:p-6">
                <div className="text-[9px] tracking-[0.16em] text-term-dim uppercase">
                  # about.md
                </div>
                <p className="mt-3 text-base leading-relaxed text-foreground sm:text-lg">
                  I care about the{" "}
                  <span className="text-term-green">last 10%</span> — the part
                  that makes software feel considered instead of merely
                  functional.
                </p>
                <div className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                  <p>
                    I&apos;m Gaurav, a full-stack engineer who works across
                    product and infrastructure. My work spans deployment
                    platforms, real-time collaboration tools, AI document and
                    learning products, and quantitative finance dashboards —
                    usually solo, always end-to-end.
                  </p>
                  <p>
                    My approach is simple: understand the constraint, design the
                    simplest system that can grow, and ship something real. I
                    write TypeScript and Python, think in systems, and sweat the
                    details users actually feel.
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
                  {principles.map(([number, title]) => (
                    <div key={number} className="bg-card px-3 py-3">
                      <div className="text-[8px] text-term-green">{number}</div>
                      <div className="mt-1 text-[11px] text-foreground">
                        {title}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-border pt-3 text-[10px] text-term-dim">
                  <span className="text-term-green">$</span> currently: building
                  AI-native tools, platform infrastructure, and interfaces that
                  respect the user.
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}