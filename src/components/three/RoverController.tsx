"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import { RigidBody, type RapierRigidBody } from "@react-three/rapier";
import {
  MathUtils,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
  type PointLight,
} from "three";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useRoverStore } from "@/store/useRoverStore";
import { roverTelemetry } from "@/lib/roverTelemetry";
import { playBoost, playClick, playHorn } from "@/lib/audio";

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

const spawn = { x: 0, y: 1, z: 4 };

export function RoverController() {
  const body = useRef<RapierRigidBody>(null);
  const visual = useRef<Group>(null);
  const wheels = useRef<(Mesh | null)[]>([]);
  const brakeMaterials = useRef<(MeshStandardMaterial | null)[]>([]);
  const headlightMaterials = useRef<(MeshStandardMaterial | null)[]>([]);
  const headlight = useRef<PointLight>(null);
  const keys = useRef(new Set<string>());
  const telemetryTimer = useRef(0);
  const wasBoosting = useRef(false);
  const readyRef = useRef(false);

  const reset = useCallback(() => {
    const rigidBody = body.current;
    if (!rigidBody) return;
    rigidBody.setTranslation(spawn, true);
    rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
    if (visual.current) {
      visual.current.rotation.y = 0;
      visual.current.position.y = 0;
    }
    roverTelemetry.speed = 0;
    roverTelemetry.braking = false;
    roverTelemetry.boosting = false;
    useRoverStore.getState().setTelemetry({
      speed: 0,
      braking: false,
      headlights: useRoverStore.getState().headlights,
      boosting: false,
    });
  }, []);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (isTyping()) return;
      const key = event.key.toLowerCase();
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
          " ",
          "shift",
        ].includes(key)
      ) {
        if (key === " ") event.preventDefault();
        keys.current.add(key);
      }
      if (event.repeat) return;
      if (key === "l") {
        useRoverStore.getState().toggleHeadlights();
        playClick();
      }
      if (key === "h") playHorn();
      if (key === "r") reset();
    };
    const up = (event: KeyboardEvent) => {
      keys.current.delete(event.key.toLowerCase());
    };
    const blur = () => keys.current.clear();
    const onReset = () => reset();

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    window.addEventListener("portfolio:rover-reset", onReset);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
      window.removeEventListener("portfolio:rover-reset", onReset);
    };
  }, [reset]);

  useEffect(
    () => () => {
      useRoverStore.getState().setReady(false);
    },
    [],
  );

  useFrame((state, delta) => {
    const rigidBody = body.current;
    if (!rigidBody) return;
    if (!readyRef.current) {
      readyRef.current = true;
      useRoverStore.getState().setReady(true);
    }

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

    const moving = length > 0.08;
    const roverState = useRoverStore.getState();
    const boosting = moving && (pressed.has("shift") || roverState.boost);
    if (boosting && !wasBoosting.current) playBoost();
    wasBoosting.current = boosting;

    const braking = pressed.has(" ") || roverState.brake;
    const speed = boosting ? 11 : 6.5;
    const current = rigidBody.linvel();

    if (braking) {
      rigidBody.setLinvel(
        { x: current.x * 0.12, y: current.y, z: current.z * 0.12 },
        true,
      );
    } else {
      rigidBody.setLinvel(
        { x: x * speed, y: current.y, z: z * speed },
        true,
      );
    }

    if (moving && visual.current) {
      const target = Math.atan2(x, z);
      visual.current.rotation.y = MathUtils.lerp(
        visual.current.rotation.y,
        target,
        Math.min(1, delta * 9),
      );
    }

    const after = rigidBody.linvel();
    const horizontalSpeed = Math.hypot(after.x, after.z);

    const spin = moving ? length * delta * (boosting ? 22 : 14) : 0;
    for (const wheel of wheels.current) {
      if (wheel) wheel.rotation.y += spin;
    }

    if (visual.current) {
      const bob =
        Math.sin(state.clock.elapsedTime * 12) *
        Math.min(0.028, horizontalSpeed * 0.004);
      visual.current.position.y = bob;
    }

    for (const material of brakeMaterials.current) {
      if (material) material.emissiveIntensity = braking ? 3 : 0.25;
    }

    const headlights = useRoverStore.getState().headlights;
    for (const material of headlightMaterials.current) {
      if (material) material.emissiveIntensity = headlights ? 2.4 : 0.4;
    }
    if (headlight.current) {
      headlight.current.intensity = headlights ? 9 : 0;
    }

    const position = rigidBody.translation();
    roverTelemetry.position.x = position.x;
    roverTelemetry.position.y = position.y;
    roverTelemetry.position.z = position.z;
    roverTelemetry.speed = horizontalSpeed;
    roverTelemetry.braking = braking;
    roverTelemetry.headlights = headlights;
    roverTelemetry.boosting = boosting;

    telemetryTimer.current += delta;
    if (telemetryTimer.current > 0.1) {
      useRoverStore.getState().setTelemetry({
        speed: horizontalSpeed,
        braking,
        headlights,
        boosting,
      });
      telemetryTimer.current = 0;
    }

    if (position.y < -4) reset();
  });

  return (
    <RigidBody
      ref={body}
      colliders="cuboid"
      position={[spawn.x, spawn.y, spawn.z]}
      linearDamping={2.6}
      angularDamping={6}
      enabledRotations={[false, true, false]}
      ccd
    >
      <group ref={visual}>
        <mesh>
          <boxGeometry args={[1.3, 0.42, 1.8]} />
          <meshStandardMaterial color="#ffc857" roughness={0.38} metalness={0.28} />
        </mesh>
        <mesh position={[0, 0.4, -0.2]}>
          <boxGeometry args={[0.94, 0.42, 0.84]} />
          <meshStandardMaterial color="#0b1510" roughness={0.32} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, -0.63]}>
          <boxGeometry args={[0.76, 0.2, 0.03]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#67e8f9"
            emissiveIntensity={0.7}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.36, 0.64]}>
          <boxGeometry args={[0.94, 0.24, 0.52]} />
          <meshStandardMaterial color="#3a2818" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.02, -0.96]}>
          <boxGeometry args={[1.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#1c130d" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.02, 0.96]}>
          <boxGeometry args={[1.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#1c130d" roughness={0.6} />
        </mesh>

        {[-0.4, 0.4].map((headlightX, index) => (
          <mesh key={`head-${index}`} position={[headlightX, 0.24, -0.93]}>
            <boxGeometry args={[0.2, 0.1, 0.04]} />
            <meshStandardMaterial
              ref={(material) => {
                headlightMaterials.current[index] = material;
              }}
              color="#fff2d0"
              emissive="#fff2d0"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}

        {[-0.4, 0.4].map((brakeX, index) => (
          <mesh key={`brake-${index}`} position={[brakeX, 0.2, 0.93]}>
            <boxGeometry args={[0.2, 0.08, 0.04]} />
            <meshStandardMaterial
              ref={(material) => {
                brakeMaterials.current[index] = material;
              }}
              color="#ff3333"
              emissive="#ff3333"
              emissiveIntensity={0.25}
            />
          </mesh>
        ))}

        <pointLight
          ref={headlight}
          position={[0, 0.36, -1.15]}
          color="#fff2d0"
          intensity={0}
          distance={13}
          decay={2}
        />

        <mesh position={[0.28, 0.75, -0.2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.6, 6]} />
          <meshStandardMaterial color="#d9e6dc" />
        </mesh>
        <mesh position={[0.28, 1.08, -0.2]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color="#ff8fa3"
            emissive="#ff8fa3"
            emissiveIntensity={1.2}
          />
        </mesh>

        {[
          [-0.78, 0, 0.58],
          [0.78, 0, 0.58],
          [-0.78, 0, -0.58],
          [0.78, 0, -0.58],
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
              <cylinderGeometry args={[0.35, 0.35, 0.26, 14]} />
              <meshStandardMaterial color="#111827" roughness={0.88} />
            </mesh>
            <mesh position={[0, 0.14, 0]}>
              <cylinderGeometry args={[0.14, 0.14, 0.02, 10]} />
              <meshStandardMaterial color="#ffc857" metalness={0.6} roughness={0.3} />
            </mesh>
          </group>
        ))}

        <Billboard position={[0, 1.75, 0]}>
          <Text
            font="/fonts/JetBrainsMono-Regular.ttf"
            fontSize={0.25}
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