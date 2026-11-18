"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TerminalWindow } from "@/components/terminal/window";
import { SectionHeader } from "@/components/site/section-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { skillGroups, stats } from "@/lib/data";

const exploring = [
  "agentic workflows",
  "local-first AI",
  "design engineering",
  "edge runtimes",
];

export function Skills() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          command="cat skills.json"
          title="A stack built for shipping."
          description="The tools I reach for when the goal is a real product: typed end-to-end, boring where it counts, and fast where users feel it."
        />

        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reducedMotion ? 0 : 0.45 }}
          >
            <TerminalWindow
              title="~/skills — cat skills.json"
              actions={<span className="hidden sm:inline">read-only</span>}
            >
              <div className="overflow-x-auto p-4 sm:p-6">
                <div className="whitespace-pre text-[10px] leading-relaxed sm:text-[11px]">
                  <span className="text-term-dim">{"{"}</span>
                  {skillGroups.map((group, index) => (
                    <div key={group.file} className="pl-3">
                      <span className="text-term-cyan">
                        &quot;{group.file}&quot;
                      </span>
                      <span className="text-term-dim">: [</span>
                      {group.items.map((item, itemIndex) => (
                        <span key={item}>
                          <span className="text-term-green">
                            &quot;{item}&quot;
                          </span>
                          {itemIndex < group.items.length - 1 ? (
                            <span className="text-term-dim">, </span>
                          ) : null}
                        </span>
                      ))}
                      <span className="text-term-dim">]</span>
                      {index < skillGroups.length - 1 ? (
                        <span className="text-term-dim">,</span>
                      ) : null}
                    </div>
                  ))}
                  <div className="pl-3">
                    <span className="text-term-dim">{"}"}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border px-4 py-2 text-[9px] text-term-dim">
                <span className="text-term-green">✓</span> JSON valid ·{" "}
                {skillGroups.reduce((total, group) => total + group.items.length, 0)}{" "}
                entries
              </div>
            </TerminalWindow>
          </motion.div>

          <div className="min-w-0 space-y-4">
            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: reducedMotion ? 0 : 0.45, delay: 0.08 }}
            >
              <TerminalWindow title="neofetch — stack">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12 rounded-none border border-border">
                      <AvatarFallback className="rounded-none bg-term-green/10 text-sm text-term-green">
                        GK
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="text-sm text-foreground">gaurav kumar</div>
                      <div className="mt-0.5 text-[10px] text-term-dim">
                        full-stack &amp; AI engineer
                      </div>
                      <Badge
                        variant="outline"
                        className="mt-1.5 h-4 rounded-none border-term-green/30 px-1.5 text-[8px] text-term-green"
                      >
                        open for select projects
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-[10px]">
                    <InfoLine label="based" value="remote / worldwide" />
                    <InfoLine label="focus" value="saas · realtime · infra" />
                    <InfoLine label="core" value="typescript · python · go" />
                    <InfoLine label="deploy" value="vercel · docker · aws" />
                    <InfoLine label="response" value="< 24h" />
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-px border border-border bg-border">
                    {stats.map((stat) => (
                      <div key={stat.label} className="bg-card px-2 py-2">
                        <div className="text-[12px] text-term-green">
                          {stat.value}
                        </div>
                        <div className="mt-0.5 text-[8px] text-term-dim">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
                    <span className="size-3 bg-term-green" />
                    <span className="size-3 bg-term-amber" />
                    <span className="size-3 bg-term-cyan" />
                    <span className="size-3 bg-term-red" />
                    <span className="size-3 border border-border bg-card" />
                    <span className="ml-1 text-[8px] text-term-dim">
                      terminal palette
                    </span>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>

            <div className="border border-border bg-card p-4">
              <div className="text-[9px] tracking-[0.16em] text-term-dim uppercase">
                currently exploring
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exploring.map((item) => (
                  <span
                    key={item}
                    className="border border-border px-2 py-1 text-[9px] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-term-dim">
                I like tools that make the next step obvious: typed APIs, small
                services, observable queues, and interfaces that respect the
                user&apos;s context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-term-dim">{label}</span>
      <span className="text-right text-foreground/80">{value}</span>
    </div>
  );
}