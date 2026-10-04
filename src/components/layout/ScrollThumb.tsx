"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

const MIN_THUMB = 40;
const IDLE_MS = 1000;

/**
 * Overlay scrollbar: the native one is hidden (globals.css) so pages never shift
 * between scrolling and non-scrolling routes. Native scrolling is untouched; this
 * thumb only mirrors it and can be dragged.
 */
export function ScrollThumb() {
  const [thumb, setThumb] = useState<{ top: number; height: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const idle = useRef<number | undefined>(undefined);
  const drag = useRef<{ startY: number; startScroll: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const { scrollHeight } = document.documentElement;
      const viewport = window.innerHeight;
      if (scrollHeight <= viewport + 1) return setThumb(null);
      const height = Math.max(MIN_THUMB, (viewport / scrollHeight) * viewport);
      const top = (window.scrollY / (scrollHeight - viewport)) * (viewport - height);
      setThumb({ top, height });
    };
    const onScroll = () => {
      update();
      setVisible(true);
      window.clearTimeout(idle.current);
      idle.current = window.setTimeout(() => setVisible(false), IDLE_MS);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    // Animated transforms change the scrollable area without resizing <body>.
    document.addEventListener("animationend", update);
    document.addEventListener("transitionend", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      document.removeEventListener("animationend", update);
      document.removeEventListener("transitionend", update);
      window.clearTimeout(idle.current);
    };
  }, []);

  if (!thumb) return null;

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { startY: event.clientY, startScroll: window.scrollY };
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !thumb) return;
    const { scrollHeight } = document.documentElement;
    const viewport = window.innerHeight;
    const ratio = (scrollHeight - viewport) / (viewport - thumb.height);
    window.scrollTo({ top: drag.current.startScroll + (event.clientY - drag.current.startY) * ratio, behavior: "instant" });
  }

  function onPointerUp() {
    drag.current = null;
    setDragging(false);
  }

  return (
    <div
      aria-hidden="true"
      data-scroll-thumb=""
      className="group fixed top-0 right-0 bottom-0 z-[60] w-3.5 pointer-coarse:hidden"
      onPointerEnter={() => setVisible(true)}
      onPointerLeave={() => !dragging && setVisible(false)}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ height: thumb.height, translate: `0 ${thumb.top}px` }}
        className={cn(
          "absolute top-0 right-1 w-1.5 cursor-grab rounded-full bg-accent/35 transition-[opacity,width,background-color] duration-300 group-hover:w-2 group-hover:bg-accent/55",
          dragging && "w-2 cursor-grabbing bg-accent/60",
          visible || dragging ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
