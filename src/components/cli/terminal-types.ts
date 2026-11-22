import type { Project } from "@/lib/data";

export type LineKind =
  | "cmd"
  | "out"
  | "ok"
  | "dim"
  | "accent"
  | "error"
  | "projects";

export type TerminalLine = {
  id: number;
  kind: LineKind;
  text?: string;
  items?: Project[];
};