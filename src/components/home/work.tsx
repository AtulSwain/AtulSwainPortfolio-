import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { featuredProjects, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { existing } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "../ui/browser-frame";
import { ProjectCover } from "../ui/project-cover";
import { SectionHeading } from "../ui/section-heading";

function Featured({ project, index }: { project: Project; index: number }) {
  const cover = existing(project.cover);
  const flip = index % 2 === 1;
  return (
    <article className="panel spotlight reveal grid overflow-hidden lg:grid-cols-2">
      <div className={cn("flex flex-col p-7 md:p-10", flip && "lg:order-2")}>
        <div className="flex items-center gap-3">
          <span className="pill py-1 text-[12px]">{project.category}</span>
          <span className="font-mono text-[11px] text-fg-3">{project.year}</span>
        </div>
        <h3 className="display mt-6 text-[clamp(32px,3.6vw,46px)]">{project.title}</h3>
        <p className="mt-2 text-[16px] text-accent">{project.tagline}</p>
        <p className="mt-4 text-[15.5px] leading-relaxed text-fg-2">{project.summary}</p>
        <ul className="mt-6 space-y-2.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-3 text-[14.5px] leading-snug">
              <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Check size={11} strokeWidth={3} />
              </span>
              {h}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg-2">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-8">
          <Link
            href={`/work/${project.slug}/`}
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-fg px-5 text-[13.5px] font-medium text-bg"
          >
            Read case study <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-[13.5px] hover:border-line-strong hover:bg-bg-sunk"
            >
              Live <ArrowUpRight size={14} />
            </a>
          )}
          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-[13.5px] hover:border-line-strong hover:bg-bg-sunk"
            >
              Code <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
      <Link
        href={`/work/${project.slug}/`}
        tabIndex={-1}
        aria-hidden
        className={cn(
          "group relative flex items-center bg-bg-sunk p-5 md:p-8",
          flip ? "lg:order-1 lg:border-r" : "lg:border-l",
          "border-t border-line lg:border-t-0",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(70% 60% at 50% 40%, ${project.palette[1]}33, transparent 70%)` }}
        />
        <BrowserFrame url={project.links.live ?? project.links.code} className="relative w-full shadow-2xl transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
          <ProjectCover project={project} src={cover} className="aspect-[16/10]" sizes="(min-width: 1024px) 520px, 100vw" />
        </BrowserFrame>
      </Link>
    </article>
  );
}

function Card({ project }: { project: Project }) {
  const cover = existing(project.cover);
  return (
    <li className="reveal">
      <Link href={`/work/${project.slug}/`} className="panel spotlight group flex h-full flex-col overflow-hidden">
        <div className="overflow-hidden border-b border-line">
          <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
            <ProjectCover project={project} src={cover} className="aspect-[16/10]" sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10.5px] tracking-[0.1em] text-fg-3 uppercase">{project.category}</span>
            <ArrowUpRight size={16} className="text-fg-3 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </div>
          <h3 className="mt-2 font-display text-[20px] font-semibold tracking-tight">{project.title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-fg-2">{project.tagline}</p>
          <p className="mt-auto pt-4 font-mono text-[11px] text-fg-3">{project.stack.slice(0, 3).join(" · ")}</p>
        </div>
      </Link>
    </li>
  );
}

export function Work() {
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="work" className="container-page py-16 md:py-24">
      <SectionHeading
        label="Selected work"
        title="Things I’ve built"
        intro="Data products, AI tools, real-time apps and software for a real business. Every project has a full case study."
        aside={
          <Link href="/work/" className="group inline-flex items-center gap-2 text-[14px] text-fg-2 hover:text-fg">
            <span className="link-draw">All {projects.length} projects</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="mt-12 space-y-5">
        {featuredProjects.map((p, i) => (
          <Featured key={p.slug} project={p} index={i} />
        ))}
      </div>

      <h3 className="eyebrow reveal mt-20">More projects</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Card key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  );
}
