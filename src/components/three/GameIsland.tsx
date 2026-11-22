"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useGameStore } from "@/store/useGameStore";
import { roverTelemetry } from "@/lib/roverTelemetry";
import {
  ISLANDS,
  WORLD_LABEL,
  type Vec3,
} from "@/components/three/worldConfig";
import {
  Island,
  Rock,
  Tree,
  WorldLabel,
} from "@/components/three/WorldPrimitives";

type Ring = {
  id: string;
  local: Vec3;
  world: Vec3;
  color: string;
  rotation: number;
};

const ringColors = [
  "#67e8f9",
  "#ffc857",
  "#ff8fa3",
  "#a78bfa",
  "#7cffb2",
  "#67e8f9",
  "#ffc857",
  "#ff8fa3",
];

export function GameIsland() {
  const collected = useGameStore((state) => state.collected);
  const collect = useGameStore((state) => state.collect);
  const score = useGameStore((state) => state.score);
  const total = useGameStore((state) => state.total);

  const rings = useMemo<Ring[]>(() => {
    const positions: [number, number][] = [
      [-4.5, 2.5],
      [0, 4],
      [4.5, 2.5],
      [4.5, -2.5],
      [0, -4],
      [-4.5, -2.5],
      [-2.2, 0],
      [2.2, 0],
    ];
    return positions.map(([x, z], index) => {
      const local: Vec3 = [x, 1.5, z];
      return {
        id: `ring-${index + 1}`,
        local,
        world: [
          ISLANDS.game.position[0] + x,
          ISLANDS.game.position[1] + 1.5,
          ISLANDS.game.position[2] + z,
        ],
        color: ringColors[index % ringColors.length],
        rotation: Math.atan2(x, z),
      };
    });
  }, []);

  useFrame(() => {
    const position = roverTelemetry.position;
    for (const ring of rings) {
      if (collected.includes(ring.id)) continue;
      const dx = position.x - ring.world[0];
      const dy = position.y - ring.world[1];
      const dz = position.z - ring.world[2];
      if (dx * dx + dy * dy + dz * dz < 6.25) {
        collect(ring.id);
      }
    }
  });

  return (
    <Island
      position={ISLANDS.game.position}
      radius={ISLANDS.game.radius}
      top="#2f6d4a"
      topAlt="#3f9a5a"
      rock="#3a2818"
      sand="#d6b36a"
    >
      <WorldLabel position={[0, 5.2, 0]} color="#67e8f9" size={0.34}>
        {WORLD_LABEL.game}
      </WorldLabel>
      <WorldLabel position={[0, 4.4, 0]} color="#ffc857" size={0.24}>
        {`RINGS ${score}/${total}`}
      </WorldLabel>

      {rings.map((ring) => {
        const isCollected = collected.includes(ring.id);
        return (
          <mesh
            key={ring.id}
            position={ring.local}
            rotation={[0, ring.rotation, 0]}
          >
            <torusGeometry args={[1.15, 0.12, 8, 24]} />
            <meshStandardMaterial
              color={ring.color}
              emissive={ring.color}
              emissiveIntensity={isCollected ? 0.08 : 1.25}
              transparent
              opacity={isCollected ? 0.18 : 0.95}
              roughness={0.3}
            />
          </mesh>
        );
      })}

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 2.6, 0]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#ffc857"
            emissive="#ffc857"
            emissiveIntensity={1.2}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Sparkles
        count={32}
        scale={[12, 5, 12]}
        size={2}
        speed={0.25}
        color="#67e8f9"
        position={[0, 2.5, 0]}
      />

      <pointLight position={[0, 3, 0]} color="#67e8f9" intensity={2} distance={12} />

      {[
        [-3.5, 0.9, 3.2, "#ff8fa3"],
        [3.2, 0.9, 3.4, "#a78bfa"],
        [-3.4, 0.9, -3.2, "#7cffb2"],
        [3.4, 0.9, -3.4, "#ffc857"],
      ].map(([x, y, z, color], index) => (
        <mesh key={index} position={[x as number, y as number, z as number]} rotation={[0, index * 0.4, 0]}>
          <boxGeometry args={[1.1, 1.1, 1.1]} />
          <meshStandardMaterial color={color as string} roughness={0.5} flatShading />
        </mesh>
      ))}

      <Tree position={[-6, 0.28, 4.6]} scale={0.7} color="#348a52" />
      <Tree position={[6, 0.28, 4.4]} scale={0.6} color="#2f7d4a" />
      <Tree position={[5.8, 0.28, -5]} scale={0.55} color="#348a52" />
      <Rock position={[-6.2, 0.4, -4.6]} scale={0.6} />
      <Rock position={[6.4, 0.4, -1.2]} scale={0.45} />
    </Island>
  );
}