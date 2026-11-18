"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons/github";
import { useState } from "react";
import { toast } from "sonner";
import { TerminalWindow } from "@/components/terminal/window";
import { SectionHeader } from "@/components/site/section-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const email = "hello@gauravkumar.dev";

export function Contact() {
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
    <section id="contact" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="05"
          command="./contact.sh"
          title="Have something worth building?"
          description="Tell me what you're working on — the rough version is fine. I reply within 24 hours with honest thoughts on scope, approach, and fit."
          accent="open"
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reducedMotion ? 0 : 0.45 }}
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
                  <span className="text-term-green">gaurav@portfolio</span>
                  <span className="text-term-dim">:</span>
                  <span className="text-term-cyan">~</span>
                  <span className="text-term-dim">$ </span>
                  ./contact.sh --now
                </div>

                <div className="mt-4 space-y-1 text-[10px] sm:text-[11px]">
                  <div className="text-term-green">
                    [ok] channel open
                  </div>
                  <div className="text-term-green">
                    [ok] response &lt; 24h
                  </div>
                  <div className="text-term-dim">
                    [ok] remote / worldwide
                  </div>
                </div>

                <p className="mt-6 text-2xl tracking-tight text-foreground sm:text-3xl">
                  <span className="mr-2 text-term-green">❯</span>
                  let&apos;s build something.
                </p>

                <div className="mt-4 border border-border bg-black/20 p-3">
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
                  <a
                    href={`mailto:${email}?subject=Project%20inquiry`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-none bg-term-green text-primary-foreground hover:bg-term-green/80",
                    )}
                  >
                    email me
                    <Mail className="size-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-none border-border hover:border-term-green/50 hover:text-term-green",
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
                      "rounded-none text-term-dim hover:text-term-green",
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
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-term-dim">status</span>
                    <span className="text-right text-term-green">
                      open for select projects
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-term-dim">based</span>
                    <span className="text-right text-foreground/80">
                      remote / worldwide
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-term-dim">response</span>
                    <span className="text-right text-foreground/80">
                      &lt; 24h
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-term-dim">timezone</span>
                    <span className="text-right text-foreground/80">
                      flexible
                    </span>
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-3">
                  <div className="text-[9px] tracking-[0.16em] text-term-dim uppercase">
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