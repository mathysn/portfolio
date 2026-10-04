import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { SiteFooter } from "@/components/layout/Footers";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProjectHero } from "@/components/mdx/ProjectHero";
import { Toc, TocDisclosure } from "@/components/mdx/Toc";
import { CtaBanner } from "@/components/projects/CtaBanner";
import { ProjectPager } from "@/components/projects/ProjectPager";
import { getAdjacentProjects, getAllProjects, getHeadings, getProject } from "@/lib/projects";
import { cn, gutter } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: Content } = await import(`@content/projets/${slug}.mdx`);
  const headings = getHeadings(slug);
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <PageTransition>
      <main id="contenu" className={cn(gutter, "flex flex-col pt-[104px] md:pt-[152px] short:pt-20")}>
        <div data-reveal="" style={{ "--d": "80ms" } as CSSProperties}>
          <ProjectHero project={project} />
        </div>

        <div
          data-reveal=""
          style={{ "--d": "260ms" } as CSSProperties}
          // Article centered on the page; on xl the TOC sits in the right-hand column,
          // which keeps a minimum width so its entries stay on one line.
          className="grid grid-cols-1 gap-8 pt-12 md:gap-10 md:pt-[88px] xl:gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,660px)_minmax(236px,1fr)] xl:gap-x-9"
        >
          {/* Below xl the sticky TOC is hidden: a collapsible one sits above the article instead. */}
          {headings.length > 1 && (
            <TocDisclosure headings={headings} className="mx-auto w-full max-w-[660px] xl:hidden" />
          )}
          <article className="prose-glass mx-auto w-full max-w-[660px] xl:col-start-2 xl:row-start-1">
            <Content />
          </article>
          {headings.length > 1 && (
            <aside className="hidden xl:col-start-3 xl:row-start-1 xl:block xl:w-full xl:max-w-[260px] xl:justify-self-end">
              <div className="sticky top-[104px]">
                <Toc headings={headings} />
              </div>
            </aside>
          )}
        </div>

        <div className="flex flex-col gap-16 pt-16 md:gap-24 md:pt-24">
          <ProjectPager prev={prev} next={next} />
          <CtaBanner />
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
