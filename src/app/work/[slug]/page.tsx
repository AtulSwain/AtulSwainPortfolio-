import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { existing, publicFileExists } from "@/lib/assets";
import { asset } from "@/lib/utils";
import { ProjectCover } from "@/components/ui/project-cover";
import { MaskText, Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

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
  const next = projects[(index + 1) % projects.length];
  const cover = existing(project.cover);
  const gallery = (project.gallery ?? []).filter((g) => publicFileExists(g.src));

  return (
    <article className="pt-28 md:pt-36">
      {/* Intro */}
      <header className="container-x">
        <Reveal>
          <Link href="/work/" className="group inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            All work
          </Link>
        </Reveal>

        <div className="mt-12 flex items-center gap-3">
          <span className="font-mono text-[11px] text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-8 bg-line" />
          <span className="eyebrow">
            {project.category} · {project.year}
          </span>
        </div>

        <h1 className="display mt-6 text-[clamp(56px,11vw,176px)] leading-[0.86] tracking-[-0.04em]">
          <MaskText text={project.title} immediate delay={0.05} />
        </h1>

        <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-12">
          <Reveal delay={0.25} className="md:col-span-7">
            <p className="display text-[clamp(26px,2.8vw,38px)] leading-[1.15]">{project.tagline}</p>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-fg-2">{project.summary}</p>
          </Reveal>

          <Reveal delay={0.35} className="md:col-span-4 md:col-start-9">
            <dl className="divide-y divide-line border-y border-line text-sm">
              <div className="flex justify-between gap-6 py-3">
                <dt className="eyebrow">Role</dt>
                <dd className="text-right">{project.role}</dd>
              </div>
              <div className="flex justify-between gap-6 py-3">
                <dt className="eyebrow">Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div className="flex justify-between gap-6 py-3">
                <dt className="eyebrow shrink-0">Stack</dt>
                <dd className="text-right text-fg-2">{project.stack.join(", ")}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg"
                >
                  Visit live site
                  <ArrowUpRight size={15} className="transition-transform duration-500 group-hover:rotate-45" />
                </a>
              )}
              {project.links.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-fg"
                >
                  Source code <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {/* Cover */}
      <Reveal delay={0.2} y={40} className="container-x mt-16 md:mt-24">
        <div className="overflow-hidden rounded-[24px] ring-1 ring-line">
          <ProjectCover project={project} src={cover} detailed className="aspect-[16/10]" sizes="100vw" priority />
        </div>
      </Reveal>

      {/* Metrics */}
      {project.metrics && (
        <div className="container-x mt-16">
          <dl className="grid grid-cols-2 border-t border-line md:grid-cols-3">
            {project.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06} className="border-b border-line py-8 pr-6">
                <dd className="display text-6xl md:text-7xl">
                  <CountUp value={m.value} />
                </dd>
                <dt className="mt-2 text-sm text-fg-3">{m.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      )}

      {/* Highlights */}
      <section className="container-x mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="eyebrow">Highlights</p>
        </Reveal>
        <ol className="md:col-span-9">
          {project.highlights.map((h, i) => (
            <Reveal as="li" key={i} delay={i * 0.05} className="flex gap-6 border-t border-line py-5 last:border-b">
              <span className="font-mono text-[11px] text-accent pt-2">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-[clamp(22px,2.2vw,30px)] leading-snug">{h}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Story */}
      <section className="container-x mt-24 space-y-20 md:mt-32 md:space-y-28">
        {project.sections.map((s) => (
          <div key={s.heading} className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <h2 className="eyebrow md:sticky md:top-28">{s.heading}</h2>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-7">
              <p className="text-[clamp(19px,1.6vw,22px)] leading-[1.6] text-fg">{s.body}</p>
              {s.bullets && (
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[16.5px] leading-relaxed text-fg-2">
                      <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>
        ))}
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="container-x mt-28 md:mt-36">
          <Reveal>
            <p className="eyebrow mb-8">Gallery</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {gallery.map((g, i) => (
              <Reveal key={g.src} delay={(i % 2) * 0.08} className={i % 2 === 1 ? "md:mt-20" : ""}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-bg-sunk ring-1 ring-line">
                    <Image src={asset(g.src)} alt={g.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-top" />
                  </div>
                  {g.caption && <figcaption className="mt-3 text-sm text-fg-3">{g.caption}</figcaption>}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Next project */}
      <section className="mt-32 border-t border-line md:mt-44">
        <Link href={`/work/${next.slug}/`} className="group container-x block py-20 md:py-28">
          <p className="eyebrow">Next project</p>
          <div className="mt-6 flex items-end justify-between gap-8">
            <h2 className="display text-[clamp(52px,10vw,160px)] leading-[0.88] tracking-[-0.04em] transition-colors duration-500 group-hover:text-accent">
              {next.title}
            </h2>
            <span className="mb-4 grid size-14 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-fg md:size-20">
              <ArrowUpRight size={24} />
            </span>
          </div>
          <p className="mt-4 text-fg-2">{next.tagline}</p>
        </Link>
      </section>
    </article>
  );
}
