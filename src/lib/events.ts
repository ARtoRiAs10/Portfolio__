export const COMMAND_EVENT = "portfolio:command";
export const OPEN_PROJECT_EVENT = "portfolio:open-project";

export function emitCommand(command: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COMMAND_EVENT, { detail: command }));
}

export function emitOpenProject(slug: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: slug }));
}