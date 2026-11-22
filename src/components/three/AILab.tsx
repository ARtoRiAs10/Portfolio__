"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, useCursor } from "@react-three/drei";
import type { Group } from "three";
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

export function AILab() {
  const [hovered, setHovered] = useState(false);
  const core = useRef<Group>(null);
  const rings = useRef<Group>(null);
  useCursor(hovered);
  const setActiveZone = usePortfolioStore((state) => state.setActiveZone);

  useFrame((_, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.35;
      core.current.rotation.x += delta * 0.12;
    }
    if (rings.current) {
      rings.current.rotation.y -= delta * 0.55;
      rings.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <Island
      position={ISLANDS.ai.position}
      radius={ISLANDS.ai.radius}
      top="#1b3a3a"
      topAlt="#245252"
      rock="#2a1b10"
      sand="#6f7f74"
    >
      <WorldLabel position={[0, 5.4, 0]} color="#67e8f9" size={0.34}>
        {WORLD_LABEL.ai}
      </WorldLabel>
      <WorldLabel position={[0, 4.7, 0]} color="#7cffb2" size={0.22}>
        RAG · AGENTS · CV
      </WorldLabel>

      <group
        position={[0, 2.1, 0]}
        onClick={(event) => {
          event.stopPropagation();
          setActiveZone("ai");
          emitCommand("ai");
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <group ref={core}>
          <mesh>
            <icosahedronGeometry args={[1.15, 1]} />
            <meshStandardMaterial
              color="#67e8f9"
              emissive="#67e8f9"
              emissiveIntensity={hovered ? 1.6 : 0.9}
              wireframe
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.72, 20, 20]} />
            <meshStandardMaterial
              color="#0b1510"
              emissive="#7cffb2"
              emissiveIntensity={0.35}
              roughness={0.2}
            />
          </mesh>
        </group>
        <group ref={rings}>
          {[0, 1, 2].map((index) => (
            <mesh
              key={index}
              rotation={[
                Math.PI / 2 + index * 0.5,
                index * 0.8,
                index * 0.3,
              ]}
            >
              <torusGeometry args={[1.7 + index * 0.35, 0.025, 6, 48]} />
              <meshStandardMaterial
                color={index === 1 ? "#ffc857" : "#67e8f9"}
                emissive={index === 1 ? "#ffc857" : "#67e8f9"}
                emissiveIntensity={1.4}
              />
            </mesh>
          ))}
        </group>
      </group>

      <pointLight position={[0, 2.4, 0]} color="#67e8f9" intensity={3} distance={14} />

      {[
        [-4.2, 0, 1.8, 0.3],
        [4.2, 0, 1.8, -0.3],
        [-4.2, 0, -2.2, 0.5],
        [4.2, 0, -2.2, -0.5],
      ].map(([x, , z, rotation], index) => (
        <group key={index} position={[x, 0.28, z]} rotation={[0, rotation, 0]}>
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[1.2, 2.2, 0.8]} />
            <meshStandardMaterial color="#0b1510" roughness={0.5} />
          </mesh>
          {[0.4, 0.9, 1.4, 1.9].map((y, row) => (
            <mesh key={row} position={[0, y, 0.42]}>
              <boxGeometry args={[0.9, 0.06, 0.02]} />
              <meshStandardMaterial
                color={row % 2 === 0 ? "#67e8f9" : "#7cffb2"}
                emissive={row % 2 === 0 ? "#67e8f9" : "#7cffb2"}
                emissiveIntensity={1.2}
              />
            </mesh>
          ))}
        </group>
      ))}

      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[0, 4.1, 0]}>
          <boxGeometry args={[0.55, 0.55, 0.55]} />
          <meshStandardMaterial
            color="#ffc857"
            emissive="#ffc857"
            emissiveIntensity={0.9}
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Sparkles
        count={40}
        scale={[11, 6, 11]}
        size={2}
        speed={0.3}
        color="#67e8f9"
        position={[0, 2.8, 0]}
      />

      <Tree position={[-5.6, 0.28, 4.2]} scale={0.65} color="#245252" />
      <Tree position={[5.6, 0.28, 4]} scale={0.55} color="#2f7d4a" />
      <Rock position={[5.8, 0.4, -4.6]} scale={0.55} />
      <Rock position={[-5.4, 0.4, -4.8]} scale={0.4} />
    </Island>
  );
}