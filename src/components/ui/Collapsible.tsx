"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const DURATION = 380;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type CollapsibleProps = {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  summaryClassName?: string;
  contentClassName?: string;
  /** Clicking a link inside collapses first, then scrolls to the link's #target. */
  closeOnLinkClick?: boolean;
};

/**
 * Native <details> (accessible, works without JS) with an animated open/close:
 * height, fade and a slight slide. Exposes `data-state="open|closed"` immediately on toggle,
 * so callers can style icons with `group-data-[state=open]:…`.
 */
export function Collapsible({
  summary,
  children,
  defaultOpen = false,
  className,
  summaryClassName,
  contentClassName,
  closeOnLinkClick = false,
}: CollapsibleProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const [expanded, setExpanded] = useState(defaultOpen);

  function animate(open: boolean, onDone?: () => void) {
    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content) return;
    setExpanded(open);

    if (reducedMotion()) {
      details.open = open;
      onDone?.();
      return;
    }

    // Start from the current height (handles toggling mid-animation).
    const from = details.open ? content.getBoundingClientRect().height : 0;
    animation.current?.cancel();
    details.open = true;
    const to = open ? content.scrollHeight : 0;

    content.style.overflow = "hidden";
    const run = content.animate(
      [
        { height: `${from}px`, opacity: open ? 0 : 1, translate: open ? "0 -6px" : "0 0" },
        { height: `${to}px`, opacity: open ? 1 : 0, translate: open ? "0 0" : "0 -6px" },
      ],
      { duration: DURATION, easing: EASE },
    );
    animation.current = run;
    run.onfinish = () => {
      content.style.overflow = "";
      animation.current = null;
      if (!open) details.open = false;
      onDone?.();
    };
  }

  function onSummaryClick(event: MouseEvent) {
    event.preventDefault();
    animate(!expanded);
  }

  function onContentClick(event: MouseEvent) {
    if (!closeOnLinkClick) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
    if (!link) return;
    event.preventDefault();
    const id = decodeURIComponent(link.hash.slice(1));
    animate(false, () => {
      history.replaceState(null, "", `#${encodeURIComponent(id)}`);
      document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
    });
  }

  return (
    <details
      ref={detailsRef}
      open={defaultOpen}
      data-state={expanded ? "open" : "closed"}
      className={cn("group", className)}
    >
      <summary
        onClick={onSummaryClick}
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-4 transition-[scale] duration-200 active:scale-[.99] active:duration-75 [&::-webkit-details-marker]:hidden",
          summaryClassName,
        )}
      >
        {summary}
      </summary>
      <div ref={contentRef} onClick={onContentClick}>
        <div className={contentClassName}>{children}</div>
      </div>
    </details>
  );
}
