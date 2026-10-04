"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Shared "active pill" for link groups (navbar, filters): one absolutely positioned
 * element measured onto the active item, so it slides when the active key changes.
 *
 * Usage: put `containerRef` on a `relative` container, `register(key)` as each item's ref,
 * and spread `pillStyle` / `pillVisible` / `pillAnimated` on the pill element.
 */
export function useSlidingPill<C extends HTMLElement, I extends HTMLElement>(activeKey: string | undefined) {
  const containerRef = useRef<C>(null);
  const items = useRef(new Map<string, I>());
  const [rect, setRect] = useState<{ x: number; width: number } | null>(null);
  // No slide on first placement — the pill just appears where it belongs.
  const [animated, setAnimated] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = () => {
      const item = activeKey ? items.current.get(activeKey) : undefined;
      if (!container || !item) return setRect(null);
      // offsetLeft is relative to the container and ignores its scroll position.
      setRect({ x: item.offsetLeft, width: item.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (container) observer.observe(container);
    return () => observer.disconnect();
  }, [activeKey]);

  useEffect(() => {
    if (!rect || animated) return;
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, [rect, animated]);

  const register = (key: string) => (el: I | null) => {
    if (el) items.current.set(key, el);
    else items.current.delete(key);
  };

  const pillStyle: CSSProperties | undefined = rect ? { translate: `${rect.x}px 0`, width: rect.width } : undefined;

  return { containerRef, register, pillStyle, pillVisible: rect !== null, pillAnimated: animated };
}

/** Transition classes for the pill element. */
export const pillTransition = "transition-[translate,width,opacity] duration-[450ms] ease-glass";
