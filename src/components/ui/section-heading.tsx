import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  label,
  title,
  intro,
  aside,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("reveal flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="h-px w-6 bg-line" />
          {label}
        </p>
        <h2 className="display mt-4 text-[clamp(40px,5.4vw,76px)]">{title}</h2>
        {intro && <p className="mt-4 text-[17px] leading-relaxed text-fg-2">{intro}</p>}
      </div>
      {aside}
    </header>
  );
}
