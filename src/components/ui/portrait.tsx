import Image from "next/image";
import { asset, cn } from "@/lib/utils";

type Props = {
  /** Resolved photo path (undefined → monogram). */
  src?: string;
  name: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Arched portrait frame. Shows your photo, or a monogram until you add one. */
export function Portrait({ src, name, className, priority, sizes = "(min-width: 1024px) 28vw, 70vw" }: Props) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-bg-sunk ring-1 ring-line",
        className,
      )}
    >
      {src ? (
        <Image
          src={asset(src)}
          alt={`Portrait of ${name}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_80%_at_50%_0%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]">
          <svg viewBox="0 0 200 200" className="absolute inset-0 size-full text-line" aria-hidden>
            {Array.from({ length: 9 }).map((_, i) => (
              <circle key={i} cx="100" cy="100" r={14 + i * 14} fill="none" stroke="currentColor" strokeWidth="0.4" />
            ))}
          </svg>
          <span className="display relative text-[clamp(64px,9vw,128px)] italic text-fg" aria-label={name}>
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
