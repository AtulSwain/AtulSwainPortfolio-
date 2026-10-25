import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { existing } from "@/lib/assets";
import { ProjectCover } from "../ui/project-cover";
import { OtakuvaPreview } from "./otakuva-preview";

/** The one project that leads the page, shown on a tilted screen. */
export function Featured() {
  const project = featuredProjects[0];
  if (!project) return null;
  const cover = existing(project.cover);

  return (
    <section aria-label="Featured project" className="container-page py-6">
      <article className="panel spotlight reveal group relative grid items-center gap-10 overflow-hidden p-7 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative z-10">
          <p className="eyebrow flex items-center gap-2.5">
            <span className="live-dot size-1.5 rounded-full bg-accent" /> Featured project
          </p>
          <h2 className="display mt-5 text-[clamp(40px,5vw,64px)] tracking-[0.02em] uppercase">{project.title}</h2>
          <p className="mt-2 text-[15px] text-accent">{project.tagline}</p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-2">{project.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-light group/btn">
                View Live Site <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            )}
            <Link href={`/work/${project.slug}/`} className={project.links.live ? "btn btn-ghost" : "btn btn-light group/btn"}>
              View Case Study <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
          {project.status && (
            <p className="mt-5 flex items-center gap-2 text-[12px] text-fg-3">
              <Lock size={12} /> {project.status}
            </p>
          )}
        </div>

        {/* Tilted screen */}
        <div className="[perspective:1600px]">
          <Link
            href={`/work/${project.slug}/`}
            tabIndex={-1}
            aria-hidden
            className="block overflow-hidden rounded-[14px] border border-line-strong shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out-expo [transform:rotateY(-14deg)_rotateX(4deg)_rotateZ(-1deg)] group-hover:[transform:rotateY(-4deg)_rotateX(1deg)_rotateZ(0deg)]"
          >
            {cover ? (
              <ProjectCover project={project} src={cover} className="aspect-[16/10]" sizes="(min-width: 1024px) 640px, 100vw" />
            ) : project.slug === "otakuva" ? (
              <OtakuvaPreview />
            ) : (
              <ProjectCover project={project} className="aspect-[16/10]" detailed />
            )}
          </Link>
        </div>
        <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-24 size-96 rounded-full bg-accent/10 blur-3xl" />
      </article>
    </section>
  );
}
