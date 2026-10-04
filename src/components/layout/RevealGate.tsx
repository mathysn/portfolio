"use client";

import { useEffect } from "react";

/**
 * The load animation (`[data-reveal]` in globals.css) only runs while <html> has no
 * `data-ready`. Setting it once the intro is over keeps later navigations to the page transition.
 */
export function RevealGate() {
  useEffect(() => {
    const id = window.setTimeout(() => {
      document.documentElement.dataset.ready = "";
    }, 1800);
    return () => window.clearTimeout(id);
  }, []);
  return null;
}
