"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { projects, skillGroups, stats, type Project } from "@/lib/data";
import {
  allCommands,
  commandGroups,
  themeNames,
  zoneNames,
} from "@/data/commands";
import {
  usePortfolioStore,
  type ThemeName,
  type ViewMode,
  type ZoneId,
} from "@/store/usePortfolioStore";
import { fetchGithubStats } from "@/lib/github";
import { useGameStore } from "@/store/useGameStore";
import { playClick, playSuccess, playWhoosh } from "@/lib/audio";
import { COMMAND_EVENT } from "@/lib/events";
import type { TerminalLine } from "@/components/cli/terminal-types";

const bootLines: Omit<TerminalLine, "id">[] = [
  { kind: "dim", text: "[ok] portfolio kernel initialized" },
  {
    kind: "dim",
    text: `[ok] ${projects.length} projects mounted · ${projects.filter((p) => p.pinned).length} pinned`,
  },
  { kind: "dim", text: "[ok] shell ready — type help" },
];

const zoneTargets: Record<ZoneId, string> = {
  hero: "top",
  projects: "projects",
  skills: "skills",
  services: "services",
  contact: "contact",
  game: "game",
  ai: "ai",
  data: "data",
};

function findProject(query: string): Project | undefined {
  const normalized = query.replace(/\/$/, "").toLowerCase();
  return projects.find(
    (project) =>
      project.slug === normalized ||
      project.name.toLowerCase() === normalized ||
      project.command.replace("/", "") === normalized,
  );
}

function suggestCommand(input: string): string | null {
  const value = input.toLowerCase().trim();
  if (!value) return null;
  const direct = allCommands.find(
    (command) =>
      command.name === value ||
      command.name.startsWith(value) ||
      (command.keywords ?? []).some((keyword) => keyword.startsWith(value)),
  );
  return direct?.name ?? null;
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return matrix[rows - 1][cols - 1];
}

function closestCommand(input: string): string | null {
  const value = input.toLowerCase().trim();
  if (!value) return null;
  let best: { name: string; distance: number } | null = null;
  for (const command of allCommands) {
    const distance = levenshtein(value, command.name);
    if (!best || distance < best.distance) {
      best = { name: command.name, distance };
    }
  }
  return best && best.distance <= 2 ? best.name : null;
}

