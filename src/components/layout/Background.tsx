import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const GRID_MASK = "radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 75%)";

function Orb({ color, className, style }: { color: string; className: string; style: CSSProperties }) {
  return (
    <div
      className={cn("absolute rounded-full will-change-transform", className)}
      style={{ background: `radial-gradient(closest-side, ${color}, rgb(0 0 0 / 0))`, ...style }}
    />
  );
}

/**
 * Aurora background: drifting orbs + masked grid + grain.
 * Fixed and rendered by the root layout, so it never restarts between pages.
 * Phones get two orbs instead of four (lighter to composite while scrolling).
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      data-reveal-bg=""
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
    >
      <Orb
        color="rgb(46 196 118 / .34)"
        className="animate-drift1"
        style={{ width: 1100, height: 1100, left: -280, top: -520 }}
      />
      <Orb
        color="rgb(16 150 128 / .30)"
        className="animate-drift2"
        style={{ width: 900, height: 900, right: -300, top: 60 }}
      />
      <Orb
        color="rgb(30 170 110 / .24)"
        className="hidden animate-drift3 md:block"
        style={{ width: 1000, height: 1000, left: -360, top: "40%" }}
      />
      <Orb
        color="rgb(120 214 86 / .16)"
        className="hidden animate-drift4 md:block"
        style={{ width: 820, height: 820, left: "38%", bottom: -460 }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / .04) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: GRID_MASK,
          WebkitMaskImage: GRID_MASK,
        }}
      />
      <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: NOISE }} />
    </div>
  );
}
