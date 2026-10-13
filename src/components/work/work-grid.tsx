"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectCover } from "../ui/project-cover";

type Item = { project: Project; cover?: string };

export function WorkGrid({ items, categories }: { items: Item[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const visible = filter === "All" ? items : items.filter((i) => i.project.category === filter);
  const filters: (ProjectCategory | "All")[] = ["All", ...categories];

  return (
    <div className="mt-16 md:mt-24">
      <LayoutGroup>
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2 border-b border-line pb-6">
          {filters.map((f) => {
            const count = f === "All" ? items.length : items.filter((i) => i.project.category === f).length;
            const active = filter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  active ? "text-bg" : "text-fg-2 hover:text-fg",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {f} <sup className="font-mono text-[9px] opacity-60">{count}</sup>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.ul layout className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map(({ project, cover }, i) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 6) * 0.04 }}
            >
              <Link href={`/work/${project.slug}/`} className="group block">
                <div className="relative overflow-hidden rounded-[18px] ring-1 ring-line">
                  <div className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]">
                    <ProjectCover project={project} src={cover} className="aspect-[16/11]" sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw" />
                  </div>
                  <span className="absolute top-3 right-3 grid size-10 scale-75 place-items-center rounded-full bg-bg opacity-0 shadow-lg transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h2 className="display text-3xl leading-tight">
                    <span className="link-draw">{project.title}</span>
                  </h2>
                  <span className="shrink-0 font-mono text-[11px] tracking-[0.1em] text-fg-3 uppercase">{project.year}</span>
                </div>
                <p className="mt-1.5 text-[15px] text-fg-2">{project.tagline}</p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-fg-3 uppercase">{project.category}</p>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
