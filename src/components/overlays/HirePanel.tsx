"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Mail } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/utils";

export function HirePanel() {
  const open = usePortfolioStore((state) => state.hireOpen);
  const setOpen = usePortfolioStore((state) => state.setHireOpen);
  const setEstimatorOpen = usePortfolioStore((state) => state.setEstimatorOpen);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "Full-stack MVP",
    budget: "Not sure yet",
    message: "",
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      toast.success("Email copied", { description: siteConfig.email });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email");
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Project inquiry — ${form.project}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project: ${form.project}`,
      `Budget: ${form.budget}`,
      "",
      form.message,
    ].join("\n");
    const href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setEstimatorOpen(false);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[88vh] w-[calc(100%-1rem)] max-w-3xl gap-0 overflow-y-auto rounded-sm border-border bg-card p-0"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2 text-[9px] tracking-[0.12em] text-term-dim uppercase">
            <span className="size-1.5 rounded-full bg-term-green" />
            ./hire.sh
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
            Let&apos;s build something.
            <span aria-hidden="true" className="text-term-green">
              _
            </span>
          </DialogTitle>
          <DialogDescription className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Tell me what you are working on — the rough version is fine. I reply
            within 24 hours with honest thoughts on scope, approach, and fit.
          </DialogDescription>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
            <form onSubmit={submit} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="name"
                  value={form.name}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, name: value }))
                  }
                  placeholder="Your name"
                  required
                />
                <Field
                  label="email"
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, email: value }))
                  }
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <SelectField
                  label="project"
                  value={form.project}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, project: value }))
                  }
                  options={[
                    "Landing page",
                    "Full-stack MVP",
                    "AI workflow",
                    "Realtime app",
                    "Rescue / audit",
                    "Not sure yet",
                  ]}
                />
                <SelectField
                  label="budget"
                  value={form.budget}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, budget: value }))
                  }
                  options={[
                    "Not sure yet",
                    "Under $1k",
                    "$1k–$3k",
                    "$3k–$6k",
                    "$6k+",
                  ]}
                />
              </div>

              <label className="block">
                <span className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
                  what are you building?
                </span>
                <textarea
                  value={form.message}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, message: event.target.value }))
                  }
                  rows={4}
                  required
                  placeholder="A sentence or two is enough. Links help."
                  className="mt-1 w-full resize-none border border-border bg-black/20 px-3 py-2 text-[11px] text-foreground outline-none placeholder:text-term-dim focus:border-term-green/50"
                />
              </label>

              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full rounded-none bg-term-green text-primary-foreground hover:bg-term-green/80",
                )}
              >
                <Mail className="size-3.5" />
                send brief by email
              </button>
            </form>

            <aside className="space-y-3">
              <div className="border border-border bg-black/20 p-3">
                <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
                  direct channels
                </div>
                <div className="mt-3 space-y-2">
                  <a
                    href={siteConfig.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between rounded-none border-border text-[10px] hover:border-term-green/50 hover:text-term-green",
                    )}
                  >
                    fiverr
                    <ExternalLink className="size-3" />
                  </a>
                  <a
                    href={siteConfig.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between rounded-none border-border text-[10px] hover:border-term-green/50 hover:text-term-green",
                    )}
                  >
                    book a call
                    <ExternalLink className="size-3" />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between rounded-none border-border text-[10px] hover:border-term-green/50 hover:text-term-green",
                    )}
                  >
                    {copied ? "copied" : "copy email"}
                    {copied ? (
                      <Check className="size-3" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                </div>
                <div className="mt-3 truncate border-t border-border pt-3 text-[10px] text-term-green">
                  {siteConfig.email}
                </div>
              </div>

              <div className="border border-border bg-black/20 p-3">
                <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
                  good fit
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[
                    "ai feature",
                    "mvp",
                    "platform",
                    "realtime",
                    "rescue",
                  ].map((item) => (
                    <span
                      key={item}
                      className="border border-border px-1.5 py-1 text-[8px] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-3 border-t border-border pt-2 text-[9px] leading-relaxed text-term-dim">
                  <span className="text-term-green">$</span> no agencies, no
                  handoffs, no mystery invoices.
                </div>
              </div>

              <div className="border border-border bg-black/20 p-3">
                <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
                  not sure yet?
                </div>
                <p className="mt-2 text-[9px] leading-relaxed text-term-dim">
                  Answer 3 questions for a budget range and a copyable brief.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setEstimatorOpen(true);
                  }}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "mt-2 rounded-none px-0 text-[10px] text-term-green hover:bg-transparent",
                  )}
                >
                  open estimator →
                </button>
              </div>
            </aside>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 h-8 w-full border border-border bg-black/20 px-2.5 text-[11px] text-foreground outline-none placeholder:text-term-dim focus:border-term-green/50"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-8 w-full border border-border bg-black/20 px-2 text-[11px] text-foreground outline-none focus:border-term-green/50"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-card">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}