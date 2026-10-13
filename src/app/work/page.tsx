import type { Metadata } from "next";
import { categories, projects } from "@/content/projects";
import { existing } from "@/lib/assets";
import { MaskText, Reveal } from "@/components/ui/reveal";
import { WorkGrid } from "@/components/work/work-grid";

export const metadata: Metadata = {
  title: "Work",
  description: "Every project — data products, AI tools, real-time apps, business software and frontend studies.",
};

export default function WorkPage() {
  const items = projects.map((p) => ({ project: p, cover: existing(p.cover) }));

  return (
    <div className="pt-32 pb-28 md:pt-44 md:pb-40">
      <div className="container-x">
        <Reveal className="flex items-center gap-3">
          <span className="eyebrow">Archive</span>
          <span className="h-px w-8 bg-line" />
          <span className="font-mono text-[11px] text-accent">{projects.length} projects</span>
        </Reveal>
        <h1 className="display mt-8 text-[clamp(64px,13vw,200px)] leading-[0.85] tracking-[-0.04em]">
          <MaskText text="All work" immediate delay={0.1} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg-2">
            From my first CSS page to production software — in the order I’d want you to see them.
          </p>
        </Reveal>

        <WorkGrid items={items} categories={categories} />
      </div>
    </div>
  );
}
