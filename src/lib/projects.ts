import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projets");

export const projectKinds = ["web", "api", "mobile", "oss"] as const;
export type ProjectKind = (typeof projectKinds)[number];

const withProtocol = (url: string) => (/^https?:\/\//.test(url) ? url : `https://${url}`);

const frontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  category: z.string(),
  /** Filtre de la page Projets (Web / API / Mobile / Open source). */
  kind: z.array(z.enum(projectKinds)).min(1),
  featured: z.boolean().default(false),
  year: z.number().int(),
  role: z.string(),
  period: z.string(),
  team: z.string().optional(),
  stack: z.array(z.string()).min(1),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  cover: z.string().optional(),
  /** Image de la carte phare sur /projets ; à défaut, `cover`. */
  thumbnail: z.string().optional(),
  demo: z.string().transform(withProtocol).optional(),
  demoLabel: z.string().default("Démo"),
  repo: z.string().transform(withProtocol).optional(),
});

export type Project = z.infer<typeof frontmatterSchema> & { slug: string };
export type Heading = { id: string; text: string; level: 2 | 3 };

function readSource(slug: string) {
  return fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), "utf8");
}

function parseProject(slug: string): Project {
  const { data } = matter(readSource(slug));
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Frontmatter invalide dans content/projets/${slug}.mdx :\n${z.prettifyError(parsed.error)}`);
  }
  return { ...parsed.data, slug };
}

/** Tous les projets, du plus récent au plus ancien (phares d'abord à année égale, puis par titre). */
export const getAllProjects = cache((): Project[] =>
  fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parseProject(file.replace(/\.mdx$/, "")))
    .sort(
      (a, b) =>
        b.year - a.year || Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title, "fr"),
    ),
);

export function getProject(slug: string) {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const ordered = getAllProjects();
  const i = ordered.findIndex((p) => p.slug === slug);
  return { prev: ordered[i - 1], next: ordered[i + 1] };
}

const stripInlineMarkdown = (text: string) =>
  text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~]/g, "")
    .trim();

/**
 * Titres ## et ### du corps MDX, avec les mêmes ids que rehype-slug
 * (même slugger, appliqué à tous les niveaux dans l'ordre).
 */
export const getHeadings = cache((slug: string): Heading[] => {
  const { content } = matter(readSource(slug));
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of content.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = stripInlineMarkdown(match[2]);
    const id = slugger.slug(text);
    const level = match[1].length;
    if (level === 2 || level === 3) headings.push({ id, text, level });
  }
  return headings;
});
