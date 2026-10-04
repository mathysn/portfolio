"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewTransition } from "react";
import { navLinks, site } from "@/lib/site";
import { useHideOnScroll } from "@/lib/useHideOnScroll";
import { pillTransition, useSlidingPill } from "@/lib/useSlidingPill";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** "mathys.dev" → "mathys." + green "dev". */
function Brand() {
  const dot = site.brand.lastIndexOf(".");
  return (
    <Link href="/" className="flex items-center px-3 font-display text-[19px] text-fg transition-transform duration-200 active:scale-95 sm:px-3.5 sm:text-[21px]">
      {dot === -1 ? (
        site.brand
      ) : (
        <span>
          {site.brand.slice(0, dot + 1)}
          <span className="text-accent-light">{site.brand.slice(dot + 1)}</span>
        </span>
      )}
    </Link>
  );
}

/** Floating glass pill, the same at every size. Below `lg` it slides away while scrolling down. */
export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolledAway, setScrolledAway] = useHideOnScroll({ resetKey: pathname });
  const activeHref = navLinks.find((link) => isActive(pathname, link.href))?.href;
  const { containerRef, register, pillStyle, pillVisible, pillAnimated } = useSlidingPill<
    HTMLElement,
    HTMLAnchorElement
  >(activeHref);

  // The view-transition name is only applied during navigations (React <ViewTransition>):
  // a permanent `view-transition-name` would make the header a backdrop root and kill the blur.
  return (
    <ViewTransition name="site-header">
      <header
        data-reveal-nav=""
        data-scrolled-away={scrolledAway || undefined}
        inert={onHome}
        aria-hidden={onHome || undefined}
        // Keyboard users always get the nav back.
        onFocus={() => setScrolledAway(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center px-5 pt-[max(16px,env(safe-area-inset-top))] transition-[opacity,translate] duration-400 ease-glass md:pt-[max(28px,env(safe-area-inset-top))] short:pt-[max(8px,env(safe-area-inset-top))]",
          onHome && "pointer-events-none -translate-y-3 opacity-0",
          !onHome && scrolledAway && "pointer-events-none -translate-y-full opacity-0",
        )}
      >
        <nav
          ref={containerRef}
          aria-label="Navigation principale"
          className="glass glass-strong relative flex items-center gap-0.5 rounded-full p-1.5 sm:gap-1"
        >
          <Brand />
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-white/12 sm:mx-1.5" />
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-1.5 bottom-1.5 left-0 rounded-full bg-white/9 shadow-[inset_0_1px_0_rgb(255_255_255/.1)]",
              pillAnimated && pillTransition,
              !pillVisible && "opacity-0",
            )}
            style={pillStyle}
          />
          {navLinks.map((link) => {
            const active = link.href === activeHref;
            return (
              <Link
                key={link.href}
                ref={register(link.href)}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2.5 text-sm font-medium transition-[color,scale] duration-300 active:scale-95 active:duration-75 pointer-coarse:py-3 sm:px-[18px]",
                  active ? "text-fg" : "text-fg-2 hover:text-fg",
                  // Until the sliding pill is measured (or if JS never runs), the active link fills itself.
                  active && !pillVisible && "bg-white/9 shadow-[inset_0_1px_0_rgb(255_255_255/.1)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>
    </ViewTransition>
  );
}
