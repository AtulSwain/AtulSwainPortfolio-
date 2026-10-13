import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Intro } from "@/components/home/intro";
import { WorkExplorer } from "@/components/home/work-explorer";
import { JourneyReel } from "@/components/home/journey-reel";
import { Notebook } from "@/components/home/notebook";
import { EducationList } from "@/components/home/education";
import { Contact } from "@/components/home/contact";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/content/profile";
import { categories, projects } from "@/content/projects";
import { existing } from "@/lib/assets";

export default function Home() {
  const photo = existing(profile.photo);
  const rows = projects.map((p) => ({ project: p, cover: existing(p.cover) }));

  return (
    <>
      <Intro photo={photo} />

      <section id="work" className="pt-28 md:pt-36">
        <SectionHeading
          index="01"
          label="Work"
          title="Things I’ve built"
          intro="Data products, AI tools, real-time apps and software for a real business. Browse the list — every project has a case study."
          aside={
            <Link href="/work/" className="group inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg">
              <span className="link-draw">Open the archive</span>
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <WorkExplorer rows={rows} categories={categories} />
      </section>

      <section id="journey" className="pt-28 md:pt-36">
        <SectionHeading
          index="02"
          label="Journey"
          title="How I got here"
          intro="Every project taught me something the last one couldn’t. Swipe, scroll or use the arrows."
        />
        <JourneyReel />
      </section>

      <section id="data" className="pt-28 md:pt-36">
        <SectionHeading index="03" label="Data science" title="Questions, then data" />
        <Notebook />
      </section>

      <section id="education" className="pt-28 md:pt-36">
        <SectionHeading
          index="04"
          label="Education"
          title="Study & learning"
          intro="Formal study gave me the foundations. Building things taught me the rest."
        />
        <EducationList />
      </section>

      <Contact />
    </>
  );
}
