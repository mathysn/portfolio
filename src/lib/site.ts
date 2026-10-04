// Identité et coordonnées — tout le contenu personnel du site est ici.
export const site = {
  name: "Mathys NOURRY",
  firstName: "Mathys",
  lastName: "NOURRY",
  /** Marque affichée dans la nav. */
  brand: "mathys.dev",
  role: "Développeur Full-Stack",
  description:
    "Portfolio de Mathys NOURRY, développeur full-stack à Lyon : applications web, API et outils open source, du schéma de base de données à l'interface.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "mathys.nourry@gmail.com",
  city: "Lyon, France",
  location: "Lyon, France",
  availability: {
    open: true,
    detail: "À partir de novembre 2026",
  },
  links: {
    github: { url: "https://github.com/mathysn", handle: "@mathysn" },
    linkedin: { url: "https://www.linkedin.com/in/mathys-nourry", handle: "/in/mathys-nourry" },
    cv: { url: "/cv.pdf", meta: "PDF · 180 Ko" },
  },
} as const;

export const navLinks = [
  { href: "/projets", label: "Projets" },
  { href: "/contact", label: "Contact" },
] as const;
