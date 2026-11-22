"use client";

import { useMemo, useState } from "react";
import { Billboard, Text, useCursor } from "@react-three/drei";
import { projects } from "@/lib/data";
import { emitCommand } from "@/lib/events";
import { usePortfolioStore } from "@/store/usePortfolioStore";

type Vec3 = [number, number, number];

const zoneCenters: Record<string, Vec3> = {
  hero: [0, 0, 0],
  projects: [-8, 0, -3],
  skills: [8, 0, -3],
  services: [0, 0, -10],
  contact: [0, 0, 8],
};

export function WorldIsland() {
  const openProject = usePortfolioStore((state) => state.openProject);
  const setActiveZone = usePortfolioStore((state) => state.setActiveZone);

  const featured = useMemo(
    () =>
      projects
        .filter((project) => project.featured || project.pinned)
        .slice(0, 3),
    [],
  );

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.58, 0]}>
        <circleGeometry args={[46, 64]} />
        <meshStandardMaterial
          color="#062a2f"
          roughness={0.22}
          metalness={0.35}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[12, 10.2, 1.4, 9]} />
        <meshStandardMaterial color="#3a2818" flatShading />
      </mesh>

      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[11.8, 11.8, 0.24, 9]} />
        <meshStandardMaterial color="#1f5a35" flatShading />
      </mesh>

      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[2.6, 2.8, 0.12, 12]} />
        <meshStandardMaterial color="#2b6b43" flatShading />
      </mesh>

      <Path from={[0, 0, 0]} to={[-8, 0, -3]} />
      <Path from={[0, 0, 0]} to={[8, 0, -3]} />
      <Path from={[0, 0, 0]} to={[0, 0, -10]} />
      <Path from={[0, 0, 0]} to={[0, 0, 8]} />

      <ZonePad position={zoneCenters.projects} color="#7cffb2" />
      <ZonePad position={zoneCenters.skills} color="#67e8f9" />
      <ZonePad position={zoneCenters.services} color="#ffc857" />
      <ZonePad position={zoneCenters.contact} color="#ff8fa3" />

      <HeroDesk />

      {featured.map((project, index) => (
        <ProjectMonitor
          key={project.slug}
          project={project}
          index={index}
          onOpen={() => {
            setActiveZone("projects");
            openProject(project.slug);
          }}
        />
      ))}

      <ServiceKiosk
        onOpen={() => {
          setActiveZone("services");
          emitCommand("services");
        }}
      />

      <HireBeacon
        onOpen={() => {
          setActiveZone("contact");
          emitCommand("hire");
        }}
      />

      <Trees />
      <Rocks />
    </group>
  );
}

function Path({ from, to }: { from: Vec3; to: Vec3 }) {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.hypot(dx, dz);
  const angle = Math.atan2(dx, dz);
  return (
    <mesh
      position={[(from[0] + to[0]) / 2, 0.17, (from[2] + to[2]) / 2]}
      rotation={[0, angle, 0]}
    >
      <boxGeometry args={[1.15, 0.08, length]} />
      <meshStandardMaterial color="#2a3f30" roughness={0.95} />
    </mesh>
  );
}

