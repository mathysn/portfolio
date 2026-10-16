"use client";

import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ZoomableProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  /** The framed (cropped) image that opens the lightbox. */
  children: ReactNode;
};

/**
 * Wraps an image frame in a button that opens it full-screen in a native <dialog>
 * (Escape, focus trap and top layer for free). The full image is only fetched once opened.
 */
export function Zoomable({ src, alt, caption, className, children }: ZoomableProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={`Agrandir l'image : ${alt}`}
        className={cn(
          "group/zoom relative block w-full cursor-zoom-in rounded-[18px] text-left transition-transform duration-300 ease-glass active:scale-[.99] active:duration-100",
          className,
        )}
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 inline-flex size-8 items-center justify-center rounded-full border border-white/14 bg-bg/45 text-fg backdrop-blur-md transition-[opacity,translate] duration-300 ease-glass pointer-fine:translate-y-1 pointer-fine:opacity-0 pointer-fine:group-hover/zoom:translate-y-0 pointer-fine:group-hover/zoom:opacity-100 pointer-fine:group-focus-visible/zoom:translate-y-0 pointer-fine:group-focus-visible/zoom:opacity-100"
        >
          <Maximize2 size={14} strokeWidth={2} />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={alt}
        data-lightbox
        // Any click (image, caption or backdrop) zooms back out.
        onClick={() => dialogRef.current?.close()}
        className="lightbox m-0 h-dvh border-0 max-h-none w-full max-w-none cursor-zoom-out bg-transparent p-0 text-fg"
      >
        <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-16 sm:px-8 sm:gap-4">
          {opened && (
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1000}
              sizes="92vw"
              className="lightbox-img h-auto max-h-[calc(100dvh-160px)] w-auto max-w-full rounded-[18px] border border-white/10 shadow-[0_30px_80px_-20px_rgb(0_0_0/.8)]"
            />
          )}
          {caption && (
            <p className="max-w-180 text-center font-mono text-[13px] text-fg-dim">{caption}</p>
          )}
        </div>
        {/* .glass forces position: relative, so the positioning lives on a wrapper. */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <button
            type="button"
            aria-label="Fermer"
            className="glass glass-strong btn-glass grid size-11 place-items-center rounded-full"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}
