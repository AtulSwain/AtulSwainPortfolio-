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

/** Your photo, or a monogram until you add one at public/images/profile/photo.jpg. */
export function Portrait({ src, name, className, priority, sizes = "(min-width: 1024px) 380px, 90vw" }: Props) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={cn("relative overflow-hidden bg-bg-sunk", className)}>
      {src ? (
        <Image src={asset(src)} alt={`Portrait of ${name}`} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center"
          style={{
            background:
              "radial-gradient(80% 60% at 20% 10%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 60%), radial-gradient(70% 60% at 90% 100%, color-mix(in srgb, var(--accent-2) 28%, transparent), transparent 60%)",
          }}
        >
          <span className="display text-[clamp(56px,7vw,96px)] text-fg/90" aria-label={name}>
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
