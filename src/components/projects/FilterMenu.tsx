"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { MetaLabel } from "@/components/ui/Badges";
import { cn } from "@/lib/utils";

type Option<T extends string> = { value: T; label: string; count: number };

type FilterMenuProps<T extends string> = {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
};

/**
 * Phone filter: a glass trigger showing the current choice, opening an animated menu
 * (fade + scale, staggered items). Closes on selection, outside tap and Escape.
 */
export function FilterMenu<T extends string>({ options, value, onChange, label, className }: FilterMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // Escape closes the menu wherever focus is (trigger or items).
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    // Focus the selected item once the menu is visible.
    const index = options.findIndex((o) => o.value === value);
    const id = requestAnimationFrame(() => itemRefs.current[index]?.focus({ preventScroll: true }));
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(id);
    };
  }, [open, options, value]);

  function close(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus({ preventScroll: true });
  }

  function onMenuKeyDown(event: KeyboardEvent) {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      items[(index + delta + items.length) % items.length]?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative z-20", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className="glass flex h-[52px] w-full items-center gap-3 rounded-full pr-1.5 pl-5 text-left transition-[scale] duration-200 active:scale-[.98] active:duration-75"
      >
        <MetaLabel>{label}</MetaLabel>
        <span className="flex min-w-0 flex-1 items-center gap-2 text-[15px] font-medium text-fg">
          <span className="truncate">{current.label}</span>
          <span className="font-mono text-xs text-faint">{current.count}</span>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-10 flex-none place-items-center rounded-full border transition-[background-color,border-color,color] duration-300",
            open ? "border-accent bg-accent text-on-accent" : "border-white/10 bg-white/5 text-fg-soft",
          )}
        >
          <ChevronDown size={16} className={cn("transition-transform duration-300 ease-glass", open && "rotate-180")} />
        </span>
      </button>

      <div
        id={menuId}
        role="menu"
        aria-label={label}
        onKeyDown={onMenuKeyDown}
        className={cn(
          "glass glass-strong absolute inset-x-0 top-full mt-2 origin-top rounded-[26px] p-1.5 transition-[opacity,scale,translate,visibility] duration-300 ease-glass",
          open ? "visible opacity-100" : "invisible -translate-y-2 scale-[.97] opacity-0",
        )}
      >
        {options.map((option, i) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={selected}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                onChange(option.value);
                close();
              }}
              // Items cascade in when the menu opens.
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" } as CSSProperties}
              className={cn(
                "flex h-12 w-full items-center justify-between rounded-[20px] px-4 text-[15px] font-medium transition-[opacity,translate,scale,background-color,color] duration-300 ease-glass active:scale-[.98] active:duration-75",
                open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
                selected
                  ? "bg-linear-to-b from-accent-light to-[#56d68d] text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/.6)]"
                  : "text-fg-2 hover:bg-white/6 hover:text-fg",
              )}
            >
              {option.label}
              <span className="flex items-center gap-2">
                <span className={cn("font-mono text-xs", selected ? "text-on-accent/70" : "text-faint")}>
                  {option.count}
                </span>
                {selected && <Check size={16} aria-hidden="true" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
