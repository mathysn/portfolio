import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/layout/Footers";
import { PageTransition } from "@/components/layout/PageTransition";
import { Eyebrow } from "@/components/ui/Badges";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex min-h-dvh flex-col">
        <main id="contenu" className="flex flex-1 items-center justify-center px-5 pt-[120px] pb-16">
          <div
            data-reveal=""
            className="glass flex max-w-xl flex-col items-center gap-6 rounded-[32px] px-8 py-14 text-center md:px-14"
          >
            <Eyebrow>Erreur 404</Eyebrow>
            <h1 className="font-display text-[clamp(48px,6vw,72px)] leading-none text-fg-strong">
              Page <em className="text-accent-light">introuvable</em>
            </h1>
            <p className="text-[17px] leading-[1.6] text-muted">Cette page n&apos;existe pas ou a été déplacée.</p>
            <Button href="/" variant="link" className="mt-2">
              <ArrowLeft size={16} aria-hidden="true" /> Retour à l&apos;accueil
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    </PageTransition>
  );
}
