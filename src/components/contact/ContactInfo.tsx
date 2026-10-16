import { ArrowUpRight, Mail } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { CopyButton } from "@/components/mdx/CopyButton";
import { MetaLabel } from "@/components/ui/Badges";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ROW_STAGGER = 70;

const rowClass = "flex items-center gap-3 px-4 py-4 not-first:border-t not-first:border-white/6 sm:gap-4 sm:px-6";

function IconBadge({ children, highlight }: { children: ReactNode; highlight?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 flex-none place-items-center rounded-xl border transition-transform duration-200 ease-glass sm:size-10",
        highlight
          ? "border-[rgb(110_230_160/.6)] bg-linear-to-b from-accent-light to-[#3fc47a] text-on-accent"
          : "border-white/10 bg-white/6 text-fg group-active:scale-95",
      )}
    >
      {children}
    </span>
  );
}

function RowText({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="min-w-0 flex-1">
      <MetaLabel>{label}</MetaLabel>
      <span className="mt-1 block text-[15px] text-fg sm:text-base">{children}</span>
    </span>
  );
}

const profiles = [
  { title: "GitHub", ...site.links.github, icon: <GithubIcon size={17} /> },
  { title: "LinkedIn", ...site.links.linkedin, icon: <LinkedinIcon size={17} /> },
];

/** Email (mailto + copy) then the GitHub and LinkedIn profiles, one row each. */
export function ContactLinks({ delay = 0, className }: { delay?: number; className?: string }) {
  const rowDelay = (i: number) => ({ "--d": `${delay + 60 + i * ROW_STAGGER}ms` }) as CSSProperties;
  const [local, domain] = site.email.split("@");

  return (
    <div
      data-reveal=""
      style={{ "--d": `${delay}ms` } as CSSProperties}
      className={cn("glass flex flex-col overflow-hidden rounded-3xl", className)}
    >
      <div data-reveal="" style={rowDelay(0)} className={rowClass}>
        <IconBadge highlight>
          <Mail size={17} />
        </IconBadge>
        <RowText label="Email">
          {/* Narrow phones: the address wraps after the @ instead of being cut. */}
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent-pale">
            {local}@<wbr />
            {domain}
          </a>
        </RowText>
        <CopyButton text={site.email} />
      </div>

      {profiles.map((profile, i) => (
        <a
          key={profile.title}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal=""
          style={rowDelay(i + 1)}
          className={cn(rowClass, "group transition-colors duration-200 hover:bg-white/4 active:bg-white/6")}
        >
          <IconBadge>{profile.icon}</IconBadge>
          <RowText label={profile.title}>
            <span className="block truncate">{profile.handle}</span>
          </RowText>
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="mr-2 flex-none text-accent-light transition-transform duration-300 ease-glass group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      ))}
    </div>
  );
}
