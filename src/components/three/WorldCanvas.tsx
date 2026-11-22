"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor, Text } from "@react-three/drei";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { WorldIsland } from "@/components/three/WorldIsland";
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
        gl.setClearColor("#050806");
      }}
    >
      <color attach="background" args={["#050806"]} />
      <fog attach="fog" args={["#050806", 20, 58]} />

      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#b8ffd6", "#0a1a10", 0.9]} />
      <directionalLight
        position={[8, 16, 8]}
        intensity={1.55}
        color="#fff2d0"
      />
      <directionalLight
        position={[-10, 8, -6]}
        intensity={0.35}
        color="#67e8f9"
      />

      <Suspense
        fallback={
          <Text
        font="/fonts/JetBrainsMono-Regular.ttf"
            position={[0, 2, 0]}
            fontSize={0.4}
            color="#7cffb2"
            anchorX="center"
            anchorY="middle"
          >
            LOADING WORLD...
          </Text>
        }
      >
        <WorldIsland />
        <Physics gravity={[0, -9.81, 0]}>
          <RigidBody type="fixed" colliders={false}>
            <CuboidCollider args={[12, 0.5, 12]} position={[0, -0.5, 0]} />
          </RigidBody>
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