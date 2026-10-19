// Identité et coordonnées — tout le contenu personnel du site est ici.
export const site = {
  name: "Mathys NOURRY",
  firstName: "Mathys",
  lastName: "NOURRY",
  brand: "mnourry.dev",
  role: "Développeur Full-Stack",
  description:
    "Je suis Mathys NOURRY, développeur Full-Stack passionné par la création d'applications. Découvrez mes projets et contactez-moi pour collaborer !",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "mathys.nourry@gmail.com",
  city: "Lyon, France",
  links: {
    github: { url: "https://github.com/mathysn", handle: "@mathysn" },
    linkedin: { url: "https://www.linkedin.com/in/mathys-nourry", handle: "/in/mathys-nourry" },
  },
} as const;

export const navLinks = [
  { href: "/projets", label: "Projets" },
  { href: "/contact", label: "Contact" },
] as const;
