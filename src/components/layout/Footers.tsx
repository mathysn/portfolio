import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { cn, gutter } from "@/lib/utils";

const year = new Date().getFullYear();

function SocialPill({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-pill inline-flex h-9 items-center gap-1 rounded-full px-3.5 font-sans text-[13px] font-medium"
    >
      {children}
    </a>
  );
}

/** Home footer: copyright + social pills. */
export function HomeFooter() {
  return (
    <footer className="flex flex-col-reverse items-center gap-4 px-5 pb-[max(32px,env(safe-area-inset-bottom))] font-mono text-[13px] text-faint md:flex-row md:justify-between md:px-12 short:pb-4">
      <span>
        © {year} — {site.city}
      </span>
      <div className="flex gap-2">
        <SocialPill href={site.links.github.url}>
          GitHub <ArrowUpRight size={13} />
        </SocialPill>
        <SocialPill href={site.links.linkedin.url}>
          LinkedIn <ArrowUpRight size={13} />
        </SocialPill>
      </div>
    </footer>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        gutter,
        "flex flex-col gap-2 pt-16 pb-[max(40px,env(safe-area-inset-bottom))] font-mono text-[13px] text-faint sm:flex-row sm:justify-between",
        className,
      )}
    >
      <span>
        © {year} {site.name}
      </span>
      <span>Conçu &amp; développé à {site.city.split(",")[0]}</span>
    </footer>
  );
}
