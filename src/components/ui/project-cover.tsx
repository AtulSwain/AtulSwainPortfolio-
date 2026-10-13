import Image from "next/image";
import type { Project } from "@/content/types";
import { asset, cn } from "@/lib/utils";

type Props = {
  project: Pick<Project, "slug" | "title" | "category" | "year" | "palette" | "tagline">;
  /** Resolved cover path (undefined → generated cover). */
  src?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Generated covers can show the tagline for larger placements. */
  detailed?: boolean;
};

export function ProjectCover({ project, src, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority, detailed }: Props) {
  const [base, tone] = project.palette;

  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-bg-sunk", className)}>
        <Image
          src={asset(src)}
          alt={`${project.title} screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={cn("@container relative overflow-hidden", className)}
      style={{
        background: `radial-gradient(90% 70% at 85% 15%, ${tone}55, transparent 60%), radial-gradient(70% 60% at 10% 100%, ${tone}33, transparent 70%), ${base}`,
      }}
      aria-hidden
    >
      <svg className="absolute inset-0 size-full opacity-[0.12]" aria-hidden>
        <defs>
          <pattern id={`grid-${project.slug}`} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.slug})`} />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-[6%] text-white">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div>
          <p className="display text-[11cqw] leading-[0.95] text-white">{project.title}</p>
          {detailed && <p className="mt-[2cqw] max-w-md text-[max(12px,1.8cqw)] text-white/70">{project.tagline}</p>}
        </div>
      </div>
      <div
        className="absolute -right-[10%] -bottom-[30%] aspect-square w-[55%] rounded-full blur-3xl"
        style={{ background: tone, opacity: 0.35 }}
      />
    </div>
  );
}
