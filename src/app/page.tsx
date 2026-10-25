import { Hero } from "@/components/home/hero";
import { Featured } from "@/components/home/featured";
import { ProjectGrid } from "@/components/home/project-grid";
import { Lab } from "@/components/home/lab";
import { Skills } from "@/components/home/skills";
import { About } from "@/components/home/about";
import { Journey } from "@/components/home/journey";
import { DataScience } from "@/components/home/data-science";
import { Education } from "@/components/home/education";
import { Contact } from "@/components/home/contact";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects, projects } from "@/content/projects";
import { existing } from "@/lib/assets";

export default function Home() {
  const lead = featuredProjects[0]?.slug;
  const rest = projects.filter((p) => p.slug !== lead);
  const items = rest.map((p) => ({ project: p, cover: existing(p.cover) }));
  const categories = Array.from(new Set(rest.map((p) => p.category)));

  return (
    <>
      <Hero image={existing("/images/hero/hero.webp")} />
      <Featured />
      <section id="projects" className="container-page py-16 md:py-20">
        <ProjectGrid
          items={items}
          categories={categories}
          heading={<SectionHeading label="Projects" title="Projects That Create Impact" />}
        />
      </section>
      <Lab />
      <Skills />
      <About />
      <Journey />
      <DataScience />
      <Education />
      <Contact />
    </>
  );
}
