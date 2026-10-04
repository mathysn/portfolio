import { ArrowUpRight, Download, FileText } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { CopyButton } from "@/components/mdx/CopyButton";
import { MetaLabel, PulseDot } from "@/components/ui/Badges";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function InfoRow({ label, children, action }: { label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 not-first:border-t not-first:border-white/6 sm:px-6">
      <div className="min-w-0">
        <MetaLabel>{label}</MetaLabel>
        <div className="mt-1.5 flex items-center gap-2.5 text-base break-words text-fg">{children}</div>
      </div>
      {action}
    </div>
  );
}

export function InfoPanel({ style }: { style?: CSSProperties }) {
  return (
    <div data-reveal="" style={style} className="glass flex flex-col rounded-3xl">
      <InfoRow label="Email" action={<CopyButton text={site.email} />}>
        <a href={`mailto:${site.email}`} className="min-w-0 truncate transition-colors hover:text-accent-pale">
          {site.email}
        </a>
      </InfoRow>
      <InfoRow label="Localisation">{site.location}</InfoRow>
      <InfoRow label="Disponibilité">
        {site.availability.open && <PulseDot />}
        {site.availability.detail}
      </InfoRow>
    </div>
  );
}

type Tile = { href: string; title: string; meta: string; icon: ReactNode; trailing: ReactNode; highlight?: boolean };

const TILE_STAGGER = 60;

const tiles: Tile[] = [
  {
    href: site.links.github.url,
    title: "GitHub",
    meta: site.links.github.handle,
    icon: <GithubIcon size={17} />,
    trailing: <ArrowUpRight size={13} aria-hidden="true" />,
  },
  {
    href: site.links.linkedin.url,
    title: "LinkedIn",
    meta: site.links.linkedin.handle,
    icon: <LinkedinIcon size={17} />,
    trailing: <ArrowUpRight size={13} aria-hidden="true" />,
  },
  {
    href: site.links.cv.url,
    title: "Mon CV",
    meta: site.links.cv.meta,
    icon: <FileText size={17} aria-hidden="true" />,
    trailing: <Download size={13} aria-hidden="true" />,
    highlight: true,
  },
];

/** Compact horizontal tiles; on the contact page they sit at the bottom, level with the form. */
export function LinkTiles({ delay = 0 }: { delay?: number }) {
  return (
    // Phones: three compact tiles (icon + title). Desktop: level with the form's bottom edge.
    <div className="grid grid-cols-3 gap-2 sm:gap-3 fit:mt-auto">
      {tiles.map((tile, i) => {
        const external = tile.href.startsWith("http");
        return (
          <a
            key={tile.title}
            href={tile.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            download={tile.highlight || undefined}
            title={`${tile.title} — ${tile.meta}`}
            data-reveal=""
            style={{ "--d": `${delay + i * TILE_STAGGER}ms` } as CSSProperties}
            className="glass flex flex-col items-center gap-2 rounded-[18px] p-3 text-center text-fg transition-transform duration-300 ease-glass hover:-translate-y-[3px] active:scale-95 active:duration-100 sm:flex-row sm:gap-3 sm:text-left"
          >
            <span
              className={cn(
                "grid size-9 flex-none place-items-center rounded-xl border",
                tile.highlight
                  ? "border-[rgb(110_230_160/.6)] bg-linear-to-b from-accent-light to-[#3fc47a] text-on-accent"
                  : "border-white/10 bg-white/6 text-fg",
              )}
            >
              {tile.icon}
            </span>
            <span className="min-w-0">
              <span className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-fg sm:justify-start sm:text-sm">
                {tile.title}
                <span className="text-accent-light">{tile.trailing}</span>
              </span>
              <span className="mt-0.5 block truncate font-mono text-[11px] text-faint max-sm:sr-only">{tile.meta}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
