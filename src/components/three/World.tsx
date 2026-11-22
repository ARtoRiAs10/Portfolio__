"use client";

import { CuboidCollider, CylinderCollider, RigidBody } from "@react-three/rapier";
import { Environment } from "@/components/three/Environment";
import { WorldIsland } from "@/components/three/WorldIsland";
import { GameIsland } from "@/components/three/GameIsland";
import { AILab } from "@/components/three/AILab";
import { DataHarbor } from "@/components/three/DataHarbor";
import { Bridge } from "@/components/three/WorldPrimitives";
import {
  BRIDGES,
  ISLANDS,
} from "@/components/three/worldConfig";

export function World() {
  return (
    <>
      <Environment />

      <WorldIsland />
      <GameIsland />
      <AILab />
      <DataHarbor />

      <Bridge
        from={BRIDGES.game.from}
        to={BRIDGES.game.to}
        width={BRIDGES.game.width}
      />
      <Bridge
        from={BRIDGES.ai.from}
        to={BRIDGES.ai.to}
        width={BRIDGES.ai.width}
      />
      <Bridge
        from={BRIDGES.data.from}
        to={BRIDGES.data.to}
        width={BRIDGES.data.width}
      />

      <RigidBody type="fixed" colliders={false}>
        {Object.entries(ISLANDS).map(([key, island]) => (
          <CylinderCollider
            key={key}
            args={[0.3, island.radius * 0.96]}
            position={[island.position[0], 0.02, island.position[2]]}
          />
        ))}

        {Object.entries(BRIDGES).map(([key, bridge]) => {
          const dx = bridge.to[0] - bridge.from[0];
          const dz = bridge.to[2] - bridge.from[2];
          const length = Math.hypot(dx, dz);
          const angle = Math.atan2(dx, dz);
          return (
            <CuboidCollider
              key={key}
              args={[bridge.width / 2, 0.1, length / 2]}
              position={[
                (bridge.from[0] + bridge.to[0]) / 2,
                0.18,
                (bridge.from[2] + bridge.to[2]) / 2,
              ]}
              rotation={[0, angle, 0]}
            />
          );
        })}
      </RigidBody>
    </>
  );
}