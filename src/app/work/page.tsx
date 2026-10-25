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
    <div className="relative pt-32 pb-24 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(200_240_74/0.08),transparent_70%)]" />
      <div className="container-page">
        <header className="enter">
          <p className="eyebrow">
            <span className="text-accent">//</span> Archive · {projects.length} projects
          </p>
          <h1 className="display mt-4 text-[clamp(44px,6.5vw,84px)]">
            <span className="silver">Everything I’ve</span> <span className="text-accent">built</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-fg-2">
            From my first CSS page to production software. Filter by type, or switch between grid and list.
          </p>
        </header>
        <WorkBrowser items={items} categories={categories} />
      </div>
    </div>
  );
}
