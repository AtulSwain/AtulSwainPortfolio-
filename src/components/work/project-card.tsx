import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectCover } from "../ui/project-cover";

export function ProjectCard({
  project,
  cover,
  index,
  size = "md",
  priority,
}: {
  project: Project;
  cover?: string;
  index: number;
  size?: "lg" | "md";
  priority?: boolean;
}) {
  return (
    <Link href={`/work/${project.slug}/`} className="group block" aria-label={`${project.title} — case study`}>
      <div className="relative overflow-hidden rounded-[20px] ring-1 ring-line">
        <div className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.035]">
          <ProjectCover
            project={project}
            src={cover}
            priority={priority}
            detailed={size === "lg"}
            className={cn(size === "lg" ? "aspect-[16/10] md:aspect-[16/8]" : "aspect-[16/11]")}
            sizes={size === "lg" ? "(min-width: 1024px) 90vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
          />
        </div>
        <span className="absolute top-4 right-4 grid size-11 scale-75 place-items-center rounded-full bg-bg text-fg opacity-0 shadow-lg transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-accent">{String(index).padStart(2, "0")}</span>
            <h3 className={cn("display leading-none", size === "lg" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl")}>
              <span className="link-draw">{project.title}</span>
            </h3>
          </div>
          <p className="mt-3 max-w-xl text-[15.5px] text-fg-2">{project.tagline}</p>
        </div>
        <div className="shrink-0 pt-1 text-right font-mono text-[11px] leading-5 tracking-[0.1em] text-fg-3 uppercase">
          <p>{project.category}</p>
          <p>{project.year}</p>
        </div>
      </div>
    </Link>
  );
}
