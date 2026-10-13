"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectCategory } from "@/content/types";
import { cn } from "@/lib/utils";
import { ProjectCover } from "../ui/project-cover";

type Row = { project: Project; cover?: string };

/**
 * A browsable list of projects with a live preview panel.
 * Hover, focus or arrow keys change the preview; Enter/click opens the case study.
 */
export function WorkExplorer({ rows, categories }: { rows: Row[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const visible = filter === "All" ? rows : rows.filter((r) => r.project.category === filter);
  const [selected, setSelected] = useState<string | undefined>(visible[0]?.project.slug);
  const listRef = useRef<HTMLUListElement>(null);

  const current = visible.find((r) => r.project.slug === selected) ?? visible[0];

  const focusRow = (i: number) => {
    const links = listRef.current?.querySelectorAll<HTMLAnchorElement>("a[data-row]");
    if (!links?.length) return;
    links[(i + links.length) % links.length].focus();
  };

  return (
    <div className="mt-12">
      <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {(["All", ...categories] as const).map((c) => {
          const count = c === "All" ? rows.length : rows.filter((r) => r.project.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => {
                setFilter(c);
                const first = c === "All" ? rows[0] : rows.find((r) => r.project.category === c);
                setSelected(first?.project.slug);
              }}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors",
                filter === c ? "border-fg bg-fg text-bg" : "border-line text-fg-2 hover:border-fg-3 hover:text-fg",
              )}
            >
              {c} <span className="ml-0.5 font-mono text-[10px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* List */}
        <ul ref={listRef} className="border-t border-line lg:col-span-5">
          {visible.map(({ project, cover }, i) => {
            const isSel = current?.project.slug === project.slug;
            return (
              <li key={project.slug} className="border-b border-line">
                <Link
                  data-row
                  href={`/work/${project.slug}/`}
                  onMouseEnter={() => setSelected(project.slug)}
                  onFocus={() => setSelected(project.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      focusRow(i + 1);
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      focusRow(i - 1);
                    }
                  }}
                  className="group relative flex items-center gap-4 py-4 outline-offset-[-2px]"
                >
                  <span
                    className={cn(
                      "absolute top-1/2 -left-4 hidden h-6 w-0.5 -translate-y-1/2 rounded-full bg-accent transition-opacity lg:block",
                      isSel ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {/* Thumbnail on small screens */}
                  <span className="w-24 shrink-0 overflow-hidden rounded-lg ring-1 ring-line lg:hidden">
                    <ProjectCover project={project} src={cover} className="aspect-[4/3]" sizes="96px" />
                  </span>
                  <span className="hidden w-6 font-mono text-[11px] text-fg-3 lg:block">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "display block truncate text-[26px] leading-tight transition-colors md:text-[30px]",
                        isSel ? "text-fg" : "text-fg-2 lg:text-fg-3",
                        "group-hover:text-fg",
                      )}
                    >
                      {project.title}
                    </span>
                    <span className="block truncate text-[13.5px] text-fg-3 lg:hidden">{project.tagline}</span>
                  </span>
                  <span className="hidden font-mono text-[10.5px] tracking-[0.1em] text-fg-3 uppercase sm:block">
                    {project.category}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Preview */}
        {current && (
          <div className="hidden lg:col-span-7 lg:block">
            <article key={current.project.slug} className="card sticky top-8 overflow-hidden">
              <Link href={`/work/${current.project.slug}/`} className="group block overflow-hidden border-b border-line" tabIndex={-1}>
                <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]">
                  <ProjectCover
                    project={current.project}
                    src={current.cover}
                    className="aspect-[16/10]"
                    sizes="(min-width: 1280px) 620px, 55vw"
                    detailed
                  />
                </div>
              </Link>
              <div className="p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display text-4xl">{current.project.title}</h3>
                  <span className="font-mono text-[11px] text-fg-3">{current.project.year}</span>
                </div>
                <p className="mt-1 text-[15px] text-accent">{current.project.tagline}</p>
                <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-fg-2">{current.project.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {current.project.stack.slice(0, 6).map((s) => (
                    <li key={s} className="rounded-full border border-line px-2.5 py-1 text-[12px] text-fg-2">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={`/work/${current.project.slug}/`}
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-[13.5px] font-medium text-bg"
                  >
                    Case study <ArrowUpRight size={14} />
                  </Link>
                  {current.project.links.live && (
                    <a
                      href={current.project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-[13.5px] hover:border-fg"
                    >
                      Live site <ArrowUpRight size={14} />
                    </a>
                  )}
                  {current.project.links.code && (
                    <a
                      href={current.project.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-[13.5px] hover:border-fg"
                    >
                      Code <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
            <p className="mt-3 hidden items-center gap-2 text-[12px] text-fg-3 xl:flex">
              <kbd className="kbd">↑</kbd>
              <kbd className="kbd">↓</kbd> to browse · <kbd className="kbd">↵</kbd> to open
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
