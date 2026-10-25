import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { existing, publicFileExists } from "@/lib/assets";
import { asset, pad } from "@/lib/utils";
import { ProjectCover } from "@/components/ui/project-cover";
import { PagerKeys } from "@/components/work/pager-keys";
import { OtakuvaPreview } from "@/components/home/otakuva-preview";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const cover = existing(project.cover);
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: cover ? [cover.slice(1)] : undefined },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const cover = existing(project.cover);
  const gallery = (project.gallery ?? []).filter((g) => publicFileExists(g.src));

  const spec: [string, React.ReactNode][] = [
    ["Role", project.role],
    ["Year", project.year],
    ["Type", project.category],
    ["Stack", project.stack.join(", ")],
  ];

  return (
    <article className="relative pt-32 pb-16 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(200_240_74/0.08),transparent_70%)]" />
      <div className="container-page">
      <PagerKeys prev={`/work/${prev.slug}/`} next={`/work/${next.slug}/`} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="enter flex items-center justify-between gap-4 text-sm">
        <Link href="/work/" className="group inline-flex items-center gap-2 text-fg-2 hover:text-fg">
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
          All work
        </Link>
        <span className="hidden items-center gap-2 text-[12px] text-fg-3 sm:flex">
          <kbd className="kbd">←</kbd>
          <kbd className="kbd">→</kbd> to flip through projects
        </span>
        <span className="font-mono text-[11px] text-fg-3">
          {pad(index + 1)} / {pad(projects.length)}
        </span>
      </nav>

      {/* Title + spec sheet */}
      <header className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="enter enter-1 lg:col-span-7">
          <p className="eyebrow"><span className="text-accent">//</span> {project.category} · {project.year}</p>
          <h1 className="display silver mt-5 pb-1 text-[clamp(44px,6.5vw,88px)]">{project.title}</h1>
          <p className="mt-4 text-[clamp(18px,1.8vw,24px)] leading-snug text-accent">{project.tagline}</p>
          {project.status && <p className="mt-4 text-[13px] text-fg-3">{project.status}</p>}
        </div>

        <aside className="panel enter enter-2 self-end p-6 lg:col-span-5">
          <dl className="divide-y divide-line text-[14px]">
            {spec.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[80px_1fr] gap-4 py-2.5 first:pt-0">
                <dt className="eyebrow pt-0.5">{k}</dt>
                <dd className="text-fg-2">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-light group h-10 text-[13.5px]"
              >
                Visit live site <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
              </a>
            )}
            {project.links.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost h-10 text-[13.5px]"
              >
                Source code <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </aside>
      </header>

      {/* Cover */}
      <div className="enter enter-3 relative mt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 opacity-70 blur-2xl"
          style={{ background: `radial-gradient(60% 50% at 50% 50%, ${project.palette[1]}40, transparent 70%)` }}
        />
        <div className="overflow-hidden rounded-[16px] border border-line-strong shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
          {cover || project.slug !== "otakuva" ? (
            <ProjectCover project={project} src={cover} detailed className="aspect-[16/10]" sizes="(min-width: 1200px) 1120px, 100vw" priority />
          ) : (
            <OtakuvaPreview />
          )}
        </div>
      </div>

      {/* Summary + metrics */}
      <section className="reveal mt-16 grid gap-10 lg:grid-cols-12">
        <p className="font-display text-[clamp(22px,2.2vw,30px)] leading-[1.3] font-medium tracking-tight lg:col-span-7">{project.summary}</p>
        {project.metrics && (
          <dl className="grid grid-cols-3 gap-px self-start overflow-hidden rounded-2xl border border-line bg-line lg:col-span-5">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-bg-elev p-5">
                <dd className="display text-[40px] leading-none text-accent">{m.value}</dd>
                <dt className="mt-2 text-[12px] leading-snug text-fg-3">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </section>

      {/* Highlights */}
      <section className="reveal mt-16">
        <p className="eyebrow">Highlights</p>
        <ol className="mt-5 grid gap-3 sm:grid-cols-2">
          {project.highlights.map((h, i) => (
            <li key={h} className="panel flex gap-4 p-5">
              <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
              <span className="text-[15.5px] leading-relaxed">{h}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Story */}
      <section className="mt-20 space-y-14">
        {project.sections.map((s) => (
          <div key={s.heading} className="reveal grid gap-4 lg:grid-cols-12">
            <h2 className="eyebrow lg:col-span-3 lg:pt-1.5">{s.heading}</h2>
            <div className="lg:col-span-8">
              <p className="text-[clamp(18px,1.5vw,21px)] leading-[1.65]">{s.body}</p>
              {s.bullets && (
                <ul className="mt-5 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[16px] leading-relaxed text-fg-2">
                      <span className="mt-[0.75em] h-px w-4 shrink-0 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow">Gallery</p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {gallery.map((g) => (
              <figure key={g.src} className="reveal">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-bg-sunk ring-1 ring-line">
                  <Image src={asset(g.src)} alt={g.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover object-top" />
                </div>
                {g.caption && <figcaption className="mt-2.5 text-[13px] text-fg-3">{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Pager */}
      <nav aria-label="More projects" className="mt-24 grid gap-4 sm:grid-cols-2">
        <Link href={`/work/${prev.slug}/`} className="panel group p-6 spotlight transition-colors hover:border-line-strong">
          <span className="eyebrow flex items-center gap-2">
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" /> Previous
          </span>
          <span className="display mt-3 block text-[30px]">{prev.title}</span>
          <span className="mt-1 block text-[14px] text-fg-3">{prev.tagline}</span>
        </Link>
        <Link href={`/work/${next.slug}/`} className="panel group p-6 text-right spotlight transition-colors hover:border-line-strong">
          <span className="eyebrow flex items-center justify-end gap-2">
            Next <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="display mt-3 block text-[30px]">{next.title}</span>
          <span className="mt-1 block text-[14px] text-fg-3">{next.tagline}</span>
        </Link>
      </nav>
      </div>
    </article>
  );
}
