import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  intro,
  aside,
  className,
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("reveal flex flex-wrap items-end justify-between gap-x-8 gap-y-5", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">
          <span className="text-accent">//</span> {label}
        </p>
        <h2 className="display mt-3 text-[clamp(28px,3.4vw,42px)]">{title}</h2>
        {intro && <p className="mt-3 text-[15.5px] leading-relaxed text-fg-2">{intro}</p>}
      </div>
      {aside}
    </header>
  );
}
