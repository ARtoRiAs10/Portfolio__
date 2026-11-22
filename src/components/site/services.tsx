"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calculator, Sparkles } from "lucide-react";
import { TerminalWindow } from "@/components/terminal/window";
import { SectionHeader } from "@/components/site/section-header";
import { buttonVariants } from "@/components/ui/button";
import { serviceTiers } from "@/data/services";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/utils";

export function Services() {
  const reducedMotion = useReducedMotion();
  const setEstimatorOpen = usePortfolioStore((state) => state.setEstimatorOpen);
  const setHireOpen = usePortfolioStore((state) => state.setHireOpen);

  return (
    <section id="services" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          command="cat services.json"
          title="Fixed scope. Clear outcome. No mystery invoices."
          description="Three ways to work together. Every package includes a real handover, a working deploy, and a direct line to me — not a handoff to an agency."
          accent="3 tiers"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {serviceTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                delay: reducedMotion ? 0 : index * 0.06,
              }}
              className={cn(
                "relative flex flex-col border bg-card p-5",
                tier.featured
                  ? "border-term-green/40 shadow-[0_0_40px_rgba(124,255,178,0.06)]"
                  : "border-border",
              )}
            >
              {tier.featured ? (
                <span className="absolute -top-px right-4 bg-term-green px-2 py-0.5 text-[8px] tracking-[0.16em] text-primary-foreground uppercase">
                  most picked
                </span>
              ) : null}

              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[9px] tracking-[0.18em] text-term-dim uppercase">
                    tier {index + 1}
                  </div>
                  <h3 className="mt-1 text-xl text-foreground">{tier.name}</h3>
                </div>
                <span className="text-right text-[11px] text-term-green">
                  {tier.price}
                </span>
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                {tier.tagline}
              </p>

              <div className="mt-4 border-y border-border py-3">
                <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
                  outcome
                </div>
                <p className="mt-1 text-[11px] text-foreground/85">
                  {tier.outcome}
                </p>
                <div className="mt-2 text-[9px] text-term-amber">
                  delivery · {tier.timeline}
                </div>
              </div>

              <ul className="mt-4 flex-1 space-y-1.5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-[10px] text-muted-foreground"
                  >
                    <span className="text-term-green">→</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setHireOpen(true)}
                className={cn(
                  buttonVariants({ variant: tier.featured ? "default" : "outline" }),
                  "mt-5 w-full rounded-none",
                  tier.featured
                    ? "bg-term-green text-primary-foreground hover:bg-term-green/80"
                    : "border-border hover:border-term-green/50 hover:text-term-green",
                )}
              >
                start with {tier.name.toLowerCase()}
                <ArrowUpRight className="size-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        <TerminalWindow
          title="~/services — estimate.sh"
          className="mt-4"
          actions={<span className="hidden sm:inline">no obligation</span>}
        >
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="min-w-0">
              <div className="text-[10px] text-muted-foreground">
                <span className="text-term-green">gaurav@portfolio</span>
                <span className="text-term-dim">:</span>
                <span className="text-term-cyan">~</span>
                <span className="text-term-dim">$ </span>
                ./estimate.sh --fast
              </div>
              <p className="mt-2 text-sm text-foreground">
                Not sure which tier? Answer 3 questions for a budget range.
              </p>
              <p className="mt-1 text-[10px] text-term-dim">
                You get a copyable brief you can paste into a Fiverr message.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setEstimatorOpen(true)}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "rounded-none bg-term-green text-primary-foreground hover:bg-term-green/80",
                )}
              >
                <Calculator className="size-3.5" />
                estimate my project
              </button>
              <button
                type="button"
                onClick={() => setHireOpen(true)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-none border-border hover:border-term-green/50 hover:text-term-green",
                )}
              >
                <Sparkles className="size-3.5" />
                hire me
              </button>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}