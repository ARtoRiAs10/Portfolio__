"use client";

import { useState } from "react";
import { Float, useCursor } from "@react-three/drei";
import { emitCommand } from "@/lib/events";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import {
  ISLANDS,
  WORLD_LABEL,
} from "@/components/three/worldConfig";
import {
  Island,
  Rock,
  Tree,
  WorldLabel,
} from "@/components/three/WorldPrimitives";

const containerColors = ["#ff8fa3", "#67e8f9", "#ffc857", "#7cffb2", "#a78bfa"];

export function DataHarbor() {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const setActiveZone = usePortfolioStore((state) => state.setActiveZone);

  const containers = [
    [-4.4, 0.9, 1.6, 0],
    [-2.9, 0.9, 1.6, 0],
    [-4.4, 2.7, 1.6, 0],
    [3.2, 0.9, -1.2, 0.2],
    [4.7, 0.9, -1.2, 0.2],
    [3.9, 2.7, -1.2, 0.2],
    [-1.2, 0.9, -3.6, -0.3],
    [1.2, 0.9, -3.6, -0.3],
  ] as [number, number, number, number][];

  return (
    <Island
      position={ISLANDS.data.position}
      radius={ISLANDS.data.radius}
      top="#2b3d2f"
      topAlt="#3b5a43"
      rock="#1c130d"
      sand="#4b5563"
    >
      <WorldLabel position={[0, 5.6, 0]} color="#67e8f9" size={0.34}>
        {WORLD_LABEL.data}
      </WorldLabel>
      <WorldLabel position={[0, 4.9, 0]} color="#7cffb2" size={0.22}>
        DATA · QUEUES · INFRA
      </WorldLabel>

      {containers.map(([x, y, z, rotation], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          rotation={[0, rotation, 0]}
        >
          <boxGeometry args={[1.35, 1.1, 0.9]} />
          <meshStandardMaterial
            color={containerColors[index % containerColors.length]}
            roughness={0.55}
            metalness={0.15}
          />
        </mesh>
      ))}

      <group
        position={[0, 0, 1.5]}
        onClick={(event) => {
          event.stopPropagation();
          setActiveZone("data");
          emitCommand("stats");
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[2.4, 3.2, 1.4]} />
          <meshStandardMaterial color="#0b1510" roughness={0.4} />
        </mesh>
        {[0.5, 1.1, 1.7, 2.3, 2.9].map((y, index) => (
          <mesh key={index} position={[0, y, 0.72]}>
            <boxGeometry args={[1.9, 0.08, 0.02]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? "#67e8f9" : "#7cffb2"}
              emissive={index % 2 === 0 ? "#67e8f9" : "#7cffb2"}
              emissiveIntensity={hovered ? 2 : 1.1}
            />
          </mesh>
        ))}
        <WorldLabel position={[0, 3.9, 0]} color="#67e8f9" size={0.26}>
          STATS / PROOF
        </WorldLabel>
      </group>

      <group position={[-5.6, 0.28, -2.8]}>
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[0.18, 4.4, 0.18]} />
          <meshStandardMaterial color="#ffc857" roughness={0.5} />
        </mesh>
        <mesh position={[1.3, 4.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.16, 2.8, 0.16]} />
          <meshStandardMaterial color="#ffc857" roughness={0.5} />
        </mesh>
        <mesh position={[2.5, 3.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 6]} />
          <meshStandardMaterial color="#d9e6dc" />
        </mesh>
      </group>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.7}>
        <mesh position={[4.4, 4.2, 1.8]}>
          <sphereGeometry args={[0.7, 12, 12]} />
          <meshStandardMaterial
            color="#d9e6dc"
            emissive="#67e8f9"
            emissiveIntensity={0.35}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
      </Float>

      <pointLight position={[0, 2.5, 1.5]} color="#67e8f9" intensity={2.4} distance={12} />

      <Tree position={[6.2, 0.28, 4.4]} scale={0.6} color="#2f7d4a" />
      <Tree position={[-6.4, 0.28, 4.6]} scale={0.55} color="#348a52" />
      <Rock position={[6.8, 0.4, -4.8]} scale={0.5} />
      <Rock position={[-6.6, 0.4, -5]} scale={0.45} />
    </Island>
  );
}