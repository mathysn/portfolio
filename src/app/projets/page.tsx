import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { SiteFooter } from "@/components/layout/Footers";
import { PageTransition } from "@/components/layout/PageTransition";
import { CtaBanner } from "@/components/projects/CtaBanner";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { Eyebrow } from "@/components/ui/Badges";
import { getAllProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { cn, gutter, pad2 } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Projets",
  description: "Applications web, API et outils open source, du plus récent au plus ancien.",
  path: "/projets",
});

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageTransition>
      <main id="contenu" className="flex flex-col pt-[112px] md:pt-[168px] short:pt-20">
        <header className={cn(gutter, "flex flex-col gap-5")}>
          <Eyebrow>
            <span data-reveal="" className="inline-block" style={delay(80)}>
              Projets — {pad2(projects.length)}
            </span>
          </Eyebrow>
          <h1
            data-reveal=""
            style={delay(140)}
            className="font-display text-[clamp(44px,11vw,108px)] md:text-[clamp(56px,7.5vw,108px)] leading-[0.95] tracking-[-0.02em] text-fg-strong"
          >
            Projets <em className="pr-[.06em] text-accent-light">récents</em>
          </h1>
        </header>

        <ProjectsExplorer projects={projects} />

        <div data-reveal="" style={delay(900)} className={cn(gutter, "pt-16 md:pt-24")}>
          <CtaBanner />
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
