export type CommandCategory = "core" | "work" | "world" | "fun";

export type CommandSpec = {
  name: string;
  usage: string;
  description: string;
  category: CommandCategory;
  keywords?: string[];
};

export const commandGroups: {
  id: CommandCategory;
  label: string;
  commands: CommandSpec[];
}[] = [
  {
    id: "core",
    label: "core",
    commands: [
      {
        name: "help",
        usage: "help",
        description: "list every command with a one-click chip",
        category: "core",
      },
      {
        name: "about",
        usage: "about",
        description: "fly to the desk and show the short bio",
        category: "core",
      },
      {
        name: "stats",
        usage: "stats",
        description: "live GitHub + availability stats",
        category: "core",
        keywords: ["github", "proof", "metrics"],
      },
      {
        name: "clear",
        usage: "clear",
        description: "clear the terminal scrollback",
        category: "core",
      },
    ],
  },
  {
    id: "work",
    label: "work",
    commands: [
      {
        name: "ls",
        usage: "ls [projects|pinned|ai|fullstack|infra|realtime]",
        description: "list case studies by domain",
        category: "work",
      },
      {
        name: "open",
        usage: "open <slug>",
        description: "open a case study: problem, build, outcome",
        category: "work",
        keywords: ["cat", "readme", "project"],
      },
      {
        name: "services",
        usage: "services",
        description: "show the three freelance packages",
        category: "work",
        keywords: ["pricing", "packages", "tiers"],
      },
      {
        name: "estimate",
        usage: "estimate",
        description: "answer 3 questions for a budget range",
        category: "work",
        keywords: ["quote", "price", "budget", "brief"],
      },
      {
        name: "skills",
        usage: "skills",
        description: "fly to the physics skill playground",
        category: "work",
        keywords: ["stack", "tech"],
      },
    ],
  },
  {
    id: "world",
    label: "world",
    commands: [
      {
        name: "cd",
        usage: "cd <hero|projects|skills|services|contact>",
        description: "move the camera to a world zone",
        category: "world",
      },
      {
        name: "drive",
        usage: "drive",
        description: "take the rover controls (WASD / arrows)",
        category: "world",
        keywords: ["rover", "wasd", "play"],
      },
      {
        name: "mode",
        usage: "mode <fast|minimal|3d>",
        description: "switch between the 2D site and the 3D world",
        category: "world",
        keywords: ["performance", "toggle", "webgl"],
      },
      {
        name: "theme",
        usage: "theme <matrix|mocha|cyber|minimal>",
        description: "change the terminal palette",
        category: "world",
        keywords: ["color", "palette", "dark", "light"],
      },
      {
        name: "contact",
        usage: "contact",
        description: "open the hire brief and booking links",
        category: "world",
        keywords: ["hire", "email", "fiverr", "calendly"],
      },
      {
        name: "sudo",
        usage: "sudo hire-me",
        description: "the only permitted sudo command",
        category: "fun",
        keywords: ["easter egg", "confetti"],
      },
      {
        name: "palette",
        usage: "palette",
        description: "open the command palette (Ctrl/Cmd + K)",
        category: "world",
        keywords: ["search", "jump", "command"],
      },
    ],
  },
  {
    id: "fun",
    label: "fun",
    commands: [
      {
        name: "whoami",
        usage: "whoami",
        description: "the short version of who is typing",
        category: "fun",
      },
      {
        name: "neofetch",
        usage: "neofetch",
        description: "system information, portfolio edition",
        category: "fun",
      },
      {
        name: "history",
        usage: "history",
        description: "show the commands you have run",
        category: "fun",
      },
      {
        name: "date",
        usage: "date",
        description: "current local time",
        category: "fun",
      },
      {
        name: "pwd",
        usage: "pwd",
        description: "print the working directory",
        category: "fun",
      },
    ],
  },
];

export const allCommands = commandGroups.flatMap((group) => group.commands);

export const commandMap = new Map(
  allCommands.map((command) => [command.name, command]),
);

export const quickCommands = [
  "help",
  "ls projects",
  "services",
  "estimate",
  "stats",
  "hire",
];

export const themeNames = ["matrix", "mocha", "cyber", "minimal"] as const;

export const zoneNames = [
  "hero",
  "projects",
  "skills",
  "services",
  "contact",
] as const;