function ZonePad({ position, color }: { position: Vec3; color: string }) {
  return (
    <group position={[position[0], 0.18, position[2]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.6, 32]} />
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

function HeroDesk() {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const setActiveZone = usePortfolioStore((state) => state.setActiveZone);

  return (
    <group
      position={[0, 0, 0]}
      onClick={(event) => {
        event.stopPropagation();
        setActiveZone("hero");
        emitCommand("about");
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[3.4, 0.18, 1.7]} />
        <meshStandardMaterial color="#3a2818" roughness={0.8} />
      </mesh>
      {[
        [-1.45, 0.38, -0.65],
        [1.45, 0.38, -0.65],
        [-1.45, 0.38, 0.65],
        [1.45, 0.38, 0.65],
      ].map((position, index) => (
        <mesh key={index} position={position as Vec3}>
          <boxGeometry args={[0.16, 0.75, 0.16]} />
          <meshStandardMaterial color="#2a1b10" />
        </mesh>
      ))}
      <mesh position={[0, 1.45, -0.45]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[2.3, 1.25, 0.12]} />
        <meshStandardMaterial color="#0b1510" />
      </mesh>
      <mesh position={[0, 1.45, -0.37]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[2.05, 1]} />
        <meshStandardMaterial
          color="#7cffb2"
          emissive="#7cffb2"
          emissiveIntensity={hovered ? 1.1 : 0.55}
        />
      </mesh>
      <WorldLabel position={[0, 2.45, 0]} color="#7cffb2">
        HERO / ABOUT
      </WorldLabel>
    </group>
  );
}

function ProjectMonitor({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[number];
  index: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const angle = [-0.35, 0, 0.35][index] ?? 0;
  const offset: Vec3 = [
    -2.1 + index * 2.1,
    0,
    1.1 + (index === 1 ? 0.3 : 0),
  ];

  return (
    <group
      position={[-8 + offset[0], 0, -3 + offset[2]]}
      rotation={[0, angle, 0]}
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
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[2.25, 1.45, 0.18]} />
        <meshStandardMaterial color="#0b1510" />
      </mesh>
      <mesh position={[0, 1.25, 0.11]}>
        <planeGeometry args={[1.95, 1.15]} />
        <meshStandardMaterial
          color="#7cffb2"
          emissive="#7cffb2"
          emissiveIntensity={hovered ? 1.1 : 0.55}
        />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color="#2a1b10" />
      </mesh>
      <WorldLabel position={[0, 2.35, 0]} color="#7cffb2">
        {project.command.replace("/", "").toUpperCase()}
      </WorldLabel>
    </group>
  );
}

function ServiceKiosk({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group
      position={[0, 0, -10]}
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
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[2.6, 2.1, 0.7]} />
        <meshStandardMaterial color="#0b1510" />
      </mesh>
      <mesh position={[0, 1.3, 0.37]}>
        <planeGeometry args={[2.2, 1.05]} />
        <meshStandardMaterial
          color="#ffc857"
          emissive="#ffc857"
          emissiveIntensity={hovered ? 1.2 : 0.65}
        />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.8, 0.4, 0.9]} />
        <meshStandardMaterial color="#2a1b10" />
      </mesh>
      <WorldLabel position={[0, 2.6, 0]} color="#ffc857">
        SERVICES
      </WorldLabel>
    </group>
  );
}

function HireBeacon({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group
      position={[0, 0, 8]}
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
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.22, 0.45, 2.6, 8]} />
        <meshStandardMaterial
          color="#ff8fa3"
          emissive="#ff8fa3"
          emissiveIntensity={hovered ? 1.4 : 0.8}
        />
      </mesh>
      <pointLight
        position={[0, 2.6, 0]}
        color="#ff8fa3"
        intensity={hovered ? 3 : 1.6}
        distance={9}
      />
      <WorldLabel position={[0, 3.1, 0]} color="#ff8fa3">
        HIRE ME
      </WorldLabel>
    </group>
  );
}

function Trees() {
  const trees = useMemo(
    () =>
      [
        [-10.2, -6.2, 0.8],
        [-9.4, 4.4, 0.65],
        [-5.6, 7.2, 0.9],
        [5.4, 7.6, 0.7],
        [10.4, 4.2, 0.85],
        [9.8, -7.4, 0.6],
        [4.6, -8.2, 0.75],
        [-4.2, -8.6, 0.55],
      ] as [number, number, number][],
    [],
  );

  return (
    <group>
      {trees.map(([x, z, scale], index) => (
        <group key={index} position={[x, 0.2, z]} scale={scale}>
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 1.1, 6]} />
            <meshStandardMaterial color="#3a2818" flatShading />
          </mesh>
          <mesh position={[0, 1.35, 0]}>
            <coneGeometry args={[0.75, 1.6, 7]} />
            <meshStandardMaterial color="#2f7d4a" flatShading />
          </mesh>
          <mesh position={[0, 2.05, 0]}>
            <coneGeometry args={[0.55, 1.25, 7]} />
            <meshStandardMaterial color="#3f9a5a" flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Rocks() {
  const rocks = useMemo(
    () =>
      [
        [-11.2, 1.2, 0.7],
        [10.8, -2.4, 0.9],
        [-6.4, 8.8, 0.5],
        [6.8, 8.6, 0.6],
        [-11.4, -2.8, 0.55],
      ] as [number, number, number][],
    [],
  );

  return (
    <group>
      {rocks.map(([x, z, scale], index) => (
        <mesh
          key={index}
          position={[x, 0.35, z]}
          scale={scale}
          rotation={[index * 0.7, index * 1.1, 0]}
        >
          <dodecahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#4b5563" flatShading />
        </mesh>
      ))}
    </group>
  );
}

function WorldLabel({
  position,
  children,
  color = "#7cffb2",
}: {
  position: Vec3;
  children: string;
  color?: string;
}) {
  return (
    <Billboard position={position}>
      <Text
        font="/fonts/JetBrainsMono-Regular.ttf"
        fontSize={0.32}
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
