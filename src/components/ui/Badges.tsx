import type { ReactNode } from "react";
import { cn, pad2 } from "@/lib/utils";

export function PulseDot({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("size-2 shrink-0 animate-pulse-ring rounded-full bg-accent", className)} />;
}

export function StatusBadge({ available = true, children }: { available?: boolean; children: ReactNode }) {
  return available ? (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/22 bg-accent/8 py-2 pr-4 pl-3 text-[13px] font-medium text-[#bdeccf] shadow-[inset_0_1px_0_rgb(255_255_255/.06)] backdrop-blur-md">
      <PulseDot />
      {children}
    </div>
  ) : (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 py-2 pr-4 pl-3 text-[13px] font-medium text-fg-2">
      <span aria-hidden="true" className="size-2 rounded-full bg-placeholder" />
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-[26px] items-center whitespace-nowrap rounded-full border border-white/8 bg-white/4 px-2.5 font-mono text-xs text-fg-2">
      {children}
    </span>
  );
}

export function TagList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

export function Category({ icon, children }: { icon?: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-accent/20 bg-accent/8 px-3 font-mono text-xs font-medium text-[#a8efc6]">
      {icon}
      {children}
    </span>
  );
}

/** Chip floating over images (cover year, "Projet phare"). */
export function MediaChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-[7px] rounded-full border border-white/14 bg-bg/45 px-3 text-xs font-medium text-fg backdrop-blur-md",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-xs font-medium tracking-[.06em] text-accent uppercase", className)}>
      {children}
    </span>
  );
}

/** "Projets phares ——— 03" */
export function SectionLabel({ label, count, className }: { label: string; count: number; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-mono text-xs font-medium tracking-[.08em] text-muted uppercase",
        className,
      )}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-white/14 to-white/0" />
      <span>{pad2(count)}</span>
    </div>
  );
}

/** Small mono uppercase label (dt, panel rows, TOC title). */
export function MetaLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[11px] font-medium tracking-[.06em] text-faint uppercase", className)}>
      {children}
    </span>
  );
}
