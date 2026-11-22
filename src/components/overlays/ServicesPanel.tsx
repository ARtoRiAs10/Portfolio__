"use client";

import { Calculator, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { serviceTiers } from "@/data/services";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/utils";

export function ServicesPanel() {
  const open = usePortfolioStore((state) => state.servicesOpen);
  const setOpen = usePortfolioStore((state) => state.setServicesOpen);
  const setEstimatorOpen = usePortfolioStore((state) => state.setEstimatorOpen);
  const setHireOpen = usePortfolioStore((state) => state.setHireOpen);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setHireOpen(false);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[88vh] w-[calc(100%-1rem)] max-w-4xl gap-0 overflow-y-auto rounded-sm border-border bg-card p-0"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2 text-[9px] tracking-[0.12em] text-term-dim uppercase">
            <span className="size-1.5 rounded-full bg-term-green" />
            cat services.json
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="border border-border px-2 py-1 text-[9px] text-term-dim hover:border-term-green/50 hover:text-term-green"
          >
            close
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <DialogTitle className="text-2xl tracking-tight sm:text-3xl">
            Fixed scope. Clear outcome.
            <span aria-hidden="true" className="text-term-green">
              _
            </span>
          </DialogTitle>
          <DialogDescription className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Three ways to work together. Every package includes a real handover,
            a working deploy, and a direct line to me — not a handoff to an
            agency.
          </DialogDescription>

          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {serviceTiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col border bg-background/40 p-4",
                  tier.featured ? "border-term-green/40" : "border-border",
                )}
              >
                {tier.featured ? (
                  <span className="absolute -top-px right-3 bg-term-green px-1.5 py-0.5 text-[7px] tracking-[0.16em] text-primary-foreground uppercase">
                    most picked
                  </span>
                ) : null}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[8px] tracking-[0.18em] text-term-dim uppercase">
                      {tier.id}
                    </div>
                    <div className="mt-1 text-lg text-foreground">
                      {tier.name}
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-term-green">
                    {tier.price}
                  </div>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                  {tier.tagline}
                </p>
                <div className="mt-3 border-y border-border py-2">
                  <div className="text-[7px] tracking-[0.16em] text-term-dim uppercase">
                    outcome
                  </div>
                  <p className="mt-1 text-[10px] text-foreground/85">
                    {tier.outcome}
                  </p>
                  <div className="mt-1.5 text-[8px] text-term-amber">
                    {tier.timeline}
                  </div>
                </div>
                <ul className="mt-3 flex-1 space-y-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-1.5 text-[9px] text-muted-foreground"
                    >
                      <span className="text-term-green">→</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setHireOpen(true);
                  }}
                  className={cn(
                    buttonVariants({
                      variant: tier.featured ? "default" : "outline",
                    }),
                    "mt-3 w-full rounded-none",
                    tier.featured
                      ? "bg-term-green text-primary-foreground"
                      : "border-border hover:border-term-green/50 hover:text-term-green",
                  )}
                >
                  <Sparkles className="size-3" />
                  start here
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-border bg-black/20 p-3">
            <div>
              <div className="text-[10px] text-foreground">
                Not sure which tier? Answer 3 questions.
              </div>
              <div className="mt-0.5 text-[9px] text-term-dim">
                You get a budget range + a copyable brief for Fiverr.
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setEstimatorOpen(true);
              }}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-none border-term-green/30 text-term-green hover:bg-term-green/10",
              )}
            >
              <Calculator className="size-3.5" />
              estimate my project
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}