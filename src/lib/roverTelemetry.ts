export type RoverTelemetry = {
  position: { x: number; y: number; z: number };
  speed: number;
  braking: boolean;
  headlights: boolean;
  boosting: boolean;
};

export const roverTelemetry: RoverTelemetry = {
  position: { x: 0, y: 1, z: 4 },
  speed: 0,
  braking: false,
  headlights: false,
  boosting: false,
};