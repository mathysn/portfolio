import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactLinks } from "@/components/contact/ContactInfo";
import { SiteFooter } from "@/components/layout/Footers";
import { PageTransition } from "@/components/layout/PageTransition";
import { Eyebrow } from "@/components/ui/Badges";
import { cn, gutter } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une mission freelance, un poste ou une question : écrivez-moi, je réponds sous 48 h.",
};

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Header like the projects page (top left), then the contact card centred horizontally just below it. */
export default function ContactPage() {
  return (
    <PageTransition>
      <div className="flex min-h-dvh flex-col">
        <main id="contenu" className="flex flex-1 flex-col pt-[112px] md:pt-[168px] short:pt-20">
          <header className={cn(gutter, "flex flex-col gap-5")}>
            <Eyebrow>
              <span data-reveal="" className="inline-block" style={delay(80)}>
                Contact
              </span>
            </Eyebrow>
            <h1
              data-reveal=""
              style={delay(140)}
              className="font-display text-[clamp(44px,11vw,108px)] leading-[0.95] tracking-[-0.02em] text-fg-strong md:text-[clamp(56px,7.5vw,108px)]"
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
          </header>

          <div className={cn(gutter, "flex justify-center pt-8 pb-16 sm:pt-12")}>
            <ContactLinks delay={300} className="w-full max-w-[600px]" />
          </div>
        </main>
        <SiteFooter className="pt-0" />
      </div>
    </PageTransition>
  );
}
