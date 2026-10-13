import { cn } from "@/lib/utils";
import { MaskText, Reveal } from "./reveal";

export function SectionHeading({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12", className)}>
      <Reveal className="flex items-center gap-3 md:col-span-3">
        <span className="font-mono text-[11px] text-accent">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span className="eyebrow">{label}</span>
      </Reveal>
      <div className="md:col-span-9">
        <h2 className="display text-[clamp(44px,7vw,104px)] leading-[0.92]">
          <MaskText text={title} />
        </h2>
        {intro && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-2">{intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
