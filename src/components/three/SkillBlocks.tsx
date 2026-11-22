"use client";

import { useMemo, useState } from "react";
import { Billboard, Edges, Text, useCursor } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { emitCommand } from "@/lib/events";
import { usePortfolioStore } from "@/store/usePortfolioStore";

type Block = {
  label: string;
  color: string;
  position: [number, number, number];
};

const labels = [
  "Next.js",
  "TypeScript",
  "AI",
  "Backend",
  "Cloud",
  "Realtime",
  "Data",
  "Design",
];

const colors = [
  "#7cffb2",
  "#67e8f9",
  "#ffc857",
  "#ff8fa3",
  "#a78bfa",
  "#7cffb2",
  "#67e8f9",
  "#ffc857",
];

export function SkillBlocks() {
  const setActiveZone = usePortfolioStore((state) => state.setActiveZone);
  const blocks = useMemo<Block[]>(() => {
    const spacing = 1.45;
    return labels.map((label, index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);
      return {
        label,
        color: colors[index],
        position: [
          8 + (col - 1.5) * spacing,
          0.95,
          -3 + (row - 0.5) * spacing,
        ],
      };
    });
  }, []);

  return (
    <group>
      {blocks.map((block) => (
        <BlockBody
          key={block.label}
          block={block}
          onOpen={() => {
            setActiveZone("skills");
            emitCommand("skills");
          }}
        />
      ))}
      <Billboard position={[8, 3.1, -3]}>
        <Text
        font="/fonts/JetBrainsMono-Regular.ttf"
          fontSize={0.32}
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#050806"
        >
          SKILLS / KNOCK ME
        </Text>
      </Billboard>
    </group>
  );
}

function BlockBody({ block, onOpen }: { block: Block; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <RigidBody
      colliders="cuboid"
      position={block.position}
      mass={1}
      restitution={0.3}
      friction={0.85}
      angularDamping={0.6}
      linearDamping={0.4}
    >
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshStandardMaterial
          color={block.color}
          emissive={block.color}
          emissiveIntensity={hovered ? 0.55 : 0.18}
          roughness={0.45}
          metalness={0.15}
        />
        <Edges color="#08110b" />
      </mesh>
    </RigidBody>
  );
}