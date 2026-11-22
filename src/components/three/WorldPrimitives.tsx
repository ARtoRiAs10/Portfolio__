"use client";

import { useMemo, type ReactNode } from "react";
import { Billboard, Text } from "@react-three/drei";

export type Vec3 = [number, number, number];

export function WorldLabel({
  position,
  children,
  color = "#7cffb2",
  size = 0.32,
}: {
  position: Vec3;
  children: string;
  color?: string;
  size?: number;
}) {
  return (
    <Billboard position={position}>
      <Text
        font="/fonts/JetBrainsMono-Regular.ttf"
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#050806"
      >
        {children}
      </Text>
    </Billboard>
  );
}

export function Island({
  position,
  radius,
  top,
  topAlt,
  rock,
  sand,
  segments = 24,
  children,
}: {
  position: Vec3;
  radius: number;
  top: string;
  topAlt: string;
  rock: string;
  sand: string;
  segments?: number;
  children?: ReactNode;
}) {
  const rocks = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const angle = (index / 7) * Math.PI * 2 + 0.3;
        return {
          position: [
            Math.cos(angle) * radius * 0.92,
            -0.9 - (index % 3) * 0.12,
            Math.sin(angle) * radius * 0.92,
          ] as Vec3,
          scale: 0.45 + (index % 4) * 0.12,
          rotation: [index * 0.6, index * 0.9, index * 0.3] as Vec3,
        };
      }),
    [radius],
  );

  return (
    <group position={position}>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[radius * 0.8, radius, 1.7, segments]} />
        <meshStandardMaterial color={rock} flatShading roughness={0.95} />
      </mesh>

      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry
          args={[radius * 0.99, radius * 0.93, 0.32, segments]}
        />
        <meshStandardMaterial color={sand} flatShading roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry
          args={[radius * 0.96, radius * 0.96, 0.24, segments]}
        />
        <meshStandardMaterial color={top} flatShading roughness={0.85} />
      </mesh>

      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry
          args={[radius * 0.78, radius * 0.78, 0.04, segments]}
        />
        <meshStandardMaterial color={topAlt} flatShading roughness={0.8} />
      </mesh>

      {rocks.map((item, index) => (
        <mesh
          key={index}
          position={item.position}
          scale={item.scale}
          rotation={item.rotation}
        >
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color={rock} flatShading roughness={0.95} />
        </mesh>
      ))}

      {children}
    </group>
  );
}

export function Path({
  from,
  to,
  width = 1.15,
  color = "#2a3f30",
}: {
  from: Vec3;
  to: Vec3;
  width?: number;
  color?: string;
}) {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  return (
    <mesh
      position={[(from[0] + to[0]) / 2, 0.27, (from[2] + to[2]) / 2]}
      rotation={[0, angle, 0]}
    >
      <boxGeometry args={[width, 0.06, length]} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  );
}

export function ZonePad({
  position,
  color,
  radius = 2.4,
}: {
  position: Vec3;
  color: string;
  radius?: number;
}) {
  return (
    <group position={[position[0], 0.28, position[2]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius, radius + 0.35, 40]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          transparent
          opacity={0.7}
          side={2}
        />
      </mesh>
      <pointLight
        position={[0, 0.5, 0]}
        color={color}
        intensity={0.8}
        distance={6}
      />
    </group>
  );
}

export function Tree({
  position,
  scale = 1,
  color = "#2f7d4a",
}: {
  position: Vec3;
  scale?: number;
  color?: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 1.1, 6]} />
        <meshStandardMaterial color="#3a2818" flatShading />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <coneGeometry args={[0.75, 1.6, 7]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 2.05, 0]}>
        <coneGeometry args={[0.55, 1.25, 7]} />
        <meshStandardMaterial color="#3f9a5a" flatShading />
      </mesh>
    </group>
  );
}

export function Rock({
  position,
  scale = 1,
  color = "#4b5563",
}: {
  position: Vec3;
  scale?: number;
  color?: string;
}) {
  return (
    <mesh position={position} scale={scale} rotation={[0.4, 0.8, 0.2]}>
      <dodecahedronGeometry args={[0.55, 0]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

export function Cloud({
  position,
  scale = 1,
  opacity = 0.16,
}: {
  position: Vec3;
  scale?: number;
  opacity?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {[
        [0, 0, 0, 1],
        [1.2, 0.2, 0.1, 0.7],
        [-1.1, 0.1, -0.1, 0.6],
        [0.4, 0.4, -0.2, 0.55],
      ].map(([x, y, z, s], index) => (
        <mesh key={index} position={[x, y, z]} scale={s}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial
            color="#e8f6ec"
            transparent
            opacity={opacity}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Bridge({
  from,
  to,
  width = 2.4,
  color = "#2a3f30",
}: {
  from: Vec3;
  to: Vec3;
  width?: number;
  color?: string;
}) {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  const midX = (from[0] + to[0]) / 2;
  const midZ = (from[2] + to[2]) / 2;
  const posts = Math.max(2, Math.round(length / 2.4));

  return (
    <group>
      <mesh position={[midX, 0.2, midZ]} rotation={[0, angle, 0]}>
        <boxGeometry args={[width, 0.18, length]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            midX + Math.cos(angle) * (width / 2) * side,
            0.55,
            midZ - Math.sin(angle) * (width / 2) * side,
          ]}
          rotation={[0, angle, 0]}
        >
          <boxGeometry args={[0.08, 0.5, length]} />
          <meshStandardMaterial color="#1c2a20" roughness={0.7} />
        </mesh>
      ))}

      {Array.from({ length: posts + 1 }, (_, index) => {
        const t = index / posts;
        const x = from[0] + dx * t;
        const z = from[2] + dz * t;
        return (
          <mesh key={index} position={[x, 0.55, z]}>
            <cylinderGeometry args={[0.06, 0.06, 0.8, 6]} />
            <meshStandardMaterial color="#1c2a20" roughness={0.7} />
          </mesh>
        );
      })}

      {[0.33, 0.66].map((t) => {
        const x = from[0] + dx * t;
        const z = from[2] + dz * t;
        return (
          <mesh key={t} position={[x, -0.55, z]}>
            <cylinderGeometry args={[0.18, 0.24, 1.4, 8]} />
            <meshStandardMaterial color="#1c130d" roughness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}