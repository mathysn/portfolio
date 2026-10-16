import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Eyebrow, MetaLabel } from "@/components/ui/Badges";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Cover } from "@/components/ui/Cover";
import { Zoomable } from "@/components/ui/Zoomable";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Case-study header, rendered from the project's frontmatter. */
export function ProjectHero({ project }: { project: Project }) {
  const meta = [
    { label: "Rôle", value: project.role },
    { label: "Période", value: project.period },
    { label: "Équipe", value: project.team },
    { label: "Stack", value: project.stack.slice(0, 3).join(" · ") },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  const cover = (
    <Cover
      src={project.cover}
      alt={`Couverture de ${project.title}`}
      label={`couverture — ${project.slug}.png`}
      sizes="(min-width: 1280px) 1200px, 100vw"
      priority
      className="aspect-[2/1] rounded-[20px] max-md:aspect-[16/10] sm:rounded-3xl"
    />
  );

  return (
    <header className="@container flex flex-col gap-7 md:gap-9">
      <Breadcrumb items={[{ href: "/projets", label: "Projets" }, { label: project.title }]} />

      <div className="grid grid-cols-1 items-end gap-x-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* Desktop: the title spans both columns and stays on one line, shrinking with its length if needed. */}
        <div className="flex flex-col gap-[18px] lg:col-span-2">
          <Eyebrow>
            {project.category} — {project.year}
          </Eyebrow>
          <h1
            style={{ "--chars": project.title.length } as CSSProperties}
            className="font-display text-[clamp(48px,13vw,96px)] leading-[0.9] md:text-[clamp(64px,8.4vw,120px)] lg:text-[length:min(clamp(64px,8.4vw,120px),calc(100cqi/(var(--chars)*0.4)))] lg:whitespace-nowrap tracking-[-0.02em] text-fg-strong"
          >
            {project.title}
          </h1>
        </div>
        <p className="mt-[18px] max-w-[560px] text-[17px] leading-[1.6] text-pretty text-fg-2 sm:text-[19px]">{project.summary}</p>
        {(project.demo || project.repo) && (
          // Phones: the two buttons share the row at equal width.
          <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2.5 sm:flex sm:flex-wrap lg:mt-0 lg:justify-end">
            {project.demo && (
              <Button
                href={project.demo}
                size="hero"
                icon={<ArrowUpRight size={18} />}
                className="justify-between max-sm:h-12 max-sm:text-sm"
              >
                {project.demoLabel === "Démo" ? "Voir la démo" : project.demoLabel}
              </Button>
            )}
            {project.repo && (
              <Button href={project.repo} variant="glass" size="hero" className="justify-center max-sm:h-12 max-sm:text-sm">
                Code source
              </Button>
            )}
          </div>
        )}
      </div>

      <dl
        className={cn(
          "glass-grid grid-cols-2 max-lg:[&>:last-child:nth-child(odd)]:col-span-2",
          meta.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {meta.map((item) => (
          <div key={item.label} className="px-4 py-3.5 sm:px-[22px] sm:py-[18px]">
            <dt>
              <MetaLabel>{item.label}</MetaLabel>
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-fg-soft">{item.value}</dd>
          </div>
        ))}
      </dl>

      {project.cover ? (
        <Zoomable src={project.cover} alt={`Couverture de ${project.title}`} className="rounded-[20px] sm:rounded-3xl">
          {cover}
        </Zoomable>
      ) : (
        cover
      )}
    </header>
  );
}
