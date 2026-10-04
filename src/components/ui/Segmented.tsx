"use client";

import { useRef, type KeyboardEvent } from "react";
import { pillTransition, useSlidingPill } from "@/lib/useSlidingPill";
import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string };

type SegmentedProps<T extends string> = {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
};

const activeFill =
  "bg-linear-to-b from-accent-light to-[#56d68d] shadow-[inset_0_1px_0_rgb(255_255_255/.6),0_4px_14px_-4px_rgb(80_214_140/.6)]";

/** Glass segmented control — a green gradient pill slides to the active option. */
export function Segmented<T extends string>({ options, value, onChange, label, className }: SegmentedProps<T>) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const { containerRef, register, pillStyle, pillVisible, pillAnimated } = useSlidingPill<
    HTMLDivElement,
    HTMLButtonElement
  >(value);

  function onKeyDown(event: KeyboardEvent, index: number) {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + options.length) % options.length;
    onChange(options[next].value);
    buttons.current[next]?.focus();
  }

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={label}
      className={cn("glass flex w-max gap-0.5 rounded-full p-[5px]", className)}
    >
      <span
        aria-hidden="true"
        style={pillStyle}
        className={cn(
          "absolute top-[5px] bottom-[5px] left-0 rounded-full",
          activeFill,
          pillAnimated && pillTransition,
          !pillVisible && "opacity-0",
        )}
      />
      {options.map((option, i) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              buttons.current[i] = el;
              register(option.value)(el);
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "relative rounded-full px-3.5 py-[9px] text-sm font-medium whitespace-nowrap transition-[color,scale] duration-300 active:scale-95 active:duration-75 pointer-coarse:py-3 sm:px-[18px]",
              active ? "text-on-accent" : "text-muted hover:text-fg",
              // Until the sliding pill is measured (or if JS never runs), the active option fills itself.
              active && !pillVisible && activeFill,
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
