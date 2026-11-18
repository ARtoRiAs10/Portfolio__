"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CornerDownLeft, Sparkles } from "lucide-react";
import { TerminalWindow } from "@/components/terminal/window";
import { Typewriter } from "@/components/terminal/typewriter";
import { projects, stats, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type LineKind = "cmd" | "out" | "ok" | "dim" | "accent" | "error" | "projects";

type Line = {
  id: number;
  kind: LineKind;
  text?: string;
  items?: Project[];
};

const bootLines = [
  { kind: "dim" as LineKind, text: "[ok] portfolio kernel initialized" },
  {
    kind: "dim" as LineKind,
    text: `[ok] ${projects.length} projects mounted · ${projects.filter((p) => p.pinned).length} pinned`,
  },
  { kind: "dim" as LineKind, text: "[ok] shell ready — type help" },
];

const commandHints = [
  "ls projects",
  "cat about.md",
  "open orchestra",
  "contact",
  "sudo hire-me",
];

const asciiGk = ` ██████╗ ██╗  ██╗
██╔════╝ ██║ ██╔╝
██║  ███╗█████╔╝
██║   ██║██╔═██╗
╚██████╔╝██║  ██╗
 ╚═════╝ ╚═╝  ╚═╝`;

const toneClass: Record<Exclude<LineKind, "cmd" | "projects">, string> = {
  out: "text-foreground/80",
  ok: "text-term-green",
  dim: "text-term-dim",
  accent: "text-term-amber",
  error: "text-term-red",
};

export function HeroTerminal() {
  const reducedMotion = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [bootVisible, setBootVisible] = useState(0);
  const [showBoot, setShowBoot] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(100);

  const openProject = useCallback((slug: string) => {
    window.dispatchEvent(
      new CustomEvent("portfolio:open-project", { detail: slug }),
    );
  }, []);

  const goTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const push = useCallback((items: Omit<Line, "id">[]) => {
    const withIds = items.map((item) => ({
      ...item,
      id: nextId.current++,
    }));
    setLines((prev) => [...prev, ...withIds].slice(-90));
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() =>
        setBootVisible(bootLines.length),
      );
      return () => cancelAnimationFrame(frame);
    }
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setBootVisible(index);
      if (index >= bootLines.length) clearInterval(timer);
    }, 260);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, bootVisible, showBoot]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (event.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed].slice(-30));
      setHistoryIndex(-1);
      setInput("");

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);
      const output: Omit<Line, "id">[] = [{ kind: "cmd", text: trimmed }];

      switch (command) {
        case "help":
          output.push(
            { kind: "out", text: "available commands:" },
            {
              kind: "out",
              text: "  ls [projects|pinned]   list the work",
            },
            {
              kind: "out",
              text: "  open <project>         cat a project README",
            },
            { kind: "out", text: "  cat about.md           jump to about" },
            { kind: "out", text: "  contact                jump to contact" },
            { kind: "out", text: "  whoami · status · date" },
            { kind: "out", text: "  neofetch · history · clear" },
            { kind: "out", text: "  sudo hire-me           (try it)" },
          );
          break;

        case "ls": {
          const scope = args[0]?.toLowerCase();
          const list =
            scope === "pinned"
              ? projects.filter((p) => p.pinned)
              : scope === "projects" || !scope
                ? projects
                : projects.filter(
                    (p) =>
                      p.category === scope ||
                      p.command.replace("/", "") === scope,
                  );
          output.push(
            { kind: "out", text: `total ${list.length}` },
            { kind: "projects", items: list },
          );
          break;
        }

        case "open":
        case "cat": {
          const query = args.join(" ").replace(/\/$/, "").toLowerCase();
          const project = projects.find(
            (p) =>
              p.slug === query ||
              p.name.toLowerCase() === query ||
              p.command.replace("/", "") === query,
          );
          if (project) {
            openProject(project.slug);
            output.push({
              kind: "ok",
              text: `opening ${project.command}README.md ...`,
            });
          } else {
            output.push({
              kind: "error",
              text: `open: project not found: ${args.join(" ") || "(none)"}`,
            });
            output.push({
              kind: "dim",
              text: "try: ls projects",
            });
          }
          break;
        }

        case "about":
          goTo("about");
          output.push({ kind: "ok", text: "→ /about" });
          break;

        case "contact":
          goTo("contact");
          output.push({ kind: "ok", text: "→ /contact" });
          break;

        case "work":
        case "projects":
          goTo("projects");
          output.push({ kind: "ok", text: "→ /projects" });
          break;

        case "whoami":
          output.push(
            { kind: "out", text: "gaurav kumar" },
            { kind: "dim", text: "full-stack & ai engineer · remote / worldwide" },
          );
          break;

        case "status":
          output.push(
            { kind: "ok", text: "● open for select projects" },
            { kind: "dim", text: "response: < 24h · timezone: remote" },
          );
          break;

        case "date":
          output.push({ kind: "out", text: new Date().toString() });
          break;

        case "pwd":
          output.push({ kind: "out", text: "/home/gaurav/portfolio" });
          break;

        case "echo":
          output.push({ kind: "out", text: args.join(" ") });
          break;

        case "history":
          output.push(
            ...history.map((item, index) => ({
              kind: "out" as LineKind,
              text: `  ${String(index + 1).padStart(2, "0")}  ${item}`,
            })),
          );
          break;

        case "neofetch":
          output.push(
            { kind: "accent", text: "gaurav@portfolio" },
            { kind: "dim", text: "-----------------" },
            { kind: "out", text: "os: remote / worldwide" },
            { kind: "out", text: "shell: zsh" },
            { kind: "out", text: "role: full-stack & ai engineer" },
            { kind: "out", text: `projects: ${projects.length}` },
            { kind: "out", text: `pinned: ${projects.filter((p) => p.pinned).length}` },
            { kind: "out", text: "status: open for select projects" },
          );
          break;

        case "clear":
          setLines([]);
          setShowBoot(false);
          setBootVisible(0);
          return;

        case "sudo":
          if (args[0]?.toLowerCase() === "hire-me") {
            output.push(
              { kind: "ok", text: "permission granted: let's build something." },
              { kind: "dim", text: "opening /contact ..." },
            );
            goTo("contact");
          } else {
            output.push({
              kind: "error",
              text: "sudo: only 'hire-me' is permitted.",
            });
          }
          break;

        default:
          output.push({
            kind: "error",
            text: `zsh: command not found: ${command}`,
          });
          output.push({
            kind: "dim",
            text: 'type "help" for commands, or "ls projects" to explore.',
          });
      }

      push(output);
    },
    [goTo, history, openProject, push],
  );

  const autocomplete = useCallback(() => {
    const pool = [
      "help",
      "ls",
      "ls projects",
      "ls pinned",
      "open ",
      "cat ",
      "about",
      "contact",
      "work",
      "whoami",
      "status",
      "date",
      "pwd",
      "echo ",
      "history",
      "neofetch",
      "clear",
      "sudo hire-me",
      ...projects.map((p) => `open ${p.slug}`),
    ];
    const match = pool.find(
      (candidate) => candidate.startsWith(input) && candidate !== input,
    );
    if (match) {
      setInput(match.endsWith(" ") ? match : `${match} `);
    }
  }, [input]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[history.length - 1 - next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(history[history.length - 1 - next]);
    } else if (event.key === "Tab") {
      event.preventDefault();
      autocomplete();
    } else if (event.key === "l" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setLines([]);
      setShowBoot(false);
      setBootVisible(0);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  const duration = reducedMotion ? 0 : 0.2;

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-8"
    >
      <div
        className="grid-bg pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: EASE }}
        >
          <TerminalWindow
            title="gaurav@portfolio: ~ — zsh — 120×40"
            actions={
              <>
                <span className="hidden sm:inline">● online</span>
                <span className="sm:hidden">●</span>
              </>
            }
          >
            <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
              <div className="min-w-0">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-[9px] tracking-[0.22em] text-term-dim uppercase">
                      {"// portfolio v3.0"}
                    </div>
                    <h1 className="mt-2 text-3xl tracking-tight sm:text-5xl">
                      Gaurav Kumar<span aria-hidden="true" className="text-term-green">_</span>
                    </h1>
                    <p className="mt-1.5 text-xs text-term-green sm:text-sm">
                      &gt; full-stack &amp; AI engineer
                    </p>
                  </div>
                  <div className="hidden text-right text-[9px] leading-relaxed text-term-dim sm:block">
                    <div>os: remote</div>
                    <div>shell: zsh</div>
                    <div>uptime: shipping</div>
                  </div>
                </div>

                <p className="mt-5 text-base text-foreground/85 sm:text-lg">
                  <span className="mr-2 text-term-green">❯</span>
                  <Typewriter
                    text="I build software that feels inevitable."
                    speed={28}
                    startDelay={450}
                  />
                </p>

                <div className="mt-5 min-h-12 space-y-1 text-[11px] text-term-dim sm:text-xs">
                  <AnimatePresence initial={false}>
                    {showBoot
                      ? bootLines.slice(0, bootVisible).map((line) => (
                          <motion.div
                            key={line.text}
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration }}
                          >
                            {line.text}
                          </motion.div>
                        ))
                      : null}
                  </AnimatePresence>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <div
                    ref={outputRef}
                    className="max-h-64 space-y-1 overflow-y-auto pr-2 text-xs leading-relaxed sm:text-[13px]"
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
                          <LineView line={line} onOpenProject={openProject} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <form
                    onSubmit={onSubmit}
                    className="mt-3 flex items-center gap-2 border-t border-border pt-3"
                  >
                    <label
                      htmlFor="terminal-input"
                      className="shrink-0 text-xs sm:text-sm"
                    >
                      <span className="text-term-green">gaurav@portfolio</span>
                      <span className="text-term-dim">:</span>
                      <span className="text-term-cyan">~</span>
                      <span className="text-term-dim">$</span>
                    </label>
                    <input
                      id="terminal-input"
                      ref={inputRef}
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={onKeyDown}
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder='type "help" to begin...'
                      className="term-input min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none sm:text-sm"
                      aria-label="Terminal command"
                    />
                    <button
                      type="submit"
                      className="grid size-6 shrink-0 place-items-center border border-border text-term-dim transition-colors hover:border-term-green hover:text-term-green"
                      aria-label="Run command"
                    >
                      <CornerDownLeft className="size-3" />
                    </button>
                  </form>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 flex items-center gap-1 text-[9px] tracking-[0.12em] text-term-dim uppercase">
                    <Sparkles className="size-3" />
                    try
                  </span>
                  {commandHints.map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => runCommand(command)}
                      className="border border-border px-2 py-1 text-[10px] text-muted-foreground transition-all hover:-translate-y-px hover:border-term-green/50 hover:bg-term-green/5 hover:text-term-green sm:text-[11px]"
                    >
                      {command}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[9px] text-term-dim">
                  tab to autocomplete · ↑↓ history · ctrl+l clear
                </p>
              </div>

              <aside className="hidden lg:block">
                <div className="rounded-sm border border-border bg-black/20 p-4">
                  <pre aria-hidden="true" className="ascii glow-green text-[8px] text-term-green sm:text-[9px]">
                    {asciiGk}
                  </pre>
                  <div className="mt-4 space-y-1.5 text-[11px]">
                    <InfoRow label="role" value="full-stack / ai" />
                    <InfoRow label="focus" value="saas · realtime · infra" />
                    <InfoRow label="stack" value="ts · py · go" />
                    <InfoRow label="status" value="open for work" accent />
                  </div>
                  <div className="mt-4 border-t border-border pt-3">
                    <div className="text-[9px] tracking-[0.16em] text-term-dim uppercase">
                      pinned
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {projects
                        .filter((p) => p.pinned)
                        .map((project) => (
                          <button
                            key={project.slug}
                            type="button"
                            onClick={() => openProject(project.slug)}
                            className="border border-border px-1.5 py-1 text-[9px] text-muted-foreground transition-colors hover:border-term-green/50 hover:text-term-green"
                          >
                            {project.name}
                          </button>
                        ))}
                    </div>
                  </div>
                  <div className="mt-4 border-t border-border pt-3">
                    <div className="grid grid-cols-2 gap-2 text-[9px]">
                      {stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-term-green">{stat.value}</div>
                          <div className="text-term-dim">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-term-dim">{label}</span>
      <span className={accent ? "text-term-green" : "text-foreground/80"}>
        {value}
      </span>
    </div>
  );
}

