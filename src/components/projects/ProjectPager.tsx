import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MetaLabel } from "@/components/ui/Badges";
import type { Project } from "@/lib/projects";

type PagerProject = Pick<Project, "slug" | "title"> | undefined;

export function ProjectPager({ prev, next }: { prev: PagerProject; next: PagerProject }) {
  // Phones: "next" comes first (the natural way to keep reading).
  return (
    <nav aria-label="Autres études de cas" className="grid gap-4 md:grid-cols-2">
      {prev ? (
        <Link
          href={`/projets/${prev.slug}`}
          className="glass flex flex-col gap-2 rounded-[22px] px-5 py-5 sm:px-7 sm:py-6 transition-transform duration-300 hover:-translate-x-[3px] active:scale-[.98] active:duration-100"
        >
          <MetaLabel className="inline-flex items-center gap-1.5">
            <ArrowLeft size={11} aria-hidden="true" /> Projet précédent
          </MetaLabel>
          <span className="font-display text-[28px] leading-none sm:text-[34px] text-fg-strong">{prev.title}</span>
        </Link>
      ) : (
        <span className="hidden md:block" />
      )}
      {next && (
        <Link
          href={`/projets/${next.slug}`}
          className="glass flex flex-col items-end gap-2 rounded-[22px] max-md:order-first px-5 py-5 sm:px-7 sm:py-6 text-right transition-transform duration-300 hover:translate-x-[3px] active:scale-[.98] active:duration-100"
        >
          <MetaLabel className="inline-flex items-center gap-1.5">
            Projet suivant <ArrowRight size={11} aria-hidden="true" />
          </MetaLabel>
          <span className="font-display text-[28px] leading-none sm:text-[34px] text-fg-strong">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
