"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor, Text } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { World } from "@/components/three/World";
import { RoverController } from "@/components/three/RoverController";
import { SkillBlocks } from "@/components/three/SkillBlocks";
import { CameraRig } from "@/components/three/CameraRig";

export function WorldCanvas({ resetKey = 0 }: { resetKey?: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      performance={{ min: 0.6 }}
      camera={{ position: [0, 9.5, 16], fov: 45, near: 0.1, far: 220 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#071722");
      }}
    >
      <Suspense
        fallback={
          <Text
            font="/fonts/JetBrainsMono-Regular.ttf"
            position={[0, 3, 0]}
            fontSize={0.4}
            color="#7cffb2"
            anchorX="center"
            anchorY="middle"
          >
            LOADING WORLD...
          </Text>
        }
      >
        <Physics gravity={[0, -9.81, 0]}>
          <World />
          <SkillBlocks key={resetKey} />
          <RoverController />
        </Physics>
        <CameraRig />
        <AdaptiveDpr pixelated />
        <PerformanceMonitor
          ms={300}
          iterations={6}
          threshold={0.75}
          flipflops={3}
        />
      </Suspense>
    </Canvas>
  );
}