import { Activity, ArrowUpRight, Bot, Globe, Puzzle, Server, Terminal, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Category, TagList } from "@/components/ui/Badges";
import { Cover } from "@/components/ui/Cover";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  cli: Terminal,
  api: Server,
  web: Globe,
  extension: Puzzle,
  data: Activity,
  devops: Bot,
};

function CategoryIcon({ category }: { category: string }) {
  const Icon = categoryIcons[category.toLowerCase()] ?? Globe;
  return <Icon size={12} aria-hidden="true" />;
}

/**
 * Project card; the whole card links to the case study.
 * Featured projects span two columns: cover on top below `lg`, on the left from `lg`.
 */
export function ProjectCard({ project, style }: { project: Project; style?: CSSProperties }) {
  return (
    <article
      data-reveal=""
      style={style}
      className={cn(
        "glass group flex flex-col rounded-[22px] transition-transform duration-300 ease-glass hover:-translate-y-[3px] active:scale-[.985] active:duration-100",
        project.featured && "md:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]",
      )}
    >
      {project.featured && (
        <div className="p-2 pb-0 lg:pr-0 lg:pb-2">
          <Cover
            src={project.thumbnail ?? project.cover}
            alt={`Aperçu de ${project.title}`}
            label={`capture — ${project.slug}.png`}
            sizes="(min-width: 1280px) 440px, (min-width: 1024px) 50vw, 100vw"
            className="aspect-[16/10] rounded-[16px] md:aspect-[21/9] lg:aspect-auto lg:h-full lg:min-h-[236px]"
          />
        </div>
      )}

      <div className="flex min-h-[220px] flex-1 flex-col gap-4 p-5 sm:min-h-[236px] sm:p-6">
        <div className="flex items-center justify-between">
          <Category icon={<CategoryIcon category={project.category} />}>{project.category}</Category>
          <span
            aria-hidden="true"
            className="btn-icon size-[38px] group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
          >
            <ArrowUpRight size={15} />
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-display text-[30px] leading-[1.05] text-fg-strong">
            <Link
              href={`/projets/${project.slug}`}
              className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']"
            >
              {project.title}
            </Link>
          </h2>
          {/* From `md` the cards sit side by side: two lines keep the rows level. */}
          <p className="text-sm leading-[1.55] text-pretty text-muted md:line-clamp-2">{project.summary}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/6 pt-4">
          <TagList items={project.stack.slice(0, 2)} />
          <span className="font-mono text-xs text-faint">{project.year}</span>
        </div>
      </div>
    </article>
  );
}
