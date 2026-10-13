import type { Metadata } from "next";
import { categories, projects } from "@/content/projects";
import { existing } from "@/lib/assets";
import { WorkBrowser } from "@/components/work/work-browser";

export const metadata: Metadata = {
  title: "Work",
  description: "Every project — data products, AI tools, real-time apps, business software and frontend studies.",
};

export default function WorkPage() {
  const items = projects.map((p) => ({ project: p, cover: existing(p.cover) }));

  return (
    <div className="pt-10 pb-24 lg:pt-16">
      <header className="enter">
        <p className="eyebrow flex items-center gap-3">
          Archive <span className="h-px w-6 bg-line" /> <span className="text-accent">{projects.length} projects</span>
        </p>
        <h1 className="display mt-5 text-[clamp(56px,9vw,128px)] leading-[0.9]">All work</h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-fg-2">
          From my first CSS page to production software. Filter by type, or switch between grid and list.
        </p>
      </header>
      <WorkBrowser items={items} categories={categories} />
    </div>
  );
}
