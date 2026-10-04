import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projets", "/contact"].map((path) => ({ url: `${site.url}${path}` }));
  const projects = getAllProjects().map((project) => ({ url: `${site.url}/projets/${project.slug}` }));
  return [...pages, ...projects];
}
