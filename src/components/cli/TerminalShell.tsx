"use client";

import { useCallback, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TerminalWindow } from "@/components/terminal/window";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useTerminal } from "@/components/cli/useTerminal";
import { OutputRenderer } from "@/components/cli/OutputRenderer";
import { CommandInput } from "@/components/cli/CommandInput";
import { CommandChips } from "@/components/cli/CommandChips";
import { cn } from "@/lib/utils";

export function TerminalShell({
  title = "gaurav@portfolio: ~ — zsh — 120×40",
  actions,
  header,
  aside,
  variant = "hero",
  className,
  boot = true,
  showChips = true,
  showHints = true,
  chips,
  placeholder = 'type "help" to begin...',
  autoFocus = false,
}: {
  title?: string;
  actions?: ReactNode;
  header?: ReactNode;
  aside?: ReactNode;
  variant?: "hero" | "dock";
  className?: string;
  boot?: boolean;
  showChips?: boolean;
  showHints?: boolean;
  chips?: string[];
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const {
    lines,
    input,
    setInput,
    runCommand,
    onKeyDown,
    submit,
    inputRef,
    outputRef,
    bootVisible,
    showBoot,
    bootLines,
  } = useTerminal({ boot });

  const openProject = useCallback((slug: string) => {
    usePortfolioStore.getState().openProject(slug);
  }, []);

  const duration = reducedMotion ? 0 : 0.18;

  return (
    <TerminalWindow
      title={title}
      className={className}
      actions={
        actions ?? (
          <>
            <span className="hidden sm:inline">● online</span>
            <span className="sm:hidden">●</span>
          </>
        )
      }
    >
      <div
        className={cn(
          "grid gap-6",
          variant === "hero"
            ? "p-4 sm:p-6 lg:gap-8"
            : "gap-3 p-2.5 sm:p-3",
          aside && "lg:grid-cols-[1.35fr_0.65fr]",
        )}
      >
        <div className="min-w-0">
          {header}

          {boot && showBoot ? (
            <div
              className={cn(
                "space-y-1 text-term-dim",
                variant === "hero"
                  ? "mt-5 min-h-12 text-[11px] sm:text-xs"
                  : "mt-2 text-[10px]",
              )}
            >
              <AnimatePresence initial={false}>
                {bootLines.slice(0, bootVisible).map((line) => (
                  <motion.div
                    key={line.text}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration }}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : null}

          <div
            ref={outputRef}
            className={cn(
              "space-y-1 overflow-y-auto pr-2 leading-relaxed",
              variant === "hero"
                ? "mt-4 max-h-64 border-t border-border pt-4 text-xs sm:text-[13px]"
                : "max-h-44 text-[10px] sm:text-[11px]",
            )}
            aria-live="polite"
          >
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration }}
                >
                  <OutputRenderer
                    line={line}
                    onOpenProject={openProject}
                    duration={duration}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <CommandInput
            input={input}
            setInput={setInput}
            onKeyDown={onKeyDown}
            onSubmit={submit}
            inputRef={inputRef}
            variant={variant}
            placeholder={placeholder}
            autoFocus={autoFocus}
          />

          {showChips ? (
            <div className="mt-3">
              <CommandChips
                onRun={runCommand}
                compact={variant === "dock"}
                commands={chips}
              />
            </div>
          ) : null}

          {showHints ? (
            <p
              className={cn(
                "text-term-dim",
                variant === "hero" ? "mt-2 text-[9px]" : "mt-1.5 text-[8px]",
              )}
            >
              tab to autocomplete · ↑↓ history · ctrl+l clear
            </p>
          ) : null}
        </div>

        {aside ? <aside className="hidden lg:block">{aside}</aside> : null}
      </div>
    </TerminalWindow>
  );
}

