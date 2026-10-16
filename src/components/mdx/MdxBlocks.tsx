import { ArrowUpRight, Check, Info, Link2, Minus, Plus, Star, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { MetaLabel, TagList } from "@/components/ui/Badges";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Collapsible } from "@/components/ui/Collapsible";
import { Cover } from "@/components/ui/Cover";
import { Zoomable } from "@/components/ui/Zoomable";
import { cn } from "@/lib/utils";

/* ── Callout ─────────────────────────────────────────────── */

const calloutStyles = {
  info: {
    box: "border-white/10 bg-white/4",
    icon: "bg-white/10 text-fg",
    Icon: Info,
  },
  success: {
    box: "border-accent/25 bg-accent/7",
    icon: "bg-accent text-on-accent",
    Icon: Check,
  },
  warning: {
    box: "border-warning/25 bg-warning/7",
    icon: "bg-warning text-[#1a1303]",
    Icon: TriangleAlert,
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
}) {
  const { box, icon, Icon } = calloutStyles[type];
  return (
    <aside
      className={cn(
        "my-2 flex gap-3.5 rounded-2xl border px-4 py-4 shadow-[inset_0_1px_0_rgb(255_255_255/.06)] sm:px-5 sm:py-[18px]",
        box,
      )}
    >
      <span aria-hidden="true" className={cn("grid size-[26px] flex-none place-items-center rounded-full", icon)}>
        <Icon size={14} strokeWidth={2.25} />
      </span>
      <div className="min-w-0">
        {title && <p className="text-[15px] font-medium text-fg">{title}</p>}
        <div className={cn("text-sm leading-[1.6] text-muted [&_p+p]:mt-2", title && "mt-1")}>{children}</div>
      </div>
    </aside>
  );
}

/* ── Figure ──────────────────────────────────────────────── */

export function Figure({
  src,
  alt,
  caption,
  label,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  /** Placeholder caption shown while there is no image. */
  label?: string;
}) {
  const cover = (
    <Cover
      src={src}
      alt={alt ?? caption ?? ""}
      label={label ?? "capture"}
      sizes="(min-width: 1280px) 720px, 100vw"
      className="aspect-[16/10]"
    />
  );
  return (
    <figure className="my-2 flex flex-col gap-3">
      {src ? (
        <Zoomable src={src} alt={alt ?? caption ?? ""} caption={caption}>
          {cover}
        </Zoomable>
      ) : (
        cover
      )}
      {caption && <figcaption className="font-mono text-[13px] text-faint">{caption}</figcaption>}
    </figure>
  );
}

/* ── Stats ───────────────────────────────────────────────── */

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="glass my-2 flex flex-col rounded-[20px]">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-row-reverse items-baseline justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5",
            i > 0 && "border-t border-white/6",
          )}
        >
          <dt className="text-right text-sm text-muted">{item.label}</dt>
          <dd className="font-display text-[36px] leading-none text-accent-light sm:text-[44px]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ── TechStack ───────────────────────────────────────────── */

export function TechStack({ groups }: { groups: { label: string; items: string[] }[] }) {
  return (
    <div className="my-2 flex flex-col gap-[18px]">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <MetaLabel>{group.label}</MetaLabel>
          <TagList items={group.items} />
        </div>
      ))}
    </div>
  );
}

/* ── Steps ───────────────────────────────────────────────── */

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="my-2 flex flex-col [counter-reset:step]">{children}</ol>;
}

/** Numbered with a CSS counter; the last step is green and has no connector. */
export function Step({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <li className="group/step flex [counter-increment:step]">
      <span
        aria-hidden="true"
        className="relative z-[1] grid size-9 flex-none place-items-center rounded-full border border-white/14 bg-[#0d1310] font-mono text-xs font-medium text-fg before:content-[counter(step,decimal-leading-zero)] group-last/step:border-[rgb(110_230_160/.6)] group-last/step:bg-linear-to-b group-last/step:from-accent-light group-last/step:to-[#3fc47a] group-last/step:text-on-accent"
      />
      <div className="-ml-[18px] border-l border-white/12 pt-1.5 pb-[26px] pl-[34px] group-last/step:border-transparent">
        <p className="text-[15px] font-medium text-fg">{title}</p>
        {children && <div className="mt-1 text-sm leading-[1.6] text-muted">{children}</div>}
      </div>
    </li>
  );
}

/* ── Quote ───────────────────────────────────────────────── */

export function Quote({ author, role, children }: { author: string; role?: string; children: ReactNode }) {
  return (
    <figure className="glass my-2 flex flex-col gap-5 rounded-3xl p-5 sm:p-7">
      <span aria-hidden="true" className="h-7 font-display text-[72px] leading-[0.5] text-accent">
        “
      </span>
      <blockquote className="font-display text-[22px] leading-[1.3] sm:text-[26px] text-fg italic [&_p]:font-[inherit] [&_p]:text-inherit">
        {children}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-10 rounded-full border border-white/12 bg-[repeating-linear-gradient(135deg,rgb(255_255_255/.06)_0_1px,transparent_1px_6px),rgb(255_255_255/.05)]"
        />
        <span>
          <span className="block text-sm font-medium text-fg">{author}</span>
          {role && <span className="block text-[13px] text-faint">{role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

/* ── LinkCard ────────────────────────────────────────────── */

export function LinkCard({
  href,
  title,
  meta,
  stars,
}: {
  href: string;
  title: string;
  meta?: string;
  stars?: number;
}) {
  const isGithub = href.includes("github.com");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass my-2 flex items-center gap-3.5 rounded-[18px] p-4 text-fg transition-transform duration-300 hover:-translate-y-0.5 active:scale-[.98] active:duration-100"
    >
      <span className="grid size-10 flex-none place-items-center rounded-xl border border-white/10 bg-white/6">
        {isGithub ? <GithubIcon size={18} /> : <Link2 size={18} aria-hidden="true" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium text-fg">{title}</span>
        {(meta || stars != null) && (
          <span className="mt-[3px] flex items-center gap-1.5 font-mono text-xs text-faint">
            {meta}
            {meta && stars != null && " · "}
            {stars != null && (
              <>
                <Star size={12} aria-hidden="true" />
                <span>
                  {stars.toLocaleString("fr-FR")}
                  <span className="sr-only"> étoiles</span>
                </span>
              </>
            )}
          </span>
        )}
      </span>
      <ArrowUpRight size={16} aria-hidden="true" className="flex-none text-accent-light" />
    </a>
  );
}

/* ── Accordion ───────────────────────────────────────────── */

export function Accordion({ children }: { children: ReactNode }) {
  return <div className="glass my-2 flex flex-col rounded-[18px]">{children}</div>;
}

export function AccordionItem({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <Collapsible
      defaultOpen={open}
      className="px-5 py-4 not-first:border-t not-first:border-white/6"
      summaryClassName="text-[15px] font-medium text-fg"
      contentClassName="pt-2.5 text-sm leading-[1.6] text-muted"
      summary={
        <>
          {title}
          {/* Plus turns into minus: crossfade + quarter turn. */}
          <span aria-hidden="true" className="relative grid size-[18px] flex-none place-items-center text-accent">
            <Plus
              size={18}
              className="absolute transition-[rotate,opacity] duration-300 ease-glass group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0"
            />
            <Minus
              size={18}
              className="absolute -rotate-90 opacity-0 transition-[rotate,opacity] duration-300 ease-glass group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100"
            />
          </span>
        </>
      }
    >
      {children}
    </Collapsible>
  );
}
