import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactCard } from "@/components/contact/ContactForm";
import { InfoPanel, LinkTiles } from "@/components/contact/ContactInfo";
import { SiteFooter } from "@/components/layout/Footers";
import { PageTransition } from "@/components/layout/PageTransition";
import { Eyebrow } from "@/components/ui/Badges";
import { cn, gutter } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une mission freelance, un poste ou une question : écrivez-moi, je réponds sous 48 h.",
};

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Phones/tablets: intro → form → contact details (DOM order = reading order).
 * Desktop (xl): intro and details on the left, the form spanning both rows on the right.
 * On `fit` screens (desktop, ≥ 760px tall) the whole page holds in the viewport.
 */
export default function ContactPage() {
  return (
    <PageTransition>
      <div className="flex min-h-dvh flex-col fit:h-dvh">
        <main
          id="contenu"
          className={cn(
            gutter,
            "grid flex-1 grid-cols-1 content-start gap-10 pt-[112px] md:pt-[136px] short:pt-20 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:grid-rows-[auto_1fr] xl:gap-x-16 xl:gap-y-6 fit:min-h-0 fit:content-stretch fit:pt-[120px]",
          )}
        >
          <div className="flex flex-col gap-5 xl:col-start-1 xl:row-start-1">
            <Eyebrow>
              <span data-reveal="" className="inline-block" style={delay(80)}>
                Contact
              </span>
            </Eyebrow>
            <h1
              data-reveal=""
              style={delay(140)}
              className="font-display text-[clamp(44px,11vw,64px)] leading-[0.95] tracking-[-0.02em] text-fg-strong md:text-[clamp(52px,7vw,78px)] xl:text-[clamp(52px,5.4vw,78px)]"
            >
              Travaillons <em className="pr-[.06em] text-accent-light">ensemble.</em>
            </h1>
            <p
              data-reveal=""
              style={delay(220)}
              className="max-w-[440px] text-base leading-[1.6] text-pretty text-muted sm:text-[17px]"
            >
              Une mission freelance, un poste ou simplement une question : écrivez-moi, je réponds sous 48 h.
            </p>
          </div>

          <ContactCard style={delay(260)} className="xl:col-start-2 xl:row-span-2 xl:row-start-1" />

          <div className="flex flex-col gap-5 xl:col-start-1 xl:row-start-2">
            <InfoPanel style={delay(300)} />
            <LinkTiles delay={380} />
          </div>
        </main>
        <SiteFooter className="pt-10 pb-8" />
      </div>
    </PageTransition>
  );
}
