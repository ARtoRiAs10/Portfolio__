"use client";

import { CornerDownLeft } from "lucide-react";
import type { FormEvent, KeyboardEvent, RefObject } from "react";

export function CommandInput({
  input,
  setInput,
  onKeyDown,
  onSubmit,
  inputRef,
  variant = "hero",
  placeholder = 'type "help" to begin...',
  autoFocus = false,
}: {
  input: string;
  setInput: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  variant?: "hero" | "dock";
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={
        variant === "dock"
          ? "mt-2 flex items-center gap-2 border-t border-border pt-2"
          : "mt-3 flex items-center gap-2 border-t border-border pt-3"
      }
    >
      <label
        htmlFor={variant === "dock" ? "terminal-input-dock" : "terminal-input"}
        className={
          variant === "dock"
            ? "shrink-0 text-[10px]"
            : "shrink-0 text-xs sm:text-sm"
        }
      >
        <span className="text-term-green">gaurav@portfolio</span>
        <span className="text-term-dim">:</span>
        <span className="text-term-cyan">~</span>
        <span className="text-term-dim">$</span>
      </label>
      <input
        id={variant === "dock" ? "terminal-input-dock" : "terminal-input"}
        ref={inputRef}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={
          variant === "dock"
            ? "term-input min-w-0 flex-1 bg-transparent text-[11px] text-foreground outline-none"
            : "term-input min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none sm:text-sm"
        }
        aria-label="Terminal command"
      />
      <button
        type="submit"
        className={
          variant === "dock"
            ? "grid size-5 shrink-0 place-items-center border border-border text-term-dim transition-colors hover:border-term-green hover:text-term-green"
            : "grid size-6 shrink-0 place-items-center border border-border text-term-dim transition-colors hover:border-term-green hover:text-term-green"
        }
        aria-label="Run command"
      >
        <CornerDownLeft className={variant === "dock" ? "size-2.5" : "size-3"} />
      </button>
    </form>
  );
}