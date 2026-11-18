"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

type SectionHeaderProps = {
  index: string;
  command: string;
  title: string;
  description?: string;
  accent?: string;
};

export function SectionHeader({
  index,
  command,
  title,
  description,
  accent,
}: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.header
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: EASE }}
      className="mb-8"
    >
      <div className="flex flex-wrap items-center gap-2 text-[9px] tracking-[0.2em] text-term-dim uppercase">
        <span className="text-term-green">{index}</span>
        <span>/</span>
        <span>{command}</span>
        {accent ? <span className="text-term-amber">[{accent}]</span> : null}
      </div>
      <h2 className="mt-3 text-2xl tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}