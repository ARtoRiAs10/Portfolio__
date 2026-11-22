"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { allCommands } from "@/data/commands";
import { projects } from "@/lib/data";
import { emitCommand } from "@/lib/events";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  label: string;
  description: string;
  command: string;
  group: string;
};

const quickActions: PaletteItem[] = [
  {
    id: "quick-projects",
    label: "ls projects",
    description: "list every case study",
    command: "ls projects",
    group: "jump",
  },
  {
    id: "quick-services",
    label: "services",
    description: "basic / standard / premium",
    command: "services",
    group: "jump",
  },
  {
    id: "quick-estimate",
    label: "estimate",
    description: "3 questions, one budget range",
    command: "estimate",
    group: "jump",
  },
  {
    id: "quick-stats",
    label: "stats",
    description: "live GitHub + availability",
    command: "stats",
    group: "jump",
  },
  {
    id: "quick-drive",
    label: "drive",
    description: "enter the 3D world and take the rover",
    command: "drive",
    group: "world",
  },
  {
    id: "quick-fast",
    label: "mode fast",
    description: "the 60fps 2D site",
    command: "mode fast",
    group: "world",
  },
  {
    id: "quick-3d",
    label: "mode 3d",
    description: "the WebGL world",
    command: "mode 3d",
    group: "world",
  },
];

export function CommandPalette() {
  const open = usePortfolioStore((state) => state.paletteOpen);
  const setOpen = usePortfolioStore((state) => state.setPaletteOpen);
  const [query, setQuery] = useState("");

  const items = useMemo<PaletteItem[]>(() => {
    const commandItems: PaletteItem[] = allCommands.map((command) => ({
      id: `cmd-${command.name}`,
      label: command.name,
      description: command.description,
      command: command.usage.includes("<") ? command.name : command.usage,
      group: command.category,
    }));
    const projectItems: PaletteItem[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: `open ${project.slug}`,
      description: project.tagline,
      command: `open ${project.slug}`,
      group: "projects",
    }));
    const themeItems: PaletteItem[] = [
      { id: "theme-matrix", label: "theme matrix", description: "terminal green", command: "theme matrix", group: "themes" },
      { id: "theme-mocha", label: "theme mocha", description: "warm coffee", command: "theme mocha", group: "themes" },
      { id: "theme-cyber", label: "theme cyber", description: "neon cyan", command: "theme cyber", group: "themes" },
      { id: "theme-minimal", label: "theme minimal", description: "paper light", command: "theme minimal", group: "themes" },
    ];
    return [
      ...quickActions,
      ...commandItems,
      ...themeItems,
      ...projectItems,
    ];
  }, []);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return items.slice(0, 24);
    return items
      .filter(
        (item) =>
          item.label.toLowerCase().includes(value) ||
          item.description.toLowerCase().includes(value) ||
          item.group.toLowerCase().includes(value),
      )
      .slice(0, 24);
  }, [items, query]);

  const run = (command: string) => {
    setOpen(false);
    setQuery("");
    emitCommand(command);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-1rem)] max-w-xl gap-0 overflow-hidden rounded-sm border-border bg-card p-0"
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Jump to a section, toggle a theme, or run a command.
        </DialogDescription>

        <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
          <Search className="size-3.5 text-term-dim" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && filtered[0]) {
                event.preventDefault();
                run(filtered[0].command);
              }
            }}
            placeholder="jump to a command, project, or theme..."
            className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-term-dim"
            aria-label="Command palette search"
          />
          <kbd className="border border-border px-1.5 py-0.5 text-[8px] text-term-dim">
            esc
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-1.5">
          {filtered.length ? (
            filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => run(item.command)}
                className={cn(
                  "group flex w-full items-start gap-3 border border-transparent px-2.5 py-2 text-left transition-colors",
                  "hover:border-border hover:bg-term-green/5",
                )}
              >
                <span className="mt-0.5 w-16 shrink-0 text-[8px] tracking-[0.14em] text-term-dim uppercase">
                  {item.group}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] text-foreground group-hover:text-term-green">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[9px] text-term-dim">
                    {item.description}
                  </span>
                </span>
                <span className="mt-0.5 text-[9px] text-term-dim group-hover:text-term-green">
                  ↵
                </span>
              </button>
            ))
          ) : (
            <div className="px-3 py-8 text-center text-[11px] text-term-dim">
              no matching command.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[8px] text-term-dim">
          <span>↑↓ not needed · enter runs the first match</span>
          <span>ctrl / cmd + k</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}