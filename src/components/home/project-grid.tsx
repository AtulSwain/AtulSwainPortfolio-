"use client";

import Link from "next/link";
import { useState } from "react";
import { flushSync } from "react-dom";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectCover } from "../ui/project-cover";

type Item = { project: Project; cover?: string };

function transition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return update();
  doc.startViewTransition(() => flushSync(update));
}

export function ProjectCard({ project, cover }: Item) {
  return (
    <Link href={`/work/${project.slug}/`} className="panel spotlight lift group flex h-full flex-col overflow-hidden p-3">
      <div className="overflow-hidden rounded-[10px] border border-line">
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]">
          <ProjectCover project={project} src={cover} className="aspect-[16/9]" sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw" />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex items-center gap-2 font-display text-[16px] font-semibold tracking-tight uppercase">
            {project.title}
            {project.links.live && <ExternalLink size={13} className="text-fg-3" />}
          </h3>
          <ArrowUpRight
            size={17}
            className="shrink-0 text-fg-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
          />
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-fg-2">{project.tagline}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.stack.slice(0, 3).map((s) => (
            <li key={s} className="chip px-2.5 py-0.5 text-[11px]">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export function ProjectGrid({
  items,
  categories,
  heading,
  limit = 8,
}: {
  items: Item[];
  categories: ProjectCategory[];
  heading: React.ReactNode;
  limit?: number;
}) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const filtered = filter === "All" ? items : items.filter((i) => i.project.category === filter);
  const visible = filtered.slice(0, limit);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
      {heading}
      <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => transition(() => setFilter(c))}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors duration-300",
              filter === c ? "border-accent bg-accent/10 text-accent" : "border-line-strong text-fg-2 hover:border-fg-3 hover:text-fg",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((it) => (
          <li key={it.project.slug} style={{ viewTransitionName: `card-${it.project.slug}` }}>
            <ProjectCard {...it} />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Link href="/work/" className="btn btn-ghost group h-11 text-[13.5px]">
          View all {items.length} projects
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </>
  );
}
