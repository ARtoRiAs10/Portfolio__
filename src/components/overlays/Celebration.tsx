"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePortfolioStore } from "@/store/usePortfolioStore";

const colors = ["#7cffb2", "#ffc857", "#67e8f9", "#ff6b6b", "#a78bfa"];

function rand(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function Celebration() {
  const celebration = usePortfolioStore((state) => state.celebration);
  const reducedMotion = useReducedMotion();

  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, index) => {
        const seed = celebration * 97 + index * 13;
        return {
          id: `${celebration}-${index}`,
          left: rand(seed) * 100,
          delay: rand(seed + 1) * 0.35,
          duration: 1.4 + rand(seed + 2) * 1.1,
          rotate: rand(seed + 3) * 360,
          color: colors[index % colors.length],
          width: 4 + rand(seed + 4) * 5,
          height: 7 + rand(seed + 5) * 8,
          drift: (rand(seed + 6) - 0.5) * 180,
        };
      }),
    [celebration],
  );

  if (!celebration || reducedMotion) return null;

  return (
    <div
      key={celebration}
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          initial={{ opacity: 1, y: -20, x: 0, rotate: 0 }}
          animate={{
            opacity: [1, 1, 0],
            y: ["0vh", "105vh"],
            x: [0, piece.drift],
            rotate: piece.rotate + 360,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
          }}
          className="absolute top-0 block"
          style={{
            left: `${piece.left}%`,
            width: piece.width,
            height: piece.height,
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>
  );
}