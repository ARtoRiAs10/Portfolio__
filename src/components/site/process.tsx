"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TerminalWindow } from "@/components/terminal/window";
import { SectionHeader } from "@/components/site/section-header";
import { processSteps } from "@/lib/data";

export function Process() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="process" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          command="git log --oneline"
          title="A short path from idea to production."
          description="No black box, no big reveal. Each phase has a clear output, a demo, and a decision you can make."
          accent="5 commits"
        />

        <TerminalWindow
          title="~/process — git log --oneline"
          actions={<span className="hidden sm:inline">main</span>}
        >
          <div className="p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] text-term-dim">
              <span className="text-term-green">gaurav@portfolio</span>
              <span>:</span>
              <span className="text-term-cyan">~</span>
              <span>$ git log --oneline --decorate</span>
            </div>

            <div className="relative">
              <div
                className="absolute top-1 bottom-1 left-[4.5px] w-px bg-border"
                aria-hidden="true"
              />
              <div className="space-y-5">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.hash}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.35,
                      delay: reducedMotion ? 0 : index * 0.06,
                    }}
                    className="relative pl-6"
                  >
                    <span
                      className="absolute top-1 left-0 size-[9px] rounded-full border border-term-green bg-background"
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-[10px] text-term-amber">
                        {step.hash}
                      </span>
                      <span className="text-[9px] text-term-dim">
                        ({step.command})
                      </span>
                    </div>
                    <div className="mt-1 text-[13px] text-foreground">
                      {step.title}
                    </div>
                    <div className="mt-1 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
                      {step.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-3 text-[9px] text-term-dim">
              <span className="text-term-green">HEAD → main</span> · working
              tree clean · no surprise invoices
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}