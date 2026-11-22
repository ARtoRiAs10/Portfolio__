"use client";

import { useMemo, useState } from "react";
import { useCursor } from "@react-three/drei";
import { projects } from "@/lib/data";
import { emitCommand } from "@/lib/events";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { ISLANDS, MAIN_ZONES, WORLD_LABEL, type Vec3 } from "@/components/three/worldConfig";
import {
  Island,
  Path,
  Rock,
  Tree,
  WorldLabel,
  ZonePad,
} from "@/components/three/WorldPrimitives";

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
    <Island
      position={ISLANDS.main.position}
      radius={ISLANDS.main.radius}
      top="#1f5a35"
      topAlt="#2f7d4a"
      rock="#3a2818"
      sand="#c2a26b"
    >
      <WorldLabel position={[0, 4.6, 0]} color="#7cffb2" size={0.34}>
        {WORLD_LABEL.main}
      </WorldLabel>

      <Path from={MAIN_ZONES.hero} to={MAIN_ZONES.projects} />
      <Path from={MAIN_ZONES.hero} to={MAIN_ZONES.skills} />
      <Path from={MAIN_ZONES.hero} to={MAIN_ZONES.services} />
      <Path from={MAIN_ZONES.hero} to={MAIN_ZONES.contact} />

      <ZonePad position={MAIN_ZONES.projects} color="#7cffb2" />
      <ZonePad position={MAIN_ZONES.skills} color="#67e8f9" />
      <ZonePad position={MAIN_ZONES.services} color="#ffc857" />
      <ZonePad position={MAIN_ZONES.contact} color="#ff8fa3" />

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

      <Dock position={[11.6, 0, -2]} rotation={-Math.PI / 2} />
      <Dock position={[-11.6, 0, -1]} rotation={Math.PI / 2} />
      <Dock position={[0, 0, -11.6]} rotation={0} />

      <Trees />
      <Rocks />
    </Island>
  );
}

function Dock({ position, rotation }: { position: Vec3; rotation: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[3.4, 0.16, 1.8]} />
        <meshStandardMaterial color="#2a3f30" roughness={0.85} />
      </mesh>
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, 0.55, 0.75]}>
          <cylinderGeometry args={[0.07, 0.07, 0.9, 6]} />
          <meshStandardMaterial color="#1c2a20" />
        </mesh>
      ))}
    </group>
  );
}

function HeroDesk() {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const setActiveZone = usePortfolioStore((state) => state.setActiveZone);

  return (
    <group
      position={MAIN_ZONES.hero}
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
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[3.6, 0.2, 1.8]} />
        <meshStandardMaterial color="#3a2818" roughness={0.75} />
      </mesh>
      {[
        [-1.5, 0.45, -0.7],
        [1.5, 0.45, -0.7],
        [-1.5, 0.45, 0.7],
        [1.5, 0.45, 0.7],
      ].map((position, index) => (
        <mesh key={index} position={position as Vec3}>
          <boxGeometry args={[0.16, 0.9, 0.16]} />
          <meshStandardMaterial color="#2a1b10" />
        </mesh>
      ))}
      <mesh position={[0, 1.65, -0.5]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[2.4, 1.35, 0.12]} />
        <meshStandardMaterial color="#0b1510" />
      </mesh>
      <mesh position={[0, 1.65, -0.42]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[2.15, 1.08]} />
        <meshStandardMaterial
          color="#7cffb2"
          emissive="#7cffb2"
          emissiveIntensity={hovered ? 1.1 : 0.55}
        />
      </mesh>
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[2.8, 0.06, 0.7]} />
        <meshStandardMaterial color="#1c130d" />
      </mesh>
      <WorldLabel position={[0, 2.75, 0]} color="#7cffb2" size={0.3}>
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
    MAIN_ZONES.projects[0] - 2.1 + index * 2.1,
    0,
    MAIN_ZONES.projects[2] + 1.1 + (index === 1 ? 0.3 : 0),
  ];

  return (
    <group
      position={offset}
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
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[2.35, 1.5, 0.18]} />
        <meshStandardMaterial color="#0b1510" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.35, 0.11]}>
        <planeGeometry args={[2.05, 1.2]} />
        <meshStandardMaterial
          color="#7cffb2"
          emissive="#7cffb2"
          emissiveIntensity={hovered ? 1.1 : 0.55}
        />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.2, 0.9, 0.2]} />
        <meshStandardMaterial color="#2a1b10" />
      </mesh>
      <WorldLabel position={[0, 2.45, 0]} color="#7cffb2" size={0.28}>
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
      position={MAIN_ZONES.services}
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
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[2.7, 2.2, 0.7]} />
        <meshStandardMaterial color="#0b1510" roughness={0.45} />
      </mesh>
      <mesh position={[0, 1.42, 0.37]}>
        <planeGeometry args={[2.3, 1.1]} />
        <meshStandardMaterial
          color="#ffc857"
          emissive="#ffc857"
          emissiveIntensity={hovered ? 1.2 : 0.65}
        />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.9, 0.4, 0.9]} />
        <meshStandardMaterial color="#2a1b10" />
      </mesh>
      <WorldLabel position={[0, 2.75, 0]} color="#ffc857" size={0.3}>
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
      position={MAIN_ZONES.contact}
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
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.22, 0.45, 2.8, 8]} />
        <meshStandardMaterial
          color="#ff8fa3"
          emissive="#ff8fa3"
          emissiveIntensity={hovered ? 1.4 : 0.8}
        />
      </mesh>
      <pointLight
        position={[0, 2.8, 0]}
        color="#ff8fa3"
        intensity={hovered ? 3 : 1.6}
        distance={9}
      />
      <WorldLabel position={[0, 3.3, 0]} color="#ff8fa3" size={0.3}>
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
        <Tree
          key={index}
          position={[x, 0.28, z]}
          scale={scale}
          color={index % 2 === 0 ? "#2f7d4a" : "#348a52"}
        />
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
        [8.6, 6.2, 0.4],
        [-8.8, -6.4, 0.45],
      ] as [number, number, number][],
    [],
  );

  return (
    <group>
      {rocks.map(([x, z, scale], index) => (
        <Rock key={index} position={[x, 0.4, z]} scale={scale} />
      ))}
    </group>
  );
}