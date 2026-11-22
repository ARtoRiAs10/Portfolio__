"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { MathUtils, type Group, type Mesh } from "three";
import { usePortfolioStore } from "@/store/usePortfolioStore";

function isTyping() {
  const element = document.activeElement as HTMLElement | null;
  if (!element) return false;
  const tag = element.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    element.isContentEditable
  );
}

export function RoverController() {
  const body = useRef<RapierRigidBody>(null);
  const visual = useRef<Group>(null);
  const wheels = useRef<(Mesh | null)[]>([]);
  const keys = useRef(new Set<string>());

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (isTyping()) return;
      const key = event.key.toLowerCase();
      if (
        ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(
          key,
        )
      ) {
        event.preventDefault();
        keys.current.add(key);
      }
    };
    const up = (event: KeyboardEvent) => {
      keys.current.delete(event.key.toLowerCase());
    };
    const blur = () => keys.current.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  useFrame((_, delta) => {
    const rigidBody = body.current;
    if (!rigidBody) return;

    let x = 0;
    let z = 0;
    const pressed = keys.current;

    if (pressed.has("w") || pressed.has("arrowup")) z -= 1;
    if (pressed.has("s") || pressed.has("arrowdown")) z += 1;
    if (pressed.has("a") || pressed.has("arrowleft")) x -= 1;
    if (pressed.has("d") || pressed.has("arrowright")) x += 1;

    const joystick = usePortfolioStore.getState().joystick;
    x += joystick.x;
    z += joystick.y;

    const length = Math.hypot(x, z);
    if (length > 1) {
      x /= length;
      z /= length;
    }

    const speed = 7;
    const current = rigidBody.linvel();
    rigidBody.setLinvel(
      { x: x * speed, y: current.y, z: z * speed },
      true,
    );

    const moving = length > 0.08;
    if (moving && visual.current) {
      const target = Math.atan2(x, z);
      visual.current.rotation.y = MathUtils.lerp(
        visual.current.rotation.y,
        target,
        Math.min(1, delta * 9),
      );
    }

    const spin = moving ? length * delta * 14 : 0;
    for (const wheel of wheels.current) {
      if (wheel) wheel.rotation.y += spin;
    }

    const position = rigidBody.translation();
    if (position.y < -4) {
      rigidBody.setTranslation({ x: 0, y: 1, z: 4 }, true);
      rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={body}
      colliders="cuboid"
      position={[0, 1, 4]}
      linearDamping={3}
      angularDamping={6}
      enabledRotations={[false, true, false]}
      ccd
    >
      <group ref={visual}>
        <mesh>
          <boxGeometry args={[1.25, 0.42, 1.75]} />
          <meshStandardMaterial color="#ffc857" roughness={0.4} metalness={0.25} />
        </mesh>
        <mesh position={[0, 0.4, -0.2]}>
          <boxGeometry args={[0.88, 0.38, 0.82]} />
          <meshStandardMaterial color="#0b1510" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.62, -0.2]}>
          <boxGeometry args={[0.7, 0.08, 0.62]} />
          <meshStandardMaterial
            color="#7cffb2"
            emissive="#7cffb2"
            emissiveIntensity={0.7}
          />
        </mesh>
        <mesh position={[0, 0.9, -0.2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.5, 6]} />
          <meshStandardMaterial color="#d9e6dc" />
        </mesh>
        <mesh position={[0, 1.18, -0.2]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial
            color="#ff8fa3"
            emissive="#ff8fa3"
            emissiveIntensity={1.2}
          />
        </mesh>

        {[
          [-0.74, 0, 0.55],
          [0.74, 0, 0.55],
          [-0.74, 0, -0.55],
          [0.74, 0, -0.55],
        ].map((position, index) => (
          <group
            key={index}
            position={position as [number, number, number]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <mesh
              ref={(node) => {
                wheels.current[index] = node;
              }}
            >
              <cylinderGeometry args={[0.34, 0.34, 0.24, 12]} />
              <meshStandardMaterial color="#111827" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.13, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.02, 10]} />
              <meshStandardMaterial color="#ffc857" metalness={0.6} />
            </mesh>
          </group>
        ))}

        <Billboard position={[0, 1.8, 0]}>
          <Text
        font="/fonts/JetBrainsMono-Regular.ttf"
            fontSize={0.26}
            color="#ffc857"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.012}
            outlineColor="#050806"
          >
            ROVER / WASD
          </Text>
        </Billboard>
      </group>
    </RigidBody>
  );
}