"use client";

import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";
import type CameraControlsImpl from "camera-controls";
import {
  usePortfolioStore,
  type ZoneId,
} from "@/store/usePortfolioStore";

const presets: Record<
  ZoneId,
  { position: [number, number, number]; target: [number, number, number] }
> = {
  hero: { position: [0, 9.5, 16], target: [0, 1.2, 0] },
  projects: { position: [-8, 7.5, 9], target: [-8, 1.6, -3] },
  skills: { position: [8, 7.5, 9], target: [8, 1.6, -3] },
  services: { position: [0, 7.5, 1], target: [0, 1.6, -10] },
  contact: { position: [0, 6.5, 19], target: [0, 1.6, 8] },
  game: { position: [28, 8, 10], target: [28, 1.6, -4] },
  ai: { position: [-28, 8, 10], target: [-28, 1.6, -2] },
  data: { position: [0, 8, -16], target: [0, 1.6, -30] },
};

export function CameraRig() {
  const controls = useRef<CameraControlsImpl>(null);
  const activeZone = usePortfolioStore((state) => state.activeZone);

  useEffect(() => {
    const preset = presets[activeZone];
    void controls.current?.setLookAt(
      preset.position[0],
      preset.position[1],
      preset.position[2],
      preset.target[0],
      preset.target[1],
      preset.target[2],
      true,
    );
  }, [activeZone]);

  return (
    <CameraControls
      ref={controls}
      makeDefault
      minDistance={4}
      maxDistance={34}
      minPolarAngle={0.15}
      maxPolarAngle={Math.PI / 2.05}
      smoothTime={0.35}
      draggingSmoothTime={0.12}
    />
  );
}