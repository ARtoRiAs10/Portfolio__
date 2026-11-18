"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stats } from "@/lib/data";
import { cn } from "@/lib/utils";

export function StatsStrip() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0 : 0.35,
              delay: reducedMotion ? 0 : index * 0.05,
            }}
            className={cn(
              "border-border px-4 py-4",
              index < stats.length - 1 && "border-r",
              index < 2 && "border-b sm:border-b-0",
            )}
          >
            <div className="text-[8px] tracking-[0.16em] text-term-dim uppercase">
              {stat.label}
            </div>
            <div className="mt-1 text-xl text-term-green">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}