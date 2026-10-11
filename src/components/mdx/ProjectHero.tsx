import { ArrowUpRight } from "lucide-react";
import { Eyebrow, MetaLabel } from "@/components/ui/Badges";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Cover } from "@/components/ui/Cover";
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

  return (
    <header className="flex flex-col gap-7 md:gap-9">
      <Breadcrumb items={[{ href: "/projets", label: "Projets" }, { label: project.title }]} />

      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
        <div className="flex flex-col gap-[18px]">
          <Eyebrow>
            {project.category} — {project.year}
          </Eyebrow>
          <h1 className="font-display text-[clamp(48px,13vw,96px)] leading-[0.9] md:text-[clamp(64px,8.4vw,120px)] tracking-[-0.02em] text-fg-strong">
            {project.title}
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.6] text-pretty text-fg-2 sm:text-[19px]">{project.summary}</p>
        </div>
        {(project.demo || project.repo) && (
          // Phones: the two buttons share the row at equal width.
          <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2.5 sm:flex sm:flex-wrap lg:justify-end">
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

      <Cover
        src={project.cover}
        alt={`Couverture de ${project.title}`}
        label={`couverture — ${project.slug}.png`}
        sizes="(min-width: 1280px) 1200px, 100vw"
        priority
        className="aspect-[2/1] rounded-[20px] max-md:aspect-[16/10] sm:rounded-3xl"
      />
    </header>
  );
}
