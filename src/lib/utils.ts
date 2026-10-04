import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Page column: horizontal gutter (20 → 32 → 48 → 64 → 120px) and a 1440px max width,
 * so content never exceeds 1200px on very large screens (the aurora stays full-bleed).
 */
export const gutter = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-[120px]";

/** "3" → "03" — used by section counters. */
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Internal app routes go through next/link; files and external URLs stay plain anchors. */
export function isInternalRoute(href: string) {
  return href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);
}

export function isExternal(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
}
