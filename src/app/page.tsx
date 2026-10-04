import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { HomeFooter } from "@/components/layout/Footers";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const LETTER_STAGGER = 35;
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Each letter rises through a mask on first load. */
function RevealWord({
  text,
  start,
  className,
  letterClassName,
}: {
  text: string;
  start: number;
  className?: string;
  letterClassName?: string;
}) {
  return (
    <span aria-hidden="true" className={className}>
      {[...text].map((char, i) => (
        // Clips only below the glyph (letters rise from there) — never ascenders or descenders.
        <span key={i} className="inline-block [clip-path:inset(-0.4em_-0.2em_-0.3em_-0.2em)]">
          <span
            data-reveal="letter"
            className={cn("inline-block", letterClassName)}
            style={delay(start + i * LETTER_STAGGER)}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function HomePage() {
  const lastNameStart = 150 + (site.firstName.length + 1) * LETTER_STAGGER;
  const afterName = lastNameStart + site.lastName.length * LETTER_STAGGER;

  return (
    <PageTransition>
      {/* overflow-clip: the intro animation translates the footer below the fold — don't make the page scrollable. */}
      <div className="flex min-h-dvh flex-col overflow-clip">
        <main
          id="contenu"
          className="flex flex-1 flex-col items-center justify-center px-5 pt-[max(64px,env(safe-area-inset-top))] pb-16 text-center short:py-8"
        >
          {/* Phones: first and last name on two lines, bigger. From `sm`: one line. */}
          <h1 className="font-display text-[clamp(60px,20vw,96px)] leading-[0.92] tracking-[-0.03em] text-fg-strong sm:text-[clamp(52px,8.5vw,124px)] sm:leading-[0.9] short:text-[clamp(40px,15vh,72px)]">
            <span className="sr-only">{site.name}</span>
            <RevealWord text={site.firstName} start={150} className="block sm:inline" />{" "}
            <RevealWord
              text={site.lastName}
              start={lastNameStart}
              className="block sm:inline"
              letterClassName="bg-linear-to-b from-[#d2fbe2] to-accent to-85% bg-clip-text text-transparent"
            />
          </h1>

          <p className="mt-6 flex items-center gap-4 text-[17px] tracking-[.01em] text-fg-dim sm:mt-7 sm:text-lg md:text-[22px] short:mt-4">
            <span aria-hidden="true" data-reveal="line" style={delay(afterName)} className="h-px w-8 origin-right bg-white/22" />
            <span data-reveal="" style={delay(afterName + 80)}>
              {site.role}
            </span>
            <span aria-hidden="true" data-reveal="line" style={delay(afterName)} className="h-px w-8 origin-left bg-white/22" />
          </p>

          {/* Phones: the two buttons stacked at equal width. From `sm`: side by side. */}
          <div className="mt-10 grid w-full max-w-[300px] grid-cols-1 gap-3 sm:mt-14 sm:flex sm:w-auto sm:max-w-none sm:justify-center sm:gap-3.5 short:mt-6">
            <span data-reveal="" className="flex" style={delay(afterName + 220)}>
              <Button
                href="/projets"
                size="adaptive"
                icon={<ArrowRight size={16} />}
                className="w-full justify-between sm:w-auto"
              >
                Voir les projets
              </Button>
            </span>
            <span data-reveal="" className="flex" style={delay(afterName + 320)}>
              <Button href="/contact" variant="glass" size="adaptive" className="w-full justify-center sm:w-auto">
                Me contacter
              </Button>
            </span>
          </div>
        </main>
        <div data-reveal="" style={delay(afterName + 480)}>
          <HomeFooter />
        </div>
      </div>
    </PageTransition>
  );
}
