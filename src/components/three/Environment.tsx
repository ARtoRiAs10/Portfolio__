"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { Cloud, type Vec3 } from "@/components/three/WorldPrimitives";

export function Environment() {
  return (
    <>
      <color attach="background" args={["#071722"]} />
      <fog attach="fog" args={["#071722", 36, 100]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#b8ffd6", "#0a1a10", 0.9]} />
      <directionalLight
        position={[14, 22, 10]}
        intensity={1.8}
        color="#fff2d0"
      />
      <directionalLight
        position={[-14, 10, -8]}
        intensity={0.4}
        color="#67e8f9"
      />

      <Stars
        radius={90}
        depth={30}
        count={1400}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />

      <Water />
      <Sun />
      <Clouds />
    </>
  );
}

function Water() {
  const surface = useRef<Mesh>(null);
  const ripples = useRef<(Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (surface.current) {
      surface.current.position.y = -1.18 + Math.sin(t * 0.55) * 0.025;
    }
    ripples.current.forEach((mesh, index) => {
      if (!mesh) return;
      const phase = (t * 0.18 + index * 0.33) % 1;
      const scale = 0.6 + phase * 3.2;
      mesh.scale.set(scale, scale, scale);
      const material = mesh.material as { opacity: number };
      if (material) material.opacity = 0.18 * (1 - phase);
    });
  });

  return (
    <group>
      <mesh
        ref={surface}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.18, 0]}
      >
        <circleGeometry args={[80, 64]} />
        <meshStandardMaterial
          color="#0b3b4a"
          roughness={0.18}
          metalness={0.75}
          transparent
          opacity={0.94}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.16, 0]}>
        <circleGeometry args={[80, 64]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.035} />
      </mesh>

      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          ref={(node) => {
            ripples.current[index] = node;
          }}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[index * 12 - 12, -1.14, index * 8 - 8]}
        >
          <ringGeometry args={[1, 1.04, 48]} />
          <meshBasicMaterial
            color="#67e8f9"
            transparent
            opacity={0.12}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Sun() {
  return (
    <group position={[38, 34, -48]}>
      <mesh>
        <sphereGeometry args={[4.2, 20, 20]} />
        <meshBasicMaterial color="#fff2d0" />
      </mesh>
      <mesh>
        <sphereGeometry args={[6.8, 20, 20]} />
        <meshBasicMaterial color="#fff2d0" transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[10, 20, 20]} />
        <meshBasicMaterial color="#ffc857" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function Clouds() {
  const group = useRef<Group>(null);

  const clouds: { position: Vec3; scale: number; opacity: number }[] = [
    { position: [-34, 18, -30], scale: 3.2, opacity: 0.14 },
    { position: [-12, 24, -44], scale: 4.2, opacity: 0.1 },
    { position: [18, 20, -38], scale: 3.6, opacity: 0.12 },
    { position: [42, 16, -18], scale: 2.8, opacity: 0.16 },
    { position: [8, 28, 24], scale: 4.6, opacity: 0.08 },
    { position: [-28, 26, 18], scale: 3.4, opacity: 0.09 },
    { position: [36, 22, 16], scale: 3.8, opacity: 0.08 },
  ];

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.008;
    group.current.position.x = Math.sin(t * 0.05) * 2;
  });

  return (
    <group ref={group}>
      {clouds.map((cloud, index) => (
        <Cloud
          key={index}
          position={cloud.position}
          scale={cloud.scale}
          opacity={cloud.opacity}
        />
      ))}
    </group>
  );
}