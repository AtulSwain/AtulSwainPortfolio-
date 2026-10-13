import { skills } from "@/content/profile";
import { projects } from "@/content/projects";
import { SectionHeading } from "../ui/section-heading";

// Counted straight from the stacks in projects.ts, so it stays accurate as you add work.
const tracked: { label: string; match: string[] }[] = [
  { label: "HTML & CSS", match: ["HTML", "CSS", "Tailwind CSS"] },
  { label: "JavaScript", match: ["JavaScript"] },
  { label: "Python", match: ["Python"] },
  { label: "TypeScript", match: ["TypeScript"] },
  { label: "React", match: ["React"] },
  { label: "Node.js", match: ["Node.js"] },
  { label: "Real-time (Socket.IO / WebRTC)", match: ["Socket.IO", "WebRTC"] },
  { label: "SQL databases", match: ["SQLite", "PostgreSQL", "MySQL"] },
];

export function Skills() {
  const usage = tracked
    .map((t) => ({ ...t, count: projects.filter((p) => p.stack.some((s) => t.match.includes(s))).length }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);
  const max = Math.max(...usage.map((u) => u.count));

  return (
    <section id="skills" className="container-page py-16 md:py-24">
      <SectionHeading label="Skills" title="My toolkit" intro="What I reach for — and how often it shows up in the projects on this site." />
      <div className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {skills.map((g) => (
            <li key={g.title} className="panel spotlight reveal p-6">
              <h3 className="font-display text-[17px] font-semibold tracking-tight">{g.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <li key={it} className="rounded-lg border border-line bg-bg-sunk px-2.5 py-1 text-[13px] text-fg-2">
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <figure className="panel reveal p-6 md:p-8">
          <figcaption>
            <h3 className="font-display text-[17px] font-semibold tracking-tight">Across my projects</h3>
            <p className="mt-1 text-[13.5px] text-fg-3">
              Number of the {projects.length} projects on this site that use each technology.
            </p>
          </figcaption>
          <ul className="mt-7 space-y-4">
            {usage.map((u) => (
              <li key={u.label}>
                <div className="flex items-baseline justify-between text-[13.5px]">
                  <span>{u.label}</span>
                  <span className="font-mono text-[12px] text-fg-2 tabular-nums">{u.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bg-sunk">
                  <div
                    className="bar-grow h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                    style={{ width: `${(u.count / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
