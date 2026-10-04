"use client";

import { cn } from "@/lib/utils";

type ChipGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  /** Name of the hidden input carrying the value in form submissions. */
  name?: string;
};

/** Single-select pills (contact subject). */
export function ChipGroup<T extends string>({ label, options, value, onChange, name }: ChipGroupProps<T>) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-[13px] font-medium text-fg-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cn(
                "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-all duration-200 active:scale-95 active:duration-75 pointer-coarse:h-11",
                active
                  ? "border-accent/60 bg-accent/12 text-accent-pale shadow-[0_0_0_3px_rgb(98_220_148/.10),inset_0_1px_0_rgb(255_255_255/.08)]"
                  : "border-white/10 bg-white/4 text-fg-2 hover:border-white/18 hover:text-fg",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {name && <input type="hidden" name={name} value={value} />}
    </fieldset>
  );
}
