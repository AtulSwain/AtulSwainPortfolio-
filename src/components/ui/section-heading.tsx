import { cn } from "@/lib/utils";

export function SectionHeading({
  label,
  title,
  intro,
  aside,
  center,
  className,
}: {
  label: string;
  title: React.ReactNode;
  intro?: string;
  aside?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "reveal flex flex-wrap items-end justify-between gap-6",
        center && "flex-col items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", center && "mx-auto")}>
        <p className="pill">
          <span className="size-1.5 rounded-full bg-accent" />
          {label}
        </p>
        <h2 className="display mt-5 text-[clamp(36px,5vw,64px)]">{title}</h2>
        {intro && <p className="mt-4 text-[17px] leading-relaxed text-fg-2">{intro}</p>}
      </div>
      {aside}
    </header>
  );
}
