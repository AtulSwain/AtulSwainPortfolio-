"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight, LayoutGrid, Rows3 } from "lucide-react";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectCover } from "../ui/project-cover";

type Item = { project: Project; cover?: string };
type View = "grid" | "list";

/** Animate a state change with the View Transitions API where available. */
function transition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return update();
  doc.startViewTransition(() => flushSync(update));
}

export function WorkBrowser({ items, categories }: { items: Item[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [view, setView] = useState<View>("grid");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("work-view");
      if (saved === "list" || saved === "grid") setView(saved);
    } catch {}
  }, []);

  const changeView = (v: View) => {
    transition(() => setView(v));
    try {
      localStorage.setItem("work-view", v);
    } catch {}
  };

  const visible = filter === "All" ? items : items.filter((i) => i.project.category === filter);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1">
          {(["All", ...categories] as const).map((c) => {
            const count = c === "All" ? items.length : items.filter((i) => i.project.category === c).length;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => transition(() => setFilter(c))}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors",
                  filter === c ? "border-fg bg-fg text-bg" : "border-line text-fg-2 hover:border-line-strong hover:text-fg",
                )}
              >
                {c} <span className="ml-0.5 font-mono text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <div role="group" aria-label="Layout" className="flex rounded-full border border-line p-0.5">
          {(
            [
              ["grid", LayoutGrid, "Grid view"],
              ["list", Rows3, "List view"],
            ] as const
          ).map(([v, Icon, label]) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              aria-label={label}
              onClick={() => changeView(v)}
              className={cn(
                "grid size-8 place-items-center rounded-full transition-colors",
                view === v ? "bg-fg text-bg" : "text-fg-3 hover:text-fg",
              )}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
      </div>

      {view === "grid" ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(({ project, cover }) => (
            <li key={project.slug} style={{ viewTransitionName: `p-${project.slug}` }}>
              <Link href={`/work/${project.slug}/`} className="panel spotlight group flex h-full flex-col overflow-hidden">
                <div className="overflow-hidden border-b border-line">
                  <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                    <ProjectCover project={project} src={cover} className="aspect-[16/10]" sizes="(min-width: 1280px) 360px, (min-width: 640px) 45vw, 100vw" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10.5px] tracking-[0.1em] text-fg-3 uppercase">
                      {project.category} · {project.year}
                    </span>
                    <ArrowUpRight size={16} className="text-fg-3 transition-colors group-hover:text-accent" />
                  </div>
                  <h2 className="mt-2 font-display text-[21px] font-semibold tracking-tight">{project.title}</h2>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-fg-2">{project.tagline}</p>
                  <p className="mt-auto pt-4 font-mono text-[11px] text-fg-3">{project.stack.slice(0, 4).join(" · ")}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="panel mt-8 divide-y divide-line overflow-hidden">
          {visible.map(({ project }, i) => (
            <li key={project.slug} style={{ viewTransitionName: `p-${project.slug}` }}>
              <Link
                href={`/work/${project.slug}/`}
                className="group grid grid-cols-[28px_1fr_auto] items-baseline gap-4 px-5 py-5 transition-colors hover:bg-bg-sunk md:grid-cols-[40px_1.2fr_1.4fr_auto] md:px-7"
              >
                <span className="font-mono text-[11px] text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[22px] font-semibold tracking-tight transition-colors group-hover:text-accent md:text-[26px]">
                  {project.title}
                </span>
                <span className="hidden text-[14.5px] text-fg-2 md:block">{project.tagline}</span>
                <span className="font-mono text-[10.5px] tracking-[0.1em] text-fg-3 uppercase">
                  {project.category} · {project.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
