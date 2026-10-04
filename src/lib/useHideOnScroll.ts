"use client";

import { useEffect, useState } from "react";

const TOP_ZONE = 80; // always visible near the top of the page
const DOWN_THRESHOLD = 8; // px scrolled down before hiding
const UP_THRESHOLD = 4; // px scrolled up before showing again

/**
 * Hides a floating element while the user scrolls down and brings it back as soon as
 * they scroll up. Only active below `minWidth` (bigger screens keep it visible);
 * `resetKey` (e.g. the pathname) shows it again after navigating.
 */
export function useHideOnScroll({ minWidth = 1024, resetKey }: { minWidth?: number; resetKey?: string } = {}) {
  const [hidden, setHidden] = useState(false);
  const [prevKey, setPrevKey] = useState(resetKey);

  // Show again on navigation (state adjustment during render, no effect needed).
  if (resetKey !== prevKey) {
    setPrevKey(resetKey);
    setHidden(false);
  }

  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (wide.matches || y < TOP_ZONE) setHidden(false);
      else if (delta > DOWN_THRESHOLD) setHidden(true);
      else if (delta < -UP_THRESHOLD) setHidden(false);
      if (Math.abs(delta) > UP_THRESHOLD) lastY = y;
    };
    const onResize = () => wide.matches && setHidden(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    wide.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      wide.removeEventListener("change", onResize);
    };
  }, [minWidth]);

  return [hidden, setHidden] as const;
}
