"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function PortfolioStoreSync() {
  useEffect(() => {
    void usePortfolioStore.persist.rehydrate();

    const apply = (state: ReturnType<typeof usePortfolioStore.getState>) => {
      const root = document.documentElement;
      root.dataset.theme = state.theme;
      root.dataset.mode = state.viewMode;
      root.style.colorScheme =
        state.theme === "minimal" ? "light" : "dark";
      document.body.style.overflow = state.viewMode === "3d" ? "hidden" : "";
    };

    apply(usePortfolioStore.getState());
    const unsubscribe = usePortfolioStore.subscribe(apply);
    return unsubscribe;
  }, []);

  return null;
}