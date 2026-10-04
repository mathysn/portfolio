import { ViewTransition, type ReactNode } from "react";

/**
 * Crossfades page content on navigation (CSS: ::view-transition-*(.page-in/.page-out)).
 * Must wrap each page — layouts persist, so enter/exit never fire there.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