export function useTerminal(options?: { boot?: boolean }) {
  const boot = options?.boot ?? true;
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [bootVisible, setBootVisible] = useState(0);
  const [showBoot, setShowBoot] = useState(boot);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(100);
  const historyRef = useRef<string[]>([]);

  const push = useCallback((items: Omit<TerminalLine, "id">[]) => {
    if (!items.length) return;
    const withIds = items.map((item) => ({
      ...item,
      id: nextId.current++,
    }));
    setLines((prev) => [...prev, ...withIds].slice(-120));
  }, []);

  useEffect(() => {
    if (!boot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
  }, [boot]);

  useEffect(() => {
    const element = outputRef.current;
    if (element) element.scrollTop = element.scrollHeight;
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

      const nextHistory = [...historyRef.current, trimmed].slice(-50);
      historyRef.current = nextHistory;
      setHistory(nextHistory);
      setHistoryIndex(-1);
      setInput("");
      playClick();

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);
      const store = usePortfolioStore.getState();
      const output: Omit<TerminalLine, "id">[] = [
        { kind: "cmd", text: trimmed },
      ];

      const setZone = (zone: ZoneId) => {
        store.setActiveZone(zone);
        document
          .getElementById(zoneTargets[zone])
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        playWhoosh();
      };

      switch (command) {
        case "help": {
          output.push({ kind: "out", text: "available commands:" });
          for (const group of commandGroups) {
            output.push({
              kind: "dim",
              text: `  [${group.label}]`,
            });
            for (const item of group.commands) {
              output.push({
                kind: "out",
                text: `  ${item.usage.padEnd(34, " ")} ${item.description}`,
              });
            }
          }
          output.push({
            kind: "dim",
            text: "tip: click a chip below, or press Ctrl/Cmd + K for the palette.",
          });
          break;
        }

        case "ls": {
          const scope = args.find((arg) => !arg.startsWith("-"))?.toLowerCase();
          let list = projects;
          if (scope === "pinned") {
            list = projects.filter((project) => project.pinned);
          } else if (
            scope &&
            scope !== "projects" &&
            scope !== "all"
          ) {
            list = projects.filter(
              (project) =>
                project.category === scope ||
                project.command.replace("/", "") === scope,
            );
          }
          output.push({ kind: "out", text: `total ${list.length}` });
          if (list.length) {
            output.push({ kind: "projects", items: list });
          } else {
            output.push({
              kind: "dim",
              text: "no entries found. try: ls projects",
            });
          }
          break;
        }

        case "open":
        case "cat": {
          const query = args.join(" ");
          const project = findProject(query);
          if (!project) {
            output.push({
              kind: "error",
              text: `open: project not found: ${query || "(none)"}`,
            });
            output.push({
              kind: "dim",
              text: "try: ls projects",
            });
            break;
          }
          store.openProject(project.slug);
          output.push({
            kind: "ok",
            text: `opening ${project.command}README.md ...`,
          });
          output.push({
            kind: "accent",
            text: `${project.name} — ${project.tagline}`,
          });
          if (project.outcome) {
            output.push({ kind: "out", text: `outcome: ${project.outcome}` });
          }
          if (project.metrics?.length) {
            output.push({
              kind: "dim",
              text: `metrics: ${project.metrics
                .map((metric) => `${metric.label} ${metric.value}`)
                .join(" · ")}`,
            });
          }
          output.push({
            kind: "dim",
            text: `stack: ${project.stack.join(" · ")}`,
          });
          if (project.live) {
            output.push({ kind: "out", text: `live: ${project.live}` });
          }
          output.push({ kind: "out", text: `repo: ${project.repo}` });
          break;
        }

        case "services": {
          store.setServicesOpen(true);
          store.setActiveZone("services");
          document
            .getElementById("services")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          playWhoosh();
          output.push({ kind: "ok", text: "opening services ..." });
          output.push({
            kind: "accent",
            text: "Basic / Standard / Premium — fixed scope, fixed outcome.",
          });
          output.push({
            kind: "dim",
            text: "land from $450 · MVP from $2,400 · AI from $4,800",
          });
          output.push({
            kind: "dim",
            text: "run `estimate` for a budget range in 3 questions.",
          });
          break;
        }

        case "estimate": {
          store.setEstimatorOpen(true);
          playClick();
          output.push({ kind: "ok", text: "launching estimator ..." });
          output.push({
            kind: "out",
            text: "3 questions: project type → timeline → integrations",
          });
          output.push({
            kind: "dim",
            text: "you will get a range + a copyable brief for Fiverr.",
          });
          break;
        }

        case "skills": {
          setZone("skills");
          output.push({ kind: "ok", text: "→ /skills — physics playground" });
          for (const group of skillGroups) {
            output.push({
              kind: "out",
              text: `${group.file}: ${group.items.join(", ")}`,
            });
          }
          break;
        }

        case "stats": {
          output.push({
            kind: "dim",
            text: "querying github.com/ARtoRiAs10 ...",
          });
          push(output);
          void fetchGithubStats().then((github) => {
            const extra: Omit<TerminalLine, "id">[] = [];
            if (github) {
              extra.push({
                kind: "ok",
                text: `github: ${github.login}${github.name ? ` (${github.name})` : ""}`,
              });
              extra.push({
                kind: "out",
                text: `public repos: ${github.publicRepos} · followers: ${github.followers}`,
              });
              if (github.location) {
                extra.push({ kind: "dim", text: `location: ${github.location}` });
              }
            } else {
              extra.push({
                kind: "dim",
                text: "github stats unavailable right now (rate limit?).",
              });
            }
            extra.push({ kind: "ok", text: "● open for select projects" });
            extra.push({
              kind: "dim",
              text: "response: < 24h · remote / worldwide",
            });
            extra.push({
              kind: "out",
              text: `portfolio: ${projects.length} projects · ${stats[1].value} pinned`,
            });
            push(extra);
          });
          return;
        }

        case "cd": {
          const rawZone = args[0]?.toLowerCase();
          const aliases: Record<string, ZoneId> = {
            home: "hero",
            "~": "hero",
            work: "projects",
            projects: "projects",
            skills: "skills",
            services: "services",
            hire: "contact",
            contact: "contact",
            game: "game",
            ai: "ai",
            data: "data",
          };
          const zone = rawZone ? aliases[rawZone] : undefined;
          if (!zone) {
            output.push({
              kind: "error",
              text: `cd: unknown zone: ${rawZone ?? "(none)"}`,
            });
            output.push({
              kind: "dim",
              text: `zones: ${zoneNames.join(", ")}`,
            });
            break;
          }
          setZone(zone);
          output.push({ kind: "ok", text: `→ /${zone}` });
          break;
        }

        case "drive": {
          store.setViewMode("3d");
          store.setActiveZone("hero");
          store.setTerminalOpen(true);
          playWhoosh();
          output.push({ kind: "ok", text: "rover control enabled" });
          output.push({
            kind: "out",
            text: "WASD / arrows drive · SPACE brake · SHIFT boost",
          });
          output.push({
            kind: "out",
            text: "L headlights · H horn · R reset · drag to orbit",
          });
          output.push({
            kind: "dim",
            text: "click a landmark to open it. Switch to FAST mode to return.",
          });
          break;
        }

        case "mode": {
          const requested = args[0]?.toLowerCase();
          let mode: ViewMode | null = null;
          if (requested === "3d" || requested === "world") mode = "3d";
          if (
            requested === "fast" ||
            requested === "minimal" ||
            requested === "2d"
          )
            mode = "fast";
          if (!mode) {
            output.push({
              kind: "error",
              text: `mode: expected fast|minimal|3d, got ${requested ?? "(none)"}`,
            });
            output.push({
              kind: "dim",
              text: "use `mode 3d` for the world or `mode fast` for the site.",
            });
            break;
          }
          store.setViewMode(mode);
          if (mode === "3d") {
            store.setTerminalOpen(true);
            playWhoosh();
            output.push({ kind: "ok", text: "→ 3D world (WebGL)" });
            output.push({
              kind: "dim",
              text: "drag to orbit · WASD to drive · click a landmark",
            });
          } else {
            output.push({ kind: "ok", text: "→ fast mode (2D site)" });
            output.push({
              kind: "dim",
              text: "60fps fallback for mobile and low-end GPUs.",
            });
          }
          break;
        }

        case "theme": {
          const requested = args[0]?.toLowerCase() as ThemeName | undefined;
          if (!requested || !themeNames.includes(requested)) {
            output.push({
              kind: "error",
              text: `theme: expected one of ${themeNames.join(", ")}`,
            });
            break;
          }
          store.setTheme(requested);
          output.push({ kind: "ok", text: `theme → ${requested}` });
          break;
        }

        case "game": {
          store.setActiveZone("game");
          useGameStore.getState().reset();
          document
            .getElementById("game")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          playWhoosh();
          output.push({ kind: "ok", text: "→ /game — ring run reset" });
          output.push({
            kind: "out",
            text: "drive through the 8 glowing rings. score updates in the HUD.",
          });
          break;
        }

        case "ai": {
          setZone("ai");
          output.push({ kind: "ok", text: "→ /ai — AI Lab" });
          output.push({
            kind: "out",
            text: "rag · agents · evals · computer vision · llm routing",
          });
          break;
        }

        case "data": {
          setZone("data");
          output.push({ kind: "ok", text: "→ /data — Data Harbor" });
          output.push({
            kind: "out",
            text: "queues · pipelines · postgres · redis · observability",
          });
          break;
        }

        case "score": {
          const game = useGameStore.getState();
          output.push({
            kind: "accent",
            text: `rings: ${game.score}/${game.total}`,
          });
          output.push({
            kind: "dim",
            text: "run `game` to reset the run and fly to Game Island.",
          });
          break;
        }

        case "contact":
        case "hire": {
          store.setActiveZone("contact");
          store.setHireOpen(true);
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          playWhoosh();
          output.push({ kind: "ok", text: "→ /contact — opening hire brief" });
          output.push({
            kind: "out",
            text: "email, Fiverr, and a 30-second project form.",
          });
          break;
        }

        case "sudo": {
          if (args[0]?.toLowerCase() === "hire-me") {
            store.celebrate();
            store.setHireOpen(true);
            store.setActiveZone("contact");
            playSuccess();
            output.push({
              kind: "ok",
              text: "permission granted: let's build something.",
            });
            output.push({
              kind: "accent",
              text: "booking brief opened. no mystery invoices.",
            });
          } else {
            output.push({
              kind: "error",
              text: "sudo: only 'hire-me' is permitted.",
            });
          }
          break;
        }

        case "palette": {
          store.setPaletteOpen(true);
          output.push({ kind: "ok", text: "opening command palette ..." });
          break;
        }

        case "about": {
          store.setActiveZone("hero");
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          playWhoosh();
          output.push({ kind: "ok", text: "→ /about" });
          output.push({
            kind: "dim",
            text: "engineer first · product thinker always · ships on time",
          });
          break;
        }

        case "work":
        case "projects": {
          setZone("projects");
          output.push({ kind: "ok", text: "→ /projects" });
          break;
        }

        case "whoami": {
          output.push({ kind: "out", text: "gaurav kumar" });
          output.push({
            kind: "dim",
            text: "full-stack & ai engineer · remote / worldwide",
          });
          break;
        }

        case "status": {
          output.push({ kind: "ok", text: "● open for select projects" });
          output.push({
            kind: "dim",
            text: "response: < 24h · timezone: remote",
          });
          break;
        }

        case "date": {
          output.push({ kind: "out", text: new Date().toString() });
          break;
        }

        case "pwd": {
          output.push({ kind: "out", text: "/home/gaurav/portfolio" });
          break;
        }

        case "echo": {
          output.push({ kind: "out", text: args.join(" ") });
          break;
        }

        case "history": {
          if (!historyRef.current.length) {
            output.push({ kind: "dim", text: "history is empty." });
            break;
          }
          for (const [index, item] of historyRef.current.entries()) {
            output.push({
              kind: "out",
              text: `  ${String(index + 1).padStart(2, "0")}  ${item}`,
            });
          }
          break;
        }

        case "neofetch": {
          output.push(
            { kind: "accent", text: "gaurav@portfolio" },
            { kind: "dim", text: "-----------------" },
            { kind: "out", text: "os: remote / worldwide" },
            { kind: "out", text: "shell: zsh" },
            { kind: "out", text: "role: full-stack & ai engineer" },
            { kind: "out", text: `projects: ${projects.length}` },
            {
              kind: "out",
              text: `pinned: ${projects.filter((p) => p.pinned).length}`,
            },
            { kind: "out", text: "status: open for select projects" },
            { kind: "out", text: "mode: 3d world + fast fallback" },
          );
          break;
        }

        case "clear": {
          setLines([]);
          setShowBoot(false);
          setBootVisible(0);
          return;
        }

        case "github": {
          window.open("https://github.com/ARtoRiAs10", "_blank", "noopener,noreferrer");
          output.push({ kind: "ok", text: "opening github.com/ARtoRiAs10 ..." });
          break;
        }

        default: {
          const suggestion =
            suggestCommand(command) ?? closestCommand(command);
          output.push({
            kind: "error",
            text: `zsh: command not found: ${command}`,
          });
          if (suggestion) {
            output.push({
              kind: "dim",
              text: `did you mean: ${suggestion}?`,
            });
          } else {
            output.push({
              kind: "dim",
              text: 'type "help" for commands, or "ls projects" to explore.',
            });
          }
        }
      }

      push(output);
    },
    [push],
  );

  const autocomplete = useCallback(() => {
    const current = input;
    const spaceIndex = current.indexOf(" ");
    let pool: string[] = [];

    if (spaceIndex === -1) {
      pool = [
        ...allCommands.map((command) => command.name),
        ...projects.map((project) => project.slug),
        ...zoneNames,
        ...themeNames,
      ];
    } else {
      const head = current.slice(0, spaceIndex).toLowerCase();
      const rest = current.slice(spaceIndex + 1);
      if (head === "open" || head === "cat") {
        pool = projects.map((project) => project.slug);
      } else if (head === "theme") {
        pool = [...themeNames];
      } else if (head === "mode") {
        pool = ["fast", "minimal", "3d"];
      } else if (head === "cd") {
        pool = [...zoneNames, "work", "home", "hire"];
      } else if (head === "ls") {
        pool = ["projects", "pinned", "ai", "fullstack", "infra", "realtime"];
      } else {
        pool = [];
      }
      const match = pool.find((candidate) => candidate.startsWith(rest));
      if (match) {
        setInput(`${head} ${match}${match === rest ? " " : ""}`);
        return;
      }
      return;
    }

    const match = pool.find(
      (candidate) =>
        candidate.startsWith(current) && candidate !== current,
    );
    if (match) {
      setInput(match.endsWith(" ") ? match : `${match} `);
    }
  }, [input]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!historyRef.current.length) return;
        const next = Math.min(historyIndex + 1, historyRef.current.length - 1);
        setHistoryIndex(next);
        setInput(historyRef.current[historyRef.current.length - 1 - next]);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex <= 0) {
          setHistoryIndex(-1);
          setInput("");
          return;
        }
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(historyRef.current[historyRef.current.length - 1 - next]);
      } else if (event.key === "Tab") {
        event.preventDefault();
        autocomplete();
      } else if (event.key.toLowerCase() === "l" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setLines([]);
        setShowBoot(false);
        setBootVisible(0);
      }
    },
    [autocomplete, historyIndex],
  );

  const submit = useCallback(() => {
    runCommand(input);
  }, [input, runCommand]);

  useEffect(() => {
    const onCommand = (event: Event) => {
      const command = (event as CustomEvent<string>).detail;
      if (typeof command === "string") runCommand(command);
    };
    window.addEventListener(COMMAND_EVENT, onCommand);
    return () => window.removeEventListener(COMMAND_EVENT, onCommand);
  }, [runCommand]);

  return {
    lines,
    input,
    setInput,
    history,
    runCommand,
    onKeyDown,
    submit,
    inputRef,
    outputRef,
    focusInput: () => inputRef.current?.focus(),
    bootVisible,
    showBoot,
    bootLines,
  };
}