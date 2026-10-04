import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <div className="glass flex flex-col items-start gap-7 rounded-[28px] px-6 py-9 sm:gap-8 sm:rounded-[32px] sm:py-10 md:px-14 md:py-12 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-[clamp(34px,9vw,60px)] lg:text-[clamp(40px,4.2vw,60px)] leading-none tracking-[-0.01em] text-fg-strong">
          Un projet en <em className="text-accent-light">tête</em> ?
        </h2>
        <p className="text-[17px] leading-[1.6] text-muted">
          Disponible pour des missions freelance et des postes en CDI.
        </p>
      </div>
      <Button
        href="/contact"
        size="adaptive"
        icon={<ArrowRight size={18} />}
        className="max-sm:w-full max-sm:justify-between"
      >
        Me contacter
      </Button>
    </div>
  );
}
