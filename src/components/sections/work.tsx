import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects, projects } from "@/content/projects";
import { existing } from "@/lib/assets";
import { Reveal } from "../ui/reveal";
import { SectionHeading } from "../ui/section-heading";
import { ProjectCard } from "../work/project-card";
import { ProjectIndex } from "../work/project-index";

export function Work() {
  const [lead, ...others] = featuredProjects;
  const rest = projects.filter((p) => !p.featured).slice(0, 5);

  return (
    <section id="work" className="scroll-mt-20 py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Selected work"
          title="Things I’ve built"
          intro="A mix of data products, AI tools, real-time apps and software for a real business. Each one has a short case study."
        />

        <div className="mt-16 space-y-16 md:mt-24 md:space-y-24">
          {lead && (
            <Reveal>
              <ProjectCard project={lead} cover={existing(lead.cover)} index={1} size="lg" />
            </Reveal>
          )}
          <div className="grid gap-16 md:grid-cols-2 md:gap-8">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1} className={i % 2 === 1 ? "md:mt-24" : ""}>
                <ProjectCard project={p} cover={existing(p.cover)} index={i + 2} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-28">
          <Reveal className="mb-8 flex items-end justify-between">
            <p className="eyebrow">More projects</p>
            <Link href="/work/" className="group inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg">
              <span className="link-draw">All {projects.length} projects</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <ProjectIndex
            rows={rest.map((p) => ({ project: p, cover: existing(p.cover) }))}
            startIndex={featuredProjects.length + 1}
          />
        </div>
      </div>
    </section>
  );
}
