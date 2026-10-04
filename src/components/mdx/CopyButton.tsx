"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";

type CopyButtonProps = {
  /** Text to copy. Without it, copies the code of the enclosing code frame. */
  text?: string;
  size?: "sm" | "xs";
  className?: string;
};

export function CopyButton({ text, size = "sm", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy(event: MouseEvent<HTMLButtonElement>) {
    // Empty code lines are rendered as a single space — strip trailing whitespace per line.
    const value =
      text ??
      (event.currentTarget.closest("[data-code-frame]")?.querySelector("pre code")?.textContent ?? "").replace(
        /[ \t]+$/gm,
        "",
      );
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Button variant="soft" size={size} onClick={copy} className={className}>
      <span aria-live="polite" className="inline-flex items-center gap-1.5">
        {copied ? (
          <>
            Copié <Check size={size === "xs" ? 12 : 13} aria-hidden="true" />
          </>
        ) : (
          "Copier"
        )}
      </span>
    </Button>
  );
}
