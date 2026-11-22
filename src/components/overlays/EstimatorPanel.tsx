"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import {
  buildEstimateBrief,
  emptyEstimatorAnswers,
  estimateProject,
  integrationOptions,
  projectTypeOptions,
  timelineOptions,
  type EstimatorAnswers,
  type Integration,
} from "@/data/services";
import { siteConfig } from "@/lib/site";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/utils";

const steps = ["project", "timeline", "integrations"] as const;

export function EstimatorPanel() {
  const open = usePortfolioStore((state) => state.estimatorOpen);
  const setOpen = usePortfolioStore((state) => state.setEstimatorOpen);
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] =
    useState<EstimatorAnswers>(emptyEstimatorAnswers);
  const [done, setDone] = useState(false);

  const result = useMemo(() => estimateProject(answers), [answers]);

  const toggleIntegration = (id: Integration) => {
    setAnswers((prev) => {
      if (id === "none") return { ...prev, integrations: [] };
      const withoutNone = prev.integrations.filter((item) => item !== "none");
      const next = withoutNone.includes(id)
        ? withoutNone.filter((item) => item !== id)
        : [...withoutNone, id];
      return { ...prev, integrations: next };
    });
  };

  const canContinue =
    step === 0
      ? Boolean(answers.projectType)
      : step === 1
        ? Boolean(answers.timeline)
        : true;

  const copyBrief = async () => {
    const brief = buildEstimateBrief(answers);
    try {
      await navigator.clipboard.writeText(brief);
      toast.success("Brief copied", {
        description: "Paste it into a Fiverr message or email.",
      });
    } catch {
      toast.error("Could not copy brief");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setStep(0);
          setAnswers(emptyEstimatorAnswers);
          setDone(false);
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[88vh] w-[calc(100%-1rem)] max-w-2xl gap-0 overflow-y-auto rounded-sm border-border bg-card p-0"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2 text-[9px] tracking-[0.12em] text-term-dim uppercase">
            <span className="size-1.5 rounded-full bg-term-green" />
            ./estimate.sh
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
          {!done ? (
            <>
              <div className="flex items-center gap-2">
                {steps.map((item, index) => (
                  <div key={item} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid size-5 place-items-center border text-[8px]",
                        index === step
                          ? "border-term-green bg-term-green/10 text-term-green"
                          : index < step
                            ? "border-term-green/40 text-term-green/70"
                            : "border-border text-term-dim",
                      )}
                    >
                      {index < step ? <Check className="size-2.5" /> : index + 1}
                    </span>
                    <span
                      className={cn(
                        "text-[8px] tracking-[0.16em] uppercase",
                        index === step ? "text-term-green" : "text-term-dim",
                      )}
                    >
                      {item}
                    </span>
                    {index < steps.length - 1 ? (
                      <span className="h-px w-6 bg-border" />
                    ) : null}
                  </div>
                ))}
              </div>

              <DialogTitle className="mt-5 text-2xl tracking-tight">
                {step === 0
                  ? "What are we building?"
                  : step === 1
                    ? "When do you need it?"
                    : "What needs to connect?"}
                <span aria-hidden="true" className="text-term-green">
                  _
                </span>
              </DialogTitle>
              <DialogDescription className="mt-2 text-xs text-muted-foreground">
                {step === 0
                  ? "Pick the closest fit. We can refine the scope on a call."
                  : step === 1
                    ? "Rush work is possible, but it changes the price and the calendar."
                    : "Select everything that applies. None is fine for a first version."}
              </DialogDescription>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: reducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
                  transition={{ duration: reducedMotion ? 0 : 0.18 }}
                  className="mt-5 grid gap-2"
                >
                  {step === 0
                    ? projectTypeOptions.map((option) => (
                        <OptionButton
                          key={option.id}
                          selected={answers.projectType === option.id}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              projectType: option.id,
                            }))
                          }
                          label={option.label}
                          description={option.description}
                          meta={option.weeks}
                        />
                      ))
                    : null}

                  {step === 1
                    ? timelineOptions.map((option) => (
                        <OptionButton
                          key={option.id}
                          selected={answers.timeline === option.id}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              timeline: option.id,
                            }))
                          }
                          label={option.label}
                          description={option.description}
                          meta={
                            option.multiplier > 1
                              ? "+35% rush"
                              : option.multiplier < 1
                                ? "flexible pricing"
                                : "standard"
                          }
                        />
                      ))
                    : null}

                  {step === 2
                    ? integrationOptions.map((option) => {
                        const selected = option.id === "none"
                          ? answers.integrations.length === 0
                          : answers.integrations.includes(option.id);
                        return (
                          <OptionButton
                            key={option.id}
                            selected={selected}
                            onClick={() => toggleIntegration(option.id)}
                            label={option.label}
                            description={option.description}
                            meta={
                              option.add
                                ? `+$${option.add}`
                                : "keep it small"
                            }
                          />
                        );
                      })
                    : null}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between gap-2 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setStep((value) => Math.max(0, value - 1))}
                  disabled={step === 0}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "rounded-none text-[10px] text-term-dim disabled:opacity-30",
                  )}
                >
                  <ArrowLeft className="size-3" />
                  back
                </button>

                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => {
                    if (step < 2) setStep((value) => value + 1);
                    else setDone(true);
                  }}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "rounded-none bg-term-green text-primary-foreground disabled:opacity-40",
                  )}
                >
                  {step < 2 ? "continue" : "show estimate"}
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="text-[9px] tracking-[0.18em] text-term-dim uppercase">
                estimate ready
              </div>
              <DialogTitle className="mt-2 text-2xl tracking-tight sm:text-3xl">
                ${result?.low.toLocaleString()}–
                <span className="text-term-green">
                  ${result?.high.toLocaleString()}
                </span>
              </DialogTitle>
              <DialogDescription className="mt-2 text-xs text-muted-foreground">
                A planning range, not a binding quote. Delivery estimate:{" "}
                <span className="text-term-amber">{result?.weeks}</span>.
              </DialogDescription>

              <div className="mt-5 border border-border">
                {result?.lineItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between border-b border-border px-3 py-2 text-[10px] last:border-b-0"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground">
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border border-border bg-black/20 p-3 text-[10px] leading-relaxed text-term-dim">
                <span className="text-term-green">$</span> next: copy the brief
                and send it through Fiverr or email. I reply within 24 hours with
                honest thoughts on scope, approach, and fit.
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={copyBrief}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "rounded-none bg-term-green text-primary-foreground hover:bg-term-green/80",
                  )}
                >
                  <Copy className="size-3.5" />
                  copy brief
                </button>
                <a
                  href={siteConfig.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-none border-border hover:border-term-green/50 hover:text-term-green",
                  )}
                >
                  order on fiverr
                  <ExternalLink className="size-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setStep(0);
                    setAnswers(emptyEstimatorAnswers);
                    setDone(false);
                  }}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "rounded-none text-term-dim hover:text-term-green",
                  )}
                >
                  <RotateCcw className="size-3.5" />
                  start over
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OptionButton({
  selected,
  onClick,
  label,
  description,
  meta,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  description: string;
  meta?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-3 border px-3 py-2.5 text-left transition-all",
        selected
          ? "border-term-green bg-term-green/5"
          : "border-border hover:border-term-green/40 hover:bg-term-green/[0.02]",
      )}
    >
      <span
        className={cn(
          "grid size-4 shrink-0 place-items-center border",
          selected
            ? "border-term-green bg-term-green text-primary-foreground"
            : "border-border text-transparent",
        )}
      >
        <Check className="size-2.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] text-foreground">{label}</span>
        <span className="mt-0.5 block text-[9px] text-term-dim">
          {description}
        </span>
      </span>
      {meta ? (
        <span className="shrink-0 text-[9px] text-term-amber">{meta}</span>
      ) : null}
    </button>
  );
}