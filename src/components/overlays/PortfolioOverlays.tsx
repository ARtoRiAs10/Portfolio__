"use client";

import { useEffect } from "react";
import { TopHud } from "@/components/overlays/TopHud";
import { ProjectModal } from "@/components/overlays/ProjectModal";
import { ServicesPanel } from "@/components/overlays/ServicesPanel";
import { EstimatorPanel } from "@/components/overlays/EstimatorPanel";
import { HirePanel } from "@/components/overlays/HirePanel";
import { CommandPalette } from "@/components/overlays/CommandPalette";
import { Celebration } from "@/components/overlays/Celebration";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function PortfolioOverlays() {
  const setPaletteOpen = usePortfolioStore((state) => state.setPaletteOpen);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setPaletteOpen]);

  return (
    <>
      <TopHud />
      <ProjectModal />
      <ServicesPanel />
      <EstimatorPanel />
      <HirePanel />
      <CommandPalette />
      <Celebration />
    </>
  );
}