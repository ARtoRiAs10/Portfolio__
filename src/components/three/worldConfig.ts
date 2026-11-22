export type Vec3 = [number, number, number];

export const ISLANDS = {
  main: { position: [0, 0, 0] as Vec3, radius: 12 },
  game: { position: [28, 0, -4] as Vec3, radius: 9 },
  ai: { position: [-28, 0, -2] as Vec3, radius: 8 },
  data: { position: [0, 0, -30] as Vec3, radius: 9 },
} as const;

export const MAIN_ZONES = {
  hero: [0, 0, 0] as Vec3,
  projects: [-8, 0, -3] as Vec3,
  skills: [8, 0, -3] as Vec3,
  services: [0, 0, -10] as Vec3,
  contact: [0, 0, 8] as Vec3,
} as const;

export const BRIDGES = {
  game: { from: [11.5, 0, -2] as Vec3, to: [19.5, 0, -4] as Vec3, width: 2.6 },
  ai: { from: [-11.5, 0, -1] as Vec3, to: [-20.5, 0, -2] as Vec3, width: 2.6 },
  data: { from: [0, 0, -11.5] as Vec3, to: [0, 0, -21.5] as Vec3, width: 2.6 },
} as const;

export const WORLD_LABEL = {
  main: "TECH ISLAND",
  game: "GAME ISLAND",
  ai: "AI LAB",
  data: "DATA HARBOR",
} as const;