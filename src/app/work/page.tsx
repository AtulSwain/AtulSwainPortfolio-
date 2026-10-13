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
      <div className="backdrop" aria-hidden />
      <div className="container-page">
        <header className="enter">
          <p className="pill">
            <span className="size-1.5 rounded-full bg-accent" /> Archive · {projects.length} projects
          </p>
          <h1 className="display mt-6 text-[clamp(48px,7vw,88px)]">
            Everything I’ve <span className="gradient-text">built</span>
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
