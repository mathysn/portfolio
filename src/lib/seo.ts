import type { Metadata } from "next";
import { site } from "@/lib/site";

/** "NOURRY" → "Nourry": the name as people type it, alongside the CV-style capitals. */
const familyName = site.lastName.charAt(0) + site.lastName.slice(1).toLowerCase();
const plainName = `${site.firstName} ${familyName}`;
const defaultTitle = `${site.name} - ${site.role}`;

/**
 * Static share image (public/og.jpg). JPG on purpose: social networks don't render AVIF previews,
 * and WhatsApp drops images over ~600 KB (the PNG weighed 950 KB because of the grain).
 */
const shareImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.role.toLowerCase()} à ${site.city.split(",")[0]}`,
};

type PageSeo = {
  /** Page title, without the " - Mathys NOURRY" suffix. Omit on the home page. */
  title?: string;
  description: string;
  /** Path from the site root, e.g. "/projets". Becomes the canonical and og:url (made absolute by metadataBase). */
  path: string;
  type?: "website" | "article";
};

/**
 * Metadata for a page. Next replaces `openGraph` as a whole in each segment that sets it,
 * so every page gets the full object here, otherwise it inherits the home page's share card.
 */
export function pageMetadata({ title, description, path, type = "website" }: PageSeo): Metadata {
  const fullTitle = title ? `${title} - ${site.name}` : defaultTitle;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "fr_FR",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage.url] },
  };
}

/**
 * Structured data for the home page: the site belongs to this person, whose other profiles
 * are GitHub and LinkedIn (`sameAs`). It is what ties the three together in search results.
 */
export function personJsonLd() {
  const url = site.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: site.name,
        alternateName: [plainName, new URL(url).host],
        inLanguage: "fr-FR",
        publisher: { "@id": `${url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: site.name,
        alternateName: plainName,
        givenName: site.firstName,
        familyName,
        url,
        jobTitle: site.role,
        email: `mailto:${site.email}`,
        address: { "@type": "PostalAddress", addressLocality: site.city.split(",")[0], addressCountry: "FR" },
        sameAs: [site.links.github.url, site.links.linkedin.url],
      },
    ],
  };
}
