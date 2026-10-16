import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CoverProps = {
  /** Image path (e.g. /projets/atlas.avif). Without it, the striped placeholder is shown. */
  src?: string;
  alt?: string;
  /** Placeholder caption, e.g. "capture — atlas.avif". */
  label?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Overlays (media chips). */
  children?: ReactNode;
};

/** Image frame shared by cards, hero and figures — 4:3 by default, radius 18. */
export function Cover({ src, alt = "", label, sizes = "100vw", priority, className, children }: CoverProps) {
  return (
    <div
      className={cn(
        "relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[18px] border border-white/7 shadow-[inset_0_1px_0_rgb(255_255_255/.06)]",
        !src &&
          "bg-[repeating-linear-gradient(135deg,rgb(255_255_255/.04)_0_1px,transparent_1px_12px),radial-gradient(120%_100%_at_0%_0%,rgb(98_220_148/.14),rgb(98_220_148/0)_60%),rgb(255_255_255/.02)]",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        label && <span className="font-mono text-xs text-faint">{label}</span>
      )}
      {children}
    </div>
  );
}