function LineView({
  line,
  onOpenProject,
}: {
  line: Line;
  onOpenProject: (slug: string) => void;
}) {
  if (line.kind === "cmd") {
    return (
      <div className="text-foreground">
        <span className="text-term-green">gaurav@portfolio</span>
        <span className="text-term-dim">:</span>
        <span className="text-term-cyan">~</span>
        <span className="text-term-dim">$ </span>
        {line.text}
      </div>
    );
  }

  if (line.kind === "projects") {
    return (
      <div className="mt-1 space-y-0.5">
        {(line.items ?? []).map((project) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => onOpenProject(project.slug)}
            className="group flex w-full items-center gap-2 py-0.5 text-left transition-colors hover:text-term-green"
          >
            <span className="hidden shrink-0 text-term-dim sm:inline">
              drwxr-xr-x
            </span>
            <span className="shrink-0 text-term-cyan">{project.command}</span>
            <span className="truncate text-muted-foreground group-hover:text-foreground/80">
              {project.tagline}
            </span>
            {project.pinned ? (
              <span className="ml-auto shrink-0 border border-term-amber/30 px-1 py-0.5 text-[8px] text-term-amber">
                pinned
              </span>
            ) : null}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("break-words", toneClass[line.kind])}>
      {line.text}
    </div>
  );
}