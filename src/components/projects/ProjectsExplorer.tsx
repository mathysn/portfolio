"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Segmented } from "@/components/ui/Segmented";
import type { Project, ProjectKind } from "@/lib/projects";
import { cn, gutter } from "@/lib/utils";
import { FilterMenu } from "./FilterMenu";
import { ProjectCard } from "./ProjectCards";

type Filter = "all" | ProjectKind;
/** out: current cards fade away · in: new cards stagger in (CSS, see globals.css). */
type Phase = "idle" | "out" | "in";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "web", label: "Web" },
  { value: "api", label: "API" },
  { value: "mobile", label: "Mobile" },
  { value: "oss", label: "Open source" },
];

const OUT_MS = 180;
const IN_MS = 1100; // longest staggered entrance (8 × 55ms + 600ms) + margin

/** Load-animation delay (--d) and filter stagger index (--i) of the n-th card. */
const cardStyle = (index: number) =>
  ({ "--d": `${360 + Math.min(index, 8) * 60}ms`, "--i": Math.min(index, 8) }) as CSSProperties;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly animates its height to follow the content (so the CTA below glides). */
function useAnimatedHeight() {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const observer = new ResizeObserver(() => setHeight(inner.offsetHeight));
    observer.observe(inner);
    return () => observer.disconnect();
  }, []);

  return { innerRef, height };
}

/** Projects arrive newest first (getAllProjects); the filter keeps that order. */
export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  // `filter` drives the pill immediately; `shown` swaps once the old cards have left.
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState<Filter>("all");
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);
  const { innerRef, height } = useAnimatedHeight();

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function changeFilter(next: Filter) {
    if (next === filter) return;
    setFilter(next);
    timers.current.forEach(window.clearTimeout);
    if (reducedMotion()) {
      setShown(next);
      return;
    }
    setPhase("out");
    timers.current = [
      window.setTimeout(() => {
        setShown(next);
        setPhase("in");
      }, OUT_MS),
      window.setTimeout(() => setPhase("idle"), OUT_MS + IN_MS),
    ];
  }

  const matches = (project: Project, f: Filter) => f === "all" || project.kind.includes(f);
  const visible = projects.filter((p) => matches(p, shown));
  const options = filters.map((f) => ({ ...f, count: projects.filter((p) => matches(p, f.value)).length }));

  return (
    <>
      {/* Phones: dropdown menu. From md: segmented pills. */}
      <div data-reveal="" style={{ "--d": "240ms" } as CSSProperties} className={cn(gutter, "relative z-20 pt-8 sm:pt-12")}>
        <FilterMenu label="Filtre" options={options} value={filter} onChange={changeFilter} className="md:hidden" />
        <Segmented
          label="Filtrer les projets"
          options={filters}
          value={filter}
          onChange={changeFilter}
          className="hidden md:flex"
        />
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} projet{visible.length > 1 ? "s" : ""} affiché{visible.length > 1 ? "s" : ""}
      </p>

      <div style={{ height }} className="transition-[height] duration-500 ease-glass">
        <div ref={innerRef} className="pt-6 sm:pt-10">
          {visible.length > 0 ? (
            // Featured cards span 2 columns; `dense` fills the gaps they would leave.
            // Keyed by filter so every card remounts and replays its entrance.
            <div
              key={shown}
              data-phase={phase}
              className={cn(gutter, "project-grid grid grid-flow-row-dense grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3")}
            >
              {visible.map((project, i) => (
                <ProjectCard key={project.slug} project={project} style={cardStyle(i)} />
              ))}
            </div>
          ) : (
            <p className={cn(gutter, "pt-6 text-[17px] text-muted")}>Aucun projet dans cette catégorie pour l&apos;instant.</p>
          )}
        </div>
      </div>
    </>
  );
}
