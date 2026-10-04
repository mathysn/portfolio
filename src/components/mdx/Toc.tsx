"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { MetaLabel } from "@/components/ui/Badges";
import { Collapsible } from "@/components/ui/Collapsible";
import type { Heading } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Id of the heading currently being read: the last one that crossed the top third of the viewport. */
function useActiveHeading(headings: Heading[]) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // The observer also fires once on mount, which sets the initial state.
    const update = () => {
      const threshold = window.innerHeight / 3;
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= threshold) current = el.id;
      }
      setActiveId(current);
    };

    const observer = new IntersectionObserver(update, { rootMargin: "0px 0px -66% 0px" });
    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [headings]);

  return activeId;
}

/** Heading links; the active one gets a green dot, ### entries are indented. */
function TocLinks({
  headings,
  activeId,
  onNavigate,
}: {
  headings: Heading[];
  activeId: string | undefined;
  onNavigate?: () => void;
}) {
  return headings.map((heading) => {
    const active = heading.id === activeId;
    return (
      <a
        key={heading.id}
        href={`#${heading.id}`}
        onClick={onNavigate}
        aria-current={active ? "location" : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded-[10px] py-[9px] pr-3 text-sm transition-[color,scale] duration-200 active:scale-[.98] active:duration-75 pointer-coarse:py-3",
          active
            ? "bg-white/7 font-medium text-fg shadow-[inset_0_1px_0_rgb(255_255_255/.08)]"
            : "text-muted hover:text-fg",
          heading.level === 3 ? (active ? "pl-5" : "pl-9") : active ? "pl-3" : "pl-7",
        )}
      >
        {active && <span aria-hidden="true" className="size-1.5 flex-none rounded-full bg-accent" />}
        {heading.text}
      </a>
    );
  });
}

/** Sticky table of contents (desktop, xl and up). */
export function Toc({ headings }: { headings: Heading[] }) {
  const activeId = useActiveHeading(headings);
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Sur cette page" className="glass flex flex-col gap-0.5 rounded-[20px] p-4">
      <MetaLabel className="mb-2.5 ml-3">Sur cette page</MetaLabel>
      <TocLinks headings={headings} activeId={activeId} />
    </nav>
  );
}

/** Collapsible table of contents shown above the article below `xl`; folds away before jumping. */
export function TocDisclosure({ headings, className }: { headings: Heading[]; className?: string }) {
  const activeId = useActiveHeading(headings);
  if (headings.length === 0) return null;

  return (
    <Collapsible
      closeOnLinkClick
      className={cn("glass rounded-[20px]", className)}
      summaryClassName="px-5 py-4 pointer-coarse:py-[18px]"
      contentClassName="px-2 pb-3"
      summary={
        <>
          <MetaLabel>Sur cette page</MetaLabel>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="text-accent transition-transform duration-300 ease-glass group-data-[state=open]:rotate-180"
          />
        </>
      }
    >
      <nav aria-label="Sur cette page" className="flex flex-col gap-0.5">
        <TocLinks headings={headings} activeId={activeId} />
      </nav>
    </Collapsible>
  );
}
